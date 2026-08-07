# Public Reference Reframe — Design

**Date:** 2026-08-07
**Status:** Approved, pending implementation plan
**Supersedes:** the gating decisions in `audits/os-audit-2026-08-07.md` Batch A (see *Reversals*)

---

## Goal

Turn the AI Specialist Learning Hub from a personal learning system into a
**genuinely useful public reference** — something people find via search,
bookmark, and return to. Owner identity stays a byline, not a pitch.

Explicitly **not** the goal: portfolio credibility theatre, lead generation, or
a contact/booking funnel. Those were considered and rejected.

## Success criteria

1. A stranger can find a specific term via search engine and land on a page for it.
2. Any entry can be linked, shared, and quoted by URL.
3. Search across the whole reference works from any page.
4. Public pages render statically and are CDN-cacheable.
5. No route in the nav dead-ends a visitor.
6. No page implies the site is abandoned.

---

## Reversals from the Batch A security work

Batch A gated `/interview` and `/presentation` and moved personal modules
private. The owner has since decided **every page is public**. This is a
deliberate reversal, recorded here so the audit trail stays honest:

- The private workspace is dissolved. Nav gates nothing.
- `/interview` and `/presentation` publish personal prep and client scripts.
  Accepted consequence: competitors can read the pitch and discovery playbook.
- **The gate is not deleted.** `/api/resources` writes run on the Supabase
  service-role key, which bypasses RLS. That endpoint stays admin-only or the
  database is world-writable. `ADMIN_PASSCODE`, `/api/unlock`, `/api/logout`,
  and `adminSession.ts` survive to protect exactly one API route.
- `middleware.ts` gating is removed; its matcher no longer covers any page.

The Batch A rule that private data must be imported in server components no
longer applies to interview/presentation content, since it is now public. It
remains correct guidance and stays in `CLAUDE.md` for any future private data.

---

## Data findings that shaped the design

Measured against the live data, not assumed:

| Fact | Value | Consequence |
|---|---|---|
| Dictionary entries | 133, all with unique slug-ready `id` | URLs come free; no slug generation needed |
| Acronym entries | 106, no `id` field, no slug collisions among themselves | Slugs derived from `acronym`, lowercased |
| Acronyms whose slug **equals** a dictionary `id` | **14** (`llm`, `rag`, `mcp`, `api`, `react`, `a2a`, `cli`, `swe-bench`, `json`, `orm`, `dns`, `cdn`, `ci-cd`, `oauth`) | Would create duplicate pages competing in search |
| Acronyms appearing as a dictionary **alias** | **8** (`CoT`, `HITL`, `REST`, `SaaS`, `10DLC`, `SPF`, `DKIM`, `DMARC`) | Same problem |
| Interview entries | 25, of which **22** carry `status: "Needs work"` | Field is legacy and unrendered, but ships in page source |
| `data/prompts.ts` | 261 KB | Largest file in repo; removing it is the biggest single bundle win |
| Current build output | all 24 routes `ƒ (Dynamic)` | Caused by `isAdmin()` in the global Footer |

**22 of 106 acronyms duplicate dictionary content.** This is the finding that
most shaped the routing design.

---

## Section 1 — Scope and architecture

### Public surface (15 nav routes)

| Group | Routes |
|---|---|
| Learning Hub | Home · Dictionary · Tools · Resources · Claude Hub · GHL Hub · Automation Hub · Updates |
| Workspace | Quiz · Interview · Presentation · Tasks |
| Reference | Acronyms · Dev Tools · Web Guide |

15 nav entries including Home, so the home module grid renders **14 cards**
(`NAV_ITEMS` minus Home). This is down from 15 cards, with Prompt Vault removed.

All are public. `/unlock` stays reachable as an admin door but is not linked
from the nav.

### Removed: Prompt Vault
Delete `app/prompts/`, `data/prompts.ts` (261 KB), the `NAV_GROUPS` entry, the
`/prompts` entry in `NavIcons.tsx`, and the "Prompts Ready" home stat tile.

### Interview changes
- Remove the Flashcards tab from `InterviewTabs.tsx`; delete `Flashcards.tsx`.
  Remaining modes: Employee, Employer.
- Strip `status` from all 25 entries in `app/lib/seed/interview.ts` and remove
  `status` and the `InterviewStatus` type from `app/lib/types.ts`.
- **Before either change**, generate a one-time PDF of all 25 question/answer
  pairs as the owner's personal record (see *Deliverables*).

### Static rendering restored
- Remove the `isAdmin()` call from `app/components/Footer.tsx`. This single call
  is why every route renders dynamically. The sign-out control moves to
  `/unlock`.
- Remove `export const dynamic = "force-dynamic"` where no longer required.
- Acceptance: `npm run build` shows `○ (Static)` for public routes.

### Voice
| Location | From | To |
|---|---|---|
| `app/page.tsx` CTA | "This is my learning system — going public." | visitor-facing framing |
| `app/layout.tsx` description | "a personal, public knowledge system" | reference-site framing |
| `constants.ts` + `tasks/page.tsx` | "My Tasks" | "Tasks" |
| `constants.ts` | "Q&A log for self-review" | visitor-facing description |
| `app/lib/export.ts` | "# 🔖 My Learning Journey" | "# 🔖 Learning Journey" |

Owner attribution stays in the footer.

---

## Section 2 — Deep-linkable pages

### `/dictionary/[slug]` — 133 static pages
Slug is the existing `DictionaryTerm.id`. Renders term, category, level,
definition, analogy, why-it-matters, example, aliases, and `related[]` as links
to **other detail pages**, forming a crawlable internal link graph.

