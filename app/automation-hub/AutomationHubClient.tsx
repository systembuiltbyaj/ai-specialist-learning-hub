"use client";

import { useState } from "react";
import RefCard from "@/app/components/RefCard";
import { RecipeCard, TipCard, LearnList } from "@/app/components/HubBlocks";
import {
  AUTO_PLATFORMS,
  AUTO_CONCEPTS,
  AUTO_AI,
  AUTO_RECIPES,
  AUTO_LEARN,
} from "@/app/lib/seed/automationhub";

const TABS = ["Platforms", "Concepts", "Recipes", "AI Steps", "Learn"] as const;
type Tab = (typeof TABS)[number];

export default function AutomationHubClient() {
  const [tab, setTab] = useState<Tab>("Platforms");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`chip ${tab === t ? "chip-active" : "hover:border-violet-soft/60"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Platforms" && (
        <>
          <p className="text-sm text-muted">
            Three tools, one skillset. Learn the concepts once — they transfer
            across all of them.
          </p>
          <div className="grid gap-3 lg:grid-cols-3">
            {AUTO_PLATFORMS.map((c) => (
              <RefCard key={c.name} card={c} />
            ))}
          </div>
        </>
      )}

      {tab === "Concepts" && (
        <>
          <p className="text-sm text-muted">
            The vocabulary of automation — the same ideas power Zapier, Make, and n8n.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {AUTO_CONCEPTS.map((c) => (
              <RefCard key={c.name} card={c} />
            ))}
          </div>
        </>
      )}

      {tab === "Recipes" && (
        <>
          <p className="text-sm text-muted">
            Build-ready flows — trigger → steps → outcome.
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            {AUTO_RECIPES.map((r) => (
              <RecipeCard key={r.title} recipe={r} />
            ))}
          </div>
        </>
      )}

      {tab === "AI Steps" && (
        <>
          <p className="text-sm text-muted">
            Drop an LLM (Claude / OpenAI) into a workflow to give it a brain.
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            {AUTO_AI.map((t) => (
              <TipCard key={t.title} tip={t} />
            ))}
          </div>
        </>
      )}

      {tab === "Learn" && (
        <>
          <p className="text-sm text-muted">
            A path from your first Zap to AI-powered, self-hosted workflows.
          </p>
          <LearnList steps={AUTO_LEARN} />
        </>
      )}
    </div>
  );
}
