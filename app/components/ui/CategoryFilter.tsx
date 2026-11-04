import Glyph, { type GlyphName } from "./Glyph";

export interface CategoryItem {
  key: string;
  label: string;
  count: number;
  glyph: GlyphName;
}

// The pill row above the results. Visible at every width; below xl it is the
// only category control.
export function CategoryPills({
  items,
  active,
  onSelect,
  label,
}: {
  items: CategoryItem[];
  active: string;
  onSelect: (key: string) => void;
  label: string;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {items.map((item) => {
        const on = item.key === active;
        return (
          <button
            key={item.key}
            type="button"
            onClick={() => onSelect(item.key)}
            aria-pressed={on}
            className={`chip px-4 py-2 text-[0.8125rem] ${on ? "chip-active" : "hover:border-violet-soft/70 hover:text-text"}`}
          >
            {item.label}
            <span className={`ml-1.5 tabular-nums ${on ? "opacity-90" : "text-muted"}`}>({item.count})</span>
          </button>
        );
      })}
    </div>
  );
}

// The "Categories" side panel with an icon and count per row. Only shown from
// xl up — narrower than that, the results column would be too thin for cards.
export function CategoryPanel({
  items,
  active,
  onSelect,
  label,
}: {
  items: CategoryItem[];
  active: string;
  onSelect: (key: string) => void;
  label: string;
}) {
  return (
    <nav aria-label={label} className="card p-3">
      <p className="flex items-center gap-2 px-2 pb-2 pt-1 text-sm font-bold text-text">
        <Glyph name="grid" className="h-4 w-4 text-violet-light" />
        Categories
      </p>
      <ul className="space-y-0.5">
        {items.map((item) => {
          const on = item.key === active;
          return (
            <li key={item.key}>
              <button
                type="button"
                onClick={() => onSelect(item.key)}
                aria-pressed={on}
                className={`flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left text-sm leading-snug transition-colors ${
                  on
                    ? "bg-violet/20 text-text ring-1 ring-inset ring-violet-soft/50"
                    : "text-text/80 hover:bg-violet/10 hover:text-text"
                }`}
              >
                <Glyph name={item.glyph} className="h-[1.125rem] w-[1.125rem] shrink-0 text-violet-light" />
                <span className="flex-1">{item.label}</span>
                <span className="text-xs tabular-nums text-muted">{item.count}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
