/**
 * Chain ID to display name mapping.
 * Aligned with backend CHAIN_BASE_SEPOLIA_ID (84532) and common chains.
 */
export const CHAIN_NAMES: Record<number, string> = {
  84532: "Base Sepolia",
};

export function getChainName(chainId: number): string {
  return CHAIN_NAMES[chainId] ?? `Chain ${chainId}`;
}
