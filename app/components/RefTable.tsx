import type { RefTable as RefTableType } from "@/app/lib/types";

// Renders a comparison table. Cells beginning with ✓ / ✗ / ~ are colored.
function Cell({ value, isFirst }: { value: string; isFirst: boolean }) {
  let cls = "text-text/75";
  if (value.startsWith("✓")) cls = "text-neon-teal";
  else if (value.startsWith("✗")) cls = "text-neon-pink";
  else if (value.startsWith("~")) cls = "text-neon-yellow";

  if (isFirst) {
    return (
      <td className="whitespace-nowrap px-4 py-3 font-display font-bold text-text">
        {value}
      </td>
    );
  }
  return <td className={`px-4 py-3 align-top ${cls}`}>{value}</td>;
}

export default function RefTable({ table }: { table: RefTableType }) {
  return (
    <div className="card overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-[0.78rem]">
        <thead>
          <tr className="border-b border-line bg-surface-2">
            {table.columns.map((c, i) => (
              <th
                key={c}
                className={`px-4 py-3 font-mono text-[0.62rem] uppercase tracking-[0.15em] text-muted ${
                  i === 0 ? "text-left" : "text-left"
                }`}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, ri) => (
            <tr
              key={ri}
              className="border-b border-line/60 transition-colors last:border-0 hover:bg-white/[0.02]"
            >
              {row.map((cell, ci) => (
                <Cell key={ci} value={cell} isFirst={ci === 0} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
