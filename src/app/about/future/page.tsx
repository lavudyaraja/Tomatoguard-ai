import React from "react";
import { ChevronRight, Wifi, Leaf, Smartphone, Map, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

export const dynamic = "force-static";

const ROADMAP = [
    {
        num: "01",
        icon: <Wifi size={22} />,
        title: "IoT Sensor Integration",
        phase: "Phase 1 · Near-Term",
        color: { bg: "bg-[#F0FFF4] dark:bg-[#0E2018]", border: "border-[#BBF7D0] dark:border-[#1A3828]", iconBg: "bg-[#BBF7D0] dark:bg-[#065F46]/40", iconText: "text-[#065F46] dark:text-[#34D399]", dot: "bg-[#10B981]", numText: "text-[#065F46] dark:text-[#34D399]", phaseBg: "bg-[#D1FAE5] dark:bg-[#065F46]/30", phaseBorder: "border-[#6EE7B7] dark:border-[#065F46]", phaseText: "text-[#065F46] dark:text-[#34D399]" },
        desc: "Live data feeds from soil sensors and weather stations to provide predictive warnings about disease-conducive environmental conditions before symptoms even appear on leaves.",
        bullets: [
            "Integration with IoT soil moisture and pH sensors",
            "Weather station API feeds for humidity and temperature correlation",
            "Predictive disease risk scoring based on environmental data",
            "Real-time alert system for high-risk growing conditions",
        ],
    },
    {
        num: "02",
        icon: <Leaf size={22} />,
        title: "Multi-Crop Support",
        phase: "Phase 2 · Mid-Term",
        color: { bg: "bg-[#EAF6FF] dark:bg-[#0C1A26]", border: "border-[#BFDBFE] dark:border-[#1E3A5F]", iconBg: "bg-[#BFDBFE] dark:bg-[#1D4ED8]/40", iconText: "text-[#1E40AF] dark:text-[#60A5FA]", dot: "bg-[#3B82F6]", numText: "text-[#1E40AF] dark:text-[#60A5FA]", phaseBg: "bg-[#DBEAFE] dark:bg-[#1D4ED8]/30", phaseBorder: "border-[#93C5FD] dark:border-[#1E3A5F]", phaseText: "text-[#1E40AF] dark:text-[#60A5FA]" },
        desc: "Expanding the BiDCNet architecture and ensemble pipeline to support potatoes, grapes, peppers, and other high-value crops — leveraging transfer learning from the tomato dataset.",
        bullets: [
            "Transfer learning from tomato BiDCNet to new crop architectures",
            "Expanded disease database for potato, grape, and pepper pathologies",
            "Unified multi-crop dashboard with per-crop model selection",
            "Cross-crop disease pattern analysis and correlation",
        ],
    },
    {
        num: "03",
        icon: <Smartphone size={22} />,
        title: "Edge Inference Mobile App",
        phase: "Phase 3 · Mid-Term",
        color: { bg: "bg-[#F5F0FF] dark:bg-[#130E22]", border: "border-[#DDD6FE] dark:border-[#2E1F5E]", iconBg: "bg-[#DDD6FE] dark:bg-[#5B21B6]/40", iconText: "text-[#5B21B6] dark:text-[#A78BFA]", dot: "bg-[#8B5CF6]", numText: "text-[#5B21B6] dark:text-[#A78BFA]", phaseBg: "bg-[#EDE9FE] dark:bg-[#5B21B6]/30", phaseBorder: "border-[#C4B5FD] dark:border-[#2E1F5E]", phaseText: "text-[#5B21B6] dark:text-[#A78BFA]" },
        desc: "A lightweight mobile application capable of performing full disease diagnosis offline using ONNX or LiteRT model quantization — critical for rural areas with poor network connectivity.",
        bullets: [
            "ONNX / LiteRT model export for on-device inference",
            "Offline-first architecture with local scan caching",
            "Background sync when connectivity is restored",
            "iOS and Android native apps with camera integration",
        ],
    },
    {
        num: "04",
        icon: <Map size={22} />,
        title: "Community Disease Tracking",
        phase: "Phase 4 · Long-Term",
        color: { bg: "bg-[#FFF7E8] dark:bg-[#201600]", border: "border-[#FDE68A] dark:border-[#44330A]", iconBg: "bg-[#FDE68A] dark:bg-[#92400E]/40", iconText: "text-[#92400E] dark:text-[#FBBF24]", dot: "bg-[#F59E0B]", numText: "text-[#92400E] dark:text-[#FBBF24]", phaseBg: "bg-[#FEF3C7] dark:bg-[#92400E]/30", phaseBorder: "border-[#FCD34D] dark:border-[#44330A]", phaseText: "text-[#92400E] dark:text-[#FBBF24]" },
        desc: "Anonymous, location-based disease outbreak reporting to build real-time heatmaps at regional and national levels — enabling proactive biosecurity measures and agricultural policy decisions.",
        bullets: [
            "Privacy-first anonymous geolocation reporting",
            "Real-time regional disease outbreak heatmaps",
            "Integration with agricultural authorities and extension services",
            "Seasonal trend forecasting based on historical outbreak data",
        ],
    },
];

export default function FuturePage() {
    return (
        <div className="min-h-screen pb-32 text-[#1A1A14] dark:text-[#E8E6DF]">
            <div className="max-w-4xl mx-auto px-6 py-12 space-y-24">

                {/* Breadcrumb */}
                {/* <div className="flex items-center gap-2 opacity-70">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9E9E8A] dark:text-[#606860]">Research</span>
                    <ChevronRight className="w-3 h-3 text-[#9E9E8A]/50" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6D28D9] dark:text-[#C084FC]">Future Roadmap</span>
                </div> */}

                {/* Hero */}
                {/* <section>
                    <div className="inline-flex items-center gap-2 bg-[#F8F4FF] dark:bg-[#18122A] text-[#6D28D9] dark:text-[#C084FC] text-[10px] font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#E9D5FF] dark:border-[#3B2565] mb-8">
                        <Rocket size={11} />
                        Future Roadmap · 4 Phases
                    </div>
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight mb-6">
                        Future<br />
                        <span className="text-[#6D28D9] dark:text-[#C084FC]">Roadmap</span>
                    </h1>
                    <p className="text-lg text-[#555546] dark:text-[#A0A898] leading-relaxed max-w-2xl font-medium">
                        TomatoGuard AI is built for the long term. Here's our vision for expanding the platform beyond tomato disease detection into a comprehensive, multi-crop, globally connected agricultural intelligence network.
                    </p>
                </section> */}

                {/* Roadmap Cards */}
                <section>
                    <div className="mb-10">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9E9E8A] dark:text-[#606860] mb-2">Development Phases</p>
                        <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight">What's Coming Next</h2>
                    </div>
                    <div className="space-y-5">
                        {ROADMAP.map((item) => (
                            <div key={item.num} className={cn("rounded-3xl border p-8 transition-transform duration-300 hover:-translate-y-0.5", item.color.bg, item.color.border)}>
                                <div className="flex flex-col gap-6">
                                    {/* Header */}
                                    <div className="flex items-start justify-between gap-4 flex-wrap">
                                        <div className="flex items-center gap-4">
                                            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0", item.color.iconBg, item.color.iconText)}>
                                                {item.icon}
                                            </div>
                                            <div>
                                                <span className={cn("text-[10px] font-bold uppercase tracking-widest", item.color.numText)}>Phase {item.num}</span>
                                                <h3 className="font-semibold text-[17px] text-[#1A1A14] dark:text-[#E8E6DF] leading-tight">{item.title}</h3>
                                            </div>
                                        </div>
                                        <span className={cn("text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full border whitespace-nowrap", item.color.phaseBg, item.color.phaseBorder, item.color.phaseText)}>
                                            {item.phase}
                                        </span>
                                    </div>

                                    {/* Description */}
                                    <p className="text-[14px] text-[#555546] dark:text-[#A0A898] leading-relaxed">{item.desc}</p>

                                    {/* Bullets */}
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                        {item.bullets.map((b, i) => (
                                            <li key={i} className="flex items-start gap-2.5">
                                                <span className={cn("w-1.5 h-1.5 rounded-full mt-1.5 shrink-0", item.color.dot)} />
                                                <span className="text-[13px] text-[#444438] dark:text-[#A8A898] leading-relaxed">{b}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Vision Note */}
                <section>
                    <div className="rounded-3xl bg-[#F8F4FF] dark:bg-[#18122A] border border-[#E9D5FF] dark:border-[#3B2565] p-8 flex items-start gap-5">
                        <div className="w-11 h-11 rounded-2xl bg-[#E9D5FF] dark:bg-[#5B21B6]/40 flex items-center justify-center shrink-0">
                            <Rocket size={20} className="text-[#6D28D9] dark:text-[#C084FC]" />
                        </div>
                        <div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-[#6D28D9] dark:text-[#C084FC] mb-2">Long-Term Vision</div>
                            <h2 className="font-serif text-xl font-semibold text-[#1A1A14] dark:text-[#E8E6DF] mb-2">Towards Global Agricultural Intelligence</h2>
                            <p className="text-[#555546] dark:text-[#A0A898] text-[14px] leading-relaxed">
                                Our ultimate goal is an open, federated agricultural AI network — where anonymized crop health data from millions of farms worldwide drives better predictive models, earlier outbreak detection, and more resilient global food systems.
                            </p>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
