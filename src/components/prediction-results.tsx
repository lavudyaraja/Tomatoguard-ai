"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { History, Share2, Download, Info, AlertTriangle, CheckCircle2 } from "lucide-react";
import { PredictionResult } from "@/lib/types";
import { DISEASE_DATABASE, getSeverityColor, getSeverityLabel } from "@/lib/diseases";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface PredictionResultsProps {
    result: PredictionResult;
}

export function PredictionResults({ result }: PredictionResultsProps) {
    const diseaseInfo = DISEASE_DATABASE[result.prediction] || {
        displayName: result.prediction.replace(/_/g, " "),
        severity: "low",
        description: "Detailed information for this disease class is currently being updated in our agricultural database.",
    };

    const isHealthy = result.prediction === "healthy";

    return (
        <div className="space-y-6 w-full max-w-4xl mx-auto animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Main Prediction Summary */}
                <Card className="md:col-span-12 glow-emerald transition-all hover:glow-emerald-strong hover:scale-[1.005]">
                    <CardContent className="p-0 overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                            {/* Prediction Visual */}
                            <div className="md:w-1/3 relative group overflow-hidden bg-muted">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={result.imageUrl}
                                    alt="Prediction Result"
                                    className="w-full h-full object-cover aspect-square md:aspect-auto"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                    <button className="p-3 rounded-full bg-white/20 backdrop-blur-xl text-white hover:bg-white/40 transition-colors">
                                        <Share2 className="h-5 w-5" />
                                    </button>
                                    <button className="p-3 rounded-full bg-white/20 backdrop-blur-xl text-white hover:bg-white/40 transition-colors">
                                        <Download className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Prediction Content */}
                            <div className="md:w-2/3 p-6 sm:p-8 flex flex-col justify-center">
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                    <Badge className={getSeverityColor(diseaseInfo.severity)}>
                                        {getSeverityLabel(diseaseInfo.severity)}
                                    </Badge>
                                    <span className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                                        <History className="h-4 w-4" /> Analyzed: {format(new Date(result.createdAt), "MMM d, h:mm a")}
                                    </span>
                                </div>

                                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
                                    {diseaseInfo.displayName}
                                </h2>
                                <div className="flex items-center gap-2 text-xl font-medium text-primary mb-6">
                                    {Math.round(result.confidence * 100)}% Confidence
                                </div>

                                <p className="text-muted-foreground leading-relaxed">
                                    {diseaseInfo.description}
                                </p>

                                <div className="mt-8 flex flex-wrap gap-4">
                                    <div className="flex items-center gap-2 p-3 rounded-xl bg-card border border-border">
                                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                                            {isHealthy ? <CheckCircle2 className="h-6 w-6" /> : <AlertTriangle className="h-6 w-6" />}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs text-muted-foreground">Status</span>
                                            <span className="font-bold text-sm tracking-wide">
                                                {isHealthy ? "Condition Perfect" : "Action Recommended"}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 p-3 rounded-xl bg-card border border-border">
                                        <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 font-bold">
                                            <Info className="h-6 w-6" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs text-muted-foreground">Severity</span>
                                            <span className="font-bold text-sm tracking-wide">{diseaseInfo.severity.toUpperCase()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Probability Distribution */}
                <Card className="md:col-span-12 transition-all hover:bg-card/80">
                    <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                            Confidence Distribution
                        </CardTitle>
                        <CardDescription>Top 5 predictions from the MaxViT classifier</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {result.top5.map((item, idx) => (
                            <div key={idx} className="space-y-2">
                                <div className="flex justify-between text-sm font-medium">
                                    <span className={idx === 0 ? "text-primary font-bold" : "text-foreground opacity-80"}>
                                        {item.className.replace(/_/g, " ")}
                                    </span>
                                    <span>{Math.round(item.probability * 100)}%</span>
                                </div>
                                <Progress
                                    value={item.probability * 100}
                                    className={cn("h-2.5 bg-muted", idx === 0 ? "bg-primary/20" : "")}
                                />
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            <Separator className="my-8" />
        </div>
    );
}
