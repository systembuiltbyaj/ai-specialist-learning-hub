"use client";

import { useState } from "react";
import type { InterviewEntry, InterviewGuide } from "@/app/lib/types";
import InterviewClient from "./InterviewClient";
import GuideView from "./GuideView";

type Tab = "answers" | "discovery" | "phrases" | "tips";

const TABS: { key: Tab; icon: string; title: string; sub: string }[] = [
  { key: "answers", icon: "🎤", title: "Answer bank", sub: "Fill in, practise, download as PDF" },
  { key: "discovery", icon: "🧭", title: "Discovery guide", sub: "Lead a client call, step by step" },
  { key: "phrases", icon: "💬", title: "Phrases", sub: "Sound natural, not scripted" },
  { key: "tips", icon: "💡", title: "Call tips", sub: "What real calls teach" },
];

export default function InterviewTabs({
  interviewSeed,
  guides,
}: {
  interviewSeed: InterviewEntry[];
  guides: InterviewGuide[];
}) {
  const [tab, setTab] = useState<Tab>("answers");
  const byId = Object.fromEntries(guides.map((g) => [g.id, g]));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4" role="tablist" aria-label="Interview prep sections">
        {TABS.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={tab === t.key}
            onClick={() => setTab(t.key)}
            className={`card flex items-start gap-3 p-3.5 text-left transition-colors ${
              tab === t.key ? "!border-violet-soft/60 bg-violet-soft/10" : "card-hover"
            }`}
          >
            <span className="text-xl" aria-hidden>
              {t.icon}
            </span>
            <span className="min-w-0">
              <span className={`block text-sm font-bold ${tab === t.key ? "text-violet-light" : "text-text"}`}>{t.title}</span>
              <span className="text-xs text-muted">{t.sub}</span>
            </span>
          </button>
        ))}
      </div>

      {tab === "answers" && <InterviewClient seed={interviewSeed} />}
      {tab === "discovery" && (
        <div className="space-y-10">
          <GuideView guide={byId.discovery} />
          <GuideView guide={byId.prompts} />
        </div>
      )}
      {tab === "phrases" && <GuideView guide={byId.phrases} />}
      {tab === "tips" && <GuideView guide={byId.tips} />}
    </div>
  );
}
