"use client";

import { useState } from "react";
import type { InterviewEntry, InterviewGuide } from "@/app/lib/types";
import NavIcon from "@/app/components/NavIcons";
import InterviewClient from "./InterviewClient";
import GuideView from "./GuideView";
import Glyph, { type GlyphName } from "./Glyph";

type Tab = "answers" | "discovery" | "phrases" | "tips";

// `icon` is a glyph name, or "mic" for the Interview route's own sidebar icon.
const TABS: { key: Tab; icon: GlyphName | "mic"; title: string; sub: string }[] = [
  { key: "answers", icon: "mic", title: "Answer bank", sub: "Fill in, practise, download as PDF" },
  { key: "discovery", icon: "compass", title: "Discovery guide", sub: "Lead a client call, step by step" },
  { key: "phrases", icon: "chat", title: "Phrases", sub: "Sound natural, not scripted" },
  { key: "tips", icon: "bulb", title: "Call tips", sub: "What real calls teach" },
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
      <div className="grid grid-cols-1 gap-3 min-[460px]:grid-cols-2 lg:grid-cols-4" role="tablist" aria-label="Interview prep sections">
        {TABS.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={tab === t.key}
            onClick={() => setTab(t.key)}
            className={`card flex items-center gap-3 p-3.5 text-left sm:p-4 ${tab === t.key ? "card-active" : "card-hover"}`}
          >
            <span className={`${tab === t.key ? "icon-tile" : "icon-tile-muted"} h-10 w-10 sm:h-11 sm:w-11`}>
              {t.icon === "mic" ? <NavIcon href="/interview" className="h-5 w-5" /> : <Glyph name={t.icon} className="h-5 w-5" />}
            </span>
            <span className="min-w-0">
              <span className={`block text-sm font-bold ${tab === t.key ? "text-violet-light" : "text-text"}`}>{t.title}</span>
              <span className="block text-xs text-muted">{t.sub}</span>
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
