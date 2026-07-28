import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  examDate: z.string(),
  dailyHours: z.number().positive(),
  studyDays: z.number().positive(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const plan = {
      weeklySchedule: [
        { week: "Week 1", focus: "Foundation review", goals: ["Review notes", "Practice 3 focused problems"] },
        { week: "Week 2", focus: "Apply concepts", goals: ["Work through example sets", "Revisit weak areas"] },
      ],
      dailySchedule: [
        { day: "Monday", tasks: ["Read summary", "Practice 2 problems"] },
        { day: "Wednesday", tasks: ["Re-work a mock exercise", "Write a short reflection"] },
      ],
      revisionSchedule: [{ phase: "Midweek", tasks: ["Do spaced repetition", "Revisit challenging concepts"] }],
      mockTestSchedule: [{ week: "Week 3", task: "Take a timed mock test" }],
      restDays: ["Sunday"],
    };

    return NextResponse.json({ plan }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to generate study plan" }, { status: 500 });
  }
}
