import { PageState } from "@/components/ui/page-state";

export default function NotificationsLoading() {
  return (
    <PageState
      variant="loading"
      title="Loading notification settings"
      description="Fetching Telegram connection and alert preferences..."
    />
  );
}
