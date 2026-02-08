# API Reference

[← Back to Overview](Claude.md)

---

## Overview

This document provides detailed API specifications for:
1. **Smart Contract API** — VaultFactory and PortfolioVault ABIs
2. **AI Engine API** — REST endpoints for market analysis
3. **The Graph Subgraph** — GraphQL queries
4. **Frontend SDK** — TypeScript library (optional)

---

## Smart Contract API

### VaultFactory

**Contract Address:**
- Ethereum: `0x1234...abcd` (TBD)
- Arbitrum: `0xabcd...1234` (TBD)
- Base: `0x9876...5432` (TBD)

**Solidity Interface:**
```solidity
interface IVaultFactory {
    /// @notice Creates a new PortfolioVault for the caller
    /// @return vault Address of the newly created vault
    function createVault() external returns (address vault);

    /// @notice Gets the vault address for a user
    /// @param user Address of the user
    /// @return vault Address of user's vault (0x0 if not created)
    function getUserVault(address user) external view returns (address vault);

    /// @notice Event emitted when a vault is created
    event VaultCreated(address indexed user, address indexed vault);
}
```

**Functions:**

#### `createVault()`

Creates a new PortfolioVault using EIP-1167 minimal proxy pattern.

- **Visibility:** `external`
- **Modifiers:** None
- **Returns:** `address` — Address of the newly created vault
- **Emits:** `VaultCreated(user, vault)`
- **Gas Cost:** ~50,000 gas

**Example (ethers.js):**
```typescript
const factory = new ethers.Contract(FACTORY_ADDRESS, FACTORY_ABI, signer);
const tx = await factory.createVault();
const receipt = await tx.wait();
const vaultAddress = receipt.events[0].args.vault;
console.log("Vault created at:", vaultAddress);
```

**Example (viem):**
```typescript
import { createWalletClient, http } from 'viem';
import { arbitrum } from 'viem/chains';

const client = createWalletClient({
  chain: arbitrum,
  transport: http(),
});

const hash = await client.writeContract({
  address: FACTORY_ADDRESS,
  abi: FACTORY_ABI,
  functionName: 'createVault',
});

const receipt = await client.waitForTransactionReceipt({ hash });
```

---

#### `getUserVault(address user)`

Returns the vault address for a given user.

- **Visibility:** `external view`
- **Parameters:**
  - `user` (address) — User address
