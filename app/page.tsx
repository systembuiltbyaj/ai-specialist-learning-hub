import Link from "next/link";
import { BRAND, NAV_ITEMS } from "@/app/lib/constants";
import NavIcon from "@/app/components/NavIcons";
import SiteSearch from "@/app/components/SiteSearch";
import WelcomeVideo from "@/app/components/WelcomeVideo";
import TermOfTheDay from "@/app/components/TermOfTheDay";
import HomeLearning from "@/app/components/HomeLearning";
import { getTools } from "@/app/lib/data";
import { DICTIONARY } from "@/data/dictionary";
import { ACRONYMS } from "@/data/acronyms";
import { LESSON_ORDER, PATHS_BY_ID, lessonHref } from "@/data/paths";
import { PROJECTS } from "@/data/projects";

// Small eyebrow with a dot, then an uppercase two-tone heading.
function SectionHeading({ kicker, title, accent }: { kicker: string; title: string; accent: string }) {
  return (
    <div className="mb-4">
      <p className="flex items-center gap-2 text-sm text-muted">
        <span aria-hidden className="h-2 w-2 rounded-full bg-violet-soft shadow-[0_0_10px_rgb(var(--c-violet-soft))]" />
        {kicker}
      </p>
      <h2 className="mt-1 font-display text-[1.75rem] font-extrabold uppercase leading-none tracking-[-0.01em] text-text sm:text-[2.1rem]">
        {title} <span className="title-accent">{accent}</span>
      </h2>
    </div>
  );
}

export default async function HomePage() {
  const tools = await getTools();

  // Every value is derived from the data. Nothing here is a number written by
  // hand, so no tile can quietly go stale.
  const stats = [
    { label: "Terms", value: DICTIONARY.length, href: "/dictionary", hint: "AI · agents · automation · GHL · web" },
    { label: "Lessons", value: LESSON_ORDER.length, href: "/learn", hint: "Beginner → advanced paths" },
    { label: "Projects", value: PROJECTS.length, href: "/projects", hint: "Hands-on builds, step by step" },
    { label: "Acronyms", value: ACRONYMS.length, href: "/acronyms", hint: "Decoded in plain English" },
    { label: "Tools", value: tools.length, href: "/tools", hint: "Models, agents & platforms" },
  ];

  const lessons = LESSON_ORDER.map(({ pathId, lesson }) => ({
    id: lesson.id,
    title: lesson.title,
    href: lessonHref(pathId, lesson.id),
    pathTitle: PATHS_BY_ID[pathId].title,
    minutes: lesson.minutes,
  }));
  const deck = DICTIONARY.filter((t) => t.status !== "deprecated").map((t) => t.id);
  const modules = NAV_ITEMS.filter((n) => n.href !== "/");

  return (
    <div className="container-hub space-y-12 py-8">
      {/* ───────────── Welcome: greeting and search on the left, the mascot on the right ───────────── */}
      <section className="card card-glow p-6 sm:p-9">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)]">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-soft/35 bg-violet/15 px-3 py-1 text-xs font-semibold text-text/90">
              <span aria-hidden className="text-violet-light">✦</span>
              {BRAND.handle}
            </span>
            <h1 className="mt-4 max-w-xl text-balance font-display text-[2rem] font-extrabold leading-[1.1] tracking-[-0.03em] text-text sm:text-[2.6rem]">
              Hello! — Welcome to the <span className="title-accent">{BRAND.name}</span>
            </h1>
            <p className="mt-3 max-w-lg text-[0.9375rem] leading-relaxed text-text/80">
              If you&apos;re just stepping into AI, half of it sounds like another language — RAG, MCP, tokens, A2P
              10DLC. Nobody tells you what any of it means; they just keep using the words. This is all of it, in plain
              English.
            </p>

            <div className="mt-6 max-w-lg">
              <SiteSearch variant="hero" />
            </div>

            <p className="mt-4 text-sm text-muted">
              or browse{" "}
              <Link href="/dictionary" className="text-gold hover:underline">
                the dictionary
              </Link>
              ,{" "}
              <Link href="/acronyms" className="text-gold hover:underline">
                acronyms
              </Link>
              , or{" "}
              <Link href="/tools" className="text-gold hover:underline">
                tools
              </Link>
            </p>
            <p className="mt-2 text-xs text-muted">Free · no sign-up · nothing to install</p>
          </div>

          <WelcomeVideo className="mx-auto hidden aspect-square w-full max-w-[25rem] rounded-full [mask-image:radial-gradient(closest-side,black_80%,transparent)] lg:-my-4 lg:block" />
        </div>
      </section>

      {/* ───────────── Your learning ───────────── */}
      <section>
        <SectionHeading kicker="Pick up where you left off" title="Your" accent="Learning" />
        <HomeLearning lessons={lessons} deck={deck} />
      </section>

      {/* ───────────── Term of the Day ───────────── */}
      <section>
        <SectionHeading kicker="Learn something today" title="Term of" accent="the Day" />
        <TermOfTheDay />
      </section>

      {/* ───────────── What's inside ───────────── */}
      <section>
        <SectionHeading kicker="What's inside" title="The" accent="Reference" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((s, i) => (
            <Link
              key={s.label}
              href={s.href}
              className={`card card-hover flex flex-col gap-1 p-5 ${i === 0 ? "card-active bg-gradient-to-br from-violet-soft/60 to-violet/40" : ""}`}
            >
              <NavIcon href={s.href} className="mb-2 h-7 w-7 text-violet-light" />
              <span className="text-[2rem] font-extrabold leading-none tracking-[-0.03em] text-text">{s.value}</span>
              <span className="font-semibold text-text">{s.label}</span>
              <span className="text-xs leading-snug text-muted">{s.hint}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ───────────── Every module ───────────── */}
      <section>
        <SectionHeading kicker="Jump in" title="Explore" accent="the Modules" />
        <div className="card grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className="group flex items-center gap-3 rounded-xl border border-violet-soft/15 bg-violet/[0.06] p-3 transition-colors hover:border-violet-soft/50 hover:bg-violet/15"
            >
              <span className="icon-tile-muted h-11 w-11 transition-colors group-hover:text-text">
                <NavIcon href={m.href} className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold text-text">{m.label}</span>
                <span className="block truncate text-xs text-muted">{m.description}</span>
              </span>
              <span aria-hidden className="text-text/60 transition-transform group-hover:translate-x-0.5 group-hover:text-text">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ───────────── CTA ───────────── */}
      <section className="card card-glow px-6 py-10 text-center">
        <h2 className="font-display text-2xl font-extrabold tracking-[-0.025em] text-text sm:text-3xl">
          Everything here is free to use.
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-muted">
          No sign-up, no paywall. Search it, link to it, share it with someone who&apos;s learning.
        </p>
        <Link href="/dictionary" className="btn-violet mt-6 inline-flex">
          Start exploring →
        </Link>
      </section>
    </div>
  );
}
