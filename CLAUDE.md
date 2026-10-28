# CLAUDE.md — AI Specialist Learning Hub

Operating manual for this repo. Read this before editing anything.

**What it is:** a fully public Next.js 16 (App Router, Turbopack) reference site
for AI and automation — searchable dictionary, acronym decoder, tools comparison,
quiz, and practical guides. Statically rendered, deployed on Vercel.

---

## Rule 0 — where data lives

There are **two** data stores and the split is not obvious. Get this wrong and
you will edit a file that no page reads.

| Store | Holds | Read by |
|---|---|---|
| **`data/`** (repo root) | `dictionary.ts` · `acronyms.ts` · `models.ts` · `paths.ts` (+ `lessons/`) · `projects.ts` (+ `projects/`) | `/dictionary`, `/dictionary/[slug]`, `/acronyms`, `/acronyms/[slug]`, `/quiz`, Term-of-the-Day, home stats, search index; `models.ts` feeds tools, dev tools, web guide and hub pages |
| **`app/lib/seed/`** | everything else — tools, hubs (Claude Hub renders `arsenal.ts` + `arsenal-skills.ts`), web guide, dev tools, interview, discovery, updates archive | the matching route |

**`data/dictionary.ts` is the canonical dictionary**, exported as `DICTIONARY` /
`DICTIONARY_BY_ID`. (No count written here — see Conventions. The live count
renders on the home page.)

Every entry is validated by `app/lib/content/schema.ts` (zod) in
`tests/content.test.ts`. **A term ships only with provenance**: `simple`,
`sources` (https, at least one) and `lastVerified` are required; a bad date, a
broken `related` id, or a deprecated term with no successor or note fails the
test run. `status` is `current` (omitted), `emerging` or `deprecated` —
deprecated terms stay findable but are flagged in the list and search, and are
excluded from quizzes.

**`data/models.ts` is the model registry** — the one place a model name,
version, price or lifecycle status is written. Seed files reference it via
`model("<id>").name` / `.pricingNote` instead of hardcoding names; `model()`
throws on an unknown id, so a removed model fails the build rather than
rendering "undefined". Prices are dated notes with a source, never bare numbers.

Never write a fact from memory. Research registers with an official URL per
claim live in `docs/research/<yyyy-mm>/`; reuse and extend them.

Dead stores were content-diffed and deleted on 2026-10-26: `seed/terms.ts`,
`seed/glossary.ts` and `seed/claude.ts` (never imported). Do not recreate them.

### Precedence, in one line
`data/dictionary.ts` is the source of truth for terms. The `--c-*` CSS variables in
`app/globals.css` are the source of truth for colour — a light ("lavender glass",
default) and a dark ("midnight glass") set; `tailwind.config.ts` only maps class
names onto them. Never hardcode a hex or `text-white` in a component: it breaks one
of the two themes. For inline-style colours use `TOKEN` / `tint()` from
`app/lib/color.ts`. Brand name, tagline and logo live in `BRAND` (`app/lib/constants.ts`)
and `public/aj-mark.png` / `app/icon.png`.

---

## Rule 1 — every page is public

There are no gated pages, and **there is no middleware file** — it was removed
once it stopped gating anything. (Next 16 renamed that convention to `proxy`;
if you ever need one, use `proxy.ts`, not `middleware.ts`.)

**The admin session protects exactly one thing:** writes to `/api/resources`,
which run on the Supabase **service-role key** and therefore bypass RLS. Without
that check the endpoint would be an open write path into the database.

- One secret: `ADMIN_PASSCODE` (server env, never `NEXT_PUBLIC_*`).
- `/api/unlock` verifies it (rate-limited, constant-time) and sets an httpOnly
  cookie holding a SHA-256 token — never the passcode.
- `app/lib/access.ts` — hashing and comparison helpers.
  `app/lib/adminSession.ts` — the `isAdmin()` check for server components and
  route handlers (uses `next/headers`).
