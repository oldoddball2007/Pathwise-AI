import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  completedTopics: z.number().int().nonnegative(),
  studyHours: z.number().nonnegative(),
  completionPercentage: z.number().min(0).max(100),
  learningStreak: z.number().int().nonnegative(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    return NextResponse.json({ success: true, updatedAt: new Date().toISOString() }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to update progress" }, { status: 500 });
  }
}
