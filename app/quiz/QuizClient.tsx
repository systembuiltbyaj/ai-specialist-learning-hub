"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import type { DictLevel } from "@/data/dictionary";
import {
  QUIZ_SUBJECTS,
  generateQuiz,
  subjectCount,
  gradeLabel,
  type QuizSubject,
  type QuizQuestion,
} from "@/app/lib/quiz";

type Phase = "setup" | "active" | "results";
const LEVELS: (DictLevel | "All")[] = ["All", "Beginner", "Intermediate", "Advanced"];
const LENGTHS = [10, 20];

const BESTS_KEY = "lh.quiz.bests.v1";
interface BestEntry {
  pct: number;
  correct: number;
  total: number;
  level: DictLevel | "All";
  date: string;
}
type Bests = Partial<Record<QuizSubject, BestEntry>>;

export default function QuizClient() {
  // ?subject= is read here rather than in the page's server component, which
  // would opt the route out of static rendering for one optional query param.
  const params = useSearchParams();
  const requested = params.get("subject");
  const initialSubject =
    (QUIZ_SUBJECTS.find((s) => s.key === requested)?.key as QuizSubject | undefined) ??
    "Tech Dictionary";

  const [phase, setPhase] = useState<Phase>("setup");
  const [subject, setSubject] = useState<QuizSubject>(initialSubject);
  const [level, setLevel] = useState<DictLevel | "All">("All");
  const [length, setLength] = useState<number>(10);

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [current, setCurrent] = useState(0);

  const [bests, setBests] = useState<Bests>({});
  const [newBest, setNewBest] = useState(false);

  // Load saved best scores (client-only, so SSR markup stays stable).
  useEffect(() => {
    try {
      const saved = localStorage.getItem(BESTS_KEY);
      if (saved) setBests(JSON.parse(saved));
    } catch {
      /* ignore */
    }
  }, []);

  const available = subjectCount(subject, level);

  const start = () => {
    const qs = generateQuiz(subject, level, length);
    setQuestions(qs);
    setAnswers(new Array(qs.length).fill(null));
    setCurrent(0);
    setNewBest(false);
    setPhase("active");
  };

  // Score the exam, persist a new personal best if beaten, then show results.
  const finish = () => {
    const correct = questions.reduce(
      (n, q, i) => n + (answers[i] === q.correctIndex ? 1 : 0),
      0,
    );
    const pct = questions.length ? Math.round((correct / questions.length) * 100) : 0;
    const prev = bests[subject];
    const improved = !prev || pct > prev.pct;
    if (improved) {
      const next: Bests = {
        ...bests,
        [subject]: {
          pct,
          correct,
          total: questions.length,
          level,
          date: new Date().toISOString(),
        },
      };
      setBests(next);
      try {
        localStorage.setItem(BESTS_KEY, JSON.stringify(next));
      } catch {
        /* ignore quota / privacy errors */
      }
    }
    setNewBest(improved);
    setPhase("results");
  };

  const reset = () => setPhase("setup");

  if (phase === "setup") {
    return (
      <Setup
        subject={subject}
        setSubject={setSubject}
        level={level}
        setLevel={setLevel}
        length={length}
        setLength={setLength}
        available={available}
        bests={bests}
        onStart={start}
      />
    );
  }

  if (phase === "active") {
    return (
      <Exam
        questions={questions}
        answers={answers}
        setAnswers={setAnswers}
        current={current}
        setCurrent={setCurrent}
        subject={subject}
        onSubmit={finish}
        onQuit={reset}
      />
    );
  }

  return (
    <Results
      questions={questions}
      answers={answers}
      subject={subject}
      best={bests[subject]}
      newBest={newBest}
      onRetake={start}
      onNew={reset}
    />
  );
}

