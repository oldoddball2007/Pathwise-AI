import Link from "next/link";
import { ArrowRight, BrainCircuit, CheckCircle2, Compass, ShieldCheck, Sparkles, TimerReset } from "lucide-react";
import { SiteShell } from "@/components/site-shell";

const features = [
  {
    title: "Prerequisite-first roadmaps",
    description: "Turn a syllabus into a dependency-aware plan instead of following the order of the document.",
    icon: Compass,
  },
  {
    title: "AI study coach",
    description: "Get clear explanations, readiness checks, and next-step guidance tied to your roadmap.",
    icon: BrainCircuit,
  },
  {
    title: "Built for consistency",
    description: "Track progress, plan weekly study blocks, and keep your momentum with structured milestones.",
    icon: TimerReset,
  },
];

const testimonials = [
  {
    quote: "PathWise AI made my syllabus feel readable for the first time.",
    author: "Aisha, Computer Science student",
  },
  {
    quote: "I finally understand what to learn first and why.",
    author: "Noah, Data Structures learner",
  },
];

const faqs = [
  { question: "What file types do you support?", answer: "PDF, DOCX, and TXT uploads are supported." },
  { question: "Is the AI output guaranteed to be accurate?", answer: "The AI produces a structured draft and you can review or adjust the roadmap in the dashboard." },
  { question: "Can I use it for any subject?", answer: "Yes. PathWise AI is designed to work for courses with concepts and prerequisites across many disciplines." },
];

export default function Home() {
  return (
    <SiteShell>
      <section className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-3 py-1 text-sm font-medium text-red-200">
              <Sparkles className="h-4 w-4" />
              Study smarter with AI-generated roadmaps
            </div>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
              Turn your syllabus into a prerequisite-first learning path.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              PathWise AI analyzes your course material, identifies dependencies, and gives you a polished roadmap with timelines, study plans, and AI guidance.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-slate-950">
                Start free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#features" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/10 px-5 py-3 font-semibold text-white">
                Explore features
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-300">
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-red-300" />PDF, DOCX, TXT upload</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-red-300" />Dependency-aware roadmap</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-red-300" />Study plan + focus blocks</div>
            </div>
          </div>
          <div className="rounded-[32px] border border-red-900/30 bg-black/40 p-6 shadow-2xl shadow-red-950/40 backdrop-blur-xl">
            <div className="rounded-[24px] border border-white/10 bg-slate-950/70 p-6">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>Roadmap preview</span>
                <span className="rounded-full bg-red-500/15 px-3 py-1 text-red-200">Live AI insight</span>
              </div>
              <div className="mt-6 space-y-4">
                {[
                  ["Foundations", "Unlocks core problem solving"],
                  ["Core Concepts", "Requires prerequisite review"],
                  ["Applied Practice", "Connects ideas to real exercises"],
                ].map(([title, detail]) => (
                  <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="font-semibold text-white">{title}</p>
                    <p className="mt-1 text-sm text-slate-400">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="rounded-[24px] border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
                <div className="rounded-2xl bg-gradient-to-br from-red-600/20 to-rose-800/20 p-3 text-red-200">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="rounded-[32px] border border-red-900/30 bg-gradient-to-br from-black via-[#140606] to-red-950/70 p-8">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-red-300">How it works</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">One upload, one beautiful study path.</h2>
              <p className="mt-4 text-slate-300">Upload your syllabus, let AI extract the details, and review a roadmap ordered by prerequisites and dependencies.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Analyze syllabus", "Extract topics and dependencies"],
                ["Generate roadmap", "Order topics by learning prerequisites"],
                ["Plan study blocks", "Turn it into a weekly schedule"],
                ["Track progress", "Monitor your streak and milestones"],
              ].map(([title, detail]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-white">{title}</p>
                  <p className="mt-2 text-sm text-slate-400">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-2">
          {testimonials.map((testimonial) => (
            <div key={testimonial.author} className="rounded-[24px] border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
              <p className="text-lg text-slate-100">“{testimonial.quote}”</p>
              <p className="mt-4 text-sm font-medium text-red-200">{testimonial.author}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="rounded-[32px] border border-white/10 bg-white/10 p-8 backdrop-blur-xl">
          <h2 className="text-3xl font-semibold text-white">Frequently asked questions</h2>
          <div className="mt-6 space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                <p className="font-semibold text-white">{faq.question}</p>
                <p className="mt-2 text-sm text-slate-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="rounded-[32px] border border-violet-400/20 bg-gradient-to-br from-violet-600/20 to-cyan-500/20 p-8 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-red-200">Free to start</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Get your roadmap, AI insights, and study schedule today.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">The free tier includes syllabus analysis, roadmap generation, basic chat support, and progress tracking.</p>
          <Link href="/dashboard" className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-5 py-3 font-semibold text-slate-950">Try it now</Link>
        </div>
      </section>
    </SiteShell>
  );
}
