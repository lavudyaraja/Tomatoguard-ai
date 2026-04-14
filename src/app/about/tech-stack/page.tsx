import React from "react";
import { getMarkdownContent } from "@/lib/markdown";
import ReactMarkdown from "react-markdown";
import {
    Cpu,
    ChevronRight,
    Terminal,
    Database,
    Cloud,
    Code2,
    Settings,
    Layout,
    Box
} from "lucide-react";

export const dynamic = "force-static";

const STACK_ICONS: Record<string, React.ReactNode> = {
    "Core Frameworks": <Layout size={24} />,
    "AI & Machine Learning": <Cpu size={24} />,
    "Infrastructure": <Cloud size={24} />,
};

export default function TechStackPage() {
    const rawContent = getMarkdownContent("tech_stack.md");
    const sections = rawContent.split("###").map(s => s.trim()).filter(s => s && !s.startsWith("#"));

    return (
        <div className="min-h-screen text-[#1A1A14] dark:text-[#EAE8DF] transition-colors duration-500 selection:bg-emerald-100 dark:selection:bg-emerald-900/40 pb-24">
            <div className="max-w-4xl mx-auto px-6 py-12">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 mb-10 animate-fade-in opacity-80">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9E9E8A] dark:text-[#606860]">
                        Architecture
                    </span>
                    <ChevronRight className="w-3 h-3 text-[#9E9E8A]/50" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#3B6D11] dark:text-[#97C459]">
                        Tech Stack
                    </span>
                </div>

                {/* ── Hero ─────────────────────────────────────────────── */}
                <div className="mb-14 animate-slide-up">
                    <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-emerald-100/50 dark:border-emerald-900/20 mb-6 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        System Components
                    </div>

                    <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight mb-8">
                        The <em className="text-emerald-600 dark:text-emerald-400 not-italic">Diagnostic</em> Engine
                    </h1>

                    <p className="text-xl text-[#555546] dark:text-[#A0A898] leading-relaxed max-w-2xl font-medium">
                        TomatoGuard AI is built on a high-performance stack that prioritizes speed, accuracy, and horizontal scalability.
                    </p>
                </div>

                {/* ── Tech List ───────────────────────────────────────── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {sections.map((section) => {
                        const lines = section.split("\n").map(l => l.trim()).filter(Boolean);
                        const title = lines[0];
                        const icon = STACK_ICONS[title] || <Settings size={24} />;

                        return (
                            <div key={title} className="group bg-white dark:bg-[#161A15] border border-black/5 dark:border-white/5 rounded-3xl p-10 hover:shadow-2xl transition-all duration-500 hover:border-emerald-500/30">
                                <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-900/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-8 group-hover:scale-110 transition-transform duration-500">
                                    {icon}
                                </div>
                                <h3 className="text-xl font-bold mb-6 tracking-tight">{title}</h3>
                                <div className="space-y-4">
                                    {lines.slice(1).map((line) => {
                                        const cleanLine = line.replace(/^\s*-\s*/, "");
                                        const [label, ...valueParts] = cleanLine.split(":");
                                        const value = valueParts.join(":").trim();

                                        return (
                                            <div key={label} className="flex flex-col">
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#9E9E8A] dark:text-[#606860] mb-1">{label}</span>
                                                <span className="text-sm font-semibold text-[#1A1A14] dark:text-[#EAE8DF]">{value}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* ── Bottom Callout ───────────────────────────────────── */}
                <div className="mt-16 bg-[#F5F3EE] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-[2rem] p-8 flex items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white dark:bg-[#111111] rounded-xl flex items-center justify-center text-emerald-600 border border-black/5">
                            <Code2 size={24} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-[#9E9E8A] uppercase tracking-widest leading-none mb-1">Open Standards</p>
                            <p className="text-sm font-bold">API-First Design Architecture</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
