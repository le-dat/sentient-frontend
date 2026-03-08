"use client";

import { useEffect, useState } from "react";

export interface DepositToken {
  chainId: number;
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  logoURI?: string;
}

const BASE_CHAIN_ID = 8453;
const TOKEN_LIST_URL = "https://tokens.coingecko.com/base/all.json";

let cache: DepositToken[] | null = null;

export function useBaseTokenList() {
  const [tokens, setTokens] = useState<DepositToken[]>(cache ?? []);
  const [isLoading, setIsLoading] = useState(cache === null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cache !== null) return;

    fetch(TOKEN_LIST_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch token list");
        return res.json();
      })
      .then((data: { tokens: DepositToken[] }) => {
        const filtered = data.tokens.filter((t) => t.chainId === BASE_CHAIN_ID);
        cache = filtered;
        setTokens(filtered);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Could not load token list");
        setIsLoading(false);
      });
  }, []);

  return { tokens, isLoading, error };
}
