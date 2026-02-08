# Smart Contracts

[← Back to Overview](Claude.md)

---

## Overview

Sentient Finance uses two main smart contracts:
1. **VaultFactory** — Deploys personal vaults for users (EIP-1167 minimal proxy pattern)
2. **PortfolioVault** — Individual vault for asset management with on-chain rule enforcement

**Deployment Pattern:** EIP-1167 minimal proxy for gas-efficient vault deployment (~100k gas vs ~1M gas)

---

## VaultFactory

### Purpose
Creates personal vaults for users using the minimal proxy pattern (EIP-1167). Each user gets one vault per chain.

### State Variables
```solidity
address public immutable vaultImplementation;  // PortfolioVault implementation address
mapping(address => address) public userVaults; // user → vault address
address public executor;                       // Chainlink CRE executor
```

### Functions

#### `createVault()`
```solidity
function createVault() external returns (address vault)
```
- **Description:** Creates a personal vault for the caller using EIP-1167 clone
- **Access:** Public (anyone can create)
- **Gas Cost:** ~100,000 gas
- **Returns:** Address of newly created vault
- **Emits:** `VaultCreated(user, vault)`
- **Reverts if:** User already has a vault

**Steps:**
1. Check user doesn't have vault
2. Clone implementation contract
3. Initialize clone with user as owner
4. Store in `userVaults` mapping
5. Emit event

#### `getUserVault(address user)`
```solidity
function getUserVault(address user) external view returns (address)
```
- **Description:** Returns vault address for given user
- **Returns:** Vault address or `address(0)` if none exists
- **Gas Cost:** ~2,000 gas (view function)

### Events

#### `VaultCreated`
```solidity
event VaultCreated(address indexed user, address indexed vault);
```
- **Emitted when:** User successfully creates a new vault
- **Parameters:**
  - `user`: Address of vault owner
  - `vault`: Address of created vault

### Deployment Steps

1. Deploy PortfolioVault implementation contract (once per chain)
2. Deploy VaultFactory with implementation address
3. Set CRE executor address
4. Verify contract on block explorer

---

## PortfolioVault

### Purpose
Individual vault for each user to hold assets and execute automated trades based on on-chain rules.

### State Variables

```solidity
address public owner;                                   // Vault owner (user)
address public executor;                                // Chainlink CRE (can execute swaps)
bool public paused;                                     // Emergency pause flag
mapping(address => TokenRule) public tokenRules;        // Token → trading rule
mapping(address => bool) public isRouterAllowed;        // Allowed DEX routers
uint256 public constant COOLDOWN_PERIOD = 5 minutes;    // Cooldown between trades
uint256 public constant MAX_SLIPPAGE = 50;              // 0.5% = 50 basis points
```

### TokenRule Struct

```solidity
struct TokenRule {
    bool enabled;              // Rule active/inactive
    uint256 buyThreshold;      // USD price to trigger buy (18 decimals)
    uint256 sellThreshold;     // USD price to trigger sell (18 decimals)
    uint256 maxTradeAmount;    // Max tokens per trade
    uint256 lastTradeTime;     // Timestamp of last trade (for cooldown)
}
```

**Example:**
```solidity
TokenRule({
    enabled: true,
    buyThreshold: 2700 * 1e18,  // Buy at $2,700
    sellThreshold: 3000 * 1e18, // Sell at $3,000
    maxTradeAmount: 10 * 1e18,  // Max 10 ETH per trade
    lastTradeTime: 1704067200   // Unix timestamp
})
```

---

## Key Functions

### Owner-Only Functions

#### `initialize(address _owner, address _executor)`
```solidity
function initialize(address _owner, address _executor) external
```
- **Description:** Initialize vault (called by factory once)
- **Access:** Factory only (via initializer pattern)
- **Parameters:**
  - `_owner`: User address (vault owner)
  - `_executor`: Chainlink CRE address

#### `setTokenRule(address token, TokenRule calldata rule)`
```solidity
function setTokenRule(address token, TokenRule calldata rule) external onlyOwner
```
- **Description:** Set or update trading rule for a token
- **Access:** Owner only
- **Gas Cost:** ~80,000 gas
- **Emits:** `TokenRuleSet(token, rule)`

**Validation:**
- `buyThreshold < sellThreshold` (buy must be lower than sell)
- `maxTradeAmount > 0` (must allow some trading)

