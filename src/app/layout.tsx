import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree, IBM_Plex_Mono, Noto_Sans_SC } from "next/font/google";
import type { ReactNode } from "react";
import { AppShell } from "@/components/AppShell";
import { TrackerProvider } from "@/hooks/useTracker";
import { LocaleProvider } from "@/hooks/useLocale";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
});

const body = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
});

const data = IBM_Plex_Mono({
  variable: "--font-data",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const zh = Noto_Sans_SC({
  variable: "--font-zh",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Take Muscle",
  description: "83 to 90 kg. Track meals, weight, and lifting. 增肌增重追踪。",
};

export const viewport: Viewport = {
  themeColor: "#c9d2c8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${data.variable} ${zh.variable} h-full antialiased`}
    >
      <body className="min-h-full" suppressHydrationWarning>
        <LocaleProvider>
          <TrackerProvider>
            <AppShell>{children}</AppShell>
          </TrackerProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
