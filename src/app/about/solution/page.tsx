import React from "react";
import { getMarkdownContent } from "@/lib/markdown";
import ReactMarkdown from "react-markdown";
import {
    Zap,
    ShieldCheck,
    FileText,
    Activity,
    ChevronRight,
    ArrowRight,
    CheckCircle
} from "lucide-react";

export const dynamic = "force-static";

const DEFAULT_ICONS: Record<string, React.ReactNode> = {
    "Instant Recognition": <Zap size={24} />,
    "Forensic Evidence": <ShieldCheck size={24} />,
    "Clinical Reports": <FileText size={24} />,
    "Actionable Guidance": <Activity size={24} />,
};

function parseFeatureList(children: React.ReactNode) {
    const childrenArray = React.Children.toArray(children);
    let nodes = childrenArray;
    if (childrenArray.length === 1 && (childrenArray[0] as any)?.type === 'p') {
        nodes = React.Children.toArray((childrenArray[0] as any).props.children);
    }

    const firstNode = nodes[0];
    const hasBoldTitle = firstNode && typeof firstNode === 'object' && (firstNode as any).type === 'strong';

    if (hasBoldTitle) {
        const title = (firstNode as any).props.children.toString();
        const desc = nodes.slice(1).map((node: any) => {
            if (typeof node === 'string') return node;
            return node?.props?.children || "";
        }).join("").replace(/^[:\s-]+/, "");

        return { title, desc };
    }

    return { title: "Feature", desc: nodes.map((n: any) => typeof n === 'string' ? n : (n?.props?.children || "")).join("") };
}

export default function SolutionPage() {
    const rawContent = getMarkdownContent("solution.md");
    const sections = rawContent.split("### Our Approach:").map(s => s.trim());
    const intro = sections[0] || "";
    const listPart = sections[1] || "";

    return (
        <div className="min-h-screen text-[#1A1A14] dark:text-[#EAE8DF] transition-colors duration-500 selection:bg-emerald-100 dark:selection:bg-emerald-900/40 pb-24">
            <div className="max-w-4xl mx-auto px-6 py-12">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 mb-10 animate-fade-in opacity-80">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9E9E8A] dark:text-[#606860]">
                        Research
                    </span>
                    <ChevronRight className="w-3 h-3 text-[#9E9E8A]/50" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#3B6D11] dark:text-[#97C459]">
                        Our Solution
                    </span>
                </div>

                {/* ── Hero ─────────────────────────────────────────────── */}
                <div className="mb-14 animate-slide-up">
                    <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-emerald-100/50 dark:border-emerald-900/20 mb-6 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Pathological AI
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

                {/* ── Features Grid ────────────────────────────────────── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ReactMarkdown
                        components={{
                            ul: ({ children }) => <>{children}</>,
                            li: ({ children }) => {
                                const { title, desc } = parseFeatureList(children);
                                const icon = DEFAULT_ICONS[title] || <CheckCircle size={24} />;

                                return (
                                    <div className="group bg-white dark:bg-[#1C1F1A] border border-black/5 dark:border-white/5 rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 hover:-translate-y-2">
                                        <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-900/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-8 group-hover:scale-110 transition-transform duration-500 group-hover:rotate-6 shadow-inner">
                                            {icon}
                                        </div>
                                        <h3 className="text-xl font-bold mb-3 tracking-tight">{title}</h3>
                                        <p className="text-[15px] text-[#6B6B5A] dark:text-[#9EA899] leading-relaxed mb-6 font-medium">
                                            {desc}
                                        </p>
                                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                                            <span>Learn more</span>
                                            <ArrowRight size={14} />
                                        </div>
                                    </div>
                                );
                            }
                        }}
                    >
                        {listPart}
                    </ReactMarkdown>
                </div>

                {/* ── Evidence Layer ──────────────────────────────────── */}
                <div className="mt-20 relative p-12 rounded-[3rem] bg-[#1A1A14] overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 text-white">
                        <div className="md:w-3/5">
                            <h2 className="font-serif text-3xl font-bold mb-6">Scientific Validation</h2>
                            <p className="text-[#A0A898] leading-relaxed mb-8">
                                Our solution doesn't just guess; it analyzes biological activation markers. By utilizing Grad-CAM and Dual-CNN ensembles, we provide a level of evidence-based AI rarely seen in agricultural tools.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <span className="bg-white/10 px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-widest border border-white/5">Grad-CAM Visualization</span>
                                <span className="bg-white/10 px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-widest border border-white/5">Dual-Ensemble Logic</span>
                            </div>
                        </div>
                        <div className="md:w-2/5 flex justify-center">
                            <div className="w-48 h-48 rounded-full border border-emerald-500/30 flex items-center justify-center p-4 relative">
                                <div className="absolute inset-0 bg-emerald-500/5 animate-pulse rounded-full" />
                                <ShieldCheck size={80} className="text-emerald-500" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
