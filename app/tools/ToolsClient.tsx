"use client";

import { useMemo, useState } from "react";
import type { Tool, ToolCategory } from "@/app/lib/types";
import { TOOL_CATEGORIES } from "@/app/lib/constants";
import { MATRIX_COLUMNS } from "@/app/lib/seed/tools";
import ToolCard from "@/app/components/ToolCard";
import ComparisonTable from "@/app/components/ComparisonTable";

type View = "matrix" | "cards";

export default function ToolsClient({ tools }: { tools: Tool[] }) {
  const [category, setCategory] = useState<ToolCategory>("AI Models");
  const [view, setView] = useState<View>("matrix");

  const visible = useMemo(
    () => tools.filter((t) => t.category === category),
    [tools, category],
  );
  const columns = MATRIX_COLUMNS[category] ?? [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {TOOL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`chip ${category === cat ? "chip-active" : "hover:border-gold/60"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* View toggle */}
        <div className="flex shrink-0 rounded-lg border border-navy-border p-1">
          {(["matrix", "cards"] as View[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold capitalize transition-colors ${
                view === v ? "bg-gold text-navy" : "text-white/60 hover:text-white"
              }`}
            >
              {v === "matrix" ? "▦ Matrix" : "▤ Cards"}
            </button>
          ))}
        </div>
      </div>

      {view === "matrix" ? (
        <>
          <ComparisonTable tools={visible} columns={columns} />
          <p className="text-xs text-white/40">
            Ratings are a 1–5 subjective guide for learning, not benchmarks. ★ = stronger.
          </p>
        </>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {visible.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
}
