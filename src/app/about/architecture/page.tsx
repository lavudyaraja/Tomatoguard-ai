import React from "react";
import { getMarkdownContent } from "@/lib/markdown";
import ReactMarkdown from "react-markdown";
import {
    Layers,
    Database,
    Cpu,
    Layout,
    Lightbulb,
    ChevronRight,
    Server,
    Network,
    Code,
    Search,
    Brain
} from "lucide-react";

export const dynamic = "force-static";

const LAYER_ICONS: Record<string, React.ReactNode> = {
    "Frontend": <Layout size={20} />,
    "Inference Backend": <Server size={20} />,
    "Explainer Module": <Search size={20} />,
    "Insight Layer": <Brain size={20} />,
    "Persistence Layer": <Database size={20} />,
};

function parseArchitectureItem(children: React.ReactNode) {
    const childrenArray = React.Children.toArray(children);
    let nodes = childrenArray;
    if (childrenArray.length === 1 && (childrenArray[0] as any)?.type === 'p') {
        nodes = React.Children.toArray((childrenArray[0] as any).props.children);
    }

    const firstNode = nodes[0];
    const hasBoldTitle = firstNode && typeof firstNode === 'object' && (firstNode as any).type === 'strong';

    if (hasBoldTitle) {
        const titleRaw = (firstNode as any).props.children.toString();
        const title = titleRaw.split('(')[0].trim();
        const desc = nodes.slice(1).map((node: any) => {
            if (typeof node === 'string') return node;
            return node?.props?.children || "";
        }).join("").replace(/^[:\s-]+/, "");

        return { title, desc };
    }

    return { title: "Component", desc: nodes.map((n: any) => typeof n === 'string' ? n : (n?.props?.children || "")).join("") };
}

export default function ArchitecturePage() {
    const rawContent = getMarkdownContent("architecture.md");
    const sections = rawContent.split("### Layer Breakdown:").map(s => s.trim());
    const intro = sections[0] || "";
    const layers = sections[1] || "";

    return (
        <div className="min-h-screen text-[#1A1A14] dark:text-[white] transition-colors duration-500 selection:bg-emerald-100 dark:selection:bg-emerald-900/40 pb-24">
            <div className="max-w-4xl mx-auto px-6 py-12">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 mb-10 animate-fade-in opacity-80">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9E9E8A] dark:text-[#606860]">
                        Technical
                    </span>
                    <ChevronRight className="w-3 h-3 text-[#9E9E8A]/50" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#3B6D11] dark:text-[#97C459]">
                        System Architecture
                    </span>
                </div>

                {/* ── Hero ─────────────────────────────────────────────── */}
                <div className="mb-14 animate-slide-up">
                    <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-emerald-100/50 dark:border-emerald-900/20 mb-6 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Infrastructure
                    </div>

                    <ReactMarkdown
                        components={{
                            h1: ({ children }) => (
                                <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight mb-8">
                                    {children}
                                </h1>
                            ),
                            p: ({ children }) => (
                                <p className="text-xl text-[#555546] dark:text-[#A0A898] leading-relaxed max-w-2xl font-medium">
                                    {children}
                                </p>
                            )
                        }}
                    >
                        {intro}
                    </ReactMarkdown>
                </div>

                {/* ── Layer Path ───────────────────────────────────────── */}
                <div className="relative space-y-6">
                    <div className="absolute left-[31px] top-10 bottom-10 w-[2px] bg-gradient-to-b from-emerald-500/50 via-emerald-500/20 to-transparent hidden md:block" />

                    <ReactMarkdown
                        components={{
                            ol: ({ children }) => <>{children}</>,
                            li: ({ children, index }: { children?: React.ReactNode, index?: number }) => {
                                const { title, desc } = parseArchitectureItem(children);
                                const icon = LAYER_ICONS[title] || <Code size={20} />;

                                return (
                                    <div className="relative pl-0 md:pl-20 group">
                                        <div className="absolute left-[18px] top-6 w-7 h-7 bg-emerald-600 dark:bg-emerald-500 rounded-full border-4 border-white dark:border-[#111510] z-10 hidden md:flex items-center justify-center text-white text-[10px] font-bold">
                                            {(index || 0) + 1}
                                        </div>

                                        <div className="bg-white dark:bg-[#161A15] border border-black/5 dark:border-white/5 rounded-3xl p-8 hover:shadow-xl transition-all duration-500 group-hover:border-emerald-500/30">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                                    {icon}
                                                </div>
                                                <h3 className="text-lg font-bold tracking-tight">{title}</h3>
                                            </div>
                                            <p className="text-[15px] text-[#6B6B5A] dark:text-[#9EA899] leading-[1.6] font-medium">
                                                {desc}
                                            </p>
                                        </div>
                                    </div>
                                );
                            }
                        }}
                    >
                        {layers}
                    </ReactMarkdown>
                </div>

                {/* ── Tech Stack Banner ────────────────────────────────── */}
                <div className="mt-20 p-8 rounded-[2.5rem] bg-gradient-to-br from-[#FAFAFA] to-[#F1F3EE] dark:from-[#1A1E18] dark:to-[#111510] border border-black/5 dark:border-white/5 flex flex-wrap items-center justify-center gap-8 md:gap-16 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                    <div className="flex items-center gap-2 font-black tracking-tighter text-xl">
                        <span className="text-emerald-600">NEXT</span>JS
                    </div>
                    <div className="flex items-center gap-2 font-black tracking-tighter text-xl">
                        FAST<span className="text-emerald-600">API</span>
                    </div>
                    <div className="flex items-center gap-2 font-black tracking-tighter text-xl uppercase">
                        PyTorch
                    </div>
                    <div className="flex items-center gap-2 font-black tracking-tighter text-xl">
                        NEON<span className="text-emerald-600">DB</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
