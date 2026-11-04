"use client";

import { useEffect, useRef, useState } from "react";
import HubIcon, { type HubIconName } from "./HubIcon";

export interface HubTab {
  id: string;
  label: string;
  icon?: HubIconName;
  content: React.ReactNode;
}

// Violet pill tabs for a hub's in-page sections. The active tab mirrors the URL
// hash, so any link to "#<tab id>" (a topic tile, a step in a flow, a shared
// URL) opens that tab — the tabs used to be unreachable from anywhere else.
export default function HubTabs({ tabs, label }: { tabs: HubTab[]; label: string }) {
  const [active, setActive] = useState(tabs[0].id);
  const barRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  // Keyed on the ids, not the array: a parent re-render passes a new array.
  const ids = tabs.map((tab) => tab.id).join(" ");

  useEffect(() => {
    const known = ids.split(" ");
    const syncFromHash = () => {
      const id = window.location.hash.slice(1);
      if (!known.includes(id)) return;
      setActive(id);
      barRef.current?.scrollIntoView({ block: "start" });
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [ids]);

  const select = (id: string) => {
    setActive(id);
    // Keep the hash current so a later "#<id>" link still fires hashchange.
    window.history.replaceState(null, "", `#${id}`);
  };

  // Arrow keys move between tabs, per the WAI-ARIA tabs pattern.
  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = (index + step + tabs.length) % tabs.length;
    select(tabs[next].id);
    buttonRefs.current[next]?.focus();
  };

  const current = tabs.find((tab) => tab.id === active) ?? tabs[0];

  return (
    <div className="space-y-6">
      <div ref={barRef} className="scroll-mt-20 border-b border-violet-soft/15 pb-4">
        <div role="tablist" aria-label={label} className="flex flex-wrap gap-2">
          {tabs.map((tab, index) => {
            const selected = tab.id === current.id;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  buttonRefs.current[index] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={selected}
                aria-controls={`panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(tab.id)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={`chip gap-1.5 px-4 py-2 text-sm ${selected ? "chip-active" : "hover:border-violet-soft/60"}`}
              >
                {tab.icon && <HubIcon name={tab.icon} className="h-4 w-4" />}
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div role="tabpanel" id={`panel-${current.id}`} aria-labelledby={`tab-${current.id}`} className="space-y-5">
        {current.content}
      </div>
    </div>
  );
}
