import { neon } from "@neondatabase/serverless";

// ── Build-Resilient Database Client ──────────────────────────────────────────
// We use a Proxy to ensure neon() is only called when a query is actually run.
// This prevents 'npm run build' from crashing when DATABASE_URL is missing.
const noop = () => Promise.resolve([]);
export const sql = new Proxy(noop as any, {
    get(target, prop) {
        const databaseUrl = process.env.DATABASE_URL;
        if (!databaseUrl) {
            if (process.env.NODE_ENV === "production") {
                throw new Error("DATABASE_URL is not set in production.");
            }
            console.warn("⚠️ DATABASE_URL is missing. DB operations will fail.");
            return noop;
        }
        const client = neon(databaseUrl);
        return Reflect.get(client, prop);
    },
    apply(target, thisArg, argumentsList) {
        const databaseUrl = process.env.DATABASE_URL;
        if (!databaseUrl) {
            console.warn("⚠️ DATABASE_URL missing. Query skipped.");
            return Promise.resolve([]);
        }
        const client = neon(databaseUrl);
        return (client as any)(...argumentsList);
    }
});

// ── Types ────────────────────────────────────────────────────────────────────

export interface DbPrediction {
    id: string;
    prediction: string;
    confidence: number;
    image_url: string | null;
    xai_url: string | null;
    hotspots: string | null; // JSON string
    image_info: string | null; // JSON string
    llm_insight: string | null;
    created_at: string;
}

export interface DbAnalytic {
    disease_name: string;
    count: number;
    last_detected: string;
}

// ── Queries ──────────────────────────────────────────────────────────────────

/**
 * Insert a new prediction record into the database
 */
export async function insertPrediction(
    id: string,
    prediction: string,
    confidence: number,
    imageUrl: string | null,
    llmInsight: any = null,
    xaiUrl: string | null = null,
    hotspots: any = null,
    imageInfo: any = null
): Promise<void> {
    const llmInsightStr = llmInsight ? JSON.stringify(llmInsight) : null;
    const hotspotsStr = hotspots ? JSON.stringify(hotspots) : null;
    const imageInfoStr = imageInfo ? JSON.stringify(imageInfo) : null;

    await sql`
    INSERT INTO history (id, prediction, confidence, image_url, xai_url, hotspots, image_info, llm_insight, created_at)
    VALUES (${id}, ${prediction}, ${confidence}, ${imageUrl}, ${xaiUrl}, ${hotspotsStr}, ${imageInfoStr}, ${llmInsightStr}, now())
    ON CONFLICT (id) DO UPDATE SET
        prediction = EXCLUDED.prediction,
        confidence = EXCLUDED.confidence,
        image_url = EXCLUDED.image_url,
        xai_url = EXCLUDED.xai_url,
        hotspots = EXCLUDED.hotspots,
        image_info = EXCLUDED.image_info,
        llm_insight = EXCLUDED.llm_insight;
  `;

    // Upsert analytics counter
    const severity = llmInsight?.severity || (prediction === "healthy" ? "low" : "moderate");
    await sql`
    INSERT INTO analytics (disease_name, count, last_detected, severity)
    VALUES (${prediction}, 1, now(), ${severity})
    ON CONFLICT (disease_name)
    DO UPDATE SET count = analytics.count + 1, last_detected = now(), severity = ${severity}
  `;
}

/**
 * Get recent prediction history with optional limit
 */
export async function getPredictionHistory(
    limit = 50,
    offset = 0
): Promise<DbPrediction[]> {
    const rows = await sql`
    SELECT id, prediction, confidence, image_url, xai_url, hotspots, image_info, llm_insight, created_at
    FROM history
    ORDER BY created_at DESC
    LIMIT ${limit} OFFSET ${offset}
  `;
    return rows as DbPrediction[];
}

/**
 * Get total count of predictions
 */
export async function getPredictionCount(): Promise<number> {
    const rows = await sql`SELECT COUNT(*) as count FROM history`;
    return Number((rows[0] as { count: string }).count);
}

/**
 * Get disease analytics / frequency data
 */
export async function getDiseaseAnalytics(): Promise<DbAnalytic[]> {
    const rows = await sql`
    SELECT disease_name, count, last_detected
    FROM analytics
    ORDER BY count DESC
  `;
    return rows as DbAnalytic[];
}

/**
 * Get a single prediction by ID
 */
export async function getPredictionById(id: string): Promise<DbPrediction | null> {
    const rows = await sql`
    SELECT id, prediction, confidence, image_url, xai_url, hotspots, image_info, llm_insight, created_at
    FROM history
    WHERE id = ${id}
  `;
    return rows.length > 0 ? (rows[0] as DbPrediction) : null;
}

/**
 * Delete a prediction by id
 */
export async function deletePrediction(id: string): Promise<void> {
    await sql`DELETE FROM history WHERE id = ${id}`;
}
