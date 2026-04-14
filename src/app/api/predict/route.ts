import { NextRequest, NextResponse } from "next/server";
import { PredictionResult } from "@/lib/types";
import { insertPrediction } from "@/lib/db";

// This points to your Python FastAPI inference server
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";

/**
 * POST /api/predict
 * Forwards image to Python inference engine, stores result in Neon DB
 */
export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("image") as File;

        if (!file) {
            return NextResponse.json({ error: "No image file provided" }, { status: 400 });
        }

        // Forward image to Python inference backend
        const pyFormData = new FormData();
        pyFormData.append("image", file);

        const response = await fetch(`${BACKEND_URL}/predict`, {
            method: "POST",
            body: pyFormData,
        });

        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            console.error("Backend Error:", errData);
            throw new Error(`Inference engine failed: ${response.statusText}`);
        }

        const data: PredictionResult = await response.json();
        const buffer = Buffer.from(await file.arrayBuffer());

        // ── PERSISTENCE: Save to Cloudinary (fallback to Base64) ──
        let persistentImageUrl = data.imageUrl;
        let isCloudinaryUsed = false;

        try {
            const { v2: cloudinary } = require("cloudinary");
            cloudinary.config({
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET
            });

            // Only attempt if credentials are set
            if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_CLOUD_NAME !== 'your_cloud_name') {
                const base64Image = buffer.toString("base64");
                const uploadResponse = await cloudinary.uploader.upload(`data:${file.type};base64,${base64Image}`, {
                    folder: "tomatoguard_scans",
                    public_id: `scan_${data.id}`,
                    tags: ["tomato_leaf", data.prediction]
                });
                persistentImageUrl = uploadResponse.secure_url;
                isCloudinaryUsed = true;
                console.log("🚀 Image persistent in Cloudinary:", persistentImageUrl);
            }
        } catch (cloErr) {
            console.error("⚠️ Cloudinary error, falling back to local encoding:", cloErr);
        }

        if (!isCloudinaryUsed) {
            try {
                const base64Image = buffer.toString("base64");
                persistentImageUrl = `data:${file.type};base64,${base64Image}`;
            } catch (bufErr) {
                console.error("Base64 fallback conversion error:", bufErr);
            }
        }

        // ── Map Backend Keys to Frontend Types ──
        const finalResult: PredictionResult = {
            ...data,
            imageUrl: persistentImageUrl,
            xaiUrl: (data as any).xai_url || data.xaiUrl,
            imageInfo: (data as any).image_info || (data as any).imageInfo,
            models: (data as any).models || (data as any).res,
        };

        // ── Real-time LLM Diagnostic Summary (Groq) ──
        let description = "";

        try {
            const GROQ_KEY = process.env.GROQAI_API_KEY;
            if (GROQ_KEY) {
                // Try Vision-based analysis first
                const visionRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                    method: "POST",
                    headers: { "Authorization": `Bearer ${GROQ_KEY}`, "Content-Type": "application/json" },
                    body: JSON.stringify({
                        model: "meta-llama/llama-4-scout-17b-16e-instruct",
                        messages: [
                            {
                                role: "user",
                                content: [
                                    {
                                        type: "text",
                                        text: `As a plant pathologist, analyze this tomato leaf diagnosed with ${finalResult.prediction}. 
                                        Provide a precise, professional 50-word diagnostic summary focusing on the visible symptoms and immediate biological priority.`
                                    },
                                    {
                                        type: "image_url",
                                        image_url: { url: persistentImageUrl.startsWith("data:") ? persistentImageUrl : `data:${file.type};base64,${buffer.toString("base64")}` }
                                    }
                                ]
                            }
                        ],
                        max_tokens: 150,
                        temperature: 0.2,
                    }),
                });

                if (visionRes.ok) {
                    const vData = await visionRes.json();
                    description = vData.choices?.[0]?.message?.content || "";
                } else {
                    const errorText = await visionRes.text();
                    console.error("Groq Vision API Error:", errorText);
                    // Fallback to text-only expert analysis if Vision fails
                    console.warn("Vision AI failed, falling back to text-informed AI report.");
                    const textRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                        method: "POST",
                        headers: { "Authorization": `Bearer ${GROQ_KEY}`, "Content-Type": "application/json" },
                        body: JSON.stringify({
                            model: "llama-3.3-70b-versatile",
                            messages: [
                                {
                                    role: "user",
                                    content: `Analyze a tomato leaf diagnosis. 
                                    Disease: ${finalResult.prediction}
                                    Write a professional report.`
                                }
                            ],
                            max_tokens: 150,
                        }),
                    });
                    if (textRes.ok) {
                        const tData = await textRes.json();
                        description = tData.choices?.[0]?.message?.content || "";
                    }
                }
            }
        } catch (aiErr) {
            console.error("Critical AI generation failure:", aiErr);
        }

        let llmInsight = {
            name: finalResult.prediction,
            displayName: finalResult.prediction.replace(/_/g, " "),
            severity: (data as any).imageInfo?.vitality_score < 40 ? "high" : "moderate" as any,
            description: description || (data as any).imageInfo?.detailed_summary || "Automated diagnostic report pending final verification.",
            symptoms: [], causes: [], treatments: [], prevention: []
        };

        // ── SAVE TO DATABASE ──
        try {
            await insertPrediction(
                finalResult.id,
                finalResult.prediction,
                finalResult.confidence,
                finalResult.imageUrl,
                llmInsight,
                finalResult.xaiUrl,
                finalResult.hotspots,
                finalResult.imageInfo
            );
            console.log("✅ Prediction saved to database");
        } catch (dbErr) {
            console.error("❌ Failed to save prediction to database:", dbErr);
        }

        return NextResponse.json({ ...finalResult, llmInsight });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error("API Route Error:", message);
        return NextResponse.json(
            { error: "Internal Server Error", detail: message },
            { status: 500 }
        );
    }
}

/**
 * GET /api/predict
 * Returns recent history from the backend (proxied)
 */
export async function GET() {
    try {
        const response = await fetch(`${BACKEND_URL}/history`);
        const data = await response.json();

        // Map keys for history items
        const mappedData = data.map((item: any) => ({
            ...item,
            xaiUrl: item.xai_url || item.xaiUrl,
            imageUrl: item.image_url || item.imageUrl,
        }));

        return NextResponse.json(mappedData);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ error: "Fetch error", detail: message }, { status: 500 });
    }
}
