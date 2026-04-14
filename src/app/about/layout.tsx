"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Info, Target, FlaskConical,
    Layers, Cpu, Activity,
    Rocket, ChevronRight, Leaf
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";

const aboutLinks = [
    { href: "/about", label: "Overview", icon: Info },
    { href: "/about/problem", label: "The Problem", icon: Target },
    { href: "/about/solution", label: "Our Solution", icon: Activity },
    { href: "/about/architecture", label: "System Architecture", icon: FlaskConical },
    { href: "/about/features", label: "Core Features", icon: Layers },
    { href: "/about/tech-stack", label: "Tech Stack", icon: Cpu },
    { href: "/about/use-cases", label: "Use Cases", icon: Leaf },
    { href: "/about/future", label: "Future Roadmap", icon: Rocket },
];

export default function AboutLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Sidebar Navigation */}
                    <aside className="lg:w-72 flex-shrink-0">
                        <div className="sticky top-32 space-y-6">
                            <div className="px-4 py-2 hidden lg:block">
                                <h3 className="text-xs font-black uppercase tracking-[0.25em] text-muted-foreground/60 mb-1">Project Wiki</h3>
                                <p className="text-sm font-bold text-foreground">Documentation Hub</p>
                            </div>

                            <nav className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 gap-2 no-scrollbar scroll-smooth">
                                {aboutLinks.map((link) => {
                                    const isActive = pathname === link.href;
                                    return (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className={cn(
                                                "group flex items-center gap-3 px-4 py-2.5 lg:py-3 rounded-2xl transition-all duration-300 whitespace-nowrap lg:whitespace-normal shrink-0 lg:shrink",
                                                isActive
                                                    ? "bg-primary/10 text-primary border border-primary/20 shadow-sm"
                                                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground border border-transparent"
                                            )}
                                        >
                                            <link.icon className={cn("h-4 w-4 lg:h-4.5 lg:w-4.5", isActive ? "text-primary" : "text-muted-foreground/60")} />
                                            <span className="text-sm font-semibold">{link.label}</span>
                                            {isActive && <ChevronRight className="h-4 w-4 hidden lg:block" />}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>
                    </aside>

                    {/* Content Area */}
                    <main className="flex-1 min-w-0">
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
