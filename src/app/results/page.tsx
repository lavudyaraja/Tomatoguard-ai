"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Microscope, Share2, Printer, Upload, Leaf, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { PredictionResult, DiseaseInfo, Hotspot } from "@/lib/types";
import { DiseaseDetail } from "@/components/disease-detail";
import { ResultImage } from "@/components/result-image";

export default function ResultsPage() {
    const router = useRouter();
    const [result, setResult] = useState<PredictionResult | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const stored = sessionStorage.getItem("tg_result");
        const storedImg = sessionStorage.getItem("tg_image_url");
        if (stored) {
            try {
                setResult(JSON.parse(stored));
            } catch (e) {
                console.error("Parse error:", e);
                router.push("/upload");
            }
        } else {
            router.push("/upload");
        }
        if (storedImg) setImageUrl(storedImg);
    }, [router]);

    const handleShare = useCallback(() => {
        if (typeof window !== "undefined") {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }, []);

    if (!result) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
                <div className="animate-spin mb-6">
                    <Loader2 className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground">Loading diagnostic report…</h2>
                <p className="text-muted-foreground mt-2">Retrieving visual analysis data</p>
            </div>
        );
    }

    const isHealthy = result.prediction.toLowerCase() === "healthy";
    const diseaseName = result.prediction.replace(/_/g, " ");
    const diseaseInfo: DiseaseInfo = result.llmInsight || {
        name: result.prediction,
        displayName: diseaseName,
        severity: "low",
        description: "No description available.",
        symptoms: [],
        causes: [],
        treatments: [],
        prevention: [],
    };

    const hotspots: Hotspot[] = result.hotspots || [];
    const confidencePct = Math.round(result.confidence * 100);

    return (
        <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950">
            <Navbar />
            <main className="pt-24 pb-20 no-print">
                {/* ── Sub-header / Breadcrumb ────────────────────────── */}
                <div className=" top-16 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border/40 no-print">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                                    <Microscope className="h-5 w-5" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-semibold text-foreground display-font">Diagnosis Report</h1>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                        {result.createdAt ? format(new Date(result.createdAt), "MMMM d, yyyy · h:mm a") : "Just now"} · Dual Model Engine
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 no-print w-full sm:w-auto">
                                <Button variant="ghost" size="sm" onClick={handleShare}
                                    className="text-[10px] sm:text-xs h-8 flex-1 sm:flex-none text-muted-foreground hover:text-foreground hover:bg-accent rounded-md">
                                    <Share2 className="h-3 sm:h-3.5 w-3 sm:w-3.5 mr-1 sm:mr-1.5" />
                                    {copied ? "Copied!" : "Share"}
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => window.print()}
                                    className="hidden sm:flex text-xs h-8 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md">
                                    <Printer className="h-3.5 w-3.5 mr-1.5" /> Print
                                </Button>
                                <Button size="sm" onClick={() => router.push("/upload")}
                                    className="text-[10px] sm:text-xs h-8 flex-1 sm:flex-none bg-primary hover:bg-primary/90 text-primary-foreground rounded-md">
                                    <Upload className="h-3 sm:h-3.5 w-3 sm:w-3.5 mr-1 sm:mr-1.5" /> New Scan
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 space-y-6">
                    {/* Comprehensive Technical & Risk Analysis Component */}
                    <ResultImage
                        result={result}
                        diseaseInfo={diseaseInfo}
                        hotspots={hotspots}
                        imageUrl={imageUrl}
                        isHealthy={isHealthy}
                        confidencePct={confidencePct}
                    />

                    {/* Disease Management Guide (The Tabs Component) */}
                    <div className="fade-up fade-up-delay-3 pb-20">
                        <DiseaseDetail
                            disease={diseaseInfo}
                            image={result?.imageUrl}
                            imageInfo={result?.imageInfo}
                            hotspots={result?.hotspots}
                        />
                    </div>
                </div>
            </main>

            <footer className="py-10 border-t border-border/40 bg-card/30 no-print">
                <div className="mx-auto max-w-6xl px-4 flex flex-col items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <Leaf className="h-5 w-5" />
                    </div>
                    <p className="text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground">TomatoGuard AI Engine v4.2</p>
                    <p className="text-[10px] text-muted-foreground/60 max-w-xs text-center leading-relaxed">
                        Computer Vision powered by MaxViT and CoAtNet architectures.
                        Diagnostic Insights enhanced by Llama 3 Pathologist API.
                    </p>
                </div>
            </footer>
        </div>
    );
}
