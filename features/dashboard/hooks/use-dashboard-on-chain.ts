import { useEffect, useState } from "react";
import { useAccount, usePublicClient } from "wagmi";
import { zeroAddress } from "viem";
import { formatAmount } from "@/lib/utils";
import {
  FACTORY_ADDRESS,
  FACTORY_ABI,
  ERC20_ABI,
  VAULT_ABI,
} from "@/lib/contracts";
import { FACTORY_CHAIN } from "@/lib/constants/chains";
import { VAULT_TOKENS, NATIVE_ETH_ADDRESS } from "@/lib/constants/tokens";
import type { ChainInfo } from "@/features/dashboard/types";
import type { VaultItem } from "@/features/vault/types";

const ERC20_VAULT_TOKENS = VAULT_TOKENS.filter(
  (t) => t.address.toLowerCase() !== NATIVE_ETH_ADDRESS.toLowerCase(),
);


export function useDashboardOnChain(refreshKey = 0) {
  const { address } = useAccount();
  const publicClient = usePublicClient({ chainId: FACTORY_CHAIN.id });

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
          // ERC20 balances via multicall
          const erc20Results = await publicClient.multicall({
            contracts: ERC20_VAULT_TOKENS.map((token) => ({
              address: token.address,
              abi: ERC20_ABI,
              functionName: "balanceOf" as const,
              args: [vaultAddr] as [`0x${string}`],
            })),
          });

          // Native ETH via vault.getBalance(address(0))
          const ethBalance = (await publicClient.readContract({
            address: vaultAddr,
            abi: VAULT_ABI,
            functionName: "getBalance",
            args: [zeroAddress],
          })) as bigint;

          const balanceParts: string[] = [];

          ERC20_VAULT_TOKENS.forEach((token, i) => {
            const result = erc20Results[i];
            if (result.status !== "success" || result.result === 0n) return;
            balanceParts.push(
              `${formatAmount(result.result as bigint, token.decimals)} ${token.symbol}`,
            );
          });

          if (ethBalance > 0n) {
            balanceParts.push(`${formatAmount(ethBalance, 18)} ETH`);
          }

          const balance =
            balanceParts.length > 0 ? balanceParts.join(" / ") : "—";

          setChains([{ ...FACTORY_CHAIN, vaultCount: 1 }]);
          setVaults([
            {
              addr: vaultAddr,
              owner: address,
              chain: FACTORY_CHAIN.name,
              chainId: FACTORY_CHAIN.id,
              status: "active",
              balance,
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
