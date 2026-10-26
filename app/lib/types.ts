// Shared domain types for the Learning Hub.
// These mirror the Supabase table columns so seed data and live data are interchangeable.
import type { Source } from "@/app/lib/content/types";

export type ToolCategory =
  | "AI Models"
  | "Coding Agents"
  | "Agent Platforms"
  | "Automation Platforms";

export interface Tool {
  id: string;
  name: string;
  creator: string;
  category: ToolCategory;
  tagline: string;
  strengths: string[];
  weaknesses: string[];
  use_cases: string[];
  pricing: string;
  when_to_use: string;
  // 1–5 editorial ratings used by the comparison matrix; keys vary per category.
  // These are judgement calls, not measurements — the UI labels them as such.
  ratings: Record<string, number>;
  // Provenance for the factual claims (pricing, ownership, features). Optional
  // because Supabase-backed rows predate it.
  sources?: Source[];
  lastVerified?: string;
  created_at?: string;
}

export type ResourceCategory = "Jobpost" | "GHL" | "Claude" | "AI Automation";

export interface Resource {
  id: string;
  user_id?: string | null;
  title: string;
  url: string;
  category: ResourceCategory;
  type: "Video" | "Docs" | "Article" | "Course" | "Tool" | "Post";
  notes: string;
  completed: boolean;
  saved_at?: string;
}

export type UpdateCategory = "GHL" | "Claude" | "AI Automation" | "AI News";

export interface Update {
  id: string;
  week: string; // e.g. "Week of 2026-06-02"
  title: string;
  category: UpdateCategory;
  content: string;
  ts?: number; // client-side ordering
  created_at?: string;
}

// ── Reference guide (Dev Tools + Web Guide) ──
export type AccentKey =
  | "teal"
  | "pink"
  | "yellow"
  | "blue"
  | "purple"
  | "orange";

export interface RefCard {
  name: string;
  pill?: string;
  badge?: { label: string; kind: "os" | "paid" | "free" | "cloud" };
  tagline: string;
  desc: string;
  tags: string[];
  accent: AccentKey;
  bestFor?: string;
}

export interface RefTable {
  columns: string[];
  // Each cell is a plain string. Cells starting with ✓ render green,
  // ✗ red, and ~ amber (handled by the table renderer).
  rows: string[][];
}

// ── Site search ──
// Deliberately minimal: the index is fetched by the browser, so it carries only
// what ranking and rendering need — never the full source data.
export interface SearchRecord {
  type: "term" | "acronym" | "tool";
  title: string;
  keywords: string[];
  snippet: string;
  category: string;
  url: string;
}

// ── Interview prep ──
export interface InterviewEntry {
  id: string;
  question: string;
  answer: string;
  topic: string;
  createdAt: number;
}

// ── GHL Hub / Automation Hub ──
export interface AutomationRecipe {
  title: string;
  accent: AccentKey;
  trigger: string;
  steps: string[];
  outcome: string;
  tag?: string;
}

export interface Tip {
  title: string;
  detail: string;
}

export interface LearnStep {
  title: string;
  detail: string;
  resource?: { label: string; url: string };
}

// ── Discovery playbook (employer interview) ──
export interface QuestionGroup {
  group: string;
  accent: AccentKey;
  why: string;
  questions: string[];
}

export interface ExplainPoint {
  feature: string;
  outcome: string;
}

// Bundled and passed from the gated server component so the playbook never
// ships inside a public client chunk. See app/interview/page.tsx.
export interface DiscoveryData {
  flow: { n: string; title: string; detail: string }[];
  questions: QuestionGroup[];
  explainPoints: ExplainPoint[];
  dos: string[];
  donts: string[];
}

// ── Claude Code Arsenal ──
export interface ArsenalSkill {
  id: string;
  name: string;
  description: string;
  category: string;
  hasBundle: boolean;
}

export interface ArsenalMcp {
  name: string;
  pkg: string; // package id / endpoint
  description: string;
  features: string[];
  cmd: string; // install command
  remote?: boolean;
}

export interface CodeSnippet {
  label: string;
  code: string;
}

export interface FrameworkSection {
  title?: string;
  text?: string;
  bullets?: string[];
  code?: CodeSnippet[];
}

export interface FrameworkStep {
  n: string;
  title: string;
  kicker: string;
  accent: string; // hex
  summary: string;
  outcome: string;
  sections: FrameworkSection[];
}

// ── Tasks ──
export type TaskStatus = "To Do" | "In Progress" | "Done";

export interface TaskItem {
  id: string;
  title: string;
  notes: string;
  day: string; // Mon..Sun or "This week"
  status: TaskStatus;
  urgent: boolean;
  createdAt: number;
}

export interface StackItem {
  name: string;
  icon: string;
  desc: string;
  role: string;
  accent: AccentKey;
  badge?: { label: string; kind: "os" | "paid" | "free" | "cloud" };
}
