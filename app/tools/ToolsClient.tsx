"use client";

import { useMemo, useState } from "react";
import type { Tool, ToolCategory } from "@/app/lib/types";
import { TOOL_CATEGORIES } from "@/app/lib/constants";
import { MATRIX_COLUMNS } from "@/app/lib/seed/tools";
import ComparisonTable from "@/app/components/ComparisonTable";
import { TOOL_GLYPH } from "@/app/components/ui/Glyph";
import { CategoryPills } from "@/app/components/ui/CategoryFilter";
import { ViewToggle } from "@/app/components/ui/Controls";
import ToolTile from "./ToolTile";

type View = "matrix" | "cards";

export default function ToolsClient({ tools }: { tools: Tool[] }) {
  const [category, setCategory] = useState<ToolCategory>("AI Models");
  const [view, setView] = useState<View>("matrix");

  // No "All" option: the matrix columns differ per category, so tools are only
  // ever compared within one.
  const categoryItems = useMemo(
    () =>
      TOOL_CATEGORIES.map((c) => ({
        key: c,
        label: c,
        count: tools.filter((t) => t.category === c).length,
        glyph: TOOL_GLYPH[c],
      })),
    [tools],
  );
  const visible = useMemo(() => tools.filter((t) => t.category === category), [tools, category]);
  const columns = MATRIX_COLUMNS[category] ?? [];

  return (
    <div className="space-y-6">
      <CategoryPills
        items={categoryItems}
        active={category}
        onSelect={(key) => setCategory(key as ToolCategory)}
        label="Tool category"
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted" aria-live="polite">
          <span className="font-semibold text-text">{visible.length}</span> {visible.length === 1 ? "tool" : "tools"} ·{" "}
          {category}
        </p>
        <ViewToggle
          label="Layout"
          value={view}
          onChange={setView}
          options={[
            { value: "matrix", label: "Matrix", glyph: "table", showLabel: true },
            { value: "cards", label: "Cards", glyph: "grid", showLabel: true },
          ]}
        />
      </div>

      {visible.length === 0 ? (
        <div className="card px-6 py-14 text-center text-[0.9375rem] text-muted">No tools in this category yet.</div>
      ) : view === "matrix" ? (
        <>
          <ComparisonTable tools={visible} columns={columns} />
          <p className="text-xs text-muted">
            Ratings are a 1–5 subjective guide for learning, not benchmarks. ★ = stronger.
          </p>
        </>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {visible.map((tool) => (
            <ToolTile key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
}
