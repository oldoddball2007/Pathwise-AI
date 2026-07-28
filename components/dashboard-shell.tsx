"use client";

import Link from "next/link";
import type { Route } from "next";
import { motion } from "framer-motion";
import { BrainCircuit, LayoutDashboard, ListChecks, MessageSquareText, Sparkles, UploadCloud } from "lucide-react";

const links: Array<{ href: Route; label: string; icon: typeof LayoutDashboard }> = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/roadmap", label: "Roadmap", icon: ListChecks },
  { href: "/dashboard/chat", label: "AI Chat", icon: MessageSquareText },
  { href: "/dashboard/upload", label: "Upload", icon: UploadCloud },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#060606] text-slate-100">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-6 lg:flex-row lg:px-8">
        <aside className="w-full shrink-0 rounded-3xl border border-red-900/30 bg-black/50 p-4 backdrop-blur-xl lg:w-72">
          <Link href="/" className="flex items-center gap-3 px-2 py-3 text-lg font-semibold">
            <div className="rounded-2xl bg-gradient-to-br from-red-600 to-rose-800 p-2 text-white">
              <BrainCircuit className="h-5 w-5" />
            </div>
            PathWise AI
          </Link>
          <div className="mt-6 space-y-2">
            {links.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-slate-300 transition hover:bg-red-600/10 hover:text-white">
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
          <div className="mt-8 rounded-3xl border border-red-400/20 bg-gradient-to-br from-red-700/20 to-rose-800/20 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Sparkles className="h-4 w-4" />
              New insight ready
            </div>
            <p className="mt-2 text-sm text-slate-300">Your roadmap adapts as you study deeper and faster.</p>
          </div>
        </aside>
        <motion.main initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex-1 space-y-6">
          {children}
        </motion.main>
      </div>
    </div>
  );
}
