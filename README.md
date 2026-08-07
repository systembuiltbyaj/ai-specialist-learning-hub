# 🔷 AI Specialist Learning Hub

> *"I Don't Chase Growth. I Engineer The System Behind It."*

A public, searchable reference for AI, automation, and the tools that power them
— built with **Next.js 16**, **React 18**, **Tailwind CSS**, and **TypeScript**,
deployed on **Vercel**.

Every entry has its own URL. Everything is statically rendered. No database, no
environment variables, no setup — `npm install && npm run dev` and it works.

---

## ✨ What's in it

### Learning Hub
| Module | Route | What it does |
|--------|-------|--------------|
| **Tech Dictionary** | `/dictionary` | AI / automation / GHL terms with real-time search, category + level filters, and a page per term |
| **Tools Comparison** | `/tools` | AI models, coding agents, agent platforms, and automation platforms as a matrix or detailed cards |
| **Resources** | `/resources` | Bookmark docs, videos, and courses; track completion and weekly goals |
| **Claude Hub** | `/claude-hub` | Skills inventory, MCP tracker, build framework, copyable snippets |
| **GHL Hub** | `/ghl-hub` | Build-and-learn tracks for GoHighLevel |
| **AI Automation Hub** | `/automation-hub` | Zapier · Make · n8n recipes and comparisons |
| **Updates** | `/updates` | Archive of GHL / Claude / AI-automation news, grouped by week |

### Workspace
| Module | Route | What it does |
|--------|-------|--------------|
| **Quiz Mode** | `/quiz` | Auto-generated exams built from the dictionary |
| **Interview** | `/interview` | Interview questions & answers, plus a client discovery playbook |
| **Presentation** | `/presentation` | Client pitch and self-pitch scripts |
| **Tasks** | `/tasks` | Weekly task planner (saved to your browser) |

### Reference
| Module | Route | What it does |
|--------|-------|--------------|
| **Acronym Decoder** | `/acronyms` | Every AI acronym in plain English, with a page per acronym |
| **Dev Tools Universe** | `/dev-tools` | Editors, LLMs, domains, and stack picks |
| **Web Dev Guide** | `/web-guide` | HTML → AI stacks, from zero |

**Design:** near-black (`#08060e`) with brand gold (`#f6cb1f`) and violet
(`#5e17eb`). `tailwind.config.ts` is the single source of truth for colour.

---

## 🔍 Search and deep links

Two things make this a reference rather than a browsable site:

- **Every term and acronym has its own page** — `/dictionary/rag`,
  `/acronyms/gpu` — prerendered at build time, each with its own title,
  description, and OpenGraph card. Related terms link to each other.
- **Site-wide search** from the sidebar and the home page, spanning terms,
  acronyms, and tools. The index is a static asset built at compile time and
  fetched only when someone actually searches.

Acronyms the dictionary already covers (`RAG`, `LLM`, `MCP`, `CoT`…) redirect
into the dictionary entry rather than duplicating it.

---

## 🚀 Quick start

```bash
npm install
npm run dev     # http://localhost:3000
npm test        # unit tests
npm run build   # production build (also the real typecheck)
```

No configuration required. Every page works out of the box.

---

## 🗄️ Supabase (optional)

Only the **Resources** list uses a database; everything else is bundled. Without
Supabase, resources save to your browser.

1. Create a project at [supabase.com](https://supabase.com).
2. Run [`supabase/schema.sql`](supabase/schema.sql) in **SQL Editor → New query**.
3. Add to `.env.local` (see [`.env.example`](.env.example)):

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ADMIN_PASSCODE=your-passcode
   ```

> 🔐 `.env.local` is gitignored and must never be committed. The service-role key
> is server-only — never prefix it with `NEXT_PUBLIC_`. The `resources` table has
> RLS enabled with **no policies**, so the anon key cannot read it; all access
> goes through the admin-gated `/api/resources`.
>
> `ADMIN_PASSCODE` authorizes those writes via `/unlock`. It gates **no pages** —
> the whole site is public. Leave it unset and writes are simply rejected.

---

## ▲ Deploy

1. Push to GitHub.
2. Vercel → **Add New → Project** → import the repo.
3. Set `NEXT_PUBLIC_SITE_URL` to your real domain (drives canonical URLs and the
   sitemap). Add the Supabase vars and `ADMIN_PASSCODE` only if you want the
   resources list persisted.
4. **Deploy.** Next.js is auto-detected; [`vercel.json`](vercel.json) is included.

---

## 🧱 Project structure

```
app/
├── page.tsx                  # Home — search, Term of the Day, stats, modules
├── layout.tsx                # Root layout (sidebar + footer + fonts + metadata)
├── icon.png                  # Favicon
├── globals.css               # Tailwind + brand theme
├── sitemap.ts  robots.ts     # Generated from the data
├── not-found.tsx  error.tsx  # Branded 404 and error boundary
│
├── dictionary/               # List + [slug] term pages
├── acronyms/                 # List + [slug] acronym pages
├── tools/  resources/  updates/
├── claude-hub/  ghl-hub/  automation-hub/
├── quiz/  interview/  presentation/  tasks/
├── dev-tools/  web-guide/
├── unlock/                   # Admin sign-in (not linked in nav)
│
├── search-index.json/        # Static search index, built at compile time
├── api/
│   ├── unlock/  logout/      # Admin session
│   └── resources/            # Admin-only writes (service-role key)
│
├── components/               # Sidebar, Footer, SiteSearch, cards, tables
└── lib/
    ├── reference.ts          # Slugs + acronym/dictionary overlap (tested)
    ├── search.ts             # Ranking (tested)
    ├── siteUrl.ts            # Canonical origin resolution
    ├── access.ts             # Passcode hashing helpers
    ├── adminSession.ts       # isAdmin() for server code
    ├── rateLimit.ts          # Auth endpoint limiter
    ├── data.ts               # Supabase → seed fallback
    ├── constants.ts          # Brand + nav
    ├── types.ts              # Shared domain types
    └── seed/                 # Bundled content per module

data/                         # ⚠️ Dictionary and acronyms live HERE
├── dictionary.ts             #    — not in app/lib/seed/
└── acronyms.ts

tests/                        # Vitest
supabase/schema.sql           # Tables + RLS
audits/                       # Drift + freshness audits
docs/                         # Specs, plans, exports
CLAUDE.md                     # Operating manual — read before editing
```

> **The one thing that trips people up:** the dictionary and acronyms live in
> **`data/`** at the repo root, not `app/lib/seed/`. See [`CLAUDE.md`](CLAUDE.md)
> for the full routing map and precedence rules.

---

## 🛠️ Tech stack

- **Next.js 16** (App Router, server components, Turbopack)
- **React 18** + **TypeScript** (strict)
- **Tailwind CSS 3** with a custom brand theme
- **Vitest** for unit tests
- **Supabase** (`@supabase/supabase-js`) — optional, resources only

`npm audit --omit=dev` reports **0 vulnerabilities**.

---

## 🧩 Customizing

- **Dictionary / acronyms:** edit `data/`
- **Everything else:** edit the matching file in `app/lib/seed/`
- **Colours:** `tailwind.config.ts` first, then mirror any raw hex in `app/lib/constants.ts`
- **Nav / brand statement:** `app/lib/constants.ts`

Adding a dictionary term automatically creates its page, adds it to the sitemap,
and puts it in search. Nothing else to update.

---

Built &amp; maintained by **Allen Bactad** · *System-BuiltBy AJ*.
