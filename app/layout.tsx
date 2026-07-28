import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "PathWise AI | AI learning roadmaps",
  description: "PathWise AI turns any syllabus into a dependency-aware study roadmap with AI insights, timelines, and study planning.",
  metadataBase: new URL("https://pathwise-ai.example"),
  openGraph: {
    title: "PathWise AI",
    description: "Turn your syllabus into a prerequisite-first learning journey.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PathWise AI",
    description: "Turn your syllabus into a prerequisite-first learning journey.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
