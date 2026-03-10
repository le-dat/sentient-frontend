import {
  FACTORY_CHAIN,
  BASE_CHAIN_ID,
  ETH_CHAIN_ID,
  ETH_SEPOLIA_CHAIN_ID,
  ARBITRUM_CHAIN_ID,
} from "@/lib/constants/chains";

/** Block explorer base URLs keyed by chain ID. */
export const EXPLORER_BASE: Record<number, string> = {
  [FACTORY_CHAIN.id]:     "https://sepolia.basescan.org",
  [BASE_CHAIN_ID]:        "https://basescan.org",
  [ETH_CHAIN_ID]:         "https://etherscan.io",
  [ETH_SEPOLIA_CHAIN_ID]: "https://sepolia.etherscan.io",
  [ARBITRUM_CHAIN_ID]:    "https://arbiscan.io",
};

/** Fallback explorer when chain is not mapped. */
export const EXPLORER_FALLBACK = "https://etherscan.io";

/** Chainlink CCIP Explorer — used to view cross-chain tx history per address. */
export const CCIP_EXPLORER_BASE = "https://ccip.chain.link";

/** Minimum ETH deposit to vault for CCIP fee when fee estimate is unavailable. */
export const CCIP_MIN_ETH_FALLBACK = "0.003";
