"use client";

import { PageState } from "@/components/ui/page-state";

export default function DashboardError({ reset }: { error: Error; reset: () => void }) {
  return (
    <PageState
      title="Dashboard unavailable"
      description="Could not load dashboard data. Check API/GraphQL and retry."
      action={
        <button onClick={reset} className="rounded-lg bg-primary px-4 py-2 font-semibold text-white">
          Retry
        </button>
      }
    />
  );
}
