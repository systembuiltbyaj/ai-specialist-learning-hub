// Fields every reference entry carries so it can show where a claim came from
// and when someone last checked it. Shared by the dictionary and the model
// registry; kept free of runtime imports so Node can load it without a bundler.

export type ContentStatus = "current" | "emerging" | "deprecated";

export interface Source {
  label: string;
  url: string;
}
