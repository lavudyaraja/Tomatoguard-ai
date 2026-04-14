"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import {
    AlertOctagon, HelpCircle, Thermometer, ShieldCheckIcon,
    CheckCircle2, FlaskConical, Stethoscope,
    Search, Copy, Check,
    CircleAlert, Loader2,
    Microscope, Bug, Leaf
} from "lucide-react";
import { DiseaseInfo, Hotspot } from "@/lib/types";
import { cn } from "@/lib/utils";


interface DiseaseInsights {
    symptoms?: string[];
    causes?: string[];
    treatments?: string[];
    prevention?: string[];
}

interface DiseaseDetailProps {
    disease: DiseaseInfo;
    defaultTab?: string;
    image?: string;
    imageType?: string;
    hotspots?: Hotspot[];
    imageInfo?: {
        brightness: number;
        green_coverage_pct: number;
        dominant_color: string;
        quality_warnings: string[];
        color_description: string;
    };
    hideDetails?: boolean;
}

// ─── Tab Config ───────────────────────────────────────────────────────────────

const TABS = [
    {
        key: "symptoms",
        label: "Symptoms",
        shortDesc: "Visible signs of infection",
        Icon: AlertOctagon,
        accent: "#e11d48",
    },
    {
        key: "causes",
        label: "Causes",
        shortDesc: "Pathogen & environment",
        Icon: HelpCircle,
        accent: "#0284c7",
    },
    {
        key: "treatments",
        label: "Treatment",
        shortDesc: "Recovery protocols",
        Icon: Thermometer,
        accent: "#7c3aed",
    },
    {
        key: "prevention",
        label: "Prevention",
        shortDesc: "Biosecurity measures",
        Icon: ShieldCheckIcon,
        accent: "#059669",
    },
] as const;

type TabKey = typeof TABS[number]["key"];

// ─── Main Component ───────────────────────────────────────────────────────────

