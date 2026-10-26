import { describe, it, expect } from "vitest";
import { DICTIONARY, type DictionaryTerm } from "@/data/dictionary";
import { DictionaryTermSchema, ModelEntrySchema } from "@/app/lib/content/schema";
import { formatIsoDate } from "@/app/lib/content/format";
import { MODELS, model } from "@/data/models";
import { ageInDays, freshnessReport, staleEntries } from "@/app/lib/content/freshness";

function term(overrides: Partial<DictionaryTerm> = {}): DictionaryTerm {
  return {
    id: "sample-term",
    term: "Sample Term",
    aliases: [],
    category: "AI Foundations",
    level: "Beginner",
    definition: "A placeholder definition long enough to pass validation.",
    whyItMatters: "It exercises the schema.",
    related: [],
    simple: "A plain-English placeholder explanation.",
    sources: [{ label: "Docs", url: "https://example.com" }],
    lastVerified: "2026-10-26",
    ...overrides,
  };
}

describe("dictionary content", () => {
  it("every entry passes the schema", () => {
    const failures = DICTIONARY.flatMap((entry) => {
      const result = DictionaryTermSchema.safeParse(entry);
      return result.success ? [] : [`${entry.id}: ${result.error.issues.map((i) => `${i.path.join(".")} ${i.message}`).join("; ")}`];
    });
    expect(failures).toEqual([]);
  });

  it("ids are unique", () => {
    const ids = DICTIONARY.map((entry) => entry.id);
    expect(ids.length).toBe(new Set(ids).size);
  });

  it("every related id and supersededBy resolves, and no entry relates to itself", () => {
    const report = freshnessReport(DICTIONARY, new Date());
    expect(report.brokenRelated).toEqual([]);
    expect(report.supersededMissing).toEqual([]);
    expect(DICTIONARY.filter((entry) => entry.related.includes(entry.id)).map((entry) => entry.id)).toEqual([]);
  });
});

describe("DictionaryTermSchema", () => {
  it("rejects a deprecated term with no successor or note", () => {
    expect(DictionaryTermSchema.safeParse(term({ status: "deprecated" })).success).toBe(false);
    expect(DictionaryTermSchema.safeParse(term({ status: "deprecated", supersededBy: "other-term" })).success).toBe(true);
  });

  it("rejects a term with no sources, no plain-English explanation, or no verification date", () => {
    expect(DictionaryTermSchema.safeParse(term({ sources: [] })).success).toBe(false);
    const { simple: _simple, ...noSimple } = term();
    expect(DictionaryTermSchema.safeParse(noSimple).success).toBe(false);
    const { lastVerified: _lastVerified, ...noDate } = term();
    expect(DictionaryTermSchema.safeParse(noDate).success).toBe(false);
  });

  it("rejects non-https sources and malformed dates", () => {
    expect(DictionaryTermSchema.safeParse(term({ sources: [{ label: "Docs", url: "http://example.com" }] })).success).toBe(false);
    expect(DictionaryTermSchema.safeParse(term({ lastVerified: "2026-13-40" })).success).toBe(false);
    expect(DictionaryTermSchema.safeParse(term({ lastVerified: "Oct 2026" })).success).toBe(false);
    expect(
      DictionaryTermSchema.safeParse(term({ sources: [{ label: "Docs", url: "https://example.com" }], lastVerified: "2026-10-26" })).success,
    ).toBe(true);
  });

  it("rejects unknown fields so typos don't silently drop data", () => {
    expect(DictionaryTermSchema.safeParse({ ...term(), lastVerifed: "2026-10-26" }).success).toBe(false);
  });
});

describe("freshnessReport", () => {
  const today = new Date("2026-10-26T00:00:00Z");

  it("computes age in whole days", () => {
    expect(ageInDays("2026-10-25", today)).toBe(1);
    expect(ageInDays("2026-10-26", today)).toBe(0);
  });

  it("flags stale entries and broken references", () => {
    const report = freshnessReport(
      [
        term({ id: "fresh", lastVerified: "2026-10-01" }),
        term({ id: "old", lastVerified: "2026-01-01" }),
        term({ id: "bare", related: ["fresh", "ghost"], supersededBy: "gone" }),
      ],
      today,
      120,
    );
    expect(report.stale).toEqual([{ id: "old", lastVerified: "2026-01-01", ageDays: 298 }]);
    expect(report.brokenRelated).toEqual([{ id: "bare", missing: ["ghost"] }]);
    expect(report.supersededMissing).toEqual([{ id: "bare", supersededBy: "gone" }]);
  });

  it("does not flag an entry exactly at the age limit", () => {
    const report = freshnessReport([term({ lastVerified: "2026-06-28" })], today, 120);
    expect(report.stale).toEqual([]);
  });
});

describe("formatIsoDate", () => {
  it("renders a calendar date without timezone drift", () => {
    expect(formatIsoDate("2026-10-26")).toBe("26 Oct 2026");
    expect(formatIsoDate("2026-01-01")).toBe("1 Jan 2026");
  });
});

describe("ModelEntrySchema", () => {
  const model = {
    id: "example-model",
    vendor: "Example",
    name: "Example Model",
    tier: "flagship",
    status: "current",
    summary: "A placeholder model used to exercise the schema.",
    sources: [{ label: "Docs", url: "https://example.com/models" }],
    lastVerified: "2026-10-26",
  };

  it("accepts a sourced entry and month-only release dates", () => {
    expect(ModelEntrySchema.safeParse(model).success).toBe(true);
    expect(ModelEntrySchema.safeParse({ ...model, releasedOn: "2026-09" }).success).toBe(true);
  });

  it("rejects an entry with no sources or an unknown status", () => {
    expect(ModelEntrySchema.safeParse({ ...model, sources: [] }).success).toBe(false);
    expect(ModelEntrySchema.safeParse({ ...model, status: "rumored" }).success).toBe(false);
  });
});

describe("model registry", () => {
  it("every model passes the schema", () => {
    const failures = MODELS.flatMap((entry) => {
      const result = ModelEntrySchema.safeParse(entry);
      return result.success ? [] : [`${entry.id}: ${result.error.issues.map((i) => `${i.path.join(".")} ${i.message}`).join("; ")}`];
    });
    expect(failures).toEqual([]);
  });

  it("ids are unique", () => {
    expect(MODELS.length).toBe(new Set(MODELS.map((entry) => entry.id)).size);
  });

  it("model() returns known ids and throws on unknown ones", () => {
    expect(model(MODELS[0].id)).toBe(MODELS[0]);
    expect(() => model("no-such-model")).toThrow(/Unknown model id/);
  });
});

describe("staleEntries", () => {
  it("works on any dated content, oldest first", () => {
    const today = new Date("2026-10-26T00:00:00Z");
    const stale = staleEntries(
      [
        { id: "recent", lastVerified: "2026-10-20" },
        { id: "older", lastVerified: "2026-05-01" },
        { id: "oldest", lastVerified: "2026-01-01" },
      ],
      today,
      120,
    );
    expect(stale.map((entry) => entry.id)).toEqual(["oldest", "older"]);
  });
});
