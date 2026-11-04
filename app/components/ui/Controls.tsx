import Glyph, { type GlyphName } from "./Glyph";

// A labelled native <select>: keyboard and screen-reader support for free, and
// the root `color-scheme` themes its option list in both modes.
export function SelectField<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <label className="inline-flex h-10 items-center gap-2 rounded-xl border border-violet-soft/30 bg-violet/[0.06] pl-3 pr-2 text-sm transition-colors focus-within:border-violet-soft focus-within:ring-2 focus-within:ring-violet-soft/25">
      <span className="text-muted">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
        className="cursor-pointer bg-transparent pr-1 font-medium text-text outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-surface text-text">
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function ViewToggle<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (value: T) => void;
  // `showLabel` prints the text; otherwise it is the button's accessible name only.
  options: { value: T; label: string; glyph: GlyphName; showLabel?: boolean }[];
}) {
  return (
    <div role="group" aria-label={label} className="flex rounded-xl border border-violet-soft/30 bg-violet/[0.06] p-1">
      {options.map((option) => {
        const on = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={on}
            aria-label={option.showLabel ? undefined : option.label}
            title={option.label}
            className={`inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold transition-colors ${
              on ? "bg-violet text-onprimary shadow-glow" : "text-muted hover:text-text"
            }`}
          >
            <Glyph name={option.glyph} className="h-4 w-4" />
            {option.showLabel && option.label}
          </button>
        );
      })}
    </div>
  );
}
