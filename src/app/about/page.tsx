import React from "react";
import {
    ChevronRight,
    Cpu,
    Database,
    Eye,
    Brain,
    Zap,
    Leaf,
    TrendingUp,
    Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const dynamic = "force-static";

const STATS = [
    { label: "Total Images", value: "43,109", sub: "Augmented dataset",
      bg: "bg-[#F0FFF4] dark:bg-[#0E2018]", border: "border-[#BBF7D0] dark:border-[#1A3828]",
      valColor: "text-[#065F46] dark:text-[#34D399]" },
    { label: "BiDCNet Accuracy", value: "99.03%", sub: "Best-in-class",
      bg: "bg-[#EAF6FF] dark:bg-[#0C1A26]", border: "border-[#BFDBFE] dark:border-[#1E3A5F]",
      valColor: "text-[#1E40AF] dark:text-[#60A5FA]" },
    { label: "Disease Classes", value: "11", sub: "Bacterial · Viral · Fungal",
      bg: "bg-[#FFF7E8] dark:bg-[#201600]", border: "border-[#FDE68A] dark:border-[#44330A]",
      valColor: "text-[#92400E] dark:text-[#FBBF24]" },
    { label: "Ensemble Models", value: "4", sub: "BiDCNet · CoAtNet · MaxViT · NextViT",
      bg: "bg-[#F5F0FF] dark:bg-[#130E22]", border: "border-[#DDD6FE] dark:border-[#2E1F5E]",
      valColor: "text-[#5B21B6] dark:text-[#A78BFA]" },
];

const SECTIONS = [
    {
        icon: <Cpu size={20} />,
        title: "Quad-Model Ensemble Architecture",
        color: { bg: "bg-[#F0FFF4] dark:bg-[#0E2018]", border: "border-[#BBF7D0] dark:border-[#1A3828]", iconBg: "bg-[#BBF7D0] dark:bg-[#065F46]/40", iconText: "text-[#065F46] dark:text-[#34D399]", dot: "bg-[#10B981]" },
        bullets: [
            "BiDCNet (Proposed) — 99.03% accuracy, our novel architecture",
            "ResNet-50 CNN encoder + Vision Transformer for dual-stream feature fusion",
            "Dual-Stage Bidirectional Cross-Attention for progressive CNN-ViT fusion",
            "Sparse Token Routing for computational efficiency — 21.5M parameters",
            "CoAtNet, MaxViT, NextViT as supporting ensemble models",
        ],
    },
    {
        icon: <Database size={20} />,
        title: "Dataset & Training",
        color: { bg: "bg-[#FFFBEA] dark:bg-[#1A1400]", border: "border-[#FDE68A] dark:border-[#3D2E00]", iconBg: "bg-[#FDE68A] dark:bg-[#B45309]/40", iconText: "text-[#92400E] dark:text-[#FBBF24]", dot: "bg-[#F59E0B]" },
        bullets: [
            "43,109 total images from the Augmented Tomato Leaf Disease dataset",
            "Training: 34,243 (79.4%) · Testing: 4,433 (10.3%) · Validation: 4,433 (10.3%)",
            "Consistent preprocessing, augmentation, and 5-View Test-Time Augmentation",
            "Optuna hyperparameter optimization — 15 trials × 12 epochs",
            "11 pathological categories across bacterial, viral, fungal, and healthy states",
        ],
    },
    {
        icon: <Eye size={20} />,
        title: "Explainability & Severity Assessment",
        color: { bg: "bg-[#F5F0FF] dark:bg-[#130E22]", border: "border-[#DDD6FE] dark:border-[#2E1F5E]", iconBg: "bg-[#DDD6FE] dark:bg-[#5B21B6]/40", iconText: "text-[#5B21B6] dark:text-[#A78BFA]", dot: "bg-[#8B5CF6]" },
        bullets: [
            "Grad-CAM++ with enhanced hotspot detection for class activation mapping",
            "Attention Rollout for transformer attention flow visualization",
            "Combined XAI Mode — dual-perspective overlays for comprehensive explainability",
            "Disease Severity Assessment — scoring based on area, lesion count, and intensity",
        ],
    },
    {
        icon: <Brain size={20} />,
        title: "Smart Prediction Features",
        color: { bg: "bg-[#EAF6FF] dark:bg-[#0C1A26]", border: "border-[#BFDBFE] dark:border-[#1E3A5F]", iconBg: "bg-[#BFDBFE] dark:bg-[#1D4ED8]/40", iconText: "text-[#1E40AF] dark:text-[#60A5FA]", dot: "bg-[#3B82F6]" },
        bullets: [
            "Ensemble Agreement Metrics — consensus tracking at 25%, 50%, 75%, 100%",
            "Uncertainty Quantification — entropy-based confidence with 4-level classification",
            "Confusion Warnings — alerts for similar disease pairs (Early Blight ↔ Target Spot)",
            "Severity Scoring — actionable treatment recommendations by disease progression",
        ],
    },
    {
        icon: <Globe size={20} />,
        title: "Modern Architecture",
        color: { bg: "bg-[#EFFFFA] dark:bg-[#0E1E1C]", border: "border-[#99F6E4] dark:border-[#134E4A]", iconBg: "bg-[#99F6E4] dark:bg-[#0F766E]/40", iconText: "text-[#0F766E] dark:text-[#2DD4BF]", dot: "bg-[#14B8A6]" },
        bullets: [
            "Frontend: Next.js 16 + React 19 — clinical dashboard with confidence & severity cards",
            "Backend: FastAPI + PyTorch 2.6 — quad-model inference and data processing",
            "PostgreSQL via Neon for persistent storage · Cloudinary for media management",
            "API-first design — extensible for mobile and IoT agricultural systems",
        ],
    },
];

export default function AboutOverviewPage() {
    return (
        <div className="min-h-screen pb-32 text-[#1A1A14] dark:text-[#E8E6DF]">
            <div className="max-w-4xl mx-auto px-6 py-12 space-y-24">

                {/* Breadcrumb */}
                {/* <div className="flex items-center gap-2 opacity-70">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9E9E8A] dark:text-[#606860]">Documentation</span>
                    <ChevronRight className="w-3 h-3 text-[#9E9E8A]/50" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">Overview</span>
                </div> */}

                {/* Hero */}
                {/* <section>
                    <div className="inline-flex items-center gap-2 bg-[#F0FFF4] dark:bg-[#0E2018] text-[#065F46] dark:text-[#34D399] text-[10px] font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#BBF7D0] dark:border-[#1A3828] mb-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        TomatoGuard AI · Project Overview
                    </div>
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight mb-6">
                        The Future of<br />
                        <span className="text-emerald-600 dark:text-emerald-400">Plant Health</span>
                    </h1>
                    <p className="text-lg text-[#555546] dark:text-[#A0A898] leading-relaxed max-w-2xl font-medium">
                        TomatoGuard AI is a next-generation AI-powered agricultural diagnostic platform revolutionizing plant disease detection through advanced computer vision and multimodal intelligence — focused specifically on tomato leaf pathology.
                    </p>
                </section> */}

                {/* Stats */}
                <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {STATS.map((s) => (
                        <div key={s.label} className={cn("rounded-2xl border p-5 flex flex-col gap-1", s.bg, s.border)}>
                            <span className={cn("text-2xl font-bold tabular-nums", s.valColor)}>{s.value}</span>
                            <span className="text-[12px] font-semibold text-[#1A1A14] dark:text-[#E8E6DF]">{s.label}</span>
                            <span className="text-[11px] text-[#9E9E8A] dark:text-[#606860]">{s.sub}</span>
                        </div>
                    ))}
                </section>

                {/* Sections */}
                <section>
                    <div className="mb-10">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9E9E8A] dark:text-[#606860] mb-2">Platform Highlights</p>
                        <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight">What Makes TomatoGuard AI Unique</h2>
                    </div>
                    <div className="space-y-4">
                        {SECTIONS.map((s) => (
                            <div key={s.title} className={cn("rounded-3xl border p-7 flex flex-col gap-5", s.color.bg, s.color.border)}>
                                <div className="flex items-center gap-3">
                                    <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0", s.color.iconBg, s.color.iconText)}>
                                        {s.icon}
                                    </div>
                                    <h3 className="font-semibold text-[15px] text-[#1A1A14] dark:text-[#E8E6DF]">{s.title}</h3>
                                </div>
                                <ul className="space-y-2.5 pl-1">
                                    {s.bullets.map((b, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className={cn("w-1.5 h-1.5 rounded-full mt-1.5 shrink-0", s.color.dot)} />
                                            <span className="text-[13px] text-[#444438] dark:text-[#A8A898] leading-relaxed">{b}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Mission Note */}
                <section>
                    <div className="rounded-3xl bg-[#F0FFF4] dark:bg-[#0E2018] border border-[#BBF7D0] dark:border-[#1A3828] p-8 flex items-start gap-5">
                        <div className="w-11 h-11 rounded-2xl bg-[#BBF7D0] dark:bg-[#065F46]/40 flex items-center justify-center shrink-0">
                            <Leaf size={20} className="text-[#065F46] dark:text-[#34D399]" strokeWidth={2} />
                        </div>
                        <div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-[#065F46] dark:text-[#34D399] mb-2">Our Mission</div>
                            <h2 className="font-serif text-xl font-semibold text-[#1A1A14] dark:text-[#E8E6DF] mb-2">Precision Agriculture for Everyone</h2>
                            <p className="text-[#555546] dark:text-[#A0A898] text-[14px] leading-relaxed">
                                Bridging the gap between cutting-edge computer vision and the reality of tomato farming — empowering farmers, researchers, and stakeholders with trusted, instant, and actionable insights.
                            </p>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
