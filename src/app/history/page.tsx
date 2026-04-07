"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    History, Trash2, RefreshCw, Database, Clock, Leaf,
    AlertTriangle, CheckCircle2, ChevronLeft, ChevronRight,
    Search, X, SortAsc, SortDesc, Download, Filter,
    ChevronDown, ImageOff,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { DISEASE_DATABASE, getSeverityColor } from "@/lib/diseases";

interface Prediction {
    id: string;
    prediction: string;
    confidence: number;
    image_url: string | null;
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

    // Debounce search
    useEffect(() => {
        const t = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1);
        }, 300);
        return () => clearTimeout(t);
    }, [search]);

    const handleViewResult = (pred: Prediction) => {
        const resultForStorage = {
            id: pred.id,
            prediction: pred.prediction,
            confidence: pred.confidence,
            top5: [{ className: pred.prediction, probability: pred.confidence }],
            createdAt: pred.created_at,
        };
        sessionStorage.setItem("tg_result", JSON.stringify(resultForStorage));
        sessionStorage.setItem("tg_image_url", pred.image_url || "");
        router.push("/results");
    };

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
            setSelectedIds(new Set()); // clear selections on new fetch
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, [debouncedSearch, filterHealthy, sortField, sortDir]);

    useEffect(() => { fetchHistory(page); }, [page, fetchHistory]);

    const handleDelete = async (id: string, e?: React.MouseEvent) => {
        e?.stopPropagation();
        setDeletingId(id);
        try {
            await fetch(`/api/history?id=${id}`, { method: "DELETE" });
            setSelectedIds(prev => { const s = new Set(prev); s.delete(id); return s; });
            fetchHistory(page);
        } finally {
            setDeletingId(null);
        }
    };

    const handleBulkDelete = async () => {
        if (!selectedIds.size) return;
        setBulkDeleting(true);
        try {
            await Promise.all([...selectedIds].map(id =>
                fetch(`/api/history?id=${id}`, { method: "DELETE" })
            ));
            setSelectedIds(new Set());
            fetchHistory(page);
        } finally {
            setBulkDeleting(false);
        }
    };

    const toggleSelect = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedIds(prev => {
            const s = new Set(prev);
            s.has(id) ? s.delete(id) : s.add(id);
            return s;
        });
    };

    const toggleSelectAll = () => {
        if (!data || !data.predictions) return;
        if (selectedIds.size === (data.predictions?.length ?? 0)) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(data.predictions.map(p => p.id)));
        }
    };

    const handleSort = (field: SortField) => {
        if (sortField === field) setSortDir(d => d === "asc" ? "desc" : "asc");
        else { setSortField(field); setSortDir("desc"); }
        setPage(1);
    };

    const getSeverityBadgeClass = (prediction: string) => {
        const info = DISEASE_DATABASE[prediction];
        if (!info) return "bg-gray-500/20 text-gray-400";
        return getSeverityColor(info.severity);
    };

    // Export current page as CSV
    const exportCSV = () => {
        if (!data) return;
        const rows = [
            ["ID", "Disease", "Confidence", "Severity", "Date"],
            ...data.predictions.map(p => [
                p.id,
                DISEASE_DATABASE[p.prediction]?.displayName || p.prediction,
                `${Math.round(p.confidence * 100)}%`,
                DISEASE_DATABASE[p.prediction]?.severity || "unknown",
                format(new Date(p.created_at), "yyyy-MM-dd HH:mm"),
            ]),
        ];
        const csv = rows.map(r => r.join(",")).join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `history-page-${page}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const activeFilters = (debouncedSearch ? 1 : 0) + (filterHealthy !== "all" ? 1 : 0);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                {/* Hero Header */}
                <div className="relative py-16 bg-background border-b border-border/50 overflow-hidden">
                    <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none" />
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                            <div>
                                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 border border-primary/20 bg-primary/5 mb-4">
                                    <Database className="h-3.5 w-3.5 text-primary" />
                                    <span className="text-xs font-semibold text-primary uppercase tracking-widest">Neon PostgreSQL</span>
                                </div>
                                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight shrink-0">Inference History</h1>
                                <p className="mt-2 text-muted-foreground text-base sm:text-lg">
                                    All past predictions stored in your cloud database
                                    {data && <span className="hidden sm:inline text-primary font-semibold"> · {(data?.total ?? 0).toLocaleString()} total scans</span>}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto mt-4 sm:mt-0">
                                {selectedIds.size > 0 && (
                                    <Button
                                        onClick={handleBulkDelete}
                                        variant="destructive"
                                        disabled={bulkDeleting}
                                        size="sm"
                                        className="flex-1 sm:flex-none flex items-center gap-2"
                                    >
                                        {bulkDeleting
                                            ? <RefreshCw className="h-3 w-3 animate-spin" />
                                            : <Trash2 className="h-3 w-3" />
                                        }
                                        Delete {selectedIds.size}
                                    </Button>
                                )}
                                <Button
                                    onClick={exportCSV}
                                    variant="outline"
                                    disabled={!data || loading}
                                    size="sm"
                                    className="flex-1 sm:flex-none flex items-center gap-2"
                                >
                                    <Download className="h-4 w-4" /> Export
                                </Button>
                                <Button
                                    onClick={() => fetchHistory(page)}
                                    variant="outline"
                                    disabled={loading}
                                    size="sm"
                                    className="flex-1 sm:flex-none flex items-center gap-2 border-border/60 hover:border-primary/50"
                                >
                                    <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                                    Refresh
                                </Button>
                            </div>
                        </div>

                        {/* Search + Filters */}
                        <div className="mt-6 flex flex-col sm:flex-row gap-3">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    placeholder="Search by disease name…"
                                    className="pl-9 pr-9 bg-background border-border/60"
                                />
                                {search && (
                                    <button
                                        onClick={() => setSearch("")}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                            <Button
                                variant="outline"
                                onClick={() => setShowFilters(f => !f)}
                                className="flex items-center gap-2 shrink-0"
                            >
                                <Filter className="h-4 w-4" />
                                Filters
                                {activeFilters > 0 && (
                                    <span className="h-5 w-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                                        {activeFilters}
                                    </span>
                                )}
                                <ChevronDown className={`h-3 w-3 transition-transform ${showFilters ? "rotate-180" : ""}`} />
                            </Button>
                        </div>

                        {showFilters && (
                            <div className="mt-3 p-4 rounded-xl bg-muted/30 border border-border/50 flex flex-wrap gap-6 items-start">
                                <div>
                                    <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Sort By</p>
                                    <div className="flex gap-2 flex-wrap">
                                        {([
                                            { field: "created_at" as SortField, label: "Date" },
                                            { field: "confidence" as SortField, label: "Confidence" },
                                            { field: "prediction" as SortField, label: "Disease" },
                                        ]).map(({ field, label }) => (
                                            <button
                                                key={field}
                                                onClick={() => handleSort(field)}
                                                className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium transition-all ${sortField === field
                                                    ? "bg-primary text-primary-foreground"
                                                    : "bg-background border border-border/50 text-muted-foreground hover:border-primary/40"
                                                    }`}
                                            >
                                                {label}
                                                {sortField === field && (
                                                    sortDir === "asc"
                                                        ? <SortAsc className="h-3 w-3" />
                                                        : <SortDesc className="h-3 w-3" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Result Type</p>
                                    <div className="flex gap-2">
                                        {(["all", "healthy", "diseased"] as const).map(f => (
                                            <button
                                                key={f}
                                                onClick={() => { setFilterHealthy(f); setPage(1); }}
                                                className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-all ${filterHealthy === f
                                                    ? "bg-primary text-primary-foreground"
                                                    : "bg-background border border-border/50 text-muted-foreground hover:border-primary/40"
                                                    }`}
                                            >
                                                {f}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                    {/* Bulk select bar */}
                    {data && (data.predictions?.length ?? 0) > 0 && (
                        <div className="flex items-center gap-3 mb-6 text-sm text-muted-foreground">
                            <button
                                onClick={toggleSelectAll}
                                className="flex items-center gap-2 hover:text-foreground transition-colors"
                            >
                                <div className={`h-4 w-4 rounded border-2 flex items-center justify-center transition-all ${selectedIds.size === (data.predictions?.length ?? 0) ? "bg-primary border-primary" : "border-border/60"}`}>
                                    {selectedIds.size === (data.predictions?.length ?? 0) && (
                                        <CheckCircle2 className="h-3 w-3 text-primary-foreground" />
                                    )}
                                </div>
                                {selectedIds.size === (data.predictions?.length ?? 0) ? "Deselect all" : "Select all"}
                            </button>
                            {selectedIds.size > 0 && (
                                <span className="text-primary font-medium">{selectedIds.size} selected</span>
                            )}
                        </div>
                    )}

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="h-52 rounded-2xl bg-card/40 animate-pulse border border-border/30" />
                            ))}
                        </div>
                    ) : data && (data.predictions?.length ?? 0) > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {data.predictions?.map((pred) => {
                                    const diseaseInfo = DISEASE_DATABASE[pred.prediction];
                                    const isHealthy = pred.prediction === "healthy";
                                    const isSelected = selectedIds.has(pred.id);
                                    const confidence = Math.round(pred.confidence * 100);
                                    const hasImageError = imageErrors.has(pred.id);

                                    return (
                                        <Card
                                            key={pred.id}
                                            onClick={() => handleViewResult(pred)}
                                            className={`group border transition-all hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-0.5 overflow-hidden cursor-pointer active:scale-[0.98] ${isSelected
                                                ? "border-primary/60 bg-primary/5"
                                                : "border-border/50 bg-card/40 hover:bg-card/70"
                                                }`}
                                        >
                                            {/* Image preview with equal width and height and rounded corners */}
                                            {pred.image_url && (pred.image_url.startsWith('data:') || pred.image_url.startsWith('http')) && !hasImageError ? (
                                                <div className="aspect-square w-full p-3 pb-0">
                                                    <div className="h-full w-full overflow-hidden rounded-lg bg-muted border border-border/30">
                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                        <img
                                                            src={pred.image_url}
                                                            alt="Scan"
                                                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                            onError={() => setImageErrors(prev => new Set(prev).add(pred.id))}
                                                        />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="aspect-square w-full p-3 pb-0">
                                                    <div className="h-full w-full flex items-center justify-center bg-muted/20 rounded-lg border border-border/20">
                                                        <div className="flex flex-col items-center gap-2">
                                                            <Leaf className="h-8 w-8 text-muted-foreground/30" />
                                                            <span className="text-[10px] font-medium text-muted-foreground/40 uppercase tracking-tighter text-center px-4">No Preview Available</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            <CardContent className="p-5">
                                                <div className="flex items-start justify-between gap-3 mb-4">
                                                    <div className="flex items-center gap-2.5">
                                                        {/* Checkbox */}
                                                        <div
                                                            onClick={e => toggleSelect(pred.id, e)}
                                                            className={`h-5 w-5 rounded border-2 flex-shrink-0 flex items-center justify-center cursor-pointer transition-all ${isSelected ? "bg-primary border-primary" : "border-border/50 hover:border-primary/50"}`}
                                                        >
                                                            {isSelected && <CheckCircle2 className="h-3.5 w-3.5 text-primary-foreground" />}
                                                        </div>
                                                        <div className={`h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0 ${isHealthy ? "bg-emerald-500/10" : "bg-orange-500/10"}`}>
                                                            {isHealthy
                                                                ? <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                                                : <AlertTriangle className="h-4 w-4 text-orange-500" />
                                                            }
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="font-bold text-sm truncate">
                                                                {(diseaseInfo?.displayName || pred.prediction).replace(/_/g, " ")}
                                                            </p>
                                                            <p className={`text-xs font-semibold ${confidence >= 90 ? "text-emerald-500" : confidence >= 70 ? "text-yellow-500" : "text-red-400"}`}>
                                                                {confidence}% confidence
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={e => handleDelete(pred.id, e)}
                                                        disabled={deletingId === pred.id}
                                                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-destructive/10 hover:text-destructive text-muted-foreground relative z-10"
                                                        title="Delete record"
                                                    >
                                                        {deletingId === pred.id
                                                            ? <RefreshCw className="h-4 w-4 animate-spin" />
                                                            : <Trash2 className="h-4 w-4" />
                                                        }
                                                    </button>
                                                </div>

                                                <Separator className="mb-4 opacity-50" />

                                                <div className="flex items-center justify-between gap-2 mb-3">
                                                    <Badge className={`text-xs ${getSeverityBadgeClass(pred.prediction)}`}>
                                                        {diseaseInfo?.severity?.toUpperCase() || "UNKNOWN"}
                                                    </Badge>
                                                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground" title={format(new Date(pred.created_at), "PPpp")}>
                                                        <Clock className="h-3 w-3" />
                                                        {formatDistanceToNow(new Date(pred.created_at), { addSuffix: true })}
                                                    </span>
                                                </div>

                                                {/* Confidence bar */}
                                                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full transition-all duration-700 ${confidence >= 90 ? "bg-emerald-500" : confidence >= 70 ? "bg-yellow-500" : "bg-red-500"}`}
                                                        style={{ width: `${confidence}%` }}
                                                    />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>

                            {/* Pagination */}
                            {data.totalPages > 1 && (
                                <div className="flex items-center justify-center gap-4 mt-12">
                                    <Button
                                        variant="outline"
                                        onClick={() => setPage(p => Math.max(1, p - 1))}
                                        disabled={page === 1}
                                        className="flex items-center gap-2"
                                    >
                                        <ChevronLeft className="h-4 w-4" /> Previous
                                    </Button>
                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: Math.min(5, data.totalPages) }, (_, i) => {
                                            const p = Math.max(1, Math.min(data.totalPages - 4, page - 2)) + i;
                                            return (
                                                <button
                                                    key={p}
                                                    onClick={() => setPage(p)}
                                                    className={`h-8 w-8 rounded-lg text-sm font-medium transition-all ${p === page
                                                        ? "bg-primary text-primary-foreground"
                                                        : "text-muted-foreground hover:bg-muted"
                                                        }`}
                                                >
                                                    {p}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <Button
                                        variant="outline"
                                        onClick={() => setPage(p => Math.min(data.totalPages, p + 1))}
                                        disabled={page === data.totalPages}
                                        className="flex items-center gap-2"
                                    >
                                        Next <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                            <div className="h-20 w-20 rounded-2xl bg-muted flex items-center justify-center mb-6">
                                {debouncedSearch || filterHealthy !== "all"
                                    ? <Search className="h-10 w-10 text-muted-foreground" />
                                    : <History className="h-10 w-10 text-muted-foreground" />
                                }
                            </div>
                            {debouncedSearch || filterHealthy !== "all" ? (
                                <>
                                    <h2 className="text-2xl font-bold mb-2">No results found</h2>
                                    <p className="text-muted-foreground max-w-md mb-6">
                                        Try adjusting your search or filters.
                                    </p>
                                    <Button variant="outline" onClick={() => { setSearch(""); setFilterHealthy("all"); }}>
                                        Clear Filters
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <h2 className="text-2xl font-bold mb-2">No predictions yet</h2>
                                    <p className="text-muted-foreground max-w-md mb-8">
                                        Upload a tomato leaf image from the home page and your results will be stored here in Neon PostgreSQL.
                                    </p>
                                    <a href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-emerald text-white font-bold hover:opacity-90 transition-opacity">
                                        <Leaf className="h-4 w-4" /> Start Analyzing
                                    </a>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}