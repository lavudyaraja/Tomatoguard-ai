"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Leaf, ShieldCheck, Zap, Binary, ChevronDown, Microscope, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─────────────────────── animated counter ─────────────────────── */
function Counter({ to, suffix = "", duration = 1800 }: { to: number; suffix?: string; duration?: number }) {
    const [value, setValue] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const started = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !started.current) {
                started.current = true;
                const start = performance.now();
                const animate = (now: number) => {
                    const pct = Math.min((now - start) / duration, 1);
                    // ease-out-expo
                    const eased = pct === 1 ? 1 : 1 - Math.pow(2, -10 * pct);
                    setValue(Math.floor(eased * to));
                    if (pct < 1) requestAnimationFrame(animate);
                };
                requestAnimationFrame(animate);
            }
        }, { threshold: 0.3 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [to, duration]);

    return <span ref={ref}>{value.toLocaleString()}{suffix}</span>;
}

/* ─────────────────────── feature card ─────────────────────── */
interface FeatureProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    accent: string;
    delay?: string;
}
function FeatureCard({ icon, title, description, accent, delay = "0ms" }: FeatureProps) {
    return (
        <div
            className="group relative p-6 rounded-2xl bg-card/40 border border-border/50 hover:border-primary/30 hover:bg-card/70 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/5 animate-fade-in"
            style={{ animationDelay: delay }}
        >
            <div className={cn("h-11 w-11 rounded-xl flex items-center justify-center mb-4 border transition-transform group-hover:scale-110", accent)}>
                {icon}
            </div>
            <h3 className="font-bold text-base mb-1.5 tracking-tight">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
    );
}

/* ─────────────────────── stat pill ─────────────────────── */
function StatPill({ value, label, color }: { value: React.ReactNode; label: string; color: string }) {
    return (
        <div className="flex flex-col items-center gap-1 px-3 sm:px-6 py-3 sm:py-4 rounded-2xl bg-card/50 border border-border/50">
            <span className={cn("text-2xl sm:text-3xl font-extrabold tabular-nums tracking-tight", color)}>{value}</span>
            <span className="text-[10px] sm:text-xs text-muted-foreground font-medium text-center leading-tight uppercase tracking-wider">{label}</span>
        </div>
    );
}

