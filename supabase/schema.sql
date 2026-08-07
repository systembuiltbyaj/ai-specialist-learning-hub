-- ─────────────────────────────────────────────────────────────
-- AI Specialist Learning Hub — Supabase schema
-- Run this in: Supabase Dashboard → SQL Editor → New query → Run
-- The app works WITHOUT this (it falls back to bundled seed data),
-- but run it when you want live, persisted data.
-- ─────────────────────────────────────────────────────────────

-- ── TERMS ──────────────────────────────────────────────
create table if not exists public.terms (
  id            text primary key,
  name          text not null,
  category      text not null check (category in ('Concepts','Tools','GHL-Specific','Automation')),
  definition    text not null,
  use_cases     text[] not null default '{}',
  explanation   text not null default '',
  related_terms text[] not null default '{}',
  examples      text[] not null default '{}',
  created_at    timestamptz not null default now()
);

-- ── TOOLS ──────────────────────────────────────────────
create table if not exists public.tools (
  id          text primary key,
  name        text not null,
  creator     text not null default '',
  category    text not null check (category in ('AI Models','Coding Agents','Agent Platforms','Automation Platforms')),
  tagline     text not null default '',
  strengths   text[] not null default '{}',
  weaknesses  text[] not null default '{}',
  use_cases   text[] not null default '{}',
  pricing     text not null default '',
  when_to_use text not null default '',
  ratings     jsonb not null default '{}',
  created_at  timestamptz not null default now()
);

-- ── RESOURCES ──────────────────────────────────────────
create table if not exists public.resources (
  id         text primary key,
  user_id    uuid references auth.users (id) on delete cascade,
  title      text not null,
  url        text not null,
  category   text not null default 'General',
  type       text not null default 'Article',
  notes      text not null default '',
  completed  boolean not null default false,
  saved_at   timestamptz not null default now()
);

-- ── UPDATES ────────────────────────────────────────────
create table if not exists public.updates (
  id         text primary key,
  week       text not null,
  title      text not null,
  category   text not null check (category in ('GHL','Claude','AI Automation')),
  content    text not null,
  created_at timestamptz not null default now()
);

-- ── Row Level Security ─────────────────────────────────
-- terms / tools / updates are public read-only reference content.
alter table public.terms     enable row level security;
alter table public.tools     enable row level security;
alter table public.updates   enable row level security;
alter table public.resources enable row level security;

drop policy if exists "public read terms"   on public.terms;
drop policy if exists "public read tools"    on public.tools;
drop policy if exists "public read updates"  on public.updates;

create policy "public read terms"   on public.terms   for select using (true);
create policy "public read tools"    on public.tools    for select using (true);
create policy "public read updates"  on public.updates  for select using (true);

-- Resources hold personal notes and saved links, so they are NOT public.
-- No policy is created for this table: with RLS enabled and zero policies,
-- the anon key can read nothing. All access goes through the admin-gated
-- /api/resources route, which uses the service-role key (service-role bypasses
-- RLS by design). Dropping the old public-read policy is what closes the leak.
drop policy if exists "own resources select" on public.resources;
drop policy if exists "own resources insert" on public.resources;
drop policy if exists "own resources update" on public.resources;
drop policy if exists "own resources delete" on public.resources;
drop policy if exists "public read resources" on public.resources;

-- ── Helpful indexes ────────────────────────────────────
create index if not exists terms_category_idx     on public.terms (category);
create index if not exists tools_category_idx     on public.tools (category);
create index if not exists updates_created_idx    on public.updates (created_at desc);
create index if not exists resources_user_idx     on public.resources (user_id);
