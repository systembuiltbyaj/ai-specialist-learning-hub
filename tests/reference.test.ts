import { describe, it, expect } from "vitest";
import { DICTIONARY_BY_ID } from "@/data/dictionary";
import { ACRONYMS } from "@/data/acronyms";
import {
  slugify,
  ACRONYM_TO_TERM,
  ACRONYM_SLUGS,
  TERM_IDS,
  acronymBySlug,
} from "@/app/lib/reference";

describe("slugify", () => {
  it("lowercases and hyphenates", () => {
    expect(slugify("CI/CD")).toBe("ci-cd");
    expect(slugify("GenAI")).toBe("genai");
    expect(slugify("10DLC")).toBe("10dlc");
  });

  it("trims stray separators", () => {
    expect(slugify("  A2A  ")).toBe("a2a");
    expect(slugify("--REST--")).toBe("rest");
  });
});

describe("ACRONYM_TO_TERM", () => {
  it("maps exactly the 22 overlapping acronyms", () => {
    expect(Object.keys(ACRONYM_TO_TERM)).toHaveLength(22);
  });

  it("maps direct id collisions to themselves", () => {
    expect(ACRONYM_TO_TERM["rag"]).toBe("rag");
    expect(ACRONYM_TO_TERM["llm"]).toBe("llm");
    expect(ACRONYM_TO_TERM["oauth"]).toBe("oauth");
    expect(ACRONYM_TO_TERM["ci-cd"]).toBe("ci-cd");
  });

  it("resolves alias-based overlaps to a real term", () => {
    // These acronyms are not term ids, but are registered dictionary aliases.
    for (const slug of ["cot", "hitl", "rest", "saas", "10dlc", "spf", "dkim", "dmarc"]) {
      expect(ACRONYM_TO_TERM[slug], `expected ${slug} to resolve`).toBeDefined();
    }
  });

  it("only ever points at real dictionary terms", () => {
    for (const id of Object.values(ACRONYM_TO_TERM)) {
      expect(DICTIONARY_BY_ID[id]).toBeDefined();
    }
  });
});

describe("page slug sets", () => {
  it("excludes overlapping acronyms from getting their own page", () => {
    expect(ACRONYM_SLUGS).toHaveLength(ACRONYMS.length - 22);
    for (const slug of ACRONYM_SLUGS) {
      expect(ACRONYM_TO_TERM[slug]).toBeUndefined();
    }
  });

  it("has no duplicate slugs", () => {
    expect(new Set(ACRONYM_SLUGS).size).toBe(ACRONYM_SLUGS.length);
    expect(new Set(TERM_IDS).size).toBe(TERM_IDS.length);
  });

  it("never collides a term id with an acronym page slug", () => {
    const terms = new Set(TERM_IDS);
    for (const slug of ACRONYM_SLUGS) expect(terms.has(slug)).toBe(false);
  });
});

describe("acronymBySlug", () => {
  it("round-trips every acronym that has its own page", () => {
    for (const slug of ACRONYM_SLUGS) {
      const entry = acronymBySlug(slug);
      expect(entry, `no entry for ${slug}`).toBeDefined();
      expect(slugify(entry!.acronym)).toBe(slug);
    }
  });

  it("returns undefined for an unknown slug", () => {
    expect(acronymBySlug("not-a-real-acronym")).toBeUndefined();
  });
});
