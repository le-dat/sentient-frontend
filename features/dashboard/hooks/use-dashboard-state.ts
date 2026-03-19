'use client'
import { useCallback, useState } from "react";
import { useDashboardOnChain } from "./use-dashboard-on-chain";
import { SUPPORTED_CHAINS } from "@/lib/constants/chains";
import { zeroAddress } from "viem";
import type { ChainInfo } from "@/features/dashboard/types";
import type { VaultItem } from "@/features/vault/types";

function isZeroAddr(addr: string): boolean {
  return !addr || addr.toLowerCase() === zeroAddress.toLowerCase();
}

export function useDashboardState() {
  const [refreshKey, setRefreshKey] = useState(0);
  const { chains: onChainChains, vaults: onChainVaults, isLoading } = useDashboardOnChain(refreshKey);

  const [addedChains, setAddedChains] = useState<ChainInfo[]>([]);
  const [addedVaults, setAddedVaults] = useState<VaultItem[]>([]);

  const allChains = [
    ...onChainChains,
    ...addedChains.filter((c) => !onChainChains.some((oc) => oc.id === c.id)),
  ];

  const mergedVaults = [
    ...onChainVaults,
    ...addedVaults.filter((v) => !onChainVaults.some((ov) => ov.addr === v.addr)),
  ];
  const allVaults = mergedVaults.filter((v) => !isZeroAddr(v.addr));

  const availableChains = SUPPORTED_CHAINS.filter((c) => !allChains.some((a) => a.id === c.id));

  function addChainAndVault(chain: ChainInfo, vaultAddr: string, owner?: string) {
    if (isZeroAddr(vaultAddr)) return;
    setAddedChains((prev) => [...prev, { ...chain, vaultCount: 1 }]);
    setAddedVaults((prev) => [
      ...prev,
      {
        addr: vaultAddr,
        owner: owner ?? undefined,
        chain: chain.name,
        chainId: chain.id,
        status: "active",
        balance: "—",
        rule: "—",
        lastExecution: "—",
        pnl: "—",
        pnlUp: true,
      },
    ]);
    setRefreshKey((k) => k + 1);
  }

  const refreshVaults = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  return { allChains, allVaults, availableChains, addChainAndVault, refreshVaults, isLoading };
}
