export const CHAIN_NAMES: Record<number, string> = {
  84532: "Base Sepolia",
  11155111: "Ethereum Sepolia",
};

export function getChainName(chainId: number): string {
  return CHAIN_NAMES[chainId] ?? `Chain ${chainId}`;
}

export const CCIP_ROUTERS: Record<number, `0x${string}`> = {
  84532: "0xD3b06cEbF099CE7DA4AcCf578aaebFDBd6e88a93" as `0x${string}`,
  11155111: "0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59" as `0x${string}`,
};

export const CCIP_CHAIN_SELECTORS: Record<string, bigint> = {
  ethereum_sepolia: 16015286601757825753n,
  arbitrum_sepolia: 3478487238524512106n,
  op_sepolia: 5224473277236331295n,
  bnb_chain_testnet: 13264668187771770619n,
};

export const BASE_SEPOLIA_USDC = "0x036CbD53842c5426634e7929541eC2318f3dCF7e" as `0x${string}`;

export const CCIP_BNM_BASE_SEPOLIA = "0x88a2d74f47a237a62e7a51cdda67270ce381555e" as `0x${string}`;
