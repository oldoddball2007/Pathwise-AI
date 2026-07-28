export type Difficulty = "Beginner" | "Intermediate" | "Advanced";
export type Importance = "High" | "Medium" | "Low";

export interface RoadmapTopic {
  id: string;
  title: string;
  description: string;
  prerequisites: string[];
  whyHere: string;
  unlockedConcepts: string[];
  estimatedStudyTime: string;
  difficulty: Difficulty;
  learningObjectives: string[];
  importance: Importance;
  suggestedRevisionTime: string;
  roadblocks: {
    misconceptions: string[];
    confusedConcepts: string[];
    prerequisitesToReview: string[];
    readinessChecklist: string[];
    selfTestQuestion: string;
  };
}

export interface RoadmapResponse {
  roadmap: RoadmapTopic[];
  dependencyGraph: {
    nodes: Array<{
      id: string;
      data: { label: string };
      position: { x: number; y: number };
    }>;
    edges: Array<{
      id: string;
      source: string;
      target: string;
      animated?: boolean;
    }>;
  };
  roadblocks: Record<string, RoadmapTopic["roadblocks"]>;
  studyPlan: {
    weeklySchedule: Array<{ week: string; focus: string; goals: string[] }>;
    dailySchedule: Array<{ day: string; tasks: string[] }>;
    revisionSchedule: Array<{ phase: string; tasks: string[] }>;
    mockTestSchedule: Array<{ week: string; task: string }>;
    restDays: string[];
  };
  timeline: {
    milestones: Array<{ title: string; date: string; description: string }>;
    revision: Array<{ title: string; date: string }>;
    examPrep: Array<{ title: string; date: string }>;
  };
  recommendations: string[];
  difficulty: string;
  estimatedHours: number;
  aiExplanations: string[];
}

export interface StudyPlanPayload {
  examDate: string;
  dailyHours: number;
  studyDays: number;
  roadmap: RoadmapTopic[];
}
