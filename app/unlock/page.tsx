"use client";

import { useState } from "react";
import LockButton from "@/app/components/LockButton";

export default function UnlockPage() {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim() || loading) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });
      if (res.ok) {
        // Full reload so middleware re-evaluates with the new cookie.
        const params = new URLSearchParams(window.location.search);
        const from = params.get("from");
        window.location.href = from && from.startsWith("/") ? from : "/";
        return;
      }
      const data = await res.json().catch(() => ({}));
      setError(data?.error || "Incorrect passcode.");
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-bg px-4">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(124,58,237,0.25), transparent 70%)",
        }}
      />
      <form
        onSubmit={submit}
        className="relative w-full max-w-sm animate-fade-up rounded-2xl border border-line bg-surface/80 p-8 text-center shadow-glow backdrop-blur-sm"
      >
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl border border-line bg-bg text-3xl">
          🔒
        </div>
        <h1 className="font-display text-2xl font-extrabold uppercase tracking-tight text-gold">
          Private Workspace
        </h1>
        <p className="mx-auto mt-2 max-w-[17rem] text-xs leading-relaxed text-muted">
          Interview prep and client scripts are private to AJ. The rest of the
          hub is open —{" "}
          <a href="/" className="text-gold underline underline-offset-2">
            head back to the public site
          </a>
          .
        </p>

        <input
          type="password"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          placeholder="Enter passcode…"
          autoFocus
          className="input-hub mt-6 text-center"
          aria-label="Passcode"
        />

        {error && <p className="mt-2 text-xs text-neon-pink">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="btn-gold mt-4 w-full disabled:opacity-60"
        >
          {loading ? "Unlocking…" : "Unlock →"}
        </button>

        {/* Sign-out lives here rather than the global footer, which must stay
            cookie-free so public pages can render statically. */}
        <div className="mt-4 flex justify-center border-t border-line pt-4">
          <LockButton />
        </div>
      </form>
    </div>
  );
}
