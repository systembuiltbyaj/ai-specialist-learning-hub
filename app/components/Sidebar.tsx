"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BRAND, NAV_GROUPS } from "@/app/lib/constants";
import NavIcon from "@/app/components/NavIcons";
import SiteSearch from "@/app/components/SiteSearch";
import ThemeToggle from "@/app/components/ThemeToggle";

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
        className="flex items-center gap-3 px-5 pb-4 pt-5"
      >
        <span className="h-10 w-10 shrink-0 overflow-hidden rounded-xl shadow-glow">
          <Image
            src="/systemlab-mark.png"
            alt=""
            width={256}
            height={256}
            priority
            className="h-full w-full object-cover"
          />
        </span>
        <span className="font-display text-[0.95rem] font-extrabold leading-tight tracking-[-0.01em] text-text">
          {BRAND.name}
          <span className="block text-[0.7rem] font-medium leading-snug text-muted">{BRAND.tagline}</span>
        </span>
      </Link>

      {/* Search follows the reader across every page. */}
      <div className="px-4 pb-3">
        <SiteSearch variant="compact" />
      </div>

      {/* Groups */}
      <div className="flex-1 space-y-5 overflow-y-auto px-3 py-3">
        {NAV_GROUPS.map((group) => (
          <div key={group.title}>
            <p className="px-3 pb-1.5 text-xs font-semibold text-muted">
              {group.title}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors ${
                        active
                          ? "bg-violet/10 font-semibold text-violet-light"
                          : "text-text/70 hover:bg-violet-soft/[0.07] hover:text-text"
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
      <div className="flex items-center justify-between gap-3 border-t border-line/70 px-5 py-4">
        <p className="text-xs leading-relaxed text-muted">
          {BRAND.handle}
          <br />
          <span className="text-text/50">{BRAND.owner}</span>
        </p>
        <ThemeToggle />
      </div>
    </nav>
  );

  return (
    <>
      {/* ── Mobile top bar ── */}
      <header className="glass-pane sticky top-0 z-40 flex h-14 items-center justify-between rounded-none border-x-0 border-t-0 px-4 lg:hidden">
        <Link href="/" className="flex items-center gap-2">
          <span className="h-9 w-9 shrink-0 overflow-hidden rounded-lg">
            <Image
              src="/systemlab-mark.png"
              alt=""
              width={256}
              height={256}
              className="h-full w-full object-cover"
            />
          </span>
          <span className="font-display text-base font-extrabold tracking-[-0.01em] text-text">{BRAND.name}</span>
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
            className="absolute inset-0 bg-text/30 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <aside className="glass-pane absolute inset-y-2 left-2 w-72 rounded-3xl">
            {NavBody}
          </aside>
        </div>
      )}

      {/* ── Desktop fixed sidebar ── */}
      <aside className="glass-pane fixed inset-y-3 left-3 z-30 hidden w-64 overflow-hidden rounded-3xl lg:block">
        {NavBody}
      </aside>
    </>
  );
}
