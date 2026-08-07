# Public Reference Reframe — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the AI Specialist Learning Hub from a personal system into a public reference with deep-linkable entries, site-wide search, and real discoverability.

**Architecture:** Next.js 14 App Router. All pages public and statically rendered. Individual dictionary terms and acronyms become prerendered pages via `generateStaticParams`. A build-time static JSON index powers dependency-free client search. The admin gate survives solely to protect the service-role-key write endpoint.

**Tech Stack:** Next.js 14.2.35, React 18, TypeScript strict, Tailwind CSS 3, Supabase (optional), Vitest (new dev dependency, approved).

**Spec:** `docs/superpowers/specs/2026-08-07-public-reference-reframe-design.md`

## Global Constraints

- ES modules, `async/await`, 2-space indent, TypeScript strict.
- **No new runtime dependencies.** Vitest is the only addition, `devDependencies` only.
- Never write a live count, status, or date as prose in UI copy or docs — derive it or omit it.
- Private data rule (from `CLAUDE.md`) still stands for any future private data: import in `page.tsx`, never in a `"use client"` file.
- `/api/resources` must remain admin-gated and fail closed. No task may weaken it.
- Public routes must render `○ (Static)` in build output.
- Owner attribution stays a footer byline only.
- Every task ends with a passing `npm run build`.

---

## File Structure

**Create**
- `app/lib/reference.ts` — slug + acronym/term overlap resolution (pure, tested)
- `app/lib/search.ts` — search scoring (pure, tested)
- `app/dictionary/[slug]/page.tsx` — term detail page
- `app/acronyms/[slug]/page.tsx` — acronym detail page
- `app/search-index.json/route.ts` — build-time static index
- `app/components/SiteSearch.tsx` — search combobox
- `app/sitemap.ts`, `app/robots.ts`, `app/not-found.tsx`, `app/error.tsx`
- `vitest.config.ts`, `tests/reference.test.ts`, `tests/search.test.ts`

**Modify**
- `app/lib/constants.ts` — nav (remove Prompt Vault, rename "My Tasks")
- `app/lib/types.ts` — drop `InterviewStatus`
- `app/lib/seed/interview.ts` — strip `status`
- `app/components/Footer.tsx` — remove `isAdmin()` (restores static rendering)
- `app/components/Sidebar.tsx` — add compact search
- `app/components/NavIcons.tsx` — remove `/prompts`
- `app/components/TermOfTheDay.tsx` — link to `/dictionary/<id>`
- `app/interview/InterviewTabs.tsx` — remove Flashcards tab
- `app/dictionary/DictionaryClient.tsx` — permalink per card
- `app/acronyms/AcronymsClient.tsx` — permalink / "full entry" link
- `app/page.tsx` — search-first home
- `app/layout.tsx` — `metadataBase`, description
- `app/lib/export.ts` — copy
- `middleware.ts` — stop gating pages
- `package.json` — Vitest + `test` script

**Delete**
- `app/prompts/` (page + client), `data/prompts.ts`
- `app/interview/Flashcards.tsx`

---

## Phase 1 — Restructure

### Task 1: Interview Q&A PDF (one-time deliverable)

Must run **before** Task 3 strips the `status` field, so the record preserves original data.

**Files:**
- Create (temporary): `app/interview/print/page.tsx`
- Output: `docs/interview-qa-2026-08-07.pdf`

**Interfaces:**
- Consumes: `INTERVIEW_SEED` from `app/lib/seed/interview.ts`
- Produces: a PDF file. No code survives this task.

- [ ] **Step 1: Create the temporary print route**

```tsx
// app/interview/print/page.tsx
import { INTERVIEW_SEED } from "@/app/lib/seed/interview";

export const metadata = { title: "Interview Q&A" };

export default function InterviewPrintPage() {
  return (
    <main style={{ background: "#fff", color: "#111", padding: "32px", fontFamily: "Georgia, serif", maxWidth: "760px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "4px" }}>Interview Q&amp;A</h1>
      <p style={{ fontSize: "12px", color: "#666", marginTop: 0 }}>
        Allen Bactad · System-BuiltBy AJ · {INTERVIEW_SEED.length} entries
      </p>
      {INTERVIEW_SEED.map((e) => (
        <section key={e.id} style={{ marginTop: "22px", pageBreakInside: "avoid" }}>
          <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px", color: "#888", margin: 0 }}>
            {e.topic}{e.status ? ` · ${e.status}` : ""}
          </p>
          <h2 style={{ fontSize: "15px", margin: "4px 0 6px" }}>{e.question}</h2>
          <p style={{ fontSize: "13px", lineHeight: 1.6, whiteSpace: "pre-wrap", margin: 0 }}>{e.answer}</p>
        </section>
      ))}
    </main>
  );
}
```

- [ ] **Step 2: Build and serve**

Run: `npm run build && npx next start -p 3200`
Expected: build succeeds, `/interview/print` listed in route output.

- [ ] **Step 3: Verify the page renders all entries**

Run: `curl -s http://localhost:3200/interview/print | grep -c "pageBreakInside\|page-break-inside"`
Expected: 25 (one per entry).

- [ ] **Step 4: Print to PDF with headless Chrome**

```bash
mkdir -p docs
"/c/Program Files/Google/Chrome/Application/chrome.exe" \
  --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="docs/interview-qa-2026-08-07.pdf" \
  "http://localhost:3200/interview/print"
```

Expected: file exists and is > 20 KB.

- [ ] **Step 5: Delete the temporary route and stop the server**

Remove `app/interview/print/`. Confirm `docs/interview-qa-2026-08-07.pdf` still exists.

- [ ] **Step 6: Commit**

```bash
git add docs/interview-qa-2026-08-07.pdf
git commit -m "docs: export interview Q&A to PDF before stripping status field"
```

---

### Task 2: Remove the Prompt Vault

**Files:**
- Delete: `app/prompts/page.tsx`, `app/prompts/PromptsClient.tsx`, `data/prompts.ts`
- Modify: `app/lib/constants.ts`, `app/components/NavIcons.tsx`, `app/page.tsx`

**Interfaces:**
- Consumes: nothing.
- Produces: `NAV_GROUPS` without the `/prompts` entry. `NAV_ITEMS.length` becomes 15.

- [ ] **Step 1: Delete the route and data**

```bash
rm -rf app/prompts data/prompts.ts
```

- [ ] **Step 2: Remove the nav entry**

