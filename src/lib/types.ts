// ── Prediction Types ──────────────────────────────────────────

export interface PredictionResult {
    id: string;
    prediction: string;
    confidence: number;
    top5: ClassProbability[];
    imageUrl: string;
    createdAt: string;
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
    top5: ClassProbability[];
    imageUrl: string;
    createdAt: string;
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
