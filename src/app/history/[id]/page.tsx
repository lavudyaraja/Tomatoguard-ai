"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import {
    ChevronLeft, Calendar, Database,
    Share2, Printer, Activity, Zap,
    Copy, Check, AlertOctagon,
    ShieldCheck, Microscope, Clock,
    Leaf, FlaskConical, Waves, ExternalLink,
    Info, Bug, Thermometer, MapPin,
    Eye, EyeOff, Layers, Split,
    Maximize2, FileSearch
} from "lucide-react";
import { format } from "date-fns";
import { PredictionResult, DiseaseInfo, Hotspot } from "@/lib/types";
import { cn } from "@/lib/utils";
import { DiseaseDetail } from "@/components/disease-detail";
import { ResultImage } from "@/components/result-image";

/**
 * HISTORY DETAIL PAGE - CLINICAL ARCHIVE (v3.0)
 * Integrated with ResultImage for a unified diagnostic look.
 */

export default function HistoryDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<any>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        fetch(`/api/history/${id}`)
            .then(r => {
                if (!r.ok) throw new Error("Record not found.");
                return r.json();
            })
            .then(setData)
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }, [id]);

    const copyId = () => {
        navigator.clipboard.writeText(id).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    // ── Data Normalization ───────────────────────────────────────────
    const record = useMemo(() => {
        if (!data) return null;

        const llm = data.llm_insight ? JSON.parse(data.llm_insight) : null;
        const hotspots = data.hotspots ? JSON.parse(data.hotspots) : [];
        const imageInfo = data.image_info ? JSON.parse(data.image_info) : null;
        const diseaseName = data.prediction
            .split("_")
            .map((p: string) => p.charAt(0).toUpperCase() + p.slice(1))
            .join(" ");

        // Reconstruct PredictionResult object for ResultImage
        const resultObj: PredictionResult = {
            id: data.id,
            prediction: data.prediction,
            confidence: data.confidence,
            top5: data.top5 ? JSON.parse(data.top5) : [],
            imageUrl: data.image_url,
            xaiUrl: data.xai_url,
            hotspots: hotspots,
            imageInfo: imageInfo,
            llmInsight: llm,
            createdAt: data.created_at,
            models: data.models ? JSON.parse(data.models) : {}
        };

        const diseaseInfo: DiseaseInfo = llm || {
            name: data.prediction,
            displayName: diseaseName,
            severity: "moderate",
            description: "No clinical description cached for this record.",
            symptoms: [], causes: [], treatments: [], prevention: []
        };

        return {
            raw: data,
            result: resultObj,
            diseaseInfo: diseaseInfo,
            hotspots: hotspots,
            isHealthy: data.prediction.toLowerCase() === "healthy"
        };
    }, [data]);

    if (loading) return <LoadingState />;
    if (error || !record) return <ErrorState error={error} retry={() => router.push("/history")} />;

    const severity = record.diseaseInfo.severity?.toLowerCase() || "moderate";
    const sevColorsMap = {
        low: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
        moderate: "text-amber-500 bg-amber-500/10 border-amber-500/20",
        high: "text-orange-500 bg-orange-500/10 border-orange-500/20",
        critical: "text-rose-500 bg-rose-500/10 border-rose-500/20"
    };
    const sevColors = sevColorsMap[severity as keyof typeof sevColorsMap];

    return (
        <div className="min-h-screen bg-background selection:bg-primary/20">
            <Navbar />

            {/* ── CINEMATIC HEADER ────────────────────────────────────────── */}
            <div className="relative h-[40vh] md:h-[45vh] w-full overflow-hidden bg-slate-50 dark:bg-slate-950 border-b border-border/50">
                <div
                    className="absolute inset-0 bg-cover bg-center scale-110 opacity-30 dark:opacity-40 blur-3xl pointer-events-none"
                    style={{ backgroundImage: `url(${record.result.imageUrl})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background dark:via-slate-950/60 dark:to-background" />

                <div className="relative h-full max-w-6xl mx-auto px-6 flex flex-col justify-end pb-12">
                    <div className="space-y-6">
                        <button
                            onClick={() => router.push("/history")}
                            className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-xs font-bold uppercase tracking-widest"
                        >
                            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Archive
                        </button>

                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                            <div className="space-y-4">
                                <div className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border shadow-xl backdrop-blur-md", sevColors)}>
                                    <ShieldCheck className="h-3 w-3" />
                                    {severity} Severity
                                </div>
                                <h1 className="text-4xl md:text-6xl font-black text-foreground leading-none tracking-tighter" style={{ fontFamily: "'Syne', sans-serif" }}>
                                    {record.diseaseInfo.displayName}
                                </h1>
                                <div className="flex items-center gap-4 text-muted-foreground text-sm font-medium">
                                    <div className="flex items-center gap-2 tracking-tight">
                                        <Calendar className="h-3.5 w-3.5" />
                                        {record.raw.created_at ? format(new Date(record.raw.created_at), "MMMM d, yyyy") : "Archive Date"}
                                    </div>
                                    <div className="h-1 w-1 rounded-full bg-border" />
                                    <div className="flex items-center gap-2 tracking-tight">
                                        <Clock className="h-3.5 w-3.5" />
                                        {record.raw.created_at ? format(new Date(record.raw.created_at), "h:mm aa") : "—"}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 no-print">
                                <button onClick={copyId} className="h-12 w-12 rounded-2xl bg-accent hover:bg-accent/80 border border-border flex items-center justify-center text-foreground transition-all shadow-sm backdrop-blur-md" title="Copy Record URL">
                                    {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                                </button>
                                <button onClick={() => window.print()} className="h-12 px-6 rounded-2xl bg-primary text-primary-foreground font-bold flex items-center gap-3 hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 border border-primary/20">
                                    <Printer className="h-5 w-5" />
                                    Print Analysis
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── MAIN CONTENT ──────────────────────────────────────────── */}
            <main className="max-w-6xl mx-auto px-6 -mt-8 relative z-10 pb-20">
                <div className="space-y-12">

                    {/* INTEGRATED RESULT IMAGE COMPONENT (The "Result Image" look) */}
                    <ResultImage
                        result={record.result}
                        diseaseInfo={record.diseaseInfo}
                        hotspots={record.hotspots}
                        imageUrl={record.result.imageUrl}
                        isHealthy={record.isHealthy}
                        confidencePct={Math.round(record.result.confidence * 100)}
                    />

                    {/* DISEASE DETAIL COMPONENT (Treatment Protocols) */}
                    <div className="rounded-[2.5rem] border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden p-8 sm:p-12 shadow-sm">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                            <div className="flex items-center gap-4">
                                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                                    <FlaskConical className="h-7 w-7" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black text-foreground tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
                                        Treatment Protocols
                                    </h2>
                                    <p className="text-muted-foreground text-sm max-w-lg" style={{ fontFamily: "'Lora', serif" }}>
                                        Historical recovery guidance for this condition.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <DiseaseDetail
                            disease={record.diseaseInfo}
                            image={record.result.imageUrl}
                            imageInfo={record.result.imageInfo}
                            hotspots={record.hotspots}
                            hideDetails={false}
                        />
                    </div>
                </div>
            </main>

            {/* PRE-FOOTER STRIP */}
            <div className="border-y border-border/50 bg-card/50 py-16 no-print">
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    <FeatureItem icon={<Database className="h-5 w-5" />} title="Neon DB Archive" desc="Immutable historical data storage." />
                    <FeatureItem icon={<Layers className="h-5 w-5" />} title="Llama 4 Expert" desc="Multimodal forensic analysis." />
                    <FeatureItem icon={<ShieldCheck className="h-5 w-5" />} title="Verified Asset" desc="Cryptographically secure scans." />
                    <FeatureItem icon={<Microscope className="h-5 w-5" />} title="High Precision" desc="State-of-the-art vision engine." />
                </div>
            </div>

            {/* FOOTER */}
            <footer className="py-20 bg-background relative selection:bg-primary/30">
                <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 justify-center md:justify-start">
                            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white">
                                <Leaf className="h-4 w-4" />
                            </div>
                            <span className="text-xl font-black tracking-tighter" style={{ fontFamily: "'Syne', sans-serif" }}>
                                TomatoGuard
                            </span>
                        </div>
                        <p className="text-[10px] text-muted-foreground/60 font-medium tracking-widest uppercase text-center md:text-left">
                            © 2026 Agricultural AI Archive · Confidential Diagnostic Asset
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-8">
                        {['Privacy', 'Legal', 'Infrastructure', 'Technical Specs'].map(item => (
                            <a key={item} href="#" className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-[0.2em]">
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
}

// ─── SUBCOMPONENTS ──────────────────────────────────────────────────────────

function FeatureItem({ icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <div className="flex items-start gap-4 hover:scale-105 transition-transform duration-300 cursor-default group">
            <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center text-foreground shrink-0 shadow-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                {icon}
            </div>
            <div>
                <h5 className="font-bold text-sm mb-1 group-hover:text-primary transition-colors">{title}</h5>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}

function LoadingState() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-8 bg-background">
            <div className="relative h-24 w-24">
                <div className="absolute inset-0 rounded-full border-2 border-primary/10" />
                <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin" />
                <div className="absolute inset-4 rounded-full bg-primary/5 flex items-center justify-center">
                    <Leaf className="h-8 w-8 text-primary" />
                </div>
            </div>
            <div className="text-center space-y-2">
                <h3 className="text-xl font-bold tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>Synchronizing Archive</h3>
                <p className="text-xs text-muted-foreground uppercase tracking-[0.25em] animate-pulse">Retrieving Pathological Asset...</p>
            </div>
        </div>
    );
}

function ErrorState({ error, retry }: { error: string | null, retry: () => void }) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-8 bg-background p-6 text-center">
            <div className="h-24 w-24 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 shadow-2xl shadow-rose-500/20">
                <AlertOctagon className="h-12 w-12" />
            </div>
            <div className="space-y-3">
                <h2 className="text-3xl font-black tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>Diagnostic Record Unavailable</h2>
                <p className="text-muted-foreground max-w-md mx-auto leading-relaxed" style={{ fontFamily: "'Lora', serif" }}>
                    {error || "This specific diagnostic asset could not be retrieved from the archive."}
                </p>
            </div>
            <button
                onClick={retry}
                className="h-12 px-8 rounded-2xl bg-foreground text-background font-bold hover:scale-105 active:scale-95 transition-all shadow-xl"
            >
                Return to Directory
            </button>
        </div>
    );
}