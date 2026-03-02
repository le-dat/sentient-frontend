import { PageState } from "@/components/ui/page-state";

export default function NotificationsLoading() {
  return (
    <PageState
      title="Loading notification settings"
      description="Fetching Telegram connection and alert preferences..."
      action={<div className="mx-auto h-2 w-56 animate-pulse rounded-full bg-primary/40" />}
    />
  );
}
