"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { History, Home, Info, FlaskConical, Sun, Moon, Upload } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/upload", label: "Upload", icon: Upload },
    { href: "/history", label: "History", icon: History },
    { href: "/research", label: "Research", icon: FlaskConical },
    { href: "/about", label: "About", icon: Info },
];

export function Navbar() {
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();

    return (
        <aside className="fixed bottom-0 left-0 w-full h-16 md:top-0 md:right-0 md:h-full md:w-16 z-50 flex flex-row md:flex-col items-center justify-center gap-2 border-t md:border-t-0 md:border-l border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
            <nav className="flex flex-row md:flex-col items-center gap-1 w-full md:w-auto px-4 md:px-0 justify-around md:justify-center">
                {navLinks.map((link) => {
                    const isActive = pathname === link.href || (link.href === "/upload" && pathname === "/results");
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`group relative flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-200
                                ${isActive
                                    ? "bg-primary/15 text-primary"
                                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                                }`}
                        >
                            <link.icon className="h-5 w-5" />

                            {/* Active pill (bottom on mobile, right on desktop) */}
                            {isActive && (
                                <span className="absolute bottom-0 md:bottom-auto md:right-0 md:top-1/2 md:-translate-y-1/2 md:translate-x-[1px] h-[3px] w-5 md:h-5 md:w-[3px] rounded-t-full md:rounded-l-full bg-primary" />
                            )}

                            {/* Tooltip (Desktop only) */}
                            <span className="hidden md:block pointer-events-none absolute right-14 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-card border border-border/80 px-2.5 py-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-150 shadow-lg">
                                {link.label}
                            </span>
                        </Link>
                    );
                })}

                {/* Divider (Desktop only) */}
                <div className="hidden md:block my-2 h-px w-6 bg-border/50" />

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="group relative flex h-11 w-11 items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-200"
                    aria-label="Toggle theme"
                >
                    {theme === "dark"
                        ? <Sun className="h-5 w-5" />
                        : <Moon className="h-5 w-5" />
                    }
                    <span className="hidden md:block pointer-events-none absolute right-14 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-card border border-border/80 px-2.5 py-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-150 shadow-lg">
                        {theme === "dark" ? "Light Mode" : "Dark Mode"}
                    </span>
                </button>
            </nav>
        </aside>
    );
}
