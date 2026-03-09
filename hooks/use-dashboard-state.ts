import { useState } from "react";
import { useDashboardViewModel } from "@/lib/view-models/use-dashboard-view-model";
import { SUPPORTED_CHAINS } from "@/lib/constants/chains";
import type { ChainInfo, VaultItem } from "@/lib/types/dashboard";

export function useDashboardState() {
  const [refreshKey, setRefreshKey] = useState(0);
  const { chains: onChainChains, vaults: onChainVaults } = useDashboardViewModel(refreshKey);

  const [addedChains, setAddedChains] = useState<ChainInfo[]>([]);
  const [addedVaults, setAddedVaults] = useState<VaultItem[]>([]);

  const allChains = [
    ...onChainChains,
    ...addedChains.filter((c) => !onChainChains.some((oc) => oc.id === c.id)),
  ];

  const allVaults = [
    ...onChainVaults,
    ...addedVaults.filter((v) => !onChainVaults.some((ov) => ov.addr === v.addr)),
  ];

  const availableChains = SUPPORTED_CHAINS.filter((c) => !allChains.some((a) => a.id === c.id));

  function addChainAndVault(chain: ChainInfo, vaultAddr: string) {
    setAddedChains((prev) => [...prev, { ...chain, vaultCount: 1 }]);
    setAddedVaults((prev) => [
      ...prev,
      {
        addr: vaultAddr,
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

  return { allChains, allVaults, availableChains, addChainAndVault };
}
