import React from "react";
import Image from "next/image";
import { ChevronRight, Layers, Cpu, Eye, Brain, Database, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const dynamic = "force-static";

const LAYERS = [
    {
        num: "01",
        icon: <Layers size={18} />,
        title: "Frontend — Next.js Clinical Dashboard",
        color: { bg: "bg-[#F8F4FF] dark:bg-[#18122A]", border: "border-[#E9D5FF] dark:border-[#3B2565]", iconBg: "bg-[#E9D5FF] dark:bg-[#5B21B6]/40", iconText: "text-[#6D28D9] dark:text-[#C084FC]", dot: "bg-[#8B5CF6]", numText: "text-[#6D28D9] dark:text-[#C084FC]" },
        desc: "React-based clinical dashboard handling image uploads, report rendering, confidence metrics, severity assessment cards, and scan history visualization.",
    },
    {
        num: "02",
        icon: <Cpu size={18} />,
        title: "Inference Backend — FastAPI Quad-Model Engine",
        color: { bg: "bg-[#F0FFF4] dark:bg-[#0E2018]", border: "border-[#BBF7D0] dark:border-[#1A3828]", iconBg: "bg-[#BBF7D0] dark:bg-[#065F46]/40", iconText: "text-[#065F46] dark:text-[#34D399]", dot: "bg-[#10B981]", numText: "text-[#065F46] dark:text-[#34D399]" },
        desc: "Python-based inference engine hosting BiDCNet, CoAtNet, MaxViT, and NextViT with ensemble agreement tracking and entropy-based uncertainty quantification.",
    },
    {
        num: "03",
        icon: <Eye size={18} />,
        title: "Explainer Module — XAI Engine",
        color: { bg: "bg-[#EAF6FF] dark:bg-[#0C1A26]", border: "border-[#BFDBFE] dark:border-[#1E3A5F]", iconBg: "bg-[#BFDBFE] dark:bg-[#1D4ED8]/40", iconText: "text-[#1E40AF] dark:text-[#60A5FA]", dot: "bg-[#3B82F6]", numText: "text-[#1E40AF] dark:text-[#60A5FA]" },
        desc: "Multi-perspective explainability using Grad-CAM++, Attention Rollout, and Combined XAI mode for dual-perspective visualization of model reasoning.",
    },
    {
        num: "04",
        icon: <Brain size={18} />,
        title: "Insight Layer — Groq LLM (Llama-4-Scout)",
        color: { bg: "bg-[#FFF7E8] dark:bg-[#201600]", border: "border-[#FDE68A] dark:border-[#44330A]", iconBg: "bg-[#FDE68A] dark:bg-[#92400E]/40", iconText: "text-[#92400E] dark:text-[#FBBF24]", dot: "bg-[#F59E0B]", numText: "text-[#92400E] dark:text-[#FBBF24]" },
        desc: "Llama-4-Scout performs multimodal visual analysis on pathological markers, generating automated clinical summaries with tailored biosecurity and treatment protocols.",
    },
    {
        num: "05",
        icon: <Database size={18} />,
        title: "Persistence Layer — Neon DB & Cloudinary",
        color: { bg: "bg-[#EFFFFA] dark:bg-[#0E1E1C]", border: "border-[#99F6E4] dark:border-[#134E4A]", iconBg: "bg-[#99F6E4] dark:bg-[#0F766E]/40", iconText: "text-[#0F766E] dark:text-[#2DD4BF]", dot: "bg-[#14B8A6]", numText: "text-[#0F766E] dark:text-[#2DD4BF]" },
        desc: "Neon Serverless PostgreSQL stores scan records and patient history. Cloudinary CDN handles image hosting, transformation, and optimized delivery.",
    },
];

const MODEL_SPECS = [
    { name: "BiDCNet (Proposed)", acc: "99.03%", params: "21.5M", type: "Primary", details: "ResNet-50 CNN + ViT (384 dim, 4 blocks, 6 heads) + Dual-Stage Bidirectional Cross-Attention",
      bg: "bg-[#F0FFF4] dark:bg-[#0E2018]", border: "border-[#BBF7D0] dark:border-[#1A3828]", accColor: "text-[#065F46] dark:text-[#34D399]", badge: "bg-[#D1FAE5] dark:bg-[#065F46]/30 border-[#6EE7B7] dark:border-[#065F46] text-[#065F46] dark:text-[#34D399]" },
    { name: "CoAtNet", acc: "98.9%", params: "Hybrid", type: "Supporting", details: "Hybrid CNN-Transformer with convolutional attention mechanism",
      bg: "bg-[#F5F7FA] dark:bg-[#141618]", border: "border-[#E4E7EB] dark:border-[#252A30]", accColor: "text-[#555546] dark:text-[#A0A898]", badge: "bg-[#F5F7FA] dark:bg-[#1F2428] border-[#E4E7EB] dark:border-[#2D3139] text-[#9E9E8A] dark:text-[#606860]" },
    { name: "MaxViT", acc: "98.8%", params: "Multi-Axis ViT", type: "Supporting", details: "Multi-Axis Vision Transformer with block/grid attention patterns",
      bg: "bg-[#F5F7FA] dark:bg-[#141618]", border: "border-[#E4E7EB] dark:border-[#252A30]", accColor: "text-[#555546] dark:text-[#A0A898]", badge: "bg-[#F5F7FA] dark:bg-[#1F2428] border-[#E4E7EB] dark:border-[#2D3139] text-[#9E9E8A] dark:text-[#606860]" },
    { name: "NextViT", acc: "98.7%", params: "Next-Gen", type: "Supporting", details: "Next-generation efficient Vision Transformer architecture",
      bg: "bg-[#F5F7FA] dark:bg-[#141618]", border: "border-[#E4E7EB] dark:border-[#252A30]", accColor: "text-[#555546] dark:text-[#A0A898]", badge: "bg-[#F5F7FA] dark:bg-[#1F2428] border-[#E4E7EB] dark:border-[#2D3139] text-[#9E9E8A] dark:text-[#606860]" },
];

export default function ArchitecturePage() {
    return (
        <div className="min-h-screen pb-32 text-[#1A1A14] dark:text-[#E8E6DF]">
            <div className="max-w-4xl mx-auto px-6 py-12 space-y-20">

                {/* Breadcrumb */}
                {/* <div className="flex items-center gap-2 opacity-70">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9E9E8A] dark:text-[#606860]">Research</span>
                    <ChevronRight className="w-3 h-3 text-[#9E9E8A]/50" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6D28D9] dark:text-[#C084FC]">System Architecture</span>
                </div> */}

                {/* Hero */}
                {/* <section>
                    <div className="inline-flex items-center gap-2 bg-[#F8F4FF] dark:bg-[#18122A] text-[#6D28D9] dark:text-[#C084FC] text-[10px] font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#E9D5FF] dark:border-[#3B2565] mb-8">
                        <Layers size={11} />
                        Technical Architecture · 5-Layer System
                    </div>
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight mb-6">
                        System<br />
                        <span className="text-[#6D28D9] dark:text-[#C084FC]">Architecture</span>
                    </h1>
                    <p className="text-lg text-[#555546] dark:text-[#A0A898] leading-relaxed max-w-2xl font-medium">
                        TomatoGuard AI uses a decoupled 5-layer architecture — from a Next.js clinical frontend to a FastAPI quad-model engine — designed for high-performance inference, rich explainability, and enterprise-grade data persistence.
                    </p>
                </section> */}

                {/* ── BiDCNet Architecture Diagram ──────────────────── */}
                <section>
                    <div className="mb-6">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9E9E8A] dark:text-[#606860] mb-2">Model Design</p>
                        <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight">BiDCNet Architecture</h2>
                        <p className="mt-3 text-[14px] text-[#555546] dark:text-[#A0A898] leading-relaxed max-w-2xl">
                            BiDCNet uses a pretrained <strong className="text-[#1A1A14] dark:text-[#E8E6DF] font-semibold">ResNet-50 CNN</strong> for local spatial feature extraction and a scratch-trained <strong className="text-[#1A1A14] dark:text-[#E8E6DF] font-semibold">Vision Transformer</strong> for global context. These two streams fuse through a dual-stage bidirectional cross-attention mechanism — first dense, then sparse top-K routing — before a 768-D concatenated head classifies 11 disease classes.
                        </p>
                    </div>
                    <div className="rounded-3xl border border-[#E9D5FF] dark:border-[#2E1F5E] bg-[#FEFCFF] dark:bg-[#100D1A] overflow-hidden p-4">
                        <Image
                            src="/arch-bidcnet.png"
                            alt="BiDCNet Bidirectional Dual Cross-attention Network architecture diagram"
                            width={1200}
                            height={700}
                            className="w-full h-auto rounded-2xl"
                            priority
                        />
                    </div>
                    <p className="mt-3 text-[12px] text-[#9E9E8A] dark:text-[#606860] text-center">
                        Figure 1 — BiDCNet (Proposed): ResNet-50 CNN encoder + ViT branch → Dual-Stage Cross-Attention → Fusion & Classification Head
                    </p>
                </section>

                {/* ── System Flow Diagram ───────────────────────────── */}
                <section>
                    <div className="mb-6">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9E9E8A] dark:text-[#606860] mb-2">End-to-End Flow</p>
                        <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight">System Data Flow</h2>
                        <p className="mt-3 text-[14px] text-[#555546] dark:text-[#A0A898] leading-relaxed max-w-2xl">
                            The client UI uploads a leaf image to the <strong className="text-[#1A1A14] dark:text-[#E8E6DF] font-semibold">FastAPI server</strong>, which forwards it to the <strong className="text-[#1A1A14] dark:text-[#E8E6DF] font-semibold">BiDCNet Engine</strong> for multi-model inference. The XAI Processor generates Grad-CAM++ heatmaps from extracted features, while assets are stored in Cloudinary and transaction logs saved to Neon PostgreSQL.
                        </p>
                    </div>
                    <div className="rounded-3xl border border-[#BBF7D0] dark:border-[#1A3828] bg-[#FCFFFD] dark:bg-[#0C110D] overflow-hidden p-4">
                        <Image
                            src="/arch-system-flow.png"
                            alt="TomatoGuard AI system data flow diagram showing Client UI, FastAPI Server, BiDCNet Engine, XAI Processor, Cloudinary and Neon Database connections"
                            width={1200}
                            height={700}
                            className="w-full h-auto rounded-2xl"
                        />
                    </div>
                    <p className="mt-3 text-[12px] text-[#9E9E8A] dark:text-[#606860] text-center">
                        Figure 2 — System Flow: Next.js Client UI → FastAPI API Layer → BiDCNet Engine → XAI Processor → Neon DB & Cloudinary
                    </p>
                </section>

                {/* ── Layer Breakdown ───────────────────────────────── */}
                <section>
                    <div className="mb-8">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9E9E8A] dark:text-[#606860] mb-2">Layer Breakdown</p>
                        <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight">System Layers</h2>
                    </div>
                    <div className="space-y-3">
                        {LAYERS.map((layer, i) => (
                            <React.Fragment key={layer.num}>
                                <div className={cn("rounded-2xl border px-6 py-5 flex items-center gap-5", layer.color.bg, layer.color.border)}>
                                    <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0", layer.color.iconBg, layer.color.iconText)}>
                                        {layer.icon}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={cn("text-[10px] font-bold uppercase tracking-widest", layer.color.numText)}>Layer {layer.num}</span>
                                        </div>
                                        <h3 className="font-semibold text-[14px] text-[#1A1A14] dark:text-[#E8E6DF] leading-tight mb-1">{layer.title}</h3>
                                        <p className="text-[13px] text-[#555546] dark:text-[#A0A898] leading-relaxed">{layer.desc}</p>
                                    </div>
                                </div>
                                {i < LAYERS.length - 1 && (
                                    <div className="flex justify-center py-0.5">
                                        <ArrowDown size={14} className="text-[#9E9E8A]/40 dark:text-[#606860]/40" />
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </section>

                {/* ── Model Specs Table ─────────────────────────────── */}
                <section>
                    <div className="mb-8">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9E9E8A] dark:text-[#606860] mb-2">Ensemble Models</p>
                        <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight">Model Specifications</h2>
                    </div>
                    <div className="space-y-3">
                        {MODEL_SPECS.map((m) => (
                            <div key={m.name} className={cn("rounded-2xl border p-5", m.bg, m.border)}>
                                <div className="flex items-start justify-between gap-4 flex-wrap">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                                            <span className="font-semibold text-[14px] text-[#1A1A14] dark:text-[#E8E6DF]">{m.name}</span>
                                            <span className={cn("text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border", m.badge)}>{m.type}</span>
                                        </div>
                                        <p className="text-[13px] text-[#555546] dark:text-[#A0A898]">{m.details}</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <div className={cn("text-xl font-bold tabular-nums", m.accColor)}>{m.acc}</div>
                                        <div className="text-[11px] text-[#9E9E8A] dark:text-[#606860]">{m.params}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
}
