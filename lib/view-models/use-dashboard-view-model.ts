import { useEffect, useState } from "react";
import { useAccount, usePublicClient } from "wagmi";
import { zeroAddress } from "viem";
import { FACTORY_ADDRESS, FACTORY_ABI } from "@/lib/constants/contracts";
import { FACTORY_CHAIN } from "@/lib/constants/chains";
import type { ChainInfo, VaultItem } from "@/lib/types/dashboard";

/**
 * Dashboard view-model.
 * Reads the connected wallet's vault from on-chain.
 * Pass refreshKey to force a re-fetch (e.g. after vault creation).
 */
export function useDashboardViewModel(refreshKey = 0) {
  const { address } = useAccount();
  const publicClient = usePublicClient();

  const [chains, setChains] = useState<ChainInfo[]>([]);
  const [vaults, setVaults] = useState<VaultItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!address || !publicClient) {
      setIsLoading(false);
      return;
    }

    (async () => {
      setIsLoading(true);
      try {
        const vaultAddr = (await publicClient.readContract({
          address: FACTORY_ADDRESS,
          abi: FACTORY_ABI,
          functionName: "getVault",
          args: [address],
        })) as `0x${string}`;

        if (vaultAddr !== zeroAddress) {
          setChains([{ ...FACTORY_CHAIN, vaultCount: 1 }]);
          setVaults([
            {
              addr: vaultAddr,
              chain: FACTORY_CHAIN.name,
              status: "active",
              balance: "—",
              rule: "—",
              lastExecution: "—",
              pnl: "—",
              pnlUp: true,
            },
          ]);
        } else {
          setChains([]);
          setVaults([]);
        }
      } catch {
        setChains([]);
        setVaults([]);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [address, publicClient, refreshKey]);

  return { chains, vaults, isLoading };
}
