"use client";

import { useState } from "react";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { parseUnits, zeroAddress } from "viem";
import { VAULT_ABI } from "@/lib/contracts";
import { TOKEN_DATA } from "@/lib/constants/tokens";

export type WithdrawStatus = "idle" | "withdrawing" | "done" | "error";

function getTokenAddress(symbol: string): `0x${string}` {
  if (symbol === "ETH") return zeroAddress;
  const data = TOKEN_DATA[symbol];
  return (data?.address ?? zeroAddress) as `0x${string}`;
}

function getTokenDecimals(symbol: string): number {
  return TOKEN_DATA[symbol]?.decimals ?? 18;
}

export function useWithdraw(vaultAddress: `0x${string}`) {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const [status, setStatus] = useState<WithdrawStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  async function withdraw(symbol: string, humanAmount: string) {
    if (!address || !publicClient || !walletClient) {
      setError("Wallet not connected");
      return;
    }

    setError(null);
    const decimals = getTokenDecimals(symbol);
    const amount = parseUnits(humanAmount, decimals);
    const tokenAddr = getTokenAddress(symbol);

    try {
      setStatus("withdrawing");
      const hash = await walletClient.writeContract({
        address: vaultAddress,
        abi: VAULT_ABI,
        functionName: "withdraw",
        args: [tokenAddr, amount],
      });
      await publicClient.waitForTransactionReceipt({ hash });

      setStatus("done");
      setTimeout(() => setStatus("idle"), 1500);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Withdraw failed");
      setStatus("error");
    }
  }

  return { withdraw, status, error };
}
