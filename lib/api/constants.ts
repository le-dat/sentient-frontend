import { FACTORY_CHAIN, ETH_SEPOLIA_CHAIN_ID } from "@/lib/constants/chains";

export const CHAIN_NAMES: Record<number, string> = {
  [FACTORY_CHAIN.id]: "Base Sepolia",
  [ETH_SEPOLIA_CHAIN_ID]: "Ethereum Sepolia",
};

export function getChainName(chainId: number): string {
  return CHAIN_NAMES[chainId] ?? `Chain ${chainId}`;
}
