import type { Metadata } from "next";
import { getTools } from "@/app/lib/data";
import ToolsClient from "./ToolsClient";

export const metadata: Metadata = {
  title: "AI Tools Comparison",
  description:
    "Compare AI models, coding agents, agent platforms, and automation platforms side by side — strengths, weaknesses, pricing, and when to use each.",
};

export default async function ToolsPage() {
  const tools = await getTools();

  return (
    <div className="container-hub space-y-6 py-8">
      <header>
        <p className="eyebrow">Core feature</p>
        <h1 className="section-title">⚖️ AI Tools Comparison</h1>
        <p className="mt-2 max-w-2xl text-white/70">
          Models, coding agents, agent platforms, and automation tools — compared
          in a matrix or as detailed cards, with pricing and clear &quot;when to
          use&quot; guidance.
        </p>
      </header>

      <ToolsClient tools={tools} />
    </div>
  );
}
