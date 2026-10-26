// Fields every reference entry carries so it can show where a claim came from
// and when someone last checked it. Shared by the dictionary and the model
// registry; kept free of runtime imports so Node can load it without a bundler.

export type ContentStatus = "current" | "emerging" | "deprecated";

export interface Source {
  label: string;
  url: string;
}

// Models have a lifecycle that terms don't: a vendor ships a preview, keeps an
// older model callable ("legacy"), announces a shutdown ("deprecated"), then removes it.
export type ModelStatus = "preview" | "current" | "legacy" | "deprecated" | "retired";
export type ModelTier = "flagship" | "balanced" | "fast" | "reasoning" | "open-weight" | "media" | "other";

export interface ModelEntry {
  id: string;
  vendor: string;
  name: string;
  // The exact string you pass to the vendor API, or the Hugging Face repo for open weights.
  apiId?: string;
  tier: ModelTier;
  // YYYY-MM-DD, or YYYY-MM when the vendor only published the month.
  releasedOn?: string;
  status: ModelStatus;
  contextTokens?: number;
  // Prices change without notice, so they're stored as a dated note, never a number.
  pricingNote?: string;
  summary: string;
  sources: Source[];
  lastVerified: string;
}