/* ─────────────── Setup ─────────────── */
function Setup({
  subject,
  setSubject,
  level,
  setLevel,
  length,
  setLength,
  available,
  bests,
  onStart,
}: {
  subject: QuizSubject;
  setSubject: (s: QuizSubject) => void;
  level: DictLevel | "All";
  setLevel: (l: DictLevel | "All") => void;
  length: number;
  setLength: (n: number) => void;
  available: number;
  bests: Bests;
  onStart: () => void;
}) {
  const willAsk = Math.min(length, Math.max(available, 0));

  return (
    <div className="space-y-7">
      {/* Subject */}
      <div>
        <p className="eyebrow mb-2">1 · Pick your subject</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {QUIZ_SUBJECTS.map((s) => {
            const active = subject === s.key;
            const best = bests[s.key];
            return (
              <button
                key={s.key}
                onClick={() => setSubject(s.key)}
                className={`card flex items-start gap-3 p-4 text-left transition-colors ${
                  active ? "" : "card-hover"
                }`}
                style={active ? { borderColor: s.color, backgroundColor: `${s.color}12` } : undefined}
              >
                <span className="text-2xl">{s.icon}</span>
                <span className="min-w-0 flex-1">
                  <span
                    className="block font-bold"
                    style={{ color: active ? s.color : undefined }}
                  >
                    {s.label}
                  </span>
                  <span className="text-xs text-muted">{s.blurb}</span>
                </span>
                {best && (
                  <span
                    className="shrink-0 rounded-full border px-2 py-0.5 text-[0.6rem] font-bold"
                    style={{ color: s.color, borderColor: `${s.color}66`, backgroundColor: `${s.color}14` }}
                    title={`Best: ${best.correct}/${best.total}`}
                  >
                    ★ {best.pct}%
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Level */}
      <div>
        <p className="eyebrow mb-2">2 · Difficulty</p>
        <div className="flex flex-wrap gap-2">
          {LEVELS.map((l) => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={`chip ${level === l ? "chip-active" : "hover:border-gold/60"}`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Length */}
      <div>
        <p className="eyebrow mb-2">3 · How many questions</p>
        <div className="flex flex-wrap gap-2">
          {LENGTHS.map((n) => (
            <button
              key={n}
              onClick={() => setLength(n)}
              className={`chip ${length === n ? "chip-active" : "hover:border-gold/60"}`}
            >
              {n} questions
            </button>
          ))}
        </div>
      </div>

      <div className="card flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          {available < 4 ? (
            <span className="text-neon-pink">
              Only {available} terms here — pick a broader subject or level.
            </span>
          ) : (
            <>
              Exam mode — you&apos;ll see your score and full review at the end.{" "}
              <span className="text-text">
                {willAsk} question{willAsk === 1 ? "" : "s"}
              </span>{" "}
              from <span className="text-gold">{subject}</span>.
            </>
          )}
        </p>
        <button
          onClick={onStart}
          disabled={available < 4}
          className="btn-violet shrink-0 px-6 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Start exam →
        </button>
      </div>
    </div>
  );
}

/* ─────────────── Exam (no feedback until submit) ─────────────── */
function Exam({
  questions,
  answers,
  setAnswers,
  current,
  setCurrent,
  subject,
  onSubmit,
  onQuit,
}: {
  questions: QuizQuestion[];
  answers: (number | null)[];
  setAnswers: (a: (number | null)[]) => void;
  current: number;
  setCurrent: (n: number) => void;
  subject: QuizSubject;
  onSubmit: () => void;
  onQuit: () => void;
}) {
  const q = questions[current];
  const answeredCount = answers.filter((a) => a !== null).length;
  const isLast = current === questions.length - 1;

  const choose = (i: number) => {
    const next = [...answers];
    next[current] = i;
    setAnswers(next);
  };

  return (
    <div className="space-y-5">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-3">
        <button onClick={onQuit} className="text-xs text-muted hover:text-neon-pink">
          ✕ Quit
        </button>
        <span className="text-xs text-muted">
          <span className="font-bold text-gold">{subject}</span> · {answeredCount}/
          {questions.length} answered
        </span>
      </div>

      {/* Progress */}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-gold to-violet-soft transition-all"
          style={{ width: `${((current + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <article className="card animate-fade-up p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-light">
          Q{current + 1} / {questions.length} · {q.promptLabel}
        </p>
        <p className="mt-3 text-lg leading-relaxed text-text">{q.prompt}</p>

        <div className="mt-5 space-y-2.5">
          {q.options.map((opt, i) => {
            const selected = answers[current] === i;
            return (
              <button
                key={i}
                onClick={() => choose(i)}
                className={`flex w-full items-center gap-3 rounded-xl border p-3.5 text-left text-sm transition-colors ${
                  selected
                    ? "border-gold bg-gold/10 text-text"
                    : "border-line text-text/85 hover:border-violet-soft/60"
                }`}
              >
                <span
                  className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border text-xs font-bold ${
                    selected ? "border-gold bg-gold text-bg" : "border-line text-muted"
                  }`}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            );
          })}
        </div>
      </article>

      {/* Question dots */}
      <div className="flex flex-wrap gap-1.5">
        {questions.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to question ${i + 1}`}
            className={`h-7 w-7 rounded-md border text-[0.65rem] font-bold transition-colors ${
              i === current
                ? "border-gold bg-gold text-bg"
                : answers[i] !== null
                  ? "border-violet-soft/60 bg-violet/20 text-violet-light"
                  : "border-line text-muted hover:border-violet-soft/60"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Nav */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => setCurrent(Math.max(0, current - 1))}
          disabled={current === 0}
          className="btn-ghost px-5 disabled:opacity-40"
        >
          ← Prev
        </button>
        {isLast ? (
          <button onClick={onSubmit} className="btn-gold px-6">
            Submit exam ✓
          </button>
        ) : (
          <button
            onClick={() => setCurrent(Math.min(questions.length - 1, current + 1))}
            className="btn-violet px-6"
          >
            Next →
          </button>
        )}
      </div>

      {answeredCount < questions.length && (
        <p className="text-center text-xs text-muted">
          {questions.length - answeredCount} unanswered · you can submit anytime, blanks
          count as wrong.
        </p>
      )}
    </div>
  );
}

/* ─────────────── Results ─────────────── */
function Results({
  questions,
  answers,
  subject,
  best,
  newBest,
  onRetake,
  onNew,
}: {
  questions: QuizQuestion[];
  answers: (number | null)[];
  subject: QuizSubject;
  best?: BestEntry;
  newBest: boolean;
  onRetake: () => void;
  onNew: () => void;
}) {
  const correct = useMemo(
    () => questions.reduce((n, q, i) => n + (answers[i] === q.correctIndex ? 1 : 0), 0),
    [questions, answers],
  );
  const pct = Math.round((correct / questions.length) * 100);
  const grade = gradeLabel(pct);

  return (
    <div className="space-y-6">
      {/* Score hero */}
      <div className="card flex flex-col items-center gap-3 p-8 text-center">
        <p className="eyebrow">{subject} · exam complete</p>
        <div className="text-6xl font-black" style={{ color: grade.color }}>
          {pct}%
        </div>
        <p className="text-lg font-bold text-text">
          {correct} / {questions.length} correct ·{" "}
          <span style={{ color: grade.color }}>{grade.label}</span>
        </p>
        {newBest ? (
          <span className="rounded-full border border-gold/50 bg-gold/10 px-3 py-1 text-xs font-bold text-gold">
            🎉 New personal best!
          </span>
        ) : (
          best && (
            <span className="text-xs text-muted">
              Your best for {subject}: <span className="text-text">{best.pct}%</span>
            </span>
          )
        )}
        <div className="mt-2 flex gap-2">
          <button onClick={onRetake} className="btn-violet px-5">
            ↻ Retake
          </button>
          <button onClick={onNew} className="btn-ghost px-5">
            New exam
          </button>
        </div>
      </div>

      {/* Review */}
      <div>
        <p className="eyebrow mb-2">Review — tap any term to study it</p>
        <div className="space-y-3">
          {questions.map((q, i) => {
            const your = answers[i];
            const right = your === q.correctIndex;
            return (
              <article
                key={q.id}
                className={`card overflow-hidden border-l-[3px] p-5 ${
                  right ? "border-l-[#34d399]" : "border-l-[#ff6b6b]"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted">
                    Q{i + 1} · {q.promptLabel}
                  </p>
                  <span className={right ? "text-[#34d399]" : "text-[#ff6b6b]"}>
                    {right ? "✓ Correct" : "✗ Wrong"}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-text/90">{q.prompt}</p>

                <div className="mt-3 space-y-1.5 text-sm">
                  {!right && (
                    <p className="text-[#ff9b9b]">
                      Your answer:{" "}
                      {your === null ? (
                        <span className="italic text-muted">(blank)</span>
                      ) : (
                        q.options[your]
                      )}
                    </p>
                  )}
                  <p className="text-[#34d399]">Answer: {q.options[q.correctIndex]}</p>
                </div>

                <Link
                  href={`/dictionary#term-${q.termId}`}
                  className="mt-3 inline-flex text-xs font-medium text-gold hover:underline"
                >
                  Study “{q.term}” in the dictionary →
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
