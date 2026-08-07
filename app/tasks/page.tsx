import type { Metadata } from "next";
import TasksClient from "./TasksClient";

export const metadata: Metadata = {
  title: "Card Table",
  description:
    "A simple card table — add cards, drag them from To Do to In Progress to Done, and flag what's urgent.",
};

export default function TasksPage() {
  return (
    <div className="container-hub max-w-5xl space-y-6 py-10">
      <header className="border-b border-line/70 pb-5">
        <p className="eyebrow">Workspace</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.035em] text-text sm:text-4xl">
          Card Table
        </h1>
        <p className="entry-body mt-3 max-w-[58ch]">
          Drag a card from{" "}
          <span className="text-violet-light">To Do</span> to{" "}
          <span className="text-gold">In Progress</span> to{" "}
          <span className="text-text/70">Done</span>. Flag what&apos;s urgent, and
          clear the board when the week is finished.
        </p>
      </header>

      <TasksClient />
    </div>
  );
}
