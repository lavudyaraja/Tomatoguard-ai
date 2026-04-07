"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
    CheckCircle, AlertOctagon, HelpCircle,
    Thermometer, ShieldCheckIcon, ChevronDown, ChevronUp,
    Stethoscope, Bug, FlaskConical, ShieldCheck,
} from "lucide-react";
import { DiseaseInfo } from "@/lib/types";
import { cn } from "@/lib/utils";

interface DiseaseDetailProps {
    disease: DiseaseInfo;
    defaultTab?: string;
}

const TABS = [
    { key: "symptoms", label: "Symptoms", Icon: AlertOctagon, color: "var(--destructive)", bg: "oklch(var(--destructive) / 0.1)", border: "oklch(var(--destructive) / 0.2)" },
    { key: "causes", label: "Causes", Icon: HelpCircle, color: "#3b82f6", bg: "rgba(59, 130, 246, 0.1)", border: "rgba(59, 130, 246, 0.2)" },
    { key: "treatments", label: "Treatment", Icon: Thermometer, color: "var(--primary)", bg: "oklch(var(--primary) / 0.1)", border: "oklch(var(--primary) / 0.2)" },
    { key: "prevention", label: "Prevention", Icon: ShieldCheckIcon, color: "#10b981", bg: "rgba(16, 185, 129, 0.1)", border: "rgba(16, 185, 129, 0.2)" },
] as const;

export function DiseaseDetail({ disease, defaultTab }: DiseaseDetailProps) {
    const [activeTab, setActiveTab] = useState<string>(defaultTab ?? "symptoms");
    const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

    const activeTabData = TABS.find(t => t.key === activeTab)!;
    const items: string[] = (disease as any)[activeTab] ?? [];

    return (
        <div className="w-full py-8 space-y-6">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Fraunces:opsz,wght@9..144,600&display=swap');
                .detail-font { font-family: 'Fraunces', serif; }
                .detail-body { font-family: 'DM Sans', sans-serif; }

                .tab-btn {
                    transition: background 0.18s, color 0.18s, border-color 0.18s;
                }
                .item-card {
                    transition: background 0.15s;
                }
                .expand-btn {
                    transition: background 0.15s;
                }
            `}</style>

            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground detail-font">
                        Management Guide
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1 detail-body">
                        Agricultural protocols for <span className="font-medium text-foreground">{disease.displayName}</span>
                    </p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted border border-border rounded-full text-[11px] text-muted-foreground font-medium">
                    <Stethoscope style={{ height: 12, width: 12 }} />
                    <span>{items.length} {activeTab}</span>
                </div>
            </div>

            {/* Tab strip */}
            <div className="flex gap-2 flex-wrap">
                {TABS.map(({ key, label, Icon, color, bg, border }) => {
                    const isActive = activeTab === key;
                    return (
                        <button
                            key={key}
                            onClick={() => { setActiveTab(key); setExpandedIdx(null); }}
                            className={cn(
                                "tab-btn flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border",
                                isActive
                                    ? "text-primary-foreground border-transparent outline-none"
                                    : "bg-card text-muted-foreground border-border hover:border-muted-foreground/60"
                            )}
                            style={isActive ? { backgroundColor: color, borderColor: color } : {}}
                        >
                            <Icon style={{ height: 13, width: 13 }} />
                            {label}
                            <span className={cn(
                                "text-[10px] rounded-full px-1.5 py-0.5 font-semibold",
                                isActive ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                            )}>
                                {(disease as any)[key]?.length ?? 0}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Content grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 detail-body">
                {items.map((text, idx) => {
                    const isExpanded = expandedIdx === idx;
                    const isLong = text.length > 90;
                    const displayText = isLong && !isExpanded ? text.slice(0, 88) + "…" : text;

                    return (
                        <div
                            key={idx}
                            className="item-card bg-card border border-border rounded-xl p-4 flex items-start gap-3 group"
                            style={{
                                borderLeftColor: activeTabData.color,
                                borderLeftWidth: 3,
                            }}
                        >
                            <div
                                className="mt-0.5 h-6 w-6 rounded-md flex items-center justify-center flex-shrink-0"
                                style={{ backgroundColor: activeTabData.bg }}
                            >
                                <activeTabData.Icon
                                    style={{ height: 13, width: 13, color: activeTabData.color }}
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-foreground leading-relaxed transition-opacity dark:text-foreground/90">{displayText}</p>
                                {isLong && (
                                    <button
                                        onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                                        className="expand-btn mt-1.5 text-[11px] font-semibold flex items-center gap-0.5 rounded px-1 -ml-1 hover:bg-muted"
                                        style={{ color: activeTabData.color }}
                                    >
                                        {isExpanded ? (
                                            <><ChevronUp style={{ height: 12, width: 12 }} /> Show less</>
                                        ) : (
                                            <><ChevronDown style={{ height: 12, width: 12 }} /> Read more</>
                                        )}
                                    </button>
                                )}
                            </div>
                            <span
                                className="flex-shrink-0 text-[11px] font-bold tabular-nums text-muted-foreground/30 mt-0.5 select-none"
                                aria-hidden
                            >
                                {String(idx + 1).padStart(2, "0")}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Summary strip */}
            <SummaryStrip disease={disease} />

            {/* Disclaimer */}
            <p className="text-[11px] text-[#AAAAAA] text-center leading-relaxed px-4 pt-2 detail-body">
                This AI analysis is for guidance only. Always cross-reference with a certified agricultural advisor or extension specialist before applying treatments or pesticides.
            </p>
        </div>
    );
}

function SummaryStrip({ disease }: { disease: DiseaseInfo }) {
    const stats = [
        { icon: AlertOctagon, label: "Symptoms", value: disease.symptoms.length, color: "#dc2626" },
        { icon: HelpCircle, label: "Causes", value: disease.causes.length, color: "#2563eb" },
        { icon: Thermometer, label: "Treatments", value: disease.treatments.length, color: "#1A3A2A" },
        { icon: ShieldCheckIcon, label: "Prevention steps", value: disease.prevention.length, color: "#16a34a" },
    ];

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {stats.map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="bg-card border border-border rounded-xl p-4 text-center transition-colors">
                    <Icon style={{ height: 18, width: 18, color, margin: "0 auto 8px" }} />
                    <p className="text-xl font-bold text-foreground tabular-nums" style={{ fontFamily: "'DM Sans', sans-serif" }}>{value}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{label}</p>
                </div>
            ))}
        </div>
    );
}