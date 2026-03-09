import { useRef, useState } from "react";
import { useDashboardState } from "./use-dashboard-state";
import { useCreateVault } from "./use-create-vault";
import { groupByChain } from "@/lib/utils";
import type { ChainInfo, VaultItem } from "@/lib/types/dashboard";

export function useDashboardFlow() {
  const { allChains, allVaults, availableChains, addChainAndVault } = useDashboardState();
  const { createVault, isCreating, error: vaultError } = useCreateVault();

  const [chainSelectOpen, setChainSelectOpen] = useState(false);
  const [selected, setSelected] = useState<VaultItem | null>(null);
  const chainRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const vaultsByChain = groupByChain(allVaults);

  function scrollToChain(name: string) {
    chainRefs.current[name]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function handleChainSelect(chain: ChainInfo) {
    const addr = await createVault();
    setChainSelectOpen(false);
    if (!addr) return;
    addChainAndVault(chain, addr);
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
  };
}
