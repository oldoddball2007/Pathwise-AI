"use client";

import { ArrowUpRight, CheckCircle2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import type { RoadmapTopic } from "@/types/roadmap";

const fallbackRoadmap: RoadmapTopic[] = [
  {
    id: "topic-1",
    title: "Foundations",
    description: "Master the core language, terminology, and models that every later concept depends on.",
    prerequisites: [],
    whyHere: "It is the entry point and unlocks every later topic.",
    unlockedConcepts: ["topic-2"],
    estimatedStudyTime: "4 hours",
    difficulty: "Beginner",
    learningObjectives: ["Understand the basics", "Recognize key patterns"],
    importance: "High",
    suggestedRevisionTime: "2 days",
    roadblocks: {
      misconceptions: ["Thinking the basics are too easy to revisit"],
      confusedConcepts: ["Mixing up terminology and application"],
      prerequisitesToReview: ["Review prior notes"],
      readinessChecklist: ["Can explain the basics in plain language"],
      selfTestQuestion: "What is the single most important idea in this topic?",
    },
  },
  {
    id: "topic-2",
    title: "Core Concepts",
    description: "Connect foundational knowledge with the first practical applications.",
    prerequisites: ["topic-1"],
    whyHere: "It builds on the foundations and unlocks the next layer of problem solving.",
    unlockedConcepts: ["topic-3"],
    estimatedStudyTime: "5 hours",
    difficulty: "Intermediate",
    learningObjectives: ["Apply concepts in examples", "Compare similar patterns"],
    importance: "High",
    suggestedRevisionTime: "3 days",
    roadblocks: {
      misconceptions: ["Assuming memorization replaces understanding"],
      confusedConcepts: ["Confusing similar examples"],
      prerequisitesToReview: ["topic-1"],
      readinessChecklist: ["Can solve a beginner-level prompt"],
      selfTestQuestion: "Why does this concept follow the foundation topic?",
    },
  },
  {
    id: "topic-3",
    title: "Applied Practice",
    description: "Apply the concepts in realistic exercises and case studies.",
    prerequisites: ["topic-2"],
    whyHere: "This step is positioned after the core concepts so you can synthesize knowledge before advanced work.",
    unlockedConcepts: ["topic-4"],
    estimatedStudyTime: "6 hours",
    difficulty: "Intermediate",
    learningObjectives: ["Complete guided exercises", "Explain your reasoning"],
    importance: "High",
    suggestedRevisionTime: "4 days",
    roadblocks: {
      misconceptions: ["Believing progress means finishing quickly"],
      confusedConcepts: ["Mixing up method and result"],
      prerequisitesToReview: ["topic-2"],
      readinessChecklist: ["Can complete at least one full example"],
      selfTestQuestion: "What problem does this topic solve?",
    },
  },
  {
    id: "topic-4",
    title: "Advanced Integration",
    description: "Combine multiple learning strands into a sophisticated understanding of the syllabus.",
    prerequisites: ["topic-3"],
    whyHere: "This is the capstone stage that depends on earlier mastery.",
    unlockedConcepts: [],
    estimatedStudyTime: "8 hours",
    difficulty: "Advanced",
    learningObjectives: ["Connect themes", "Build a complete solution"],
    importance: "High",
    suggestedRevisionTime: "5 days",
    roadblocks: {
      misconceptions: ["Trying to rush into the advanced layer without review"],
      confusedConcepts: ["Forgetting that complex systems are built from simpler parts"],
      prerequisitesToReview: ["topic-3"],
      readinessChecklist: ["Can explain the earlier concepts without notes"],
      selfTestQuestion: "How does this topic depend on the earlier ones?",
    },
  },
];

export default function RoadmapPage() {
  const [roadmap, setRoadmap] = useState<RoadmapTopic[]>(fallbackRoadmap);
  const [estimatedHours, setEstimatedHours] = useState<number>(23);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const storedRoadmap = window.sessionStorage.getItem("pathwise-roadmap");
    if (!storedRoadmap) {
      return;
    }

    try {
      const parsed = JSON.parse(storedRoadmap) as { roadmap?: { roadmap?: RoadmapTopic[] }; estimatedHours?: number };
      const topics = Array.isArray(parsed?.roadmap?.roadmap) ? parsed.roadmap.roadmap : fallbackRoadmap;
      setRoadmap(topics);
      setEstimatedHours(typeof parsed?.estimatedHours === "number" ? parsed.estimatedHours : 23);
    } catch {
      window.sessionStorage.removeItem("pathwise-roadmap");
    }
  }, []);

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-cyan-300">{roadmap !== fallbackRoadmap ? "Generated from your upload" : "AI learning roadmap"}</p>
            <h1 className="mt-2 text-2xl font-semibold text-white">Roadmap generated from your syllabus</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-300">Every step is placed in a prerequisite-first sequence so the study path feels logical and buildable.</p>
          </div>
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-100">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Estimated time: {estimatedHours} hours
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4">
        {roadmap.map((topic) => (
          <article key={topic.id} className="rounded-[24px] border border-white/10 bg-slate-900/70 p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-semibold text-white">{topic.title}</h2>
                  <span className="rounded-full bg-violet-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-violet-200">{topic.difficulty}</span>
                </div>
                <p className="mt-3 max-w-2xl text-sm text-slate-300">{topic.description}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cyan-300" />
                  {topic.estimatedStudyTime}
                </div>
              </div>
            </div>
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold text-white">Why it appears here</p>
                <p className="mt-2 text-sm text-slate-300">{topic.whyHere}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {topic.learningObjectives.map((objective) => (
                    <span key={objective} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">{objective}</span>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold text-white">Prerequisites</p>
                <p className="mt-2 text-sm text-slate-300">{topic.prerequisites.length ? topic.prerequisites.join(", ") : "None — this is your starting point."}</p>
                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-cyan-300">
                  Unlocks <ArrowUpRight className="h-4 w-4" /> {topic.unlockedConcepts.length ? topic.unlockedConcepts.join(", ") : "Final mastery"}
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
