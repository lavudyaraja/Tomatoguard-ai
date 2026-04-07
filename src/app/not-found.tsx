"use client";

import Link from "next/link";
import { MoveLeft, Leaf } from "lucide-react";
import { Navbar } from "@/components/navbar";

export default function NotFound() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow flex items-center justify-center p-6">
                <div className="max-w-md w-full text-center space-y-8">
                    <div className="flex justify-center">
                        <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                            <Leaf className="h-8 w-8 text-primary" />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h1 className="text-6xl font-extrabold tracking-tighter">404</h1>
                        <h2 className="text-2xl font-bold tracking-tight">Page Not Found</h2>
                        <p className="text-muted-foreground">
                            The page you are looking for doesn't exist or has been moved to a new location.
                        </p>
                    </div>

                    <div className="pt-4">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all"
                        >
                            <MoveLeft className="h-4 w-4" />
                            Back to Home
                        </Link>
                    </div>

                    <div className="pt-8 border-t border-border/50">
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
                            TomatoGuard AI System
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
