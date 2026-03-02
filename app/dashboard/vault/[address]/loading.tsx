import { PageState } from "@/components/ui/page-state";

export default function VaultLoading() {
  return (
    <PageState
      title="Loading vault details"
      description="Pulling balances, strategy rules and execution history..."
      action={<div className="mx-auto h-2 w-52 animate-pulse rounded-full bg-primary/40" />}
    />
  );
}
