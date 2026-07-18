import React from "react";
import { ChevronRight, Globe, Server, Database, Image as ImageIcon, Cloud, Cpu, Eye, Brain, Code2, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

export const dynamic = "force-static";

const STACK_GROUPS = [
    {
        label: "Core Frameworks",
        color: { bg: "bg-[#F8F4FF] dark:bg-[#18122A]", border: "border-[#E9D5FF] dark:border-[#3B2565]", dot: "bg-[#8B5CF6]" },
        items: [
            { icon: <Globe size={18} />, name: "Next.js 16.2", detail: "App Router · React Server Components · Static Generation",
              iconBg: "bg-[#E9D5FF] dark:bg-[#5B21B6]/30", iconColor: "text-[#6D28D9] dark:text-[#C084FC]" },
            { icon: <Layers size={18} />, name: "Tailwind CSS v4", detail: "Utility-first CSS with custom design tokens and dark mode",
              iconBg: "bg-[#E9D5FF] dark:bg-[#5B21B6]/30", iconColor: "text-[#6D28D9] dark:text-[#C084FC]" },
            { icon: <Server size={18} />, name: "FastAPI (Python)", detail: "High-performance async API server with automatic OpenAPI docs",
              iconBg: "bg-[#E9D5FF] dark:bg-[#5B21B6]/30", iconColor: "text-[#6D28D9] dark:text-[#C084FC]" },
        ],
    },
    {
        label: "AI & Machine Learning",
        color: { bg: "bg-[#EAF6FF] dark:bg-[#0C1A26]", border: "border-[#BFDBFE] dark:border-[#1E3A5F]", dot: "bg-[#3B82F6]" },
        items: [
            { icon: <Cpu size={18} />, name: "PyTorch 2.6", detail: "Deep learning framework powering BiDCNet, CoAtNet, MaxViT, NextViT",
              iconBg: "bg-[#BFDBFE] dark:bg-[#1D4ED8]/30", iconColor: "text-[#1E40AF] dark:text-[#60A5FA]" },
            { icon: <Eye size={18} />, name: "Grad-CAM++", detail: "Explainable AI visualization for class activation mapping",
              iconBg: "bg-[#BFDBFE] dark:bg-[#1D4ED8]/30", iconColor: "text-[#1E40AF] dark:text-[#60A5FA]" },
            { icon: <Brain size={18} />, name: "Groq AI (Llama-4-Scout)", detail: "Ultra-fast LLM inference for automated clinical report generation",
              iconBg: "bg-[#BFDBFE] dark:bg-[#1D4ED8]/30", iconColor: "text-[#1E40AF] dark:text-[#60A5FA]" },
        ],
    },
    {
        label: "Infrastructure & Cloud",
        color: { bg: "bg-[#F0FFF4] dark:bg-[#0E2018]", border: "border-[#BBF7D0] dark:border-[#1A3828]", dot: "bg-[#10B981]" },
        items: [
            { icon: <Database size={18} />, name: "Neon PostgreSQL", detail: "Serverless PostgreSQL for scan records, patient history, and analytics",
              iconBg: "bg-[#BBF7D0] dark:bg-[#065F46]/30", iconColor: "text-[#065F46] dark:text-[#34D399]" },
            { icon: <ImageIcon size={18} />, name: "Cloudinary", detail: "CDN-powered image hosting with automatic optimization and delivery",
              iconBg: "bg-[#BBF7D0] dark:bg-[#065F46]/30", iconColor: "text-[#065F46] dark:text-[#34D399]" },
            { icon: <Cloud size={18} />, name: "Vercel + Render", detail: "Vercel for frontend edge deployment · Render for Python inference backend",
              iconBg: "bg-[#BBF7D0] dark:bg-[#065F46]/30", iconColor: "text-[#065F46] dark:text-[#34D399]" },
        ],
    },
];

const MODELS = [
    { name: "BiDCNet (Proposed)", acc: "99.03%", label: "Primary", color: "text-[#065F46] dark:text-[#34D399]", badge: "bg-[#D1FAE5] dark:bg-[#065F46]/30 border-[#6EE7B7] dark:border-[#065F46] text-[#065F46] dark:text-[#34D399]" },
    { name: "CoAtNet", acc: "98.9%", label: "Supporting", color: "text-[#555546] dark:text-[#A0A898]", badge: "bg-[#F5F7FA] dark:bg-[#1F2428] border-[#E4E7EB] dark:border-[#2D3139] text-[#9E9E8A] dark:text-[#606860]" },
    { name: "MaxViT", acc: "98.8%", label: "Supporting", color: "text-[#555546] dark:text-[#A0A898]", badge: "bg-[#F5F7FA] dark:bg-[#1F2428] border-[#E4E7EB] dark:border-[#2D3139] text-[#9E9E8A] dark:text-[#606860]" },
    { name: "NextViT", acc: "98.7%", label: "Supporting", color: "text-[#555546] dark:text-[#A0A898]", badge: "bg-[#F5F7FA] dark:bg-[#1F2428] border-[#E4E7EB] dark:border-[#2D3139] text-[#9E9E8A] dark:text-[#606860]" },
];

export default function TechStackPage() {
    return (
        <div className="min-h-screen pb-32 text-[#1A1A14] dark:text-[#E8E6DF]">
            <div className="max-w-4xl mx-auto px-6 py-12 space-y-24">

                {/* Breadcrumb */}
                {/* <div className="flex items-center gap-2 opacity-70">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9E9E8A] dark:text-[#606860]">Research</span>
                    <ChevronRight className="w-3 h-3 text-[#9E9E8A]/50" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1E40AF] dark:text-[#60A5FA]">Tech Stack</span>
                </div> */}

                {/* Hero */}
                {/* <section>
                    <div className="inline-flex items-center gap-2 bg-[#EAF6FF] dark:bg-[#0C1A26] text-[#1E40AF] dark:text-[#60A5FA] text-[10px] font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#BFDBFE] dark:border-[#1E3A5F] mb-8">
                        <Code2 size={11} />
                        Technology Stack · Production-Grade
                    </div>
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight mb-6">
                        Technology<br />
                        <span className="text-[#1E40AF] dark:text-[#60A5FA]">Stack</span>
                    </h1>
                    <p className="text-lg text-[#555546] dark:text-[#A0A898] leading-relaxed max-w-2xl font-medium">
                        A carefully selected set of modern, production-grade technologies powering every layer of TomatoGuard AI — from the clinical frontend to the deep learning inference engine.
                    </p>
                </section> */}

                {/* Stack Groups */}
                <section>
                    <div className="mb-10">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9E9E8A] dark:text-[#606860] mb-2">Technology Breakdown</p>
                        <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight">Full Stack Overview</h2>
                    </div>
                    <div className="space-y-6">
                        {STACK_GROUPS.map((group) => (
                            <div key={group.label} className={cn("rounded-3xl border p-7", group.color.bg, group.color.border)}>
                                <div className="flex items-center gap-2 mb-6">
                                    <span className={cn("w-2 h-2 rounded-full", group.color.dot)} />
                                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#9E9E8A] dark:text-[#606860]">{group.label}</span>
                                </div>
                                <div className="space-y-4">
                                    {group.items.map((item) => (
                                        <div key={item.name} className="flex items-start gap-4">
                                            <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5", item.iconBg, item.iconColor)}>
                                                {item.icon}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-[14px] text-[#1A1A14] dark:text-[#E8E6DF] mb-0.5">{item.name}</div>
                                                <div className="text-[12px] text-[#555546] dark:text-[#A0A898]">{item.detail}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Model Accuracy Quick Reference */}
                <section>
                    <div className="mb-10">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9E9E8A] dark:text-[#606860] mb-2">AI Models</p>
                        <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight">Model Accuracy Reference</h2>
                    </div>
                    <div className="bg-[#F5F7FA] dark:bg-[#141618] border border-[#E4E7EB] dark:border-[#252A30] rounded-3xl overflow-hidden">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-[#E4E7EB] dark:border-[#252A30]">
                                    <th className="py-4 px-6 text-[11px] font-semibold uppercase tracking-widest text-[#9E9E8A] dark:text-[#606860]">Model</th>
                                    <th className="py-4 px-4 text-[11px] font-semibold uppercase tracking-widest text-[#9E9E8A] dark:text-[#606860]">Accuracy</th>
                                    <th className="py-4 px-6 text-[11px] font-semibold uppercase tracking-widest text-[#9E9E8A] dark:text-[#606860]">Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {MODELS.map((m) => (
                                    <tr key={m.name} className="border-b border-[#E4E7EB]/60 dark:border-[#252A30]/60 last:border-0">
                                        <td className="py-4 px-6 font-semibold text-[14px] text-[#1A1A14] dark:text-[#E8E6DF]">{m.name}</td>
                                        <td className={cn("py-4 px-4 text-[14px] font-semibold tabular-nums", m.color)}>{m.acc}</td>
                                        <td className="py-4 px-6">
                                            <span className={cn("text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border", m.badge)}>{m.label}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

            </div>
        </div>
    );
}
