import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "TomatoGuard AI — Tomato Disease Detection",
    template: "%s | TomatoGuard AI",
  },
  description:
    "Advanced real-time tomato disease identification powered by MaxViT Multi-Axis Vision Transformer. Detect 11 plant conditions instantly with 99.2% accuracy.",
  keywords: ["tomato disease", "plant disease detection", "MaxViT", "AI agriculture", "deep learning"],
  openGraph: {
    title: "TomatoGuard AI",
    description: "Detect tomato diseases instantly with MaxViT AI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground pr-16">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
