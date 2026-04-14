import React from "react";
import { getMarkdownContent } from "@/lib/markdown";
import ReactMarkdown from "react-markdown";
import {
    AlertCircle,
    Target,
    Zap,
    ShieldCheck,
    Microscope,
    Lightbulb,
    CheckCircle,
    ChevronRight,
    Search,
    Brain,
    Scale,
    Activity
} from "lucide-react";

export const dynamic = "force-static";

const heroTags = [
    { label: "AI / ML", accent: true },
    { label: "Precision Agriculture", accent: true },
    { label: "Computer Vision", accent: false },
    { label: "XAI", accent: false },
    { label: "Food Security", accent: false },
];

/**
 * Utility to extract title and description from a list item's children.
 * Handles both plain text and bold-title formats (e.g., "**Title**: description")
 */
function parseListItem(children: React.ReactNode) {
    const childrenArray = React.Children.toArray(children);

    // If the list item content is wrapped in a paragraph (common in loose lists)
    let nodes = childrenArray;
    if (childrenArray.length === 1 && (childrenArray[0] as any)?.type === 'p') {
        nodes = React.Children.toArray((childrenArray[0] as any).props.children);
    }

    const firstNode = nodes[0];
    const hasBoldTitle = firstNode && typeof firstNode === 'object' && (firstNode as any).type === 'strong';

    if (hasBoldTitle) {
        const title = (firstNode as any).props.children;
        const desc = nodes.slice(1).map((node: any) => {
            if (typeof node === 'string') return node;
            return node?.props?.children || "";
        }).join("").replace(/^[:\s-]+/, ""); // Remove leading colons, spaces, dashes

        return { title, desc, isFormatted: true };
    }

    // Fallback: entire content as description
    const fullText = nodes.map((node: any) => {
        if (typeof node === 'string') return node;
        return node?.props?.children || "";
    }).join("");

    return { title: "", desc: fullText, isFormatted: false };
}

