# Chainlink CRE Automation

[← Back to Overview](Claude.md)

---

## Overview

Chainlink CRE (Chainlink Runtime Environment) is the decentralized automation layer that monitors market conditions 24/7 and executes trades when user-defined thresholds are met.

**Key Benefits:**
- ⚡ Decentralized execution (no single point of failure)
- 🔒 Secure (cannot withdraw funds, only execute within rules)
- 📈 Reliable (99.9% uptime, battle-tested infrastructure)
- 💰 Cost-effective (pay-per-execution, no idle costs)

---

## Why Chainlink CRE?

### vs. Centralized Bot
| Feature | Centralized Bot | Chainlink CRE |
|---------|----------------|---------------|
| Uptime | ❌ Single server | ✅ Distributed network |
| Security | ❌ Can be hacked | ✅ Decentralized nodes |
| Transparency | ❌ Closed source | ✅ On-chain logic |
| Trust | ❌ Trust operator | ✅ Trustless |

### vs. User Manual Execution
- **24/7 Monitoring:** No need to watch markets constantly
- **Instant Execution:** No delays when thresholds are met
- **No Missed Opportunities:** Even while sleeping

---

## CRE Architecture

### Workflow Components

#### 1. Price Monitor
**Purpose:** Track real-time asset prices

**Data Source:** Chainlink Price Feeds
- ETH/USD: Updated ~1 minute
- BTC/USD: Updated ~1 minute
- USDC/USD: Updated ~1 hour

**Supported Assets:**
- ETH, WETH
- BTC, WBTC
- USDC, USDT
- [See full list in Multi-Chain doc](05-multi-chain.md)

**Dashboard Display:**
- Real-time price ticker on dashboard header
- Price charts (1h, 24h, 7d, 30d)
- % change indicators (green/red)
- Sparkline charts for quick visual reference

---

#### 1.5. Price Alerts
**Purpose:** Notify users when price reaches specific thresholds

**Alert Types:**

**Simple Price Alert:**
- User sets target price (e.g., "Alert me when ETH hits $3,000")
- One-time or recurring alert
- Notification via: Dashboard toast, Email, Discord, Telegram

**Conditional Alert:**
- Multiple conditions (e.g., "Alert when ETH > $3,000 AND volume > 100M")
- Time-based (e.g., "Alert if price stays above $3,000 for 1 hour")

**Configuration:**
```javascript
{
  token: "ETH/USD",
  condition: "ABOVE",  // ABOVE, BELOW, CROSSES_ABOVE, CROSSES_BELOW
  targetPrice: 3000,
  recurring: false,    // One-time or recurring
  channels: ["dashboard", "email", "discord"],
  expiresAt: 1735689600  // Optional: Auto-delete alert after date
}
```

**Storage:**
- Off-chain (stored in backend database, not smart contract)
- User can have up to 10 active alerts per vault
- Alerts persist across sessions

**Notification Channels:**
1. **Dashboard Toast:** Instant in-app notification
2. **Email:** For non-urgent alerts
3. **Discord Webhook:** Post to user's Discord channel
4. **Telegram Bot:** Push notification via bot

**Example Alert Notification:**
```
🔔 Price Alert Triggered!

ETH/USD has crossed above $3,000
Current Price: $3,042.50 (+2.3% in 1h)

Vault: 0xabcd...1234 (Arbitrum)
Active Rules: Buy at $2,750, Sell at $3,250

[View Dashboard] [Snooze 1h] [Delete Alert]
```

**Management:**
- User can view all alerts in `/settings/alerts`
- Pause/Resume alerts temporarily
- Edit alert conditions
- Delete alerts when no longer needed

#### 2. Trigger Logic
**Purpose:** Determine when to execute trades

