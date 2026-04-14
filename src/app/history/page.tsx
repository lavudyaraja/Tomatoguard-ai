"use client";

// ─── Font: Add to global CSS ───────────────────────────────────────────────────
// @import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,400;0,500;1,400&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;0,9..144,900;1,9..144,400&display=swap');

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    History, Trash2, RefreshCw, Database, Clock, Leaf,
    AlertTriangle, CheckCircle2, ChevronLeft, ChevronRight,
    Search, X, SortAsc, SortDesc, Download, Filter,
    ChevronDown, TrendingUp, Activity, Layers,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { getSeverityColor, cn } from "@/lib/utils";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface Prediction {
    id: string;
    prediction: string;
    confidence: number;
    image_url: string | null;
    xai_url: string | null;
    hotspots: string | null;
    image_info: string | null;
    llm_insight: string | null;
    created_at: string;
}

interface HistoryData {
    predictions: Prediction[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

type SortField = "created_at" | "confidence" | "prediction";
type SortDir = "asc" | "desc";

// ─── Component ─────────────────────────────────────────────────────────────────

export default function HistoryPage() {
    const router = useRouter();
    const [data, setData] = useState<HistoryData | null>(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [bulkDeleting, setBulkDeleting] = useState(false);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [sortField, setSortField] = useState<SortField>("created_at");
    const [sortDir, setSortDir] = useState<SortDir>("desc");
    const [filterHealthy, setFilterHealthy] = useState<"all" | "healthy" | "diseased">("all");
    const [showFilters, setShowFilters] = useState(false);
    const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    useEffect(() => {
        const t = setTimeout(() => { setDebouncedSearch(search); setPage(1); }, 300);
        return () => clearTimeout(t);
    }, [search]);

    const fetchHistory = useCallback(async (p = 1) => {
        setLoading(true);
        try {
            const params = new URLSearchParams({ page: String(p), limit: "12" });
            if (debouncedSearch) params.set("search", debouncedSearch);
            if (filterHealthy !== "all") params.set("filter", filterHealthy);
            params.set("sort", sortField);
            params.set("dir", sortDir);
            const res = await fetch(`/api/history?${params}`);
            const json = await res.json();
            setData(json);
            setSelectedIds(new Set());
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    }, [debouncedSearch, filterHealthy, sortField, sortDir]);

    useEffect(() => { fetchHistory(page); }, [page, fetchHistory]);

    const handleDelete = async (id: string, e?: React.MouseEvent) => {
        e?.stopPropagation();
        setDeletingId(id);
        try {
            await fetch(`/api/history?id=${id}`, { method: "DELETE" });
            setSelectedIds(prev => { const s = new Set(prev); s.delete(id); return s; });
            fetchHistory(page);
        } finally { setDeletingId(null); }
    };

    const handleBulkDelete = async () => {
        if (!selectedIds.size) return;
        setBulkDeleting(true);
        try {
            await Promise.all([...selectedIds].map(id => fetch(`/api/history?id=${id}`, { method: "DELETE" })));
            setSelectedIds(new Set());
            fetchHistory(page);
        } finally { setBulkDeleting(false); }
    };

    const toggleSelect = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedIds(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });
    };

    const toggleSelectAll = () => {
        if (!data?.predictions) return;
        setSelectedIds(selectedIds.size === data.predictions.length
            ? new Set()
            : new Set(data.predictions.map(p => p.id))
        );
    };

    const handleSort = (field: SortField) => {
        if (sortField === field) setSortDir(d => d === "asc" ? "desc" : "asc");
        else { setSortField(field); setSortDir("desc"); }
        setPage(1);
    };

    const exportCSV = () => {
        if (!data) return;
        const rows = [
            ["ID", "Disease", "Confidence", "Severity", "Date"],
            ...data.predictions.map(p => {
                const ins = p.llm_insight ? JSON.parse(p.llm_insight) : null;
                return [p.id, ins?.displayName || p.prediction, `${Math.round(p.confidence * 100)}%`, ins?.severity || "unknown", format(new Date(p.created_at), "yyyy-MM-dd HH:mm")];
            }),
        ];
        const blob = new Blob([rows.map(r => r.join(",")).join("\n")], { type: "text/csv" });
        const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: `tomatoguard-history-${page}.csv` });
        a.click();
    };

    const activeFilters = (debouncedSearch ? 1 : 0) + (filterHealthy !== "all" ? 1 : 0);