- **Returns:** `address` — Vault address (0x0 if user hasn't created a vault)
- **Gas Cost:** ~2,000 gas (view function)

**Example:**
```typescript
const vaultAddress = await factory.getUserVault("0x1234...5678");
if (vaultAddress === ethers.constants.AddressZero) {
  console.log("User has no vault");
} else {
  console.log("User vault:", vaultAddress);
}
```

---

### PortfolioVault

**Solidity Interface:**
```solidity
interface IPortfolioVault {
    /// @notice TokenRule struct defining trading parameters
    struct TokenRule {
        address tokenIn;        // Input token address
        address tokenOut;       // Output token address
        uint256 buyThreshold;   // Price to trigger buy (USD with 8 decimals)
        uint256 sellThreshold;  // Price to trigger sell
        uint256 maxTradeSize;   // Maximum trade amount
        uint256 slippageBps;    // Slippage tolerance in basis points (100 = 1%)
        uint256 cooldownPeriod; // Time between trades (seconds)
        uint256 lastExecuted;   // Timestamp of last execution
        bool enabled;           // Whether rule is active
    }

    /// @notice Initialize vault (called once by factory)
    function initialize(address _owner) external;

    /// @notice Set or update a trading rule
    function setTokenRule(
        address tokenIn,
        address tokenOut,
        uint256 buyThreshold,
        uint256 sellThreshold,
        uint256 maxTradeSize,
        uint256 slippageBps,
        uint256 cooldownPeriod
    ) external;

    /// @notice Deposit tokens into vault
    function deposit(address token, uint256 amount) external;

    /// @notice Withdraw tokens from vault
    function withdraw(address token, uint256 amount) external;

    /// @notice Execute a swap (called by Chainlink CRE)
    function executeSwap(
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        address router,
        bytes calldata swapData
    ) external;

    /// @notice Pause all vault operations (emergency)
    function pause() external;

    /// @notice Unpause vault
    function unpause() external;

    /// @notice Get token rule details
    function getTokenRule(address tokenIn, address tokenOut)
        external view returns (TokenRule memory);

    /// Events
    event TokenRuleSet(
        address indexed tokenIn,
        address indexed tokenOut,
        uint256 buyThreshold,
        uint256 sellThreshold
    );

    event SwapExecuted(
        address indexed tokenIn,
        address indexed tokenOut,
        uint256 amountIn,
        uint256 amountOut,
        uint256 timestamp
    );

    event Deposit(address indexed token, uint256 amount, address indexed from);
    event Withdrawal(address indexed token, uint256 amount, address indexed to);
    event Paused(address indexed owner);
    event Unpaused(address indexed owner);
}
```

---

**Function Details:**

#### `setTokenRule(...)`

Sets or updates a trading rule for a token pair.

- **Visibility:** `external`
- **Modifiers:** `onlyOwner`
- **Parameters:**
  - `tokenIn` (address) — Input token (e.g., USDC)
  - `tokenOut` (address) — Output token (e.g., WETH)
  - `buyThreshold` (uint256) — Price in USD (8 decimals) to trigger buy
  - `sellThreshold` (uint256) — Price in USD to trigger sell
  - `maxTradeSize` (uint256) — Max amount per trade (in tokenIn decimals)
  - `slippageBps` (uint256) — Slippage tolerance (100 = 1%)
  - `cooldownPeriod` (uint256) — Seconds between trades
- **Emits:** `TokenRuleSet(...)`
- **Gas Cost:** ~50,000 gas

**Example:**
```typescript
const vault = new ethers.Contract(VAULT_ADDRESS, VAULT_ABI, signer);

await vault.setTokenRule(
  USDC_ADDRESS,          // tokenIn
  WETH_ADDRESS,          // tokenOut
  275000000000,          // buyThreshold: $2,750 (8 decimals)
  325000000000,          // sellThreshold: $3,250
  ethers.utils.parseUnits("1000", 6),  // maxTradeSize: 1000 USDC
  100,                   // slippageBps: 1%
  86400                  // cooldownPeriod: 24 hours
);
```

---

#### `deposit(address token, uint256 amount)`

Deposits tokens into the vault.

- **Visibility:** `external`
- **Modifiers:** `nonReentrant`
- **Parameters:**
  - `token` (address) — Token to deposit
  - `amount` (uint256) — Amount to deposit
- **Prerequisites:** User must approve vault to spend tokens
- **Emits:** `Deposit(token, amount, msg.sender)`
- **Gas Cost:** ~60,000 gas

**Example:**
```typescript
// Step 1: Approve
const usdc = new ethers.Contract(USDC_ADDRESS, ERC20_ABI, signer);
await usdc.approve(VAULT_ADDRESS, ethers.utils.parseUnits("1000", 6));

// Step 2: Deposit
const vault = new ethers.Contract(VAULT_ADDRESS, VAULT_ABI, signer);
await vault.deposit(USDC_ADDRESS, ethers.utils.parseUnits("1000", 6));
```

---

#### `executeSwap(...)`

Executes a swap according to trading rules. **Only callable by Chainlink CRE executor.**

- **Visibility:** `external`
- **Modifiers:** `onlyExecutor`, `nonReentrant`, `whenNotPaused`
- **Parameters:**
  - `tokenIn` (address)
  - `tokenOut` (address)
  - `amountIn` (uint256)
  - `router` (address) — DEX router address (must be in allowlist)
  - `swapData` (bytes) — Encoded swap calldata
- **Validations:**
  - Rule exists and enabled
  - Cooldown period passed
  - Amount ≤ maxTradeSize
  - Slippage within tolerance
  - Router in allowlist
- **Emits:** `SwapExecuted(...)`
- **Gas Cost:** ~150,000 - 300,000 gas (varies by DEX)

**Example (internal call, not user-facing):**
```solidity
// Called by Chainlink CRE
vault.executeSwap(
    USDC_ADDRESS,
    WETH_ADDRESS,
    1000e6,  // 1000 USDC
    UNISWAP_ROUTER,
    abi.encodeWithSelector(
        ISwapRouter.exactInputSingle.selector,
        SwapParams(...)
    )
);
```

---

## AI Engine API

<!-- API not deployed yet -->

### Planned Endpoints

#### `GET /health`

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "version": "1.0.0",
  "timestamp": "2026-02-08T12:34:56Z"
}
```

---

#### `POST /analyze`

Get market analysis for a token.

**Request:**
```json
{
  "token": "ETH/USD",
  "period": "90d"  // Optional: 7d, 30d, 90d, 180d (default: 90d)
}
```

**Response:**
```json
{
  "token": "ETH/USD",
  "currentPrice": 2845.32,
  "volatility": {
    "7d": 0.42,
    "30d": 0.38,
    "regime": "moderate"
  },
  "trend": {
    "direction": "bullish",
    "strength": 0.68,
    "indicators": {
      "ma50": 2720,
      "ma200": 2450,
      "rsi": 62,
      "macd": "positive"
    }
  },
  "supportResistance": {
    "support": [2750, 2680, 2600],
    "resistance": [2900, 2980, 3100]
  },
  "timestamp": "2026-02-08T12:34:56Z"
}
```

**Status Codes:**
- `200` — Success
- `400` — Invalid token or period
- `429` — Rate limit exceeded
- `500` — Internal server error

---

#### `POST /optimize`

Get threshold optimization recommendations.

**Request:**
```json
{
  "token": "ETH/USD",
  "riskTolerance": "moderate",  // conservative, moderate, aggressive
  "currentHoldings": {
    "ETH": 10.5,
    "USDC": 5000
  }
}
```

**Response:**
```json
{
  "token": "ETH/USD",
  "currentPrice": 2845.32,
  "riskTolerance": "moderate",
  "recommendations": [
    {
      "strategy": "Mean Reversion",
      "buyThreshold": 2560,
      "sellThreshold": 3190,
      "backtestResults": {
        "period": "90d",
        "totalReturn": 32.5,
        "sharpeRatio": 1.84,
        "maxDrawdown": -18.2,
        "winRate": 0.67,
        "numTrades": 12
      },
      "confidence": 0.82
    },
    {
      "strategy": "Trend Following",
      "buyThreshold": 2680,
      "sellThreshold": 3100,
      "backtestResults": {
        "period": "90d",
        "totalReturn": 28.1,
        "sharpeRatio": 1.62,
        "maxDrawdown": -22.4,
        "winRate": 0.58,
        "numTrades": 18
      },
      "confidence": 0.75
    }
  ],
  "timestamp": "2026-02-08T12:34:56Z"
}
```

**Status Codes:**
- `200` — Success
- `400` — Invalid parameters
- `429` — Rate limit exceeded

---

#### `POST /risk`

Get portfolio risk assessment.

**Request:**
```json
{
  "holdings": {
    "ETH": 10.5,
    "BTC": 0.5,
    "USDC": 5000
  },
  "prices": {
    "ETH/USD": 2845.32,
    "BTC/USD": 48234.56,
    "USDC/USD": 1.0
  }
}
```

**Response:**
```json
{
  "portfolioValue": 50123.45,
  "riskScore": 6.2,
  "riskLevel": "caution",
  "alerts": [
    {
      "type": "concentration",
      "severity": "medium",
      "message": "ETH represents 62% of portfolio",
      "recommendation": "Consider diversifying to <50%"
    },
    {
      "type": "volatility",
      "severity": "low",
      "message": "ETH volatility increased 1.8x in last 7 days",
      "recommendation": "Consider widening slippage to 2%"
    }
  ],
  "timestamp": "2026-02-08T12:34:56Z"
}
```

---

## The Graph Subgraph

<!-- Subgraph not deployed yet -->

### Planned Schema

```graphql
type Vault @entity {
  id: ID!                      # Vault address
  owner: Bytes!                # Owner address
  createdAt: BigInt!           # Block timestamp
  totalDeposits: BigInt!       # Total deposits (USD value)
  totalWithdrawals: BigInt!    # Total withdrawals
  swaps: [Swap!]! @derivedFrom(field: "vault")
  rules: [TokenRule!]! @derivedFrom(field: "vault")
}

