import { PageState } from "@/components/ui/page-state";

export default function DashboardLoading() {
  return (
    <PageState
      variant="loading"
      title="Loading dashboard"
      description="Fetching vaults, activity and health status..."
    />
  );
}
