import type { Metadata } from "next";
import TasksClient from "./TasksClient";
import PageHeader from "@/app/components/PageHeader";

export const metadata: Metadata = {
  title: "Card Table",
  description:
    "A simple card table — add cards, drag them from To Do to In Progress to Done, and flag what's urgent.",
};

export default function TasksPage() {
  return (
    <div className="container-hub max-w-5xl space-y-6 py-10">
      <PageHeader href="/tasks" eyebrow="Workspace" title="Card" accent="Table">
        Drag a card from To Do to In Progress to Done. Flag what&apos;s urgent, and clear the board when the week is
        finished.
      </PageHeader>

      <TasksClient />
    </div>
  );
}