type Swap @entity {
  id: ID!                      # Transaction hash + log index
  vault: Vault!
  tokenIn: Bytes!
  tokenOut: Bytes!
  amountIn: BigInt!
  amountOut: BigInt!
  timestamp: BigInt!
  gasUsed: BigInt!
}

type TokenRule @entity {
  id: ID!                      # Vault address + tokenIn + tokenOut
  vault: Vault!
  tokenIn: Bytes!
  tokenOut: Bytes!
  buyThreshold: BigInt!
  sellThreshold: BigInt!
  maxTradeSize: BigInt!
  slippageBps: BigInt!
  cooldownPeriod: BigInt!
  enabled: Boolean!
  createdAt: BigInt!
  updatedAt: BigInt!
}
```

---

### Queries

#### Get User Vaults

```graphql
query GetUserVaults($owner: Bytes!) {
  vaults(where: { owner: $owner }) {
    id
    owner
    createdAt
    totalDeposits
    swaps {
      id
      tokenIn
      tokenOut
      amountIn
      amountOut
      timestamp
    }
    rules {
      tokenIn
      tokenOut
      buyThreshold
      sellThreshold
      enabled
    }
  }
}
```

**Variables:**
```json
{
  "owner": "0x1234567890abcdef1234567890abcdef12345678"
}
```

---

#### Get Vault Swaps

```graphql
query GetVaultSwaps($vaultId: ID!, $first: Int!, $skip: Int!) {
  swaps(
    where: { vault: $vaultId }
    first: $first
    skip: $skip
    orderBy: timestamp
    orderDirection: desc
  ) {
    id
    tokenIn
    tokenOut
    amountIn
    amountOut
    timestamp
    gasUsed
  }
}
```

**Variables:**
```json
{
  "vaultId": "0xabcdef1234567890abcdef1234567890abcdef12",
  "first": 50,
  "skip": 0
}
```

---

#### Get All Vaults (Paginated)

```graphql
query GetAllVaults($first: Int!, $skip: Int!) {
  vaults(
    first: $first
    skip: $skip
    orderBy: createdAt
    orderDirection: desc
  ) {
    id
    owner
    createdAt
    totalDeposits
  }
}
```

---

## Frontend SDK (TypeScript)

<!-- SDK not published yet -->

### Planned Usage

#### Initialize SDK (Planned)

```typescript
// SDK not available yet
import { SentientSDK } from '@sentient-fi/sdk';
import { createPublicClient, http } from 'viem';
import { arbitrum } from 'viem/chains';

