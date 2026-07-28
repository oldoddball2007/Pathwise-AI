import Link from "next/link";
import { ArrowRight, BookOpen, Clock3, Gauge, Sparkles, TrendingUp, UploadCloud } from "lucide-react";

const progressCards = [
  { title: "Study hours", value: "14.2h", detail: "This week" },
  { title: "Completion", value: "62%", detail: "Roadmap covered" },
  { title: "Streak", value: "8 days", detail: "Consistency" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-white/10 bg-gradient-to-br from-violet-600 via-violet-500 to-cyan-500 p-8 shadow-2xl shadow-violet-950/30">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white/90">
              <Sparkles className="h-4 w-4" />
              Welcome back, Maya
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Your roadmap is ready to turn study chaos into momentum.
            </h1>
            <p className="mt-4 text-base text-violet-50/90">
              Upload a syllabus, let AI reorder it by prerequisites, and follow a plan built around your actual calendar.
            </p>
          </div>
          <Link href="/dashboard/upload" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-slate-950 shadow-lg">
            Upload syllabus
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {progressCards.map((card) => (
          <div key={card.title} className="rounded-[24px] border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
            <p className="text-sm text-slate-400">{card.title}</p>
            <p className="mt-2 text-2xl font-semibold text-white">{card.value}</p>
            <p className="mt-1 text-sm text-slate-300">{card.detail}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-[28px] border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-300">Current roadmap</p>
              <h2 className="mt-1 text-xl font-semibold text-white">Prerequisite-first study path</h2>
            </div>
            <Link href="/dashboard/roadmap" className="text-sm font-medium text-cyan-300">View roadmap</Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              "Foundations",
              "Core Concepts",
              "Applied Problem Solving",
              "Advanced Integration",
            ].map((item, index) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <BookOpen className="h-4 w-4" />
                  Topic {index + 1}
                </div>
                <p className="mt-3 font-semibold text-white">{item}</p>
                <p className="mt-2 text-sm text-slate-400">Priority order adjusted based on dependencies and your pace.</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[28px] border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
            <Clock3 className="h-4 w-4" />
            Quick actions
          </div>
          <div className="mt-6 space-y-3">
            <Link href="/dashboard/upload" className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-sm text-slate-200">
              <span className="flex items-center gap-2"><UploadCloud className="h-4 w-4" />Upload syllabus</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/dashboard/chat" className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-sm text-slate-200">
              <span className="flex items-center gap-2"><Sparkles className="h-4 w-4" />Ask AI questions</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/dashboard/roadmap" className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-sm text-slate-200">
              <span className="flex items-center gap-2"><TrendingUp className="h-4 w-4" />View timeline</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
