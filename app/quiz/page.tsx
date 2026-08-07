import type { Metadata } from "next";
import { Suspense } from "react";
import { DICTIONARY } from "@/data/dictionary";
import QuizClient from "./QuizClient";

export const metadata: Metadata = {
  title: "Quiz Mode",
  description:
    "Auto-generated multiple-choice exams drawn from the Tech Dictionary — pick a subject, set difficulty and length, then get a score and a full review.",
};

export default function QuizPage() {
  return (
    <div className="container-hub space-y-6 py-8">
      <header>
        <p className="eyebrow">Check what you know</p>
        <h1 className="section-title">🧪 Quiz Mode</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Auto-generated multiple-choice exams built live from the{" "}
          {DICTIONARY.length}-term dictionary. Pick a subject, choose difficulty and
          length, then answer in <span className="text-gold">exam mode</span> — score
          and a full study-review at the end.
        </p>
      </header>

      {/* Suspense is required because QuizClient reads useSearchParams, which
          would otherwise force this route to render dynamically. */}
      <Suspense fallback={<div className="card p-10 text-center text-muted">Loading…</div>}>
        <QuizClient />
      </Suspense>
    </div>
  );
}
