import React from "react";
import { getMarkdownContent } from "@/lib/markdown";
import ReactMarkdown from "react-markdown";
import {
    Leaf,
    ChevronRight,
    Home,
    Search,
    GraduationCap,
    ArrowRight,
    Users
} from "lucide-react";

export const dynamic = "force-static";

const USECASE_ICONS: Record<string, React.ReactNode> = {
    "1. Smallholder Farmers": <Home size={24} />,
    "2. Greenhouse Management": <Leaf size={24} />,
    "3. Agricultural Researchers": <Search size={24} />,
    "4. Educational Tool": <GraduationCap size={24} />,
};

export default function UseCasesPage() {
    const rawContent = getMarkdownContent("use_cases.md");
    const sections = rawContent.split("###").map(s => s.trim()).filter(s => s && !s.startsWith("#"));

    return (
        <div className="min-h-screen text-[#1A1A14] dark:text-[#EAE8DF] transition-colors duration-500 selection:bg-emerald-100 dark:selection:bg-emerald-900/40 pb-24">
            <div className="max-w-4xl mx-auto px-6 py-12">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 mb-10 animate-fade-in opacity-80">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9E9E8A] dark:text-[#606860]">
                        Impact
                    </span>
                    <ChevronRight className="w-3 h-3 text-[#9E9E8A]/50" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#3B6D11] dark:text-[#97C459]">
                        Use Cases
                    </span>
                </div>

                {/* ── Hero ─────────────────────────────────────────────── */}
                <div className="mb-14 animate-slide-up">
                    <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-emerald-100/50 dark:border-emerald-900/20 mb-6 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Platform Utility
                    </div>

                    <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight mb-8">
                        Real-World <em className="text-emerald-600 dark:text-emerald-400 not-italic">Applications</em>
                    </h1>

                    <p className="text-xl text-[#555546] dark:text-[#A0A898] leading-relaxed max-w-2xl font-medium">
                        TomatoGuard AI goes beyond the laboratory, providing value across the entire agricultural value chain.
                    </p>
                </div>

                {/* ── Use Cases List ───────────────────────────────────── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {sections.map((section) => {
                        const lines = section.split("\n").map(l => l.trim()).filter(Boolean);
                        const title = lines[0];
                        const desc = lines.slice(1).join(" ");
                        const icon = USECASE_ICONS[title] || <Users size={24} />;

                        return (
                            <div key={title} className="group bg-white dark:bg-[#161A15] border border-black/5 dark:border-white/5 rounded-3xl p-8 hover:shadow-xl transition-all duration-500 hover:border-emerald-500/30 flex flex-col justify-between">
                                <div>
                                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-900/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-inner">
                                        {icon}
                                    </div>
                                    <h3 className="text-xl font-bold tracking-tight mb-3">
                                        {title.replace(/^\d+\.\s*/, "")}
                                    </h3>
                                    <p className="text-[14px] text-[#6B6B5A] dark:text-[#9EA899] leading-relaxed font-medium mb-6">
                                        {desc}
                                    </p>
                                </div>
                                <div className="pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-emerald-600 dark:text-emerald-400">
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Stakeholder Benefit</span>
                                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}
