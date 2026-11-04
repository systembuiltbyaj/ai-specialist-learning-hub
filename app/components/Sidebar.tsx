"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BRAND, NAV_GROUPS } from "@/app/lib/constants";
import NavIcon from "@/app/components/NavIcons";
import SiteSearch from "@/app/components/SiteSearch";
import ThemeToggle from "@/app/components/ThemeToggle";

function BrandMark({ size }: { size: number }) {
  return (
    <span className="shrink-0 overflow-hidden rounded-xl" style={{ width: size, height: size }}>
      <Image src="/aj-mark.png" alt="" width={256} height={256} priority className="h-full w-full object-cover" />
    </span>
  );
}

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

  // `scope-dark` keeps the panel on the dark tokens in both themes, so the
  // search box and toggle inside it need no light variants.
  const NavBody = (
    <nav className="scope-dark sidebar-panel flex h-full flex-col overflow-hidden rounded-[1.4rem] text-text">
      <Link href="/" className="flex items-center gap-3 px-5 pb-4 pt-5">
        <BrandMark size={40} />
        <span className="font-display text-[0.95rem] font-extrabold leading-tight tracking-[-0.01em]">
          {BRAND.name}
          <span className="block text-[0.68rem] font-medium leading-snug text-muted">{BRAND.tagline}</span>
        </span>
      </Link>

      {/* Search follows the reader across every page. */}
      <div className="px-4 pb-3">
        <SiteSearch variant="compact" />
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-3 py-2">
        {NAV_GROUPS.map((group) => (
          <div key={group.title}>
            <p className="px-3 pb-1 text-[0.72rem] font-semibold text-muted">{group.title}</p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center gap-3 rounded-xl px-3 py-[0.45rem] text-sm transition-colors ${
                        active
                          ? "bg-gradient-to-r from-violet to-violet-soft/80 font-semibold text-onprimary shadow-glow"
                          : "text-text/75 hover:bg-violet/15 hover:text-text"
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

      {/* Owner card — who made this, plus the light/dark switch. */}
      <div className="m-3 flex items-center gap-3 rounded-2xl border border-violet-soft/20 bg-violet/10 px-3 py-2.5">
        <BrandMark size={34} />
        <p className="min-w-0 flex-1 text-xs leading-snug">
          <span className="block truncate font-semibold text-text">{BRAND.handle}</span>
          <span className="block truncate text-muted">{BRAND.owner}</span>
        </p>
        <ThemeToggle />
      </div>
    </nav>
  );

  return (
    <>
      {/* ── Mobile top bar ── */}
      <header className="scope-dark sidebar-panel sticky top-0 z-40 flex h-14 items-center justify-between rounded-none border-x-0 border-t-0 px-4 text-text lg:hidden">
        <Link href="/" className="flex items-center gap-2">
          <BrandMark size={34} />
          <span className="font-display text-base font-extrabold tracking-[-0.01em]">{BRAND.name}</span>
        </Link>
        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid h-9 w-9 place-items-center rounded-lg border border-violet-soft/30"
        >
          {open ? "✕" : "☰"}
        </button>
      </header>

      {/* ── Mobile drawer ── */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-2 left-2 w-72">{NavBody}</aside>
        </div>
      )}

      {/* ── Desktop floating sidebar ── */}
      <aside className="fixed inset-y-3 left-3 z-30 hidden w-64 lg:block">{NavBody}</aside>
    </>
  );
}
