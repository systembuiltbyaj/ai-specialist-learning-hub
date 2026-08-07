"use client";

import { useState } from "react";
import RefCard from "@/app/components/RefCard";
import { RecipeCard, TipCard, LearnList } from "@/app/components/HubBlocks";
import {
  GHL_CONCEPTS,
  GHL_RECIPES,
  GHL_BEST_PRACTICES,
  GHL_LEARN,
} from "@/app/lib/seed/ghlhub";

const TABS = ["Concepts", "Build", "Best Practices", "Learn"] as const;
type Tab = (typeof TABS)[number];

export default function GhlHubClient() {
  const [tab, setTab] = useState<Tab>("Concepts");

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

      {tab === "Concepts" && (
        <>
          <p className="text-sm text-muted">
            The building blocks — get fluent here and automation is just moving
            these around.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {GHL_CONCEPTS.map((c) => (
              <RefCard key={c.name} card={c} />
            ))}
          </div>
        </>
      )}

      {tab === "Build" && (
        <>
          <p className="text-sm text-muted">
            Copy-and-build automation recipes — trigger → steps → outcome. Start
            with Speed-to-Lead.
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            {GHL_RECIPES.map((r) => (
              <RecipeCard key={r.title} recipe={r} />
            ))}
          </div>
        </>
      )}

      {tab === "Best Practices" && (
        <div className="grid gap-3 md:grid-cols-2">
          {GHL_BEST_PRACTICES.map((t) => (
            <TipCard key={t.title} tip={t} />
          ))}
        </div>
      )}

      {tab === "Learn" && (
        <>
          <p className="text-sm text-muted">A path from core objects to integrations.</p>
          <LearnList steps={GHL_LEARN} />
        </>
      )}
    </div>
  );
}
