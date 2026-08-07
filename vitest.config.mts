import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  // Mirrors the "@/*" -> "./*" mapping in tsconfig.json so tests import the
  // same specifiers the app does.
  resolve: { alias: { "@": path.resolve(__dirname, ".") } },
  test: { environment: "node", include: ["tests/**/*.test.ts"] },
});
