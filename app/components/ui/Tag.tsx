import { TOKEN, tint } from "@/app/lib/color";

// The small pill on reference cards. Content is always a real field value
// (category, level, status) — never a decorative label.
export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-violet-soft/30 bg-violet/[0.08] px-2.5 py-0.5 text-[0.7rem] font-medium text-text/85">
      {children}
    </span>
  );
}

// Deprecated is a warning, so it takes the danger colour; emerging is news, so
// it takes the highlight. Current terms carry no status tag at all.
export function StatusTag({ status }: { status?: "current" | "emerging" | "deprecated" }) {
  if (!status || status === "current") return null;
  const color = status === "deprecated" ? TOKEN.red : TOKEN.gold;
  return (
    <span
      className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-[0.7rem] font-semibold"
      style={{ color, borderColor: tint(color, 45), backgroundColor: tint(color, 10) }}
    >
      {status === "deprecated" ? "Deprecated" : "Emerging"}
    </span>
  );
}
