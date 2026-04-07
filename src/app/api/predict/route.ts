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

        // ── Store in database ──
        try {
            await insertPrediction(data.id, data.prediction, data.confidence, persistentImageUrl);
        } catch (dbErr) {
            console.error("DB insert error:", dbErr);
        }
        return NextResponse.json({ ...data, imageUrl: persistentImageUrl });
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
        return NextResponse.json(data);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ error: "Fetch error", detail: message }, { status: 500 });
    }
}