const publicClient = createPublicClient({
  chain: arbitrum,
  transport: http(),
});

const sdk = new SentientSDK({
  client: publicClient,
  factoryAddress: '0xabcd...1234',
});
```

---

#### Create Vault

```typescript
import { createWalletClient, custom } from 'viem';

const walletClient = createWalletClient({
  chain: arbitrum,
  transport: custom(window.ethereum),
});

const vaultAddress = await sdk.createVault(walletClient);
console.log("Vault created:", vaultAddress);
```

---

#### Set Rule

```typescript
await sdk.setRule(walletClient, vaultAddress, {
  tokenIn: '0xUSDC',
  tokenOut: '0xWETH',
  buyThreshold: 2750,   // USD
  sellThreshold: 3250,
  maxTradeSize: 1000,   // USDC
  slippageBps: 100,     // 1%
  cooldownPeriod: 86400, // 24h
});
```

---

#### Get Portfolio

```typescript
const portfolio = await sdk.getPortfolio(userAddress);

console.log(portfolio);
// {
//   totalValue: 50342.18,
//   vaults: [
//     { chain: 'ethereum', address: '0x...', value: 30000 },
//     { chain: 'arbitrum', address: '0x...', value: 15000 },
//     { chain: 'base', address: '0x...', value: 5342.18 }
//   ]
// }
```

---

## Error Codes

### Smart Contract Errors

| Error | Description |
|-------|-------------|
| `Unauthorized` | Caller is not owner or executor |
| `RuleNotFound` | No rule exists for token pair |
| `CooldownNotPassed` | Cooldown period not elapsed |
| `ExceedsMaxTradeSize` | Trade amount exceeds limit |
| `SlippageTooHigh` | Price slippage exceeds tolerance |
| `RouterNotAllowed` | Router address not in allowlist |
| `InsufficientBalance` | Vault has insufficient token balance |
| `Paused` | Vault is paused |

---

### API Errors

| Status Code | Error | Description |
|-------------|-------|-------------|
| `400` | `INVALID_TOKEN` | Token pair not supported |
| `400` | `INVALID_RISK_TOLERANCE` | Must be conservative, moderate, or aggressive |
| `429` | `RATE_LIMIT_EXCEEDED` | Too many requests (limit: 100/min) |
| `500` | `INTERNAL_ERROR` | Server error |

---

## Rate Limits

| Endpoint | Limit |
|----------|-------|
| `/analyze` | 100 requests/min |
| `/optimize` | 50 requests/min |
| `/risk` | 100 requests/min |

**Exceeded limit?** Response:
```json
{
  "error": "RATE_LIMIT_EXCEEDED",
  "message": "Too many requests. Try again in 42 seconds.",
  "retryAfter": 42
}
```

---

## Related Documentation

- [Smart Contracts](02-smart-contracts.md) — Detailed contract specifications
- [AI Engine](04-ai-engine.md) — AI engine architecture
- [Frontend](06-frontend.md) — How frontend uses these APIs
- [Development](09-development.md) — Local development setup

**Build with confidence! 📚**
