import { NextRequest, NextResponse } from "next/server";
import { getPredictionHistory, getPredictionCount, deletePrediction } from "@/lib/db";

export const dynamic = "force-dynamic";

/**
 * GET /api/history
 * Returns paginated prediction history from Neon DB
 */
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
        const limit = Math.min(100, parseInt(searchParams.get("limit") || "20"));
        const offset = (page - 1) * limit;

        const [predictions, total] = await Promise.all([
            getPredictionHistory(limit, offset),
            getPredictionCount(),
        ]);

        return NextResponse.json({
            predictions,
            total,
            page,
            pageSize: limit,
            totalPages: Math.ceil(total / limit),
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error("History API Error:", message);
        return NextResponse.json({ error: "Failed to fetch history", detail: message }, { status: 500 });
    }
}

/**
 * DELETE /api/history?id=<prediction_id>
 * Deletes a specific prediction
 */
export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) {
            return NextResponse.json({ error: "id parameter is required" }, { status: 400 });
        }
        await deletePrediction(id);
        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ error: "Failed to delete prediction", detail: message }, { status: 500 });
    }
}
