import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import mammoth from "mammoth";
import { generateRoadmapFromText } from "@/lib/ai/gemini";
import { createServerSupabaseClient } from "@/lib/supabase/server";

function sanitizeFilename(filename: string) {
  return filename.replace(/[^a-zA-Z0-9._-]/g, "_");
}

async function extractText(file: File, buffer: Buffer) {
  const extension = file.name.toLowerCase();

  if (extension.endsWith(".txt")) {
    return buffer.toString("utf8");
  }

  if (extension.endsWith(".pdf")) {
    return "";
  }

  if (extension.endsWith(".docx")) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  throw new Error("Unsupported file type. Please upload a PDF, DOCX, or TXT file.");
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const extractedText = await extractText(file, buffer);

    if (!extractedText.trim()) {
      return NextResponse.json({ error: "No readable text found in the uploaded file" }, { status: 400 });
    }

    const supabase = createServerSupabaseClient();
    if (!supabase) {
      return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 });
    }

    const path = `syllabi/${Date.now()}-${randomUUID()}-${sanitizeFilename(file.name)}`;
    const { error: uploadError } = await supabase.storage.from("syllabi").upload(path, buffer, {
      contentType: file.type || "application/octet-stream",
      upsert: false,
    });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const roadmap = await generateRoadmapFromText(extractedText);
    const { data: syllabus, error: insertError } = await supabase
      .from("syllabi")
      .insert({
        title: file.name,
        content: extractedText,
        roadmap_json: roadmap,
      })
      .select()
      .single();

    if (insertError || !syllabus) {
      return NextResponse.json({ error: insertError?.message || "Failed to save syllabus" }, { status: 500 });
    }

    return NextResponse.json(
      {
        success: true,
        syllabusId: syllabus.id,
        title: syllabus.title,
        storagePath: path,
        roadmap,
        extractedTextLength: extractedText.length,
      },
      { status: 200 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
