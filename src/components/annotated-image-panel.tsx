"use client";

import React, { useState, useRef, useEffect } from "react";
import {
    Maximize2, ZoomIn, ZoomOut, RotateCcw, X,
    FlipHorizontal, Move, MapPin, EyeOff, Eye,
    Crosshair, Leaf, Sun, Droplets, AlertCircle, ImageOff
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Hotspot, PredictionResult } from "@/lib/types";

// ── Hotspot colour helpers ────────────────────────────────────────────────────

export function hotspotColor(intensity: number): {
    ring: string; fill: string; text: string; badge: string; dot: string;
} {
    if (intensity >= 0.75) return {
        ring: "#ef4444", fill: "rgba(239,68,68,0.18)",
        text: "#ef4444", badge: "bg-red-500", dot: "bg-red-500",
    };
    if (intensity >= 0.55) return {
        ring: "#f97316", fill: "rgba(249,115,22,0.18)",
        text: "#f97316", badge: "bg-orange-500", dot: "bg-orange-500",
    };
    if (intensity >= 0.35) return {
        ring: "#eab308", fill: "rgba(234,179,8,0.18)",
        text: "#eab308", badge: "bg-yellow-500", dot: "bg-yellow-500",
    };
    return {
        ring: "#22c55e", fill: "rgba(34,197,94,0.18)",
        text: "#22c55e", badge: "bg-emerald-500", dot: "bg-emerald-500",
    };
}

export function intensityLabel(intensity: number): string {
    if (intensity >= 0.75) return "Critical";
    if (intensity >= 0.55) return "Active";
    if (intensity >= 0.35) return "Moderate";
    return "Mild";
}

// ── Fullscreen Modal ──────────────────────────────────────────────────────────

