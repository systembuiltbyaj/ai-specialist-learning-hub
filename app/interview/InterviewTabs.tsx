"use client";

import { useState } from "react";
import type { DiscoveryData, InterviewEntry } from "@/app/lib/types";
import InterviewClient from "./InterviewClient";
import EmployerGuide from "./EmployerGuide";

type Mode = "Employee" | "Employer";

const MODES: { key: Mode; icon: string; title: string; sub: string }[] = [
  {
    key: "Employee",
    icon: "🎤",
    title: "Employee Interview",
    sub: "You're the candidate — prep your answers.",
  },
  {
    key: "Employer",
    icon: "🧭",
    title: "Employer Interview",
    sub: "You interview the client — discovery playbook.",
  },
];

export default function InterviewTabs({
  interviewSeed,
  discovery,
}: {
  interviewSeed: InterviewEntry[];
  discovery: DiscoveryData;
}) {
  const [mode, setMode] = useState<Mode>("Employee");

  return (
    <div className="space-y-6">
      <div className="grid gap-2 sm:grid-cols-2">
        {MODES.map((m) => (
          <button
            key={m.key}
            onClick={() => setMode(m.key)}
            className={`card flex items-start gap-3 p-4 text-left transition-colors ${
              mode === m.key ? "border-gold bg-gold/5" : "card-hover"
            }`}
          >
            <span className="text-xl">{m.icon}</span>
            <span>
              <span
                className={`block font-bold ${mode === m.key ? "text-gold" : "text-text"}`}
              >
                {m.title}
              </span>
              <span className="text-xs text-muted">{m.sub}</span>
            </span>
          </button>
        ))}
      </div>

      {mode === "Employee" && <InterviewClient seed={interviewSeed} />}
      {mode === "Employer" && <EmployerGuide discovery={discovery} />}
    </div>
  );
}