**Conditions:**
```javascript
// Buy trigger
if (currentPrice <= rule.buyThreshold &&
    now - rule.lastTradeTime > COOLDOWN) {
  return TRIGGER_BUY;
}

// Sell trigger
if (currentPrice >= rule.sellThreshold &&
    now - rule.lastTradeTime > COOLDOWN) {
  return TRIGGER_SELL;
}
```

**Additional Checks:**
- ✅ Rule enabled?
- ✅ Cooldown expired? (5 minutes minimum)
- ✅ Sufficient balance in vault?
- ✅ Gas price reasonable? (skip if > 200 gwei on Ethereum)

#### 3. Execution Engine
**Purpose:** Execute trades when triggered

**Flow:**
1. Receive trigger signal from Price Monitor
2. Fetch vault configuration (rules, balance, allowedRouters)
3. Calculate swap parameters (amount, minOut, router)
4. Call `vault.executeSwap(...)`
5. Handle result (success → log, failure → retry logic)
6. Emit event for dashboard update

**Error Handling:**
- Insufficient balance → Skip, log error
- Slippage too high → Retry with adjusted `minAmountOut`
- Router failure → Try alternative router (1inch → Uniswap)
- Gas spike → Queue for later (when gas < threshold)
- Cooldown not met → Skip silently

#### 4. Gas Management
**Strategies:**
- Monitor gas price before execution
- Dynamic gas limit based on swap complexity
- L2 optimization (Arbitrum/Base: always execute, gas is cheap)
- Batch execution (future): combine multiple swaps in one tx

---

## CRE Workflow Configuration

### Ethereum Mainnet
```yaml
network: ethereum
chainId: 1
priceFeeds:
  ETH/USD: 0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419
  BTC/USD: 0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c
  USDC/USD: 0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6
executor: 0x[CRE_EXECUTOR_ADDRESS]
routers:
  uniswapV3: 0xE592427A0AEce92De3Edee1F18E0157C05861564
  oneInch: 0x1111111254EEB25477B68fb85Ed929f73A960582
gasLimit: 500000
maxGasPrice: 200 gwei  # Skip execution if gas > 200 gwei
checkInterval: 60s     # Check prices every 60 seconds
```

### Arbitrum
```yaml
network: arbitrum
chainId: 42161
priceFeeds:
  ETH/USD: 0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612
  BTC/USD: 0x6ce185860a4963106506C203335A2910413708e9
executor: 0x[CRE_EXECUTOR_ADDRESS]
routers:
  uniswapV3: 0xE592427A0AEce92De3Edee1F18E0157C05861564
  camelot: 0xc873fEcbd354f5A56E00E710B90EF4201db2448d
gasLimit: 2000000
maxGasPrice: 1 gwei   # Very cheap on Arbitrum
checkInterval: 30s    # More frequent on L2 (cheaper)
```

### Base
```yaml
network: base
chainId: 8453
priceFeeds:
  ETH/USD: 0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70
executor: 0x[CRE_EXECUTOR_ADDRESS]
routers:
  uniswapV3: 0x2626664c2603336E57B271c5C0b26F421741e481
  aerodrome: 0xcF77a3Ba9A5CA399B7c97c74d54e5b1Beb874E43
gasLimit: 2000000
maxGasPrice: 0.5 gwei
checkInterval: 30s
```

---

## Security Considerations

### Executor Permissions
**What CRE CAN do:**
- ✅ Call `vault.executeSwap()` when rules are met
- ✅ Monitor price feeds
- ✅ Trigger automated trades

**What CRE CANNOT do:**
- ❌ Withdraw funds from vault
- ❌ Change trading rules
- ❌ Pause/unpause vault
- ❌ Transfer vault ownership

### DoS Protection
- **Cooldown period:** 5 minutes between trades (prevents spam)
- **Max trade amount:** Enforced per rule (limits exposure per execution)
- **Gas price limits:** Skip execution if gas too high

### Oracle Security
- **Chainlink feeds:** Most reliable oracles (99.9% uptime)
- **Staleness checks:** Reject prices older than 1 hour
- **Circuit breakers (future):** Pause if price deviates >20% in 1 block

