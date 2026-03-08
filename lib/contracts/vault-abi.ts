export const VAULT_CCIP_ABI = [
  {
    inputs: [],
    name: "ccipRouter",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_ccipRouter", type: "address" }],
    name: "setCCIPConfig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint64", name: "destinationChainSelector", type: "uint64" },
      { internalType: "address", name: "receiver", type: "address" },
      { internalType: "address", name: "tokenToShield", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "emergencyShield",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "getBalance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const;

export const CCIP_BNM_ABI = [
  {
    inputs: [{ internalType: "address", name: "to", type: "address" }],
    name: "drip",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
