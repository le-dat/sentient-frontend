"use client";
import { useEffect, useRef, useState } from "react";
import { useAccount } from "wagmi";
import { useDashboardState } from "./use-dashboard-state";
import { useCreateVault } from "@/features/vault/hooks/use-create-vault";
import { groupByChain } from "@/lib/utils";
import type { ChainInfo } from "@/features/dashboard/types";
import type { VaultItem } from "@/features/vault/types";

export function useDashboardFlow() {
  const { address } = useAccount();
  const { allChains, allVaults, availableChains, addChainAndVault, refreshVaults, isLoading } =
    useDashboardState();
  const { createVault, isCreating, error: vaultError } = useCreateVault();

  const [chainSelectOpen, setChainSelectOpen] = useState(false);
  const [selected, setSelected] = useState<VaultItem | null>(null);
  const chainRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Sync selected vault with latest data (e.g. after deposit/withdraw refresh)
  useEffect(() => {
    if (selected && allVaults.length > 0) {
      const updated = allVaults.find((v) => v.addr === selected.addr);
      if (updated) setSelected(updated);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only sync when allVaults changes
  }, [allVaults]);

  const vaultsByChain = groupByChain(allVaults);

  function scrollToChain(name: string) {
    chainRefs.current[name]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function handleChainSelect(chain: ChainInfo) {
    const addr = await createVault();
    setChainSelectOpen(false);
    if (!addr) return;
    addChainAndVault(chain, addr, address ?? undefined);
    setTimeout(() => scrollToChain(chain.name), 100);
  }

  return {
    // data
    allChains,
    availableChains,
    vaultsByChain,
    // ui state
    selected,
    setSelected,
    chainSelectOpen,
    setChainSelectOpen,
    // vault creation
    isCreating,
    vaultError,
    // actions
    chainRefs,
    scrollToChain,
    handleChainSelect,
    refreshVaults,
    isLoading,
  };
}
