import { PageState } from "@/components/ui/page-state";

export default function VaultLoading() {
  return (
    <PageState
      variant="loading"
      title="Loading vault details"
      description="Pulling balances, strategy rules and execution history..."
    />
  );
}
