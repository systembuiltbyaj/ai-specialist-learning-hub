"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BRAND, NAV_GROUPS } from "@/app/lib/constants";
import NavIcon from "@/app/components/NavIcons";
import SiteSearch from "@/app/components/SiteSearch";

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile drawer on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // The unlock screen is a standalone full-page gate — no sidebar.
  if (pathname === "/unlock") return null;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const NavBody = (
    <nav className="flex h-full flex-col">
      {/* Brand */}
      <Link
        href="/"
        className="flex items-center gap-3 border-b border-line px-5 py-5"
      >
        <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-lg bg-black ring-1 ring-line">
          <Image
            src="/logo.png"
            alt="AJ Learning Hub logo"
            width={256}
            height={256}
            priority
            className="h-full w-full object-cover"
          />
        </span>
        <span className="font-display text-base font-bold uppercase leading-tight tracking-wide text-text">
          AJ
          <br />
          <span className="text-gold">Learning Hub</span>
        </span>
      </Link>

      {/* Search follows the reader across every page. */}
      <div className="border-b border-line px-4 py-3">
        <SiteSearch variant="compact" />
      </div>

      {/* Groups */}
      <div className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
        {NAV_GROUPS.map((group) => (
          <div key={group.title}>
            <p className="px-3 pb-2 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-muted">
              {group.title}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 border-l-2 px-3 py-2 text-sm transition-colors ${
                        active
                          ? "border-gold text-gold"
                          : "border-transparent text-muted hover:border-line hover:text-text"
                      }`}
                    >
                      <NavIcon href={item.href} className="h-[1.05rem] w-[1.05rem] shrink-0" />
                      <span className="flex-1">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer tag */}
      <div className="border-t border-line px-5 py-4">
        <p className="font-mono text-[0.6rem] leading-relaxed text-muted">
          {BRAND.handle}
          <br />
          <span className="text-text/50">{BRAND.owner}</span>
        </p>
      </div>
    </nav>
  );

  return (
    <>
      {/* ── Mobile top bar ── */}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-line bg-bg/90 px-4 backdrop-blur-md lg:hidden">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-md bg-black ring-1 ring-line">
            <Image
              src="/logo.png"
              alt="AJ Learning Hub logo"
              width={256}
              height={256}
              className="h-full w-full object-cover"
            />
          </span>
          <span className="font-display text-base font-bold uppercase tracking-wide text-text">
            AJ Learning <span className="text-gold">Hub</span>
          </span>
        </Link>
        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid h-9 w-9 place-items-center rounded-lg border border-line text-text"
        >
          {open ? "✕" : "☰"}
        </button>
      </header>

      {/* ── Mobile drawer ── */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-72 border-r border-line bg-surface">
            {NavBody}
          </aside>
        </div>
      )}

      {/* ── Desktop fixed sidebar ── */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-line bg-surface lg:block">
        {NavBody}
      </aside>
    </>
  );
}
