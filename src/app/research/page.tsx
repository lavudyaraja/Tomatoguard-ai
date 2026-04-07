"use client";

import { useEffect, useState, useMemo } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    RefreshCw, TrendingUp, Database, Leaf, Activity,
    BarChart3, AlertTriangle, CheckCircle2, Download,
    Calendar, Filter, ChevronDown, Info,
} from "lucide-react";
import { format } from "date-fns";
import { DISEASE_DATABASE, getSeverityColor } from "@/lib/diseases";

interface Analytic {
    disease_name: string;
    count: number;
    last_detected: string;
}

interface AnalyticsData {
    analytics: Analytic[];
    totalPredictions: number;
}

type SortOrder = "count_desc" | "count_asc" | "name_asc" | "recent";
type FilterSeverity = "all" | "critical" | "high" | "moderate" | "none";

const SEVERITY_ORDER: Record<string, number> = { critical: 0, high: 1, moderate: 2, none: 3 };

export default function ResearchPage() {
    const [data, setData] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);
    const [sortOrder, setSortOrder] = useState<SortOrder>("count_desc");
    const [filterSeverity, setFilterSeverity] = useState<FilterSeverity>("all");
    const [showFilters, setShowFilters] = useState(false);

    const fetchAnalytics = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/analytics");
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json = await res.json();
            setData(json);
            setLastRefreshed(new Date());
        } catch (e) {
            setError("Failed to load analytics. Please try again.");
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchAnalytics(); }, []);

    // Processed & filtered analytics
    const processedAnalytics = useMemo(() => {
        if (!data) return [];
        let items = [...data.analytics];

        // Severity filter
        if (filterSeverity !== "all") {
            items = items.filter((item) => {
                const info = DISEASE_DATABASE[item.disease_name];
                return info?.severity === filterSeverity || (filterSeverity === "none" && item.disease_name === "healthy");
            });
        }

        // Sort
        switch (sortOrder) {
            case "count_asc": items.sort((a, b) => a.count - b.count); break;
            case "name_asc": items.sort((a, b) => a.disease_name.localeCompare(b.disease_name)); break;
            case "recent": items.sort((a, b) => new Date(b.last_detected).getTime() - new Date(a.last_detected).getTime()); break;
            default: items.sort((a, b) => b.count - a.count);
        }
        return items;
    }, [data, sortOrder, filterSeverity]);

    const maxCount = useMemo(() => Math.max(1, ...processedAnalytics.map(a => a.count)), [processedAnalytics]);

    // Stats
    const healthyCount = data?.analytics.find(a => a.disease_name === "healthy")?.count ?? 0;
    const healthyRate = data && data.totalPredictions > 0
        ? Math.round((healthyCount / data.totalPredictions) * 100)
        : null;
    const mostCommon = data?.analytics[0];
    const mostCommonName = mostCommon
        ? (DISEASE_DATABASE[mostCommon.disease_name]?.displayName || mostCommon.disease_name).replace(/_/g, " ")
        : null;

    // CSV Export
    const exportCSV = () => {
        if (!data) return;
        const rows = [
            ["Disease", "Count", "Percentage", "Last Detected"],
            ...data.analytics.map(a => [
                DISEASE_DATABASE[a.disease_name]?.displayName || a.disease_name,
                a.count,
                `${((a.count / data.totalPredictions) * 100).toFixed(1)}%`,
                format(new Date(a.last_detected), "yyyy-MM-dd HH:mm"),
            ]),
        ];
        const csv = rows.map(r => r.join(",")).join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `tomatoguard-analytics-${format(new Date(), "yyyy-MM-dd")}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    // Donut chart segments (SVG)
    const donutSegments = useMemo(() => {
        if (!data || data.totalPredictions === 0) return [];
        const COLORS = ["#10b981", "#f97316", "#ef4444", "#8b5cf6", "#3b82f6", "#eab308", "#ec4899", "#14b8a6"];
        let cumulative = 0;
        const total = data.totalPredictions;
        const radius = 60;
        const cx = 80, cy = 80;
        const circumference = 2 * Math.PI * radius;

        return data.analytics.slice(0, 8).map((item, i) => {
            const pct = item.count / total;
            const strokeDash = pct * circumference;
            const strokeOffset = circumference - cumulative * circumference;
            cumulative += pct;
            return {
                color: item.disease_name === "healthy" ? "#10b981" : COLORS[(i + 1) % COLORS.length],
                strokeDash,
                strokeOffset,
                label: DISEASE_DATABASE[item.disease_name]?.displayName?.split(" ")[0] || item.disease_name.split("_")[0],
                pct: Math.round(pct * 100),
            };
        });
    }, [data]);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                {/* Header */}
                <div className="relative py-16 bg-background border-b border-border/50 overflow-hidden">
                    <div className="absolute top-0 right-1/4 h-80 w-80 rounded-full bg-purple-500/5 blur-[140px] pointer-events-none" />
                    <div className="absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                            <div>
                                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 border border-primary/20 bg-primary/5 mb-4">
                                    <BarChart3 className="h-3.5 w-3.5 text-primary" />
                                    <span className="text-xs font-semibold text-primary uppercase tracking-widest">Live Analytics</span>
                                </div>
                                <h1 className="text-4xl font-extrabold tracking-tight">Research Dashboard</h1>
                                <p className="mt-2 text-muted-foreground text-lg">
                                    Real-time disease detection analytics powered by
                                    <span className="text-primary font-semibold"> Neon PostgreSQL</span>
                                </p>
                                {lastRefreshed && (
                                    <p className="mt-1 text-xs text-muted-foreground flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        Last updated: {format(lastRefreshed, "MMM d, h:mm:ss a")}
                                    </p>
                                )}
                            </div>
                            <div className="flex items-center gap-3 flex-wrap">
                                <Button
                                    onClick={() => setShowFilters(f => !f)}
                                    variant="outline"
                                    className="flex items-center gap-2"
                                >
                                    <Filter className="h-4 w-4" />
                                    Filters
                                    <ChevronDown className={`h-3 w-3 transition-transform ${showFilters ? "rotate-180" : ""}`} />
                                </Button>
                                <Button
                                    onClick={exportCSV}
                                    variant="outline"
                                    disabled={!data || loading}
                                    className="flex items-center gap-2"
                                >
                                    <Download className="h-4 w-4" />
                                    Export CSV
                                </Button>
                                <Button
                                    onClick={fetchAnalytics}
                                    variant="outline"
                                    disabled={loading}
                                    className="flex items-center gap-2"
                                >
                                    <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                                    Refresh
                                </Button>
                            </div>
                        </div>

                        {/* Filter Panel */}
                        {showFilters && (
                            <div className="mt-6 p-4 rounded-xl bg-muted/30 border border-border/50 flex flex-wrap gap-4 items-center">
                                <div>
                                    <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Sort By</p>
                                    <div className="flex gap-2 flex-wrap">
                                        {([
                                            { value: "count_desc", label: "Most Detected" },
                                            { value: "count_asc", label: "Least Detected" },
                                            { value: "recent", label: "Most Recent" },
                                            { value: "name_asc", label: "A–Z" },
                                        ] as { value: SortOrder; label: string }[]).map(opt => (
                                            <button
                                                key={opt.value}
                                                onClick={() => setSortOrder(opt.value)}
                                                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${sortOrder === opt.value
                                                    ? "bg-primary text-primary-foreground"
                                                    : "bg-background border border-border/50 text-muted-foreground hover:border-primary/40"
                                                    }`}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Severity</p>
                                    <div className="flex gap-2 flex-wrap">
                                        {(["all", "critical", "high", "moderate", "none"] as FilterSeverity[]).map(s => (
                                            <button
                                                key={s}
                                                onClick={() => setFilterSeverity(s)}
                                                className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-all ${filterSeverity === s
                                                    ? "bg-primary text-primary-foreground"
                                                    : "bg-background border border-border/50 text-muted-foreground hover:border-primary/40"
                                                    }`}
                                            >
                                                {s === "none" ? "Healthy" : s}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-10">
                    {/* Error */}
                    {error && (
                        <div className="flex items-center gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive">
                            <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                            <p className="text-sm font-medium">{error}</p>
                            <Button size="sm" variant="ghost" onClick={fetchAnalytics} className="ml-auto">Retry</Button>
                        </div>
                    )}

                    {/* Summary Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            {
                                label: "Total Scans",
                                value: loading ? "…" : (data?.totalPredictions?.toLocaleString() ?? "—"),
                                icon: Activity,
                                color: "text-blue-500 bg-blue-500/10",
                                sub: "All time",
                            },
                            {
                                label: "Unique Diseases",
                                value: loading ? "…" : (data?.analytics.length ?? "—"),
                                icon: Leaf,
                                color: "text-emerald-500 bg-emerald-500/10",
                                sub: "Detected classes",
                            },
                            {
                                label: "Most Common",
                                value: loading ? "…" : (mostCommonName?.split(" ")[0] ?? "—"),
                                icon: TrendingUp,
                                color: "text-orange-500 bg-orange-500/10",
                                sub: mostCommon ? `${mostCommon.count} detections` : "",
                            },
                            {
                                label: "Healthy Rate",
                                value: loading ? "…" : (healthyRate !== null ? `${healthyRate}%` : "—"),
                                icon: CheckCircle2,
                                color: "text-purple-500 bg-purple-500/10",
                                sub: `${healthyCount.toLocaleString()} healthy scans`,
                            },
                        ].map((stat) => (
                            <Card key={stat.label} className="border border-border/50 bg-card/40 hover:bg-card/60 transition-all">
                                <CardContent className="p-5">
                                    <div className={`h-10 w-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
                                        <stat.icon className="h-5 w-5" />
                                    </div>
                                    <p className="text-2xl font-extrabold">{stat.value}</p>
                                    <p className="text-xs text-muted-foreground font-medium mt-0.5">{stat.label}</p>
                                    {stat.sub && <p className="text-[10px] text-muted-foreground/60 mt-0.5">{stat.sub}</p>}
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Chart + Donut side-by-side */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Bar Chart */}
                        <Card className="lg:col-span-2 border border-border/50 bg-card/40">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Database className="h-5 w-5 text-primary" />
                                    Disease Detection Frequency
                                </CardTitle>
                                <CardDescription>
                                    Neon PostgreSQL · {processedAnalytics.length} classes shown
                                    {filterSeverity !== "all" && <span className="text-primary"> · Filtered by {filterSeverity}</span>}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {loading ? (
                                    <div className="space-y-4">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <div key={i} className="h-10 rounded-lg bg-muted animate-pulse" />
                                        ))}
                                    </div>
                                ) : processedAnalytics.length > 0 ? (
                                    <div className="space-y-4">
                                        {processedAnalytics.map((item, idx) => {
                                            const diseaseInfo = DISEASE_DATABASE[item.disease_name];
                                            const isHealthy = item.disease_name === "healthy";
                                            const widthPct = Math.max(2, (item.count / maxCount) * 100);
                                            const pct = data ? ((item.count / data.totalPredictions) * 100).toFixed(1) : "0";
                                            return (
                                                <div key={item.disease_name} className="space-y-1.5 group">
                                                    <div className="flex items-center justify-between text-sm">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[10px] text-muted-foreground tabular-nums w-5 text-right font-mono">
                                                                {idx + 1}
                                                            </span>
                                                            {isHealthy
                                                                ? <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                                                : <AlertTriangle className="h-4 w-4 text-orange-500" />
                                                            }
                                                            <span className="font-semibold">
                                                                {diseaseInfo?.displayName || item.disease_name.replace(/_/g, " ")}
                                                            </span>
                                                            {diseaseInfo && (
                                                                <Badge className={`text-[10px] px-1.5 py-0 ${getSeverityColor(diseaseInfo.severity)}`}>
                                                                    {diseaseInfo.severity}
                                                                </Badge>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[11px] text-muted-foreground tabular-nums">{pct}%</span>
                                                            <span className="font-bold text-muted-foreground tabular-nums w-10 text-right">{item.count.toLocaleString()}</span>
                                                        </div>
                                                    </div>
                                                    <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full transition-all duration-700 ${isHealthy ? "bg-emerald-500" : "bg-primary"}`}
                                                            style={{ width: `${widthPct}%` }}
                                                        />
                                                    </div>
                                                    {item.last_detected && (
                                                        <p className="text-[10px] text-muted-foreground/50 pl-7">
                                                            Last: {format(new Date(item.last_detected), "MMM d, yyyy · h:mm a")}
                                                        </p>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center py-12 text-center">
                                        <BarChart3 className="h-12 w-12 text-muted-foreground mb-4" />
                                        <p className="text-muted-foreground font-medium">
                                            {filterSeverity !== "all" ? "No data matches current filters." : "No data yet — run some predictions first."}
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Donut Distribution */}
                        <Card className="border border-border/50 bg-card/40">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <TrendingUp className="h-4 w-4 text-primary" />
                                    Distribution
                                </CardTitle>
                                <CardDescription>Top 8 by scan count</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center gap-4">
                                {loading || !data || data.totalPredictions === 0 ? (
                                    <div className="h-40 w-40 rounded-full bg-muted animate-pulse" />
                                ) : (
                                    <>
                                        <div className="relative">
                                            <svg viewBox="0 0 160 160" className="h-40 w-40 -rotate-90">
                                                <circle cx="80" cy="80" r="60" fill="none" stroke="hsl(var(--muted))" strokeWidth="20" />
                                                {donutSegments.map((seg, i) => (
                                                    <circle
                                                        key={i}
                                                        cx="80" cy="80" r="60"
                                                        fill="none"
                                                        stroke={seg.color}
                                                        strokeWidth="20"
                                                        strokeDasharray={`${seg.strokeDash} ${2 * Math.PI * 60}`}
                                                        strokeDashoffset={seg.strokeOffset}
                                                        className="transition-all duration-700"
                                                    />
                                                ))}
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <span className="text-2xl font-extrabold">{data.totalPredictions.toLocaleString()}</span>
                                                <span className="text-[10px] text-muted-foreground">total</span>
                                            </div>
                                        </div>
                                        <div className="w-full space-y-1.5 mt-2">
                                            {donutSegments.map((seg, i) => (
                                                <div key={i} className="flex items-center gap-2 text-xs">
                                                    <span className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ background: seg.color }} />
                                                    <span className="truncate flex-1 text-muted-foreground">{seg.label}</span>
                                                    <span className="font-bold tabular-nums">{seg.pct}%</span>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Severity Breakdown */}
                    {data && data.analytics.length > 0 && (
                        <Card className="border border-border/50 bg-card/40">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                                    Severity Breakdown
                                </CardTitle>
                                <CardDescription>Distribution of detections by risk level</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    {(["critical", "high", "moderate", "none"] as const).map((sev) => {
                                        const total = data.analytics.reduce((sum, a) => {
                                            const info = DISEASE_DATABASE[a.disease_name];
                                            const match = sev === "none" ? a.disease_name === "healthy" : info?.severity === sev;
                                            return match ? sum + a.count : sum;
                                        }, 0);
                                        const pct = data.totalPredictions > 0 ? Math.round((total / data.totalPredictions) * 100) : 0;
                                        const colors = {
                                            critical: "bg-red-500/10 border-red-500/30 text-red-400",
                                            high: "bg-orange-500/10 border-orange-500/30 text-orange-400",
                                            moderate: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
                                            none: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
                                        };
                                        return (
                                            <div key={sev} className={`p-4 rounded-xl border ${colors[sev]}`}>
                                                <p className="text-2xl font-extrabold">{pct}%</p>
                                                <p className="text-xs font-bold uppercase tracking-wider opacity-80 mt-0.5 capitalize">
                                                    {sev === "none" ? "Healthy" : sev}
                                                </p>
                                                <p className="text-[11px] opacity-60 mt-1">{total.toLocaleString()} scans</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Research Note */}
                    <Card className="border border-primary/20 bg-primary/5">
                        <CardContent className="p-6">
                            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                                <Info className="h-5 w-5 text-primary" />
                                Research Note
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                These analytics reflect real-world usage of the TomatoGuard AI system. Data is stored persistently
                                in Neon serverless PostgreSQL and updated live after each inference. The frequency distribution
                                can reveal disease outbreaks, seasonal trends, and model performance characteristics over time.
                                Use the <strong>Export CSV</strong> button to download raw analytics for external analysis.
                                Disease counts are upserted atomically to prevent duplicates.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}