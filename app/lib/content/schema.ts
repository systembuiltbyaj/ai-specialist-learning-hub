import { z } from "zod";
import type { DictCategory, DictionaryTerm, DictLevel } from "@/data/dictionary";
import { CATEGORIES, LEVELS } from "@/data/dictionary";

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
    simple: z.string().trim().min(20).optional(),
    sources: z.array(SourceSchema).optional(),
    lastVerified: IsoDateSchema.optional(),
    status: ContentStatusSchema.optional(),
    supersededBy: z.string().regex(ID).optional(),
    deprecationNote: z.string().trim().min(10).optional(),
  })
  .refine(
    (term) => term.status !== "deprecated" || Boolean(term.supersededBy || term.deprecationNote),
    { message: "a deprecated term needs supersededBy or deprecationNote", path: ["status"] },
  ) satisfies z.ZodType<DictionaryTerm>;
