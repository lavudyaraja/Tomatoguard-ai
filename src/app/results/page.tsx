"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
    AlertTriangle, CheckCircle2, History, Upload, Leaf,
    ShieldCheck, Info, Share2, Download, Printer,
    TrendingUp, Clock, Microscope, BarChart3, ChevronRight,
} from "lucide-react";
import { format } from "date-fns";
import { PredictionResult } from "@/lib/types";
import { DISEASE_DATABASE, getSeverityColor, getSeverityLabel } from "@/lib/diseases";
import { DiseaseDetail } from "@/components/disease-detail";
import { cn } from "@/lib/utils";

export default function ResultsPage() {
    const router = useRouter();
    const [result, setResult] = useState<PredictionResult | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [activeSection, setActiveSection] = useState<string | null>(null);

    useEffect(() => {
        const storedResult = sessionStorage.getItem("tg_result");
        const storedImage = sessionStorage.getItem("tg_image_url");
        if (!storedResult) {
            router.replace("/upload");
            return;
        }
        setResult(JSON.parse(storedResult));
        setImageUrl(storedImage);
    }, [router]);

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // fallback
        }
    };

    const handlePrint = () => window.print();

    if (!result) return null;

    const diseaseInfo = DISEASE_DATABASE[result.prediction];
    const isHealthy = result.prediction === "healthy";
    const confidencePct = Math.round(result.confidence * 100);
    const isCritical = diseaseInfo?.severity === "critical";
    const isHigh = diseaseInfo?.severity === "high";

    return (
        <div className="flex flex-col min-h-screen bg-background font-sans text-foreground">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&display=swap');
                
                * { font-family: 'DM Sans', sans-serif; }
                .display-font { font-family: 'Fraunces', serif; }

                .fade-up {
                    animation: fadeUp 0.5s ease both;
                }
                .fade-up-delay-1 { animation-delay: 0.1s; }
                .fade-up-delay-2 { animation-delay: 0.2s; }
                .fade-up-delay-3 { animation-delay: 0.3s; }
                .fade-up-delay-4 { animation-delay: 0.4s; }

                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(16px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                .ring-progress {
                    transition: stroke-dashoffset 1s ease 0.3s;
                }

                @media print {
                    .no-print { display: none !important; }
                    body { background: white !important; }
                }
            `}</style>

            <Navbar />

            {/* ── Critical alert banner ── */}
            {isCritical && (
                <div className="bg-destructive/10 border-b border-destructive/20 px-4 py-2.5">
                    <div className="mx-auto max-w-6xl flex items-center gap-2.5 text-destructive font-medium">
                        <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                        <span>Critical disease detected — immediate action is strongly recommended. Consult an agricultural expert.</span>
                    </div>
                </div>
            )}

            <main className="flex-grow">
                {/* ── Page header ── */}
                <div className="bg-card border-b border-border print:hidden">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                                    <Microscope className="h-4.5 w-4.5 text-primary-foreground" style={{ height: 18, width: 18 }} />
                                </div>
                                <div>
                                    <h1 className="text-xl font-semibold text-foreground display-font">Diagnosis Report</h1>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                        {result.createdAt
                                            ? format(new Date(result.createdAt), "MMMM d, yyyy · h:mm a")
                                            : "Just now"
                                        } · MaxViT v2
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 no-print">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleShare}
                                    className="text-xs h-8 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                                >
                                    <Share2 className="h-3.5 w-3.5 mr-1.5" />
                                    {copied ? "Copied!" : "Share"}
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handlePrint}
                                    className="text-xs h-8 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                                >
                                    <Printer className="h-3.5 w-3.5 mr-1.5" /> Print
                                </Button>
                                <Button
                                    size="sm"
                                    onClick={() => router.push("/upload")}
                                    className="text-xs h-8 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md transition-colors"
                                >
                                    <Upload className="h-3.5 w-3.5 mr-1.5" /> New Scan
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => router.push("/history")}
                                    className="text-xs h-8 border-border rounded-md transition-colors"
                                >
                                    <History className="h-3.5 w-3.5 mr-1.5" /> History
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 space-y-6">

                    {/* ── Main result card ── */}
                    <div className="fade-up grid grid-cols-1 lg:grid-cols-5 gap-5">

                        {/* Image panel */}
                        <div className="lg:col-span-2 relative rounded-xl overflow-hidden bg-muted min-h-[280px]">
                            {imageUrl ? (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img src={imageUrl} alt="Analyzed leaf" className="w-full h-full object-cover absolute inset-0" />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Leaf className="h-14 w-14 text-[#BBBBB5]" />
                                </div>
                            )}
                            <div className="absolute top-3 left-3">
                                <SeverityBadge severity={diseaseInfo?.severity ?? "low"} />
                            </div>
                            <div className="absolute bottom-3 right-3">
                                <div className="bg-card/90 backdrop-blur-sm rounded-lg px-2.5 py-1.5 text-[11px] font-medium text-foreground">
                                    {isHealthy ? "✓ No disease detected" : "⚠ Disease detected"}
                                </div>
                            </div>
                        </div>

                        {/* Info panel */}
                        <div className="lg:col-span-3 bg-card rounded-xl p-7 flex flex-col justify-between border border-border">
                            <div>
                                <div className="flex items-center gap-2 mb-5">
                                    <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">Detected Condition</span>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    <div className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight">
                                        <Leaf className="h-2.5 w-2.5" /> Tomato
                                    </div>
                                    <div className="flex items-center gap-1 bg-emerald-500/10 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight">
                                        <ShieldCheck className="h-2.5 w-2.5" /> Leaf Match
                                    </div>
                                </div>
                                <h2 className="text-3xl font-bold tracking-tight text-foreground display-font leading-tight mb-2">
                                    {diseaseInfo?.displayName ?? result.prediction.replace(/_/g, " ")}
                                </h2>
                                {confidencePct < 40 && (
                                    <div className="flex items-center gap-2 mb-6 p-2.5 bg-blue-500/5 border border-blue-500/20 rounded-lg text-xs font-medium text-blue-500 dark:text-blue-400">
                                        <Info className="h-3.5 w-3.5 flex-shrink-0" />
                                        <span>Identification confidence is lower than usual. Ensure the image is a clear, top-down shot of a tomato leaf.</span>
                                    </div>
                                )}
                                {diseaseInfo && (
                                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-prose">
                                        {diseaseInfo.description}
                                    </p>
                                )}
                            </div>

                            {/* Confidence ring + stats */}
                            <div className="flex flex-wrap items-center gap-6">
                                <ConfidenceRing value={confidencePct} isHealthy={isHealthy} />
                                <div className="flex flex-col gap-3">
                                    <StatPill icon={<Leaf className="h-3.5 w-3.5" />} label="Species" value="Tomato" />
                                    <StatPill icon={<Info className="h-3.5 w-3.5" />} label="Severity" value={diseaseInfo?.severity ?? "unknown"} capitalize />
                                    <StatPill
                                        icon={isHealthy ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> : <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />}
                                        label="Status"
                                        value={isHealthy ? "No action needed" : "Action required"}
                                    />
                                    <StatPill icon={<BarChart3 className="h-3.5 w-3.5" />} label="Engine" value="MaxViT Classifier" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Lower section ── */}
                    <div className="fade-up fade-up-delay-1">
                        {/* Risk summary card */}
                        <div className="bg-card rounded-xl p-6 border border-border flex flex-col md:flex-row gap-6 md:gap-8 justify-between">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-5">
                                    <h3 className="text-sm font-semibold text-foreground">Risk Overview</h3>
                                    <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <RiskMeter severity={diseaseInfo?.severity ?? "low"} />
                            </div>

                            <Separator orientation="vertical" className="hidden md:block h-auto my-1 bg-border/50" />
                            <Separator className="block md:hidden bg-border/50" />

                            <div className="flex-1 space-y-3 flex flex-col justify-center">
                                <QuickStat label="Symptoms" count={diseaseInfo?.symptoms.length ?? 0} />
                                <QuickStat label="Treatments" count={diseaseInfo?.treatments.length ?? 0} />
                                <QuickStat label="Prevention steps" count={diseaseInfo?.prevention.length ?? 0} />
                            </div>

                            {!isHealthy && (
                                <>
                                    <Separator orientation="vertical" className="hidden md:block h-auto my-1 bg-border/50" />
                                    <Separator className="block md:hidden bg-border/50" />
                                    <div className="flex-1 flex flex-col justify-center">
                                        <div className="p-3.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-xs text-orange-600 dark:text-orange-400 leading-relaxed shadow-sm">
                                            <strong className="block mb-1 font-semibold text-orange-700 dark:text-orange-300">Immediate attention recommended</strong>
                                            Scroll down for detailed treatment and prevention protocols to minimize crop damage.
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* ── Quick action chips ── */}
                    {!isHealthy && (
                        <div className="fade-up fade-up-delay-2 flex flex-wrap gap-2 no-print">
                            {["View Treatments", "View Symptoms", "View Prevention", "View Causes"].map((label, i) => (
                                <button
                                    key={label}
                                    onClick={() => {
                                        const map: Record<string, string> = {
                                            "View Treatments": "treatments",
                                            "View Symptoms": "symptoms",
                                            "View Prevention": "prevention",
                                            "View Causes": "causes",
                                        };
                                        document.getElementById("disease-detail")?.scrollIntoView({ behavior: "smooth" });
                                        setActiveSection(map[label]);
                                    }}
                                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-card border border-border text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200"
                                >
                                    {label} <ChevronRight className="h-3 w-3" />
                                </button>
                            ))}
                        </div>
                    )}

                    {/* ── Disease detail section ── */}
                    {diseaseInfo && (
                        <div id="disease-detail" className="fade-up fade-up-delay-3">
                            <Separator className="my-2 bg-border/50" />
                            <DiseaseDetail disease={diseaseInfo} defaultTab={activeSection ?? undefined} />
                        </div>
                    )}

                    {/* ── Footer CTA ── */}
                    <div className="fade-up fade-up-delay-4 flex flex-col sm:flex-row justify-center items-center gap-3 pt-2 pb-6 no-print">
                        <Button
                            onClick={() => router.push("/upload")}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground h-10 px-7 text-sm font-semibold rounded-lg transition-colors"
                        >
                            <Upload className="mr-2 h-4 w-4" /> Scan Another Leaf
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => router.push("/history")}
                            className="h-10 px-7 text-sm border-border rounded-lg transition-colors"
                        >
                            <History className="mr-2 h-4 w-4" /> View History
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
}

/* ── Sub-components ── */

function ConfidenceRing({ value, isHealthy }: { value: number; isHealthy: boolean }) {
    const r = 28;
    const circ = 2 * Math.PI * r;
    const offset = circ - (value / 100) * circ;

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-20 h-20">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 72 72">
                    <circle cx="36" cy="36" r={r} fill="none" stroke="currentColor" strokeWidth="5" className="text-muted" />
                    <circle
                        cx="36" cy="36" r={r}
                        fill="none"
                        stroke={isHealthy ? "#10b981" : value >= 80 ? "var(--primary)" : "#f59e0b"}
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeDasharray={circ}
                        strokeDashoffset={offset}
                        className="ring-progress"
                        style={{ transition: "stroke-dashoffset 1s ease 0.3s" }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-bold text-foreground leading-none">{value}%</span>
                </div>
            </div>
            <span className="text-[10px] text-muted-foreground mt-1.5 font-medium">Confidence</span>
        </div>
    );
}

function StatPill({ icon, label, value, capitalize }: { icon: React.ReactNode; label: string; value: string; capitalize?: boolean }) {
    return (
        <div className="flex items-center gap-2.5 text-sm">
            <span className="text-muted-foreground">{icon}</span>
            <span className="text-muted-foreground">{label}:</span>
            <span className={cn("font-medium text-foreground", capitalize && "capitalize")}>{value}</span>
        </div>
    );
}

function SeverityBadge({ severity }: { severity: string }) {
    const styles: Record<string, string> = {
        low: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
        moderate: "bg-amber-500/10 text-amber-500 border-amber-500/20",
        high: "bg-orange-500/10 text-orange-500 border-orange-500/20",
        critical: "bg-red-500/10 text-red-500 border-red-500/20",
    };
    const labels: Record<string, string> = {
        low: "Healthy", moderate: "Moderate", high: "High Risk", critical: "Critical"
    };
    return (
        <span className={cn("text-[11px] font-semibold px-2.5 py-1 rounded-full border", styles[severity] ?? "bg-gray-100 text-gray-600 border-gray-200")}>
            {labels[severity] ?? severity}
        </span>
    );
}

function RiskMeter({ severity }: { severity: string }) {
    const levels = ["low", "moderate", "high", "critical"];
    const idx = levels.indexOf(severity);
    const pct = ((idx + 1) / 4) * 100;
    const colors = ["#10b981", "#f59e0b", "#f97316", "#ef4444"];
    const color = colors[idx] ?? "var(--muted-foreground)";

    return (
        <div className="space-y-2">
            <div className="flex justify-between text-[10px] text-muted-foreground font-medium">
                <span>LOW</span><span>MODERATE</span><span>HIGH</span><span>CRITICAL</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden relative">
                <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${pct}%`, backgroundColor: color, transitionDelay: "0.4s" }}
                />
            </div>
            <p className="text-xs font-semibold capitalize" style={{ color }}>{severity} severity</p>
        </div>
    );
}

function QuickStat({ label, count }: { label: string; count: number }) {
    return (
        <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">{label}</span>
            <span className="font-semibold text-foreground tabular-nums">{count}</span>
        </div>
    );
}