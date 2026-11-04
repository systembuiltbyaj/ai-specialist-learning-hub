import type { Metadata } from "next";
import { TOOL_CATEGORIES } from "@/app/lib/constants";
import { getTools } from "@/app/lib/data";
import ToolsClient from "./ToolsClient";
import PageHeader from "@/app/components/PageHeader";

export const metadata: Metadata = {
  title: "AI Tools Comparison",
  description:
    "Compare AI models, coding agents, agent platforms, and automation platforms side by side — strengths, weaknesses, pricing, and when to use each.",
};

export default async function ToolsPage() {
  const tools = await getTools();

  return (
    <div className="container-hub space-y-6 py-8">
      <PageHeader href="/tools" eyebrow="Compare before you choose" title="AI Tools" accent="Comparison" stats={[{ label: "Tools", value: tools.length, icon: "/tools" }, { label: "Categories", value: TOOL_CATEGORIES.length, icon: "/dev-tools" }]}>
        Models, coding agents, agent platforms and automation tools — compared in a matrix or as detailed cards, with
        pricing and clear &quot;when to use&quot; guidance.
      </PageHeader>

      <ToolsClient tools={tools} />
    </div>
  );
}
