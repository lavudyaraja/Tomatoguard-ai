import React from "react";
import { ChevronRight, AlertTriangle, Cpu, FlaskConical, Target, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const dynamic = "force-static";

const CORE_PROBLEMS = [
    { title: "Subjective Diagnosis", desc: "Visual inspection depends on human expertise and can lead to incorrect identification of diseases." },
    { title: "Delayed Detection", desc: "Diseases are often identified only after visible symptoms become severe, reducing intervention windows." },
    { title: "Limited Accessibility", desc: "Agricultural experts are not always available, especially in rural or remote farming regions." },
    { title: "Labor-Intensive Process", desc: "Manual inspection across large farms is inefficient, time-consuming, and unscalable." },
];

const TECH_CHALLENGES = [
    { title: "High Intra-Class Variability", desc: "The same disease can appear differently under varying environmental conditions, lighting, or crop age." },
    { title: "Low Inter-Class Differences", desc: "Different diseases may exhibit visually similar symptoms, making fine-grained classification difficult." },
    { title: "Complex Background Noise", desc: "Leaf images often contain cluttered backgrounds, shadows, and irregular lighting conditions." },
    { title: "Model Interpretability", desc: "Traditional deep learning models act as black boxes — predictions without explanations breed distrust." },
    { title: "Data Imbalance", desc: "Some disease classes have limited training examples, which affects model generalization." },
];

const EXISTING_GAPS = [
    "No explanation for predictions — low trust from farmers",
    "No actionable treatment recommendations",
    "Lack of real-time performance and scalability",
    "Poor user interface for non-technical users",
    "No uncertainty quantification — models don't indicate confidence",
    "No ensemble agreement — single-model predictions without consensus",
    "Limited explainability — basic Grad-CAM without attention visualization",
];

const SOLVED = [
    { num: "01", title: "Model Architecture & Integration", color: { bg: "bg-[#F0FFF4] dark:bg-[#0E2018]", border: "border-[#BBF7D0] dark:border-[#1A3828]", numText: "text-[#065F46] dark:text-[#34D399]", dot: "bg-[#10B981]" },
      problem: "Integrating BiDCNet with the existing ensemble pipeline", solution: "Implemented SCANet-P with ResNet-50 + ViT + Dual-Stage Cross-Attention, aligned checkpoint naming exactly to training artifacts." },
    { num: "02", title: "Explainable AI (XAI) Implementation", color: { bg: "bg-[#EAF6FF] dark:bg-[#0C1A26]", border: "border-[#BFDBFE] dark:border-[#1E3A5F]", numText: "text-[#1E40AF] dark:text-[#60A5FA]", dot: "bg-[#3B82F6]" },
      problem: "Grad-CAM failing with timm backbone structure", solution: "Corrected target layer to backbone.layer3[-1] for features_only=True models; used last Bottleneck block in layer3." },
    { num: "03", title: "Multi-Model Ensemble Coordination", color: { bg: "bg-[#F5F0FF] dark:bg-[#130E22]", border: "border-[#DDD6FE] dark:border-[#2E1F5E]", numText: "text-[#5B21B6] dark:text-[#A78BFA]", dot: "bg-[#8B5CF6]" },
      problem: "XAI only worked with CoAtNet/MaxViT, not BiDCNet", solution: "Updated XAI model selection to prioritize SCANet > CoAtNet > MaxViT > NextViT for all explainability modes." },
    { num: "04", title: "Research-to-Production Pipeline", color: { bg: "bg-[#FFF7E8] dark:bg-[#201600]", border: "border-[#FDE68A] dark:border-[#44330A]", numText: "text-[#92400E] dark:text-[#FBBF24]", dot: "bg-[#F59E0B]" },
      problem: "Translating academic research into production-ready features", solution: "Implemented ensemble metrics, entropy-based uncertainty, confusion warnings, severity assessment, and image quality analysis." },
];

const OBJECTIVES = [
    "Accurately detect and classify multiple tomato leaf diseases",
    "Provide explainable insights into model predictions",
    "Deliver real-time, user-friendly diagnostics",
    "Generate actionable treatment recommendations",
    "Be accessible to farmers without requiring technical expertise",
];

export default function ProblemPage() {
    return (
        <div className="min-h-screen pb-32 text-[#1A1A14] dark:text-[#E8E6DF]">
            <div className="max-w-4xl mx-auto px-6 py-12 space-y-24">

                {/* Breadcrumb */}
                {/* <div className="flex items-center gap-2 opacity-70">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9E9E8A] dark:text-[#606860]">Research</span>
                    <ChevronRight className="w-3 h-3 text-[#9E9E8A]/50" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-red-500 dark:text-red-400">The Problem</span>
                </div> */}

                {/* Hero */}
                {/* <section>
                    <div className="inline-flex items-center gap-2 bg-[#FFF1F2] dark:bg-[#200A0A] text-[#BE123C] dark:text-[#FB7185] text-[10px] font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#FECDD3] dark:border-[#4A1020] mb-8">
                        <AlertTriangle size={11} />
                        Problem Statement
                    </div>
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight mb-6">
                        The Gap Between<br />
                        <span className="text-red-600 dark:text-red-400">AI &amp; Agriculture</span>
                    </h1>
                    <p className="text-lg text-[#555546] dark:text-[#A0A898] leading-relaxed max-w-2xl font-medium">
                        Tomato cultivation faces an existential threat from plant diseases — yet existing detection methods remain slow, inaccessible, and opaque. Here's the challenge we set out to solve.
                    </p>
                </section> */}

                {/* Core Problems */}
                <section>
                    <div className="mb-10">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9E9E8A] dark:text-[#606860] mb-2">Root Causes</p>
                        <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight">Core Problem Areas</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {CORE_PROBLEMS.map((p, i) => (
                            <div key={p.title} className="bg-[#FFF1F2] dark:bg-[#1A0A0C] border border-[#FECDD3] dark:border-[#3A1018] rounded-3xl p-6 flex flex-col gap-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-[11px] font-bold text-[#BE123C] dark:text-[#FB7185] tabular-nums">0{i + 1}</span>
                                    <h3 className="font-semibold text-[14px] text-[#1A1A14] dark:text-[#E8E6DF]">{p.title}</h3>
                                </div>
                                <p className="text-[13px] text-[#6B5A5A] dark:text-[#A89898] leading-relaxed">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Technical Challenges */}
                <section>
                    <div className="mb-10">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9E9E8A] dark:text-[#606860] mb-2">Engineering Complexity</p>
                        <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight flex items-center gap-3">
                            <Cpu className="text-[#5B21B6] dark:text-[#A78BFA]" size={26} />
                            Technical Challenges
                        </h2>
                    </div>
                    <div className="bg-[#F5F0FF] dark:bg-[#130E22] border border-[#DDD6FE] dark:border-[#2E1F5E] rounded-3xl p-7 space-y-4">
                        {TECH_CHALLENGES.map((c) => (
                            <div key={c.title} className="flex items-start gap-4">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] mt-1.5 shrink-0" />
                                <div>
                                    <span className="text-[13px] font-semibold text-[#1A1A14] dark:text-[#E8E6DF]">{c.title} — </span>
                                    <span className="text-[13px] text-[#555546] dark:text-[#A0A898] leading-relaxed">{c.desc}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Gaps in Existing Solutions */}
                <section>
                    <div className="mb-10">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9E9E8A] dark:text-[#606860] mb-2">Industry Gaps</p>
                        <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight flex items-center gap-3">
                            <FlaskConical className="text-[#92400E] dark:text-[#FBBF24]" size={26} />
                            Limitations of Existing Solutions
                        </h2>
                    </div>
                    <div className="bg-[#FFF7E8] dark:bg-[#201600] border border-[#FDE68A] dark:border-[#44330A] rounded-3xl p-7 space-y-3">
                        {EXISTING_GAPS.map((g, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mt-1.5 shrink-0" />
                                <span className="text-[13px] text-[#6B5A4B] dark:text-[#A89C8F] leading-relaxed">{g}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Technical Challenges Solved */}
                <section>
                    <div className="mb-10">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9E9E8A] dark:text-[#606860] mb-2">Our Engineering Work</p>
                        <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight">Technical Challenges Solved</h2>
                    </div>
                    <div className="space-y-4">
                        {SOLVED.map((s) => (
                            <div key={s.num} className={cn("rounded-3xl border p-7", s.color.bg, s.color.border)}>
                                <div className="flex items-start gap-4">
                                    <span className={cn("text-[11px] font-bold tabular-nums shrink-0 mt-0.5", s.color.numText)}>{s.num}</span>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-[15px] text-[#1A1A14] dark:text-[#E8E6DF] mb-3">{s.title}</h3>
                                        <div className="space-y-2">
                                            <div className="flex items-start gap-2.5">
                                                <span className={cn("w-1.5 h-1.5 rounded-full mt-1.5 shrink-0", s.color.dot)} />
                                                <span className="text-[13px] text-[#555546] dark:text-[#A0A898]"><span className="font-semibold text-[#1A1A14] dark:text-[#E8E6DF]">Problem:</span> {s.problem}</span>
                                            </div>
                                            <div className="flex items-start gap-2.5">
                                                <span className={cn("w-1.5 h-1.5 rounded-full mt-1.5 shrink-0", s.color.dot)} />
                                                <span className="text-[13px] text-[#555546] dark:text-[#A0A898]"><span className="font-semibold text-[#1A1A14] dark:text-[#E8E6DF]">Resolution:</span> {s.solution}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Objectives */}
                <section>
                    <div className="rounded-3xl bg-[#F5F7FA] dark:bg-[#141618] border border-[#E4E7EB] dark:border-[#252A30] p-8">
                        <div className="flex items-center gap-2 text-[#065F46] dark:text-[#34D399] text-[10px] font-semibold uppercase tracking-widest mb-4">
                            <Target size={13} />
                            Key Objective
                        </div>
                        <h2 className="font-serif text-xl md:text-2xl font-semibold text-[#1A1A14] dark:text-[#E8E6DF] mb-2">What We Set Out to Build</h2>
                        <p className="text-[#555546] dark:text-[#A0A898] text-[14px] leading-relaxed mb-6 max-w-xl">
                            A robust, explainable, and scalable AI-driven diagnostic platform bridging advanced machine learning with real-world agricultural needs.
                        </p>
                        <ul className="space-y-3">
                            {OBJECTIVES.map((o, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <CheckCircle2 size={15} className="text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                                    <span className="text-[13px] text-[#555546] dark:text-[#A0A898] leading-relaxed">{o}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

            </div>
        </div>
    );
}