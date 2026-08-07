import type { Metadata } from "next";
import TasksClient from "./TasksClient";

export const metadata: Metadata = {
  title: "Tasks",
  description:
    "Weekly task tracker — add tasks, mark progress, flag what's urgent, and check them off.",
};

export default function TasksPage() {
  return (
    <div className="container-hub space-y-6 py-8">
      <header>
        <p className="eyebrow">Workspace</p>
        <h1 className="section-title">✓ Tasks</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Plan your week — add every task, move it through{" "}
          <span className="text-gold">To Do → In Progress → Done</span>, and flag
          what&apos;s <span className="text-neon-pink">urgent</span>.
        </p>
      </header>

      <TasksClient />
    </div>
  );
}
