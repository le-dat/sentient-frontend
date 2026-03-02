import { PageState } from "@/components/ui/page-state";

export default function Loading() {
  return (
    <PageState
      variant="loading"
      title="Loading Sentient..."
      description="Preparing dashboard data and wallet context."
    />
  );
}
