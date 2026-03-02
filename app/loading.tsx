import { PageState } from "@/components/ui/page-state";

export default function Loading() {
  return (
    <PageState
      title="Loading Sentient..."
      description="Preparing dashboard data and wallet context."
      action={<div className="mx-auto h-2 w-44 animate-pulse rounded-full bg-primary/40" />}
    />
  );
}
