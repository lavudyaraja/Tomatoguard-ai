import React from "react";
import { getMarkdownContent } from "@/lib/markdown";
import ReactMarkdown from "react-markdown";
import {
    Rocket,
    ChevronRight,
    Wifi,
    Trees,
    Smartphone,
    Map
} from "lucide-react";

export const dynamic = "force-static";

const FUTURE_ICONS: Record<string, React.ReactNode> = {
    "1. IoT Sensor Integration": <Wifi size={24} />,
    "2. Multi-Crop Support": <Trees size={24} />,
    "3. Edge Inference Mobile App": <Smartphone size={24} />,
    "4. Community Disease Tracking": <Map size={24} />,
};

export default function FutureRoadmapPage() {
    const rawContent = getMarkdownContent("future_scope.md");
    const sections = rawContent.split("###").map(s => s.trim()).filter(s => s && !s.startsWith("#"));

    return (
        <div className="min-h-screen text-[#1A1A14] dark:text-[#EAE8DF] transition-colors duration-500 selection:bg-emerald-100 dark:selection:bg-emerald-900/40 pb-24">
            <div className="max-w-4xl mx-auto px-6 py-12">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 mb-10 animate-fade-in opacity-80">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9E9E8A] dark:text-[#606860]">
                        Strategic
                    </span>
                    <ChevronRight className="w-3 h-3 text-[#9E9E8A]/50" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#3B6D11] dark:text-[#97C459]">
                        Future Roadmap
                    </span>
                </div>

                {/* ── Hero ─────────────────────────────────────────────── */}
                <div className="mb-14 animate-slide-up">
                    <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-emerald-100/50 dark:border-emerald-900/20 mb-6 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Vision 2026
                    </div>

                    <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight mb-8">
                        The Road <em className="text-emerald-600 dark:text-emerald-400 not-italic">Ahead</em>
                    </h1>

                    <p className="text-xl text-[#555546] dark:text-[#A0A898] leading-relaxed max-w-2xl font-medium">
                        Our developmental horizon includes deeper hardware integration, expanded horticultural support, and collective intelligence systems.
                    </p>
                </div>

                {/* ── Roadmap List ────────────────────────────────────── */}
                <div className="relative border-l border-black/5 dark:border-white/5 ml-6 space-y-12 pb-12">
                    {sections.map((section) => {
                        const lines = section.split("\n").map(l => l.trim()).filter(Boolean);
                        const title = lines[0];
                        const desc = lines.slice(1).join(" ");
                        const icon = FUTURE_ICONS[title] || <Rocket size={24} />;

                        return (
                            <div key={title} className="relative pl-12 group">
                                <div className="absolute left-[-21px] top-0 w-10 h-10 rounded-2xl bg-white dark:bg-[#111111] border border-black/10 dark:border-white/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 z-10 shadow-sm">
                                    {icon}
                                </div>
                                <div className="bg-white/50 dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-[2.5rem] p-8 group-hover:bg-white dark:group-hover:bg-white/[0.04] transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-emerald-500/5">
                                    <h3 className="text-2xl font-bold tracking-tight mb-3">
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

                {/* ── Conclusion ───────────────────────────────────────── */}
                <div className="mt-8 p-12 rounded-[3.5rem] bg-emerald-600 dark:bg-emerald-500 text-white text-center shadow-2xl shadow-emerald-500/20">
                    <Rocket size={48} className="mx-auto mb-8 animate-bounce" />
                    <h3 className="font-serif text-3xl font-bold mb-4 italic">Deploying Intelligence Everywhere</h3>
                    <p className="opacity-90 max-w-xl mx-auto font-medium">
                        TomatoGuard AI is just the beginning. We're creating a global network of biological intelligence to protect our most vital crops.
                    </p>
                </div>

            </div>
        </div>
    );
}
