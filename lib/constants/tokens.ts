export const TOKEN_DEFINITIONS = [
  {
    symbol: "ETH",
    name: "Ether",
    address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    decimals: 18,
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    address: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
    decimals: 6,
  },
  {
    symbol: "WETH",
    name: "Wrapped Ether",
    address: "0x4200000000000000000000000000000000000006",
    decimals: 18,
  },
  {
    symbol: "LINK",
    name: "ChainLink Token",
    address: "0xE4aB69C077896252FAFBD49EFD26B5D171A32410",
    decimals: 18,
  },
  {
    symbol: "CCIP",
    name: "CCIP-BnM",
    address: "0x88A2d74F47a237a62e7A51cdDa67270CE381555e",
    decimals: 18,
  },
] as const satisfies readonly { symbol: string; name: string; address: string; decimals: number }[];

export type TokenSymbol = (typeof TOKEN_DEFINITIONS)[number]["symbol"];

/** Symbol-keyed map (used by hooks that do address/decimals lookups). */
export const TOKEN_DATA = Object.fromEntries(TOKEN_DEFINITIONS.map((t) => [t.symbol, t])) as Record<
  string,
  (typeof TOKEN_DEFINITIONS)[number]
>;

/** Flat array alias (used by multicall loops). */
export const VAULT_TOKENS = TOKEN_DEFINITIONS;

export const STABLE_COINS: TokenSymbol[] = ["ETH", "USDC", "WETH", "LINK", "CCIP"];

/** Sentinel address representing native ETH in token lists / deposit flows. */
export const NATIVE_ETH_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" as const;
