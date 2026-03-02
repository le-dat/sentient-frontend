import { PageState } from "@/components/ui/page-state";

export default function DashboardLoading() {
  return (
    <PageState
      title="Loading dashboard"
      description="Fetching vaults, activity and health status..."
      action={<div className="mx-auto h-2 w-56 animate-pulse rounded-full bg-primary/40" />}
    />
  );
}
