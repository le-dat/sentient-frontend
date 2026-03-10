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
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "bool", name: "enabled", type: "bool" },
      { internalType: "uint256", name: "buyThreshold", type: "uint256" },
      { internalType: "uint256", name: "sellThreshold", type: "uint256" },
      { internalType: "uint256", name: "tradeAmount", type: "uint256" },
      { internalType: "address", name: "baseToken", type: "address" },
    ],
    name: "setTokenRule",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "address", name: "priceFeed", type: "address" },
    ],
    name: "setPriceFeed",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "priceFeeds",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "getTokenRule",
    outputs: [
      {
        internalType: "tuple",
        name: "",
        type: "tuple",
        components: [
          { internalType: "bool", name: "enabled", type: "bool" },
          { internalType: "uint256", name: "buyThreshold", type: "uint256" },
          { internalType: "uint256", name: "sellThreshold", type: "uint256" },
          { internalType: "uint256", name: "lastExecuted", type: "uint256" },
          { internalType: "uint256", name: "tradeAmount", type: "uint256" },
          { internalType: "address", name: "baseToken", type: "address" },
        ],
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export const VAULT_HISTORY_ABI = [
  {
    name: "TokenDeposited",
    type: "event",
    inputs: [
      { name: "token", type: "address", indexed: true },
      { name: "amount", type: "uint256", indexed: false },
    ],
  },
  {
    name: "TokenWithdrawn",
    type: "event",
    inputs: [
      { name: "token", type: "address", indexed: true },
      { name: "amount", type: "uint256", indexed: false },
    ],
  },
  {
    name: "SwapExecuted",
    type: "event",
    inputs: [
      { name: "tokenIn", type: "address", indexed: true },
      { name: "tokenOut", type: "address", indexed: true },
      { name: "amountIn", type: "uint256", indexed: false },
      { name: "amountOut", type: "uint256", indexed: false },
      { name: "priceUsed", type: "uint256", indexed: false },
    ],
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
