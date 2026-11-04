import NavIcon from "@/app/components/NavIcons";

export interface StripStat {
  label: string;
  value: string | number;
  // A route whose sidebar icon labels the figure.
  icon?: string;
}

// One card split into segments: icon, big number, label. Values are passed in
// from data by the caller, never typed by hand, so they can't go stale.
export default function StatStrip({ stats }: { stats: StripStat[] }) {
  const cols = { 1: "sm:grid-cols-1", 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "sm:grid-cols-4" }[
    Math.min(stats.length, 4) as 1 | 2 | 3 | 4
  ];
  return (
    // One or two figures sit as a compact strip rather than stretching edge to edge.
    <div className={`stat-strip grid-cols-2 ${cols} ${stats.length < 3 ? "sm:w-fit" : ""}`}>
      {stats.map((stat) => (
        <div key={stat.label} className="flex items-center gap-3.5 px-5 py-4">
          {stat.icon && (
            <span className="icon-tile-muted h-11 w-11">
              <NavIcon href={stat.icon} className="h-5 w-5" />
            </span>
          )}
          <span className="min-w-0">
            <span className="block text-2xl font-extrabold leading-none tracking-[-0.03em] text-text">{stat.value}</span>
            <span className="mt-1 block text-sm leading-tight text-muted">{stat.label}</span>
          </span>
        </div>
      ))}
    </div>
  );
}
