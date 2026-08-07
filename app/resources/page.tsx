import type { Metadata } from "next";
import { getAdminResources } from "@/app/lib/data";
import { isSupabaseConfigured } from "@/app/lib/supabase";
import { isAdmin } from "@/app/lib/adminSession";
import { SEED_RESOURCES } from "@/app/lib/seed/resources";
import ResourcesClient from "./ResourcesClient";

export const metadata: Metadata = {
  title: "Learning Resources",
  description:
    "Save and organize learning resources, track progress, hit weekly goals, count hours invested, and export your learning journey.",
};

// Read fresh so newly-added resources show across devices.
export const dynamic = "force-dynamic";

export default async function ResourcesPage() {
  const admin = await isAdmin();

  // The saved list is private — it holds personal notes and job posts. Only an
  // authenticated admin reads it from Supabase or writes to it. Public visitors
  // get the same UI backed by their own browser storage, so nothing they do can
  // reach the service-role key and nothing of AJ's is rendered for them.
  const remote = isSupabaseConfigured && admin;
  const resources = admin ? await getAdminResources() : SEED_RESOURCES;

  return (
    <div className="container-hub space-y-6 py-8">
      <header>
        <p className="eyebrow">Dashboard</p>
        <h1 className="section-title">🔖 Learning Resources</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Bookmark docs, videos, posts, and courses; organize by category; track
          progress and weekly goals; and export your learning journey.
        </p>
      </header>

      <ResourcesClient initial={resources} remote={remote} />
    </div>
  );
}
