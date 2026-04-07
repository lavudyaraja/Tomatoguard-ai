"use client";

import { useState } from "react";
import { Leaf, Mail, Globe, ArrowRight, CheckCircle2, Loader2, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/* ─────────────────────── data ─────────────────────── */
const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/upload", label: "Upload & Analyze" },
    { href: "/history", label: "Inference History" },
    { href: "/research", label: "Research Dashboard" },
    { href: "/about", label: "Disease Database" },
];

const DISEASES = [
    { name: "Bacterial Spot", severity: "high" },
    { name: "Early Blight", severity: "medium" },
    { name: "Late Blight", severity: "high" },
    { name: "Leaf Mold", severity: "medium" },
    { name: "Septoria Leaf Spot", severity: "medium" },
    { name: "Spider Mites", severity: "low" },
    { name: "Target Spot", severity: "medium" },
    { name: "Yellow Leaf Curl Virus", severity: "high" },
    { name: "Tomato Mosaic Virus", severity: "high" },
    { name: "Powdery Mildew", severity: "low" },
    { name: "Healthy Plant", severity: "none" },
];

const TECH_STACK = [
    { label: "MaxViT (Multi-Axis ViT)", color: "bg-purple-500" },
    { label: "PyTorch Inference Backend", color: "bg-orange-500" },
    { label: "Next.js 15 · App Router", color: "bg-yellow-500" },
    { label: "Neon Serverless PostgreSQL", color: "bg-blue-500" },
    { label: "FastAPI · Python 3.11", color: "bg-emerald-500" },
    { label: "Tailwind CSS v4", color: "bg-cyan-500" },
    { label: "Vercel + Render Deploy", color: "bg-pink-500" },
];

const SEVERITY_COLOR: Record<string, string> = {
    high: "bg-red-500/70",
    medium: "bg-yellow-500/70",
    low: "bg-sky-500/70",
    none: "bg-emerald-500",
};

/* ─────────────────────── newsletter ─────────────────────── */
function Newsletter() {
    const [email, setEmail] = useState("");
    const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.includes("@")) { setState("error"); return; }
        setState("loading");
        await new Promise(r => setTimeout(r, 1200)); // mock
        setState("done");
    };

    if (state === "done") {
        return (
            <div className="flex items-center gap-2.5 text-emerald-400 text-sm font-semibold mt-4">
                <CheckCircle2 className="h-5 w-5" />
                You&apos;re subscribed! Thanks for joining.
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="mt-4 space-y-2.5">
            <p className="text-xs text-muted-foreground leading-relaxed">
                Get updates on model improvements, new disease classes, and research publications.
            </p>
            <div className="flex gap-2">
                <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value); setState("idle"); }}
                    className={cn(
                        "h-9 text-xs bg-background/60 border-border/60 focus:border-primary/50",
                        state === "error" && "border-destructive focus:border-destructive"
                    )}
                />
                <Button type="submit" size="sm"
                    className="h-9 px-3 gradient-emerald font-bold hover:scale-105 transition-all flex-shrink-0">
                    {state === "loading"
                        ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        : <ArrowRight className="h-3.5 w-3.5" />
                    }
                </Button>
            </div>
            {state === "error" && (
                <p className="text-[11px] text-destructive font-medium">Please enter a valid email address.</p>
            )}
        </form>
    );
}

