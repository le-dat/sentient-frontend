import { PageState } from "@/components/ui/page-state";

export default function CreateVaultLoading() {
  return (
    <PageState
      title="Preparing create vault form"
      description="Loading defaults (executor/network/limits)..."
      action={<div className="mx-auto h-2 w-48 animate-pulse rounded-full bg-primary/40" />}
    />
  );
}
