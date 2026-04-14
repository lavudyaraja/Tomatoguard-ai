import React from "react";
import { getMarkdownContent } from "@/lib/markdown";
import ReactMarkdown from "react-markdown";
import {
    Info,
    Zap,
    ShieldCheck,
    Leaf,
    ChevronRight,
    Search,
    Brain,
    Globe,
    Cpu
} from "lucide-react";

export const dynamic = "force-static";

const stats = [
    { label: "Accuracy", value: "99.32%", icon: <Zap className="w-4 h-4" /> },
    { label: "Diseases", value: "11", icon: <ShieldCheck className="w-4 h-4" /> },
    { label: "Processing", value: "< 3s", icon: <Cpu className="w-4 h-4" /> },
    { label: "Security", value: "Neon DB", icon: <Globe className="w-4 h-4" /> },
];

export default function AboutOverviewPage() {
    const rawContent = getMarkdownContent("overview.md");

    return (
        <div className="min-h-screen text-[#1A1A14] dark:text-[#EAE8DF] transition-colors duration-500 selection:bg-emerald-100 dark:selection:bg-emerald-900/40 pb-24">
            <div className="max-w-4xl mx-auto px-6 py-12">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 mb-10 animate-fade-in opacity-80">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9E9E8A] dark:text-[#606860]">
                        Documentation
                    </span>
                    <ChevronRight className="w-3 h-3 text-[#9E9E8A]/50" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#3B6D11] dark:text-[#97C459]">
                        Overview
                    </span>
                </div>

                {/* ── Hero ─────────────────────────────────────────────── */}
                <div className="mb-14 animate-slide-up">
                    <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-emerald-100/50 dark:border-emerald-900/20 mb-6 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Project Overview
                    </div>

                    <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight mb-8">
                        The Future of{" "}
                        <em className="text-emerald-600 dark:text-emerald-400 not-italic">Plant Health</em>
                    </h1>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                        {stats.map((stat) => (
                            <div key={stat.label} className="bg-white/50 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 rounded-2xl p-4 flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-emerald-100/50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400">
                                    {stat.icon}
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold tracking-wider text-[#9E9E8A] dark:text-[#606860] leading-none mb-1">{stat.label}</p>
                                    <p className="text-sm font-bold leading-none">{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Main Content ────────────────────────────────────── */}
                <article className="prose prose-slate dark:prose-invert max-w-none">
                    <div className="bg-white/30 dark:bg-white/[0.01] border border-black/5 dark:border-white/5 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />

                        <ReactMarkdown
                            components={{
                                h1: () => null,
                                h2: ({ children }) => (
                                    <h2 className="font-serif text-3xl font-bold mb-8 text-[#1A1A14] dark:text-white flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-2xl bg-emerald-600 dark:bg-emerald-500 flex items-center justify-center text-white scale-90">
                                            <Info size={20} />
                                        </div>
                                        {children}
                                    </h2>
                                ),
                                p: ({ children }) => (
                                    <p className="text-[16px] text-[#555546] dark:text-[#A0A898] leading-[1.8] mb-6 last:mb-0 text-left md:text-justify font-medium">
                                        {children}
                                    </p>
                                ),
                            }}
                        >
                            {rawContent}
                        </ReactMarkdown>
                    </div>
                </article>

                {/* ── Mission Callout ──────────────────────────────────── */}
                <div className="mt-12 bg-emerald-600 dark:bg-emerald-500 rounded-[2rem] p-8 md:p-10 text-white flex flex-col md:flex-row items-center gap-8 shadow-xl shadow-emerald-500/10 group">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center rotate-3 group-hover:rotate-12 transition-transform duration-500 shrink-0">
                        <Leaf size={32} />
                    </div>
                    <div className="text-center md:text-left">
                        <h4 className="font-serif text-xl font-bold mb-2">Our Mission</h4>
                        <p className="opacity-90 leading-relaxed text-sm max-w-xl">
                            Bridging the gap between cutting-edge computer vision and the dirt-under-the-fingernails reality of tomato farming to ensure global food security.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
