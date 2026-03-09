"use client";

import { BASE_SEPOLIA_CHAIN_ID, TOKEN_DATA } from "@/components/dashboard/vault-panel/constants";

export interface DepositToken {
  chainId: number;
  address: string;
  symbol: string;
  name: string;
  decimals: number;
}

export const BASE_TOKENS: DepositToken[] = Object.values(TOKEN_DATA).map((t) => ({
  chainId: BASE_SEPOLIA_CHAIN_ID,
  address: t.address,
  symbol: t.symbol,
  name: t.name,
  decimals: t.decimals,
}));

export function useBaseTokenList() {
  return { tokens: BASE_TOKENS, isLoading: false, error: null };
}
