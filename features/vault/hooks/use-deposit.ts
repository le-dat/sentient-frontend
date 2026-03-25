"use client";

import { useState } from "react";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { parseUnits } from "viem";
import { ERC20_ABI, VAULT_ABI } from "@/lib/contracts";
import { NATIVE_ETH_ADDRESS } from "@/lib/constants/tokens";
import type { DepositToken } from "./use-token-list";

export type DepositStatus = "idle" | "approving" | "depositing" | "done" | "error";

export function useDeposit(vaultAddress: `0x${string}`) {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const [status, setStatus] = useState<DepositStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  async function deposit(token: DepositToken, humanAmount: string) {
    if (!address || !publicClient || !walletClient) {
      setError("Wallet not connected");
      return;
    }

    setError(null);
    const amount = parseUnits(humanAmount, token.decimals);
    const isNativeEth = token.address.toLowerCase() === NATIVE_ETH_ADDRESS.toLowerCase();

    try {
      if (isNativeEth) {
        // Native ETH — deposit() payable, no approve needed
        setStatus("depositing");
        const hash = await walletClient.writeContract({
          address: vaultAddress,
          abi: VAULT_ABI,
          functionName: "deposit",
          args: [],
          value: amount,
        });
        await publicClient.waitForTransactionReceipt({ hash });
      } else {
        // ERC-20 — approve then deposit(address, uint256)
        const tokenAddress = token.address as `0x${string}`;

        const allowance = await publicClient.readContract({
          address: tokenAddress,
          abi: ERC20_ABI,
          functionName: "allowance",
          args: [address, vaultAddress],
        });

        if ((allowance as bigint) < amount) {
          setStatus("approving");
          const approveHash = await walletClient.writeContract({
            address: tokenAddress,
            abi: ERC20_ABI,
            functionName: "approve",
            args: [vaultAddress, amount],
          });
          await publicClient.waitForTransactionReceipt({ hash: approveHash });
        }

        setStatus("depositing");
        const depositHash = await walletClient.writeContract({
          address: vaultAddress,
          abi: VAULT_ABI,
          functionName: "deposit",
          args: [tokenAddress, amount],
        });
        await publicClient.waitForTransactionReceipt({ hash: depositHash });
      }

      setStatus("done");
      // Reset to idle after brief delay so UI can show "Deposit confirmed"
      setTimeout(() => setStatus("idle"), 1500);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Deposit failed");
      setStatus("error");
    }
  }

  return { deposit, status, error };
}
