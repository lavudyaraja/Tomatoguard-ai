import React from "react";
import { ChevronRight, Users, Microscope, GraduationCap, TreePine, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

export const dynamic = "force-static";

const USE_CASES = [
    {
        num: "01",
        icon: <Users size={22} />,
        title: "Smallholder Farmers",
        color: { bg: "bg-[#F0FFF4] dark:bg-[#0E2018]", border: "border-[#BBF7D0] dark:border-[#1A3828]", iconBg: "bg-[#BBF7D0] dark:bg-[#065F46]/40", iconText: "text-[#065F46] dark:text-[#34D399]", dot: "bg-[#10B981]", numText: "text-[#065F46] dark:text-[#34D399]", tagBg: "bg-[#BBF7D0] dark:bg-[#065F46]/20", tagBorder: "border-[#86EFAC] dark:border-[#065F46]", tagText: "text-[#065F46] dark:text-[#34D399]" },
        desc: "Providing expert-level disease diagnosis to farmers who do not have access to an on-site agricultural pathologist. A single photo taken with a smartphone delivers instant, actionable results — no technical expertise required.",
        bullets: [
            "Instant diagnosis without needing expert consultation",
            "Actionable treatment recommendations tailored to severity",
            "Works on any device with a camera — no specialized hardware",
            "Available in under 5 seconds per scan",
        ],
        tags: ["Rural Access", "Mobile-Friendly", "Instant Diagnosis"],
    },
    {
        num: "02",
        icon: <TreePine size={22} />,
        title: "Greenhouse Management",
        color: { bg: "bg-[#EAF6FF] dark:bg-[#0C1A26]", border: "border-[#BFDBFE] dark:border-[#1E3A5F]", iconBg: "bg-[#BFDBFE] dark:bg-[#1D4ED8]/40", iconText: "text-[#1E40AF] dark:text-[#60A5FA]", dot: "bg-[#3B82F6]", numText: "text-[#1E40AF] dark:text-[#60A5FA]", tagBg: "bg-[#BFDBFE] dark:bg-[#1D4ED8]/20", tagBorder: "border-[#93C5FD] dark:border-[#1E3A5F]", tagText: "text-[#1E40AF] dark:text-[#60A5FA]" },
        desc: "Continuous monitoring of controlled-environment crops to detect early-stage infections before they spread through entire greenhouse sections. Early detection can prevent total crop loss in high-density growing environments.",
        bullets: [
            "Detect early-stage infections before visible spread",
            "Track outbreak patterns across batches using patient history",
            "Ensemble confidence scoring for critical go/no-go decisions",
            "Image quality advisories for consistent lighting conditions",
        ],
        tags: ["Early Detection", "Batch Tracking", "Outbreak Prevention"],
    },
    {
        num: "03",
        icon: <Microscope size={22} />,
        title: "Agricultural Researchers",
        color: { bg: "bg-[#F5F0FF] dark:bg-[#130E22]", border: "border-[#DDD6FE] dark:border-[#2E1F5E]", iconBg: "bg-[#DDD6FE] dark:bg-[#5B21B6]/40", iconText: "text-[#5B21B6] dark:text-[#A78BFA]", dot: "bg-[#8B5CF6]", numText: "text-[#5B21B6] dark:text-[#A78BFA]", tagBg: "bg-[#DDD6FE] dark:bg-[#5B21B6]/20", tagBorder: "border-[#C4B5FD] dark:border-[#2E1F5E]", tagText: "text-[#5B21B6] dark:text-[#A78BFA]" },
        desc: "Using the historical archive and forensic visualization tools to track the effectiveness of different fungicides, organic treatments, and biosecurity protocols across multiple growing seasons.",
        bullets: [
            "Searchable historical archive for longitudinal studies",
            "Forensic XAI viewer for biological marker analysis",
            "Grad-CAM++ and Attention Rollout for hypothesis testing",
            "Export-ready scan data for academic publication",
        ],
        tags: ["Longitudinal Studies", "XAI Research", "Data Export"],
    },
    {
        num: "04",
        icon: <GraduationCap size={22} />,
        title: "Educational Tool",
        color: { bg: "bg-[#FFF7E8] dark:bg-[#201600]", border: "border-[#FDE68A] dark:border-[#44330A]", iconBg: "bg-[#FDE68A] dark:bg-[#92400E]/40", iconText: "text-[#92400E] dark:text-[#FBBF24]", dot: "bg-[#F59E0B]", numText: "text-[#92400E] dark:text-[#FBBF24]", tagBg: "bg-[#FDE68A] dark:bg-[#92400E]/20", tagBorder: "border-[#FCD34D] dark:border-[#44330A]", tagText: "text-[#92400E] dark:text-[#FBBF24]" },
        desc: "Helping students of plant pathology understand the visible activation markers of different tomato diseases through interactive heatmaps and pathology hotspot annotations — turning AI outputs into learning material.",
        bullets: [
            "Interactive Grad-CAM++ heatmaps for visual learning",
            "Pathology hotspot pins describing specific symptoms",
            "Side-by-side forensic comparison of leaf tissue vs. AI focus",
            "LLM-generated explanations bridging AI and botanical knowledge",
        ],
        tags: ["Plant Pathology", "Visual Learning", "Academic Use"],
    },
];

export default function UseCasesPage() {
    return (
        <div className="min-h-screen pb-32 text-[#1A1A14] dark:text-[#E8E6DF]">
            <div className="max-w-4xl mx-auto px-6 py-12 space-y-24">

                {/* Breadcrumb */}
                {/* <div className="flex items-center gap-2 opacity-70">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9E9E8A] dark:text-[#606860]">Research</span>
                    <ChevronRight className="w-3 h-3 text-[#9E9E8A]/50" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">Use Cases</span>
                </div> */}

                {/* Hero */}
                {/* <section>
                    <div className="inline-flex items-center gap-2 bg-[#F0FFF4] dark:bg-[#0E2018] text-[#065F46] dark:text-[#34D399] text-[10px] font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#BBF7D0] dark:border-[#1A3828] mb-8">
                        <Leaf size={11} />
                        Real-World Impact · 4 Use Cases
                    </div>
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight mb-6">
                        Real-World<br />
                        <span className="text-emerald-600 dark:text-emerald-400">Use Cases</span>
                    </h1>
                    <p className="text-lg text-[#555546] dark:text-[#A0A898] leading-relaxed max-w-2xl font-medium">
                        From smallholder farmers in remote regions to academic researchers tracking disease outbreaks — TomatoGuard AI is designed to serve multiple stakeholders across the agricultural ecosystem.
                    </p>
                </section> */}

                {/* Use Case Cards */}
                <section>
                    <div className="mb-10">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9E9E8A] dark:text-[#606860] mb-2">Applications</p>
                        <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight">Who Uses TomatoGuard AI</h2>
                    </div>
                    <div className="space-y-5">
                        {USE_CASES.map((uc) => (
                            <div key={uc.num} className={cn("rounded-3xl border p-8 transition-transform duration-300 hover:-translate-y-0.5", uc.color.bg, uc.color.border)}>
                                <div className="flex flex-col gap-6">
                                    {/* Header */}
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0", uc.color.iconBg, uc.color.iconText)}>
                                                {uc.icon}
                                            </div>
                                            <div>
                                                <span className={cn("text-[10px] font-bold uppercase tracking-widest", uc.color.numText)}>Use Case {uc.num}</span>
                                                <h3 className="font-semibold text-[17px] text-[#1A1A14] dark:text-[#E8E6DF] leading-tight">{uc.title}</h3>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-[14px] text-[#555546] dark:text-[#A0A898] leading-relaxed">{uc.desc}</p>

                                    {/* Bullets */}
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                        {uc.bullets.map((b, i) => (
                                            <li key={i} className="flex items-start gap-2.5">
                                                <span className={cn("w-1.5 h-1.5 rounded-full mt-1.5 shrink-0", uc.color.dot)} />
                                                <span className="text-[13px] text-[#444438] dark:text-[#A8A898] leading-relaxed">{b}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {uc.tags.map((tag) => (
                                            <span key={tag} className={cn("text-[10px] font-semibold px-2.5 py-1 rounded-full border", uc.color.tagBg, uc.color.tagBorder, uc.color.tagText)}>
                                                {tag}
                                            </span>
                                        ))}
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
