"use client";

import { FACTORY_CHAIN } from "@/lib/constants/chains";
import { TOKEN_DATA } from "@/lib/constants/tokens";

export interface DepositToken {
  chainId: number;
  address: string;
  symbol: string;
  name: string;
  decimals: number;
}

export const BASE_TOKENS: DepositToken[] = Object.values(TOKEN_DATA).map((t) => ({
  chainId: FACTORY_CHAIN.id,
  address: t.address,
  symbol: t.symbol,
  name: t.name,
  decimals: t.decimals,
}));

export function useBaseTokenList() {
  return { tokens: BASE_TOKENS, isLoading: false, error: null };
}