/* ─────────────────────── footer ─────────────────────── */
export function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-border/40 bg-card/20 mt-auto">

            {/* ── Main grid ── */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                {/* ── Brand & newsletter ── */}
                <div className="sm:col-span-2 lg:col-span-1">
                    <Link href="/" className="flex items-center gap-2.5 mb-5 group w-fit">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-emerald shadow-sm">
                            <Leaf className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-base font-extrabold tracking-tight text-gradient-emerald">
                            TomatoGuard AI
                        </span>
                    </Link>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                        AI-powered tomato disease detection built on MaxViT — trained on{" "}
                        <span className="text-foreground font-semibold">24,009 agricultural images</span> across{" "}
                        <span className="text-foreground font-semibold">11 disease classes</span>.
                    </p>

                    {/* social links */}
                    <div className="flex items-center gap-2.5 mb-1">
                        {[
                            // { href: "https://github.com", icon: Github, label: "GitHub" },
                            { href: "mailto:contact@tomatoguard.ai", icon: Mail, label: "Email" },
                            { href: "#", icon: Globe, label: "Website" },
                        ].map(({ href, icon: Icon, label }) => (
                            <Link key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined}
                                rel="noopener noreferrer" aria-label={label}
                                className="h-9 w-9 rounded-lg bg-accent/30 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent/60 hover:border-border/80 transition-all">
                                <Icon className="h-4 w-4" />
                            </Link>
                        ))}
                    </div>

                    {/* newsletter */}
                    <div className="mt-6 pt-5 border-t border-border/40">
                        <p className="text-xs font-bold text-foreground uppercase tracking-wider mb-1">Stay Updated</p>
                        <Newsletter />
                    </div>
                </div>

                {/* ── Navigation ── */}
                <div>
                    <h4 className="text-xs font-bold mb-5 text-foreground uppercase tracking-widest">Navigation</h4>
                    <ul className="space-y-3">
                        {NAV_LINKS.map(link => (
                            <li key={link.href}>
                                <Link href={link.href}
                                    className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
                                    <span className="h-px w-3 bg-border group-hover:w-5 group-hover:bg-primary transition-all duration-200" />
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Research link */}
                    <div className="mt-6 pt-5 border-t border-border/40">
                        <h4 className="text-xs font-bold mb-3 text-foreground uppercase tracking-widest">Resources</h4>
                        <ul className="space-y-2.5">
                            {[
                                { href: "/research", label: "Research Paper" },
                                { href: "https://github.com", label: "Source Code", external: true },
                                { href: "/about", label: "Disease Guide" },
                            ].map(r => (
                                <li key={r.label}>
                                    <Link href={r.href} target={r.external ? "_blank" : undefined}
                                        rel={r.external ? "noopener noreferrer" : undefined}
                                        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
                                        {r.label}
                                        {r.external && <ExternalLink className="h-3 w-3" />}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* ── Disease classes ── */}
                <div>
                    <h4 className="text-xs font-bold mb-5 text-foreground uppercase tracking-widest">Detectable Diseases</h4>
                    <ul className="space-y-2">
                        {DISEASES.map(d => (
                            <li key={d.name} className="flex items-center gap-2 group">
                                <span className={cn(
                                    "h-1.5 w-1.5 rounded-full flex-shrink-0 transition-transform group-hover:scale-125",
                                    SEVERITY_COLOR[d.severity]
                                )} />
                                <span className="text-xs text-muted-foreground font-medium group-hover:text-foreground transition-colors">
                                    {d.name}
                                </span>
                            </li>
                        ))}
                    </ul>

                    {/* severity key */}
                    <div className="mt-5 pt-4 border-t border-border/40 flex gap-3 text-[10px] text-muted-foreground font-semibold">
                        <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-red-500/70" /> High</span>
                        <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-yellow-500/70" /> Medium</span>
                        <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-sky-500/70" /> Low</span>
                        <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Healthy</span>
                    </div>
                </div>

                {/* ── Tech stack ── */}
                <div>
                    <h4 className="text-xs font-bold mb-5 text-foreground uppercase tracking-widest">Technology</h4>
                    <ul className="space-y-2.5">
                        {TECH_STACK.map(t => (
                            <li key={t.label} className="flex items-center gap-2.5 group">
                                <span className={cn("h-1.5 w-1.5 rounded-full flex-shrink-0 transition-transform group-hover:scale-125", t.color)} />
                                <span className="text-xs text-muted-foreground font-medium group-hover:text-foreground transition-colors">
                                    {t.label}
                                </span>
                            </li>
                        ))}
                    </ul>

                    {/* model card */}
                    <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/15 space-y-2.5">
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Trained on the{" "}
                            <Link href="https://plantvillage.psu.edu" target="_blank" rel="noopener noreferrer"
                                className="text-primary font-semibold hover:underline underline-offset-2">
                                PlantVillage dataset
                            </Link>{" "}
                            with augmentation — achieving{" "}
                            <span className="text-primary font-bold">99.2% validation accuracy</span>{" "}
                            across all 11 classes.
                        </p>
                        <Link href="/research"
                            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-primary hover:underline underline-offset-2">
                            View full research report <ArrowRight className="h-3 w-3" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* ── Bottom bar ── */}
            <div className="border-t border-border/40 bg-background/30">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="text-xs text-muted-foreground font-medium">
                        © {year} TomatoGuard AI — Built for agricultural research excellence.
                    </span>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium">
                        <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-primary transition-colors">Terms of Use</Link>
                        <span className="flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            System Online · Neon DB Connected
                        </span>
                    </div>
                </div>
            </div>
        </footer >
    );
}