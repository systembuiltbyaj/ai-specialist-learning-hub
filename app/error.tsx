"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container-hub max-w-xl py-24 text-center">
      <p className="eyebrow">Something broke</p>
      <h1 className="section-title mt-2">This page failed to load.</h1>
      <p className="mt-3 text-muted">
        That&apos;s on us, not you. Try again — and if it keeps happening, head
        back to the reference.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button onClick={reset} className="btn-gold">
          Try again
        </button>
        <Link href="/" className="btn-ghost">
          Go home
        </Link>
      </div>
    </div>
  );
}
