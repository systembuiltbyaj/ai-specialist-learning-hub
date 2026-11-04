import { pageItems } from "@/app/lib/pagination";

const edge =
  "inline-flex h-9 items-center gap-1.5 rounded-xl border border-violet-soft/30 bg-violet/[0.06] px-3.5 text-sm font-medium text-text transition-colors hover:border-violet-soft/70 disabled:pointer-events-none disabled:opacity-40";

export default function Pagination({
  page,
  pageCount,
  onChange,
  label,
}: {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
  label: string;
}) {
  if (pageCount <= 1) return null;

  return (
    <nav aria-label={label} className="flex items-center justify-center gap-3 pt-2">
      <button type="button" className={edge} disabled={page === 1} onClick={() => onChange(page - 1)}>
        <span aria-hidden>←</span> Previous
      </button>

      {/* Numbered pages need ~360px; on phones a plain position reads better. */}
      <span className="text-sm tabular-nums text-muted sm:hidden">
        {page} / {pageCount}
      </span>
      <ol className="hidden items-center gap-1.5 sm:flex">
        {pageItems(page, pageCount).map((item, index) =>
          item === "gap" ? (
            <li key={`gap-${index}`} aria-hidden className="px-1 text-muted">
              …
            </li>
          ) : (
            <li key={item}>
              <button
                type="button"
                onClick={() => onChange(item)}
                aria-current={item === page ? "page" : undefined}
                aria-label={`Page ${item}`}
                className={`h-9 min-w-[2.25rem] rounded-xl px-2 text-sm font-semibold tabular-nums transition-colors ${
                  item === page
                    ? "bg-violet text-onprimary shadow-glow"
                    : "border border-violet-soft/30 bg-violet/[0.06] text-text/85 hover:border-violet-soft/70"
                }`}
              >
                {item}
              </button>
            </li>
          ),
        )}
      </ol>

      <button type="button" className={edge} disabled={page === pageCount} onClick={() => onChange(page + 1)}>
        Next <span aria-hidden>→</span>
      </button>
    </nav>
  );
}