#### `deposit(address token, uint256 amount)`
```solidity
function deposit(address token, uint256 amount) external payable
```
- **Description:** Deposit tokens into vault
- **Access:** Anyone (but funds come from msg.sender)
- **Gas Cost:** ~50,000 gas (ETH), ~80,000 gas (ERC-20)
- **Emits:** `Deposit(token, amount)`
- **Note:** Requires ERC-20 approval if depositing tokens

#### `withdraw(address token, uint256 amount)`
```solidity
function withdraw(address token, uint256 amount) external onlyOwner
```
- **Description:** Withdraw tokens from vault
- **Access:** Owner only
- **Gas Cost:** ~50,000 gas
- **Emits:** `Withdrawal(token, amount)`
- **Note:** Can withdraw anytime (even when paused)

#### `setAllowedRouter(address router, bool allowed)`
```solidity
function setAllowedRouter(address router, bool allowed) external onlyOwner
```
- **Description:** Add/remove allowed DEX router
- **Access:** Owner only
- **Default Allowed:** Uniswap V3, 1inch (set during initialization)

#### `pause() / unpause()`
```solidity
function pause() external onlyOwner
function unpause() external onlyOwner
```
- **Description:** Emergency pause/unpause vault
- **Effect:** When paused, `executeSwap()` reverts (but withdraw still works)
- **Use case:** Emergency stop during market anomaly or suspected oracle issue

---

### Executor-Only Functions

#### `executeSwap(...)`
```solidity
function executeSwap(
    address tokenIn,
    address tokenOut,
    uint256 amountIn,
    uint256 minAmountOut,
    address router,
    bytes calldata swapData
) external onlyExecutor whenNotPaused
```

**Description:** Execute swap via DEX router (Chainlink CRE only)

**Access:** Executor (CRE) only

**Parameters:**
- `tokenIn`: Token to sell
- `tokenOut`: Token to buy
- `amountIn`: Amount to swap
- `minAmountOut`: Minimum output (slippage protection)
- `router`: DEX router address
- `swapData`: Encoded swap calldata

**Validation (all must pass):**
1. ✅ Rule enabled: `tokenRules[tokenIn].enabled == true`
2. ✅ Threshold met: `currentPrice <= buyThreshold` OR `currentPrice >= sellThreshold`
3. ✅ Cooldown expired: `block.timestamp - lastTradeTime > COOLDOWN_PERIOD`
4. ✅ Amount valid: `amountIn <= maxTradeAmount`
5. ✅ Router allowed: `isRouterAllowed[router] == true`
6. ✅ Slippage OK: `minAmountOut >= expectedOut * (10000 - MAX_SLIPPAGE) / 10000`
7. ✅ Vault not paused

**Flow:**
1. Validate all conditions
2. Approve tokenIn to router
3. Execute swap via router
4. Update `lastTradeTime`
5. Emit `SwapExecuted` event

**Gas Cost:** ~200,000-300,000 gas (depends on DEX)

**Reverts if:** Any validation fails

**Emits:** `SwapExecuted(tokenIn, tokenOut, amountIn, amountOut, timestamp)`

---

## Events

### `TokenRuleSet`
```solidity
event TokenRuleSet(address indexed token, TokenRule rule);
```
- **When:** User sets or updates a trading rule

### `SwapExecuted`
```solidity
event SwapExecuted(
    address indexed tokenIn,
    address indexed tokenOut,
    uint256 amountIn,
    uint256 amountOut,
    uint256 timestamp
);
```
- **When:** CRE successfully executes a swap

### `Deposit / Withdrawal`
```solidity
event Deposit(address indexed token, uint256 amount);
event Withdrawal(address indexed token, uint256 amount);
```
- **When:** User deposits or withdraws tokens

### `Paused / Unpaused`
```solidity
event Paused();
event Unpaused();
```
- **When:** Owner pauses or unpauses vault

---

## Security Features

### 1. Rule Enforcement
All rules enforced on-chain in `executeSwap()`:
- Buy/sell thresholds
- Max trade amount
- Cooldown period
- Slippage limit
- Router allowlist

**Result:** Executor cannot bypass rules; all constraints are immutable once set.

### 2. Access Control

**Owner can:**
- Set trading rules
- Deposit/withdraw funds
- Pause/unpause vault
- Manage router allowlist

**Executor (CRE) can:**
- Execute swaps ONLY when rules are met

**Executor CANNOT:**
- Withdraw funds
- Change rules
- Transfer ownership
- Pause vault

