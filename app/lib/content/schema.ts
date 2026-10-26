import { z } from "zod";
import type { DictCategory, DictionaryTerm, DictLevel } from "@/data/dictionary";
import { CATEGORIES, LEVELS } from "@/data/dictionary";
import type { LearningPath, Lesson, ModelEntry, Project } from "@/app/lib/content/types";

// Runtime contract for hand-edited content files. TypeScript only checks shape;
// this also checks the things that rot silently — malformed dates, http links,
// a deprecated entry with no pointer to what replaced it.

const ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export const SourceSchema = z.strictObject({
  label: z.string().trim().min(2).max(120),
  url: z.url({ protocol: /^https$/ }),
});

export const ContentStatusSchema = z.enum(["current", "emerging", "deprecated"]);

export const IsoDateSchema = z
  .string()
  .regex(ISO_DATE, "expected YYYY-MM-DD")
  .refine((value) => !Number.isNaN(Date.parse(`${value}T00:00:00Z`)), "not a real date");

export const DictionaryTermSchema = z
  .strictObject({
    id: z.string().regex(ID, "id must be kebab-case"),
    term: z.string().trim().min(1),
    aliases: z.array(z.string().trim().min(1)),
    category: z.enum(CATEGORIES as [DictCategory, ...DictCategory[]]),
    level: z.enum(LEVELS as [DictLevel, ...DictLevel[]]),
    definition: z.string().trim().min(20),
    analogy: z.string().trim().min(10).optional(),
    whyItMatters: z.string().trim().min(10),
    example: z.string().trim().min(10).optional(),
    related: z.array(z.string().regex(ID)),
    // Required since the M1 backfill: a term without provenance doesn't ship.
    simple: z.string().trim().min(20),
    sources: z.array(SourceSchema).min(1),
    lastVerified: IsoDateSchema,
    status: ContentStatusSchema.optional(),
    supersededBy: z.string().regex(ID).optional(),
    deprecationNote: z.string().trim().min(10).optional(),
  })
  .refine(
    (term) => term.status !== "deprecated" || Boolean(term.supersededBy || term.deprecationNote),
    { message: "a deprecated term needs supersededBy or deprecationNote", path: ["status"] },
  ) satisfies z.ZodType<DictionaryTerm>;

export const ModelEntrySchema = z.strictObject({
  id: z.string().regex(ID, "id must be kebab-case"),
  vendor: z.string().trim().min(2),
  name: z.string().trim().min(2),
  apiId: z.string().trim().min(2).optional(),
  tier: z.enum(["flagship", "balanced", "fast", "reasoning", "open-weight", "media", "other"]),
  releasedOn: z.string().regex(/^\d{4}-\d{2}(?:-\d{2})?$/, "expected YYYY-MM or YYYY-MM-DD").optional(),
  status: z.enum(["preview", "current", "legacy", "deprecated", "retired"]),
  contextTokens: z.number().int().positive().optional(),
  pricingNote: z.string().trim().min(5).optional(),
  summary: z.string().trim().min(20),
  // A model claim with no source is exactly what this registry exists to prevent.
  sources: z.array(SourceSchema).min(1),
  lastVerified: IsoDateSchema,
}) satisfies z.ZodType<ModelEntry>;

const LevelSchema = z.enum(["Beginner", "Intermediate", "Advanced"]);
const CodeSampleSchema = z.strictObject({ language: z.string().trim().min(1), content: z.string().trim().min(1) });
const Paragraphs = z.string().trim().min(40);

export const LessonSchema = z.strictObject({
  id: z.string().regex(ID, "id must be kebab-case"),
  title: z.string().trim().min(3),
  summary: z.string().trim().min(20),
  minutes: z.number().int().min(3).max(60),
  sections: z
    .array(z.strictObject({ heading: z.string().trim().min(3), body: Paragraphs, code: CodeSampleSchema.optional() }))
    .min(2),
  keyPoints: z.array(z.string().trim().min(10)).min(2).max(6),
  termIds: z.array(z.string().regex(ID)).min(1),
  exercise: z.strictObject({
    prompt: z.string().trim().min(20),
    steps: z.array(z.string().trim().min(5)).min(2),
    successCheck: z.string().trim().min(20),
  }),
  sources: z.array(SourceSchema).min(1),
  lastVerified: IsoDateSchema,
}) satisfies z.ZodType<Lesson>;

export const LearningPathSchema = z.strictObject({
  id: z.string().regex(ID),
  level: LevelSchema,
  title: z.string().trim().min(3),
  summary: z.string().trim().min(20),
  outcomes: z.array(z.string().trim().min(10)).min(2),
  lessons: z.array(LessonSchema).min(3),
}) satisfies z.ZodType<LearningPath>;

export const ProjectSchema = z.strictObject({
  id: z.string().regex(ID, "id must be kebab-case"),
  title: z.string().trim().min(3),
  level: LevelSchema,
  summary: z.string().trim().min(20),
  outcome: z.string().trim().min(20),
  hours: z.string().trim().min(1),
  stack: z.array(z.string().trim().min(1)).min(1),
  prerequisites: z.array(z.string().trim().min(3)).min(1),
  architecture: z.array(z.strictObject({ node: z.string().trim().min(2), detail: z.string().trim().min(10) })).min(3),
  steps: z
    .array(z.strictObject({ title: z.string().trim().min(3), detail: Paragraphs, code: CodeSampleSchema.optional() }))
    .min(4),
  exampleWorkflow: z.array(z.string().trim().min(10)).min(3),
  testing: z.array(z.string().trim().min(10)).min(3),
  pitfalls: z.array(z.string().trim().min(10)).min(2),
  termIds: z.array(z.string().regex(ID)).min(1),
  sources: z.array(SourceSchema).min(1),
  lastVerified: IsoDateSchema,
}) satisfies z.ZodType<Project>;
