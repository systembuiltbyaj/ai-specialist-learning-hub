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
      {/* ───────────── Hero — search is the main event ───────────── */}
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

          <p className="mt-4 animate-fade-up text-sm text-muted">
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
