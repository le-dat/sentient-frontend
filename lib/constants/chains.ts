import type { ChainInfo } from "@/features/dashboard/types";

/** Static list of EVM chains supported in the UI. */
export const SUPPORTED_CHAINS: ChainInfo[] = [
  {
    id: 84532,
    name: "Base Sepolia",
    symbol: "ETH",
    color: "#A855F7",
    vaultCount: 0,
    enabled: true,
  },
  { id: 8453, name: "Base", symbol: "ETH", color: "#0052FF", vaultCount: 0, enabled: false },
  { id: 1, name: "Ethereum", symbol: "ETH", color: "#627EEA", vaultCount: 0, enabled: false },
  { id: 42161, name: "Arbitrum", symbol: "ETH", color: "#12AAFF", vaultCount: 0, enabled: false },
];

/** Chain where the vault factory is deployed. */
export const FACTORY_CHAIN = SUPPORTED_CHAINS.find((c) => c.id === 84532)!; // Base Sepolia

/** Named chain IDs — single source of truth for all numeric chain ID references. */
export const BASE_CHAIN_ID = SUPPORTED_CHAINS[1].id; // 8453
export const ETH_CHAIN_ID = SUPPORTED_CHAINS[2].id; // 1
export const ARBITRUM_CHAIN_ID = SUPPORTED_CHAINS[3].id; // 42161
export const ETH_SEPOLIA_CHAIN_ID = 11155111; // Ethereum Sepolia (CCIP destination)
