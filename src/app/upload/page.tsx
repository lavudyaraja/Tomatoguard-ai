"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
    Upload, X, FileImage, ShieldCheck, Loader2, AlertCircle,
    Leaf, Camera, CheckCircle2, Microscope, Cpu, Zap, RotateCcw,
    ImagePlus, Info, ChevronDown, Sparkles, Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PredictionResult } from "@/lib/types";

/* ─────────────────────────── constants ─────────────────────────── */

const TIPS = [
    "Ensure good lighting — avoid harsh shadows on the leaf.",
    "Photograph a single leaf clearly against a neutral background.",
    "Focus on the affected area for highest diagnostic accuracy.",
    "JPG, PNG, and WEBP formats are all supported (max 10 MB).",
    "Higher resolution images improve detection confidence.",
];

const MODELS = [
    {
        value: "quad-model",
        label: "Quad-Model",
        fullName: "Ensemble (BiDCNet + CoAtNet + MaxViT + NextViT)",
        badge: "Best Accuracy (99.03%)",
        badgeColor: "bg-amber-500/15 text-amber-400 border-amber-500/25",
        accuracy: "99.03%",
        speed: "< 1200ms",
        icon: "🏆",
    },
    {
        value: "dual-model",
        label: "Dual-Model",
        fullName: "Ensemble (CoAtNet + MaxViT)",
        badge: "Fast & Accurate",
        badgeColor: "bg-primary/15 text-primary border-primary/25",
        accuracy: "98.9%",
        speed: "< 850ms",
        icon: "🛡️",
    },
    {
        value: "maxvit",
        label: "MaxViT",
        fullName: "Multi-Axis Vision Transformer",
        badge: "Recommended",
        badgeColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
        accuracy: "98.8%",
        speed: "< 500ms",
        icon: "🧠",
    },
    {
        value: "ceit",
        label: "CEiT",
        fullName: "Conv-enhanced Image Transformer",
        badge: "Balanced",
        badgeColor: "bg-sky-500/15 text-sky-400 border-sky-500/25",
        accuracy: "98.7%",
        speed: "< 400ms",
        icon: "⚡",
    },
    {
        value: "coatnet",
        label: "CoAtNet",
        fullName: "Convolutional-Attention Network",
        badge: "Fast",
        badgeColor: "bg-amber-500/15 text-amber-400 border-amber-500/25",
        accuracy: "98.4%",
        speed: "< 350ms",
        icon: "🚀",
    },
    {
        value: "next-vit",
        label: "Next-ViT",
        fullName: "Next-Gen Vision Transformer",
        badge: "Efficient",
        badgeColor: "bg-violet-500/15 text-violet-400 border-violet-500/25",
        accuracy: "98.1%",
        speed: "< 420ms",
        icon: "✨",
    },
    {
        value: "densenet",
        label: "DenseNet",
        fullName: "Densely Connected ConvNet",
        badge: "Classic",
        badgeColor: "bg-rose-500/15 text-rose-400 border-rose-500/25",
        accuracy: "97.8%",
        speed: "< 300ms",
        icon: "🔬",
    },
    {
        value: "hybrid-cnn-vit",
        label: "CNN + ViT",
        fullName: "Hybrid CNN & Vision Transformer",
        badge: "Versatile",
        badgeColor: "bg-teal-500/15 text-teal-400 border-teal-500/25",
        accuracy: "98.9%",
        speed: "< 550ms",
        icon: "🔀",
    },
    {
        value: "mobile-vit",
        label: "MobileViT",
        fullName: "Mobile-Friendly Vision Transformer",
        badge: "Lightweight",
        badgeColor: "bg-orange-500/15 text-orange-400 border-orange-500/25",
        accuracy: "97.3%",
        speed: "< 200ms",
        icon: "📱",
    },
];

