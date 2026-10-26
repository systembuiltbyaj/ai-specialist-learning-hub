import type { Metadata } from "next";
import { Suspense } from "react";
import { DICTIONARY } from "@/data/dictionary";
import QuizClient from "./QuizClient";

export const metadata: Metadata = {
  title: "Quiz Mode",
  description:
    "Practice or exam quizzes built from the AI & automation dictionary — instant explanations, weak-spot drills and a full review.",
};

export default function QuizPage() {
  return (
    <div className="container-hub space-y-6 py-8">
      <header>
        <p className="eyebrow">Check what you know</p>
        <h1 className="section-title">🧪 Quiz Mode</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Multiple-choice questions built live from the {DICTIONARY.length}-term dictionary.{" "}
          <span className="text-gold">Practice</span> explains every answer as you go;{" "}
          <span className="text-gold">Exam</span> saves the feedback for the end and counts toward your best score.
          Terms you miss become your weak spots — one click to drill them.
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
