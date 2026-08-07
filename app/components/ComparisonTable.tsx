import type { Tool } from "@/app/lib/types";

interface ComparisonTableProps {
  tools: Tool[];
  columns: string[];
}

function ratingCell(value?: number) {
  if (value == null) return <span className="text-white/20">—</span>;
  return (
    <span className="text-gold">
      {"★".repeat(value)}
      <span className="text-white/15">{"★".repeat(5 - value)}</span>
    </span>
  );
}

export default function ComparisonTable({ tools, columns }: ComparisonTableProps) {
  if (tools.length === 0) return null;

  return (
    <div className="card overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-navy-border">
            <th className="sticky left-0 z-10 bg-navy-card px-4 py-3 text-left font-semibold text-white">
              Tool
            </th>
            {columns.map((c) => (
              <th
                key={c}
                className="px-4 py-3 text-center font-semibold text-white/80"
              >
                {c}
              </th>
            ))}
            <th className="px-4 py-3 text-left font-semibold text-white/80">
              Pricing
            </th>
          </tr>
        </thead>
        <tbody>
          {tools.map((tool) => (
            <tr
              key={tool.id}
              className="border-b border-navy-border/60 transition-colors last:border-0 hover:bg-navy-panel/50"
            >
              <td className="sticky left-0 z-10 bg-navy-card px-4 py-3">
                <div className="font-semibold text-white">{tool.name}</div>
                <div className="text-xs text-white/45">{tool.creator}</div>
              </td>
              {columns.map((c) => (
                <td key={c} className="px-4 py-3 text-center">
                  {ratingCell(tool.ratings[c])}
                </td>
              ))}
              <td className="px-4 py-3 text-xs text-white/70">{tool.pricing}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
