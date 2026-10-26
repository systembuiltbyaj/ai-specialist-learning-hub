// Fields every reference entry carries so it can show where a claim came from
// and when someone last checked it. Shared by the dictionary and the model
// registry; kept free of runtime imports so Node can load it without a bundler.

export type ContentStatus = "current" | "emerging" | "deprecated";

export interface Source {
  label: string;
  url: string;
}

// Models have a lifecycle that terms don't: a vendor ships a preview, keeps an
// older model callable ("legacy"), announces a shutdown ("deprecated"), then removes it.
export type ModelStatus = "preview" | "current" | "legacy" | "deprecated" | "retired";
export type ModelTier = "flagship" | "balanced" | "fast" | "reasoning" | "open-weight" | "media" | "other";

export interface ModelEntry {
  id: string;
  vendor: string;
  name: string;
  // The exact string you pass to the vendor API, or the Hugging Face repo for open weights.
  apiId?: string;
  tier: ModelTier;
  // YYYY-MM-DD, or YYYY-MM when the vendor only published the month.
  releasedOn?: string;
  status: ModelStatus;
  contextTokens?: number;
  // Prices change without notice, so they're stored as a dated note, never a number.
  pricingNote?: string;
  summary: string;
  sources: Source[];
  lastVerified: string;
}

// ── Learning paths & projects ──
// Lessons and projects reference dictionary terms by id rather than copying
// definitions, so a corrected term fixes every lesson that uses it.

export type Level = "Beginner" | "Intermediate" | "Advanced";

export interface CodeSample {
  language: string;
  content: string;
}

export interface LessonSection {
  heading: string;
  // Plain text; blank lines separate paragraphs. No markdown is rendered.
  body: string;
  code?: CodeSample;
}

export interface Exercise {
  prompt: string;
  steps: string[];
  // What "done" looks like, so a learner can check themselves.
  successCheck: string;
}

export interface Lesson {
  id: string;
  title: string;
  summary: string;
  minutes: number;
  sections: LessonSection[];
  keyPoints: string[];
  termIds: string[];
  exercise: Exercise;
  sources: Source[];
  lastVerified: string;
}

export interface LearningPath {
  id: string;
  level: Level;
  title: string;
  summary: string;
  outcomes: string[];
  lessons: Lesson[];
}

export interface ProjectStep {
  title: string;
  detail: string;
  code?: CodeSample;
}

export interface Project {
  id: string;
  title: string;
  level: Level;
  summary: string;
  // The finished thing, in one sentence a client would understand.
  outcome: string;
  hours: string;
  stack: string[];
  prerequisites: string[];
  // Ordered data flow, rendered as a vertical diagram: Trigger → … → Output.
  architecture: { node: string; detail: string }[];
  steps: ProjectStep[];
  exampleWorkflow: string[];
  testing: string[];
  pitfalls: string[];
  termIds: string[];
  sources: Source[];
  lastVerified: string;
}
