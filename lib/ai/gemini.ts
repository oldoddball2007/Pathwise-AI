import { GoogleGenerativeAI } from "@google/generative-ai";
import type { RoadmapResponse, RoadmapTopic } from "@/types/roadmap";

const DEFAULT_PROMPT = `You are PathWise AI, an expert study planner. Analyze the syllabus text and return a valid JSON object with:
- roadmap: array of topics with title, description, prerequisites, whyHere, unlockedConcepts, estimatedStudyTime, difficulty, learningObjectives, importance, suggestedRevisionTime and roadblocks.
- dependencyGraph: nodes and edges for the roadmap.
- roadblocks: map keyed by topic id.
- studyPlan: weekly schedule, daily schedule, revision schedule, mock test schedule and rest days.
- timeline: milestones, revision and exam prep.
- recommendations, difficulty, estimatedHours and aiExplanations.
Return valid JSON only.`;

function createFallbackRoadmap(text: string): RoadmapResponse {
  const cleaned = text.trim().toLowerCase();
  const topicTitles = [
    "Foundations",
    "Core Concepts",
    "Problem Solving",
    "Applied Practice",
    "Advanced Integration",
  ];

  const roadmap: RoadmapTopic[] = topicTitles.map((title, index) => ({
    id: `topic-${index + 1}`,
    title,
    description: `Build confidence with ${title.toLowerCase()} before moving into more advanced material.`,
    prerequisites: index === 0 ? [] : [`topic-${index}`],
    whyHere: `This topic appears now because it unlocks the next wave of learning and reduces cognitive overload.`,
    unlockedConcepts: index === topicTitles.length - 1 ? [] : [`topic-${index + 2}`],
    estimatedStudyTime: `${3 + index * 2} hours`,
    difficulty: index > 2 ? "Advanced" : index === 2 ? "Intermediate" : "Beginner",
    learningObjectives: ["Understand the core ideas", "Practice applied examples", "Connect to future concepts"],
    importance: index > 1 ? "High" : "Medium",
    suggestedRevisionTime: `${index + 1} day${index === 0 ? "" : "s"}`,
    roadblocks: {
      misconceptions: [`Misunderstanding ${title.toLowerCase()} can slow progress.`],
      confusedConcepts: [`Confuse ${title.toLowerCase()} with the later modules.`],
      prerequisitesToReview: index === 0 ? ["Review study notes and examples"] : [`topic-${index}`],
      readinessChecklist: ["Can explain the basic idea", "Can solve a simple example"],
      selfTestQuestion: `What is the most important idea in ${title}?`,
    },
  }));

  return {
    roadmap,
    dependencyGraph: {
      nodes: roadmap.map((item, index) => ({
        id: item.id,
        data: { label: item.title },
        position: { x: 220 * (index % 3), y: 140 * Math.floor(index / 3) },
      })),
      edges: roadmap.slice(1).map((item, index) => ({
        id: `edge-${index + 1}`,
        source: roadmap[index].id,
        target: item.id,
        animated: true,
      })),
    },
    roadblocks: Object.fromEntries(roadmap.map((item) => [item.id, item.roadblocks])),
    studyPlan: {
      weeklySchedule: [
        { week: "Week 1", focus: "Build foundations", goals: ["Review notes", "Practice examples"] },
        { week: "Week 2", focus: "Increase depth", goals: ["Solve problems", "Revisit weak spots"] },
      ],
      dailySchedule: [
        { day: "Monday", tasks: ["Read core notes", "Practice 3 problems"] },
        { day: "Wednesday", tasks: ["Work through a case study", "Summarize insight"] },
      ],
      revisionSchedule: [{ phase: "Midweek", tasks: ["Review flashcards", "Re-solve 2 problems"] }],
      mockTestSchedule: [{ week: "Week 3", task: "Take a timed mock exam" }],
      restDays: ["Sunday"],
    },
    timeline: {
      milestones: [
        { title: "Foundation complete", date: "2026-08-10", description: "All prerequisite concepts understood" },
        { title: "Mock exam", date: "2026-09-01", description: "Confidence check for the final sprint" },
      ],
      revision: [{ title: "Revision sprint", date: "2026-09-05" }],
      examPrep: [{ title: "Exam readiness", date: "2026-09-15" }],
    },
    recommendations: ["Keep a spaced repetition habit", "Review the roadmap weekly"],
    difficulty: cleaned.includes("advanced") ? "Advanced" : "Balanced",
    estimatedHours: 28,
    aiExplanations: ["The roadmap prioritizes prerequisite understanding before advanced applications.", "The schedule balances depth, revision, and rest."],
  };
}

export async function generateRoadmapFromText(text: string): Promise<RoadmapResponse> {
  if (!process.env.GOOGLE_GEMINI_API_KEY) {
    return createFallbackRoadmap(text);
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `${DEFAULT_PROMPT}\nSyllabus text:\n${text}`;
    const response = await model.generateContent(prompt);
    const raw = response.response.text();
    const json = raw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(json) as RoadmapResponse;
    return parsed;
  } catch {
    return createFallbackRoadmap(text);
  }
}
