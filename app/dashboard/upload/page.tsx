"use client";

import { AlertCircle, FileText, LoaderCircle, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function UploadPage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState("");

  const uploadFile = async (selectedFiles: File[]) => {
    const [file] = selectedFiles;
    if (!file) {
      return;
    }

    setError(null);
    setFiles([file]);
    setIsUploading(true);
    setProgress(`Uploading ${file.name}...`);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(payload?.error || "Upload failed");
      }

      if (typeof window !== "undefined") {
        sessionStorage.setItem("pathwise-roadmap", JSON.stringify(payload));
      }

      setProgress("Upload complete. Opening your roadmap...");
      router.push("/dashboard/roadmap");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setProgress("");
    } finally {
      setIsUploading(false);
    }
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const selected = Array.from(event.dataTransfer.files).filter((file) => file.size > 0);
    setFiles(selected);
    if (selected.length) {
      void uploadFile(selected);
    }
  };

  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files ?? []).filter((file) => file.size > 0);
    setFiles(selected);
    if (selected.length) {
      void uploadFile(selected);
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
        <h1 className="text-2xl font-semibold text-white">Upload syllabus</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-300">Upload a PDF, DOCX, or TXT file and let PathWise AI extract the content and generate your roadmap.</p>
      </section>

      <section className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6">
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              inputRef.current?.click();
            }
          }}
          onDragOver={(event) => event.preventDefault()}
          onDrop={onDrop}
          className="flex cursor-pointer flex-col items-center justify-center rounded-[24px] border border-dashed border-white/20 bg-white/5 px-6 py-16 text-center"
        >
          <UploadCloud className="h-10 w-10 text-cyan-300" />
          <p className="mt-4 text-lg font-semibold text-white">Drop your syllabus here</p>
          <p className="mt-2 text-sm text-slate-400">PDF, DOCX or TXT • Files are uploaded to Supabase Storage and analyzed instantly.</p>
          <input ref={inputRef} type="file" accept=".pdf,.docx,.txt" className="hidden" onChange={onFileInputChange} />
        </div>

        {isUploading ? (
          <div className="mt-4 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-4 text-sm text-cyan-100">
            <div className="flex items-center gap-2">
              <LoaderCircle className="h-4 w-4 animate-spin" />
              {progress}
            </div>
          </div>
        ) : null}

        {error ? (
          <div className="mt-4 flex items-start gap-2 rounded-2xl border border-rose-400/30 bg-rose-500/10 p-4 text-sm text-rose-200">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        ) : null}

        <div className="mt-6 grid gap-3">
          {files.length ? (
            files.map((file) => (
              <div key={file.name} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                <FileText className="h-4 w-4" />
                {file.name}
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-400">No files selected yet.</div>
          )}
        </div>
      </section>
    </div>
  );
}
