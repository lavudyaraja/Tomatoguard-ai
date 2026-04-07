import { NextResponse } from "next/server";
import { getDiseaseAnalytics, getPredictionCount } from "@/lib/db";

/**
 * GET /api/analytics
 * Returns disease frequency analytics from Neon DB
 */
export async function GET() {
    try {
        const [analytics, total] = await Promise.all([
            getDiseaseAnalytics(),
            getPredictionCount(),
        ]);

        return NextResponse.json({ analytics, totalPredictions: total });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error("Analytics API Error:", message);
        return NextResponse.json({ error: "Failed to fetch analytics", detail: message }, { status: 500 });
    }
}
