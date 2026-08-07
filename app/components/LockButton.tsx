"use client";

import { useState } from "react";

export default function LockButton() {
  const [loading, setLoading] = useState(false);

  const lock = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await fetch("/api/logout", { method: "POST" });
    } catch {
      /* ignore */
    }
    // Back to the public home page — the site itself is not gated.
    window.location.href = "/";
  };

  return (
    <button
      onClick={lock}
      className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-4 py-2 font-mono text-xs text-muted transition-colors hover:border-neon-pink/50 hover:text-neon-pink"
    >
      🔒 {loading ? "Locking…" : "Lock & Sign Out"}
    </button>
  );
}