### 3. Cooldown Period
Prevents rapid-fire execution:
- Minimum 5 minutes between trades for same token
- Protects against DoS attacks
- Reduces gas costs

### 4. Slippage Protection
Max 0.5% slippage:
- Protects against MEV sandwich attacks
- Ensures reasonable execution price
- `minAmountOut` must be within slippage limit

### 5. Router Allowlist
Only trusted DEX routers:
- Uniswap V3 (default)
- 1inch Aggregator (default)
- Owner can add custom routers (advanced)

**Warning:** Only add audited, trusted routers.

### 6. Emergency Pause
Owner can pause vault anytime:
- Stops all swap execution
- Useful during market anomalies or oracle issues
- Withdraw still works (funds never locked)

---

## Gas Optimization

### EIP-1167 Minimal Proxy
- **Deployment:** ~100k gas (vs ~1M for full contract)
- **Savings:** 90% reduction in deployment cost
- **Trade-off:** Slight increase in call gas (~2.6k extra per call)

### Packed Storage
- Group related variables in same slot
- Minimize SSTORE operations

### L2 Deployment
- Arbitrum: ~$0.10-0.50 per swap
- Base: ~$0.05-0.30 per swap
- Ethereum: ~$6-9 per swap (at 30 gwei)

---

## Contract Interaction Examples

### Example 1: User Creates Vault
```solidity
// 1. User calls VaultFactory
VaultFactory factory = VaultFactory(FACTORY_ADDRESS);
address vaultAddress = factory.createVault();

// 2. Vault is created and initialized
// 3. User receives vault address
```

### Example 2: User Sets Rule
```solidity
// 1. User creates rule
TokenRule memory rule = TokenRule({
    enabled: true,
    buyThreshold: 2700 * 1e18,   // $2,700
    sellThreshold: 3000 * 1e18,  // $3,000
    maxTradeAmount: 10 * 1e18,   // 10 ETH
    lastTradeTime: 0
});

// 2. User calls vault
PortfolioVault vault = PortfolioVault(VAULT_ADDRESS);
vault.setTokenRule(ETH_ADDRESS, rule);
```

### Example 3: CRE Executes Swap
```solidity
// 1. CRE monitors price: ETH = $2,695 (below buyThreshold $2,700)
// 2. CRE prepares swap data
bytes memory swapData = abi.encodeWithSelector(
    ISwapRouter.exactInputSingle.selector,
    SwapRouter.ExactInputSingleParams({
        tokenIn: USDC,
        tokenOut: ETH,
        fee: 3000,
        recipient: VAULT_ADDRESS,
        deadline: block.timestamp + 300,
        amountIn: 2700 * 1e6,  // 2,700 USDC
        amountOutMinimum: 0.98 * 1e18,
        sqrtPriceLimitX96: 0
    })
);

// 3. CRE calls vault.executeSwap()
vault.executeSwap(USDC, ETH, 2700 * 1e6, 0.98 * 1e18, UNISWAP_ROUTER, swapData);

// 4. Vault validates rules → executes swap → emits event
```

---

## Testing

### Unit Tests
- Test each function in isolation
- Mock dependencies (price feeds, routers)
- Test edge cases (zero amounts, invalid addresses)

### Integration Tests
- Test full flow: create vault → set rule → execute swap
- Test access control (owner vs executor)
- Test pause/unpause

### Fuzz Testing
- Random inputs for rule validation
- Test slippage calculations
- Test cooldown logic

### Gas Benchmarks
- Measure gas for each function
- Compare EIP-1167 vs full deployment
- Optimize hot paths

---

## Audit & Verification

### OpenZeppelin Audit (Planned Q2 2026)
- Full security audit of VaultFactory and PortfolioVault
- Public report on GitHub
- Bug fixes before mainnet launch

### Bug Bounty (Immunefi)
- Up to $50,000 rewards
- Scope: Smart contracts, CRE workflows
- Launch: Q2 2026

### Contract Verification
- **Ethereum:** Etherscan
- **Arbitrum:** Arbiscan
- **Base:** Basescan
- **Source code:** Public on GitHub

---

## Related Documentation

- [Architecture](01-architecture.md) — System design overview
- [Automation (CRE)](03-automation-cre.md) — How CRE executes trades
- [Multi-Chain](05-multi-chain.md) — Deployment per chain
- [Security](07-security.md) — Security model and threat analysis
- [API Reference](10-api-reference.md) — Full contract API
