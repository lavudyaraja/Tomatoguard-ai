"use client";

import React, { useState } from "react";
import {
    Activity, Leaf, Sun, Layers, Maximize2,
    AlertCircle, Camera, Sparkles, Microscope, MapPin,
    Image as ImageIcon, Droplets, Zap, TrendingUp,
    BarChart3, Target, Cpu, ChevronDown, ChevronUp
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { PredictionResult, DiseaseInfo, Hotspot } from "@/lib/types";
import { AnnotatedImagePanel } from "@/components/annotated-image-panel";

interface ResultImageProps {
    result: PredictionResult;
    diseaseInfo: DiseaseInfo;
    hotspots: Hotspot[];
    imageUrl: string | null;
    isHealthy: boolean;
    confidencePct: number;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ResultImage({
    result,
    diseaseInfo,
    hotspots,
    imageUrl,
    isHealthy,
    confidencePct,
}: ResultImageProps) {
    const [showAllModels, setShowAllModels] = useState(false);

    const severityColor = (s: string) => {
        const level = s?.toLowerCase();
        if (level === "low") return "#059669";
        if (level === "high") return "#dc2626";
        if (level === "critical") return "#9f1239";
        return "#d97706";
    };

    const svgColor = severityColor(diseaseInfo.severity);

    return (
        <div
            className="w-full space-y-6"
            style={{ fontFamily: "'Syne', system-ui, sans-serif" }}
        >

            {/* ── Section 1: Image Panels ───────────────────── */}
            <SectionHeader icon={<Camera className="h-4 w-4" />} label="Scan Analysis" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Original Scan */}
                <div className="space-y-2">
                    <PanelLabel
                        dot="#6366f1"
                        title="Original Scan"
                        subtitle="Disease lesion annotations"
                    />
                    <div className="rounded-2xl overflow-hidden border border-border/50 bg-card">
                        <AnnotatedImagePanel
                            imageUrl={result.annotated_original_url ?? imageUrl}
                            xaiUrl={result.xaiUrl}
                            hotspots={isHealthy ? [] : hotspots}
                            isHealthy={isHealthy}
                            title="Original Scan"
                            badge={
                                <Badge className="bg-black/60 backdrop-blur-md border-white/10 text-white font-bold gap-1.5 px-3 py-1 text-[10px] uppercase tracking-widest pointer-events-none">
                                    <Camera className="h-3 w-3" /> Original
                                </Badge>
                            }
                            showControls
                        />
                    </div>
                    <div className="flex items-center justify-between px-1">
                        <span className="text-[10px] text-muted-foreground">
                            {hotspots.length} lesion{hotspots.length !== 1 ? "s" : ""} annotated
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                            {result.imageInfo ? `${result.imageInfo.width}×${result.imageInfo.height}px` : "—"}
                        </span>
                    </div>
                </div>

                {/* Grad-CAM Panel */}
                <div className="space-y-2">
                    <PanelLabel
                        dot="#f97316"
                        title="Grad-CAM Heatmap"
                        subtitle="Model attention regions"
                    />
                    <div className="rounded-2xl overflow-hidden border border-border/50 bg-card">
                        <AnnotatedImagePanel
                            imageUrl={result.xaiUrl ?? null}
                            hotspots={[]}
                            isHealthy={isHealthy}
                            title="Grad-CAM"
                            badge={
                                <Badge className="bg-orange-500/80 backdrop-blur-md border-white/10 text-white font-bold gap-1.5 px-3 py-1 text-[10px] uppercase tracking-widest pointer-events-none">
                                    <Sparkles className="h-3 w-3" /> AI Focus Map
                                </Badge>
                            }
                            showControls={false}
                        />
                    </div>
                    {/* Heat scale */}
                    {result.xaiUrl && (
                        <div className="rounded-xl border border-border/40 bg-card px-4 py-3 space-y-2">
                            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Activation Intensity Scale</p>
                            <div
                                className="h-2 rounded-full w-full"
                                style={{ background: "linear-gradient(to right,#1e3a8a,#2563eb,#22c55e,#eab308,#f97316,#ef4444)" }}
                            />
                            <div className="flex justify-between">
                                {["Minimal", "Low", "Medium", "High", "Critical"].map(l => (
                                    <span key={l} className="text-[8px] font-semibold text-muted-foreground">{l}</span>
                                ))}
                            </div>
                            <p className="text-[10px] text-muted-foreground leading-snug" style={{ fontFamily: "'Lora', serif" }}>
                                Red/orange zones show where the model focused when making its prediction.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Section 2: Primary Diagnosis Card ─────────── */}
            <SectionHeader icon={<Microscope className="h-4 w-4" />} label="Primary Diagnosis" />

            <div className="rounded-3xl border border-border/60 bg-card overflow-hidden shadow-sm">
                {/* Top identity area */}
                <div className="p-6 sm:p-8 flex flex-col lg:flex-row gap-6 lg:gap-10 items-start lg:items-center">

                    {/* Left: Disease Identity */}
                    <div className="flex-1 space-y-4 min-w-0">
                        {/* Status row */}
                        <div className="flex flex-wrap items-center gap-2">
                            <span
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide"
                                style={{ background: `${svgColor}15`, color: svgColor }}
                            >
                                <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: svgColor }} />
                                {diseaseInfo.severity} Severity
                            </span>
                            {isHealthy && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-emerald-500/10 text-emerald-600">
                                    ✓ No Disease Detected
                                </span>
                            )}
                        </div>

                        {/* Disease name */}
                        <div>
                            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-1.5">Detected Condition</p>
                            <h2
                                className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight"
                            >
                                {diseaseInfo.displayName}
                            </h2>
                        </div>

                        {/* Description */}
                        {diseaseInfo.description && (
                            <p
                                className="text-foreground/90 text-base sm:text-lg leading-[1.6] text-pretty w-full"
                            >
                                {diseaseInfo.description || "In-depth diagnostic report is being finalized. Review technical metrics below."}
                            </p>
                        )}

                        {/* Stat pills */}
                        <div className="flex flex-wrap gap-4 pt-2">
                            <StatPill icon={<Leaf className="h-3.5 w-3.5" />} label="Crop" value="Tomato" />
                            <StatPill
                                icon={<MapPin className="h-3.5 w-3.5" />}
                                label="Lesions Found"
                                value={String(hotspots.length)}
                            />
                            <StatPill
                                icon={<Target className="h-3.5 w-3.5" />}
                                label="Models"
                                value="BiDCNet + CoAtNet + MaxViT + NextViT"
                            />
                        </div>
                    </div>

                    {/* Right: Confidence Ring */}
                    <ConfidenceRing value={confidencePct} isHealthy={isHealthy} />
                </div>

                {/* Divider */}
                <div className="border-t border-border/50" />

                {/* Image Quality Metrics */}
                {result.imageInfo && (() => {
                    const info = result.imageInfo;
                    const greenPct = info.green_coverage_pct ?? 0;
                    const brightness = info.brightness ?? 0;
                    const brightnessNorm = Math.round((brightness / 255) * 100);
                    const brightnessLabel = brightnessNorm < 30 ? "Underexposed" : brightnessNorm > 78 ? "Overexposed" : "Optimal";
                    const greenColor = greenPct > 60 ? "#22c55e" : greenPct > 35 ? "#eab308" : "#ef4444";
                    const brightnessColor = brightnessNorm < 30 || brightnessNorm > 78 ? "#f97316" : "#3b82f6";

                    return (
                        <div className="p-6 sm:p-8 space-y-6">
                            <div className="flex items-center gap-2">
                                <ImageIcon className="h-3.5 w-3.5 text-muted-foreground" />
                                <span
                                    className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]"
                                    style={{ fontFamily: "'Syne', sans-serif" }}
                                >
                                    Image Quality Report
                                </span>
                            </div>

                            {/* 3 metric cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {/* Leaf vitality */}
                                <MetricCard
                                    icon={<Leaf className="h-4 w-4" />}
                                    color={greenColor}
                                    label="Leaf Vitality"
                                    status={greenPct > 60 ? "Good" : greenPct > 35 ? "Fair" : "Poor"}
                                    primary={`${greenPct}%`}
                                    secondary="green coverage"
                                    bar={greenPct}
                                    barMin="0%" barMax="100%"
                                />
                                {/* Exposure */}
                                <MetricCard
                                    icon={<Sun className="h-4 w-4" />}
                                    color={brightnessColor}
                                    label="Light Exposure"
                                    status={brightnessLabel}
                                    primary={String(brightness)}
                                    secondary="/ 255 score"
                                    bar={brightnessNorm}
                                    barMin="Dark" barMax="Bright"
                                />
                                {/* Color profile */}
                                <div className="rounded-xl border border-border/60 bg-muted/10 p-4 space-y-3">
                                    <div className="flex items-center gap-2">
                                        <div className="h-6 w-6 rounded-md bg-purple-500/10 flex items-center justify-center">
                                            <Droplets className="h-3.5 w-3.5 text-purple-500" />
                                        </div>
                                        <span
                                            className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest"
                                            style={{ fontFamily: "'Syne', sans-serif" }}
                                        >
                                            Color Profile
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-xl font-bold text-foreground capitalize leading-none">
                                            {info.color_description ?? "—"}
                                        </p>
                                        <p className="text-[11px] text-muted-foreground mt-0.5">Dominant hue detected</p>
                                    </div>
                                    <div
                                        className="h-3 rounded-lg overflow-hidden border border-border/30"
                                        style={{
                                            background: info.color_description?.includes("green")
                                                ? "linear-gradient(to right,#14532d,#22c55e,#86efac)"
                                                : info.color_description?.includes("yellow")
                                                    ? "linear-gradient(to right,#713f12,#eab308,#fef08a)"
                                                    : info.color_description?.includes("brown")
                                                        ? "linear-gradient(to right,#431407,#b45309,#d97706)"
                                                        : "linear-gradient(to right,hsl(var(--muted)),hsl(var(--muted-foreground)))"
                                        }}
                                    />
                                </div>
                            </div>

                            {/* AI Commentary */}
                            {info.detailed_summary && (
                                <div className="flex gap-3 rounded-xl border border-border/50 bg-primary/5 p-4">
                                    <div className="flex-shrink-0 h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center mt-0.5">
                                        <Sparkles className="h-3.5 w-3.5 text-primary" />
                                    </div>
                                    <div>
                                        <p
                                            className="text-[9px] font-bold text-primary/70 uppercase tracking-[0.2em] mb-1.5"
                                            style={{ fontFamily: "'Syne', sans-serif" }}
                                        >
                                            AI Clinical Commentary
                                        </p>
                                        <p
                                            className="text-[13px] text-foreground/80 leading-[1.75]"
                                            style={{ fontFamily: "'Lora', Georgia, serif", fontStyle: "italic" }}
                                        >
                                            {info.detailed_summary}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Quality warnings */}
                            {info.quality_warnings?.length > 0 && (
                                <div className="rounded-xl border border-amber-400/30 bg-amber-50 dark:bg-amber-900/10 p-4 space-y-2.5">
                                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                                        <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                                        <span
                                            className="text-[9px] font-bold uppercase tracking-widest"
                                            style={{ fontFamily: "'Syne', sans-serif" }}
                                        >
                                            Quality Advisories — {info.quality_warnings.length}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                        {info.quality_warnings.map((w: string, i: number) => (
                                            <div
                                                key={i}
                                                className="flex items-start gap-2 text-[11px] text-amber-700 dark:text-amber-300/80"
                                                style={{ fontFamily: "'Lora', serif" }}
                                            >
                                                <span className="mt-2 flex-shrink-0 h-1 w-1 rounded-full bg-amber-500" />
                                                {w}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })()}
            </div>

            {/* ── Section 3: Technical Metrics ──────────────── */}
            {result.imageInfo && (
                <>
                    <SectionHeader icon={<Activity className="h-4 w-4" />} label="Technical Image Analysis" />
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                            {
                                icon: Leaf, color: "#22c55e",
                                label: "Leaf Vitality",
                                value: `${result.imageInfo.vitality_score ?? 82}%`,
                                sub: `${result.imageInfo.green_coverage_pct ?? "16.4"}% photosynthetic`,
                            },
                            {
                                icon: Sun, color: "#f59e0b",
                                label: "Light Quality",
                                value: result.imageInfo.light_quality ?? "Optimal",
                                sub: `Brightness: ${result.imageInfo.brightness ?? "—"}`,
                            },
                            {
                                icon: Layers, color: "#818cf8",
                                label: "Color Profile",
                                value: result.imageInfo.dominant_color ?? "Verdant",
                                sub: result.imageInfo.color_description ?? "—",
                            },
                            {
                                icon: Maximize2, color: "#0ea5e9",
                                label: "Resolution",
                                value: `${result.imageInfo.width}×${result.imageInfo.height}`,
                                sub: "pixels (original)",
                            },
                        ].map(({ icon: Icon, color, label, value, sub }) => (
                            <div
                                key={label}
                                className="rounded-2xl border border-border/50 bg-card p-4 hover:shadow-sm transition-shadow space-y-3"
                            >
                                <div
                                    className="h-9 w-9 rounded-xl flex items-center justify-center"
                                    style={{ background: `${color}18` }}
                                >
                                    <Icon className="h-4 w-4" style={{ color }} />
                                </div>
                                <div>
                                    <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{label}</p>
                                    <p className="text-base font-bold text-foreground capitalize mt-0.5">{value}</p>
                                    <p className="text-[10px] text-muted-foreground/60 mt-0.5 leading-tight">{sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* ── Section 4: Model Comparison ───────────────── */}
            {result.models && Object.keys(result.models).length >= 1 && (
                <>
                    <SectionHeader icon={<Cpu className="h-4 w-4" />} label="Model Ensemble" />

                    {/* grid: 1 col on mobile, 2 on md, 3-4 on lg when all four models are present */}
                    <div className={cn(
                        "grid gap-4",
                        Object.keys(result.models).length >= 4
                            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                            : Object.keys(result.models).length >= 3
                            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                            : "grid-cols-1 md:grid-cols-2"
                    )}>
                        {Object.entries(result.models).map(([key, data]) => {
                            const confPct = Math.round(data.confidence * 100);
                            // BiDCNet (scanet) is the primary proposed model
                            const isPrimary = key === "scanet";

                            // Labels / colours per model
                            const META: Record<string, { name: string; type: string; accent: string }> = {
                                scanet: { name: "BiDCNet (Proposed)", type: "Bidirectional Dual Cross-attention", accent: "#f59e0b" },
                                coatnet: { name: "CoAtNet", type: "Hybrid Attention", accent: "#6366f1" },
                                maxvit: { name: "MaxViT", type: "Multi-Axis Vision Transformer", accent: "#10b981" },
                                nextvit: { name: "NextViT", type: "Next-Gen Transformer", accent: "#8b5cf6" },
                            };
                            const meta = META[key] ?? { name: key.toUpperCase(), type: "Transformer", accent: "#6366f1" };

                            return (
                                <div
                                    key={key}
                                    className={cn(
                                        "rounded-2xl border bg-card p-5 space-y-4 hover:shadow-sm transition-shadow",
                                        isPrimary ? "border-primary/25" : "border-border/50"
                                    )}
                                >
                                    {/* Header */}
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1.5">
                                                <div
                                                    className="h-1.5 w-1.5 rounded-full"
                                                    style={{ background: data.prediction === "healthy" ? "#22c55e" : meta.accent }}
                                                />
                                                <span
                                                    className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground"
                                                    style={{ fontFamily: "'Syne', sans-serif" }}
                                                >
                                                    {meta.type}
                                                </span>
                                            </div>
                                            <h4
                                                className="text-base font-bold text-foreground"
                                                style={{ fontFamily: "'Syne', sans-serif" }}
                                            >
                                                {meta.name}
                                            </h4>
                                        </div>
                                        {isPrimary && (
                                            <span className="text-[9px] font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-1 rounded-lg">
                                                Primary
                                            </span>
                                        )}
                                    </div>

                                    {/* Prediction */}
                                    <div className="rounded-xl bg-muted/30 px-3 py-2.5">
                                        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Prediction</p>
                                        <p className="text-sm font-bold text-foreground capitalize">
                                            {data.prediction.replace(/_/g, " ")}
                                        </p>
                                    </div>

                                    {/* Confidence bar */}
                                    <div className="space-y-1.5">
                                        <div className="flex justify-between text-[10px] font-bold text-muted-foreground">
                                            <span>Confidence</span>
                                            <span className="text-foreground">{confPct}%</span>
                                        </div>
                                        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all duration-1000"
                                                style={{
                                                    width: `${confPct}%`,
                                                    background: confPct > 80 ? "#22c55e" : confPct > 60 ? "#f59e0b" : "#ef4444"
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Top-3 predictions */}
                                    <div className="space-y-2 pt-1 border-t border-border/40">
                                        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Top Predictions</p>
                                        {data.top5.slice(0, 3).map((item: any, i: number) => (
                                            <div key={i} className="flex justify-between items-center">
                                                <span
                                                    className="text-[11px] text-foreground/80 truncate flex-1"
                                                    style={{ fontFamily: "'Lora', serif" }}
                                                >
                                                    {item.label}
                                                </span>
                                                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                                                    <div className="h-1 w-16 rounded-full bg-muted overflow-hidden">
                                                        <div
                                                            className="h-full rounded-full"
                                                            style={{
                                                                width: `${Math.round(item.probability * 100)}%`,
                                                                background: meta.accent + "99"
                                                            }}
                                                        />
                                                    </div>
                                                    <span className="text-[10px] font-bold text-muted-foreground font-mono w-8 text-right">
                                                        {Math.round(item.probability * 100)}%
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}


        </div>
    );
}

// ─── Helper Functions ─────────────────────────────────────────────────────────

// ─── Sub-Components ───────────────────────────────────────────────────────────

function SectionHeader({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <div className="flex items-center gap-2.5 mt-2">
            <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                {icon}
            </div>
            <h3
                className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.2em]"
                style={{ fontFamily: "'Syne', sans-serif" }}
            >
                {label}
            </h3>
            <div className="flex-1 h-px bg-border/40" />
        </div>
    );
}

function PanelLabel({
    dot, title, subtitle,
}: { dot: string; title: string; subtitle: string }) {
    return (
        <div className="flex items-center gap-2 px-1">
            <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: dot }} />
            <span
                className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest"
                style={{ fontFamily: "'Syne', sans-serif" }}
            >
                {title}
            </span>
            <span className="text-[10px] text-muted-foreground/50">—</span>
            <span className="text-[10px] text-muted-foreground">{subtitle}</span>
        </div>
    );
}

function MetricCard({
    icon, color, label, status, primary, secondary, bar, barMin, barMax,
}: {
    icon: React.ReactNode;
    color: string;
    label: string;
    status: string;
    primary: string;
    secondary: string;
    bar: number;
    barMin: string;
    barMax: string;
}) {
    return (
        <div className="rounded-xl border border-border/60 bg-muted/10 p-4 space-y-3 hover:bg-muted/20 transition-colors">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div
                        className="h-6 w-6 rounded-md flex items-center justify-center"
                        style={{ background: `${color}15` }}
                    >
                        <span style={{ color }}>{icon}</span>
                    </div>
                    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{label}</span>
                </div>
                <span
                    className="text-[9px] font-bold px-1.5 py-0.5 rounded-md"
                    style={{ color, background: `${color}15` }}
                >
                    {status}
                </span>
            </div>
            <div>
                <span className="text-2xl font-black text-foreground tabular-nums">{primary}</span>
                <span className="text-[11px] text-muted-foreground ml-1.5">{secondary}</span>
            </div>
            <div className="space-y-1">
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${bar}%`, background: color }}
                    />
                </div>
                <div className="flex justify-between text-[8px] font-bold text-muted-foreground">
                    <span>{barMin}</span>
                    <span>{barMax}</span>
                </div>
            </div>
        </div>
    );
}



function StatPill({
    icon, label, value,
}: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground">
                {icon}
            </div>
            <div>
                <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-0.5">{label}</p>
                <p className="text-[13px] font-bold text-foreground leading-none">{value}</p>
            </div>
        </div>
    );
}

function ConfidenceRing({ value, isHealthy }: { value: number; isHealthy: boolean }) {
    const color = isHealthy ? "#22c55e" : value > 80 ? "#6366f1" : value > 60 ? "#f59e0b" : "#ef4444";
    const r = 60;
    const circ = 2 * Math.PI * r;
    const offset = circ - (circ * value) / 100;

    return (
        <div className="flex flex-col items-center gap-3 flex-shrink-0">
            <div className="relative h-36 w-36">
                <svg className="h-full w-full -rotate-90">
                    <circle cx="72" cy="72" r={r} stroke="hsl(var(--muted))" strokeWidth="7" fill="transparent" />
                    <circle
                        cx="72" cy="72" r={r}
                        stroke={color}
                        strokeWidth="7"
                        fill="transparent"
                        strokeDasharray={circ}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span
                        className="text-3xl font-extrabold tabular-nums"
                        style={{ color, fontFamily: "'Syne', sans-serif" }}
                    >
                        {value}%
                    </span>
                    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">
                        Confidence
                    </span>
                </div>
            </div>
            <span
                className="text-[10px] font-bold px-3 py-1 rounded-full"
                style={{ background: `${color}15`, color }}
            >
                {isHealthy ? "Healthy Plant" : value > 80 ? "High Certainty" : "Review Advised"}
            </span>
        </div>
    );
}