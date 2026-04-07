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
    ImagePlus, Info
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PredictionResult } from "@/lib/types";

/* ─────────────────────── tiny helpers ─────────────────────── */
const TIPS = [
    "Ensure good lighting — avoid harsh shadows on the leaf.",
    "Photograph a single leaf clearly against a neutral background.",
    "Focus on the affected area for highest diagnostic accuracy.",
    "JPG, PNG, and WEBP formats are all supported (max 10 MB).",
    "Higher resolution images improve detection confidence.",
];

const STEPS = [
    { icon: ImagePlus, label: "Upload", desc: "Drop or select your leaf image" },
    { icon: Cpu, label: "Inference", desc: "MaxViT analyzes in milliseconds" },
    { icon: Microscope, label: "Results", desc: "Detailed diagnosis & treatment plan" },
];

function formatBytes(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/* ─────────────────────── component ─────────────────────── */
export default function UploadPage() {
    const router = useRouter();
    const [isDragging, setIsDragging] = useState(false);
    const [isWindowDragging, setIsWindowDragging] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string>("");
    const [fileSize, setFileSize] = useState<string>("");
    const [status, setStatus] = useState<"idle" | "uploading" | "processing" | "done" | "error">("idle");
    const [progress, setProgress] = useState(0);
    const [errorMsg, setErrorMsg] = useState("");
    const [tipIndex, setTipIndex] = useState(0);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const cameraInputRef = useRef<HTMLInputElement>(null);
    const fileRef = useRef<File | null>(null);

    const runPrediction = async (file: File, localUrl: string) => {
        setStatus("uploading");
        setProgress(10);
        setErrorMsg("");

        const formData = new FormData();
        formData.append("image", file);

        try {
            const uploadTimer = setTimeout(() => { setStatus("processing"); setProgress(45); }, 800);
            const res = await fetch("/api/predict", { method: "POST", body: formData });
            clearTimeout(uploadTimer);

            if (!res.ok) throw new Error(`Server error: ${res.status} ${res.statusText}`);

            const data: PredictionResult = await res.json();
            setProgress(95);

            sessionStorage.setItem("tg_result", JSON.stringify(data));
            sessionStorage.setItem("tg_image_url", data.imageUrl || localUrl);

            setStatus("done");
            setProgress(100);
            setTimeout(() => router.push("/results"), 600);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Unknown error occurred.";
            setStatus("error");
            setErrorMsg(msg);
            setProgress(0);
        }
    };

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
        fileRef.current = file;
        setFileName(file.name);
        setFileSize(formatBytes(file.size));
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
        await runPrediction(file, objectUrl);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* cycle tips */
    useEffect(() => {
        const id = setInterval(() => setTipIndex(i => (i + 1) % TIPS.length), 4000);
        return () => clearInterval(id);
    }, []);

    /* Prevent browser default drag behavior on whole window & track global drag */
    useEffect(() => {
        const onDragOver = (e: DragEvent) => {
            e.preventDefault();
            if (e.dataTransfer?.types.includes("Files")) {
                setIsWindowDragging(true);
            }
        };
        const onDragLeave = (e: DragEvent) => {
            e.preventDefault();
            if (e.relatedTarget === null) {
                setIsWindowDragging(false);
            }
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
    }, [handleFile]);

    const reset = () => {
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

    const isBusy = status === "uploading" || status === "processing";
    const isDone = status === "done";

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

    return (
        <div className="flex flex-col min-h-screen bg-background relative">
            {/* Global Drag Overlay */}
            {isWindowDragging && (
                <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/80 backdrop-blur-md border-4 border-dashed border-primary/40 m-2 sm:m-4 rounded-2xl sm:rounded-3xl animate-in fade-in zoom-in duration-300">
                    <div className="bg-primary/10 p-6 sm:p-8 rounded-full mb-4 sm:mb-6 animate-pulse">
                        <Upload className="h-12 w-12 sm:h-20 sm:w-20 text-primary" />
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">Drop it here!</h2>
                    <p className="text-muted-foreground text-sm sm:text-lg">Release your leaf image to start the analysis</p>
                </div>
            )}
            <Navbar />
            <main className="flex-grow">

                {/* ── Hero Banner ── */}
                <section className="relative overflow-hidden border-b border-border/40 py-14">
                    {/* ambient glow */}
                    <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-emerald-500/12 blur-[100px]" />
                    <div className="pointer-events-none absolute bottom-0 right-10 h-48 w-48 rounded-full bg-teal-400/8 blur-[80px]" />

                    <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-5">
                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/8 px-4 py-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-400">
                                MaxViT AI · Real-Time Inference
                            </span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                            Upload a{" "}
                            <span className="text-gradient-emerald">Leaf Image</span>
                        </h1>

                        <p className="max-w-lg mx-auto text-base text-muted-foreground leading-relaxed">
                            Drag, drop, or capture a tomato leaf photo for instant AI-powered disease detection
                            and personalised treatment advice.
                        </p>

                        {/* process steps */}
                        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                            {STEPS.map((s, i) => (
                                <div key={s.label} className="flex items-center gap-1.5">
                                    <div className={cn(
                                        "flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold border transition-all",
                                        i === (status === "idle" || status === "error" ? 0 : status === "uploading" || status === "processing" ? 1 : 2)
                                            ? "border-primary/40 bg-primary/10 text-primary"
                                            : "border-border/40 text-muted-foreground"
                                    )}>
                                        <s.icon className="h-3.5 w-3.5" />
                                        {s.label}
                                    </div>
                                    {i < STEPS.length - 1 && (
                                        <div className="h-px w-5 bg-border/50" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Main Content ── */}
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    {/* ── Drop Zone (left 2 cols) ── */}
                    <div className="lg:col-span-2 space-y-4">
                        <Card
                            className={cn(
                                "relative w-full overflow-hidden transition-all duration-300 border-2 border-dashed rounded-2xl",
                                isDragging
                                    ? "border-primary bg-primary/5 scale-[1.005] shadow-xl shadow-primary/10"
                                    : previewUrl
                                        ? "border-border/50 bg-card/60"
                                        : "border-muted-foreground/20 bg-card/30 hover:border-primary/40 hover:bg-card/50",
                                isBusy ? "pointer-events-none" : ""
                            )}
                            onDragOver={onZoneDragOver}
                            onDragLeave={onZoneDragLeave}
                            onDrop={onZoneDrop}
                        >
                            {/* drag overlay label */}
                            {isDragging && (
                                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-primary/10 backdrop-blur-sm rounded-2xl">
                                    <Upload className="h-14 w-14 text-primary animate-bounce mb-3" />
                                    <p className="text-lg font-bold text-primary">Release to upload</p>
                                </div>
                            )}

                            <div className="p-6 sm:p-14 flex flex-col items-center justify-center text-center min-h-[360px] sm:min-h-[420px]">

                                {/* ── Idle state ── */}
                                {!previewUrl && status !== "error" && (
                                    <>
                                        <div className="relative mb-8">
                                            <div className="h-24 w-24 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/20 flex items-center justify-center shadow-lg shadow-emerald-500/10">
                                                <Upload className="h-11 w-11 text-primary" />
                                            </div>
                                            <span className="absolute -bottom-1.5 -right-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 shadow-md">
                                                <Leaf className="h-3.5 w-3.5 text-white" />
                                            </span>
                                        </div>

                                        <h2 className="text-2xl font-extrabold mb-2">Drop your image here</h2>
                                        <p className="text-sm text-muted-foreground mb-8 max-w-sm">
                                            JPG, PNG, or WEBP · max 10 MB. <br />
                                            Or use the buttons below.
                                        </p>

                                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center">
                                            <input ref={fileInputRef} type="file" className="hidden" accept="image/*"
                                                onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
                                            <input ref={cameraInputRef} type="file" className="hidden" accept="image/*" capture="environment"
                                                onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />

                                            <Button size="lg" onClick={() => fileInputRef.current?.click()}
                                                className="gradient-emerald h-12 w-full sm:w-auto px-8 font-bold hover:scale-105 hover:shadow-xl hover:shadow-primary/20 transition-all">
                                                <ImagePlus className="mr-2 h-4.5 w-4.5" /> Browse Files
                                            </Button>
                                            <Button size="lg" variant="outline" onClick={() => cameraInputRef.current?.click()}
                                                className="h-12 w-full sm:w-auto px-7 font-semibold border-border/60 hover:border-primary/50 hover:bg-primary/5 transition-all">
                                                <Camera className="mr-2 h-4.5 w-4.5" /> Use Camera
                                            </Button>
                                        </div>

                                        <div className="flex flex-wrap justify-center gap-x-5 gap-y-3 mt-10 text-[10px] sm:text-xs text-muted-foreground font-medium opacity-80 uppercase tracking-wider">
                                            {[
                                                { icon: ShieldCheck, text: "Privacy-Safe", color: "text-emerald-500" },
                                                { icon: Zap, text: "< 500ms inference", color: "text-yellow-500" },
                                                { icon: FileImage, text: "11 disease classes", color: "text-sky-500" },
                                            ].map(({ icon: Icon, text, color }) => (
                                                <span key={text} className="flex items-center gap-1.5">
                                                    <Icon className={cn("h-3 w-3 sm:h-3.5 sm:w-3.5", color)} /> {text}
                                                </span>
                                            ))}
                                        </div>
                                    </>
                                )}

                                {/* ── Preview + status ── */}
                                {previewUrl && (
                                    <div className="w-full animate-fade-in space-y-6">
                                        {/* image preview */}
                                        <div className="relative mx-auto w-full max-w-xs aspect-square rounded-2xl overflow-hidden shadow-2xl ring-1 ring-border/40">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={previewUrl} alt="Leaf preview" className="w-full h-full object-cover" />

                                            {/* busy overlay */}
                                            {isBusy && (
                                                <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center gap-3 backdrop-blur-sm">
                                                    <Loader2 className="h-12 w-12 text-white animate-spin" />
                                                    <span className="text-xs font-semibold text-white/80 tracking-wide uppercase">
                                                        {status === "uploading" ? "Uploading…" : "Analysing…"}
                                                    </span>
                                                </div>
                                            )}

                                            {/* done overlay */}
                                            {isDone && (
                                                <div className="absolute inset-0 bg-emerald-900/50 flex items-center justify-center backdrop-blur-sm">
                                                    <CheckCircle2 className="h-14 w-14 text-emerald-400 drop-shadow-lg" />
                                                </div>
                                            )}

                                            {/* remove button */}
                                            {!isBusy && !isDone && (
                                                <button onClick={reset}
                                                    className="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-md hover:bg-destructive/80 transition-colors z-10">
                                                    <X className="h-4 w-4" />
                                                </button>
                                            )}
                                        </div>

                                        {/* file meta */}
                                        {fileName && (
                                            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                                                <FileImage className="h-3.5 w-3.5 text-primary" />
                                                <span className="font-medium truncate max-w-[180px]">{fileName}</span>
                                                <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-border/50">{fileSize}</Badge>
                                            </div>
                                        )}

                                        {/* progress */}
                                        {isBusy && (
                                            <div className="max-w-sm mx-auto space-y-2.5">
                                                <div className="flex justify-between text-sm font-medium">
                                                    <span className="flex items-center gap-2 text-muted-foreground">
                                                        <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                                                        {status === "uploading" ? "Uploading image…" : "Running MaxViT inference…"}
                                                    </span>
                                                    <span className="text-primary font-bold tabular-nums">{progress}%</span>
                                                </div>
                                                <Progress value={progress} className="h-2 bg-muted rounded-full" />
                                                <p className="text-[11px] text-muted-foreground text-center">
                                                    Redirecting to results dashboard upon completion…
                                                </p>
                                            </div>
                                        )}

                                        {/* done */}
                                        {isDone && (
                                            <div className="flex flex-col items-center gap-2">
                                                <p className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
                                                    <CheckCircle2 className="h-4 w-4" /> Analysis complete — redirecting…
                                                </p>
                                                <Progress value={100} className="h-1.5 max-w-[180px] bg-muted" />
                                            </div>
                                        )}

                                        {/* error */}
                                        {status === "error" && (
                                            <div className="max-w-sm mx-auto space-y-4">
                                                <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive flex items-start gap-3">
                                                    <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                                                    <p className="text-sm font-medium text-left leading-relaxed">
                                                        {errorMsg || "Analysis failed. Please try a clearer image or verify the backend is running."}
                                                    </p>
                                                </div>
                                                <div className="flex gap-3 justify-center">
                                                    <Button variant="outline" onClick={reset} className="gap-2">
                                                        <RotateCcw className="h-4 w-4" /> Try Another
                                                    </Button>
                                                    <Button className="gradient-emerald gap-2"
                                                        onClick={() => fileRef.current && runPrediction(fileRef.current, previewUrl!)}>
                                                        <Loader2 className="h-4 w-4" /> Retry
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* ── Standalone error (no preview) ── */}
                                {!previewUrl && status === "error" && (
                                    <div className="space-y-5 max-w-sm mx-auto">
                                        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive flex items-start gap-3">
                                            <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                                            <p className="text-sm font-medium text-left">{errorMsg}</p>
                                        </div>
                                        <Button variant="outline" onClick={reset} className="gap-2 w-full">
                                            <RotateCcw className="h-4 w-4" /> Try Again
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </Card>

                        {/* Tip bar */}
                        <div className="flex items-start gap-3 rounded-xl border border-border/40 bg-card/30 px-4 py-3 text-xs text-muted-foreground">
                            <Info className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-primary" />
                            <p className="font-medium leading-relaxed transition-all duration-500 key-{tipIndex}">
                                <span className="text-primary font-bold mr-1">Tip:</span>{TIPS[tipIndex]}
                            </p>
                        </div>
                    </div>

                    {/* ── Sidebar info ── */}
                    <aside className="space-y-5">
                        {/* Model card */}
                        <Card className="p-5 bg-card/40 border-border/50 rounded-2xl space-y-4">
                            <div className="flex items-center gap-2.5">
                                <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Cpu className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold">MaxViT Model</p>
                                    <p className="text-xs text-muted-foreground">Multi-Axis Vision Transformer</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { label: "Accuracy", value: "99.2%", color: "text-emerald-400" },
                                    { label: "Inference", value: "< 500ms", color: "text-yellow-400" },
                                    { label: "Classes", value: "11", color: "text-sky-400" },
                                    { label: "Training imgs", value: "24K+", color: "text-purple-400" },
                                ].map(s => (
                                    <div key={s.label} className="rounded-xl bg-background/60 border border-border/40 p-3">
                                        <p className={cn("text-lg font-extrabold", s.color)}>{s.value}</p>
                                        <p className="text-[11px] text-muted-foreground font-medium mt-0.5">{s.label}</p>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Supported diseases */}
                        <Card className="p-5 bg-card/40 border-border/50 rounded-2xl">
                            <p className="text-sm font-bold mb-3 flex items-center gap-2">
                                <Microscope className="h-4 w-4 text-primary" /> Detectable Diseases
                            </p>
                            <ul className="space-y-1.5">
                                {[
                                    "Bacterial Spot", "Early Blight", "Late Blight", "Leaf Mold",
                                    "Septoria Leaf Spot", "Spider Mites", "Target Spot",
                                    "Yellow Leaf Curl Virus", "Tomato Mosaic Virus", "Powdery Mildew",
                                    "✓ Healthy Plant",
                                ].map((d, i) => (
                                    <li key={d} className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                                        <span className={cn(
                                            "h-1.5 w-1.5 rounded-full flex-shrink-0",
                                            i === 10 ? "bg-emerald-500" : "bg-primary/50"
                                        )} />
                                        {d}
                                    </li>
                                ))}
                            </ul>
                        </Card>

                        {/* Privacy note */}
                        <div className="flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                            <ShieldCheck className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                <span className="font-bold text-emerald-400">Privacy guaranteed.</span>{" "}
                                Your images are processed server-side and are never stored or shared.
                            </p>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}