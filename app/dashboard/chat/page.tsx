"use client";

import { useState } from "react";
import { SendHorizonal, Sparkles } from "lucide-react";

const starterQuestions = [
  "Why should I learn recursion first?",
  "Can I skip pointers?",
  "Am I ready for graphs?",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Array<{ role: "assistant" | "user"; content: string }>>([
    {
      role: "assistant",
      content: "I can answer questions based on your roadmap context. Ask me anything about prerequisites, readiness, or the next best step.",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!input.trim()) return;

    const nextMessages = [...messages, { role: "user" as const, content: input.trim() }];
    setMessages(nextMessages);
    setInput("");

    const answer = `Based on your roadmap, the best next step is to revisit the prerequisites and ensure you can explain the core idea before advancing. This keeps your learning dependency-first and avoids brittle understanding.`;
    setMessages([...nextMessages, { role: "assistant" as const, content: answer }]);
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
        <div className="flex items-center gap-2 text-sm font-medium text-cyan-300">
          <Sparkles className="h-4 w-4" />
          AI study companion
        </div>
        <h1 className="mt-2 text-2xl font-semibold text-white">Ask questions grounded in your roadmap</h1>
        <p className="mt-2 text-sm text-slate-300">The assistant uses your current prerequisite-first study path to respond with context-aware guidance.</p>
      </section>

      <section className="rounded-[28px] border border-white/10 bg-slate-900/70 p-4">
        <div className="flex flex-wrap gap-2">
          {starterQuestions.map((question) => (
            <button key={question} onClick={() => setInput(question)} className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm text-slate-200">
              {question}
            </button>
          ))}
        </div>
        <div className="mt-4 space-y-3">
          {messages.map((message, index) => (
            <div key={`${message.role}-${index}`} className={`rounded-2xl p-4 ${message.role === "assistant" ? "bg-white/10 text-slate-100" : "bg-violet-500/15 text-slate-100"}`}>
              <p className="text-sm leading-6">{message.content}</p>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 md:flex-row">
          <input value={input} onChange={(event) => setInput(event.target.value)} className="flex-1 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none" placeholder="Ask about prerequisites or readiness" />
          <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950">
            <SendHorizonal className="h-4 w-4" />
            Send
          </button>
        </form>
      </section>
    </div>
  );
}