In `app/lib/constants.ts`, delete this line from the Workspace group:

```ts
{ label: "Prompt Vault", href: "/prompts", description: "Copy-paste AI image & video prompts", icon: "🗂" },
```

- [ ] **Step 3: Remove the icon mapping**

In `app/components/NavIcons.tsx`, delete the `"/prompts": { ... }` entry.

- [ ] **Step 4: Remove the home stat tile and import**

In `app/page.tsx`, remove `import { PROMPTS } from "@/data/prompts";` and the
`{ label: "Prompts Ready", ... }` stat object. Task 13 rebuilds this section fully;
this step only removes the now-broken reference.

- [ ] **Step 5: Verify no references remain**

Run: `grep -rn "data/prompts\|PROMPTS\|Prompt Vault\|/prompts" app/ data/ --include=*.ts --include=*.tsx`
Expected: no output.

- [ ] **Step 6: Build**

Run: `npm run build`
Expected: success, `/prompts` absent from route list.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: remove Prompt Vault module"
```

---

### Task 3: Interview cleanup — Flashcards and status field

**Files:**
- Delete: `app/interview/Flashcards.tsx`
- Modify: `app/interview/InterviewTabs.tsx`, `app/lib/seed/interview.ts`, `app/lib/types.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `InterviewEntry` without `status`. `InterviewTabs` `Mode` type becomes `"Employee" | "Employer"`.

- [ ] **Step 1: Remove the Flashcards tab**

In `app/interview/InterviewTabs.tsx`:
- Change `type Mode = "Employee" | "Employer" | "Flashcards";` to `type Mode = "Employee" | "Employer";`
- Delete the `Flashcards` import.
- Delete the `MODES` entry with `key: "Flashcards"`.
- Delete the line `{mode === "Flashcards" && <Flashcards />}`.
- Change the mode grid from `sm:grid-cols-3` to `sm:grid-cols-2`.

- [ ] **Step 2: Delete the component**

```bash
rm app/interview/Flashcards.tsx
```

- [ ] **Step 3: Strip the status field from the seed**

In `app/lib/seed/interview.ts`, remove every `status: "...",` line from the `RAW` array
(25 entries, 22 `"Needs work"` and 3 `"Confident"`).

Run: `grep -c "status:" app/lib/seed/interview.ts`
Expected: `0`

- [ ] **Step 4: Remove the type**

In `app/lib/types.ts`, delete:

```ts
export type InterviewStatus = "Unreviewed" | "Needs work" | "Confident";
```

and remove this line from `InterviewEntry`:

```ts
  status?: InterviewStatus; // legacy / optional — no longer shown in the UI
```

- [ ] **Step 5: Verify no references remain**

Run: `grep -rn "InterviewStatus\|Flashcards\|status:" app/interview app/lib/types.ts app/lib/seed/interview.ts`
Expected: no output.

- [ ] **Step 6: Build**

Run: `npm run build`
Expected: success.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: remove interview flashcards and strip legacy status field"
```

---

### Task 4: Ungate pages, restore static rendering

**Files:**
- Modify: `middleware.ts`, `app/components/Footer.tsx`, `app/lib/access.ts`, `app/unlock/page.tsx`, `app/resources/page.tsx`

**Interfaces:**
- Consumes: `isAdmin()` from `app/lib/adminSession.ts` (unchanged, still used by `/api/resources` and `/resources`).
- Produces: no middleware page gating. `Footer` becomes a synchronous component.

- [ ] **Step 1: Remove page gating from middleware**

Replace `middleware.ts` entirely:

```ts
// All pages are public. The admin session exists only to authorize writes to
// /api/resources, which runs on the Supabase service-role key — see
// app/lib/adminSession.ts. No page-level gating remains.
export const config = { matcher: [] };

export function middleware() {
  return;
}
```

- [ ] **Step 2: Remove PRIVATE_PREFIXES from access.ts**

In `app/lib/access.ts`, delete `PRIVATE_PREFIXES` and `isPrivatePath` — nothing consumes them now.
Keep `COOKIE_NAME`, `COOKIE_MAX_AGE`, `accessToken`, `timingSafeEqual`, `isValidAdminCookie`.

- [ ] **Step 3: Make Footer synchronous (this is what restores static rendering)**

In `app/components/Footer.tsx`:
- Remove `import { isAdmin } from "@/app/lib/adminSession";` and the `LockButton` import.
- Change `export default async function Footer()` to `export default function Footer()`.
- Delete the `const admin = await isAdmin();` line and the entire `{admin && (...)}` block.

- [ ] **Step 4: Move the sign-out control to /unlock**

In `app/unlock/page.tsx`, import `LockButton` and render it below the form so a signed-in
admin can sign out:

```tsx
<div className="mt-4 flex justify-center">
  <LockButton />
</div>
```

- [ ] **Step 5: Build and confirm static rendering**

Run: `npm run build`
Expected: public routes (`/`, `/dictionary`, `/tools`, `/acronyms`, `/quiz`, `/web-guide`,
`/dev-tools`, `/interview`, `/presentation`, `/tasks`, `/updates`, hubs) show `○ (Static)`.
`/resources` may remain `ƒ` — it reads cookies for admin sync.

- [ ] **Step 6: Verify pages are reachable without a session**

```bash
npx next start -p 3201 &
for p in / /interview /presentation /tasks /updates /resources; do
  echo "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:3201$p)  $p"
done
```

Expected: all `200`.

- [ ] **Step 7: Verify the write API is still protected**

Run: `curl -s -o /dev/null -w "%{http_code}\n" -X POST http://localhost:3201/api/resources -H "Content-Type: application/json" -d '{"op":"list"}'`
Expected: `401`

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: make all pages public, restore static rendering"
```

---

### Task 5: Voice and copy pass

**Files:**
- Modify: `app/lib/constants.ts`, `app/tasks/page.tsx`, `app/layout.tsx`, `app/lib/export.ts`

**Interfaces:**
- Consumes: nothing. Produces: nothing structural.

- [ ] **Step 1: Update nav labels and descriptions**

In `app/lib/constants.ts`:
- `{ label: "My Tasks", ... }` → `{ label: "Tasks", href: "/tasks", description: "Plan your week", icon: "✓" }`
- Interview description `"Q&A log for self-review"` → `"Interview questions & answers"`
- Quiz description `"Test yourself — auto-built exams"` → `"Auto-built exams from the dictionary"`

- [ ] **Step 2: Update the Tasks page**

In `app/tasks/page.tsx`, change `title: "My Tasks"` → `title: "Tasks"` and the `<h1>` from
`✓ My Tasks` → `✓ Tasks`.

- [ ] **Step 3: Update the layout description**

In `app/layout.tsx`, replace the `description` with:

```ts
  description:
    "A public reference for AI, automation, and the tools that power them — a searchable tech dictionary, acronym decoder, tools comparison, and practical guides for Claude, GoHighLevel, and automation platforms.",