export function FullscreenModal({
    imageUrl,
    xaiUrl,
    onClose,
}: {
    imageUrl: string | null;
    xaiUrl: string | null | undefined;
    onClose: () => void;
}) {
    const [blendMode, setBlendMode] = useState<"original" | "xai" | "compare">("original");
    const [sliderPct, setSliderPct] = useState(50);
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dragStart = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "+" || e.key === "=") setZoom(z => Math.min(z + 0.25, 4));
            if (e.key === "-") setZoom(z => Math.max(z - 0.25, 0.5));
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose]);

    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.15 : 0.15;
        setZoom(z => Math.max(0.5, Math.min(4, z + delta)));
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (blendMode === "compare") return;
        setIsDragging(true);
        dragStart.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !dragStart.current) return;
        setPan({
            x: dragStart.current.panX + (e.clientX - dragStart.current.x),
            y: dragStart.current.panY + (e.clientY - dragStart.current.y),
        });
    };

    const handleMouseUp = () => { setIsDragging(false); dragStart.current = null; };
    const resetView = () => { setZoom(1); setPan({ x: 0, y: 0 }); };

    const handleCompareMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (blendMode !== "compare") return;
        const rect = e.currentTarget.getBoundingClientRect();
        setSliderPct(((e.clientX - rect.left) / rect.width) * 100);
    };

    return (
        <div className="fixed inset-0 z-[9999] bg-background/95 dark:bg-black/95 backdrop-blur-xl flex flex-col" onClick={onClose}>
            {/* Toolbar */}
            <div
                className="flex-shrink-0 flex items-center justify-between px-6 md:px-24 py-3 border-b border-border/50"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center gap-2">
                    {(["original", "xai", ...(xaiUrl ? ["compare"] : [])] as const).map(mode => (
                        <button
                            key={mode}
                            onClick={() => { setBlendMode(mode as any); resetView(); }}
                            className={cn(
                                "px-3 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wider transition-all",
                                blendMode === mode
                                    ? "bg-foreground text-background"
                                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                            )}
                        >
                            {mode === "original" ? "Original" : mode === "xai" ? "AI Activation" : "Compare"}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="text-muted-foreground text-[11px] font-mono mr-2">{Math.round(zoom * 100)}%</span>
                    <button onClick={() => setZoom(z => Math.min(z + 0.25, 4))} className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                        <ZoomIn className="h-4 w-4" />
                    </button>
                    <button onClick={() => setZoom(z => Math.max(z - 0.25, 0.5))} className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                        <ZoomOut className="h-4 w-4" />
                    </button>
                    <button onClick={resetView} className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                        <RotateCcw className="h-4 w-4" />
                    </button>
                    <div className="w-px h-4 bg-border mx-1" />
                    <button onClick={onClose} className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                        <X className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Canvas */}
            <div
                ref={containerRef}
                className="flex-1 overflow-hidden flex items-center justify-center relative"
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={blendMode === "compare" ? handleCompareMouseMove : handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onClick={e => e.stopPropagation()}
                style={{ cursor: blendMode === "compare" ? "col-resize" : isDragging ? "grabbing" : zoom > 1 ? "grab" : "default" }}
            >
                {blendMode === "compare" && xaiUrl ? (
                    /* Compare slider mode */
                    <div className="relative max-w-3xl w-full mx-auto" style={{ aspectRatio: "4/3" }}>
                        {/* XAI full background */}
                        <img src={xaiUrl} alt="Grad-CAM" className="absolute inset-0 w-full h-full object-contain select-none" draggable={false} />
                        {/* Original clipped left */}
                        {imageUrl && (
                            <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - sliderPct}% 0 0)` }}>
                                <img src={imageUrl} alt="Original" className="w-full h-full object-contain select-none" draggable={false} />
                            </div>
                        )}
                        {/* Divider line */}
                        <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]" style={{ left: `${sliderPct}%`, transform: "translateX(-50%)" }}>
                            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
                                <FlipHorizontal className="h-4 w-4 text-black" />
                            </div>
                        </div>
                        {/* Labels */}
                        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">Original</div>
                        <div className="absolute top-4 right-4 bg-emerald-500/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">AI Activation</div>
                    </div>
                ) : (
                    /* Single image with zoom/pan */
                    <div
                        style={{
                            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                            transition: isDragging ? "none" : "transform 0.15s ease",
                            transformOrigin: "center",
                        }}
                    >
                        {((blendMode === "xai" ? xaiUrl : imageUrl)) ? (
                            <img
                                src={(blendMode === "xai" ? xaiUrl : imageUrl) || ""}
                                alt={blendMode === "xai" ? "Grad-CAM" : "Original"}
                                className="max-w-[85vw] max-h-[80vh] object-contain rounded-lg select-none"
                                draggable={false}
                            />
                        ) : (
                            <div className="flex flex-col items-center gap-3 text-white/40">
                                <ImageOff className="h-16 w-16" />
                                <p className="text-sm font-bold uppercase tracking-wider">Image data unavailable</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Footer hint */}
            <div className="flex-shrink-0 flex justify-center py-2.5 gap-4 border-t border-border/50" onClick={e => e.stopPropagation()}>
                {[
                    { icon: <Move className="h-3 w-3" />, label: "Drag to pan" },
                    { icon: <ZoomIn className="h-3 w-3" />, label: "Scroll to zoom" },
                    { icon: <X className="h-3 w-3" />, label: "Esc to close" },
                ].map(({ icon, label }) => (
                    <span key={label} className="flex items-center gap-1.5 text-muted-foreground/60 text-[10px]">{icon}{label}</span>
                ))}
            </div>
        </div>
    );
}

// ── Image Stats Panel ─────────────────────────────────────────────────────────

export function ImageStatsPanel({ imageInfo }: { imageInfo: PredictionResult["imageInfo"] }) {
    if (!imageInfo) return null;

    const greenPct = imageInfo.green_coverage_pct ?? 0;
    const brightness = imageInfo.brightness ?? 0;
    const brightnessNorm = Math.round((brightness / 255) * 100);

    const stats = [
        {
            icon: <Leaf className="h-3.5 w-3.5" />,
            label: "Leaf Vitality",
            value: `${greenPct}%`,
            sub: "green coverage",
            bar: greenPct,
            color: greenPct > 60 ? "#22c55e" : greenPct > 35 ? "#eab308" : "#ef4444",
            bg: greenPct > 60 ? "bg-emerald-500/10" : greenPct > 35 ? "bg-yellow-500/10" : "bg-red-500/10",
        },
        {
            icon: <Sun className="h-3.5 w-3.5" />,
            label: "Brightness",
            value: String(brightness),
            sub: `score / 255 · ${brightnessNorm < 40 ? "underexposed" : brightnessNorm > 80 ? "overexposed" : "optimal"}`,
            bar: brightnessNorm,
            color: brightnessNorm < 40 || brightnessNorm > 80 ? "#f97316" : "#3b82f6",
            bg: "bg-blue-500/10",
        },
        {
            icon: <Droplets className="h-3.5 w-3.5" />,
            label: "Color Tone",
            value: imageInfo.color_description ?? "—",
            sub: "detected dominant hue",
            bar: null,
            color: "#a855f7",
            bg: "bg-purple-500/10",
        },
    ];

    return (
        <div className="mt-3 grid grid-cols-3 gap-2">
            {stats.map((s, i) => (
                <div key={i} className={cn("rounded-xl p-3 border border-border/40", s.bg)}>
                    <div className="flex items-center gap-1.5 mb-2" style={{ color: s.color }}>
                        {s.icon}
                        <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">{s.label}</span>
                    </div>
                    <p className="text-sm font-black text-foreground capitalize leading-none mb-0.5">{s.value}</p>
                    <p className="text-[9px] text-muted-foreground leading-tight mb-2">{s.sub}</p>
                    {s.bar !== null && (
                        <div className="h-1 rounded-full bg-muted overflow-hidden">
                            <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${s.bar}%`, backgroundColor: s.color }} />
                        </div>
                    )}
                </div>
            ))}

            {/* Quality warnings */}
            {imageInfo.quality_warnings?.length > 0 && (
                <div className="col-span-3 rounded-xl p-3 border border-amber-500/20 bg-amber-500/5 flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-amber-500 mb-1">
                        <AlertCircle className="h-3.5 w-3.5" />
                        <span className="text-[9px] font-black uppercase tracking-widest">Quality Advisories</span>
                    </div>
                    {imageInfo.quality_warnings.map((w: string, i: number) => (
                        <p key={i} className="text-[10px] text-amber-700 dark:text-amber-400 flex items-start gap-1.5">
                            <span className="mt-0.5 flex-shrink-0 h-1.5 w-1.5 rounded-full bg-amber-500 inline-block" />
                            {w}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
}

// ── DiseasePin ────────────────────────────────────────────────────────────────

export function DiseasePin({
    hotspot,
    selected,
    onSelect,
    showPins,
}: {
    hotspot: Hotspot;
    selected: boolean;
    onSelect: () => void;
    showPins: boolean;
}) {
    const colors = hotspotColor(hotspot.intensity);
    const diameter = Math.max(hotspot.radius * 2, 6);
    if (!showPins) return null;

    return (
        <TooltipProvider delay={150}>
            <Tooltip>
                <TooltipTrigger
                    onClick={onSelect}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                    style={{ left: `${hotspot.xPct}%`, top: `${hotspot.yPct}%`, zIndex: selected ? 30 : 20 }}
                >
                    <div className="relative">
                        <span
                            className="absolute inset-0 rounded-full pointer-events-none"
                            style={{
                                border: `2px solid ${colors.ring}`,
                                width: `${diameter}vw`, height: `${diameter}vw`,
                                maxWidth: 120, maxHeight: 120, minWidth: 36, minHeight: 36,
                                animation: selected ? "ping-slow 1.6s cubic-bezier(0,0,0.2,1) infinite" : undefined,
                                opacity: selected ? 0.6 : 0.35,
                                top: "50%", left: "50%",
                                transform: "translate(-50%, -50%) scale(1)",
                            }}
                        />
                        <span
                            className="absolute rounded-full pointer-events-none transition-all duration-200"
                            style={{
                                background: colors.fill, border: `1.5px solid ${colors.ring}`,
                                width: `${diameter}vw`, height: `${diameter}vw`,
                                maxWidth: 120, maxHeight: 120, minWidth: 36, minHeight: 36,
                                top: "50%", left: "50%",
                                transform: "translate(-50%, -50%)",
                                boxShadow: selected ? `0 0 0 3px white, 0 0 0 5px ${colors.ring}` : `0 0 0 1.5px rgba(255,255,255,0.5)`,
                            }}
                        />
                        <span
                            className={cn(
                                "relative z-10 flex items-center justify-center rounded-full text-white font-bold text-[10px] shadow-lg transition-transform duration-150",
                                selected ? "scale-110" : "group-hover:scale-105",
                                colors.badge,
                            )}
                            style={{ width: 22, height: 22, border: "1.5px solid white" }}
                        >
                            {hotspot.rank}
                        </span>
                    </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-card border border-border text-foreground px-3 py-2 shadow-xl rounded-lg text-[11px]">
                    <div className="font-bold mb-0.5" style={{ color: colors.text }}>
                        #{hotspot.rank} — {intensityLabel(hotspot.intensity)} lesion
                    </div>
                    <div className="text-muted-foreground capitalize">{hotspot.label}</div>
                    <div className="text-muted-foreground">
                        Activation: {Math.round(hotspot.intensity * 100)}%
                        {hotspot.area_pct != null && ` · Area: ${hotspot.area_pct.toFixed(1)}%`}
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

// ── Hotspot Legend ────────────────────────────────────────────────────────────

export function HotspotLegend({
    hotspots,
    selectedIdx,
    onSelect,
}: {
    hotspots: Hotspot[];
    selectedIdx: number | null;
    onSelect: (i: number | null) => void;
}) {
    if (!hotspots.length) return null;
    return (
        <div className="mt-3 flex flex-col gap-1.5">
            {hotspots.map((hs, i) => {
                const colors = hotspotColor(hs.intensity);
                const active = selectedIdx === i;
                return (
                    <button
                        key={i}
                        onClick={() => onSelect(active ? null : i)}
                        className={cn(
                            "flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-left transition-all duration-150 text-[11px]",
                            active ? "bg-muted/80 border border-border shadow-sm" : "hover:bg-muted/50 border border-transparent",
                        )}
                    >
                        <span
                            className="flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center text-white font-black text-[9px]"
                            style={{ background: colors.ring, border: "1.5px solid white" }}
                        >
                            {hs.rank}
                        </span>
                        <span className="flex-1 min-w-0">
                            <span className="font-semibold text-foreground capitalize">{hs.label}</span>
                            <span className="ml-2 text-muted-foreground">
                                {intensityLabel(hs.intensity)} · {Math.round(hs.intensity * 100)}%
                                {hs.area_pct != null && ` · ${hs.area_pct.toFixed(1)}% area`}
                            </span>
                            {/* NEW: Spatial Coordinates */}
                            <p className="text-[9px] text-primary/70 font-mono mt-0.5">
                                Spatially mapped at X:{hs.xPct.toFixed(1)}%, Y:{hs.yPct.toFixed(1)}%
                            </p>
                        </span>
                        {active && <Crosshair className="h-3 w-3 text-muted-foreground flex-shrink-0" />}
                    </button>
                );
            })}
        </div>
    );
}

// ── Selected Hotspot Detail Card ──────────────────────────────────────────────

export function HotspotDetailCard({ hotspot }: { hotspot: Hotspot }) {
    const colors = hotspotColor(hotspot.intensity);
    return (
        <div
            className="mt-3 rounded-xl border p-4 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200"
            style={{ borderColor: `${colors.ring}30`, background: `${colors.fill}` }}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="h-5 w-5 rounded-full flex items-center justify-center text-white font-black text-[9px]"
                        style={{ background: colors.ring }}>
                        {hotspot.rank}
                    </span>
                    <span className="text-[11px] font-black uppercase tracking-wider" style={{ color: colors.text }}>
                        {intensityLabel(hotspot.intensity)} Lesion #{hotspot.rank}
                    </span>
                </div>
                <span className="text-[10px] font-bold text-muted-foreground capitalize">{hotspot.label}</span>
            </div>

            {/* Mini bar chart row */}
            <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Activation</p>
                    <div className="h-1.5 rounded-full bg-muted/50 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${hotspot.intensity * 100}%`, backgroundColor: colors.ring }} />
                    </div>
                    <p className="text-[10px] font-bold" style={{ color: colors.text }}>{Math.round(hotspot.intensity * 100)}%</p>
                </div>
                {hotspot.area_pct != null && (
                    <div className="space-y-1">
                        <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Area Coverage</p>
                        <div className="h-1.5 rounded-full bg-muted/50 overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${Math.min(hotspot.area_pct * 5, 100)}%`, backgroundColor: colors.ring }} />
                        </div>
                        <p className="text-[10px] font-bold" style={{ color: colors.text }}>{hotspot.area_pct.toFixed(1)}% of leaf</p>
                    </div>
                )}
                <div className="space-y-1">
                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Pinpoint Location</p>
                    <p className="text-[10px] font-bold text-primary font-mono">
                        [{hotspot.xPct.toFixed(2)}%, {hotspot.yPct.toFixed(2)}%]
                    </p>
                    <p className="text-[9px] text-muted-foreground">Normalized X·Y Grid</p>
                </div>
            </div>
        </div>
    );
}

// ── Annotated Image Panel ─────────────────────────────────────────────────────

export function AnnotatedImagePanel({
    imageUrl,
    xaiUrl,
    hotspots,
    isHealthy,
    title,
    badge,
    showControls = true,
}: {
    imageUrl: string | null;
    xaiUrl?: string | null;
    hotspots: Hotspot[];
    isHealthy: boolean;
    title: string;
    badge: React.ReactNode;
    showControls?: boolean;
}) {
    const [showPins, setShowPins] = useState(true);
    const [selectedHotspot, setSelectedHotspot] = useState<number | null>(null);
    const [fullscreen, setFullscreen] = useState(false);
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dragStart = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);

    const handlePinSelect = (i: number) => setSelectedHotspot(prev => prev === i ? null : i);

    const handleWheel = (e: React.WheelEvent) => {
        // Only prevent default if we are doing something with zoom
        if (showControls) {
            // e.preventDefault(); // Moved out of inline to be safer with passive listeners
            const delta = e.deltaY > 0 ? -0.12 : 0.12;
            setZoom(z => Math.max(1, Math.min(3, z + delta)));
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (zoom <= 1) return;
        setIsDragging(true);
        dragStart.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !dragStart.current) return;
        setPan({ x: dragStart.current.panX + (e.clientX - dragStart.current.x), y: dragStart.current.panY + (e.clientY - dragStart.current.y) });
    };

    const handleMouseUp = () => { setIsDragging(false); dragStart.current = null; };
    const resetZoom = () => { setZoom(1); setPan({ x: 0, y: 0 }); };

    return (
        <>
            {fullscreen && (
                <FullscreenModal
                    imageUrl={imageUrl}
                    xaiUrl={xaiUrl}
                    onClose={() => setFullscreen(false)}
                />
            )}

            <div className="flex flex-col h-full">
                {/* Image container */}
                <div
                    className="relative rounded-2xl overflow-hidden bg-card border border-border/60 aspect-video md:aspect-auto md:h-[420px] shadow-sm group/main"
                    onWheel={showControls ? handleWheel : undefined}
                    onMouseDown={showControls ? handleMouseDown : undefined}
                    onMouseMove={showControls ? handleMouseMove : undefined}
                    onMouseUp={showControls ? handleMouseUp : undefined}
                    onMouseLeave={showControls ? handleMouseUp : undefined}
                    style={{ cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "default" }}
                >
                    {imageUrl ? (
                        <div
                            className="w-full h-full"
                            style={{
                                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                                transition: isDragging ? "none" : "transform 0.2s ease",
                                transformOrigin: "center",
                            }}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={imageUrl}
                                alt={title}
                                className="w-full h-full object-cover"
                                draggable={false}
                            />
                        </div>
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Leaf className="h-12 w-12 text-muted-foreground" />
                        </div>
                    )}

                    {/* Pins (only shown at zoom=1 to avoid stacking issues) */}
                    {zoom === 1 && hotspots.map((hs, i) => (
                        <DiseasePin key={i} hotspot={hs} selected={selectedHotspot === i} onSelect={() => handlePinSelect(i)} showPins={showPins} />
                    ))}

                    {/* Top-left badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
                        {badge}
                        {!isHealthy && hotspots.length > 0 && (
                            <span className="bg-muted/80 dark:bg-black/60 backdrop-blur-md border border-border dark:border-white/10 text-foreground dark:text-white font-semibold px-2.5 py-1 rounded-md text-[10px] flex items-center gap-1.5 shadow-sm">
                                <MapPin className="h-3 w-3" />
                                {hotspots.length} lesion{hotspots.length > 1 ? "s" : ""} detected
                            </span>
                        )}
                    </div>

                    {/* Top-right controls */}
                    {showControls && (
                        <div className="absolute top-4 right-4 flex flex-col gap-1.5 opacity-0 group-hover/main:opacity-100 transition-opacity duration-300">
                            {/* Fullscreen */}
                            <button
                                onClick={(e) => { e.stopPropagation(); setFullscreen(true); }}
                                className="bg-muted/80 dark:bg-black/60 backdrop-blur-md border border-border dark:border-white/10 text-foreground dark:text-white rounded-lg p-1.5 hover:bg-accent dark:hover:bg-black/80 transition-colors shadow-sm pointer-events-auto"
                                title="Fullscreen"
                            >
                                <Maximize2 className="h-3.5 w-3.5" />
                            </button>
                            {/* Zoom controls (only show when not zoomed out fully) */}
                            <button
                                onClick={(e) => { e.stopPropagation(); resetZoom(); }}
                                className={cn(
                                    "bg-muted/80 dark:bg-black/60 backdrop-blur-md border border-border dark:border-white/10 text-foreground dark:text-white rounded-lg p-1.5 hover:bg-accent dark:hover:bg-black/80 transition-all shadow-sm pointer-events-auto",
                                    zoom === 1 ? "opacity-0 scale-90 pointer-events-none" : "opacity-100 scale-100"
                                )}
                                title="Reset Zoom"
                            >
                                <RotateCcw className="h-3.5 w-3.5" />
                            </button>
                            <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg flex flex-col">
                                <button
                                    onClick={(e) => { e.stopPropagation(); setZoom(z => Math.min(3, z + 0.4)); }}
                                    className="p-1.5 text-white hover:bg-white/10 transition-colors border-b border-white/10"
                                >
                                    <ZoomIn className="h-3.5 w-3.5" />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setZoom(z => Math.max(1, z - 0.4)); }}
                                    className="p-1.5 text-white hover:bg-white/10 transition-colors"
                                >
                                    <ZoomOut className="h-3.5 w-3.5" />
                                </button>
                            </div>
                            {/* Toggle pins */}
                            {!isHealthy && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); setShowPins(!showPins); }}
                                    className={cn(
                                        "backdrop-blur-md border transition-all shadow-sm pointer-events-auto rounded-lg p-1.5",
                                        showPins
                                            ? "bg-muted/80 dark:bg-black/60 border-border dark:border-white/10 text-foreground dark:text-white hover:bg-accent dark:hover:bg-black/80"
                                            : "bg-primary border-primary text-primary-foreground"
                                    )}
                                    title={showPins ? "Hide Markers" : "Show Markers"}
                                >
                                    {showPins ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Legend / Info panel below image */}
                {!isHealthy && hotspots.length > 0 && (
                    <div className="flex-1 overflow-y-auto no-print scrollbar-hide">
                        {selectedHotspot !== null ? (
                            <HotspotDetailCard hotspot={hotspots[selectedHotspot]} />
                        ) : (
                            <HotspotLegend
                                hotspots={hotspots}
                                selectedIdx={selectedHotspot}
                                onSelect={setSelectedHotspot}
                            />
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
