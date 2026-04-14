import { NextRequest, NextResponse } from "next/server";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function POST(req: NextRequest) {
  try {
    const { diseaseName, image, imageType, severity } = await req.json();

    const GROQ_KEY = process.env.GROQAI_API_KEY;
    if (!GROQ_KEY) {
      return NextResponse.json({ error: "Groq key not configured" }, { status: 500 });
    }

    // ── Single Groq call for all enhanced visual insights ──
    const prompt = `You are a professional Plant Pathologist AI analyzing a tomato leaf image diagnosed with: "${diseaseName.replace(/_/g, " ")}" (Severity: ${severity ?? "moderate"}).

Analyze the image carefully and respond ONLY with a valid JSON object (no markdown, no backticks) matching this exact structure:

{
  "detailedSummary": "A comprehensive, professionally written 100-word paragraph describing the specific visual indicators of the disease in the image, its biological impact, and a summary of the necessary management strategy.",
  "symptomHotspots": [
    {
      "symptom": "exact symptom name (short, max 6 words)",
      "xPct": 45,
      "yPct": 38,
      "description": "2-sentence description of what this looks like and why it indicates the disease",
      "searchQuery": "tomato leaf [symptom keyword] macro closeup"
    }
  ],
  "treatmentSteps": [
    {
      "treatment": "treatment name (max 5 words)",
      "icon": "spray | prune | water | soil | sun | shield",
      "steps": [
        { "label": "Step 1 label", "detail": "1-sentence action detail" },
        { "label": "Step 2 label", "detail": "1-sentence action detail" }
      ],
      "urgency": "immediate | within24h | within3days | preventative"
    }
  ],
  "progressionTimeline": [
    {
      "dayLabel": "Now",
      "days": 0,
      "stage": "Initial Detection",
      "description": "Current state: small discrete lesions visible on lower leaves.",
      "actionRequired": "Begin treatment immediately to limit spread."
    }
  ],
  "xaiRegionDescription": "2–3 sentence narrative explaining which specific areas in the image show the strongest disease markers.",
  "symptoms": [
    "Specific symptom observed in the image 1",
    "Specific symptom observed in the image 2",
    "Specific symptom observed in the image 3"
  ],
  "causes": [
    "Environmental or pathogen cause 1",
    "Environmental or pathogen cause 2",
    "Environmental or pathogen cause 3"
  ],
  "treatments": [
    "Specific treatment action 1",
    "Specific treatment action 2",
    "Specific treatment action 3"
  ],
  "prevention": [
    "Long-term prevention strategy 1",
    "Long-term prevention strategy 2",
    "Long-term prevention strategy 3"
  ]
}

Make all values accurate for ${diseaseName.replace(/_/g, " ")}. Keep riskLevel values between 0-100. Keep xPct/yPct values between 10-90. Return ONLY the JSON.`;

    let imageUrl = image;
    if (image && !image.startsWith("http") && !image.startsWith("data:")) {
      imageUrl = `data:${imageType ?? "image/jpeg"};base64,${image}`;
    }

    const messages: any[] = [
      {
        role: "user",
        content: imageUrl
          ? [
            { type: "text", text: prompt },
            {
              type: "image_url",
              image_url: { url: imageUrl }
            }
          ]
          : [{ type: "text", text: prompt }]
      }
    ];

    const groqRes = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages,
        response_format: { type: "json_object" },
        temperature: 0.15,
        max_tokens: 2500,
      }),
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.error("Groq API error (insights):", groqRes.status, errText);
      return NextResponse.json({ error: "Groq API error", detail: errText, status: groqRes.status }, { status: 502 });
    }

    const groqData = await groqRes.json();
    const raw = groqData.choices?.[0]?.message?.content ?? "{}";

    let parsed: any;
    try {
      parsed = JSON.parse(raw);
    } catch {
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
    }

    return NextResponse.json({ insights: parsed });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Disease insights route error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
