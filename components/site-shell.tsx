"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BrainCircuit, Menu, Sparkles } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#workflow" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(239,68,68,0.18),_transparent_45%)] text-slate-900 dark:text-slate-100">
      <header className="sticky top-0 z-50 border-b border-red-900/40 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-3 text-lg font-semibold">
            <div className="rounded-2xl bg-gradient-to-br from-red-600 to-rose-800 p-2 text-white shadow-lg shadow-red-950/40">
              <BrainCircuit className="h-5 w-5" />
            </div>
            <span>PathWise AI</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="text-sm font-medium text-slate-300 transition hover:text-white">
                {item.label}
              </a>
            ))}
            <Link href="/dashboard" className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-500">
              Open dashboard
            </Link>
          </nav>
          <button className="rounded-full border border-slate-200 p-2 md:hidden" onClick={() => setOpen((value) => !value)}>
            <Menu className="h-5 w-5" />
          </button>
        </div>
        {open ? (
          <div className="border-t border-red-900/40 bg-black/90 p-4 md:hidden">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <a key={item.label} href={item.href} className="text-sm font-medium text-slate-300" onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              ))}
              <Link href="/dashboard" className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white text-center" onClick={() => setOpen(false)}>
                Open dashboard
              </Link>
            </div>
          </div>
        ) : null}
      </header>
      <main>{children}</main>
      <footer className="border-t border-red-900/40 bg-black/70 px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-lg font-semibold">PathWise AI</p>
            <p className="text-sm text-slate-400">Plan smarter, study faster, and unlock every prerequisite with confidence.</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Sparkles className="h-4 w-4" />
            Built for ambitious learners everywhere.
          </div>
        </div>
      </footer>
    </div>
  );
}
