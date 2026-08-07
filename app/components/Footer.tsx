import Link from "next/link";
import { BRAND, NAV_ITEMS } from "@/app/lib/constants";

// Deliberately synchronous and cookie-free. Reading the admin session here
// would opt every page in the app into dynamic rendering, which costs the whole
// public site its static generation. The sign-out control lives on /unlock.
export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface/60">
      <div className="container-hub flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-sm font-bold text-text">{BRAND.name}</p>
          <p className="mt-1 max-w-md font-mono text-xs text-muted">
            “{BRAND.statement}” — built &amp; maintained by {BRAND.owner} ·{" "}
            {BRAND.handle}
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-4 gap-y-2">
          {NAV_ITEMS.filter((n) => n.href !== "/").map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-xs text-muted transition-colors hover:text-neon-teal"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
