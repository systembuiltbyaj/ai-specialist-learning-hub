import type { Metadata } from "next";
import { Suspense } from "react";
import { DICTIONARY } from "@/data/dictionary";
import QuizClient from "./QuizClient";
import PageHeader from "@/app/components/PageHeader";

export const metadata: Metadata = {
  title: "Quiz Mode",
  description:
    "Practice or exam quizzes built from the AI & automation dictionary — instant explanations, weak-spot drills and a full review.",
};

export default function QuizPage() {
  return (
    <div className="container-hub space-y-6 py-8">
      <PageHeader href="/quiz" eyebrow="Check what you know" title="Quiz" accent="Mode">
        Multiple-choice questions built live from the {DICTIONARY.length}-term dictionary.{" "}
        <span className="font-semibold text-neon-yellow">Practice</span> explains every answer as you go;{" "}
        <span className="font-semibold text-neon-yellow">Exam</span> saves the feedback for the end and counts toward your
        best score. Terms you miss become your weak spots — one click to drill them.
      </PageHeader>

      {/* Suspense is required because QuizClient reads useSearchParams, which
          would otherwise force this route to render dynamically. */}
      <Suspense fallback={<div className="card p-10 text-center text-muted">Loading…</div>}>
        <QuizClient />
      </Suspense>
    </div>
  );
}
