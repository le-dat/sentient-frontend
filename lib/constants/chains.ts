import type { ChainInfo } from "@/lib/types/dashboard";

/** Static list of EVM chains supported in the UI. */
export const SUPPORTED_CHAINS: ChainInfo[] = [
  { id: 84532,  name: "Base Sepolia", symbol: "ETH", color: "#A855F7", vaultCount: 0, enabled: true  },
  { id: 8453,   name: "Base",         symbol: "ETH", color: "#0052FF", vaultCount: 0, enabled: false },
  { id: 1,      name: "Ethereum",     symbol: "ETH", color: "#627EEA", vaultCount: 0, enabled: false },
  { id: 42161,  name: "Arbitrum",     symbol: "ETH", color: "#12AAFF", vaultCount: 0, enabled: false },
];

/** Chain where the vault factory is deployed. */
export const FACTORY_CHAIN = SUPPORTED_CHAINS[0]; // Base Sepolia
