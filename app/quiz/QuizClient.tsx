"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import type { DictLevel } from "@/data/dictionary";
import {
  QUIZ_SUBJECTS,
  generateQuiz,
  generateQuizFromTerms,
  subjectCount,
  gradeLabel,
  type QuizSubject,
  type QuizQuestion,
} from "@/app/lib/quiz";
import { useHydrated, useLearner } from "@/app/lib/learner/store";
import { addCards, localDay, recordQuizRun, weakTermIds } from "@/app/lib/learner/state";
import { tint } from "@/app/lib/color";

type Phase = "setup" | "active" | "results";
type Mode = "practice" | "exam";
// What produced the current run, so "Retake" can regenerate it.
type Source = { kind: "subject"; subject: QuizSubject; level: DictLevel | "All" } | { kind: "terms"; label: string; ids: string[] };

const LEVELS: (DictLevel | "All")[] = ["All", "Beginner", "Intermediate", "Advanced"];
const LENGTHS = [5, 10, 20];
const KEY_TO_OPTION: Record<string, number> = { "1": 0, "2": 1, "3": 2, "4": 3, a: 0, b: 1, c: 2, d: 3 };

function sourceLabel(source: Source): string {
  return source.kind === "subject" ? source.subject : source.label;
}

export default function QuizClient() {
  // ?subject= is read here rather than in the page's server component, which
  // would opt the route out of static rendering for one optional query param.
  const params = useSearchParams();
  const requested = params.get("subject");
  const initialSubject =
    (QUIZ_SUBJECTS.find((s) => s.key === requested)?.key as QuizSubject | undefined) ?? "Tech Dictionary";
  // Lesson pages link here with ?terms=a,b,c&label=… — untrusted input, so ids are
  // only ever used as a filter over the dictionary and the label is length-capped.
  const lessonTermIds = useMemo(
    () => (params.get("terms") ?? "").split(",").map((id) => id.trim()).filter((id) => /^[a-z0-9-]{1,64}$/.test(id)).slice(0, 20),
    [params],
  );
  const lessonLabel = (params.get("label") ?? "Lesson quiz").slice(0, 80);

  const [learner, update] = useLearner();
  const hydrated = useHydrated();

  const [phase, setPhase] = useState<Phase>("setup");
  const [mode, setMode] = useState<Mode>("practice");
  const [subject, setSubject] = useState<QuizSubject>(initialSubject);
  const [level, setLevel] = useState<DictLevel | "All">("All");
  const [length, setLength] = useState<number>(10);

  const [source, setSource] = useState<Source>({ kind: "subject", subject: initialSubject, level: "All" });
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [current, setCurrent] = useState(0);
  const [newBest, setNewBest] = useState(false);

  const weak = useMemo(() => weakTermIds(learner), [learner]);

  // Each phase is effectively a new screen; start it at the top, not mid-scroll.
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [phase]);

  const run = (next: Source, runMode: Mode, count: number) => {
    const qs =
      next.kind === "subject"
        ? generateQuiz(next.subject, next.level, count)
        : generateQuizFromTerms(next.ids, count);
    setSource(next);
    setMode(runMode);
    setQuestions(qs);
    setAnswers(new Array(qs.length).fill(null));
    setCurrent(0);
    setNewBest(false);
    setPhase("active");
  };

  const finish = () => {
    const results = questions.map((q, i) => ({ termId: q.termId, correct: answers[i] === q.correctIndex }));
    const correct = results.filter((r) => r.correct).length;
    let beatBest = false;
    update((state) => {
      const recorded = recordQuizRun(
        state,
        { subject: sourceLabel(source), mode, correct, total: questions.length, date: new Date().toISOString() },
        results,
      );
      beatBest = recorded.newBest;
      return recorded.state;
    });
    setNewBest(beatBest);
    setPhase("results");
  };

  if (phase === "setup") {
    return (
      <Setup
        mode={mode}
        setMode={setMode}
        subject={subject}
        setSubject={setSubject}
        level={level}
        setLevel={setLevel}
        length={length}
        setLength={setLength}
        bests={learner.quiz.bests}
        weakCount={hydrated ? weak.length : 0}
        lessonQuiz={lessonTermIds.length > 0 ? { label: lessonLabel, count: lessonTermIds.length } : undefined}
        onStart={() => run({ kind: "subject", subject, level }, mode, length)}
        onWeakSpots={() => run({ kind: "terms", label: "Weak spots", ids: weak }, "practice", 10)}
        onLessonQuiz={() => run({ kind: "terms", label: lessonLabel, ids: lessonTermIds }, "practice", lessonTermIds.length)}
      />
    );
  }

  if (phase === "active") {
    return (
      <Exam
        mode={mode}
        label={sourceLabel(source)}
        questions={questions}
        answers={answers}
        setAnswers={setAnswers}
        current={current}
        setCurrent={setCurrent}
        onSubmit={finish}
        onQuit={() => setPhase("setup")}
      />
    );
  }

  const missedIds = questions.filter((q, i) => answers[i] !== q.correctIndex).map((q) => q.termId);
  return (
    <Results
      mode={mode}
      label={sourceLabel(source)}
      questions={questions}
      answers={answers}
      best={learner.quiz.bests[sourceLabel(source)]}
      newBest={newBest}
      onRetake={() => run(source, mode, questions.length)}
      onRetryMissed={() => run({ kind: "terms", label: "Missed terms", ids: missedIds }, "practice", missedIds.length)}
      onAddToFlashcards={() => update((state) => addCards(state, missedIds, localDay(new Date())))}
      onNew={() => setPhase("setup")}
    />
  );
}

