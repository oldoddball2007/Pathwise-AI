import { NextResponse } from "next/server";
import { z } from "zod";
import { generateRoadmapFromText } from "@/lib/ai/gemini";

const schema = z.object({
  syllabusText: z.string().min(20),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const roadmap = await generateRoadmapFromText(parsed.data.syllabusText);
    return NextResponse.json({ roadmap }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to analyze syllabus" }, { status: 500 });
  }
}
