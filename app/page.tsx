import Link from "next/link";
import { BRAND, NAV_ITEMS } from "@/app/lib/constants";
import Dashboard from "@/app/components/Dashboard";
import NavIcon from "@/app/components/NavIcons";
import SiteSearch from "@/app/components/SiteSearch";
import WelcomeVideo from "@/app/components/WelcomeVideo";
import TermOfTheDay from "@/app/components/TermOfTheDay";
import { getTools } from "@/app/lib/data";
import { DICTIONARY } from "@/data/dictionary";
import { ACRONYMS } from "@/data/acronyms";

export default async function HomePage() {
  const tools = await getTools();

  // Every value is derived from the data. Nothing here is a number written by
  // hand, so no tile can quietly go stale.
  const stats = [
    { label: "Terms", value: DICTIONARY.length, icon: "📘", hint: "AI · agents · automation · GHL · web" },
    { label: "Acronyms", value: ACRONYMS.length, icon: "🔤", hint: "Decoded in plain English" },
    { label: "Tools", value: tools.length, icon: "⚖️", hint: "Models, agents & platforms" },
    { label: "Modules", value: NAV_ITEMS.length - 1, icon: "🧭", hint: "Guides & references" },
  ];

  const modules = NAV_ITEMS.filter((n) => n.href !== "/");

  return (
    <div className="container-hub space-y-16 py-8">
      {/* ───────────── Welcome ─────────────
          Two panels: the mascot on the left, the greeting and search on the
          right. Search sits where a login form would — it is the one thing a
          visitor came here to do, so it stays above the fold rather than being
          pushed under a hero. */}
      <section className="animate-fade-up overflow-hidden rounded-2xl border border-line bg-surface/50 p-3 shadow-glow sm:p-4">
        <div className="grid gap-3 sm:gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
          <WelcomeVideo />

          <div className="flex flex-col justify-center px-3 py-6 sm:px-8 sm:py-10">
            <p className="eyebrow">{BRAND.handle}</p>
            <h1 className="mt-3 text-balance font-display text-2xl font-extrabold leading-[1.15] tracking-[-0.03em] text-text sm:text-[2rem]">
              Hello! — Welcome to the{" "}
              <span className="text-gold">AJ Learning Hub</span>
            </h1>
            <div className="mt-3 max-w-md space-y-2.5 text-[0.9375rem] leading-relaxed text-muted">
              <p>
                If you&apos;re just stepping into AI, half of it sounds like another
                language — <span className="text-text/80">RAG</span>,{" "}
                <span className="text-text/80">MCP</span>,{" "}
                <span className="text-text/80">tokens</span>,{" "}
                <span className="text-text/80">A2P 10DLC</span>. Nobody tells you
                what any of it means; they just keep using the words.
              </p>
              <p>
                I kept hitting terms I didn&apos;t know, so I started writing them
                down in plain English. That&apos;s all this is — the vocabulary,
                the tools, and the parts under the surface, explained the way I
                wish someone had explained them to me.
              </p>
            </div>

            <div className="mt-6">
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

            <p className="mt-6 border-t border-line pt-4 font-mono text-[0.68rem] text-muted">
              Free · no sign-up · nothing to install
            </p>
          </div>
        </div>
      </section>

      {/* ───────────── Term of the Day ───────────── */}
      <section>
        <div className="mb-5">
          <p className="eyebrow">Learn something today</p>
          <h2 className="section-title">Term of the Day</h2>
        </div>
        <TermOfTheDay />
      </section>

      {/* ───────────── Stats ───────────── */}
      <section>
        <div className="mb-5">
          <p className="eyebrow">What&apos;s inside</p>
          <h2 className="section-title">The Reference</h2>
        </div>
        <Dashboard stats={stats} />
      </section>

      {/* ───────────── Module navigation ───────────── */}
      <section>
        <div className="mb-5">
          <p className="eyebrow">Jump in</p>
          <h2 className="section-title">Explore the Modules</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className="card card-hover accent-bar accent-purple group flex items-start gap-4 p-5"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg border border-line bg-surface-2 transition-transform duration-200 group-hover:scale-110">
                <NavIcon href={m.href} className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-bold text-white group-hover:text-gold">{m.label}</h3>
                <p className="mt-1 text-sm text-muted">{m.description}</p>
              </div>
              <span className="ml-auto text-muted transition-transform group-hover:translate-x-1 group-hover:text-gold">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ───────────── CTA ───────────── */}
      <section className="relative overflow-hidden rounded-2xl border border-violet-soft/30 bg-gradient-to-br from-violet/25 via-surface to-surface px-6 py-12 text-center shadow-glow">
        <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight text-white sm:text-3xl">
          Everything here is free to use.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          No sign-up, no paywall. Search it, link to it, share it with someone
          who&apos;s learning.
        </p>
        <Link href="/dictionary" className="btn-gold mt-6 inline-flex">
          Start exploring →
        </Link>
      </section>
    </div>
  );
}
