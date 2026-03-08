// ── Base Sepolia contract addresses ─────────────────────────────────────────
export const FACTORY_ADDRESS =
  "0xb66507Fe3a9940A25BA2D98ad8637F7993F768Ba" as const;

// ── ABIs ─────────────────────────────────────────────────────────────────────
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
