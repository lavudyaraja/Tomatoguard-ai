import React from "react";
import { getMarkdownContent } from "@/lib/markdown";
import ReactMarkdown from "react-markdown";
import {
    Layers,
    ChevronRight,
    Search,
    Brain,
    Database,
    Crosshair
} from "lucide-react";

export const dynamic = "force-static";

const FEATURE_ICONS: Record<string, React.ReactNode> = {
    "1. Dual-Ensemble Classification": <Brain size={24} />,
    "2. Forensic Cross-Viewer": <Search size={24} />,
    "3. Patient History Archive": <Database size={24} />,
    "4. Interactive Pathology Hotspots": <Crosshair size={24} />,
};

export default function FeaturesPage() {
    const rawContent = getMarkdownContent("features.md");
    const sections = rawContent.split("###").map(s => s.trim()).filter(s => s && !s.startsWith("#"));

    return (
        <div className="min-h-screen text-[#1A1A14] dark:text-[#EAE8DF] transition-colors duration-500 selection:bg-emerald-100 dark:selection:bg-emerald-900/40 pb-24">
            <div className="max-w-4xl mx-auto px-6 py-12">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 mb-10 animate-fade-in opacity-80">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9E9E8A] dark:text-[#606860]">
                        Capabilities
                    </span>
                    <ChevronRight className="w-3 h-3 text-[#9E9E8A]/50" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#3B6D11] dark:text-[#97C459]">
                        Core Features
                    </span>
                </div>

                {/* ── Hero ─────────────────────────────────────────────── */}
                <div className="mb-14 animate-slide-up">
                    <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-emerald-100/50 dark:border-emerald-900/20 mb-6 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Feature Ecosystem
                    </div>

                    <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight mb-8">
                        Analytical <em className="text-emerald-600 dark:text-emerald-400 not-italic">Precision</em>
                    </h1>

                    <p className="text-xl text-[#555546] dark:text-[#A0A898] leading-relaxed max-w-2xl font-medium">
                        TomatoGuard AI integrates a suite of advanced features designed to provide both high-accuracy classification and deep forensic interpretability.
                    </p>
                </div>

                {/* ── Features List ────────────────────────────────────── */}
                <div className="space-y-6">
                    {sections.map((section) => {
                        const lines = section.split("\n").map(l => l.trim()).filter(Boolean);
                        const title = lines[0];
                        const desc = lines.slice(1).join(" ");
                        const icon = FEATURE_ICONS[title] || <Layers size={24} />;

                        return (
                            <div key={title} className="group bg-white dark:bg-[#161A15] border border-black/5 dark:border-white/5 rounded-3xl p-8 hover:shadow-xl transition-all duration-500 hover:border-emerald-500/30 flex flex-col md:flex-row gap-8 items-start">
                                <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-900/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-inner">
                                    {icon}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold tracking-tight mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                        {title.replace(/^\d+\.\s*/, "")}
                                    </h3>
                                    <p className="text-[16px] text-[#6B6B5A] dark:text-[#9EA899] leading-relaxed font-medium">
                                        {desc}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* ── Integration Banner ────────────────────────────────── */}
                <div className="mt-16 p-10 rounded-[2.5rem] bg-[#1A1A14] text-white relative overflow-hidden text-center">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-emerald-500/10 to-transparent" />
                    <div className="relative z-10">
                        <h4 className="font-serif text-2xl font-bold mb-4 italic">Experience the Forensic Audit</h4>
                        <p className="opacity-70 max-w-lg mx-auto mb-8 text-sm">
                            Our feature set is designed for transparency. We believe you should never have to take the AI's word for it—you should see the proof.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
