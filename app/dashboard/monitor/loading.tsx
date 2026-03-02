import { PageState } from "@/components/ui/page-state";

export default function MonitorLoading() {
  return (
    <PageState
      variant="loading"
      title="Loading monitor"
      description="Gathering execution logs and health signals..."
    />
  );
}
