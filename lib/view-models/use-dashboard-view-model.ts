"use client";

import { useMemo } from "react";
import { useAccount } from "wagmi";
import { useVaultsList } from "@/lib/api/hooks";
import { getChainName } from "@/lib/api/constants";
import type { ChainInfo, MetricCard, VaultItem } from "@/lib/types/dashboard";

/**
 * Dashboard view-model.
 * Uses API for vaults; filters by connected account (owner).
 */
export function useDashboardViewModel() {
  const { address } = useAccount();
  const { data: vaultsData } = useVaultsList(
    {
      chain: 84532,
      owner: address ?? undefined,
      limit: 50,
    },
    { enabled: !!address },
  );

  const chains: ChainInfo[] = useMemo(() => {
    const supported: ChainInfo[] = [
      { id: 84532, name: "Base Sepolia", symbol: "ETH", color: "#0052FF", vaultCount: 0 },
    ];
    const items = vaultsData?.items ?? [];
    const byChain = items.reduce<Record<number, number>>((acc, v) => {
      acc[v.chain_id] = (acc[v.chain_id] ?? 0) + 1;
      return acc;
    }, {});
    return supported.map((c) => ({
      ...c,
      vaultCount: byChain[c.id] ?? 0,
    }));
  }, [vaultsData]);

  const vaults: VaultItem[] = useMemo(() => {
    const items = vaultsData?.items ?? [];
    return items.map((v) => ({
      addr: v.address,
      owner: v.owner ?? null,
      chain: getChainName(v.chain_id),
      status: "active" as const,
      balance: "— USDC",
      rule: "—",
      lastExecution: "—",
      pnl: "—",
      pnlUp: true,
    }));
  }, [vaultsData]);

  const metrics: MetricCard[] = [];

  return {
    metrics,
    chains,
    vaults,
  };
}
