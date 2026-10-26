// Theme-aware colours for inline styles (category chips, hub accents). Each
// value resolves per theme through the --c-* variables in app/globals.css, so a
// "blue" accent is deep enough to read on white and bright enough on midnight.
export const TOKEN = {
  gold: "rgb(var(--c-gold))",
  violet: "rgb(var(--c-violet-soft))",
  purple: "rgb(var(--c-violet-light))",
  pink: "rgb(var(--c-pink))",
  blue: "rgb(var(--c-blue))",
  orange: "rgb(var(--c-orange))",
  amber: "rgb(var(--c-yellow))",
  green: "rgb(var(--c-success))",
  red: "rgb(var(--c-danger))",
} as const;

// A translucent version of any colour (hex or token) for tinted fills and borders.
export function tint(color: string, percent: number): string {
  return `color-mix(in srgb, ${color} ${percent}%, transparent)`;
}