    // Aggregate stats
    const stats = data ? {
        total: data.total,
        diseased: data.predictions.filter(p => p.prediction !== "healthy").length,
        healthy: data.predictions.filter(p => p.prediction === "healthy").length,
        avgConf: data.predictions.length
            ? Math.round(data.predictions.reduce((s, p) => s + p.confidence * 100, 0) / data.predictions.length)
            : 0,
    } : null;

    const mono = { fontFamily: "var(--font-geist-mono), monospace" };
    const serif = { fontFamily: "'Lora', Georgia, serif" };

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground" style={mono}>
            <Navbar />

            {/* ── Hero strip ─────────────────────────────────────── */}
            <header className="relative border-b border-border/40 overflow-hidden bg-muted/10">
                {/* Background texture */}
                <div className="absolute inset-0"
                    style={{ backgroundImage: "radial-gradient(circle at 20% 50%, rgba(16,185,129,0.03) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(16,185,129,0.02) 0%, transparent 50%)" }} />
                <div className="absolute inset-0 opacity-[0.05]"
                    style={{ backgroundImage: "repeating-linear-gradient(0deg, var(--border) 0px, var(--border) 1px, transparent 1px, transparent 48px), repeating-linear-gradient(90deg, var(--border) 0px, var(--border) 1px, transparent 1px, transparent 48px)" }} />

