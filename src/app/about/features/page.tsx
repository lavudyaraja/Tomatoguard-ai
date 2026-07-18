import React from "react";
import { ChevronRight, Layers, Eye, Archive, MapPin, BarChart2, Zap, Brain, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export const dynamic = "force-static";

const FEATURES = [
    {
        num: "01",
        icon: <Layers size={20} />,
        title: "Dual-Ensemble Classification",
        color: { bg: "bg-[#F0FFF4] dark:bg-[#0E2018]", border: "border-[#BBF7D0] dark:border-[#1A3828]", iconBg: "bg-[#BBF7D0] dark:bg-[#065F46]/40", iconText: "text-[#065F46] dark:text-[#34D399]", dot: "bg-[#10B981]", numText: "text-[#065F46] dark:text-[#34D399]" },
        desc: "Uses both Vision Transformers (MaxViT, NextViT) and CNNs (CoAtNet, BiDCNet) to achieve superior generalization across different lighting conditions, leaf angles, and disease stages.",
        tags: ["BiDCNet", "CoAtNet", "MaxViT", "NextViT"],
    },
    {
        num: "02",
        icon: <Eye size={20} />,
        title: "Forensic Cross-Viewer",
        color: { bg: "bg-[#EAF6FF] dark:bg-[#0C1A26]", border: "border-[#BFDBFE] dark:border-[#1E3A5F]", iconBg: "bg-[#BFDBFE] dark:bg-[#1D4ED8]/40", iconText: "text-[#1E40AF] dark:text-[#60A5FA]", dot: "bg-[#3B82F6]", numText: "text-[#1E40AF] dark:text-[#60A5FA]" },
        desc: "Side-by-side comparison of the original leaf tissue with the AI's activation heatmap. Grad-CAM++ and Attention Rollout overlays make the model's reasoning visually transparent.",
        tags: ["Grad-CAM++", "Attention Rollout", "Combined XAI"],
    },
    {
        num: "03",
        icon: <Archive size={20} />,
        title: "Patient History Archive",
        color: { bg: "bg-[#F5F0FF] dark:bg-[#130E22]", border: "border-[#DDD6FE] dark:border-[#2E1F5E]", iconBg: "bg-[#DDD6FE] dark:bg-[#5B21B6]/40", iconText: "text-[#5B21B6] dark:text-[#A78BFA]", dot: "bg-[#8B5CF6]", numText: "text-[#5B21B6] dark:text-[#A78BFA]" },
        desc: "A comprehensive, searchable ledger of all past scans — enabling seasonal trend analysis, treatment tracking, and longitudinal monitoring of individual plants or entire farm sections.",
        tags: ["Scan History", "Trend Analysis", "PostgreSQL"],
    },
    {
        num: "04",
        icon: <MapPin size={20} />,
        title: "Interactive Pathology Hotspots",
        color: { bg: "bg-[#FFF7E8] dark:bg-[#201600]", border: "border-[#FDE68A] dark:border-[#44330A]", iconBg: "bg-[#FDE68A] dark:bg-[#92400E]/40", iconText: "text-[#92400E] dark:text-[#FBBF24]", dot: "bg-[#F59E0B]", numText: "text-[#92400E] dark:text-[#FBBF24]" },
        desc: "Annotation pins placed on high-intensity regions of the leaf, each describing specific symptoms identified by the computer vision model — bridging AI output with visible pathology.",
        tags: ["Lesion Annotation", "Severity Scoring", "Hotspot Detection"],
    },
    {
        num: "05",
        icon: <BarChart2 size={20} />,
        title: "Uncertainty & Confidence Scoring",
        color: { bg: "bg-[#FFF4F0] dark:bg-[#200C00]", border: "border-[#FED7AA] dark:border-[#4A1A00]", iconBg: "bg-[#FED7AA] dark:bg-[#C2410C]/40", iconText: "text-[#C2410C] dark:text-[#FB923C]", dot: "bg-[#F97316]", numText: "text-[#C2410C] dark:text-[#FB923C]" },
        desc: "Entropy-based confidence scoring with 4-level classification, ensemble agreement tracking at 25%/50%/75%/100% consensus, and smart confusion warnings for similar disease pairs.",
        tags: ["Entropy Scoring", "Ensemble Agreement", "Confusion Warnings"],
    },
    {
        num: "06",
        icon: <Zap size={20} />,
        title: "Real-Time Inference",
        color: { bg: "bg-[#EFFFFA] dark:bg-[#0E1E1C]", border: "border-[#99F6E4] dark:border-[#134E4A]", iconBg: "bg-[#99F6E4] dark:bg-[#0F766E]/40", iconText: "text-[#0F766E] dark:text-[#2DD4BF]", dot: "bg-[#14B8A6]", numText: "text-[#0F766E] dark:text-[#2DD4BF]" },
        desc: "Photo upload to diagnosis in under 5 seconds. Multi-model inference with real-time aggregation, automatic BiDCNet prioritization, and 5-View Test-Time Augmentation for robust predictions.",
        tags: ["< 5 Second Diagnosis", "5-View TTA", "Real-Time Aggregation"],
    },
    {
        num: "07",
        icon: <Brain size={20} />,
        title: "LLM-Generated Clinical Reports",
        color: { bg: "bg-[#F8F4FF] dark:bg-[#18122A]", border: "border-[#E9D5FF] dark:border-[#3B2565]", iconBg: "bg-[#E9D5FF] dark:bg-[#5B21B6]/40", iconText: "text-[#6D28D9] dark:text-[#C084FC]", dot: "bg-[#8B5CF6]", numText: "text-[#6D28D9] dark:text-[#C084FC]" },
        desc: "Groq-powered Llama-4-Scout generates automated summaries explaining the \"why\" and \"how\" behind every diagnosis, complete with tailored biosecurity and recovery protocols.",
        tags: ["Groq AI", "Llama-4-Scout", "Clinical Summaries"],
    },
    {
        num: "08",
        icon: <ShieldCheck size={20} />,
        title: "Image Quality Analysis",
        color: { bg: "bg-[#F3FFF0] dark:bg-[#0E1C0C]", border: "border-[#BBF7D0] dark:border-[#14532D]", iconBg: "bg-[#BBF7D0] dark:bg-[#15803D]/40", iconText: "text-[#15803D] dark:text-[#4ADE80]", dot: "bg-[#22C55E]", numText: "text-[#15803D] dark:text-[#4ADE80]" },
        desc: "Real-time feedback on leaf vitality, light exposure, and color profile metrics — with quality advisories guiding users to retake images for more accurate diagnostics.",
        tags: ["Leaf Vitality", "Light Exposure", "Quality Advisories"],
    },
];

export default function FeaturesPage() {
    return (
        <div className="min-h-screen pb-32 text-[#1A1A14] dark:text-[#E8E6DF]">
            <div className="max-w-4xl mx-auto px-6 py-12 space-y-24">

                {/* Breadcrumb */}
                {/* <div className="flex items-center gap-2 opacity-70">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9E9E8A] dark:text-[#606860]">Research</span>
                    <ChevronRight className="w-3 h-3 text-[#9E9E8A]/50" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#065F46] dark:text-[#34D399]">Core Features</span>
                </div> */}

                {/* Hero */}
                {/* <section>
                    <div className="inline-flex items-center gap-2 bg-[#F0FFF4] dark:bg-[#0E2018] text-[#065F46] dark:text-[#34D399] text-[10px] font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#BBF7D0] dark:border-[#1A3828] mb-8">
                        <Layers size={11} />
                        Feature Ecosystem · 8 Core Features
                    </div>
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight mb-6">
                        Core<br />
                        <span className="text-emerald-600 dark:text-emerald-400">Features</span>
                    </h1>
                    <p className="text-lg text-[#555546] dark:text-[#A0A898] leading-relaxed max-w-2xl font-medium">
                        A complete ecosystem of AI-powered capabilities — from forensic heatmaps to LLM-generated clinical reports — built for both farming professionals and research institutions.
                    </p>
                </section> */}

                {/* Feature Grid */}
                <section>
                    <div className="mb-10">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9E9E8A] dark:text-[#606860] mb-2">Platform Capabilities</p>
                        <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight">Feature Breakdown</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {FEATURES.map((f) => (
                            <div key={f.num} className={cn("group rounded-3xl border p-7 flex flex-col gap-4 transition-transform duration-300 hover:-translate-y-1", f.color.bg, f.color.border)}>
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0", f.color.iconBg, f.color.iconText)}>
                                            {f.icon}
                                        </div>
                                        <h3 className="font-semibold text-[15px] text-[#1A1A14] dark:text-[#E8E6DF] leading-tight">{f.title}</h3>
                                    </div>
                                    <span className={cn("text-[11px] font-bold shrink-0 tabular-nums", f.color.numText)}>{f.num}</span>
                                </div>
                                <p className="text-[13px] text-[#444438] dark:text-[#A8A898] leading-relaxed">{f.desc}</p>
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {f.tags.map((tag) => (
                                        <span key={tag} className={cn("text-[10px] font-semibold px-2.5 py-1 rounded-full border", f.color.iconBg, f.color.border, f.color.numText)}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
}
