import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  question: z.string().min(3),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const answer = `Your roadmap suggests revisiting prerequisites first, then testing readiness with one small applied exercise before moving on.`;

    return NextResponse.json({ answer }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to answer question" }, { status: 500 });
  }
}