                <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-12">
                    {/* Top line: breadcrumb + actions */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3 text-[11px] text-muted-foreground/60 uppercase tracking-[0.2em] font-bold">
                            <span>TomatoGuard</span>
                            <span className="text-border">/</span>
                            <span className="text-primary">Archive</span>
                        </div>
                        <div className="flex items-center gap-2">
                            {selectedIds.size > 0 && (
                                <button
                                    onClick={handleBulkDelete}
                                    disabled={bulkDeleting}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-destructive/10 text-destructive border border-destructive/20 text-[11px] font-bold hover:bg-destructive/20 transition-colors"
                                >
                                    {bulkDeleting ? <RefreshCw className="h-3 w-3 animate-spin" /> : <Trash2 className="h-3 w-3" />}
                                    Delete {selectedIds.size}
                                </button>
                            )}
                            <button
                                onClick={exportCSV}
                                disabled={!data || loading}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted border border-border text-[11px] text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                            >
                                <Download className="h-3.5 w-3.5" /> Export CSV
                            </button>
                            <button
                                onClick={() => fetchHistory(page)}
                                disabled={loading}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 text-[11px] hover:bg-primary/20 transition-colors font-bold"
                            >
                                <RefreshCw className={cn("h-3.5 w-3.5", loading && "animate-spin")} />
                                Refresh
                            </button>
                        </div>
                    </div>

                    {/* Title */}
                    <div className="flex flex-col lg:flex-row lg:items-end gap-6 justify-between">
                        <div>
                            <div className="flex items-center gap-2.5 mb-3">
                                <div className="h-1 w-8 rounded-full bg-primary" />
                                <span className="text-[10px] text-primary uppercase tracking-[0.3em] font-bold">Diagnostic Archive</span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-none tracking-tight" style={serif}>
                                Inference<br />
                                <span className="text-primary">History</span>
                            </h1>
                            <p className="mt-3 text-[13px] text-muted-foreground/80 max-w-sm leading-relaxed font-medium">
                                {data ? `${data.total.toLocaleString()} scans stored in Neon PostgreSQL` : "Loading archive…"}
                            </p>
                        </div>

                        {/* Stats strip */}
                        {stats && (
                            <div className="grid grid-cols-4 gap-3 lg:w-auto w-full">
                                {[
                                    { label: "Total Scans", value: stats.total.toLocaleString(), icon: Database, color: "var(--primary)" },
                                    { label: "Diseased", value: stats.diseased, icon: AlertTriangle, color: "#f59e0b" },
                                    { label: "Healthy", value: stats.healthy, icon: "#10b981", color: "#10b981" },
                                    { label: "Avg Conf.", value: `${stats.avgConf}%`, icon: Activity, color: "#818cf8" },
                                ].map(({ label, value, icon: Icon, color }) => (
                                    <div key={label} className="rounded-xl border border-border bg-card shadow-sm p-3 min-w-[80px]">
                                        {typeof Icon !== "string" && <Icon className="h-3.5 w-3.5 mb-2" style={{ color }} />}
                                        <p className="text-xl font-bold text-foreground leading-none" style={{ color }}>{value}</p>
                                        <p className="text-[9px] text-muted-foreground uppercase tracking-widest mt-1 font-bold">{label}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Search + Filters */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/40" />
                            <input
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search disease name…"
                                className="w-full pl-10 pr-9 py-2.5 bg-background border border-border rounded-xl text-[13px] text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/10 transition-all font-medium"
                                style={mono}
                            />
                            {search && (
                                <button onClick={() => setSearch("")} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-foreground transition-colors">
                                    <X className="h-3.5 w-3.5" />
                                </button>
                            )}
                        </div>
                        <button
                            onClick={() => setShowFilters(f => !f)}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2.5 rounded-xl border text-[12px] font-bold transition-all shrink-0",
                                showFilters ? "bg-primary/10 border-primary/30 text-primary shadow-sm" : "bg-muted border-border text-muted-foreground hover:bg-accent hover:text-foreground"
                            )}
                        >
                            <Filter className="h-3.5 w-3.5" />
                            Filters
                            {activeFilters > 0 && (
                                <span className="h-4 w-4 rounded-full bg-primary text-primary-foreground text-[9px] font-black flex items-center justify-center">
                                    {activeFilters}
                                </span>
                            )}
                            <ChevronDown className={cn("h-3 w-3 transition-transform", showFilters && "rotate-180")} />
                        </button>
                    </div>

                    {/* Filter panel */}
                    {showFilters && (
                        <div className="mt-3 p-4 rounded-xl bg-card border border-border shadow-sm flex flex-wrap gap-8">
                            <div>
                                <p className="text-[9px] text-muted-foreground/60 uppercase tracking-[0.2em] mb-2.5 font-bold">Sort By</p>
                                <div className="flex gap-2">
                                    {([
                                        { field: "created_at" as SortField, label: "Date" },
                                        { field: "confidence" as SortField, label: "Confidence" },
                                        { field: "prediction" as SortField, label: "Disease" },
                                    ]).map(({ field, label }) => (
                                        <button
                                            key={field}
                                            onClick={() => handleSort(field)}
                                            className={cn(
                                                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all",
                                                sortField === field
                                                    ? "bg-primary/10 text-primary border border-primary/30"
                                                    : "bg-muted text-muted-foreground border border-transparent hover:bg-accent hover:text-foreground"
                                            )}
                                        >
                                            {label}
                                            {sortField === field && (sortDir === "asc" ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="text-[9px] text-muted-foreground/60 uppercase tracking-[0.2em] mb-2.5 font-bold">Result Type</p>
                                <div className="flex gap-2">
                                    {(["all", "healthy", "diseased"] as const).map(f => (
                                        <button
                                            key={f}
                                            onClick={() => { setFilterHealthy(f); setPage(1); }}
                                            className={cn(
                                                "px-3 py-1.5 rounded-lg text-[11px] font-bold capitalize transition-all",
                                                filterHealthy === f
                                                    ? "bg-primary/10 text-primary border border-primary/30"
                                                    : "bg-muted text-muted-foreground border border-transparent hover:bg-accent hover:text-foreground"
                                            )}
                                        >
                                            {f}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* ── Main Content ───────────────────────────────────── */}
            <main className="flex-grow mx-auto max-w-7xl w-full px-6 lg:px-8 py-10">
                {/* Bulk select row */}
                {data && data.predictions.length > 0 && (
                    <div className="flex items-center justify-between mb-6">
                        <button onClick={toggleSelectAll} className="flex items-center gap-2 text-[11px] text-muted-foreground hover:text-foreground transition-colors font-bold">
                            <div className={cn(
                                "h-4 w-4 rounded border flex items-center justify-center transition-all",
                                selectedIds.size === data.predictions.length ? "bg-primary border-primary" : "border-border shadow-inner bg-muted"
                            )}>
                                {selectedIds.size === data.predictions.length && <CheckCircle2 className="h-2.5 w-2.5 text-primary-foreground" />}
                            </div>
                            {selectedIds.size === data.predictions.length ? "Deselect all" : "Select all"}
                        </button>
                        <span className="text-[11px] text-muted-foreground/40 font-bold" style={mono}>
                            {data.predictions.length} of {data.total} records
                        </span>
                    </div>
                )}

                {loading ? (
                    /* Skeleton grid */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="rounded-2xl bg-muted border border-border overflow-hidden animate-pulse">
                                <div className="aspect-[4/3] bg-muted-foreground/10" />
                                <div className="p-4 space-y-2">
                                    <div className="h-3 bg-muted-foreground/10 rounded w-3/4" />
                                    <div className="h-2 bg-muted-foreground/5 rounded w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : data && data.predictions.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {data.predictions.map((pred, idx) => {
                                const ins = pred.llm_insight ? JSON.parse(pred.llm_insight) : null;
                                const isHealthy = pred.prediction === "healthy";
                                const isSelected = selectedIds.has(pred.id);
                                const conf = Math.round(pred.confidence * 100);
                                const confColor = conf >= 90 ? "#10b981" : conf >= 70 ? "#f59e0b" : "#ef4444";
                                const sev = ins?.severity || "low";
                                const sevColor = sev === "low" ? "#10b981" : sev === "moderate" ? "#f59e0b" : sev === "high" ? "#f97316" : "#ef4444";
                                const hasImgErr = imageErrors.has(pred.id);
                                const isHovered = hoveredId === pred.id;

                                return (
                                    <article
                                        key={pred.id}
                                        onClick={() => router.push(`/history/${pred.id}`)}
                                        onMouseEnter={() => setHoveredId(pred.id)}
                                        onMouseLeave={() => setHoveredId(null)}
                                        className={cn(
                                            "group relative rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300",
                                            isSelected
                                                ? "border-primary/40 bg-primary/[0.05] shadow-[0_0_0_1px_rgba(var(--primary),0.15)]"
                                                : "border-border bg-card hover:border-primary/40 hover:bg-muted/30 hover:shadow-md",
                                            isHovered && "-translate-y-0.5"
                                        )}
                                        style={{ animationDelay: `${idx * 30}ms` }}
                                    >
                                        {/* Selection checkbox — top left overlay */}
                                        <div
                                            onClick={e => toggleSelect(pred.id, e)}
                                            className={cn(
                                                "absolute top-3 left-3 z-20 h-5 w-5 rounded border flex items-center justify-center cursor-pointer transition-all",
                                                "opacity-0 group-hover:opacity-100",
                                                isSelected ? "opacity-100 bg-primary border-primary" : "border-foreground/30 bg-background/40 backdrop-blur-sm"
                                            )}
                                        >
                                            {isSelected && <CheckCircle2 className="h-3 w-3 text-primary-foreground" />}
                                        </div>

                                        {/* Delete button */}
                                        <button
                                            onClick={e => handleDelete(pred.id, e)}
                                            disabled={deletingId === pred.id}
                                            className="absolute top-3 right-3 z-20 h-7 w-7 rounded-lg bg-background/50 backdrop-blur-sm border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-destructive/20 hover:border-destructive/30 text-muted-foreground hover:text-destructive"
                                        >
                                            {deletingId === pred.id
                                                ? <RefreshCw className="h-3 w-3 animate-spin" />
                                                : <Trash2 className="h-3 w-3" />}
                                        </button>

                                        {/* Image */}
                                        <div className="aspect-[4/3] w-full overflow-hidden bg-muted">
                                            {pred.image_url && !hasImgErr ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img
                                                    src={pred.image_url}
                                                    alt="Leaf scan"
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    onError={() => setImageErrors(prev => new Set(prev).add(pred.id))}
                                                />
                                            ) : (
                                                <div className="h-full w-full flex flex-col items-center justify-center gap-2">
                                                    <Leaf className="h-8 w-8 text-muted-foreground/20" />
                                                    <span className="text-[9px] text-muted-foreground/30 uppercase tracking-widest font-bold">No Preview</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Card body */}
                                        <div className="p-4 space-y-3 bg-card/40">
                                            {/* Disease name */}
                                            <div className="flex justify-between items-start gap-4">
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[9px] text-muted-foreground/50 uppercase tracking-[0.18em] mb-1 font-bold">
                                                        {isHealthy ? "Status" : "Diagnosis"}
                                                    </p>
                                                    <h3
                                                        className="text-[14px] font-bold text-foreground leading-tight line-clamp-1 capitalize"
                                                        style={serif}
                                                    >
                                                        {(ins?.displayName || pred.prediction).replace(/_/g, " ")}
                                                    </h3>
                                                </div>
                                                <div
                                                    className="px-2 py-1 rounded-md text-[10px] font-bold border shrink-0"
                                                    style={{
                                                        background: `${confColor}10`,
                                                        borderColor: `${confColor}30`,
                                                        color: confColor,
                                                        fontFamily: "var(--font-geist-mono), monospace"
                                                    }}
                                                >
                                                    {conf}%
                                                </div>
                                            </div>

                                            {/* Confidence bar */}
                                            <div className="space-y-1">
                                                <div className="h-1 rounded-full bg-muted overflow-hidden">
                                                    <div
                                                        className="h-full rounded-full transition-all duration-700"
                                                        style={{ width: `${conf}%`, background: confColor }}
                                                    />
                                                </div>
                                            </div>

                                            {/* Meta row */}
                                            <div className="flex items-center justify-between">
                                                <span
                                                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest border shadow-sm"
                                                    style={{ color: sevColor, background: `${sevColor}10`, borderColor: `${sevColor}30` }}
                                                >
                                                    <span className="h-1 w-1 rounded-full animate-pulse" style={{ background: sevColor }} />
                                                    {sev}
                                                </span>
                                                <span className="flex items-center gap-1 text-[10px] text-muted-foreground/60 font-medium" style={mono}>
                                                    <Clock className="h-2.5 w-2.5" />
                                                    {formatDistanceToNow(new Date(pred.created_at), { addSuffix: true })}
                                                </span>
                                            </div>

                                            {/* ID strip */}
                                            <div className="pt-3 border-t border-border/50">
                                                <span className="text-[9px] text-muted-foreground/30 tracking-widest font-bold" style={mono}>
                                                    ID: {pred.id.slice(0, 16).toUpperCase()}…
                                                </span>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>

                        {/* Pagination */}
                        {data.totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-12">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border bg-card text-[12px] text-muted-foreground hover:text-foreground hover:border-primary/20 transition-all shadow-sm disabled:opacity-30 font-bold"
                                >
                                    <ChevronLeft className="h-3.5 w-3.5" /> Prev
                                </button>

                                <div className="flex items-center gap-1">
                                    {Array.from({ length: Math.min(5, data.totalPages) }, (_, i) => {
                                        const p = Math.max(1, Math.min(data.totalPages - 4, page - 2)) + i;
                                        return (
                                            <button
                                                key={p}
                                                onClick={() => setPage(p)}
                                                className={cn(
                                                    "h-8 w-8 rounded-lg text-[12px] font-bold transition-all",
                                                    p === page
                                                        ? "bg-primary/20 text-primary border border-primary/30"
                                                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                                )}
                                                style={mono}
                                            >
                                                {p}
                                            </button>
                                        );
                                    })}
                                </div>

                                <button
                                    onClick={() => setPage(p => Math.min(data.totalPages, p + 1))}
                                    disabled={page === data.totalPages}
                                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border bg-card text-[12px] text-muted-foreground hover:text-foreground hover:border-primary/20 transition-all shadow-sm disabled:opacity-30 font-bold"
                                >
                                    Next <ChevronRight className="h-3.5 w-3.5" />
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    /* Empty state */
                    <div className="flex flex-col items-center justify-center py-32 text-center">
                        <div className="relative mb-8">
                            <div className="h-24 w-24 rounded-3xl bg-muted border border-border flex items-center justify-center shadow-inner">
                                {debouncedSearch || filterHealthy !== "all"
                                    ? <Search className="h-10 w-10 text-muted-foreground/20" />
                                    : <History className="h-10 w-10 text-muted-foreground/20" />}
                            </div>
                            <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary/20 border border-primary/30 animate-pulse" />
                        </div>
                        {debouncedSearch || filterHealthy !== "all" ? (
                            <>
                                <h2 className="text-2xl font-bold text-foreground mb-2" style={serif}>No results found</h2>
                                <p className="text-[13px] text-muted-foreground max-w-xs mb-6 font-medium">Try adjusting your search or filter criteria.</p>
                                <button
                                    onClick={() => { setSearch(""); setFilterHealthy("all"); }}
                                    className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-[12px] font-bold hover:bg-primary/90 transition-colors shadow-lg"
                                >
                                    Clear all filters
                                </button>
                            </>
                        ) : (
                            <>
                                <h2 className="text-2xl font-bold text-foreground mb-2" style={serif}>No records yet</h2>
                                <p className="text-[13px] text-muted-foreground max-w-xs mb-8 leading-relaxed font-medium">
                                    Upload a tomato leaf scan from the home page — results are stored here automatically.
                                </p>
                                <a
                                    href="/"
                                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground text-[13px] font-black tracking-widest uppercase hover:bg-primary/90 transition-all shadow-xl hover:-translate-y-1"
                                >
                                    <Leaf className="h-4 w-4" /> Start Analyzing
                                </a>
                            </>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}