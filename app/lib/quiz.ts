// Auto-generates multiple-choice exams from the Tech Dictionary.
// Pure data logic — no React. Runs client-side, so Math.random is fine here.

import { DICTIONARY, type DictionaryTerm, type DictLevel } from "@/data/dictionary";

export type QuizSubject =
  | "Tech Dictionary"
  | "Claude"
  | "GoHighLevel"
  | "Automation Hub";

export const QUIZ_SUBJECTS: {
  key: QuizSubject;
  label: string;
  blurb: string;
  icon: string;
  color: string;
}[] = [
  {
    key: "Tech Dictionary",
    label: "Tech Dictionary",
    blurb: "Everything — all 7 categories.",
    icon: "📘",
    color: "#f6cb1f",
  },
  {
    key: "Claude",
    label: "Claude",
    blurb: "Models, MCP, Claude Code, Skills.",
    icon: "✦",
    color: "#ff8a3d",
  },
  {
    key: "GoHighLevel",
    label: "GoHighLevel",
    blurb: "LC Phone, A2P, AI Employee, workflows.",
    icon: "📶",
    color: "#34d399",
  },
  {
    key: "Automation Hub",
    label: "Automation Hub",
    blurb: "n8n · Make · Zapier + agentic AI.",
    icon: "⚙",
    color: "#38bdf8",
  },
];

// Map each exam subject onto dictionary categories.
function poolFor(subject: QuizSubject): DictionaryTerm[] {
  switch (subject) {
    case "Claude":
      return DICTIONARY.filter((t) => t.category === "Claude");
    case "GoHighLevel":
      return DICTIONARY.filter((t) => t.category === "GoHighLevel");
    case "Automation Hub":
      return DICTIONARY.filter(
        (t) => t.category === "Automation Platforms" || t.category === "Agentic AI",
      );
    case "Tech Dictionary":
    default:
      return DICTIONARY;
  }
}

export function subjectCount(subject: QuizSubject, level: DictLevel | "All"): number {
  return poolFor(subject).filter((t) => level === "All" || t.level === level).length;
}

export type QuizKind = "def-to-term" | "term-to-def" | "analogy-to-term";

export interface QuizQuestion {
  id: string;
  kind: QuizKind;
  promptLabel: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  termId: string;
  term: string;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const LABELS: Record<QuizKind, string> = {
  "def-to-term": "Which term matches this definition?",
  "term-to-def": "What does this term mean?",
  "analogy-to-term": "Which term fits this analogy?",
};

// Pick `n` distinct distractor strings, preferring the same subject pool,
// then falling back to the whole dictionary so options are always full.
function pickDistractors(
  answer: string,
  answerId: string,
  valueOf: (t: DictionaryTerm) => string,
  pool: DictionaryTerm[],
  n = 3,
): string[] {
  const seen = new Set([answer.trim()]);
  const out: string[] = [];
  for (const t of shuffle([...pool, ...DICTIONARY])) {
    if (t.id === answerId) continue;
    const v = valueOf(t).trim();
    if (!v || seen.has(v)) continue;
    seen.add(v);
    out.push(v);
    if (out.length === n) break;
  }
  return out;
}

function buildQuestion(term: DictionaryTerm, kind: QuizKind, pool: DictionaryTerm[]): QuizQuestion {
  // Fall back to def-to-term when a term has no analogy.
  const effectiveKind: QuizKind =
    kind === "analogy-to-term" && !term.analogy ? "def-to-term" : kind;

  let prompt: string;
  let answer: string;
  let valueOf: (t: DictionaryTerm) => string;

  if (effectiveKind === "term-to-def") {
    prompt = term.aliases.length ? `${term.term} (${term.aliases.join(", ")})` : term.term;
    answer = term.definition;
    valueOf = (t) => t.definition;
  } else if (effectiveKind === "analogy-to-term") {
    prompt = term.analogy as string;
    answer = term.term;
    valueOf = (t) => t.term;
  } else {
    prompt = term.definition;
    answer = term.term;
    valueOf = (t) => t.term;
  }

  const distractors = pickDistractors(answer, term.id, valueOf, pool);
  const options = shuffle([answer, ...distractors]);

  return {
    id: `${term.id}-${effectiveKind}`,
    kind: effectiveKind,
    promptLabel: LABELS[effectiveKind],
    prompt,
    options,
    correctIndex: options.indexOf(answer),
    termId: term.id,
    term: term.term,
  };
}

export function generateQuiz(
  subject: QuizSubject,
  level: DictLevel | "All",
  count: number,
): QuizQuestion[] {
  let pool = poolFor(subject).filter((t) => level === "All" || t.level === level);
  // Need at least 4 terms to make 4 options; relax the level filter if too thin.
  if (pool.length < 4) pool = poolFor(subject);

  const chosen = shuffle(pool).slice(0, Math.min(count, pool.length));
  const kinds: QuizKind[] = ["def-to-term", "term-to-def", "analogy-to-term"];

  return chosen.map((term, i) => buildQuestion(term, kinds[i % 3], pool));
}

export function gradeLabel(pct: number): { label: string; color: string } {
  if (pct >= 90) return { label: "Expert 🏆", color: "#34d399" };
  if (pct >= 75) return { label: "Sharp 🔥", color: "#f6cb1f" };
  if (pct >= 50) return { label: "Getting there 💪", color: "#ff8a3d" };
  return { label: "Keep studying 📚", color: "#ff6b6b" };
}