### `/acronyms/[slug]` — ~84 static pages
Slug is `acronym.toLowerCase()` normalised to `[a-z0-9-]`.

**Overlap handling.** A build-time map resolves the 22 overlapping acronyms to
their dictionary counterpart:
- No page is generated for those slugs.
- Direct hits `permanentRedirect()` to `/dictionary/<id>` (308).
- In the acronym list, those entries render a "full entry →" link.
- Remaining acronym pages cross-link to related dictionary terms.

The map is derived at build time from the data — matching `id` first, then
scanning `aliases` case-insensitively. It is never hand-maintained.

### Shared mechanics
- `generateStaticParams` for both; `export const dynamicParams = false` so
  unknown slugs 404 rather than attempting render.
- `generateMetadata` per page: title, description from the definition/meaning,
  and OpenGraph.

### Preserved behaviour
- The existing `DictionaryClient` accordion, search, and filters are unchanged.
- `#term-<id>` hash deep links keep working.
- `TermOfTheDay` links to `/dictionary/<id>` instead of `/dictionary#term-<id>`.

### Duplication
The accordion mounts expanded content only when open, so the list page carries
term + definition while detail pages add analogy, why-it-matters, example, and
links. Overlap is limited to one definition sentence — acceptable hub-and-spoke
structure.

---

## Section 3 — Unified search

### Index
A route handler at `app/search-index.json/route.ts` exporting `GET` with
`export const dynamic = "force-static"`, prerendered to a static asset at build
time. No extra build script.

Record shape:

```ts
interface SearchRecord {
  type: "term" | "acronym" | "tool";
  title: string;
  keywords: string[];   // aliases, full names
  snippet: string;      // ~120 chars
  category: string;
  url: string;
}
```

~257 records, ≈40 KB raw / ≈12 KB gzipped. Fetched on first interaction and
browser-cached. The home page ships none of it until the user types.

### Scoring
Dependency-free, roughly 40 lines, ranked: exact title match → title prefix →
keyword/alias hit → snippet substring, with category as tiebreak. `fuse.js`
was considered and rejected — the corpus is small and well-structured, and it
would be a dependency solving a problem the data doesn't have.

### Component
One `SiteSearch` client component in two placements: the home hero (large,
autofocused) and a compact sidebar trigger available on every page. Both
lazy-load the same index on first focus.

Implemented as a real combobox — `role="listbox"`, `role="option"`,
`aria-expanded`, `aria-activedescendant`. Keyboard: ↑ ↓ to move, Enter to open,
Esc to dismiss.

### Failure states
- No matches → message plus browse links to `/dictionary` and `/acronyms`.
- Index fetch failure → degrade to a direct link to `/dictionary`, never a dead
  input.

---

## Section 4 — Home page and discoverability

### Home
1. Hero: brand statement + prominent search + "or browse:" shortcuts
2. Term of the Day
3. Derived stat tiles — every value computed from data, never written as prose:
   | Tile | Source |
   |---|---|
   | Terms | `DICTIONARY.length` |
   | Acronyms | `ACRONYMS.length` |
   | Tools | `SEED_TOOLS.length` |
   | Modules | `NAV_ITEMS.length - 1` |
4. Module grid (14 cards)
5. Visitor-facing closing CTA

**The "Latest Updates" block is removed from the home page.** `/updates` remains
public and in the nav, but a landing page leading with June-2026 news is the
strongest "abandoned site" signal available to a first-time visitor.

### Discoverability
- `app/sitemap.ts` — static routes + 133 term pages + 84 acronym pages,
  generated from the data so it cannot drift
- `app/robots.ts` — allow all, reference the sitemap
- `metadataBase` — from `NEXT_PUBLIC_SITE_URL`, falling back to `VERCEL_URL`,
  then `http://localhost:3000` in development
- A default `opengraph-image` for branded social cards
- `app/not-found.tsx` and `app/error.tsx` — branded, replacing Next's defaults

---

## Testing

Add **Vitest** as a dev dependency (approved). Cover the pure functions where a
silent bug has wide blast radius:

- search scoring and ranking order
- the acronym → dictionary overlap map (must resolve exactly the 22 known cases)
- slug generation and normalisation

Runtime verification against a running production build, as used for the Batch A
security work:
- every public route returns 200
- a sample of term and acronym pages prerender with correct metadata
- all 22 overlapping acronym slugs 308-redirect to their dictionary term
- unknown slugs 404
- `/api/resources` still returns 401 without an admin session
- `sitemap.xml` contains the expected URL count
- build output shows `○ (Static)` for public routes

---

## Deliverables

1. **Interview Q&A PDF** — one-time export of all 25 pairs, generated before the
   `status` field is stripped.
2. The implementation described above.

---

## Out of scope

- Visual/aesthetic redesign — this is the frontend design pass that follows.
- Reviving the Updates feed (retired; see `CLAUDE.md`).
- Deleting `app/lib/seed/terms.ts` and `glossary.ts` — the stalled dictionary
  migration needs a content diff first, tracked separately as Batch C.
- Configuring ESLint (`npm run lint` remains broken).
- Per-term generated OG images — 133 build-time image renders is a poor trade
  against a single well-made default card.

## Risks

| Risk | Mitigation |
|---|---|
| Acronym pages are thin (1–2 sentences) and may be seen as low value | Cross-link each to related dictionary terms; the 22 strongest cases redirect into the richer pages instead of competing |
| Publishing interview/presentation content exposes personal narrative and client scripts | Owner decision, recorded. `status` stripping removes the sharpest edge |
| Search index drifts from the data | Generated at build time from the same source; never hand-maintained |
| Removing routes after a sitemap exists causes 404s in the index | Route removals (Prompt Vault) happen before the sitemap is generated |
