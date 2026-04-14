"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
    History, Share2, Download, AlertTriangle,
    CheckCircle2, Sparkles, Camera, Microscope, Activity, Zap
} from "lucide-react";
import { PredictionResult } from "@/lib/types";
import { getSeverityColor, getSeverityLabel, cn } from "@/lib/utils";
import { format } from "date-fns";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PredictionResultsProps {
    result: PredictionResult;
}

export function PredictionResults({ result }: PredictionResultsProps) {
    const diseaseInfo = result.llmInsight || {
        displayName: result.prediction.replace(/_/g, " "),
        severity: "low" as const,
        description: "Detailed information for this disease class is currently being updated in our agricultural database.",
    };

    const isHealthy = result.prediction === "healthy";

    return (
        <div className="space-y-6 w-full max-w-5xl mx-auto animate-slide-up">
            <div className="grid grid-cols-1 gap-6">
                {/* ── Main Diagnosis Card ── */}
                <Card className="glow-emerald transition-all hover:glow-emerald-strong overflow-hidden">
                    <CardContent className="p-0">
                        <div className="p-6 sm:p-10">
                            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <Badge className={getSeverityColor(diseaseInfo.severity)}>
                                            {getSeverityLabel(diseaseInfo.severity)}
                                        </Badge>
                                        <span className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                                            <History className="h-4 w-4" /> {format(new Date(result.createdAt), "MMM d, yyyy · h:mm a")}
                                        </span>
                                    </div>
                                    <h2 className="text-4xl sm:text-5xl font-black tracking-tight mt-2">
                                        {diseaseInfo.displayName}
                                    </h2>
                                </div>
                                <div className="text-right">
                                    <div className="text-4xl font-black text-primary mb-1">
                                        {Math.round(result.confidence * 100)}%
                                    </div>
                                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Confidence Score</p>
                                </div>
                            </div>

                            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                                {diseaseInfo.description}
                            </p>

                            <div className="mt-8 flex flex-wrap gap-4">
                                <div className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border shadow-sm">
                                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                        {isHealthy ? <CheckCircle2 className="h-7 w-7" /> : <AlertTriangle className="h-7 w-7" />}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Status</span>
                                        <span className="font-extrabold text-base">
                                            {isHealthy ? "Healthy Leaf" : "Pathogen Detected"}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border shadow-sm">
                                    <div className="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                                        <Microscope className="h-7 w-7" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Diagnosis</span>
                                        <span className="font-extrabold text-base">AI Verified</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* ── XAI Interpretation Panel ── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <Card className="lg:col-span-8 overflow-hidden bg-muted/30 border-muted">
                        <CardHeader className="border-b bg-card/50 py-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="h-5 w-5 text-emerald-400" />
                                    <CardTitle className="text-lg font-bold">Inference Interpretability</CardTitle>
                                </div>
                                <Badge variant="outline" className="text-[10px] font-black tracking-widest uppercase">
                                    Grad-CAM Explanation
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* ── Left: Original Scanned Image ── */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                                            <Camera className="h-4 w-4" /> Original Scanned Leaf
                                        </span>
                                        <Badge variant="outline" className="text-[10px] font-black tracking-widest uppercase opacity-70">
                                            Reference Scan
                                        </Badge>
                                    </div>
                                    <div className="relative rounded-3xl overflow-hidden aspect-square shadow-2xl ring-1 ring-border/50 group">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={result.imageUrl}
                                            alt="Original Leaf"
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <Badge className="bg-black/60 backdrop-blur-md border-white/10 text-white py-1 px-3 text-[10px]">
                                                Raw Input
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                {/* ── Right: XAI Detection View ── */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                                            <Sparkles className="h-4 w-4" /> Disease Detection Analysis
                                        </span>
                                        <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px] font-black tracking-widest uppercase">
                                            AI XAI Insight
                                        </Badge>
                                    </div>
                                    <div className="relative rounded-3xl overflow-hidden aspect-square shadow-2xl ring-1 ring-border/50 bg-black group">
                                        {result.xaiUrl ? (
                                            /* eslint-disable-next-line @next/next/no-img-element */
                                            <img
                                                src={result.xaiUrl}
                                                alt="XAI Heatmap"
                                                className="w-full h-full object-cover opacity-90 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs p-8 text-center italic">
                                                Interpretability data not available for this result.
                                            </div>
                                        )}

                                        {/* Hotspot Circles overlayed on Detection Map */}
                                        <TooltipProvider>
                                            {result.hotspots?.map((spot, i) => (
                                                <Tooltip key={i}>
                                                    <TooltipTrigger
                                                        render={
                                                            <div
                                                                className="absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 cursor-pointer group/spot z-10"
                                                                style={{ left: `${spot.xPct}%`, top: `${spot.yPct}%` }}
                                                            >
                                                                <div className="absolute inset-0 rounded-full border-2 border-white bg-emerald-500/40 animate-ping opacity-75" />
                                                                <div className="absolute inset-0 rounded-full border-2 border-white bg-emerald-500/60 shadow-lg flex items-center justify-center text-[10px] font-black text-white">
                                                                    {i + 1}
                                                                </div>
                                                            </div>
                                                        }
                                                    />
                                                    <TooltipContent className="bg-black/90 text-white border-white/20">
                                                        <p className="text-xs font-bold">Detection Spot #{i + 1}</p>
                                                        <p className="text-[10px] opacity-70">Feature Importance: {Math.round(spot.intensity * 100)}%</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            ))}
                                        </TooltipProvider>

                                        <div className="absolute top-4 left-4">
                                            <Badge className="bg-emerald-500/80 backdrop-blur-md border-white/20 text-white py-1 px-3 text-[10px] flex items-center gap-1.5">
                                                <Activity className="h-3 w-3" />
                                                Explainable AI
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* ── Probability Distribution ── */}
                    <Card className="lg:col-span-4 transition-all border-muted bg-muted/20">
                        <CardHeader className="py-4">
                            <CardTitle className="text-base font-bold flex items-center gap-2">
                                <Zap className="h-4 w-4 text-emerald-400" /> Confidence Rankings
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {result.top5.map((item, idx) => (
                                <div key={idx} className="space-y-1.5">
                                    <div className="flex justify-between text-[11px] font-bold tracking-tight">
                                        <span className={idx === 0 ? "text-primary uppercase" : "text-muted-foreground uppercase"}>
                                            {item.className.replace(/_/g, " ")}
                                        </span>
                                        <span>{Math.round(item.probability * 100)}%</span>
                                    </div>
                                    <Progress
                                        value={item.probability * 100}
                                        className={cn("h-1.5 bg-muted", idx === 0 ? "bg-primary/20" : "")}
                                    />
                                </div>
                            ))}

                            <div className="pt-6 space-y-3">
                                <Button className="w-full gradient-emerald font-bold h-11 rounded-xl shadow-lg shadow-emerald-500/10">
                                    <Download className="mr-2 h-4 w-4" /> Download Report
                                </Button>
                                <Button variant="outline" className="w-full font-bold h-11 rounded-xl border-border/50">
                                    <Share2 className="mr-2 h-4 w-4" /> Share Results
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Separator className="my-8 opacity-50" />
        </div>
    );
}