```

- [ ] **Step 4: Update the export heading**

In `app/lib/export.ts`, change `"# 🔖 My Learning Journey"` → `"# 🔖 Learning Journey"`.

- [ ] **Step 5: Verify no first-person copy remains in public UI**

Run: `grep -rn "My Tasks\|my learning system\|My Learning Journey\|self-review" app/`
Expected: no output.

- [ ] **Step 6: Build and commit**

```bash
npm run build
git add -A
git commit -m "feat: shift UI copy from personal to visitor-facing"
```

---

## Phase 2 — Deep-linkable pages

### Task 6: Vitest + the reference module (slug and overlap resolution)

**Files:**
- Create: `vitest.config.ts`, `app/lib/reference.ts`, `tests/reference.test.ts`
- Modify: `package.json`

**Interfaces:**
- Consumes: `DICTIONARY`, `DICTIONARY_BY_ID` from `@/data/dictionary`; `ACRONYMS` from `@/data/acronyms`.
- Produces:
  - `slugify(value: string): string`
  - `ACRONYM_TO_TERM: Record<string, string>` — acronym slug → dictionary term id
  - `TERM_IDS: string[]`
  - `ACRONYM_SLUGS: string[]` — acronym slugs that get their **own** page (excludes overlaps)
  - `acronymBySlug(slug: string): Acronym | undefined`

- [ ] **Step 1: Install Vitest**

```bash
npm install -D vitest
```

- [ ] **Step 2: Add the test script**

In `package.json` `scripts`, add: `"test": "vitest run"`

- [ ] **Step 3: Create the Vitest config**

```ts
// vitest.config.ts
import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: { alias: { "@": path.resolve(__dirname, ".") } },
  test: { environment: "node", include: ["tests/**/*.test.ts"] },
});
```

- [ ] **Step 4: Write the failing test**

```ts
// tests/reference.test.ts
import { describe, it, expect } from "vitest";
import { DICTIONARY_BY_ID } from "@/data/dictionary";
import { ACRONYMS } from "@/data/acronyms";
import { slugify, ACRONYM_TO_TERM, ACRONYM_SLUGS, TERM_IDS } from "@/app/lib/reference";

describe("slugify", () => {
  it("lowercases and hyphenates", () => {
    expect(slugify("CI/CD")).toBe("ci-cd");
    expect(slugify("GenAI")).toBe("genai");
    expect(slugify("10DLC")).toBe("10dlc");
  });
  it("trims stray separators", () => {
    expect(slugify("  A2A  ")).toBe("a2a");
  });
});

describe("ACRONYM_TO_TERM", () => {
  it("maps exactly the 22 overlapping acronyms", () => {
    expect(Object.keys(ACRONYM_TO_TERM)).toHaveLength(22);
  });
  it("maps direct id collisions", () => {
    expect(ACRONYM_TO_TERM["rag"]).toBe("rag");
    expect(ACRONYM_TO_TERM["llm"]).toBe("llm");
    expect(ACRONYM_TO_TERM["oauth"]).toBe("oauth");
  });
  it("only ever points at real dictionary terms", () => {
    for (const id of Object.values(ACRONYM_TO_TERM)) {
      expect(DICTIONARY_BY_ID[id]).toBeDefined();
    }
  });
});

