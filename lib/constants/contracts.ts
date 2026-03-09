export const FACTORY_ADDRESS =
  "0xb66507Fe3a9940A25BA2D98ad8637F7993F768Ba" as const;

export const VAULT_TOKENS = [
  {
    symbol: "USDC",
    address: "0x036CbD53842c5426634e7929541eC2318f3dCF7e" as `0x${string}`,
    decimals: 6,
  },
  {
    symbol: "WETH",
    address: "0x4200000000000000000000000000000000000006" as `0x${string}`,
    decimals: 18,
  },
  {
    symbol: "LINK",
    address: "0xE4aB69C077896252FAFBD49EFD26B5D171A32410" as `0x${string}`,
    decimals: 18,
  },
  {
    symbol: "CCIP",
    address: "0x88A2d74F47a237a62e7A51cdDa67270CE381555e" as `0x${string}`,
    decimals: 18,
  },
  {
    symbol: "ETH",
    address: "0x0000000000000000000000000000000000000000" as `0x${string}`,
    decimals: 18,
  },
] as const;

export const ERC20_ABI = [
  {
    name: "balanceOf",
    type: "function",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    name: "allowance",
    type: "function",
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    name: "approve",
    type: "function",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "nonpayable",
  },
] as const;

export const VAULT_ABI = [
  {
    name: "deposit",
    type: "function",
    inputs: [
      { name: "token", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "deposit",
    type: "function",
    inputs: [],
    outputs: [],
    stateMutability: "payable",
  },
  {
    name: "getBalance",
    type: "function",
    inputs: [{ name: "token", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    name: "withdraw",
    type: "function",
    inputs: [
      { name: "token", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
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
