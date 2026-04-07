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
        <aside className="fixed top-0 right-0 h-full w-16 z-50 flex flex-col items-center justify-center gap-2">
            <nav className="flex flex-col items-center gap-1">
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

                            {/* Active pill */}
                            {isActive && (
                                <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[1px] h-5 w-[3px] rounded-l-full bg-primary" />
                            )}

                            {/* Tooltip */}
                            <span className="pointer-events-none absolute right-14 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-card border border-border/80 px-2.5 py-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                                {link.label}
                            </span>
                        </Link>
                    );
                })}

                {/* Divider */}
                <div className="my-2 h-px w-6 bg-border/50" />

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
                    <span className="pointer-events-none absolute right-14 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-card border border-border/80 px-2.5 py-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                        {theme === "dark" ? "Light Mode" : "Dark Mode"}
                    </span>
                </button>
            </nav>
        </aside>
    );
}
