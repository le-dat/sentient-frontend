"use client";

import { useState } from "react";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { zeroAddress } from "viem";
import { FACTORY_ADDRESS, FACTORY_ABI } from "@/lib/constants/contracts";

export function useCreateVault() {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function createVault(): Promise<`0x${string}` | null> {
    if (!address || !publicClient || !walletClient) {
      setError("Wallet not connected");
      return null;
    }

    setIsCreating(true);
    setError(null);

    try {
      // Step 1: Check if vault already exists
      let vaultAddr = (await publicClient.readContract({
        address: FACTORY_ADDRESS,
        abi: FACTORY_ABI,
        functionName: "getVault",
        args: [address],
      })) as `0x${string}`;

      // Step 2: Create vault if not yet deployed
      if (vaultAddr === zeroAddress) {
        const hash = await walletClient.writeContract({
          address: FACTORY_ADDRESS,
          abi: FACTORY_ABI,
          functionName: "createVault",
        });
        await publicClient.waitForTransactionReceipt({ hash });

        vaultAddr = (await publicClient.readContract({
          address: FACTORY_ADDRESS,
          abi: FACTORY_ABI,
          functionName: "getVault",
          args: [address],
        })) as `0x${string}`;
      }

      return vaultAddr;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to create vault");
      return null;
    } finally {
      setIsCreating(false);
    }
  }

  return { createVault, isCreating, error };
}