/* ─────────────────────── hero ─────────────────────── */
export function Hero() {
    const router = useRouter();

    return (
        <div className="relative overflow-hidden bg-background">

            {/* ── Ambient background ── */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute top-[-10%] left-1/3 h-[500px] w-[500px] rounded-full bg-emerald-500/8 blur-[130px]" />
                <div className="absolute bottom-0 right-[10%] h-80 w-80 rounded-full bg-teal-500/8 blur-[100px]" />
                <div className="absolute top-1/2 left-0 h-48 w-48 rounded-full bg-emerald-700/6 blur-[80px]" />
                {/* subtle grid */}
                <div
                    className="absolute inset-0 opacity-[0.015]"
                    style={{
                        backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
                        backgroundSize: "48px 48px",
                    }}
                />
            </div>

            {/* ── Hero content ── */}
            <section className="relative z-10 py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-5xl text-center space-y-8">

                    {/* version badge */}
                    <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/25 bg-emerald-500/8 px-4 py-1.5 animate-fade-in">
                        <Badge variant="outline" className="border-primary/40 text-primary text-[9px] tracking-[0.15em] font-bold uppercase px-2">
                            v2.0
                        </Badge>
                        <span className="text-xs font-semibold text-emerald-400 tracking-wide">
                            MaxViT Multi-Axis Vision Transformer
                        </span>
                    </div>

                    {/* headline */}
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] sm:leading-[1.07] animate-slide-up">
                        Protect Your Crops
                        <span className="block text-gradient-emerald mt-2">
                            Detect Diseases in Seconds
                        </span>
                    </h1>

                    {/* sub */}
                    <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto animate-fade-in delay-200">
                        Advanced real-time tomato disease identification powered by{" "}
                        <strong className="text-foreground">Multi-Axis Vision Transformer (MaxViT)</strong>.
                        Trained on over <strong className="text-emerald-400">24,000</strong> augmented
                        agricultural leaf images across <strong className="text-emerald-400">11 disease classes</strong>.
                    </p>

                    {/* CTA buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 animate-fade-in delay-300">
                        <Button
                            size="lg"
                            onClick={() => router.push("/upload")}
                            className="gradient-emerald h-14 w-full sm:w-auto px-10 text-base font-bold hover:shadow-2xl hover:shadow-primary/25 hover:scale-105 transition-all duration-200"
                        >
                            <Leaf className="mr-2 h-5 w-5" /> Start Analyzing
                        </Button>
                        <Button
                            size="lg" variant="outline"
                            onClick={() => router.push("/research")}
                            className="h-14 w-full sm:w-auto px-9 text-base font-bold hover:bg-accent/20 border-border/60 hover:border-primary/40 transition-all duration-200 gap-2"
                        >
                            Read Research Paper <ExternalLink className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* trust signals */}
                    <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-muted-foreground animate-fade-in delay-500">
                        {[
                            { icon: ShieldCheck, text: "Privacy-Safe · No data stored", color: "text-emerald-500" },
                            { icon: Zap, text: "< 500ms inference", color: "text-yellow-500" },
                            { icon: Microscope, text: "PlantVillage trained", color: "text-sky-500" },
                        ].map(({ icon: Icon, text, color }) => (
                            <span key={text} className="flex items-center gap-1.5 font-medium">
                                <Icon className={cn("h-3.5 w-3.5", color)} />{text}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Stats strip ── */}
            <section className="relative z-10 border-y border-border/40 bg-card/20 py-10 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <StatPill
                        value={<Counter to={99} suffix=".2%" />}
                        label="Validation Accuracy"
                        color="text-emerald-400"
                    />
                    <StatPill
                        value={<Counter to={24009} />}
                        label="Training Images"
                        color="text-sky-400"
                    />
                    <StatPill
                        value={<>11</>}
                        label="Disease Classes"
                        color="text-purple-400"
                    />
                    <StatPill
                        value={<><Counter to={500} />ms</>}
                        label="Avg. Inference Time"
                        color="text-yellow-400"
                    />
                </div>
            </section>

            {/* ── Feature cards ── */}
            <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-5xl">
                    <div className="text-center mb-12 space-y-3">
                        <Badge variant="outline" className="border-primary/30 text-primary text-[10px] tracking-widest uppercase font-bold">
                            Why TomatoGuard
                        </Badge>
                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                            Built for real agricultural needs
                        </h2>
                        <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
                            From field to diagnosis in under a second — no agronomist required.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        <FeatureCard
                            icon={<ShieldCheck className="h-5.5 w-5.5 text-emerald-500" />}
                            title="Professional Diagnostics"
                            description="99.2% identification accuracy across 10 tomato diseases, validated on the PlantVillage benchmark dataset."
                            accent="bg-emerald-500/10 border-emerald-500/20"
                            delay="0ms"
                        />
                        <FeatureCard
                            icon={<Zap className="h-5.5 w-5.5 text-yellow-500" />}
                            title="Real-Time Inference"
                            description="Optimised PyTorch backend returns results in milliseconds — faster than any lab-based diagnostic tool."
                            accent="bg-yellow-500/10 border-yellow-500/20"
                            delay="80ms"
                        />
                        <FeatureCard
                            icon={<Binary className="h-5.5 w-5.5 text-sky-500" />}
                            title="Hybrid Architecture"
                            description="MaxViT combines local window and global grid attention for fine-grained leaf texture recognition."
                            accent="bg-sky-500/10 border-sky-500/20"
                            delay="160ms"
                        />
                    </div>
                </div>
            </section>

            {/* ── CTA band ── */}
            <section className="relative z-10 mx-4 sm:mx-6 lg:mx-auto max-w-5xl mb-20 rounded-3xl overflow-hidden border border-emerald-500/20 bg-gradient-to-br from-emerald-950/60 to-teal-950/40 px-8 py-12 text-center space-y-5">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-transparent" />
                <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 text-[10px] tracking-widest uppercase font-bold">
                    Free to Use
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight relative z-10">
                    Diagnose your first leaf in under 30 seconds
                </h2>
                <p className="text-sm text-muted-foreground max-w-md mx-auto relative z-10">
                    No account required. Just upload a photo and get an instant, actionable diagnosis with treatment recommendations.
                </p>
                <div className="flex flex-wrap gap-3 justify-center relative z-10">
                    <Button
                        size="lg"
                        onClick={() => router.push("/upload")}
                        className="gradient-emerald h-12 px-9 font-bold hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/25 transition-all"
                    >
                        <Leaf className="mr-2 h-4.5 w-4.5" /> Upload a Leaf Now
                    </Button>
                    <Button size="lg" variant="outline"
                        onClick={() => router.push("/about")}
                        className="h-12 px-7 font-semibold border-border/50 hover:border-primary/40 hover:bg-primary/5">
                        Disease Database <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Button>
                </div>
            </section>

            {/* ── Scroll nudge ── */}
            <div className="relative z-10 flex justify-center pb-8 animate-bounce opacity-40">
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
            </div>
        </div>
    );
}