/* ─────────────── Setup ─────────────── */
function Setup({
  mode,
  setMode,
  subject,
  setSubject,
  level,
  setLevel,
  length,
  setLength,
  bests,
  weakCount,
  lessonQuiz,
  onStart,
  onWeakSpots,
  onLessonQuiz,
}: {
  mode: Mode;
  setMode: (m: Mode) => void;
  subject: QuizSubject;
  setSubject: (s: QuizSubject) => void;
  level: DictLevel | "All";
  setLevel: (l: DictLevel | "All") => void;
  length: number;
  setLength: (n: number) => void;
  bests: Record<string, { pct: number; correct: number; total: number }>;
  weakCount: number;
  lessonQuiz?: { label: string; count: number };
  onStart: () => void;
  onWeakSpots: () => void;
  onLessonQuiz: () => void;
}) {
  const available = subjectCount(subject, level);
  const willAsk = Math.min(length, Math.max(available, 0));

  return (
    <div className="space-y-7">
      {lessonQuiz && (
        <div className="card flex flex-col gap-3 border-violet-soft/50 p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-text/85">
            <span className="eyebrow block">From your lesson</span>
            <span className="font-bold text-text">{lessonQuiz.label}</span> — {lessonQuiz.count} term
            {lessonQuiz.count === 1 ? "" : "s"}, practice mode.
          </p>
          <button onClick={onLessonQuiz} className="btn-violet shrink-0 px-5">
            Start lesson quiz →
          </button>
        </div>
      )}

      {weakCount > 0 && (
        <div className="card flex flex-col gap-3 border-gold/40 p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-text/85">
            <span className="font-bold text-gold">{weakCount} weak spot{weakCount === 1 ? "" : "s"}</span> — terms
            you&apos;ve missed before. A short practice round turns them around fastest.
          </p>
          <button onClick={onWeakSpots} className="btn-gold shrink-0 px-5">
            Practice weak spots →
          </button>
        </div>
      )}

      {/* Mode */}
      <div>
        <p className="eyebrow mb-2">1 · How do you want to play?</p>
        <div className="grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Quiz mode">
          {(
            [
              ["practice", "Practice", "Instant feedback and a plain-English explanation after every answer."],
              ["exam", "Exam", "No hints until the end. Your score counts toward your personal best."],
            ] as const
          ).map(([key, title, blurb]) => (
            <button
              key={key}
              role="radio"
              aria-checked={mode === key}
              onClick={() => setMode(key)}
              className={`card p-4 text-left transition-colors ${mode === key ? "!border-violet-soft/60 bg-violet-soft/10" : "card-hover"}`}
            >
              <span className={`block font-bold ${mode === key ? "text-violet-light" : "text-text"}`}>{title}</span>
              <span className="text-xs text-muted">{blurb}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Subject */}
      <div>
        <p className="eyebrow mb-2">2 · Pick your subject</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {QUIZ_SUBJECTS.map((s) => {
            const active = subject === s.key;
            const best = bests[s.key];
            return (
              <button
                key={s.key}
                onClick={() => setSubject(s.key)}
                aria-pressed={active}
                className={`card flex items-start gap-3 p-4 text-left transition-colors ${active ? "" : "card-hover"}`}
                style={active ? { borderColor: s.color, backgroundColor: tint(s.color, 7) } : undefined}
              >
                <span className="text-2xl" aria-hidden>
                  {s.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-bold" style={{ color: active ? s.color : undefined }}>
                    {s.label}
                  </span>
                  <span className="text-xs text-muted">{s.blurb}</span>
                </span>
                {best && (
                  <span
                    className="shrink-0 rounded-full border px-2 py-0.5 text-[0.6rem] font-bold"
                    style={{ color: s.color, borderColor: tint(s.color, 40), backgroundColor: tint(s.color, 8) }}
                    title={`Best exam: ${best.correct}/${best.total}`}
                  >
                    ★ {best.pct}%
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Level + length */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <p className="eyebrow mb-2">3 · Difficulty</p>
          <div className="flex flex-wrap gap-2">
            {LEVELS.map((l) => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                aria-pressed={level === l}
                className={`chip ${level === l ? "chip-active" : "hover:border-gold/60"}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow mb-2">4 · Length</p>
          <div className="flex flex-wrap gap-2">
            {LENGTHS.map((n) => (
              <button
                key={n}
                onClick={() => setLength(n)}
                aria-pressed={length === n}
                className={`chip ${length === n ? "chip-active" : "hover:border-gold/60"}`}
              >
                {n} questions
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          {available < 4 ? (
            <span className="text-neon-pink">Only {available} terms here — pick a broader subject or level.</span>
          ) : (
            <>
              <span className="text-text">
                {willAsk} question{willAsk === 1 ? "" : "s"}
              </span>{" "}
              from <span className="text-gold">{subject}</span> ·{" "}
              {mode === "practice" ? "practice mode" : "exam mode"}. Answer with keys{" "}
              <kbd className="rounded border border-line px-1 font-mono text-[0.7rem]">1</kbd>–
              <kbd className="rounded border border-line px-1 font-mono text-[0.7rem]">4</kbd>, next with{" "}
              <kbd className="rounded border border-line px-1 font-mono text-[0.7rem]">Enter</kbd>.
            </>
          )}
        </p>
        <button
          onClick={onStart}
          disabled={available < 4}
          className="btn-violet shrink-0 px-6 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Start →
        </button>
      </div>
    </div>
  );
}

/* ─────────────── Active run ─────────────── */
function Exam({
  mode,
  label,
  questions,
  answers,
  setAnswers,
  current,
  setCurrent,
  onSubmit,
  onQuit,
}: {
  mode: Mode;
  label: string;
  questions: QuizQuestion[];
  answers: (number | null)[];
  setAnswers: (a: (number | null)[]) => void;
  current: number;
  setCurrent: (n: number) => void;
  onSubmit: () => void;
  onQuit: () => void;
}) {
  const q = questions[current];
  const chosen = answers[current];
  const answeredCount = answers.filter((a) => a !== null).length;
  const isLast = current === questions.length - 1;
  // Practice locks an answer once given and reveals it; exam lets you change your mind.
  const revealed = mode === "practice" && chosen !== null;

  // Consecutive correct answers ending at the latest answered question.
  const streak = useMemo(() => {
    let count = 0;
    for (let i = current; i >= 0; i--) {
      if (answers[i] === null) {
        if (i === current) continue;
        break;
      }
      if (answers[i] !== questions[i].correctIndex) break;
      count++;
    }
    return count;
  }, [answers, current, questions]);

  const choose = useCallback(
    (i: number) => {
      if (revealed) return;
      const next = [...answers];
      next[current] = i;
      setAnswers(next);
    },
    [answers, current, revealed, setAnswers],
  );

  const advance = useCallback(() => {
    if (mode === "practice" && chosen === null) return;
    if (isLast) onSubmit();
    else setCurrent(current + 1);
  }, [chosen, current, isLast, mode, onSubmit, setCurrent]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;
      const option = KEY_TO_OPTION[event.key.toLowerCase()];
      if (option !== undefined && option < q.options.length) {
        event.preventDefault();
        choose(option);
      } else if (event.key === "Enter" || event.key === "ArrowRight") {
        event.preventDefault();
        advance();
      } else if (event.key === "ArrowLeft" && mode === "exam" && current > 0) {
        setCurrent(current - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance, choose, current, mode, q.options.length, setCurrent]);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <button onClick={onQuit} className="text-xs text-muted hover:text-neon-pink">
          ✕ Quit
        </button>
        <span className="text-xs text-muted">
          <span className="font-bold text-gold">{label}</span> · {mode} · {answeredCount}/{questions.length} answered
          {mode === "practice" && streak >= 2 && (
            <span className="ml-2 font-bold text-gold" aria-live="polite">
              🔥 {streak} in a row
            </span>
          )}
        </span>
      </div>

      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-text/10"
        role="progressbar"
        aria-valuenow={current + 1}
        aria-valuemin={1}
        aria-valuemax={questions.length}
        aria-label="Quiz progress"
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-gold to-violet-soft transition-all"
          style={{ width: `${((current + 1) / questions.length) * 100}%` }}
        />
      </div>

      <article className="card p-6" key={q.id}>
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-light">
          Q{current + 1} / {questions.length} · {q.promptLabel}
        </p>
        <p className="mt-3 text-lg leading-relaxed text-text">{q.prompt}</p>

        <div className="mt-5 space-y-2.5">
          {q.options.map((opt, i) => {
            const selected = chosen === i;
            const isAnswer = i === q.correctIndex;
            let tone = selected ? "border-violet-soft bg-violet-soft/10 text-text" : "border-line text-text/85 hover:border-violet-soft/60";
            if (revealed && isAnswer) tone = "border-success bg-success/10 text-text";
            else if (revealed && selected) tone = "border-danger bg-danger/10 text-text";
            else if (revealed) tone = "border-line text-text/50";
            return (
              <button
                key={i}
                onClick={() => choose(i)}
                disabled={revealed}
                aria-pressed={selected}
                className={`flex w-full items-center gap-3 rounded-xl border p-3.5 text-left text-sm transition-colors disabled:cursor-default ${tone}`}
              >
                <span
                  className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border text-xs font-bold ${
                    selected ? "border-violet bg-violet text-white" : "border-line text-muted"
                  }`}
                >
                  {i + 1}
                </span>
                <span className="flex-1">{opt}</span>
                {revealed && isAnswer && <span className="text-success">✓</span>}
                {revealed && selected && !isAnswer && <span className="text-danger">✗</span>}
              </button>
            );
          })}
        </div>

        {revealed && (
          <div className="mt-5 border-l-2 border-gold pl-4" aria-live="polite">
            <p className={`text-sm font-bold ${chosen === q.correctIndex ? "text-success" : "text-danger"}`}>
              {chosen === q.correctIndex ? "Correct." : `Not quite — it's ${q.term}.`}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-text/80">{q.explanation}</p>
            <Link href={`/dictionary/${q.termId}`} target="_blank" className="mt-2 inline-flex text-xs text-gold hover:underline">
              Read the full entry for {q.term} ↗
            </Link>
          </div>
        )}
      </article>

      {mode === "exam" && (
        <div className="flex flex-wrap gap-1.5">
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to question ${i + 1}${answers[i] !== null ? " (answered)" : ""}`}
              className={`h-7 w-7 rounded-md border text-[0.65rem] font-bold transition-colors ${
                i === current
                  ? "border-violet bg-violet text-white"
                  : answers[i] !== null
                    ? "border-violet-soft/60 bg-violet/20 text-violet-light"
                    : "border-line text-muted hover:border-violet-soft/60"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between gap-3">
        {mode === "exam" ? (
          <button
            onClick={() => setCurrent(Math.max(0, current - 1))}
            disabled={current === 0}
            className="btn-ghost px-5 disabled:opacity-40"
          >
            ← Prev
          </button>
        ) : (
          <span />
        )}
        <button
          onClick={advance}
          disabled={mode === "practice" && chosen === null}
          className={`${isLast ? "btn-gold" : "btn-violet"} px-6 disabled:cursor-not-allowed disabled:opacity-40`}
        >
          {isLast ? (mode === "exam" ? "Submit exam ✓" : "See results ✓") : "Next →"}
        </button>
      </div>

      {mode === "exam" && answeredCount < questions.length && (
        <p className="text-center text-xs text-muted">
          {questions.length - answeredCount} unanswered · you can submit anytime, blanks count as wrong.
        </p>
      )}
    </div>
  );
}

/* ─────────────── Results ─────────────── */
function Results({
  mode,
  label,
  questions,
  answers,
  best,
  newBest,
  onRetake,
  onRetryMissed,
  onAddToFlashcards,
  onNew,
}: {
  mode: Mode;
  label: string;
  questions: QuizQuestion[];
  answers: (number | null)[];
  best?: { pct: number };
  newBest: boolean;
  onRetake: () => void;
  onRetryMissed: () => void;
  onAddToFlashcards: () => void;
  onNew: () => void;
}) {
  const [addedToCards, setAddedToCards] = useState(false);
  const correct = questions.reduce((n, q, i) => n + (answers[i] === q.correctIndex ? 1 : 0), 0);
  const missed = questions.length - correct;
  const pct = Math.round((correct / questions.length) * 100);
  const grade = gradeLabel(pct);

  const byCategory = useMemo(() => {
    const groups = new Map<string, { right: number; total: number }>();
    questions.forEach((q, i) => {
      const group = groups.get(q.category) ?? { right: 0, total: 0 };
      group.total++;
      if (answers[i] === q.correctIndex) group.right++;
      groups.set(q.category, group);
    });
    return [...groups.entries()].sort((a, b) => a[1].right / a[1].total - b[1].right / b[1].total);
  }, [questions, answers]);

  return (
    <div className="space-y-6">
      <div className="card flex flex-col items-center gap-3 p-8 text-center">
        <p className="eyebrow">
          {label} · {mode} complete
        </p>
        <div className="text-6xl font-black" style={{ color: grade.color }}>
          {pct}%
        </div>
        <p className="text-lg font-bold text-text">
          {correct} / {questions.length} correct · <span style={{ color: grade.color }}>{grade.label}</span>
        </p>
        {newBest ? (
          <span className="rounded-full border border-gold/50 bg-gold/10 px-3 py-1 text-xs font-bold text-gold">
            🎉 New personal best!
          </span>
        ) : (
          mode === "exam" &&
          best && (
            <span className="text-xs text-muted">
              Your best exam for {label}: <span className="text-text">{best.pct}%</span>
            </span>
          )
        )}
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          {missed > 0 && (
            <button onClick={onRetryMissed} className="btn-gold px-5">
              Retry the {missed} I missed
            </button>
          )}
          {missed > 0 && (
            <button
              onClick={() => {
                onAddToFlashcards();
                setAddedToCards(true);
              }}
              disabled={addedToCards}
              className="btn-ghost px-5 disabled:opacity-60"
            >
              {addedToCards ? "✓ Added to flashcards" : "Add misses to flashcards"}
            </button>
          )}
          <button onClick={onRetake} className="btn-violet px-5">
            ↻ New questions
          </button>
          <button onClick={onNew} className="btn-ghost px-5">
            Change settings
          </button>
        </div>
        {addedToCards && (
          <Link href="/flashcards" className="text-xs text-gold hover:underline">
            Review them now in Flashcards →
          </Link>
        )}
      </div>

      {byCategory.length > 1 && (
        <div className="card p-5">
          <p className="eyebrow mb-3">By category — weakest first</p>
          <ul className="space-y-2.5">
            {byCategory.map(([category, { right, total }]) => (
              <li key={category} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 text-sm">
                <span className="truncate text-text/85">{category}</span>
                <span className="font-mono text-xs text-muted">
                  {right}/{total}
                </span>
                <span className="col-span-2 h-1.5 overflow-hidden rounded-full bg-text/10">
                  <span
                    className="block h-full rounded-full bg-gradient-to-r from-gold to-violet-soft"
                    style={{ width: `${(right / total) * 100}%` }}
                  />
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <p className="eyebrow mb-2">Review</p>
        <div className="space-y-3">
          {questions.map((q, i) => {
            const your = answers[i];
            const right = your === q.correctIndex;
            return (
              <article
                key={q.id}
                className={`card overflow-hidden border-l-[3px] p-5 ${right ? "border-l-success" : "border-l-danger"}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted">
                    Q{i + 1} · {q.promptLabel}
                  </p>
                  <span className={right ? "text-success" : "text-danger"}>{right ? "✓ Correct" : "✗ Wrong"}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-text/90">{q.prompt}</p>
                <div className="mt-3 space-y-1.5 text-sm">
                  {!right && (
                    <p className="text-danger">
                      Your answer: {your === null ? <span className="italic text-muted">(blank)</span> : q.options[your]}
                    </p>
                  )}
                  <p className="text-success">Answer: {q.options[q.correctIndex]}</p>
                  {!right && <p className="text-text/70">{q.explanation}</p>}
                </div>
                <Link href={`/dictionary/${q.termId}`} className="mt-3 inline-flex text-xs font-medium text-gold hover:underline">
                  Study “{q.term}” →
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
