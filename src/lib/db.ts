import { neon } from "@neondatabase/serverless";

// ── Build-Resilient Database Client ──────────────────────────────────────────
// We use a Proxy to ensure neon() is only called when a query is actually run.
// This prevents 'npm run build' from crashing when DATABASE_URL is missing.
export const sql = new Proxy({} as any, {
    get(target, prop) {
        const databaseUrl = process.env.DATABASE_URL;
        if (!databaseUrl) {
            // During build, we return a no-op function to allow the build to finish.
            // During runtime, we throw a clear error.
            if (process.env.NODE_ENV === "production") {
                throw new Error("DATABASE_URL is not set in production.");
            }
            console.warn("⚠️ DATABASE_URL is missing. DB operations will fail.");
            return () => Promise.resolve([]);
        }

        // Initialize and cache the real neon instance
        const client = neon(databaseUrl);
        return Reflect.get(client, prop);
    },
    // Handle the function call if sql`...` is used directly
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
    imageUrl: string | null
): Promise<void> {
    await sql`
    INSERT INTO history (id, prediction, confidence, image_url, created_at)
    VALUES (${id}, ${prediction}, ${confidence}, ${imageUrl}, now())
  `;

    // Upsert analytics counter
    await sql`
    INSERT INTO analytics (disease_name, count, last_detected)
    VALUES (${prediction}, 1, now())
    ON CONFLICT (disease_name)
    DO UPDATE SET count = analytics.count + 1, last_detected = now()
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
    SELECT id, prediction, confidence, image_url, created_at
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
 * Delete a prediction by id
 */
export async function deletePrediction(id: string): Promise<void> {
    await sql`DELETE FROM history WHERE id = ${id}`;
}