const DISEASES = [
    "Bacterial Spot",
    "Early Blight",
    "Late Blight",
    "Leaf Mold",
    "Septoria Leaf Spot",
    "Spider Mites",
    "Target Spot",
    "Yellow Leaf Curl Virus",
    "Tomato Mosaic Virus",
    "Powdery Mildew",
    "Healthy Plant",
];

function formatBytes(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/* ─────────────────────────── component ─────────────────────────── */

export default function UploadPage() {
    const router = useRouter();

    /* ── drag state ── */
    const [isDragging, setIsDragging] = useState(false);
    const [isWindowDragging, setIsWindowDragging] = useState(false);

    /* ── file / preview state ── */
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [fileName, setFileName] = useState("");
    const [fileSize, setFileSize] = useState("");

    /* ── upload / inference state ── */
    const [status, setStatus] = useState<"idle" | "uploading" | "processing" | "done" | "error">("idle");
    const [progress, setProgress] = useState(0);
    const [errorMsg, setErrorMsg] = useState("");

    /* ── model selection ── */
    const [selectedModel, setSelectedModel] = useState("dual-model");
    const [modelPanelOpen, setModelPanelOpen] = useState(false);

    /* ── cycling tip ── */
    const [tipIndex, setTipIndex] = useState(0);

    /* ── refs ── */
    const fileInputRef = useRef<HTMLInputElement>(null);
    const cameraInputRef = useRef<HTMLInputElement>(null);
    const fileRef = useRef<File | null>(null);
    const previewUrlRef = useRef<string | null>(null);

    /**
     * IMPORTANT: Store selectedModel in a ref so that `handleFile` (which is
     * memoised with an empty dep-array) always reads the *current* model value
     * instead of the stale closure captured at mount time.
     */
    const selectedModelRef = useRef(selectedModel);
    useEffect(() => { selectedModelRef.current = selectedModel; }, [selectedModel]);

    /* ── cycle tips ── */
    useEffect(() => {
        const id = setInterval(() => setTipIndex(i => (i + 1) % TIPS.length), 4000);
        return () => clearInterval(id);
    }, []);

    /* ── global drag listeners ── */
    useEffect(() => {
        const onDragOver = (e: DragEvent) => {
            e.preventDefault();
            if (e.dataTransfer?.types.includes("Files")) setIsWindowDragging(true);
        };
        const onDragLeave = (e: DragEvent) => {
            e.preventDefault();
            if (e.relatedTarget === null) setIsWindowDragging(false);
        };
        const onDrop = (e: DragEvent) => {
            e.preventDefault();
            setIsWindowDragging(false);
            const f = e.dataTransfer?.files?.[0];
            if (f) handleFile(f);
        };
        window.addEventListener("dragover", onDragOver);
        window.addEventListener("dragleave", onDragLeave);
        window.addEventListener("drop", onDrop);
        return () => {
            window.removeEventListener("dragover", onDragOver);
            window.removeEventListener("dragleave", onDragLeave);
            window.removeEventListener("drop", onDrop);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const abortControllerRef = useRef<AbortController | null>(null);

    /**
     * Compresses image on client-side before upload to prevent mobile time-outs
     * and server-side body-size limits.
     */
    const compressImage = async (file: File): Promise<Blob> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target?.result as string;
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    const MAX_WIDTH = 1200;
                    const MAX_HEIGHT = 1200;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext("2d");
                    ctx?.drawImage(img, 0, 0, width, height);
                    canvas.toBlob((blob) => {
                        if (blob) resolve(blob);
                        else reject(new Error("Compression failed"));
                    }, "image/jpeg", 0.7);
                };
            };
            reader.onerror = (error) => reject(error);
        });
    };

    /* ── core: run prediction ── */
    const runPrediction = useCallback(async (file: File, localUrl: string) => {
        // Abort any existing request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const controller = new AbortController();
        abortControllerRef.current = controller;

        // Read the current model from the ref — never stale
        const model = selectedModelRef.current;

        setStatus("uploading");
        setProgress(10);
        setErrorMsg("");

        const formData = new FormData();
        formData.append("image", file);
        formData.append("model", model);

        try {
            const uploadTimer = setTimeout(() => {
                setStatus("processing");
                setProgress(45);
            }, 800);

            // Compress image for mobile optimization if it's large
            let processedFile: Blob | File = file;
            if (file.size > 1 * 1024 * 1024) { // > 1MB
                try {
                    processedFile = await compressImage(file);
                } catch (e) {
                    console.warn("Client-side compression failed, sending original", e);
                }
            }

            const formData = new FormData();
            formData.append("image", processedFile, file.name);
            formData.append("model", model);

            const res = await fetch("/api/predict", {
                method: "POST",
                body: formData,
                signal: controller.signal
            });
            clearTimeout(uploadTimer);

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.error || `Server error: ${res.status}`);
            }

            const data: PredictionResult = await res.json();

            // CRITICAL: If the user clicked cancel while we were waiting, stop here.
            if (controller.signal.aborted || abortControllerRef.current !== controller) {
                return;
            }

            setProgress(95);

            // Handle potential SessionStorage QuotaExceededError (common on mobile)
            try {
                sessionStorage.setItem("tg_result", JSON.stringify(data));
                sessionStorage.setItem("tg_image_url", localUrl);
                sessionStorage.setItem("tg_model", model);
            } catch (quotaErr) {
                console.warn("SessionStorage full, clearing and trying again", quotaErr);
                sessionStorage.clear();
                try {
                    sessionStorage.setItem("tg_result", JSON.stringify(data));
                    sessionStorage.setItem("tg_image_url", localUrl);
                } catch (finalErr) {
                    console.error("Critical storage failure", finalErr);
                    // If even a single result is too big, it might be the base64 XAI images.
                    // We can still proceed, but the results page might lack some visuals.
                }
            }

            setStatus("done");
            setProgress(100);
            setTimeout(() => router.push("/results"), 600);
        } catch (err: unknown) {
            if (err instanceof Error && err.name === 'AbortError') {
                console.log('Fetch aborted');
                return;
            }
            const msg = err instanceof Error ? err.message : "Unknown error occurred.";
            setStatus("error");
            setErrorMsg(msg);
            setProgress(0);
        } finally {
            if (abortControllerRef.current === controller) {
                abortControllerRef.current = null;
            }
        }
    }, [router]); // added router to deps

    /* ── core: handle file selection ── */
    const handleFile = useCallback(async (file: File) => {
        if (!file.type.startsWith("image/")) {
            setErrorMsg("Please upload a valid image file (JPG, PNG, WEBP).");
            setStatus("error");
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            setErrorMsg("File exceeds 10 MB limit. Please use a smaller image.");
            setStatus("error");
            return;
        }

        // Revoke old object URL to avoid memory leaks
        if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);

        fileRef.current = file;
        setFileName(file.name);
        setFileSize(formatBytes(file.size));

        const objectUrl = URL.createObjectURL(file);
        previewUrlRef.current = objectUrl;
        setPreviewUrl(objectUrl);

        await runPrediction(file, objectUrl);
    }, [runPrediction]);

    /* ── reset ── */
    const reset = () => {
        // Abort any active request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
        }

        if (previewUrlRef.current) {
            URL.revokeObjectURL(previewUrlRef.current);
            previewUrlRef.current = null;
        }
        setPreviewUrl(null);
        setFileName("");
        setFileSize("");
        setStatus("idle");
        setProgress(0);
        setErrorMsg("");
        fileRef.current = null;
        if (fileInputRef.current) fileInputRef.current.value = "";
        if (cameraInputRef.current) cameraInputRef.current.value = "";
    };

    /* ── derived ── */
    const isBusy = status === "uploading" || status === "processing";
    const isDone = status === "done";
    const activeModel = MODELS.find(m => m.value === selectedModel) ?? MODELS[0];

    /* ── drop zone handlers ── */
    const onZoneDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
    const onZoneDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };
    const onZoneDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        setIsWindowDragging(false);
        const f = e.dataTransfer.files?.[0];
        if (f) handleFile(f);
    };

    /* ══════════════════════════════════════════════════════════════ */
    /*                          RENDER                               */
    /* ══════════════════════════════════════════════════════════════ */
    return (
        <div className="flex flex-col min-h-screen bg-background relative">

            {/* ── Global drag-overlay ── */}
            {isWindowDragging && (
                <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center
                                bg-background/85 backdrop-blur-lg border-[3px] border-dashed
                                border-primary/50 m-3 rounded-3xl
                                animate-in fade-in zoom-in-95 duration-200">
                    <div className="bg-primary/10 p-7 rounded-3xl mb-5 animate-bounce">
                        <Upload className="h-16 w-16 text-primary" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">Drop to analyse</h2>
                    <p className="text-muted-foreground text-sm">Release your leaf image to start AI detection</p>
                </div>
            )}

            <Navbar />

            <main className="flex-grow">

                {/* ══ Hero ══════════════════════════════════════════════════ */}
                <section className="relative overflow-hidden border-b border-border/40 py-12 sm:py-16">
                    {/* ambient blobs */}
                    <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2
                                    h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]" />
                    <div className="pointer-events-none absolute -bottom-10 right-16
                                    h-64 w-64 rounded-full bg-teal-400/8 blur-[90px]" />
                    <div className="pointer-events-none absolute top-20 left-10
                                    h-48 w-48 rounded-full bg-lime-500/5 blur-[70px]" />

                    <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-5">
                        {/* live pill */}
                        <div className="inline-flex items-center gap-2.5 rounded-full
                                        border border-emerald-500/25 bg-emerald-500/8 px-4 py-1.5">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                            </span>
                            <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400">
                                {activeModel.label} · Real-Time Inference
                            </span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05]">
                            Diagnose Your{" "}
                            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400
                                             bg-clip-text text-transparent">
                                Tomato Leaf
                            </span>
                        </h1>

                        <p className="max-w-xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed">
                            Upload or capture a photo for instant AI-powered disease detection
                            and personalised treatment recommendations.
                        </p>

                        {/* step indicators */}
                        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                            {[
                                { label: "Upload", active: status === "idle" || status === "error" },
                                { label: "Inference", active: status === "uploading" || status === "processing" },
                                { label: "Results", active: status === "done" },
                            ].map((s, i, arr) => (
                                <div key={s.label} className="flex items-center gap-2">
                                    <div className={cn(
                                        "flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold border transition-all duration-300",
                                        s.active
                                            ? "border-primary/50 bg-primary/12 text-primary shadow-sm shadow-primary/10"
                                            : "border-border/30 text-muted-foreground/60"
                                    )}>
                                        <span className={cn(
                                            "h-1.5 w-1.5 rounded-full",
                                            s.active ? "bg-primary" : "bg-muted-foreground/30"
                                        )} />
                                        {s.label}
                                    </div>
                                    {i < arr.length - 1 && (
                                        <div className="h-px w-6 bg-border/40" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══ Main Grid ═══════════════════════════════════════════ */}
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14
                                grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">

                    {/* ── Drop Zone ──────────────────────────────────────── */}
                    <div className="lg:col-span-2 space-y-4">

                        {/* Model Selector — full-width, above the drop zone */}
                        <Card className="p-4 bg-card/50 border-border/50 rounded-2xl">
                            <button
                                type="button"
                                disabled={isBusy}
                                onClick={() => setModelPanelOpen(o => !o)}
                                className={cn(
                                    "w-full flex items-center gap-3 text-left transition-opacity",
                                    isBusy && "opacity-50 pointer-events-none"
                                )}
                            >
                                {/* model icon bubble */}
                                <div className="h-11 w-11 rounded-xl bg-primary/10 border border-primary/15
                                                flex items-center justify-center text-xl flex-shrink-0">
                                    {activeModel.icon}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-sm font-bold">{activeModel.fullName}</span>
                                        <span className={cn(
                                            "text-[10px] font-bold px-2 py-0.5 rounded-full border",
                                            activeModel.badgeColor
                                        )}>
                                            {activeModel.badge}
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                        Accuracy&nbsp;
                                        <span className="text-emerald-400 font-semibold">{activeModel.accuracy}</span>
                                        &nbsp;·&nbsp;Inference&nbsp;
                                        <span className="text-yellow-400 font-semibold">{activeModel.speed}</span>
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <span className="text-xs text-muted-foreground hidden sm:inline">Change model</span>
                                    <ChevronDown className={cn(
                                        "h-4 w-4 text-muted-foreground transition-transform duration-200",
                                        modelPanelOpen && "rotate-180"
                                    )} />
                                </div>
                            </button>

                            {/* Expandable model grid */}
                            {modelPanelOpen && (
                                <div className="mt-4 pt-4 border-t border-border/40
                                                grid grid-cols-1 sm:grid-cols-2 gap-2
                                                animate-in slide-in-from-top-2 fade-in duration-200">
                                    {MODELS.map(model => (
                                        <button
                                            key={model.value}
                                            type="button"
                                            onClick={() => {
                                                setSelectedModel(model.value);
                                                setModelPanelOpen(false);
                                            }}
                                            className={cn(
                                                "flex items-center gap-3 rounded-xl p-3 border text-left",
                                                "transition-all duration-150 hover:border-primary/40 hover:bg-primary/5",
                                                selectedModel === model.value
                                                    ? "border-primary/50 bg-primary/8 ring-1 ring-primary/20"
                                                    : "border-border/40 bg-background/40"
                                            )}
                                        >
                                            <span className="text-xl">{model.icon}</span>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-xs font-bold truncate">{model.label}</span>
                                                    {selectedModel === model.value && (
                                                        <CheckCircle2 className="h-3 w-3 text-primary flex-shrink-0" />
                                                    )}
                                                </div>
                                                <p className="text-[11px] text-muted-foreground truncate">
                                                    {model.accuracy} accuracy
                                                </p>
                                            </div>
                                            <span className={cn(
                                                "text-[10px] font-bold px-1.5 py-0.5 rounded-full border flex-shrink-0",
                                                model.badgeColor
                                            )}>
                                                {model.badge}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </Card>

                        {/* Drop Zone Card */}
                        <Card
                            className={cn(
                                "relative w-full overflow-hidden transition-all duration-300",
                                "border-2 border-dashed rounded-2xl",
                                isDragging
                                    ? "border-primary bg-primary/5 scale-[1.005] shadow-2xl shadow-primary/15"
                                    : previewUrl
                                        ? "border-border/50 bg-card/60"
                                        : "border-muted-foreground/20 bg-card/30 hover:border-primary/40 hover:bg-card/50"
                            )}
                            onDragOver={onZoneDragOver}
                            onDragLeave={onZoneDragLeave}
                            onDrop={onZoneDrop}
                        >
                            {/* drag-over overlay */}
                            {isDragging && (
                                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center
                                                bg-primary/10 backdrop-blur-sm rounded-2xl">
                                    <div className="bg-primary/15 p-5 rounded-2xl mb-4 animate-bounce">
                                        <Upload className="h-12 w-12 text-primary" />
                                    </div>
                                    <p className="text-lg font-black text-primary">Release to upload</p>
                                    <p className="text-xs text-muted-foreground mt-1">Drop your leaf image here</p>
                                </div>
                            )}

                            <div className={cn(
                                "p-6 sm:p-12 flex flex-col items-center justify-center text-center",
                                previewUrl ? "min-h-[340px]" : "min-h-[380px] sm:min-h-[440px]"
                            )}>

                                {/* ── Idle ── */}
                                {!previewUrl && status !== "error" && (
                                    <>
                                        {/* upload icon cluster */}
                                        <div className="relative mb-8">
                                            <div className="h-24 w-24 rounded-[28px] bg-gradient-to-br
                                                            from-emerald-500/20 via-teal-500/15 to-cyan-500/10
                                                            border border-emerald-500/20 shadow-xl shadow-emerald-500/10
                                                            flex items-center justify-center">
                                                <Upload className="h-10 w-10 text-primary" />
                                            </div>
                                            {/* leaf badge */}
                                            <span className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full
                                                             bg-gradient-to-br from-emerald-500 to-teal-500
                                                             shadow-lg flex items-center justify-center">
                                                <Leaf className="h-4 w-4 text-white" />
                                            </span>
                                        </div>

                                        <h2 className="text-2xl sm:text-3xl font-black mb-2">
                                            Drop your image here
                                        </h2>
                                        <p className="text-sm text-muted-foreground mb-8 max-w-sm leading-relaxed">
                                            Drag &amp; drop, browse files, or snap a photo.
                                            <br />
                                            <span className="opacity-70">JPG · PNG · WEBP &nbsp;|&nbsp; Max 10 MB</span>
                                        </p>

                                        {/* action buttons */}
                                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center">
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={e => {
                                                    const f = e.target.files?.[0];
                                                    if (f) handleFile(f);
                                                }}
                                            />
                                            <input
                                                ref={cameraInputRef}
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                capture="environment"
                                                onChange={e => {
                                                    const f = e.target.files?.[0];
                                                    if (f) handleFile(f);
                                                }}
                                            />

                                            <Button
                                                size="lg"
                                                onClick={() => fileInputRef.current?.click()}
                                                className="gradient-emerald h-12 px-8 font-bold rounded-xl
                                                           hover:scale-105 hover:shadow-xl hover:shadow-primary/20
                                                           transition-all duration-200 w-full sm:w-auto"
                                            >
                                                <ImagePlus className="mr-2 h-4.5 w-4.5" />
                                                Browse Files
                                            </Button>
                                            <Button
                                                size="lg"
                                                variant="outline"
                                                onClick={() => cameraInputRef.current?.click()}
                                                className="h-12 px-7 font-semibold rounded-xl border-border/60
                                                           hover:border-primary/50 hover:bg-primary/5 transition-all
                                                           w-full sm:w-auto"
                                            >
                                                <Camera className="mr-2 h-4.5 w-4.5" />
                                                Use Camera
                                            </Button>
                                        </div>

                                        {/* trust badges */}
                                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-10
                                                        text-[11px] text-muted-foreground/70 font-medium uppercase tracking-wider">
                                            {[
                                                { icon: ShieldCheck, text: "Privacy-Safe", color: "text-emerald-500" },
                                                { icon: Zap, text: "< 500ms", color: "text-yellow-500" },
                                                { icon: FileImage, text: "11 Classes", color: "text-sky-500" },
                                                { icon: Sparkles, text: "99.03% Accuracy", color: "text-violet-400" },
                                            ].map(({ icon: Icon, text, color }) => (
                                                <span key={text} className="flex items-center gap-1.5">
                                                    <Icon className={cn("h-3.5 w-3.5", color)} />
                                                    {text}
                                                </span>
                                            ))}
                                        </div>
                                    </>
                                )}

                                {/* ── Preview + status ── */}
                                {previewUrl && (
                                    <div className="w-full animate-in fade-in zoom-in-95 duration-300 space-y-6">
                                        {/* image */}
                                        <div className="relative mx-auto w-56 sm:w-72 aspect-square
                                                        rounded-2xl overflow-hidden shadow-2xl ring-1 ring-border/40">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={previewUrl}
                                                alt="Leaf preview"
                                                className="w-full h-full object-cover"
                                            />

                                            {/* busy overlay */}
                                            {isBusy && (
                                                <div className="absolute inset-0 bg-black/60 flex flex-col
                                                                items-center justify-center gap-3 backdrop-blur-[2px] pointer-events-none">
                                                    <div className="relative">
                                                        <div className="h-16 w-16 rounded-full border-2 border-white/10 border-t-white/80 animate-spin" />
                                                        <Activity className="absolute inset-0 m-auto h-6 w-6 text-white/90" />
                                                    </div>
                                                    <span className="text-xs font-bold text-white/80 uppercase tracking-widest">
                                                        {status === "uploading" ? "Uploading…" : "Analysing…"}
                                                    </span>
                                                </div>
                                            )}

                                            {/* done overlay */}
                                            {isDone && (
                                                <div className="absolute inset-0 bg-emerald-900/55 flex items-center
                                                                justify-center backdrop-blur-[2px] pointer-events-none">
                                                    <div className="bg-emerald-500/20 p-4 rounded-full">
                                                        <CheckCircle2 className="h-12 w-12 text-emerald-400 drop-shadow-lg" />
                                                    </div>
                                                </div>
                                            )}

                                            {/* cancel/remove btn */}
                                            {!isDone && (
                                                <div className="absolute top-4 right-4 z-[60] pointer-events-auto">
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={reset}
                                                        className="h-9 px-4 rounded-xl bg-black/60 hover:bg-destructive/90 text-white border border-white/20 backdrop-blur-md transition-all active:scale-95 group/btn"
                                                    >
                                                        <X className="h-4 w-4 mr-2 group-hover/btn:rotate-90 transition-transform" />
                                                        Cancel scan
                                                    </Button>
                                                </div>
                                            )}
                                        </div>

                                        {/* file meta */}
                                        {fileName && (
                                            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                                                <FileImage className="h-3.5 w-3.5 text-primary" />
                                                <span className="font-medium truncate max-w-[200px]">{fileName}</span>
                                                <Badge
                                                    variant="outline"
                                                    className="text-[10px] px-1.5 py-0 border-border/50"
                                                >
                                                    {fileSize}
                                                </Badge>
                                                <Badge
                                                    variant="outline"
                                                    className="text-[10px] px-1.5 py-0 border-primary/30 text-primary/80"
                                                >
                                                    {activeModel.label}
                                                </Badge>
                                            </div>
                                        )}

                                        {/* progress bar */}
                                        {isBusy && (
                                            <div className="max-w-sm mx-auto space-y-2.5">
                                                <div className="flex justify-between text-sm font-medium">
                                                    <span className="flex items-center gap-2 text-muted-foreground text-xs">
                                                        <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                                                        {status === "uploading"
                                                            ? "Uploading image…"
                                                            : `Running ${activeModel.label} inference…`}
                                                    </span>
                                                    <span className="text-primary font-black tabular-nums text-xs">
                                                        {progress}%
                                                    </span>
                                                </div>
                                                <Progress value={progress} className="h-2 bg-muted rounded-full" />
                                                <p className="text-[11px] text-muted-foreground text-center">
                                                    Redirecting to results dashboard on completion…
                                                </p>
                                            </div>
                                        )}

                                        {/* done */}
                                        {isDone && (
                                            <div className="flex flex-col items-center gap-2">
                                                <p className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                                                    <CheckCircle2 className="h-4 w-4" />
                                                    Analysis complete — redirecting…
                                                </p>
                                                <Progress value={100} className="h-1.5 max-w-[200px] bg-muted" />
                                            </div>
                                        )}

                                        {/* error (with preview) */}
                                        {status === "error" && (
                                            <div className="max-w-sm mx-auto space-y-4">
                                                <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20
                                                                text-destructive flex items-start gap-3">
                                                    <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                                                    <p className="text-sm font-medium text-left leading-relaxed">
                                                        {errorMsg || "Analysis failed. Please try a clearer image."}
                                                    </p>
                                                </div>
                                                <div className="flex gap-3 justify-center">
                                                    <Button variant="outline" onClick={reset} className="gap-2 rounded-xl">
                                                        <RotateCcw className="h-4 w-4" /> Try Another
                                                    </Button>
                                                    <Button
                                                        className="gradient-emerald gap-2 rounded-xl"
                                                        onClick={() => fileRef.current && runPrediction(fileRef.current, previewUrl!)}
                                                    >
                                                        <Loader2 className="h-4 w-4" /> Retry
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* ── Standalone error (no preview) ── */}
                                {!previewUrl && status === "error" && (
                                    <div className="space-y-5 max-w-sm mx-auto w-full">
                                        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20
                                                        text-destructive flex items-start gap-3">
                                            <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                                            <p className="text-sm font-medium text-left">{errorMsg}</p>
                                        </div>
                                        <Button variant="outline" onClick={reset} className="gap-2 w-full rounded-xl">
                                            <RotateCcw className="h-4 w-4" /> Try Again
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </Card>

                        {/* Rotating Tip bar */}
                        <div className="flex items-start gap-3 rounded-xl border border-border/40
                                        bg-card/30 px-4 py-3 text-xs text-muted-foreground">
                            <Info className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-primary" />
                            <p className="font-medium leading-relaxed">
                                <span className="text-primary font-bold mr-1">Tip:</span>
                                {TIPS[tipIndex]}
                            </p>
                        </div>
                    </div>

                    {/* ── Sidebar ────────────────────────────────────────── */}
                    <aside className="space-y-5">

                        {/* Active Model Stats */}
                        <Card className="p-5 bg-card/40 border-border/50 rounded-2xl space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/15
                                                flex items-center justify-center text-xl">
                                    {activeModel.icon}
                                </div>
                                <div>
                                    <p className="text-sm font-bold">{activeModel.label}</p>
                                    <p className="text-[11px] text-muted-foreground leading-tight">
                                        {activeModel.fullName}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { label: "Accuracy", value: activeModel.accuracy, color: "text-emerald-400" },
                                    { label: "Inference", value: activeModel.speed, color: "text-yellow-400" },
                                    { label: "Classes", value: "11", color: "text-sky-400" },
                                    { label: "Training imgs", value: "43 K+", color: "text-purple-400" },
                                ].map(s => (
                                    <div key={s.label}
                                        className="rounded-xl bg-background/60 border border-border/40 p-3">
                                        <p className={cn("text-lg font-black", s.color)}>{s.value}</p>
                                        <p className="text-[11px] text-muted-foreground font-medium mt-0.5">
                                            {s.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Detectable Diseases */}
                        <Card className="p-5 bg-card/40 border-border/50 rounded-2xl">
                            <p className="text-sm font-bold mb-3 flex items-center gap-2">
                                <Microscope className="h-4 w-4 text-primary" />
                                Detectable Conditions
                            </p>
                            <ul className="space-y-1.5">
                                {DISEASES.map((d, i) => (
                                    <li key={d}
                                        className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                                        <span className={cn(
                                            "h-1.5 w-1.5 rounded-full flex-shrink-0",
                                            i === DISEASES.length - 1 ? "bg-emerald-500" : "bg-primary/50"
                                        )} />
                                        {d}
                                        {i === DISEASES.length - 1 && (
                                            <CheckCircle2 className="h-3 w-3 text-emerald-500 ml-auto" />
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </Card>

                        {/* Privacy note */}
                        <div className="flex items-start gap-3 rounded-xl border border-emerald-500/20
                                        bg-emerald-500/5 p-4">
                            <ShieldCheck className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                <span className="font-bold text-emerald-400">Privacy guaranteed.&nbsp;</span>
                                Images are processed server-side and are never stored or shared.
                            </p>
                        </div>
                    </aside>
                </div>
            </main >

            <Footer />
        </div >
    );
}