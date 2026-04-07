"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Leaf, ShieldCheck, Database, Zap, Binary, Cpu } from "lucide-react";

const stats = [
    {
        label: "Training Data",
        value: "24,009",
        description: "Augmented dataset",
        icon: Database,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
    },
    {
        label: "Diseases",
        value: "11",
        description: "Multi-class detection",
        icon: Leaf,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
    },
    {
        label: "Model",
        value: "MaxViT",
        description: "Shifted windows",
        icon: Cpu,
        color: "text-purple-500",
        bg: "bg-purple-500/10",
    },
    {
        label: "Speed",
        value: "35ms",
        description: "Inference latency",
        icon: Zap,
        color: "text-yellow-500",
        bg: "bg-yellow-500/10",
    },
];

export function Stats() {
    return (
        <section className="py-24 animate-fade-in">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {stats.map((stat, idx) => (
                    <Card
                        key={idx}
                        className="border-none bg-card/40 backdrop-blur-md hover:bg-card/60 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5"
                    >
                        <CardContent className="p-6">
                            <div className={`${stat.bg} h-12 w-12 rounded-xl flex items-center justify-center ${stat.color} mb-4`}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-2xl font-bold tracking-tight">{stat.value}</h3>
                            <p className="text-sm font-semibold">{stat.label}</p>
                            <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