- **It fails closed.** With `ADMIN_PASSCODE` unset, `isAdmin()` is always false
  and writes are rejected. Never "fix" that by defaulting to open.

### Keep the Footer cookie-free
`app/components/Footer.tsx` renders on every page. Reading the admin session
there opts the **entire site** out of static rendering — this happened once and
cost all 24 routes their static generation. The sign-out control lives on
`/unlock` for that reason. Same applies to any other globally-rendered component.

### The client-import rule (still applies to any future private data)
> Data imported inside a `"use client"` file is compiled into
> `/_next/static/chunks/...`, which is served **without authentication**.
> Middleware cannot match `/_next/static/*`.

Nothing on this site is private today, so nothing is at risk. But if private
content is ever added, import it in `page.tsx` and pass it down as props. This
bug shipped once — see `audits/os-audit-2026-08-07.md`.

---

## Rule 2 — reference routing and the acronym overlap

`app/lib/reference.ts` owns every slug decision. It is pure and unit-tested;
do not hand-maintain anything it derives.

- `TERM_IDS` — one page per dictionary term at `/dictionary/<id>`
- `ACRONYM_SLUGS` — acronyms that get their **own** page at `/acronyms/<slug>`
- `ACRONYM_TO_TERM` — acronyms the dictionary already covers, mapped to their
  term id. These get **no page**; `/acronyms/<slug>` issues a 308 into
  `/dictionary/<id>`.

Why: some acronyms collide with a term id (`rag`, `llm`, `mcp`, `api`…) and
others are registered dictionary aliases (`CoT`, `HITL`, `MoE`…). Publishing
both would put two pages about one concept on the same domain, competing in search.

**Adding a dictionary term or alias can silently create a new overlap.**
`tests/reference.test.ts` pins the exact count so that happens on purpose: when
it fails, check every new mapping points at the *same concept*, then bump it.
- `HOMONYM_SLUGS` — same letters, different concept (ReAct the agent pattern vs
  React the UI library). Homonyms keep their own acronym page and never redirect.

`/dictionary/[slug]` sets `dynamicParams = false`. `/acronyms/[slug]` leaves it
true so the overlap slugs stay routable and can redirect.

---

## Rule 3 — search

`app/search-index.json/route.ts` is a route handler with
`export const dynamic = "force-static"` — Next prerenders it to a static asset at
build time. There is no build script to keep in sync.

The index carries only `type`, `title`, `keywords`, a ~120-char `snippet`,
`category`, and `url`. **Never put full source data in it** — it is fetched by
the browser, and the reason it exists at all is to keep the raw data off the
page. `SiteSearch` loads it on first interaction, never on page load.

Ranking lives in `app/lib/search.ts` and is dependency-free by choice. Overlapping
acronyms resolve to their dictionary URL in the index, so search never sends
anyone through a redirect.

---

## Rule 4 — retired, do not revive

The automated weekly Updates feed is **retired**. `/api/updates` and `/api/cron/updates`
are deleted; `CRON_SECRET` is gone. `/updates` is now **refreshed by hand**: edit
`SEED_UPDATES` in `app/lib/seed/updates.ts` (every item needs an official source URL)
and bump `UPDATES_VERIFIED_ON` — the page header derives its "last updated" date from it.
Visitors' own additions, edits and hides live in `lh.updates.v2` as an overlay on the
seed, so a refresh reaches everyone. (v1 stored a full copy of the list, which froze it
for returning visitors; it is migrated once and removed.)

It was never scheduled — the cron endpoint existed for six weeks with no caller,
which is why the "weekly" feed silently froze. If you bring it back, wire the
scheduler in the same change or don't ship it.

The **Prompt Vault** is removed: `app/prompts/` and `data/prompts.ts` (261 KB)
are deleted. Do not reintroduce them without a reason.

---

## Conventions

