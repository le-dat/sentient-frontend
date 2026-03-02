import { PageState } from "@/components/ui/page-state";

export default function MonitorLoading() {
  return (
    <PageState
      title="Loading monitor"
      description="Gathering execution logs and health signals..."
      action={<div className="mx-auto h-2 w-52 animate-pulse rounded-full bg-primary/40" />}
    />
  );
}
