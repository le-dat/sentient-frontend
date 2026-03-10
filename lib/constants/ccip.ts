import { FACTORY_CHAIN, ETH_SEPOLIA_CHAIN_ID } from "@/lib/constants/chains";

export const CCIP_ROUTERS: Record<number, `0x${string}`> = {
  [FACTORY_CHAIN.id]:     "0xD3b06cEbF099CE7DA4AcCf578aaebFDBd6e88a93" as `0x${string}`,
  [ETH_SEPOLIA_CHAIN_ID]: "0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59" as `0x${string}`,
};

export const CCIP_CHAIN_SELECTORS: Record<string, bigint> = {
  ethereum_sepolia: 16015286601757825753n,
  arbitrum_sepolia: 3478487238524512106n,
  op_sepolia: 5224473277236331295n,
  bnb_chain_testnet: 13264668187771770619n,
};

export const BASE_SEPOLIA_USDC = "0x036CbD53842c5426634e7929541eC2318f3dCF7e" as `0x${string}`;

export const CCIP_BNM_BASE_SEPOLIA = "0x88a2d74f47a237a62e7a51cdda67270ce381555e" as `0x${string}`;
