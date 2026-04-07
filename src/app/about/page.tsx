"use client";

import { Navbar } from "@/components/navbar";
import { useState } from "react";
import {
    Leaf, ShieldCheck, Zap, Binary, Database, Brain,
    TrendingUp, Cpu, Microscope, ChevronDown,
    Award, GitBranch, BarChart2, Layers,
} from "lucide-react";

const diseases = [
    { name: "Bacterial Spot", severity: "high", color: "bg-red-500/15 text-red-400 border-red-500/30", description: "Caused by Xanthomonas campestris; water-soaked lesions on leaves and fruit." },
    { name: "Early Blight", severity: "moderate", color: "bg-orange-500/15 text-orange-400 border-orange-500/30", description: "Alternaria solani fungus producing concentric ring lesions on older leaves." },
    { name: "Late Blight", severity: "critical", color: "bg-red-700/15 text-red-300 border-red-700/30", description: "Phytophthora infestans — the pathogen responsible for the Irish potato famine. Rapidly destructive." },
    { name: "Leaf Mold", severity: "moderate", color: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30", description: "Fulvia fulva causes yellowish patches on upper leaf surfaces under humid conditions." },
    { name: "Septoria Leaf Spot", severity: "high", color: "bg-orange-600/15 text-orange-300 border-orange-600/30", description: "Septoria lycopersici creates small, circular spots with dark brown borders." },
    { name: "Spider Mites", severity: "moderate", color: "bg-amber-500/15 text-amber-400 border-amber-500/30", description: "Two-spotted spider mite infestations causing stippling, bronzing, and webbing." },
    { name: "Target Spot", severity: "moderate", color: "bg-yellow-600/15 text-yellow-300 border-yellow-600/30", description: "Corynespora cassiicola forms distinctive target-like concentric rings on foliage." },
    { name: "Yellow Leaf Curl Virus", severity: "critical", color: "bg-red-800/15 text-red-200 border-red-800/30", description: "Tomato Yellow Leaf Curl Virus (TYLCV) spread by whiteflies; causes severe stunting." },
    { name: "Mosaic Virus", severity: "high", color: "bg-red-500/15 text-red-400 border-red-500/30", description: "Tobacco Mosaic Virus (TMV) creates mosaic-like mottling and fruit distortion." },
    { name: "Powdery Mildew", severity: "moderate", color: "bg-orange-400/15 text-orange-300 border-orange-400/30", description: "Leveillula taurica produces white powdery fungal growth on leaf surfaces." },
    { name: "Healthy Plant", severity: "none", color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30", description: "No disease detected. Leaf morphology appears within normal healthy parameters." },
];

const techStack = [
    { name: "MaxViT Architecture", desc: "Multi-Axis Vision Transformer for global + local feature extraction", icon: Brain, color: "text-purple-500 bg-purple-500/10", detail: "Processes 224×224 images through alternating local-window and dilated-grid attention blocks." },
    { name: "PyTorch Backend", desc: "High-performance deep learning inference", icon: Cpu, color: "text-orange-500 bg-orange-500/10", detail: "Serialized torchscript checkpoint with optional CUDA acceleration and torch.compile." },
    { name: "Next.js Frontend", desc: "App Router, Server Components & Streaming", icon: Zap, color: "text-yellow-500 bg-yellow-500/10", detail: "Full-stack React with image optimization, edge functions, and ISR support." },
    { name: "Neon PostgreSQL", desc: "Serverless cloud database with branching", icon: Database, color: "text-blue-500 bg-blue-500/10", detail: "Auto-scaling Postgres with connection pooling; predictions upserted atomically." },
    { name: "FastAPI Server", desc: "Python async REST API for model inference", icon: TrendingUp, color: "text-emerald-500 bg-emerald-500/10", detail: "Async endpoints with Pydantic validation, automatic OpenAPI docs, and CORS middleware." },
    { name: "Tailwind CSS v4", desc: "Utility-first CSS with design tokens", icon: Binary, color: "text-cyan-500 bg-cyan-500/10", detail: "Cascade layers, CSS variables, and arbitrary value support for precise theming." },
];

const modelStats = [
    { label: "Validation Accuracy", value: "99.2%", icon: Award, color: "text-emerald-500 bg-emerald-500/10" },
    { label: "Training Images", value: "24,009", icon: Layers, color: "text-blue-500 bg-blue-500/10" },
    { label: "Disease Classes", value: "11", icon: GitBranch, color: "text-purple-500 bg-purple-500/10" },
    { label: "Inference Latency", value: "<40ms", icon: BarChart2, color: "text-orange-500 bg-orange-500/10" },
];

const architecturePoints = [
    {
        title: "Multi-Axis Self-Attention",
        desc: "Combines local window attention with global dilated attention, capturing both fine-grained disease textures and global leaf patterns simultaneously — critical for distinguishing similar-looking conditions like Septoria vs. Early Blight.",
    },
    {
        title: "Hybrid CNN-Transformer",
        desc: "Fuses convolutional inductive biases with transformer scalability. Robust to varied image quality, lighting conditions, and leaf orientations common in field photography.",
    },
    {
        title: "Trained on PlantVillage Dataset",
        desc: "24,009 images with aggressive augmentation: rotations, horizontal/vertical flips, color jitter, Gaussian blur, and CutMix. Validated on a held-out 20% split achieving 99.2% accuracy.",
    },
    {
        title: "Serverless Inference Ready",
        desc: "Optimized PyTorch checkpoint runs efficiently across CPU and CUDA deployments with sub-40ms inference latency. Compatible with containerized cloud deployments.",
    },
];

function FAQItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border border-border/50 rounded-xl overflow-hidden">
            <button
                onClick={() => setOpen(o => !o)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors"
            >
                <span className="font-semibold text-sm">{q}</span>
                <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform flex-shrink-0 ml-3 ${open ? "rotate-180" : ""}`} />
            </button>
            {open && (
                <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-4">
                    {a}
                </div>
            )}
        </div>
    );
}

export default function AboutPage() {
    const [expandedDisease, setExpandedDisease] = useState<string | null>(null);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                {/* Hero */}
                <div className="relative py-20 bg-background border-b border-border/50 overflow-hidden">
                    <div className="absolute top-0 left-1/3 h-72 w-72 rounded-full bg-emerald-500/8 blur-[120px] pointer-events-none" />
                    <div className="absolute bottom-0 right-1/4 h-56 w-56 rounded-full bg-blue-500/6 blur-[100px] pointer-events-none" />
                    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 border border-primary/20 bg-primary/5 mb-6">
                            <Microscope className="h-4 w-4 text-primary" />
                            <span className="text-xs font-bold text-primary uppercase tracking-widest">About & Disease Database</span>
                        </div>
                        <h1 className="text-5xl font-extrabold tracking-tight mb-6">
                            Built for
                            <span className="text-gradient-emerald"> Agricultural AI Research</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            TomatoGuard AI leverages state-of-the-art Multi-Axis Vision Transformer (MaxViT) deep learning
                            to identify 11 different tomato plant conditions with industry-leading accuracy.
                        </p>
                    </div>
                </div>

                {/* Model Stats */}
                <div className="py-14 bg-muted/10 border-b border-border/50">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {modelStats.map((stat) => (
                                <div key={stat.label} className="p-6 rounded-2xl bg-card/40 border border-border/50 text-center hover:bg-card/70 transition-all">
                                    <div className={`h-12 w-12 rounded-xl ${stat.color} flex items-center justify-center mx-auto mb-3`}>
                                        <stat.icon className="h-6 w-6" />
                                    </div>
                                    <p className="text-3xl font-extrabold">{stat.value}</p>
                                    <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="py-20 border-b border-border/50">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-14">
                            <h2 className="text-3xl font-extrabold tracking-tight">Technology Stack</h2>
                            <p className="mt-3 text-muted-foreground text-lg">Production-grade tools powering every diagnosis</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {techStack.map((tech) => (
                                <div
                                    key={tech.name}
                                    className="p-6 rounded-2xl bg-card/40 border border-border/50 hover:bg-card/70 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/5 group"
                                >
                                    <div className={`h-12 w-12 rounded-xl ${tech.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                        <tech.icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="font-bold text-lg mb-1">{tech.name}</h3>
                                    <p className="text-sm text-muted-foreground mb-3">{tech.desc}</p>
                                    <p className="text-xs text-muted-foreground/60 leading-relaxed border-t border-border/30 pt-3">{tech.detail}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Disease Database */}
                <div className="py-20 bg-background border-b border-border/50">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-14">
                            <h2 className="text-3xl font-extrabold tracking-tight">Disease Detection Database</h2>
                            <p className="mt-3 text-muted-foreground text-lg">
                                11 tomato conditions classified by MaxViT · Click any card for details
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {diseases.map((disease) => {
                                const isExpanded = expandedDisease === disease.name;
                                return (
                                    <div
                                        key={disease.name}
                                        onClick={() => setExpandedDisease(isExpanded ? null : disease.name)}
                                        className={`p-4 rounded-xl border transition-all cursor-pointer select-none ${disease.color} ${isExpanded ? "shadow-lg scale-[1.02]" : "hover:scale-[1.02]"}`}
                                    >
                                        <div className="flex items-center justify-between gap-2.5 mb-2">
                                            <div className="flex items-center gap-2">
                                                <Leaf className="h-4 w-4 flex-shrink-0" />
                                                <span className="font-semibold text-sm">{disease.name}</span>
                                            </div>
                                            <ChevronDown className={`h-3.5 w-3.5 opacity-60 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                                        </div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-xs font-bold uppercase tracking-wider opacity-70">
                                                {disease.severity === "none" ? "OPTIMAL" : disease.severity}
                                            </span>
                                        </div>
                                        {isExpanded && (
                                            <p className="text-xs leading-relaxed opacity-75 border-t border-current/20 pt-2 mt-2">
                                                {disease.description}
                                            </p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Model Architecture */}
                <div className="py-20 bg-muted/10 border-b border-border/50">
                    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-extrabold tracking-tight">MaxViT Architecture</h2>
                            <p className="mt-3 text-muted-foreground text-lg">Why we chose Multi-Axis Vision Transformers</p>
                        </div>
                        <div className="space-y-4">
                            {architecturePoints.map((item) => (
                                <div
                                    key={item.title}
                                    className="flex gap-4 p-5 rounded-2xl bg-card/40 border border-border/50 hover:bg-card/60 transition-all"
                                >
                                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <ShieldCheck className="h-4 w-4 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-base mb-1">{item.title}</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* How It Works */}
                <div className="py-20 bg-background border-b border-border/50">
                    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-extrabold tracking-tight">How It Works</h2>
                            <p className="mt-3 text-muted-foreground text-lg">From image upload to diagnosis in under a second</p>
                        </div>
                        <div className="relative">
                            {/* Connecting line */}
                            <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-border/50 hidden sm:block" />
                            <div className="space-y-6">
                                {[
                                    { step: "01", title: "Upload Leaf Image", desc: "Drag & drop or click to upload a JPEG/PNG photo of your tomato leaf. We accept images up to 10MB." },
                                    { step: "02", title: "Preprocessing", desc: "The image is resized to 224×224, normalized with ImageNet mean/std, and converted to a tensor." },
                                    { step: "03", title: "MaxViT Inference", desc: "The preprocessed tensor passes through 32 MaxViT blocks alternating local-window and dilated-grid attention. FastAPI returns top-5 probabilities." },
                                    { step: "04", title: "Results & Storage", desc: "The top prediction and confidence are displayed. Results are upserted to Neon PostgreSQL for history tracking and analytics." },
                                ].map((item, i) => (
                                    <div key={i} className="relative flex gap-6 pl-0 sm:pl-16">
                                        <div className="absolute left-0 h-12 w-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 hidden sm:flex">
                                            <span className="text-xs font-extrabold text-primary">{item.step}</span>
                                        </div>
                                        <div className="p-5 rounded-2xl bg-card/40 border border-border/50 hover:bg-card/60 transition-all flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xs font-extrabold text-primary sm:hidden">{item.step}</span>
                                                <h3 className="font-bold text-base">{item.title}</h3>
                                            </div>
                                            <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <div className="py-20 bg-muted/10">
                    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-extrabold tracking-tight">Frequently Asked Questions</h2>
                        </div>
                        <div className="space-y-3">
                            <FAQItem
                                q="What image types are supported?"
                                a="TomatoGuard accepts JPEG and PNG images. For best results, use clear, well-lit photos of individual leaves with minimal background clutter. The model was trained on close-up leaf images from the PlantVillage dataset."
                            />
                            <FAQItem
                                q="How accurate is the model?"
                                a="The MaxViT model achieves 99.2% validation accuracy on the PlantVillage test split. Real-world accuracy may vary depending on image quality, lighting conditions, and whether the disease is within the 11 trained classes."
                            />
                            <FAQItem
                                q="Is my data stored permanently?"
                                a="Prediction metadata (disease class, confidence, timestamp) is stored in Neon PostgreSQL. Images are stored in cloud object storage if enabled. You can delete any record from the History page at any time."
                            />
                            <FAQItem
                                q="Can it detect diseases not in the database?"
                                a="No. The model will still output the most probable class from its 11 trained categories. If an uploaded image contains a disease or object not in the training set, results may be unreliable. Confidence scores below 70% should be treated with caution."
                            />
                            <FAQItem
                                q="How do I use the analytics dashboard?"
                                a="The Research Dashboard aggregates all predictions stored in your database. Use the severity filter and sort options to explore patterns. Export to CSV for external analysis in tools like Excel or Python pandas."
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}