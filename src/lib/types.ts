// ── Prediction Types ──────────────────────────────────────────

export interface PredictionResult {
    id: string;
    prediction: string;
    confidence: number;
    confidence_pct?: number;
    top5: ClassProbability[];
    imageUrl: string;
    xaiUrl?: string;
    annotated_original_url?: string;
    hotspots?: Hotspot[];
    // ── NEW: Research-backed enhancements (PDF Report recommendations) ──
    ensemble_agreement?: number | null;
    prediction_entropy?: number | null;
    uncertainty_level?: "very_low" | "low" | "moderate" | "high";
    confusion_warning?: {
        message: string;
        recommendation: string;
        research_note: string;
    } | null;
    num_models_used?: number;
    model_consensus?: string;
    severity_assessment?: {
        severity_score: number;
        severity_level: "none" | "very_low" | "low" | "moderate" | "high" | "critical";
        affected_area_pct: number;
        num_lesions: number;
        avg_intensity: number;
        recommendation: string;
    } | null;
    imageInfo?: {
        brightness: number;
        green_coverage_pct: number;
        dominant_color: string;
        quality_warnings: string[];
        color_description: string;
        detailed_summary?: string;
        vitality_score?: string;
        light_quality?: string;
        sharpness?: number;
        saturation?: number;
        contrast?: number;
        noise_level?: string | number;
        width?: number;
        height?: number;
    };
    llmInsight?: {
        name: string;
        displayName: string;
        severity: "low" | "moderate" | "high" | "critical";
        description: string;
        symptoms: string[];
        causes: string[];
        treatments: string[];
        prevention: string[];
    };
    createdAt: string;
    models?: Record<string, {
        prediction: string;
        confidence: number;
        top5: { label: string; probability: number }[];
    }>;
    primary_prediction?: string;
    primary_confidence?: number;
    _meta?: Record<string, unknown>;
}

export interface Hotspot {
    xPct: number;
    yPct: number;
    intensity: number;
    radius: number;
    rank: number;
    label: string;
    area_pct?: number;
}

export interface ClassProbability {
    className: string;
    probability: number;
}

// ── Disease Reference Types ──────────────────────────────────

export interface DiseaseInfo {
    name: string;
    displayName: string;
    severity: "low" | "moderate" | "high" | "critical";
    description: string;
    symptoms: string[];
    causes: string[];
    treatments: string[];
    prevention: string[];
}

// ── API Types ────────────────────────────────────────────────

export interface PredictResponse {
    id: string;
    prediction: string;
    confidence: number;
    confidence_pct?: number;
    top5: { label: string; probability: number }[];
    imageUrl: string;
    xaiUrl?: string;
    hotspots?: Hotspot[];
    createdAt: string;
    // ── NEW: Research-backed enhancements ──
    ensemble_agreement?: number | null;
    prediction_entropy?: number | null;
    uncertainty_level?: string;
    confusion_warning?: {
        message: string;
        recommendation: string;
        research_note: string;
    } | null;
    num_models_used?: number;
    model_consensus?: string;
    severity_assessment?: {
        severity_score: number;
        severity_level: string;
        affected_area_pct: number;
        num_lesions: number;
        avg_intensity: number;
        recommendation: string;
    } | null;
    models?: Record<string, {
        prediction: string;
        confidence: number;
        top5: { label: string; probability: number }[];
    }>;
}

export interface HistoryResponse {
    predictions: PredictionResult[];
    total: number;
    page: number;
    pageSize: number;
}

export interface ApiError {
    error: string;
    detail?: string;
    statusCode: number;
}

// ── Upload Types ─────────────────────────────────────────────

export type UploadStatus = "idle" | "uploading" | "processing" | "success" | "error";

export interface UploadState {
    status: UploadStatus;
    progress: number;
    error?: string;
    file?: File;
    previewUrl?: string;
}

// ── Class Names ──────────────────────────────────────────────

export const CLASS_NAMES = [
    "Bacterial_spot",
    "Early_blight",
    "Late_blight",
    "Leaf_Mold",
    "Septoria_leaf_spot",
    "Spider_mites_Two-spotted_spider_mite",
    "Target_Spot",
    "Tomato_Yellow_Leaf_Curl_Virus",
    "Tomato_mosaic_virus",
    "healthy",
    "powdery_mildew",
] as const;

export type ClassName = (typeof CLASS_NAMES)[number];
