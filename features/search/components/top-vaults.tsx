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
      className="cursor-pointer flex items-center justify-between p-4 rounded-2xl border border-border/40 bg-card/40 hover:border-primary/40 hover:bg-card/70 transition-all group"
    >
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center gap-2">
          <p className="font-mono text-sm font-semibold text-foreground">
            {shortAddress(vault.address)}
          </p>
        </div>
        <p className="text-xs text-muted truncate">
          {chainName}
          {vault.owner != null && (
            <> · Owner {shortAddress(vault.owner)}</>
          )}
          {vault.created_timestamp && (
            <> · Created {formatTimestamp(vault.created_timestamp)}</>
          )}
        </p>
        <p className="text-xs text-muted font-mono truncate">{vault.address}</p>
      </div>
      <div className="text-xs text-muted opacity-0 group-hover:opacity-100 transition-opacity ml-4">
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
          <Zap className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
            Top Vaults
          </h2>
        </div>
        <div className="space-y-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 rounded-2xl border border-border/40 bg-card/40"
            >
              <div className="flex-1 min-w-0 space-y-2">
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
          <Zap className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
            Top Vaults
          </h2>
        </div>
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {msg}
        </div>
      </div>
    );
  }

  const items = data?.items ?? [];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Zap className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
          Top Vaults
        </h2>
        {data && (
          <span className="text-xs text-muted">({data.total} total)</span>
        )}
      </div>
      <div className="space-y-3">
        {items.length === 0 ? (
          <p className="text-sm text-muted py-6 text-center">
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
