import type { Tool } from "@/app/lib/types";

interface ComparisonTableProps {
  tools: Tool[];
  columns: string[];
}

function ratingCell(value?: number) {
  if (value == null) return <span className="text-text/20">—</span>;
  return (
    <span className="text-gold">
      {"★".repeat(value)}
      <span className="text-text/15">{"★".repeat(5 - value)}</span>
    </span>
  );
}

export default function ComparisonTable({ tools, columns }: ComparisonTableProps) {
  if (tools.length === 0) return null;

  return (
    <div className="card overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <caption className="caption-bottom px-4 py-2 text-left text-[0.65rem] text-text/45">
          Ratings (1–5) are editorial judgement, not benchmark scores. Switch to card view for sources.
        </caption>
        <thead>
          <tr className="border-b border-line">
            <th className="sticky left-0 z-10 bg-navy-card px-4 py-3 text-left font-semibold text-text">
              Tool
            </th>
            {columns.map((c) => (
              <th
                key={c}
                className="px-4 py-3 text-center font-semibold text-text/80"
              >
                {c}
              </th>
            ))}
            <th className="px-4 py-3 text-left font-semibold text-text/80">
              Pricing
            </th>
          </tr>
        </thead>
        <tbody>
          {tools.map((tool) => (
            <tr
              key={tool.id}
              className="border-b border-line/60 transition-colors last:border-0 hover:bg-navy-panel/50"
            >
              <td className="sticky left-0 z-10 bg-navy-card px-4 py-3">
                <div className="font-semibold text-text">{tool.name}</div>
                <div className="text-xs text-text/45">{tool.creator}</div>
              </td>
              {columns.map((c) => (
                <td key={c} className="px-4 py-3 text-center">
                  {ratingCell(tool.ratings[c])}
                </td>
              ))}
              <td className="px-4 py-3 text-xs text-text/70">{tool.pricing}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
