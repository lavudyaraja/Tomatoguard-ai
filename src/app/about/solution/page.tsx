import React from "react";
import {
    ChevronRight,
    Cpu,
    Zap,
    Eye,
    FlaskConical,
    FileText,
    ArrowRight,
    Database,
    Globe,
    Server,
    Image as ImageIcon,
    Cloud,
    CheckCircle2,
    TrendingUp,
    ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const dynamic = "force-static";

/* ─────────────────────────────────────────────────────────────────
   Data
───────────────────────────────────────────────────────────────── */

const APPROACH_CARDS = [
    {
        num: "01",
        title: "Quad-Model Ensemble",
        color: {
            bg: "bg-[#F0FFF4] dark:bg-[#0E2018]",
            border: "border-[#BBF7D0] dark:border-[#1A3828]",
            numBg: "bg-[#BBF7D0] dark:bg-[#065F46]/40",
            numText: "text-[#065F46] dark:text-[#34D399]",
            dotBg: "bg-[#10B981]",
            iconText: "text-[#065F46] dark:text-[#34D399]",
        },
        icon: <Cpu size={20} />,
        bullets: [
            "BiDCNet (Proposed) — 99.03% accuracy as primary model",
            "CoAtNet, MaxViT, NextViT for ensemble consensus",
            "Consensus tracking at 25%, 50%, 75%, 100% agreement",
            "Entropy-based uncertainty scoring — 4-level classification",
        ],
    },
    {
        num: "02",
        title: "Instant Recognition",
        color: {
            bg: "bg-[#EAF6FF] dark:bg-[#0C1A26]",
            border: "border-[#BFDBFE] dark:border-[#1E3A5F]",
            numBg: "bg-[#BFDBFE] dark:bg-[#1D4ED8]/40",
            numText: "text-[#1E40AF] dark:text-[#60A5FA]",
            dotBg: "bg-[#3B82F6]",
            iconText: "text-[#1E40AF] dark:text-[#60A5FA]",
        },
        icon: <Zap size={20} />,
        bullets: [
            "Photo upload → diagnosis in under 5 seconds",
            "Multi-model inference with real-time aggregation",
            "Automatic BiDCNet prioritization as primary model",
        ],
    },
    {
        num: "03",
        title: "Advanced Explainability (XAI)",
        color: {
            bg: "bg-[#F5F0FF] dark:bg-[#130E22]",
            border: "border-[#DDD6FE] dark:border-[#2E1F5E]",
            numBg: "bg-[#DDD6FE] dark:bg-[#5B21B6]/40",
            numText: "text-[#5B21B6] dark:text-[#A78BFA]",
            dotBg: "bg-[#8B5CF6]",
            iconText: "text-[#5B21B6] dark:text-[#A78BFA]",
        },
        icon: <Eye size={20} />,
        bullets: [
            "Grad-CAM++ heatmaps — exactly where the model focuses",
            "Attention Rollout for transformer flow visualization",
            "Combined dual-perspective XAI overlays",
            "Lesion annotation with automatic hotspot detection",
        ],
    },
    {
        num: "04",
        title: "Research-Backed Enhancements",
        color: {
            bg: "bg-[#FFF7E8] dark:bg-[#201600]",
            border: "border-[#FDE68A] dark:border-[#44330A]",
            numBg: "bg-[#FDE68A] dark:bg-[#92400E]/40",
            numText: "text-[#92400E] dark:text-[#FBBF24]",
            dotBg: "bg-[#F59E0B]",
            iconText: "text-[#92400E] dark:text-[#FBBF24]",
        },
        icon: <FlaskConical size={20} />,
        bullets: [
            "Confusion warnings for similar disease pairs (Early Blight ↔ Target Spot)",
            "Quantitative severity scoring by area, count, and intensity",
            "Image quality metrics — leaf vitality, light exposure, color profile",
            "Real-time quality advisories during image capture",
        ],
    },
    {
        num: "05",
        title: "Clinical Reports & Guidance",
        color: {
            bg: "bg-[#FFF4F0] dark:bg-[#200C00]",
            border: "border-[#FED7AA] dark:border-[#4A1A00]",
            numBg: "bg-[#FED7AA] dark:bg-[#C2410C]/40",
            numText: "text-[#C2410C] dark:text-[#FB923C]",
            dotBg: "bg-[#F97316]",
            iconText: "text-[#C2410C] dark:text-[#FB923C]",
        },
        icon: <FileText size={20} />,
        bullets: [
            "Automated LLM-generated summaries explain the \"why\" and \"how\"",
            "Tailored biosecurity and recovery protocols per diagnosis",
            "Treatment recommendations calibrated to severity level",
        ],
    },
];

const METRICS = [
    { model: "BiDCNet (Proposed)", accuracy: 99.03, params: "21.5M", type: "Proposed", primary: true },
    { model: "CoAtNet", accuracy: 98.9, params: "Hybrid", type: "Supporting", primary: false },
    { model: "MaxViT", accuracy: 98.8, params: "Multi-Axis ViT", type: "Supporting", primary: false },
    { model: "NextViT", accuracy: 98.7, params: "Next-Gen", type: "Supporting", primary: false },
];

const TECH_ARCHITECTURE = [
    "Pretrained ResNet-50 CNN encoder for local feature extraction",
    "Scratch-trained Vision Transformer (4 blocks, 384 dim, 6 heads) for global context",
    "Dual-Stage Bidirectional Cross-Attention: Full dense → Sparse top-K routing",
    "21.5M parameters trained on 43,109 augmented tomato leaf images",
    "Hyperparameter optimization via Optuna (15 trials × 12 epochs)",
    "5-View Test-Time Augmentation for robust predictions",
];

const DATASET_STATS = [
    { label: "Total Images", value: "43,109" },
    { label: "Training", value: "34,243 (79.4%)" },
    { label: "Testing", value: "4,433 (10.3%)" },
    { label: "Validation", value: "4,433 (10.3%)" },
    { label: "Disease Classes", value: "11 classes" },
];

const DEPLOY_STACK = [
    { icon: <Globe size={18} />, label: "Frontend", detail: "Next.js 16, React 19, TypeScript, Tailwind v4",
      bg: "bg-[#F8F4FF] dark:bg-[#18122A]", border: "border-[#E9D5FF] dark:border-[#3B2565]", iconBg: "bg-[#E9D5FF] dark:bg-[#5B21B6]/30", iconColor: "text-[#6D28D9] dark:text-[#C084FC]" },
    { icon: <Server size={18} />, label: "Backend", detail: "FastAPI, PyTorch 2.6, Python 3.11",
      bg: "bg-[#F0FFF4] dark:bg-[#0E2018]", border: "border-[#BBF7D0] dark:border-[#1A3828]", iconBg: "bg-[#BBF7D0] dark:bg-[#065F46]/30", iconColor: "text-[#065F46] dark:text-[#34D399]" },
    { icon: <Database size={18} />, label: "Database", detail: "Neon Serverless PostgreSQL",
      bg: "bg-[#EFFFFA] dark:bg-[#0E1E1C]", border: "border-[#99F6E4] dark:border-[#134E4A]", iconBg: "bg-[#99F6E4] dark:bg-[#0F766E]/30", iconColor: "text-[#0F766E] dark:text-[#2DD4BF]" },
    { icon: <ImageIcon size={18} />, label: "Media", detail: "Cloudinary for image hosting & delivery",
      bg: "bg-[#FFF0F5] dark:bg-[#200A14]", border: "border-[#FBCFE8] dark:border-[#500C2A]", iconBg: "bg-[#FBCFE8] dark:bg-[#BE185D]/30", iconColor: "text-[#BE185D] dark:text-[#F472B6]" },
    { icon: <Cloud size={18} />, label: "Deployment", detail: "Vercel (frontend) + Render (backend)",
      bg: "bg-[#F3FFF0] dark:bg-[#0E1C0C]", border: "border-[#BBF7D0] dark:border-[#14532D]", iconBg: "bg-[#BBF7D0] dark:bg-[#15803D]/30", iconColor: "text-[#15803D] dark:text-[#4ADE80]" },
];

/* ─────────────────────────────────────────────────────────────────
   Page Component
───────────────────────────────────────────────────────────────── */

export default function SolutionPage() {
    return (
        <div className="min-h-screen pb-32 text-[#1A1A14] dark:text-[#E8E6DF]">
            <div className="max-w-4xl mx-auto px-6 py-12 space-y-24">

                {/* ── Breadcrumb ─────────────────────────────────────── */}
                {/* <div className="flex items-center gap-2 opacity-70">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9E9E8A] dark:text-[#606860]">
                        Research
                    </span>
                    <ChevronRight className="w-3 h-3 text-[#9E9E8A]/50" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                        Our Solution
                    </span>
                </div> */}

                {/* ── Hero ───────────────────────────────────────────── */}
                {/* <section>
                    <div className="inline-flex items-center gap-2 bg-[#F0FFF4] dark:bg-[#0E2018] text-[#065F46] dark:text-[#34D399] text-[10px] font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#BBF7D0] dark:border-[#1A3828] mb-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Pathological AI · End-to-End Pipeline
                    </div>

                    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight mb-6">
                        The Solution: Quad-Model<br />
                        <span className="text-emerald-600 dark:text-emerald-400">Ensemble with BiDCNet</span>
                    </h1>
                    <p className="text-lg text-[#555546] dark:text-[#A0A898] leading-relaxed max-w-2xl font-medium">
                        TomatoGuard AI provides an end-to-end diagnostic pipeline combining <strong className="text-[#1A1A14] dark:text-[#E8E6DF] font-semibold">four state-of-the-art deep learning models</strong> with multimodal explainability and research-backed uncertainty quantification.
                    </p>
                </section> */}

                {/* ── Our Approach Cards ─────────────────────────────── */}
                <section>
                    <div className="mb-10">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9E9E8A] dark:text-[#606860] mb-2">System Design</p>
                        <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight">Our Approach</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {APPROACH_CARDS.map((card) => (
                            <div
                                key={card.num}
                                className={cn(
                                    "group rounded-3xl border p-7 transition-transform duration-300 hover:-translate-y-1 flex flex-col gap-5",
                                    card.color.bg,
                                    card.color.border
                                )}
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center shrink-0", card.color.numBg, card.color.iconText)}>
                                            {card.icon}
                                        </div>
                                        <h3 className="font-semibold text-[15px] text-[#1A1A14] dark:text-[#E8E6DF] leading-tight">{card.title}</h3>
                                    </div>
                                    <span className={cn("text-[11px] font-bold shrink-0 tabular-nums", card.color.numText)}>{card.num}</span>
                                </div>

                                {/* Bullets */}
                                <ul className="space-y-2.5">
                                    {card.bullets.map((b, i) => (
                                        <li key={i} className="flex items-start gap-2.5">
                                            <span className={cn("w-1.5 h-1.5 rounded-full mt-1.5 shrink-0", card.color.dotBg)} />
                                            <span className="text-[13px] text-[#444438] dark:text-[#A8A898] leading-relaxed">{b}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Hover arrow */}
                                <div className={cn("flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-auto", card.color.numText)}>
                                    <span>Details below</span>
                                    <ArrowRight size={12} />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Technical Implementation ───────────────────────── */}
                <section>
                    <div className="mb-10">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9E9E8A] dark:text-[#606860] mb-2">Engineering Details</p>
                        <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight">Technical Specifications</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* BiDCNet Architecture */}
                        <div className="bg-[#EEF7FF] dark:bg-[#0C1A26] border border-[#BFDBFE] dark:border-[#1E3A5F] rounded-3xl p-7">
                            <div className="inline-flex items-center gap-1.5 bg-[#BFDBFE] dark:bg-[#1D4ED8]/30 text-[#1E40AF] dark:text-[#60A5FA] text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-5">
                                Model Architecture
                            </div>
                            <h3 className="font-semibold text-base text-[#1A1A14] dark:text-[#E8E6DF] mb-5">BiDCNet (Proposed)</h3>
                            <ul className="space-y-3">
                                {TECH_ARCHITECTURE.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] dark:bg-[#60A5FA] mt-1.5 shrink-0" />
                                        <span className="text-[13px] text-[#4E5668] dark:text-[#9EABB8] leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Dataset */}
                        <div className="bg-[#FFFBEA] dark:bg-[#1A1400] border border-[#FDE68A] dark:border-[#3D2E00] rounded-3xl p-7">
                            <div className="inline-flex items-center gap-1.5 bg-[#FDE68A] dark:bg-[#B45309]/30 text-[#92400E] dark:text-[#FBBF24] text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-5">
                                Training Corpus
                            </div>
                            <h3 className="font-semibold text-base text-[#1A1A14] dark:text-[#E8E6DF] mb-5">Dataset Statistics</h3>
                            <div className="space-y-4">
                                {DATASET_STATS.map((stat) => (
                                    <div key={stat.label} className="flex items-center justify-between gap-4">
                                        <span className="text-[13px] text-[#6B5A4B] dark:text-[#A89C8F]">{stat.label}</span>
                                        <span className="text-[13px] font-semibold text-[#1A1A14] dark:text-[#E8E6DF] tabular-nums">{stat.value}</span>
                                    </div>
                                ))}
                                <div className="pt-3 border-t border-[#FDE68A]/60 dark:border-[#44330A]">
                                    <span className="text-[12px] text-[#92400E] dark:text-[#FBBF24] font-semibold">
                                        Bacterial · Viral · Fungal · Healthy states
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Performance Metrics ────────────────────────────── */}
                <section>
                    <div className="mb-10">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9E9E8A] dark:text-[#606860] mb-2">Benchmarks</p>
                        <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight flex items-center gap-3">
                            <TrendingUp className="text-emerald-600 dark:text-emerald-400" size={26} />
                            Performance Comparison
                        </h2>
                    </div>

                    <div className="bg-[#F5F7FA] dark:bg-[#141618] border border-[#E4E7EB] dark:border-[#252A30] rounded-3xl overflow-hidden">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-[#E4E7EB] dark:border-[#252A30]">
                                    <th className="py-4 px-6 text-[11px] font-semibold uppercase tracking-widest text-[#9E9E8A] dark:text-[#606860]">Model</th>
                                    <th className="py-4 px-4 text-[11px] font-semibold uppercase tracking-widest text-[#9E9E8A] dark:text-[#606860]">Accuracy</th>
                                    <th className="py-4 px-4 text-[11px] font-semibold uppercase tracking-widest text-[#9E9E8A] dark:text-[#606860] hidden sm:table-cell">Parameters</th>
                                    <th className="py-4 px-6 text-[11px] font-semibold uppercase tracking-widest text-[#9E9E8A] dark:text-[#606860]">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {METRICS.map((row, i) => (
                                    <tr
                                        key={row.model}
                                        className={cn(
                                            "border-b border-[#E4E7EB]/60 dark:border-[#252A30]/60 last:border-0 transition-colors duration-200",
                                            row.primary
                                                ? "bg-emerald-500/[0.04] dark:bg-emerald-500/[0.06] hover:bg-emerald-500/[0.07]"
                                                : "hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
                                        )}
                                    >
                                        <td className="py-4 px-6">
                                            <span className={cn("text-[14px] font-semibold", row.primary ? "text-[#1A1A14] dark:text-[#E8E6DF]" : "text-[#555546] dark:text-[#A0A898]")}>
                                                {row.model}
                                            </span>
                                            {row.primary && (
                                                <span className="ml-2 text-[9px] font-semibold uppercase tracking-widest bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30 align-middle">
                                                    Proposed
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <span className={cn("text-[14px] font-semibold tabular-nums", row.primary ? "text-emerald-600 dark:text-emerald-400" : "text-[#555546] dark:text-[#A0A898]")}>
                                                    {row.accuracy}%
                                                </span>
                                                <div className="w-20 h-1 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden hidden sm:block">
                                                    <div
                                                        className={cn("h-full rounded-full", row.primary ? "bg-emerald-500" : "bg-slate-400/60")}
                                                        style={{ width: `${(row.accuracy - 98) * 100}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-[13px] text-[#9E9E8A] dark:text-[#606860] hidden sm:table-cell">{row.params}</td>
                                        <td className="py-4 px-6">
                                            <span className={cn(
                                                "text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full border",
                                                row.primary
                                                    ? "bg-[#D1FAE5] dark:bg-[#065F46]/30 border-[#6EE7B7] dark:border-[#065F46] text-[#065F46] dark:text-[#34D399]"
                                                    : "bg-[#F5F7FA] dark:bg-[#1F2428] border-[#E4E7EB] dark:border-[#2D3139] text-[#9E9E8A] dark:text-[#606860]"
                                            )}>
                                                {row.type}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* ── Production Stack ───────────────────────────────── */}
                <section>
                    <div className="mb-10">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9E9E8A] dark:text-[#606860] mb-2">Infrastructure</p>
                        <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight">Production Stack</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {DEPLOY_STACK.map((item) => (
                            <div
                                key={item.label}
                                className={cn("rounded-2xl border p-5 flex flex-col gap-3 transition-transform duration-300 hover:-translate-y-0.5", item.bg, item.border)}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0", item.iconBg, item.iconColor)}>
                                        {item.icon}
                                    </div>
                                    <span className="font-semibold text-[13px] text-[#1A1A14] dark:text-[#E8E6DF]">{item.label}</span>
                                </div>
                                <p className="text-[12px] text-[#555546] dark:text-[#A0A898] leading-relaxed">{item.detail}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Scientific Validation Note ─────────────────────── */}
                <section>
                    <div className="rounded-3xl bg-[#F0FFF4] dark:bg-[#0E2018] border border-[#BBF7D0] dark:border-[#1A3828] p-8 flex flex-col md:flex-row items-start gap-6">
                        <div className="w-11 h-11 rounded-2xl bg-[#BBF7D0] dark:bg-[#065F46]/40 flex items-center justify-center shrink-0">
                            <ShieldCheck size={20} className="text-[#065F46] dark:text-[#34D399]" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 text-[#065F46] dark:text-[#34D399] text-[10px] font-semibold uppercase tracking-widest mb-2">
                                <CheckCircle2 size={13} />
                                Evidence-Based AI
                            </div>
                            <h2 className="font-serif text-xl font-semibold text-[#1A1A14] dark:text-[#E8E6DF] mb-2">Scientific Validation</h2>
                            <p className="text-[#555546] dark:text-[#A0A898] text-[14px] leading-relaxed mb-4 max-w-xl">
                                TomatoGuard AI analyzes biological activation markers — not just pixel patterns. Grad-CAM++ and dual-ensemble logic deliver evidence-backed diagnostics rarely seen in agricultural tools.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {["Grad-CAM++ Heatmaps", "Dual-Ensemble Logic", "Uncertainty Scoring", "Lesion Annotation"].map((tag) => (
                                    <span key={tag} className="text-[10px] font-semibold uppercase tracking-wider text-[#065F46] dark:text-[#34D399] border border-[#86EFAC] dark:border-[#065F46] bg-[#D1FAE5] dark:bg-[#065F46]/20 px-3 py-1.5 rounded-full">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
