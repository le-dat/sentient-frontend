"use client";

import { getChainName } from "@/lib/api/constants";
import { useVaultsList } from "@/lib/api/hooks";
import type { VaultListItem } from "@/lib/api/types";
import { FACTORY_CHAIN } from "@/lib/constants/chains";
import { ROUTES } from "@/lib/constants/routes";
import { formatTimestamp, shortAddress } from "@/lib/utils";
import { Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

function TopVaultRow({ vault }: { vault: VaultListItem }) {
  const router = useRouter();
  const chainName = getChainName(vault.chain_id);

  return (
    <div
      onClick={() => router.push(ROUTES.SEARCH_VAULT(vault.address))}
      className="border-border/40 bg-card/40 hover:border-primary/40 hover:bg-card/70 group flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all"
    >
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <p className="text-foreground font-mono text-sm font-semibold">
            {shortAddress(vault.address)}
          </p>
        </div>
        <p className="text-muted truncate text-xs">
          {chainName}
          {vault.owner != null && <> · Owner {shortAddress(vault.owner)}</>}
          {vault.created_timestamp && <> · Created {formatTimestamp(vault.created_timestamp)}</>}
        </p>
        <p className="text-muted truncate font-mono text-xs">{vault.address}</p>
      </div>
      <div className="text-muted ml-4 text-xs opacity-0 transition-opacity group-hover:opacity-100">
        →
      </div>
    </div>
  );
}

export function TopVaults() {
  const { data, isLoading, error } = useVaultsList({ chain: FACTORY_CHAIN.id, limit: 20 });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Zap className="text-primary h-4 w-4" />
          <h2 className="text-foreground text-sm font-semibold tracking-wider uppercase">
            Top Vaults
          </h2>
        </div>
        <div className="space-y-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="border-border/40 bg-card/40 flex items-center justify-between rounded-2xl border p-4"
            >
              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="h-4 w-28 rounded" />
                <Skeleton className="h-3 w-full rounded" />
                <Skeleton className="h-3 w-full rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    const msg =
      typeof (error as { detail?: string })?.detail === "string"
        ? (error as unknown as { detail: string }).detail
        : "Failed to load vaults";
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Zap className="text-primary h-4 w-4" />
          <h2 className="text-foreground text-sm font-semibold tracking-wider uppercase">
            Top Vaults
          </h2>
        </div>
        <div className="border-destructive/30 bg-destructive/5 text-destructive rounded-xl border p-4 text-sm">
          {msg}
        </div>
      </div>
    );
  }

  const items = data?.items ?? [];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Zap className="text-primary h-4 w-4" />
        <h2 className="text-foreground text-sm font-semibold tracking-wider uppercase">
          Top Vaults
        </h2>
        {data && <span className="text-muted text-xs">({data.total} total)</span>}
      </div>
      <div className="space-y-3">
        {items.length === 0 ? (
          <p className="text-muted py-6 text-center text-sm">
            No vaults found. Run the indexer to sync from subgraph.
          </p>
        ) : (
          items.map((vault) => (
            <TopVaultRow key={`${vault.chain_id}-${vault.address}`} vault={vault} />
          ))
        )}
      </div>
    </div>
  );
}
