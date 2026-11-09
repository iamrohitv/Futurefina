import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import {
  Inter,
  JetBrains_Mono,
  Noto_Sans_Devanagari,
  Noto_Sans_Gujarati,
} from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoGujarati = Noto_Sans_Gujarati({
  subsets: ["gujarati"],
  variable: "--font-noto-gujarati",
  display: "swap",
});

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-noto-devanagari",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Futurefina CRM",
    template: "%s · Futurefina CRM",
  },
  description:
    "Advisor console for Futurefina WhatsApp lead management, handovers, and follow-ups.",
};

export const viewport: Viewport = {
  themeColor: "#212227",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn(
        "font-sans",
        inter.variable,
        notoGujarati.variable,
        notoDevanagari.variable,
        jetbrainsMono.variable,
      )}
    >
      <body>
        <TooltipProvider delayDuration={200}>{children}</TooltipProvider>
      </body>
    </html>
  );
}
