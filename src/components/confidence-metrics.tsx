"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle2, Info, Shield, Users, BarChart3 } from "lucide-react";
import { PredictionResult } from "@/lib/types";

interface ConfidenceMetricsProps {
    result: PredictionResult;
}

export function ConfidenceMetrics({ result }: ConfidenceMetricsProps) {
    const {
        ensemble_agreement,
        uncertainty_level,
        confusion_warning,
        model_consensus,
        num_models_used,
        severity_assessment
    } = result;

    // Skip if no enhanced metrics available
    if (!ensemble_agreement && !uncertainty_level && !confusion_warning && !severity_assessment) {
        return null;
    }

    const getUncertaintyColor = (level?: string) => {
        switch (level) {
            case "very_low": return "bg-green-500/10 text-green-600 border-green-500/20";
            case "low": return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
            case "moderate": return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
            case "high": return "bg-red-500/10 text-red-600 border-red-500/20";
            default: return "bg-gray-500/10 text-gray-600 border-gray-500/20";
        }
    };

    const getUncertaintyIcon = (level?: string) => {
        switch (level) {
            case "very_low":
            case "low":
                return <CheckCircle2 className="h-4 w-4" />;
            case "moderate":
                return <Info className="h-4 w-4" />;
            case "high":
                return <AlertTriangle className="h-4 w-4" />;
            default:
                return <Info className="h-4 w-4" />;
        }
    };

    const getSeverityColor = (level?: string) => {
        switch (level) {
            case "none": return "bg-green-500/10 text-green-600";
            case "very_low": return "bg-emerald-500/10 text-emerald-600";
            case "low": return "bg-yellow-500/10 text-yellow-600";
            case "moderate": return "bg-orange-500/10 text-orange-600";
            case "high": return "bg-red-500/10 text-red-600";
            case "critical": return "bg-red-600/20 text-red-700 dark:text-red-400";
            default: return "bg-gray-500/10 text-gray-600";
        }
    };

    return (
        <div className="space-y-4">
            {/* Ensemble Agreement & Uncertainty */}
            {(ensemble_agreement !== undefined || uncertainty_level) && (
                <Card className="border-muted bg-gradient-to-br from-card to-muted/20">
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Shield className="h-5 w-5 text-primary" />
                                <CardTitle className="text-base font-bold">
                                    Prediction Confidence Analysis
                                </CardTitle>
                            </div>
                            {model_consensus && (
                                <Badge variant="outline" className="text-xs font-semibold">
                                    {model_consensus} Consensus
                                </Badge>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {ensemble_agreement !== null && ensemble_agreement !== undefined && (
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Users className="h-4 w-4" />
                                        <span>Model Agreement</span>
                                    </div>
                                    <span className="font-bold text-foreground">
                                        {Math.round(ensemble_agreement * 100)}%
                                    </span>
                                </div>
                                <Progress value={ensemble_agreement * 100} className="h-2" />
                                <p className="text-xs text-muted-foreground">
                                    {num_models_used} models used · {ensemble_agreement >= 0.66 ? "Strong consensus" : "Moderate disagreement"}
                                </p>
                            </div>
                        )}

                        {uncertainty_level && (
                            <div className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
                                <div className="flex items-center gap-2">
                                    <div className={`p-2 rounded-lg ${getUncertaintyColor(uncertainty_level)}`}>
                                        {getUncertaintyIcon(uncertainty_level)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold capitalize">
                                            {uncertainty_level.replace("_", " ")} Uncertainty
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {result.prediction_entropy !== null && result.prediction_entropy !== undefined && (
                                                <>Entropy: {result.prediction_entropy.toFixed(3)}</>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}

            {/* Disease Severity Assessment */}
            {severity_assessment && (
                <Card className="border-muted bg-gradient-to-br from-card to-muted/20">
                    <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-primary" />
                            <CardTitle className="text-base font-bold">
                                Disease Severity Assessment
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Badge className={`${getSeverityColor(severity_assessment.severity_level)} text-sm px-3 py-1`}>
                                {severity_assessment.severity_level.replace("_", " ").toUpperCase()}
                            </Badge>
                            <div className="text-right">
                                <p className="text-2xl font-black text-primary">
                                    {(severity_assessment.severity_score * 100).toFixed(0)}%
                                </p>
                                <p className="text-xs text-muted-foreground">Severity Score</p>
                            </div>
                        </div>

                        <Progress value={severity_assessment.severity_score * 100} className="h-3" />

                        <div className="grid grid-cols-3 gap-3">
                            <div className="p-3 rounded-lg bg-muted/50 border text-center">
                                <p className="text-lg font-bold">{severity_assessment.num_lesions}</p>
                                <p className="text-xs text-muted-foreground">Lesions</p>
                            </div>
                            <div className="p-3 rounded-lg bg-muted/50 border text-center">
                                <p className="text-lg font-bold">{severity_assessment.affected_area_pct.toFixed(1)}%</p>
                                <p className="text-xs text-muted-foreground">Affected</p>
                            </div>
                            <div className="p-3 rounded-lg bg-muted/50 border text-center">
                                <p className="text-lg font-bold">{(severity_assessment.avg_intensity * 100).toFixed(0)}%</p>
                                <p className="text-xs text-muted-foreground">Intensity</p>
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                {severity_assessment.recommendation}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Confusion Warning (Early Blight / Target Spot) */}
            {confusion_warning && (
                <Card className="border-amber-500/30 bg-amber-500/5">
                    <CardContent className="pt-6">
                        <div className="flex gap-3">
                            <div className="p-2 rounded-lg bg-amber-500/20 h-fit">
                                <AlertTriangle className="h-5 w-5 text-amber-600" />
                            </div>
                            <div className="flex-1 space-y-2">
                                <p className="text-sm font-semibold text-foreground">
                                    {confusion_warning.message}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {confusion_warning.recommendation}
                                </p>
                                <div className="flex items-start gap-2 p-2 rounded bg-amber-500/10 border border-amber-500/20">
                                    <Info className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                                    <p className="text-xs text-amber-700 dark:text-amber-300">
                                        {confusion_warning.research_note}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