export default function ProblemPage() {
    const rawContent = getMarkdownContent("problem_statement.md");
    const sections = rawContent.split("---").map(s => s.trim());

    // Extracting content sections (matching the '---' dividers in the markdown file)
    const introSection = sections[0] || "";
    const coreProblemSection = sections[1] || "";
    const technicalChallengesSection = sections[2] || "";
    const limitationsSection = sections[3] || "";
    const problemDefinitionSection = sections[4] || "";
    const keyObjectiveSection = sections[5] || "";

    return (
        <div className="min-h-screen text-[#1A1A14] dark:text-sky-200 transition-colors duration-500 selection:bg-emerald-100 dark:selection:bg-emerald-900/40">
            <div className="max-w-4xl mx-auto px-6 py-16 pb-32">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 mb-12 animate-fade-in opacity-80">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9E9E8A] dark:text-[#606860]">
                        Research
                    </span>
                    <ChevronRight className="w-3 h-3 text-[#9E9E8A]/50" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#3B6D11] dark:text-[#97C459]">
                        Documentation
                    </span>
                </div>

                {/* ── Hero ─────────────────────────────────────────────── */}
                <div className="mb-12 animate-slide-up">
                    <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-emerald-100/50 dark:border-emerald-900/20 mb-8 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Problem Statement
                    </div>

                    <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight mb-8">
                        Tomato Disease{" "}
                        <em className="text-emerald-600 dark:text-emerald-400 not-italic">Detection</em>{" "}
                        Gap
                    </h1>

                    <p className="text-lg text-[#6B6B5A] dark:text-sky-300/80 leading-relaxed max-w-2xl mb-10 font-medium">
                        Global agriculture faces a critical shortage of efficient and accessible diagnostic tools,
                        leaving our fundamental food systems vulnerable to escalating pathological threats.
                    </p>

                    <div className="flex flex-wrap gap-3">
                        {heroTags.map((tag) => (
                            <span
                                key={tag.label}
                                className={
                                    tag.accent
                                        ? "bg-emerald-600 dark:bg-emerald-500 text-white dark:text-black text-[11px] font-bold px-4 py-1.5 rounded-full shadow-lg shadow-emerald-500/10"
                                        : "bg-black/[0.03] dark:bg-white/[0.05] border border-black/5 dark:border-white/5 text-[#444441] dark:text-[#C0C0B0] text-[11px] font-bold px-4 py-1.5 rounded-full backdrop-blur-sm"
                                }
                            >
                                {tag.label}
                            </span>
                        ))}
                    </div>
                </div>

                {/* ── Background ───────────────────────────────────────── */}
                <section className="mb-08">
                    <div className="flex items-center mb-2">
                        <div className="w-8 h-[1px] bg-emerald-500/30" />
                        <h2 className="font-bold uppercase tracking-[0.2em] text-[#3B6D11] dark:text-[#97C459]">
                            Background & Context
                        </h2>
                    </div>
                    <div className="bg-emerald-50/30 dark:bg-white/[0.02] border border-emerald-100/20 dark:border-white/[0.05] rounded-2xl p-6 md:p-4 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                        <div className="relative z-10 prose prose-slate dark:prose-invert max-w-none">
                            <ReactMarkdown
                                components={{
                                    h1: () => null,
                                    h2: () => null,
                                    p: ({ children }) => (
                                        <p className="text-[15px] text-[#555546] dark:text-sky-100/90 leading-[1.78] mb-3 font-medium last:mb-0 text-left md:text-justify">
                                            {children}
                                        </p>
                                    ),
                                    hr: () => null
                                }}
                            >
                                {introSection}
                            </ReactMarkdown>
                        </div>
                    </div>
                </section>

                {/* ── Core Problem Grid ────────────────────────────────── */}
                <section className="mb-10">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-8 h-[1px] bg-emerald-500/30" />
                        <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#3B6D11] dark:text-[#97C459]">
                            Core Challenges & Limitations
                        </h2>
                    </div>
                    <ReactMarkdown
                        components={{
                            h2: () => null,
                            p: ({ children }) => <p className="text-sm text-[#6B6B5A] dark:text-white/70 mb-6 italic">{children}</p>,
                            ul: ({ children }) => (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {children}
                                </div>
                            ),
                            li: ({ children }) => {
                                const { title, desc, isFormatted } = parseListItem(children);
                                return (
                                    <div className="group bg-primary/10 dark:bg-[#111111] border border-black/5 dark:border-white/5 rounded-2xl p-6 transition-all duration-300 hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/5">
                                        <div className="flex items-start gap-4">
                                            <div className="mt-1 w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                                                <AlertCircle size={16} />
                                            </div>
                                            <div>
                                                {isFormatted && (
                                                    <h3 className="text-[14px] font-bold mb-1.5 text-[#1A1A14] dark:text-white">
                                                        {title}
                                                    </h3>
                                                )}
                                                <p className="text-[13px] text-[#6B6B5A] dark:text-sky-300/80 leading-relaxed">
                                                    {desc}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                        }}
                    >
                        {coreProblemSection}
                    </ReactMarkdown>
                </section>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-black/10 dark:via-white/5 to-transparent my-10 shadow-none border-none" />

                {/* ── Technical Challenges ─────────────────────────────── */}
                <section className="mb-10">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-8 h-[1px] bg-emerald-500/30" />
                        <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#3B6D11] dark:text-[#97C459]">
                            Technical Pathological Barriers
                        </h2>
                    </div>
                    <div className="space-y-4">
                        <ReactMarkdown
                            components={{
                                h2: () => null,
                                p: ({ children }) => <p className="text-sm text-[#6B6B5A] dark:text-white/70 mb-6">{children}</p>,
                                ul: ({ children }) => <div className="space-y-3">{children}</div>,
                                li: ({ children }) => {
                                    const { title, desc, isFormatted } = parseListItem(children);
                                    return (
                                        <div className="flex items-center gap-5 p-4 rounded-2xl bg-black/[0.01] dark:bg-white/[0.01] border border-black/5 dark:border-white/5 hover:bg-emerald-50/10 dark:hover:bg-emerald-950/5 transition-colors group">
                                            <div className="w-10 h-10 rounded-full bg-white dark:bg-[#111111] border border-black/5 dark:border-white/5 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm group-hover:rotate-12 transition-transform">
                                                <Brain size={18} />
                                            </div>
                                            <div className="flex-1">
                                                {isFormatted && (
                                                    <span className="text-[13px] font-bold text-[#1A1A14] dark:text-white mr-2">
                                                        {title}:
                                                    </span>
                                                )}
                                                <span className="text-[13px] text-[#6B6B5A] dark:text-white/80">
                                                    {desc}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                }
                            }}
                        >
                            {technicalChallengesSection}
                        </ReactMarkdown>
                    </div>
                </section>

                {/* ── Existing Solutions Limitations ──────────────────── */}
                <section className="mb-10">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-8 h-[1px] bg-emerald-500/30" />
                        <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#3B6D11] dark:text-[#97C459]">
                            Market Gap Analysis
                        </h2>
                    </div>
                    <div className="bg-black dark:bg-[#111111] rounded-[2rem] p-8 md:p-12 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-500/10 to-transparent" />
                        <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
                            <div className="md:w-1/2">
                                <ReactMarkdown
                                    components={{
                                        h2: () => null,
                                        p: ({ children }) => (
                                            <p className="text-lg font-serif italic text-emerald-50/80 leading-relaxed mb-6">
                                                &quot;{children}&quot;
                                            </p>
                                        ),
                                        ul: () => null,
                                        li: () => null
                                    }}
                                >
                                    {limitationsSection}
                                </ReactMarkdown>
                                <div className="flex items-center gap-4 text-emerald-400">
                                    <div className="w-12 h-[1px] bg-emerald-400/50" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Industry Assessment</span>
                                </div>
                            </div>
                            <div className="md:w-1/2 grid grid-cols-1 gap-2">
                                <ReactMarkdown
                                    components={{
                                        h2: () => null,
                                        p: () => null,
                                        ul: ({ children }) => <>{children}</>,
                                        li: ({ children }) => (
                                            <div className="flex items-center gap-3 py-2 px-4 rounded-xl bg-white/5 border border-white/10">
                                                <ShieldCheck size={14} className="text-emerald-500" />
                                                <span className="text-xs font-medium text-emerald-50/70">{children}</span>
                                            </div>
                                        )
                                    }}
                                >
                                    {limitationsSection}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Problem Definition / Needs ─────────────────────── */}
                <section className="mb-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-[1px] bg-emerald-500/30" />
                        <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#3B6D11] dark:text-[#97C459]">
                            Mission Critical Needs
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <ReactMarkdown
                            components={{
                                h2: () => null,
                                p: () => null,
                                ol: ({ children }) => <>{children}</>,
                                li: ({ children, index }: { children?: React.ReactNode, index?: number }) => {
                                    const icons = [<Search key="1" size={24} />, <Brain key="2" size={24} />, <Activity key="3" size={24} />, <CheckCircle key="4" size={24} />, <Scale key="5" size={24} />];
                                    const safeIndex = index || 0;
                                    return (
                                        <div className="relative group">
                                            <div className="h-full dark:bg-[#111111] border border-black/5 dark:border-white/5 rounded-3xl p-8 hover:transform hover:-translate-y-2 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-emerald-500/10">
                                                <div className="text-emerald-600/20 dark:text-emerald-400/10 absolute top-6 right-8 group-hover:text-emerald-500/40 transition-colors">
                                                    {icons[safeIndex % icons.length]}
                                                </div>
                                                <span className="block font-serif text-3xl font-bold text-emerald-600/40 mb-4 italic">0{safeIndex + 1}</span>
                                                <p className="text-[14px] font-bold text-[#1A1A14] dark:text-sky-200 leading-snug">
                                                    {children}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                }
                            }}
                        >
                            {problemDefinitionSection}
                        </ReactMarkdown>
                    </div>
                </section>

                {/* ── Final Objective Banner ──────────────────────────── */}
                <div className="relative rounded-[2.5rem] bg-emerald-600 dark:bg-emerald-500 p-10 md:p-14 text-white overflow-hidden shadow-2xl shadow-emerald-500/20 group">
                    <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/10 blur-[100px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
                    <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-black/10 blur-[100px] rounded-full" />

                    <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 shadow-inner group-hover:rotate-12 transition-transform duration-500">
                            <Target size={32} className="text-white" />
                        </div>
                        <h3 className="font-serif text-2xl md:text-3xl font-bold mb-6">
                            Key Strategic Objective
                        </h3>
                        <div className="prose prose-invert prose-emerald max-w-none">
                            <ReactMarkdown
                                components={{
                                    h2: () => null,
                                    p: ({ children }) => (
                                        <p className="text-lg md:text-xl font-medium leading-relaxed opacity-90">
                                            {children}
                                        </p>
                                    ),
                                    strong: ({ children }) => <span className="text-white font-black underline underline-offset-8 decoration-white/30">{children}</span>
                                }}
                            >
                                {keyObjectiveSection}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}