describe("page slug sets", () => {
  it("excludes overlapping acronyms from their own pages", () => {
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
```

- [ ] **Step 5: Run to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `@/app/lib/reference`.

- [ ] **Step 6: Implement the module**

```ts
// app/lib/reference.ts
import { DICTIONARY, DICTIONARY_BY_ID, type DictionaryTerm } from "@/data/dictionary";
import { ACRONYMS, type Acronym } from "@/data/acronyms";

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// An acronym "overlaps" when the dictionary already covers the same concept —
// either as a term id or as a registered alias. Those get no page of their own;
// they redirect into the richer dictionary entry so the two never compete.
function buildOverlapMap(): Record<string, string> {
  const aliasToId = new Map<string, string>();
  for (const term of DICTIONARY as DictionaryTerm[]) {
    for (const alias of term.aliases) aliasToId.set(alias.toLowerCase(), term.id);
  }

  const map: Record<string, string> = {};
  for (const entry of ACRONYMS as Acronym[]) {
    const slug = slugify(entry.acronym);
    if (DICTIONARY_BY_ID[slug]) {
      map[slug] = slug;
      continue;
    }
    const viaAlias = aliasToId.get(entry.acronym.toLowerCase());
    if (viaAlias) map[slug] = viaAlias;
  }
  return map;
}

export const ACRONYM_TO_TERM: Record<string, string> = buildOverlapMap();

export const TERM_IDS: string[] = (DICTIONARY as DictionaryTerm[]).map((t) => t.id);

export const ACRONYM_SLUGS: string[] = (ACRONYMS as Acronym[])
  .map((a) => slugify(a.acronym))
  .filter((slug) => !ACRONYM_TO_TERM[slug]);

export function acronymBySlug(slug: string): Acronym | undefined {
  return (ACRONYMS as Acronym[]).find((a) => slugify(a.acronym) === slug);
}
```

- [ ] **Step 7: Run tests to verify they pass**

Run: `npm test`
Expected: PASS, all cases green.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add reference slug and acronym-overlap resolution with tests"
```

---

### Task 7: Dictionary term pages

**Files:**
- Create: `app/dictionary/[slug]/page.tsx`

**Interfaces:**
- Consumes: `TERM_IDS` from `app/lib/reference.ts`; `DICTIONARY_BY_ID` from `@/data/dictionary`.
- Produces: route `/dictionary/<id>` for all 133 terms.

- [ ] **Step 1: Create the page**

```tsx
// app/dictionary/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DICTIONARY_BY_ID } from "@/data/dictionary";
import { TERM_IDS } from "@/app/lib/reference";

export const dynamicParams = false;

export function generateStaticParams() {
  return TERM_IDS.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const term = DICTIONARY_BY_ID[params.slug];
  if (!term) return {};
  const description = term.definition.slice(0, 155);
  return {
    title: term.term,
    description,
    openGraph: { title: `${term.term} — AJ Learning Hub`, description, type: "article" },
    alternates: { canonical: `/dictionary/${term.id}` },
  };
}

export default function TermPage({ params }: { params: { slug: string } }) {
  const term = DICTIONARY_BY_ID[params.slug];
  if (!term) notFound();

  const related = term.related
    .map((id) => DICTIONARY_BY_ID[id])
    .filter(Boolean);

  return (
    <article className="container-hub max-w-3xl space-y-6 py-8">
      <nav className="text-sm text-muted">
        <Link href="/dictionary" className="hover:text-gold">
          ← Tech Dictionary
        </Link>
      </nav>

      <header>
        <div className="flex flex-wrap items-center gap-2">
          <span className="chip border border-gold/40 text-gold">{term.category}</span>
          <span className="chip border border-line text-muted">{term.level}</span>
        </div>
        <h1 className="section-title mt-3">{term.term}</h1>
        {term.aliases.length > 0 && (
          <p className="mt-1 text-sm text-muted">Also known as: {term.aliases.join(", ")}</p>
        )}
      </header>

      <p className="text-lg leading-relaxed text-text/90">{term.definition}</p>

      {term.analogy && (
        <section className="card p-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gold">💡 Analogy</h2>
          <p className="mt-2 text-sm leading-relaxed text-text/80">{term.analogy}</p>
        </section>
      )}

      <section className="card p-5">
        <h2 className="text-xs font-bold uppercase tracking-wider text-gold">Why it matters</h2>
        <p className="mt-2 text-sm leading-relaxed text-text/80">{term.whyItMatters}</p>
      </section>

      {term.example && (
        <section className="card p-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gold">In practice</h2>
          <p className="mt-2 text-sm leading-relaxed text-text/80">{term.example}</p>
        </section>
      )}

      {related.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted">Related terms</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {related.map((r) => (
              <Link key={r.id} href={`/dictionary/${r.id}`} className="chip hover:border-gold hover:text-gold">
                {r.term}
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: `/dictionary/[slug]` present with `● (SSG)` and 133 prerendered paths.

- [ ] **Step 3: Verify a sample of pages**

```bash
npx next start -p 3202 &
for s in token rag context-window prompt-caching; do
  echo "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:3202/dictionary/$s)  /dictionary/$s"
done
echo "unknown: $(curl -s -o /dev/null -w '%{http_code}' http://localhost:3202/dictionary/not-a-real-term)"
```

Expected: `200` for each real term, `404` for the unknown slug.

- [ ] **Step 4: Verify related links point at real pages**

Run: `curl -s http://localhost:3202/dictionary/token | grep -o 'href="/dictionary/[a-z0-9-]*"' | sort -u`
Expected: links to `context-window`, `inference`, `prompt-caching`.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add dictionary term detail pages"
```

---

### Task 8: Acronym pages and overlap redirects

**Files:**
- Create: `app/acronyms/[slug]/page.tsx`

**Interfaces:**
- Consumes: `ACRONYM_SLUGS`, `ACRONYM_TO_TERM`, `acronymBySlug`, `slugify` from `app/lib/reference.ts`.
- Produces: route `/acronyms/<slug>` for non-overlapping acronyms; 308 redirects for the 22 overlaps.

**Note on `dynamicParams`:** this route uses `dynamicParams = true` so the 22 overlapping
slugs are still routable and can redirect. Unknown slugs call `notFound()` explicitly.

- [ ] **Step 1: Create the page**

```tsx
// app/acronyms/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { DICTIONARY, DICTIONARY_BY_ID } from "@/data/dictionary";
import { ACRONYM_SLUGS, ACRONYM_TO_TERM, acronymBySlug } from "@/app/lib/reference";

export function generateStaticParams() {
  return ACRONYM_SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const entry = acronymBySlug(params.slug);
  if (!entry || ACRONYM_TO_TERM[params.slug]) return {};
  const description = `${entry.acronym} stands for ${entry.full}. ${entry.meaning}`.slice(0, 155);
  return {
    title: `${entry.acronym} — ${entry.full}`,
    description,
    openGraph: { title: `${entry.acronym} — ${entry.full}`, description, type: "article" },
    alternates: { canonical: `/acronyms/${params.slug}` },
  };
}

export default function AcronymPage({ params }: { params: { slug: string } }) {
  // The dictionary covers this concept in more depth — send readers there so the
  // two pages never compete for the same query.
  const termId = ACRONYM_TO_TERM[params.slug];
  if (termId) permanentRedirect(`/dictionary/${termId}`);

  const entry = acronymBySlug(params.slug);
  if (!entry) notFound();

  const relatedTerms = DICTIONARY.filter(
    (t) =>
      t.category !== undefined &&
      (t.term.toLowerCase().includes(entry.full.toLowerCase()) ||
        t.aliases.some((a) => a.toLowerCase() === entry.acronym.toLowerCase())),
  ).slice(0, 4);

  return (
    <article className="container-hub max-w-3xl space-y-6 py-8">
      <nav className="text-sm text-muted">
        <Link href="/acronyms" className="hover:text-gold">
          ← Acronym Decoder
        </Link>
      </nav>

      <header>
        <span className="chip border border-gold/40 text-gold">{entry.category}</span>
        <h1 className="section-title mt-3">
          <span className="mr-2">{entry.icon}</span>
          {entry.acronym}
        </h1>
        <p className="mt-1 text-lg text-text/80">{entry.full}</p>
      </header>

      <p className="text-base leading-relaxed text-text/85">{entry.meaning}</p>

      {relatedTerms.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted">
            Go deeper in the dictionary
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {relatedTerms.map((t) => (
              <Link key={t.id} href={`/dictionary/${t.id}`} className="chip hover:border-gold hover:text-gold">
                {t.term}
              </Link>
            ))}
          </div>
        </section>
      )}

      <p className="text-sm text-muted">
        <Link href="/dictionary" className="text-gold hover:underline">
          Browse the full dictionary →
        </Link>
      </p>
    </article>
  );
}
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: success; `/acronyms/[slug]` prerenders 84 paths.

- [ ] **Step 3: Verify pages, redirects, and 404s**

```bash
npx next start -p 3203 &
echo "own page:  $(curl -s -o /dev/null -w '%{http_code}' http://localhost:3203/acronyms/gpu)"
echo "overlap:   $(curl -s -o /dev/null -w '%{http_code} -> %{redirect_url}' http://localhost:3203/acronyms/rag)"
echo "overlap:   $(curl -s -o /dev/null -w '%{http_code} -> %{redirect_url}' http://localhost:3203/acronyms/llm)"
echo "unknown:   $(curl -s -o /dev/null -w '%{http_code}' http://localhost:3203/acronyms/zzzz)"
```

Expected: `200`; `308 -> /dictionary/rag`; `308 -> /dictionary/llm`; `404`.

- [ ] **Step 4: Verify all 22 overlaps redirect**

```bash
for s in llm react rag mcp a2a api cli swe-bench json orm dns cdn ci-cd oauth; do
  printf "%-10s %s\n" "$s" "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:3203/acronyms/$s)"
done
```

Expected: every line `308`. These are the 14 direct id collisions; the 8 alias-based
overlaps (`cot`, `hitl`, `rest`, `saas`, `10dlc`, `spf`, `dkim`, `dmarc`) are covered by
the Task 6 unit test asserting all 22 map to real dictionary ids.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add acronym pages with dictionary overlap redirects"
```

---

### Task 9: Link list pages to detail pages

**Files:**
- Modify: `app/dictionary/DictionaryClient.tsx`, `app/acronyms/AcronymsClient.tsx`, `app/components/TermOfTheDay.tsx`

**Interfaces:**
- Consumes: routes from Tasks 7 and 8; `ACRONYM_TO_TERM`, `slugify` from `app/lib/reference.ts`.
- Produces: no new exports.

- [ ] **Step 1: Add a permalink to each expanded term card**

In `app/dictionary/DictionaryClient.tsx`, inside the `{open && (...)}` block of `TermCard`,
append at the end of the expanded content:

```tsx
<a
  href={`/dictionary/${term.id}`}
  className="mt-3 inline-flex text-xs font-medium text-gold hover:underline"
>
  Open full page ↗
</a>
```

- [ ] **Step 2: Link acronym cards**

In `app/acronyms/AcronymsClient.tsx`, import at the top:

```tsx
import { ACRONYM_TO_TERM, slugify } from "@/app/lib/reference";
```

For each rendered acronym card, append a link that routes overlaps into the dictionary:

```tsx
{(() => {
  const slug = slugify(a.acronym);
  const termId = ACRONYM_TO_TERM[slug];
  return (
    <a
      href={termId ? `/dictionary/${termId}` : `/acronyms/${slug}`}
      className="mt-2 inline-flex text-xs font-medium text-gold hover:underline"
    >
      {termId ? "Full entry ↗" : "Details ↗"}
    </a>
  );
})()}
```

- [ ] **Step 3: Point Term of the Day at the real page**

In `app/components/TermOfTheDay.tsx`, replace any `/dictionary#term-${id}` href with
`/dictionary/${id}`.

Run: `grep -rn "dictionary#term-" app/`
Expected: no output.

- [ ] **Step 4: Build and verify links resolve**

```bash
npm run build && npx next start -p 3204 &
curl -s http://localhost:3204/dictionary | grep -c 'href="/dictionary/'
curl -s http://localhost:3204/acronyms  | grep -c 'href="/\(acronyms\|dictionary\)/'
```

Expected: non-zero counts on both.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: link dictionary and acronym lists to detail pages"
```

---

## Phase 3 — Unified search

### Task 10: Build-time search index

**Files:**
- Create: `app/search-index.json/route.ts`
- Modify: `app/lib/types.ts` (add `SearchRecord`)

**Interfaces:**
- Consumes: `DICTIONARY`, `ACRONYMS`, `SEED_TOOLS`, and `ACRONYM_TO_TERM`/`slugify` from `app/lib/reference.ts`.
- Produces: static asset `/search-index.json` returning `SearchRecord[]`.

- [ ] **Step 1: Add the shared type**

In `app/lib/types.ts`:

```ts
// ── Site search ──
export interface SearchRecord {
  type: "term" | "acronym" | "tool";
  title: string;
  keywords: string[];
  snippet: string;
  category: string;
  url: string;
}
```

- [ ] **Step 2: Create the route**

```ts
// app/search-index.json/route.ts
import { NextResponse } from "next/server";
import { DICTIONARY } from "@/data/dictionary";
import { ACRONYMS } from "@/data/acronyms";
import { SEED_TOOLS } from "@/app/lib/seed/tools";
import { ACRONYM_TO_TERM, slugify } from "@/app/lib/reference";
import type { SearchRecord } from "@/app/lib/types";

// Prerendered to a static asset at build time, so the home page ships none of
// this until a visitor actually types.
export const dynamic = "force-static";

function clip(text: string, max = 120): string {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length <= max ? clean : `${clean.slice(0, max - 1)}…`;
}

export function GET() {
  const records: SearchRecord[] = [];

  for (const term of DICTIONARY) {
    records.push({
      type: "term",
      title: term.term,
      keywords: term.aliases,
      snippet: clip(term.definition),
      category: term.category,
      url: `/dictionary/${term.id}`,
    });
  }

  for (const entry of ACRONYMS) {
    const slug = slugify(entry.acronym);
    const termId = ACRONYM_TO_TERM[slug];
    records.push({
      type: "acronym",
      title: entry.acronym,
      keywords: [entry.full],
      snippet: clip(entry.meaning),
      category: entry.category,
      url: termId ? `/dictionary/${termId}` : `/acronyms/${slug}`,
    });
  }

  for (const tool of SEED_TOOLS) {
    records.push({
      type: "tool",
      title: tool.name,
      keywords: [tool.creator],
      snippet: clip(tool.tagline || tool.when_to_use),
      category: tool.category,
      url: "/tools",
    });
  }

  return NextResponse.json(records);
}
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: success.

- [ ] **Step 4: Verify the index**

```bash
npx next start -p 3205 &
curl -s http://localhost:3205/search-index.json > /tmp/idx.json
node -e '
const r=require("/tmp/idx.json");
console.log("records:", r.length);
console.log("by type:", r.reduce((a,x)=>(a[x.type]=(a[x.type]||0)+1,a),{}));
console.log("bad urls:", r.filter(x=>!x.url.startsWith("/")).length);
console.log("size KB:", (JSON.stringify(r).length/1024).toFixed(1));
'
```

Expected: 257 records (133 term + 106 acronym + 18 tool), 0 bad urls, size well under 60 KB.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add build-time static search index"
```

---

### Task 11: Search scoring

**Files:**
- Create: `app/lib/search.ts`, `tests/search.test.ts`

**Interfaces:**
- Consumes: `SearchRecord` from `app/lib/types.ts`.
- Produces: `scoreRecord(record: SearchRecord, query: string): number` and
  `searchRecords(records: SearchRecord[], query: string, limit?: number): SearchRecord[]`.

- [ ] **Step 1: Write the failing test**

```ts
// tests/search.test.ts
import { describe, it, expect } from "vitest";
import { scoreRecord, searchRecords } from "@/app/lib/search";
import type { SearchRecord } from "@/app/lib/types";

const rec = (over: Partial<SearchRecord>): SearchRecord => ({
  type: "term", title: "Token", keywords: [], snippet: "A chunk of text.",
  category: "AI Foundations", url: "/dictionary/token", ...over,
});

describe("scoreRecord", () => {
  it("ranks an exact title match above a prefix match", () => {
    expect(scoreRecord(rec({ title: "RAG" }), "rag"))
      .toBeGreaterThan(scoreRecord(rec({ title: "RAG Pipeline" }), "rag"));
  });
  it("ranks a prefix match above a keyword match", () => {
    expect(scoreRecord(rec({ title: "Ragged" }), "rag"))
      .toBeGreaterThan(scoreRecord(rec({ title: "Retrieval", keywords: ["RAG"] }), "rag"));
  });
  it("ranks a keyword match above a snippet-only match", () => {
    expect(scoreRecord(rec({ title: "Retrieval", keywords: ["RAG"] }), "rag"))
      .toBeGreaterThan(scoreRecord(rec({ title: "Retrieval", snippet: "uses rag internally" }), "rag"));
  });
  it("returns 0 when nothing matches", () => {
    expect(scoreRecord(rec({}), "zzzz")).toBe(0);
  });
  it("is case insensitive", () => {
    expect(scoreRecord(rec({ title: "Token" }), "TOKEN")).toBeGreaterThan(0);
  });
});

describe("searchRecords", () => {
  const records = [
    rec({ title: "Token" }),
    rec({ title: "Context Window", url: "/dictionary/context-window" }),
    rec({ title: "Tokenizer", url: "/dictionary/tokenizer" }),
  ];
  it("returns exact matches first", () => {
    expect(searchRecords(records, "token")[0].title).toBe("Token");
  });
  it("drops non-matches", () => {
    expect(searchRecords(records, "token").some((r) => r.title === "Context Window")).toBe(false);
  });
  it("returns nothing for a blank query", () => {
    expect(searchRecords(records, "   ")).toEqual([]);
  });
  it("respects the limit", () => {
    expect(searchRecords(records, "token", 1)).toHaveLength(1);
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `@/app/lib/search`.

- [ ] **Step 3: Implement**

```ts
// app/lib/search.ts
import type { SearchRecord } from "@/app/lib/types";

// Weights are ordered, not tuned: an exact title beats a prefix, which beats an
// alias, which beats a body mention. The corpus is small enough that ordering
// matters and fuzzy matching does not.
const EXACT_TITLE = 100;
const PREFIX_TITLE = 60;
const KEYWORD = 40;
const TITLE_SUBSTRING = 25;
const SNIPPET = 10;

export function scoreRecord(record: SearchRecord, query: string): number {
  const q = query.trim().toLowerCase();
  if (!q) return 0;

  const title = record.title.toLowerCase();
  if (title === q) return EXACT_TITLE;
  if (title.startsWith(q)) return PREFIX_TITLE;

  if (record.keywords.some((k) => k.toLowerCase() === q)) return KEYWORD;
  if (title.includes(q)) return TITLE_SUBSTRING;
  if (record.keywords.some((k) => k.toLowerCase().includes(q))) return SNIPPET + 5;
  if (record.snippet.toLowerCase().includes(q)) return SNIPPET;

  return 0;
}

export function searchRecords(
  records: SearchRecord[],
  query: string,
  limit = 12,
): SearchRecord[] {
  if (!query.trim()) return [];
  return records
    .map((record) => ({ record, score: scoreRecord(record, query) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || a.record.title.localeCompare(b.record.title))
    .slice(0, limit)
    .map((r) => r.record);
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add search scoring with tests"
```

---

### Task 12: SiteSearch component

**Files:**
- Create: `app/components/SiteSearch.tsx`
- Modify: `app/components/Sidebar.tsx`

**Interfaces:**
- Consumes: `searchRecords` from `app/lib/search.ts`; `/search-index.json`.
- Produces: default export `SiteSearch({ variant }: { variant?: "hero" | "compact" })`.

- [ ] **Step 1: Create the component**

```tsx
// app/components/SiteSearch.tsx
"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { searchRecords } from "@/app/lib/search";
import type { SearchRecord } from "@/app/lib/types";

const TYPE_LABEL: Record<SearchRecord["type"], string> = {
  term: "Term",
  acronym: "Acronym",
  tool: "Tool",
};

export default function SiteSearch({ variant = "hero" }: { variant?: "hero" | "compact" }) {
  const router = useRouter();
  const listId = useId();
  const [records, setRecords] = useState<SearchRecord[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  // Index loads on first interaction, never on page load.
  async function loadIndex() {
    if (records || failed) return;
    try {
      const res = await fetch("/search-index.json");
      if (!res.ok) throw new Error("index unavailable");
      setRecords((await res.json()) as SearchRecord[]);
    } catch {
      setFailed(true);
    }
  }

  useEffect(() => {
    function onClickAway(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickAway);
    return () => document.removeEventListener("mousedown", onClickAway);
  }, []);

  const results = records ? searchRecords(records, query) : [];

  function go(record: SearchRecord) {
    setOpen(false);
    setQuery("");
    router.push(record.url);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") return setOpen(false);
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(results[active]);
    }
  }

  return (
    <div ref={boxRef} className="relative w-full">
      <input
        type="search"
        role="combobox"
        aria-expanded={open && results.length > 0}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={results.length ? `${listId}-${active}` : undefined}
        value={query}
        placeholder={variant === "hero" ? "Search terms, acronyms, tools…" : "Search…"}
        onFocus={() => { loadIndex(); setOpen(true); }}
        onChange={(e) => { setQuery(e.target.value); setActive(0); setOpen(true); }}
        onKeyDown={onKeyDown}
        className={variant === "hero" ? "input-hub w-full text-base sm:text-lg" : "input-hub w-full text-sm"}
      />

      {open && query.trim() !== "" && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-line bg-surface shadow-card">
          {failed ? (
            <p className="p-4 text-sm text-muted">
              Search is unavailable.{" "}
              <a href="/dictionary" className="text-gold hover:underline">Browse the dictionary →</a>
            </p>
          ) : results.length === 0 ? (
            <p className="p-4 text-sm text-muted">
              No matches for “{query}”.{" "}
              <a href="/dictionary" className="text-gold hover:underline">Browse all terms →</a>
            </p>
          ) : (
            <ul id={listId} role="listbox" className="max-h-80 overflow-y-auto">
              {results.map((r, i) => (
                <li
                  key={`${r.type}-${r.url}-${r.title}`}
                  id={`${listId}-${i}`}
                  role="option"
                  aria-selected={i === active}
                  onMouseEnter={() => setActive(i)}
                  onMouseDown={(e) => { e.preventDefault(); go(r); }}
                  className={`cursor-pointer border-b border-line/60 px-4 py-3 last:border-b-0 ${
                    i === active ? "bg-violet/15" : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="chip border border-gold/30 text-[0.6rem] text-gold">
                      {TYPE_LABEL[r.type]}
                    </span>
                    <span className="font-medium text-text">{r.title}</span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs text-muted">{r.snippet}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Add the compact variant to the sidebar**

In `app/components/Sidebar.tsx`, import `SiteSearch` and render it directly beneath the
desktop logo link, wrapped in `<div className="px-4 pb-3">`:

```tsx
<div className="px-4 pb-3">
  <SiteSearch variant="compact" />
</div>
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: success.

- [ ] **Step 4: Verify search behaviour in a browser**

```bash
npx next start -p 3206
```

Manually: focus the sidebar search, type `rag` — expect "RAG" first; press Enter — expect
navigation to `/dictionary/rag`. Type `zzzz` — expect the no-matches message with a browse link.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add site-wide search combobox"
```

---

## Phase 4 — Home page and discoverability

### Task 13: Search-first home page

**Files:**
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `SiteSearch`, `getTools`, `DICTIONARY`, `ACRONYMS`, `NAV_ITEMS`, `TermOfTheDay`.
- Produces: no new exports.

- [ ] **Step 1: Rewrite the hero and stats**

Replace the imports and the top of `HomePage` in `app/page.tsx`:

```tsx
import Link from "next/link";
import { BRAND, NAV_ITEMS } from "@/app/lib/constants";
import Dashboard from "@/app/components/Dashboard";
import NavIcon from "@/app/components/NavIcons";
import SiteSearch from "@/app/components/SiteSearch";
import TermOfTheDay from "@/app/components/TermOfTheDay";
import { getTools } from "@/app/lib/data";
import { DICTIONARY } from "@/data/dictionary";
import { ACRONYMS } from "@/data/acronyms";

export default async function HomePage() {
  const tools = await getTools();

  // Every value is derived — no count is ever written as prose.
  const stats = [
    { label: "Terms", value: DICTIONARY.length, icon: "📘", hint: "AI · agents · automation · GHL · web" },
    { label: "Acronyms", value: ACRONYMS.length, icon: "🔤", hint: "Decoded in plain English" },
    { label: "Tools", value: tools.length, icon: "⚖️", hint: "Models, agents & platforms" },
    { label: "Modules", value: NAV_ITEMS.length - 1, icon: "🧭", hint: "Guides & references" },
  ];

  const modules = NAV_ITEMS.filter((n) => n.href !== "/");
```

- [ ] **Step 2: Make search the hero**

Replace the hero `<section>` body with:

```tsx
      <section className="relative overflow-hidden rounded-2xl border border-line bg-surface/40 px-6 py-14 shadow-glow sm:px-12 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow animate-fade-up">{BRAND.handle} · AI &amp; Automation</p>
          <h1 className="mt-4 animate-fade-up text-balance font-display text-3xl font-extrabold uppercase leading-[1.05] tracking-tight text-text sm:text-5xl">
            Look up anything in{" "}
            <span className="bg-gradient-to-r from-gold via-gold-soft to-violet-light bg-clip-text text-transparent">
              AI &amp; automation
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl animate-fade-up text-base text-white/70">
            A plain-English reference for the terms, acronyms, and tools behind
            modern AI and automation.
          </p>

          <div className="mx-auto mt-8 max-w-xl animate-fade-up">
            <SiteSearch variant="hero" />
          </div>

          <p className="mt-4 text-sm text-muted">
            or browse{" "}
            <Link href="/dictionary" className="text-gold hover:underline">the dictionary</Link>,{" "}
            <Link href="/acronyms" className="text-gold hover:underline">acronyms</Link>, or{" "}
            <Link href="/tools" className="text-gold hover:underline">tools</Link>
          </p>
        </div>
      </section>
```

- [ ] **Step 3: Remove the Latest Updates section**

Delete the entire `{/* ───────────── Latest updates preview ───────────── */}` section.

- [ ] **Step 4: Rewrite the closing CTA**

```tsx
      <section className="relative overflow-hidden rounded-2xl border border-violet-soft/30 bg-gradient-to-br from-violet/25 via-surface to-surface px-6 py-12 text-center shadow-glow">
        <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight text-white sm:text-3xl">
          Everything here is free to use.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          No sign-up, no paywall. Search it, link to it, share it with someone
          who is learning.
        </p>
        <Link href="/dictionary" className="btn-gold mt-6 inline-flex">
          Start exploring →
        </Link>
      </section>
```

- [ ] **Step 5: Build and verify**

```bash
npm run build && npx next start -p 3207 &
curl -s http://localhost:3207/ | grep -c 'role="combobox"'
curl -s http://localhost:3207/ | grep -c "Latest Updates"
```

Expected: `1` and `0`.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: search-first home page"
```

---

### Task 14: Discoverability infrastructure

**Files:**
- Create: `app/sitemap.ts`, `app/robots.ts`, `app/not-found.tsx`, `app/error.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `TERM_IDS`, `ACRONYM_SLUGS` from `app/lib/reference.ts`; `NAV_ITEMS`.
- Produces: `siteUrl()` exported from `app/lib/siteUrl.ts`.

- [ ] **Step 1: Create the site URL helper**

```ts
// app/lib/siteUrl.ts
// Resolution order: explicit config → Vercel's per-deploy URL → local dev.
export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}
```

- [ ] **Step 2: Add metadataBase to the layout**

In `app/layout.tsx`, import `siteUrl` and add to the `metadata` object:

```ts
  metadataBase: new URL(siteUrl()),
```

- [ ] **Step 3: Create the sitemap**

```ts
// app/sitemap.ts
import type { MetadataRoute } from "next";
import { NAV_ITEMS } from "@/app/lib/constants";
import { TERM_IDS, ACRONYM_SLUGS } from "@/app/lib/reference";
import { siteUrl } from "@/app/lib/siteUrl";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const pages = NAV_ITEMS.map((item) => ({
    url: `${base}${item.href}`,
    priority: item.href === "/" ? 1 : 0.8,
  }));
  const terms = TERM_IDS.map((id) => ({ url: `${base}/dictionary/${id}`, priority: 0.7 }));
  const acronyms = ACRONYM_SLUGS.map((slug) => ({ url: `${base}/acronyms/${slug}`, priority: 0.6 }));
  return [...pages, ...terms, ...acronyms];
}
```

- [ ] **Step 4: Create robots**

```ts
// app/robots.ts
import type { MetadataRoute } from "next";
import { siteUrl } from "@/app/lib/siteUrl";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/unlock"] },
    sitemap: `${siteUrl()}/sitemap.xml`,
  };
}
```

- [ ] **Step 5: Create the not-found page**

```tsx
// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-hub max-w-xl py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="section-title mt-2">That page doesn&apos;t exist.</h1>
      <p className="mt-3 text-muted">
        It may have moved, or the link may be wrong.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-gold">Home</Link>
        <Link href="/dictionary" className="btn-ghost">Browse the dictionary</Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Create the error boundary**

```tsx
// app/error.tsx
"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container-hub max-w-xl py-24 text-center">
      <p className="eyebrow">Something broke</p>
      <h1 className="section-title mt-2">This page failed to load.</h1>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button onClick={reset} className="btn-gold">Try again</button>
        <Link href="/" className="btn-ghost">Go home</Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 7: Build and verify**

```bash
npm run build && npx next start -p 3208 &
echo "sitemap urls: $(curl -s http://localhost:3208/sitemap.xml | grep -c '<loc>')"
echo "robots:       $(curl -s http://localhost:3208/robots.txt | head -1)"
echo "404 page:     $(curl -s -o /dev/null -w '%{http_code}' http://localhost:3208/nope)"
```

Expected: sitemap `<loc>` count equals `NAV_ITEMS.length + 133 + 84`; robots returns
`User-Agent: *`; unknown route returns `404`.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add sitemap, robots, metadataBase, and error pages"
```

---

### Task 15: Full verification

**Files:** none modified.

- [ ] **Step 1: Clean build**

```bash
rm -rf .next && npm run build
```

Expected: success; public routes `○ (Static)`; `/dictionary/[slug]` and `/acronyms/[slug]` prerendered.

- [ ] **Step 2: Run the test suite**

Run: `npm test`
Expected: all pass.

- [ ] **Step 3: Full runtime assertion sweep**

```bash
npx next start -p 3209 &
B=http://localhost:3209
for p in / /dictionary /acronyms /tools /quiz /claude-hub /ghl-hub /automation-hub /dev-tools /web-guide /updates /interview /presentation /tasks /resources; do
  printf "%-20s %s\n" "$p" "$(curl -s -o /dev/null -w '%{http_code}' $B$p)"
done
echo "term page:     $(curl -s -o /dev/null -w '%{http_code}' $B/dictionary/token)"
echo "acronym page:  $(curl -s -o /dev/null -w '%{http_code}' $B/acronyms/gpu)"
echo "overlap 308:   $(curl -s -o /dev/null -w '%{http_code}' $B/acronyms/rag)"
echo "unknown 404:   $(curl -s -o /dev/null -w '%{http_code}' $B/dictionary/nope)"
echo "prompts gone:  $(curl -s -o /dev/null -w '%{http_code}' $B/prompts)"
echo "api locked:    $(curl -s -o /dev/null -w '%{http_code}' -X POST $B/api/resources -H 'Content-Type: application/json' -d '{\"op\":\"list\"}')"
```

Expected: all pages `200`; term/acronym `200`; overlap `308`; unknown `404`; `/prompts` `404`; API `401`.

- [ ] **Step 4: Confirm security headers survived**

Run: `curl -s -D - -o /dev/null $B/ | grep -icE "content-security-policy|x-frame-options|strict-transport"`
Expected: `3`

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: verify public reference reframe"
```

---

## Self-Review

**Spec coverage**

| Spec requirement | Task |
|---|---|
| All pages public, gate survives for `/api/resources` | 4 |
| Prompt Vault removed | 2 |
| Flashcards removed, `status` stripped | 3 |
| Interview PDF, generated before stripping | 1 |
| Static rendering restored | 4 |
| Voice/copy pass | 5 |
| `/dictionary/[slug]` × 133 | 7 |
| `/acronyms/[slug]` × ~84 + 22 redirects | 6, 8 |
| List → detail linking, Term of the Day | 9 |
| Build-time search index | 10 |
| Dependency-free scoring | 11 |
| `SiteSearch`, two placements, combobox a11y | 12 |
| Search-first home, Latest Updates removed, derived tiles | 13 |
| sitemap, robots, `metadataBase`, not-found, error | 14 |
| Vitest on the risky pure functions | 6, 11 |
| Runtime verification sweep | 15 |

Default `opengraph-image` is deliberately deferred — a branded card needs the visual
direction from the frontend pass, and `metadataBase` plus per-page OG metadata (Tasks 7, 8, 14)
already make shared links resolve correctly.

**Placeholder scan:** none. Every code step carries real content.

**Type consistency:** `SearchRecord` defined in Task 10, consumed in 11 and 12 with matching
fields. `slugify`, `ACRONYM_TO_TERM`, `ACRONYM_SLUGS`, `TERM_IDS`, `acronymBySlug` defined in
Task 6, consumed in 8, 9, 10, 14 under those exact names. `siteUrl()` defined in Task 14
Step 1 before its use in Steps 2–4.