- **No live numbers in prose.** Counts, statuses, and dates do not go in
  `README.md`, nav descriptions, or this file — they go stale in a place people
  trust. Derive them (`DICTIONARY.length`) or omit them.
- ES modules, `async/await`, 2-space indent, TypeScript strict.
- Comment the *why*. Skip comments that restate the code.
- **Learner progress lives in one store**: `app/lib/learner/state.ts` (pure, tested) + `store.ts` (`useLearner()`, key `lh.learner.v1`, zod-validated on load and on backup restore). Bookmarks, lessons, project steps, flashcards, quiz history/weak spots, interview ratings and streak all go there — don't add a parallel key for learning state. Interview *answers* stay in `lh.interview.v3` because they are the user's own writing, not progress. The answer bank (`app/lib/seed/interview.ts`) is fill-in templates — `[bracketed]` blanks are highlighted and counted — and it is public, so it must never contain real names, clients or places. The older personal set in `lh.interview.v2` is never overwritten; the page offers to restore it.
- Other client components own their own localStorage key (`lh.<feature>.v<n>`).
- Lessons and projects reference dictionary terms by id (`termIds`) — never copy definitions. `tests/paths.test.ts` fails on an unknown id.
- Every page is a server component that hands data to a `"use client"` child.
- Reading `searchParams` in a server component makes the route dynamic. Read the
  query string in the client child behind `<Suspense>` instead — `/quiz` does this.
- **Request APIs are async** (Next 15+): `await cookies()`, and `params` is a
  `Promise` in pages and `generateMetadata`. See `app/dictionary/[slug]/page.tsx`
  for the pattern.

## Commands

| Command | Notes |
|---|---|
| `npm run dev` | dev server |
| `npm run build` | production build — also the real typecheck |
| `npm run start` | serve the build |
| `npm test` | Vitest — slug/overlap resolution, search ranking, content schema and freshness |
| `npm run content:check` | read-only staleness report — dictionary terms and model registry rows not re-verified in 120 days; exits 1 only on integrity errors. `--max-age=<days>` overrides the threshold. Run it before any content refresh |
| `npm run lint` | **broken** — ESLint is unconfigured and this drops into an interactive setup prompt |

**Windows path quirk:** the `&` in this repo's path (`Apps & Systems`) breaks
npm's `.cmd` shims, so `npm test` / `npm run build` fail locally with
"'Systems\' is not recognized". Call the binaries through node instead:
`node node_modules/vitest/vitest.mjs run`, `node node_modules/next/dist/bin/next build`.
Vercel builds are unaffected.

Tests cover the pure functions where a silent bug has wide blast radius. Anything
added to `app/lib/reference.ts`, `app/lib/search.ts` or `app/lib/content/` should come with tests.

## Environment

See `.env.example`. All optional. `ADMIN_PASSCODE` is only needed to authorize
resource writes; `NEXT_PUBLIC_SITE_URL` sets the canonical origin for metadata
and the sitemap, falling back to `VERCEL_URL` then localhost.

## Known state

- `audits/os-audit-2026-08-07.md` — drift audit: what was fixed, what is open.
- `docs/superpowers/specs/` and `docs/superpowers/plans/` — the reframe design
  and its implementation plan.
- `npm audit --omit=dev` reports 0 vulnerabilities (rechecked 2026-10-26, after
  an in-range bump to Next 16.4.3 closed a critical RCE advisory). Never run
  `npm audit fix --omit=dev` — it prunes devDependencies from `node_modules`.
  Do not downgrade Next.
- `docs/superpowers/plans/2026-10-26-hub-2.0-roadmap.md` — the Hub 2.0 milestones (M0–M5).
- **Still open:** ESLint is unconfigured. Dev-only advisories (vitest, vite,
  browserslist) remain because `npm audit fix` hits an npm arborist bug
  (`reading 'edgesOut'`) on vitest's optional jsdom peer; none ship to production.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
