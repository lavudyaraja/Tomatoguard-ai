import { NextRequest, NextResponse } from "next/server";
import { getPredictionById } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const prediction = await getPredictionById(id);

        if (!prediction) {
            return NextResponse.json({ error: "Prediction not found" }, { status: 404 });
        }

        return NextResponse.json(prediction);
    } catch (error: any) {
        return NextResponse.json({ error: "Failed to fetch prediction", detail: error.message }, { status: 500 });
    }
}
