import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSeverityColor(severity: string): string {
  switch (severity) {
    case "low": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
    case "moderate": return "bg-amber-500/10 text-amber-500 border-amber-500/20";
    case "high": return "bg-orange-500/10 text-orange-500 border-orange-500/20";
    case "critical": return "bg-red-500/10 text-red-500 border-red-500/20";
    default: return "bg-muted text-muted-foreground border-border";
  }
}

export function getSeverityLabel(severity: string): string {
  switch (severity) {
    case "low": return "Healthy";
    case "moderate": return "Moderate Risk";
    case "high": return "High Risk";
    case "critical": return "Critical";
    default: return "Unknown";
  }
}
