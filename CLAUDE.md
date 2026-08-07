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
| **`data/`** (repo root) | `dictionary.ts` · `acronyms.ts` | `/dictionary`, `/dictionary/[slug]`, `/acronyms`, `/acronyms/[slug]`, `/quiz`, Term-of-the-Day, home stats, search index |
| **`app/lib/seed/`** | everything else — tools, hubs, web guide, dev tools, interview, presentation, discovery, updates archive | the matching route |

**`data/dictionary.ts` is the canonical dictionary**, exported as `DICTIONARY` /
`DICTIONARY_BY_ID`. (No count written here — see Conventions. The live count
renders on the home page.)

Two older stores still exist and are **unreachable** — nothing imports them.
Their counts are given because they are frozen, and the gap is the point:

- `app/lib/seed/terms.ts` — 76 entries; reachable only via `getTerms()`, which has no callers
- `app/lib/seed/glossary.ts` — 63 entries; reachable only via `GlossaryClient.tsx`, which nothing imports

They are a stalled migration, pending a content diff before deletion. Until that
happens: **do not edit them, and do not quote them as current.**

### Precedence, in one line
`data/dictionary.ts` is the source of truth for terms. `tailwind.config.ts` is
the source of truth for colour. Everything else points at those.

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
- `ACRONYM_TO_TERM` — the 22 acronyms the dictionary already covers, mapped to
  their term id. These get **no page**; `/acronyms/<slug>` issues a 308 into
  `/dictionary/<id>`.

Why: 14 acronyms collide with a term id (`rag`, `llm`, `mcp`, `api`…) and 8 more
are registered dictionary aliases (`CoT`, `HITL`, `SPF`…). Publishing both would
put two pages about one concept on the same domain, competing in search.

`/dictionary/[slug]` sets `dynamicParams = false`. `/acronyms/[slug]` leaves it
true so the 22 overlap slugs stay routable and can redirect.

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

The weekly Updates feed is **retired**. `/api/updates` and `/api/cron/updates`
are deleted; `CRON_SECRET` is gone. `/updates` is a read-only archive rendering
`SEED_UPDATES` into per-browser localStorage.

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
- Client components own their own localStorage key (`lh.<feature>.v<n>`).
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
| `npm test` | Vitest — slug/overlap resolution and search ranking |
| `npm run lint` | **broken** — ESLint is unconfigured and this drops into an interactive setup prompt |

Tests cover the pure functions where a silent bug has wide blast radius. Anything
added to `app/lib/reference.ts` or `app/lib/search.ts` should come with tests.

## Environment

See `.env.example`. All optional. `ADMIN_PASSCODE` is only needed to authorize
resource writes; `NEXT_PUBLIC_SITE_URL` sets the canonical origin for metadata
and the sitemap, falling back to `VERCEL_URL` then localhost.

## Known state

- `audits/os-audit-2026-08-07.md` — drift audit: what was fixed, what is open.
- `docs/superpowers/specs/` and `docs/superpowers/plans/` — the reframe design
  and its implementation plan.
- Dependencies are clean: `npm audit --omit=dev` reports 0 vulnerabilities on
  Next 16. The 21 high-severity advisories against 14.2.35 were the reason for
  the upgrade; do not downgrade.
- **Still open:** ESLint is unconfigured, and the two dead dictionary stores
  (Rule 0) await a content diff before deletion.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
