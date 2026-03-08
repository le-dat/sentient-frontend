// ── Base Sepolia contract addresses ─────────────────────────────────────────
export const FACTORY_ADDRESS =
  "0xb66507Fe3a9940A25BA2D98ad8637F7993F768Ba" as const;

// ── Known ERC-20 tokens on Base Sepolia ──────────────────────────────────────
export const VAULT_TOKENS = [
  { symbol: "USDC", address: "0x036CbD53842c5426634e7929541eC2318f3dCF7e" as `0x${string}`, decimals: 6 },
  { symbol: "WETH", address: "0x4200000000000000000000000000000000000006" as `0x${string}`, decimals: 18 },
  { symbol: "LINK", address: "0xE4aB69C077896252FAFBD49EFD26B5D171A32410" as `0x${string}`, decimals: 18 },
] as const;

// ── ABIs ─────────────────────────────────────────────────────────────────────
export const ERC20_ABI = [
  {
    name: "balanceOf",
    type: "function",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
] as const;

export const FACTORY_ABI = [
  {
    name: "createVault",
    type: "function",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
    stateMutability: "nonpayable",
  },
  {
    name: "getVault",
    type: "function",
    inputs: [{ name: "user", type: "address" }],
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
  },
] as const;