export function DiseaseDetail({
    disease,
    defaultTab,
    image,
    imageType,
    imageInfo,
    hotspots,
    hideDetails = false,
}: DiseaseDetailProps) {
    const [activeTab, setActiveTab] = useState<TabKey>((defaultTab as TabKey) ?? "symptoms");
    const [searchQuery, setSearchQuery] = useState("");
    const [insights, setInsights] = useState<DiseaseInsights | null>(null);
    const [insightsLoading, setInsightsLoading] = useState(false);
    const [insightsFetched, setInsightsFetched] = useState(false);
    const [copiedIdx, setCopiedIdx] = useState<string | null>(null);
    const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());

    const totalDiseaseArea = useMemo(() => {
        if (!hotspots || hotspots.length === 0) return 0;
        return hotspots.reduce((acc, curr) => acc + (curr.area_pct || 0), 0);
    }, [hotspots]);

    const activeTabData = TABS.find(t => t.key === activeTab)!;
    const allItems: string[] = (insights ? (insights as any)[activeTab] : null) || (disease as any)[activeTab] || [];

    const filteredItems = useMemo(() => {
        if (!searchQuery.trim()) return allItems;
        return allItems.filter(item =>
            item.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [allItems, searchQuery]);

    // ── Fetch Insights ──
    const fetchInsights = useCallback(async () => {
        if (insightsFetched || insightsLoading || hideDetails) return;
        setInsightsLoading(true);
        try {
            const res = await fetch("/api/disease-insights", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    diseaseName: disease.name ?? disease.displayName,
                    image: image ?? null,
                    imageType: imageType ?? "image/jpeg",
                    severity: (disease as any).severity ?? "moderate",
                }),
            });
            if (res.ok) {
                const data = await res.json();
                setInsights(data.insights ?? null);
            }
        } catch (e) {
            console.error("Insights error:", e);
        } finally {
            setInsightsLoading(false);
            setInsightsFetched(true);
        }
    }, [disease.name, disease.displayName, image, imageType, insightsFetched, insightsLoading, hideDetails]);

    useEffect(() => { fetchInsights(); }, [fetchInsights]);
    useEffect(() => { setSearchQuery(""); }, [activeTab]);

    function toggleBookmark(key: string) {
        setBookmarks(prev => {
            const next = new Set(prev);
            next.has(key) ? next.delete(key) : next.add(key);
            return next;
        });
    }
    function copyItem(text: string, key: string) {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedIdx(key);
            setTimeout(() => setCopiedIdx(null), 2000);
        });
    }
    const noteKey = (idx: number) => `${activeTab}-${idx}`;
    const bookmarkedItems = Array.from(bookmarks);

    return (
        <div
            className="w-full space-y-8 py-8"
            style={{ fontFamily: "'Syne', system-ui, sans-serif" }}
        >
            {/* ── Disease Header Banner ─────────────────────── */}
            <div
                className="relative rounded-3xl overflow-hidden border border-border/50"
                style={{ background: "linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--muted)/0.4) 100%)" }}
            >
                {/* Decorative background grid */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: "repeating-linear-gradient(0deg,currentColor,currentColor 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,currentColor,currentColor 1px,transparent 1px,transparent 40px)"
                }} />
            </div>
            {/* ── Bookmarked Items ─────────────────────────────── */}
            {
                bookmarkedItems.length > 0 && (
                    <div className="rounded-2xl border border-amber-500/25 bg-amber-500/5 p-5 space-y-3">
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">
                                ★ Bookmarked — {bookmarkedItems.length} item{bookmarkedItems.length > 1 ? "s" : ""}
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {bookmarkedItems.map(k => {
                                const [tab, idxStr] = k.split("-");
                                const tabItems: string[] = (insights ? (insights as any)[tab] : null) || (disease as any)[tab] || [];
                                const item = tabItems[parseInt(idxStr)];
                                if (!item) return null;
                                return (
                                    <span
                                        key={k}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-medium bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20 max-w-xs truncate"
                                    >
                                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                                        {item.slice(0, 60)}{item.length > 60 ? "…" : ""}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                )
            }

            {/* ── Details Sections ── */}
            {!hideDetails && (
                <>
                    {/* ── Tab Nav + Content ────────────────────────────── */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Tab Sidebar */}
                        <nav className="lg:col-span-3 space-y-1.5">
                            <p
                                className="text-[9px] font-bold text-muted-foreground uppercase tracking-[0.25em] mb-4 px-1"
                                style={{ fontFamily: "'Syne', sans-serif" }}
                            >
                                Categories
                            </p>
                            {TABS.map(({ key, label, shortDesc, Icon, accent }) => {
                                const isActive = activeTab === key;
                                const tabItems: string[] = (disease as any)[key] || [];
                                return (
                                    <button
                                        key={key}
                                        onClick={() => setActiveTab(key as TabKey)}
                                        className={cn(
                                            "w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 text-left group",
                                            isActive
                                                ? "bg-card border border-border/70 shadow-sm"
                                                : "hover:bg-card/50 border border-transparent"
                                        )}
                                    >
                                        <div
                                            className="w-0.5 h-6 rounded-full flex-shrink-0 transition-all duration-300"
                                            style={{ background: isActive ? accent : "transparent" }}
                                        />
                                        <div
                                            className="h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
                                            style={{ background: isActive ? `${accent}15` : "hsl(var(--muted)/0.6)" }}
                                        >
                                            <Icon className="h-4 w-4 transition-colors" style={{ color: isActive ? accent : undefined }} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold leading-none transition-colors" style={{ color: isActive ? accent : undefined, fontFamily: "'Syne', sans-serif" }}>
                                                {label}
                                            </p>
                                            <p className="text-[10px] text-muted-foreground mt-1 truncate">{shortDesc}</p>
                                        </div>
                                        <span
                                            className="text-[10px] font-bold px-1.5 py-0.5 rounded-md flex-shrink-0"
                                            style={{ background: isActive ? `${accent}15` : "hsl(var(--muted))", color: isActive ? accent : "hsl(var(--muted-foreground))" }}
                                        >
                                            {tabItems.length}
                                        </span>
                                    </button>
                                );
                            })}
                        </nav>
                        {/* Content Panel */}
                        <div className="lg:col-span-9 space-y-4">
                            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-2xl flex items-center justify-center" style={{ background: `${activeTabData.accent}15` }}>
                                        <activeTabData.Icon className="h-5 w-5" style={{ color: activeTabData.accent }} />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-foreground leading-none" style={{ fontFamily: "'Syne', sans-serif", color: activeTabData.accent }}>
                                            {activeTabData.label}
                                        </h2>
                                        <p className="text-[11px] text-muted-foreground mt-0.5">{activeTabData.shortDesc}</p>
                                    </div>
                                </div>
                                <div className="relative w-full sm:w-56">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                        placeholder={`Search ${activeTabData.label.toLowerCase()}…`}
                                        className="w-full pl-9 pr-4 py-2.5 text-[12px] bg-muted/40 border border-border/60 rounded-xl outline-none focus:border-border focus:bg-background transition-all placeholder:text-muted-foreground/50"
                                        style={{ fontFamily: "'Syne', sans-serif" }}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {insightsLoading ? (
                                    Array(4).fill(0).map((_, i) => (
                                        <div key={i} className="rounded-2xl border border-border/40 bg-card p-5 animate-pulse space-y-3">
                                            <div className="h-3 bg-muted rounded-full w-24" />
                                            <div className="h-4 bg-muted rounded-full w-full" />
                                            <div className="h-4 bg-muted rounded-full w-3/4" />
                                        </div>
                                    ))
                                ) : filteredItems.length > 0 ? (
                                    filteredItems.map((text, idx) => {
                                        const nk = noteKey(idx);
                                        const isCopied = copiedIdx === nk;
                                        const isBookmarked = bookmarks.has(nk);
                                        return (
                                            <div key={idx} className={cn("group relative rounded-2xl border bg-card transition-all duration-200 hover:shadow-sm", isBookmarked ? "border-amber-400/40" : "border-border/50")} style={{ borderLeftColor: activeTabData.accent, borderLeftWidth: "2px" }}>
                                                <div className="absolute -top-2.5 -left-2.5 h-6 w-6 rounded-lg text-[10px] font-black flex items-center justify-center shadow-sm border-2 border-background" style={{ background: activeTabData.accent, color: "#fff" }}>
                                                    {idx + 1}
                                                </div>
                                                <div className="p-5 pt-5 space-y-3">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-[9px] font-bold uppercase tracking-[0.18em]" style={{ color: activeTabData.accent }}>
                                                            {activeTabData.label.replace(/s$/, "")} Point
                                                        </span>
                                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <ActionBtn onClick={() => copyItem(text, nk)} title="Copy" active={isCopied} activeColor="#059669">
                                                                {isCopied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                                                            </ActionBtn>
                                                            <ActionBtn onClick={() => toggleBookmark(nk)} title="Bookmark" active={isBookmarked} activeColor="#d97706">
                                                                <span className="h-3 w-3 text-[11px] flex items-center justify-center">{isBookmarked ? "★" : "☆"}</span>
                                                            </ActionBtn>
                                                        </div>
                                                    </div>
                                                    <p className="text-[13px] leading-[1.7] text-foreground/90 transition-all" style={{ fontFamily: "'Lora', Georgia, serif" }}>{text}</p>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="col-span-2 py-16 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/50 bg-muted/10">
                                        {searchQuery ? (
                                            <>
                                                <Search className="h-8 w-8 text-muted-foreground/30 mb-3" />
                                                <p className="text-sm font-semibold text-muted-foreground">No matches for "{searchQuery}"</p>
                                                <button onClick={() => setSearchQuery("")} className="mt-2 text-[11px] font-bold text-primary hover:underline">Clear search</button>
                                            </>
                                        ) : (
                                            <>
                                                <Stethoscope className="h-10 w-10 text-muted-foreground/25 mb-3" />
                                                <p className="text-sm text-muted-foreground italic" style={{ fontFamily: "'Lora', serif" }}>No {activeTab} data available for this condition.</p>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* ── Footer Cards ─────────────────────────────────── */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                        <FooterCard icon={<FlaskConical className="h-4 w-4" />} color="#7c3aed" title="Scientific Verification" body="Matched against TomatoGuard Agricultural Disease Database 2026." />
                        <FooterCard icon={<CheckCircle2 className="h-4 w-4" />} color="#059669" title="Targeted Guidance" body={<>Steps filtered specifically for <strong>{disease.displayName}</strong>.</>} />
                        <FooterCard icon={<CircleAlert className="h-4 w-4" />} color="#78716c" title="Consult an Expert" body="AI guidance only. Always verify with a certified agricultural specialist." italic />
                    </div>
                </>
            )}
        </div>
    );
}

// ─── Sub-Components ───────────────────────────────────────────────────────────

function ActionBtn({
    children, onClick, title, active = false, activeColor,
}: {
    children: React.ReactNode;
    onClick: () => void;
    title: string;
    active?: boolean;
    activeColor?: string;
}) {
    return (
        <button
            onClick={onClick}
            title={title}
            className="h-7 w-7 rounded-lg bg-muted/60 flex items-center justify-center hover:bg-muted transition-colors"
            style={active && activeColor ? { color: activeColor } : {}}
        >
            {children}
        </button>
    );
}

function FooterCard({
    icon, color, title, body, italic,
}: {
    icon: React.ReactNode;
    color: string;
    title: string;
    body: React.ReactNode;
    italic?: boolean;
}) {
    return (
        <div className="p-5 rounded-2xl border border-border/40 bg-card hover:shadow-sm transition-shadow space-y-3">
            <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-xl flex items-center justify-center" style={{ background: `${color}15`, color }}>
                    {icon}
                </div>
                <h4 className="text-sm font-bold text-foreground" style={{ fontFamily: "'Syne', sans-serif" }}>{title}</h4>
            </div>
            <p className={cn("text-[11px] leading-[1.65] text-muted-foreground", italic && "italic")} style={{ fontFamily: "'Lora', serif" }}>{body}</p>
        </div>
    );
}