---

## Monitoring & Alerting

### Metrics Tracked
- Execution count per vault (daily, weekly, monthly)
- Success/failure rate (target: >99%)
- Average gas cost per execution
- Average execution latency (target: <2 minutes from trigger)
- Price feed uptime (target: 99.9%)

### Alerts (sent to user dashboard)
- ✅ **Execution success:** "Swap executed: 2,700 USDC → 0.98 ETH"
- ⚠️ **Execution failed:** "Swap failed: Insufficient balance"
- 🔴 **High gas price:** "Execution skipped: Gas price 300 gwei (> 200 threshold)"
- 🔴 **Price feed stale:** "Price feed not updated in 2 hours"

---

## Cost Analysis

### Execution Cost (Ethereum Mainnet)
- **Gas per swap:** 200k-300k gas
- **At 30 gwei:** 0.006-0.009 ETH (~$18-27 per execution at $3k ETH)
- **At 100 gwei:** 0.02-0.03 ETH (~$60-90 per execution)

**Recommendation:** Use Ethereum for large trades (>$10k) or infrequent strategies.

### Execution Cost (Arbitrum)
- **Gas per swap:** 200k-300k gas
- **At 0.1 gwei:** 0.00002-0.00003 ETH (~$0.06-0.09 per execution)

**Recommendation:** Use Arbitrum for active trading and frequent rebalancing.

### Execution Cost (Base)
- **Gas per swap:** 200k-300k gas
- **At 0.05 gwei:** 0.00001-0.000015 ETH (~$0.03-0.05 per execution)

**Recommendation:** Use Base for high-frequency strategies and small portfolios.

### CRE Subscription Model (Future)
- **Pay-per-execution:** User pays gas + small CRE fee (~$0.50 per execution)
- **Monthly subscription:** Flat fee for unlimited executions (e.g., $20/month)

---

## Testing CRE Workflows

### Local Testing (Hardhat)
```bash
# 1. Fork mainnet
npx hardhat node --fork https://eth-mainnet.alchemyapi.io/v2/YOUR_KEY

# 2. Deploy contracts
npx hardhat deploy --network localhost

# 3. Run CRE simulator
npx hardhat run scripts/simulateCRE.ts --network localhost
```

### Testnet Deployment
1. Deploy contracts to testnet (Sepolia, Arbitrum Sepolia, Base Sepolia)
2. Configure CRE workflow with testnet price feeds
3. Set low thresholds for quick testing
4. Monitor execution via dashboard

### Mainnet Deployment
1. Deploy audited contracts to mainnet
2. Configure CRE with production price feeds
3. Gradual rollout: whitelist users → open beta → public launch
4. 24/7 monitoring dashboard
5. Kill switch ready (can pause CRE execution if anomalies detected)

---

## Future Enhancements

### Phase 1 (Q2 2026)
- **Batch execution:** Execute multiple swaps in single transaction (gas savings)
- **Dynamic gas optimization:** Adjust gas limit based on network conditions
- **Priority execution:** Pay higher gas for time-sensitive swaps

### Phase 2 (Q3 2026)
- **Dynamic thresholds:** AI automatically adjusts thresholds based on volatility
- **Cross-chain triggers:** Execute on Arbitrum when Ethereum vault triggers
- **Advanced conditions:** Execute only if volatility < X, volume > Y, etc.

### Phase 3+ (2027)
- **Multi-asset execution:** Execute portfolio rebalancing in one transaction
- **MEV protection:** Private RPC endpoints, Flashbots integration
- **Custom workflows:** Users build custom automation logic (no-code builder)

---

## Related Documentation

- [Smart Contracts](02-smart-contracts.md) — Vault contract details
- [Multi-Chain](05-multi-chain.md) — Per-chain CRE configuration
- [Security](07-security.md) — CRE security model
- [Development](09-development.md) — Testing CRE locally
