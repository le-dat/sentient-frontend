"use client";

import { PageState } from "@/components/ui/page-state";

export default function VaultError({ reset }: { error: Error; reset: () => void }) {
  return (
    <PageState
      variant="error"
      title="Vault failed to load"
      description="Unable to fetch this vault. It may be unavailable or network is unstable."
      action={
        <button onClick={reset} className="rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground">
          Retry
        </button>
      }
    />
  );
}
