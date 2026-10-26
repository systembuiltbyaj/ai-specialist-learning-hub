import type { Resource, InterviewEntry } from "@/app/lib/types";

// Triggers a client-side file download from a string.
export function downloadFile(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportInterviewToMarkdown(entries: InterviewEntry[]): string {
  const lines: string[] = [
    "# 🎤 Interview Prep — Q&A Log",
    "",
    `*${entries.length} questions*`,
    "",
    "---",
    "",
  ];

  for (const e of entries) {
    lines.push(`## ${e.question}`);
    if (e.topic) lines.push(`*Topic: ${e.topic}*`, "");
    lines.push(e.answer || "_(no answer yet)_", "");
    lines.push("---", "");
  }

  return lines.join("\n");
}

export function exportResourcesToMarkdown(
  resources: Resource[],
  hours: number,
): string {
  const lines: string[] = [
    "# 🔖 Learning Journey",
    "",
    `*${resources.length} resources · ${hours} hours invested*`,
    "",
    "---",
    "",
  ];

  const byCategory = resources.reduce<Record<string, Resource[]>>((acc, r) => {
    (acc[r.category] ||= []).push(r);
    return acc;
  }, {});

  for (const [cat, items] of Object.entries(byCategory)) {
    lines.push(`## ${cat}`, "");
    for (const r of items) {
      const check = r.completed ? "x" : " ";
      lines.push(`- [${check}] [${r.title}](${r.url}) — *${r.type}*`);
      if (r.notes) lines.push(`  - ${r.notes}`);
    }
    lines.push("");
  }

  return lines.join("\n");
}
