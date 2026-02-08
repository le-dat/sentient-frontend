# Multi-Chain Strategy

[← Back to Overview](Claude.md)

---

## Overview

Sentient Finance is **natively multi-chain**, supporting Ethereum, Arbitrum, and Base. This design allows you to leverage the unique advantages of each blockchain while maintaining a unified management experience.

**Core Principle:** 1 User = 1 Vault per Chain (isolated, independent, no bridges)

---

## Why Multi-Chain?

### 1. Access to Liquidity

Different chains have different liquidity profiles:
- **Ethereum** — Deepest liquidity for major pairs (ETH, BTC, stablecoins)
- **Arbitrum** — Strong DeFi ecosystem (GMX, Camelot, Uniswap V3)
- **Base** — Growing Coinbase ecosystem, emerging tokens

**Why this matters:** More liquidity = lower slippage, better execution prices.

---

### 2. Gas Cost Optimization

Gas fees vary dramatically by chain:

| Chain | Typical Swap Cost | Best For |
|-------|------------------|----------|
| **Ethereum** | $5 - $50 | Large trades ($10K+), major pairs |
| **Arbitrum** | $0.50 - $2 | Active trading, mid-size positions |
| **Base** | $0.10 - $0.50 | Small trades, high-frequency strategies |

**Strategy:** Use L2s (Arbitrum, Base) for frequent small trades; use Ethereum for large infrequent trades.

---

### 3. Risk Diversification

By deploying vaults across multiple chains:
- **Protocol risk** — If Arbitrum has downtime, your Ethereum vault continues operating
- **Bridge risk** — NO bridge risk (we don't use bridges!)
- **Regulatory risk** — If one chain faces regulatory pressure, others may not
- **Smart contract risk** — Independent deployments = isolated risk

---

### 4. Chain-Specific Opportunities

Each chain has unique advantages:
- **Ethereum** — First-mover, most established protocols, highest trust
- **Arbitrum** — Arbitrum Orbit ecosystem, Stylus (WASM), GMX perps integration (future)
- **Base** — Coinbase backing, onramp integration, emerging meme coins

---

## Supported Blockchains

### Ethereum Mainnet

**Why Ethereum?**
- 🏆 **Most secure** — Highest economic security, longest track record
- 💧 **Deepest liquidity** — Uniswap V3 has $2B+ TVL
- 🔒 **Most trusted** — Battle-tested smart contracts, established ecosystem

**Trade-offs:**
- ❌ High gas fees ($10-$50 per trade)
- ❌ Slower finality (~12 seconds per block)

**Best use cases:**
- Large portfolios ($50K+)
- Infrequent trading (weekly/monthly rebalancing)
- Conservative strategies (buy-and-hold with threshold automation)

**Supported DEXs:**
- Uniswap V3
- 1inch Aggregator

**Price Feeds:**
- Chainlink (ETH/USD, BTC/USD, stablecoins)

---

### Arbitrum One

**Why Arbitrum?**
- ⚡ **Low fees** — 10-50x cheaper than Ethereum
- 🚀 **Fast finality** — Sub-second transaction confirmation
- 🌊 **Good liquidity** — Uniswap V3, Camelot, GMX

**Trade-offs:**
- ⚠️ Slightly less decentralized than Ethereum (optimistic rollup, 7-day withdrawal delay to L1)

**Best use cases:**
- Active trading (daily/weekly executions)
- Mid-size portfolios ($5K-$50K)
- Moderate risk strategies (mean reversion, swing trading)

**Supported DEXs:**
- Uniswap V3
- Camelot DEX
- 1inch Aggregator

**Price Feeds:**
- Chainlink (ETH/USD, BTC/USD, ARB/USD, stablecoins)

---

### Base

**Why Base?**
- 💸 **Lowest fees** — 10x cheaper than Arbitrum, 100x cheaper than Ethereum
- 🏦 **Coinbase ecosystem** — Easy onramp, institutional trust
- 🆕 **Emerging opportunities** — New tokens, early DeFi projects

**Trade-offs:**
- ⚠️ Newest chain (less battle-tested)
- ⚠️ Lower liquidity than Ethereum/Arbitrum (for now)

**Best use cases:**
- Small portfolios ($500-$5K)
- High-frequency strategies (DCA, frequent rebalancing)
- Experimental strategies (new tokens, higher risk)

**Supported DEXs:**
- Uniswap V3
- Aerodrome Finance
- 1inch Aggregator

**Price Feeds:**
- Chainlink (ETH/USD, BTC/USD, stablecoins)

---

## Architecture: 1 Vault per Chain

### Design Pattern

**Traditional multi-chain:** One contract on Chain A sends messages to Chain B via bridge (LayerZero, Wormhole)

**Sentient Finance:** Independent vault on each chain, unified dashboard

```
User: Alice

┌─────────────────────────────────────────────────┐
│ Unified Dashboard                                │
│                                                  │
│  Portfolio: $50,000                              │
│  ├─ Ethereum:  $30,000  (60%)                    │
│  ├─ Arbitrum:  $15,000  (30%)                    │
│  └─ Base:      $5,000   (10%)                    │
└─────────────────────────────────────────────────┘
           │                │              │
           │                │              │
    ┌──────▼─────┐   ┌─────▼──────┐  ┌───▼──────┐
    │ Vault A    │   │ Vault B    │  │ Vault C  │
    │ (Ethereum) │   │ (Arbitrum) │  │ (Base)   │
    │ 10 ETH     │   │ 5 ETH      │  │ 2 ETH    │
    │ 5K USDC    │   │ 5K USDC    │  │ 1K USDC  │
    └────────────┘   └────────────┘  └──────────┘
```

### Why This Design?

**Advantages:**
- ✅ **No bridge risk** — Bridges are major hack vectors (Ronin $600M, Wormhole $320M); we don't use them
- ✅ **Independent strategies** — Different rules per chain; Ethereum can be conservative, Arbitrum aggressive
- ✅ **Isolation** — If one chain's vault is compromised, others are unaffected
- ✅ **Simplicity** — No cross-chain message passing, no asynchronous state sync

**Trade-offs:**
- ⚠️ Manual cross-chain rebalancing — If you want to move funds between chains, you must bridge manually (or use CEX)
- ⚠️ Separate deposits — Must fund each vault independently

**Philosophy:** We prioritize security and simplicity over convenience. Bridges add complexity and risk; we avoid them by design.

---

## Deployment Strategy

### Per-Chain Components

Each chain has its own deployment of:

1. **VaultFactory** — Deploys user vaults
2. **PortfolioVault implementation** — EIP-1167 clone target
3. **Chainlink CRE Workflow** — Monitors prices, executes trades
4. **The Graph Subgraph** — Indexes vault events

### Deployment Sequence

1. **Deploy VaultFactory** on target chain
2. **Deploy PortfolioVault implementation**
3. **Configure Chainlink CRE** with price feeds and executor
4. **Deploy The Graph Subgraph**
5. **Update frontend** to support new chain
6. **Test on testnet** (Sepolia, Arbitrum Goerli, Base Goerli)
7. **Gradual mainnet rollout** (whitelist → public)

---

## Contract Addresses

**Ethereum Mainnet**
- VaultFactory: `0x1234...abcd` (TBD)
- PortfolioVault Impl: `0x5678...efgh` (TBD)

**Arbitrum One**
- VaultFactory: `0xabcd...1234` (TBD)
- PortfolioVault Impl: `0xefgh...5678` (TBD)

**Base**
- VaultFactory: `0x9876...5432` (TBD)
- PortfolioVault Impl: `0xfedc...ba98` (TBD)

**Note:** Contracts will be deployed in Q1 2026. Addresses will be updated here after deployment.

---

## Multi-Chain Frontend Integration

### Unified Dashboard

**How it works:**
1. User connects wallet
2. Frontend detects wallet's current chain
3. Frontend queries all chains via RPC (parallel requests)
4. Aggregates data:
   - Total portfolio value = Σ(vault_value_chain_i)
   - Allocation = % per chain
   - Recent activity = merge sorted by timestamp
5. User can switch chains in UI to interact with specific vault

### Chain Switching

**User flow:**
1. User wants to create vault on Arbitrum
2. User is currently on Ethereum in wallet
3. Frontend prompts: "Switch to Arbitrum?"
4. User approves switch in wallet
5. Frontend refreshes, now connected to Arbitrum
6. User clicks "Create Vault" → transaction on Arbitrum

### Data Aggregation

**Challenge:** How to show unified portfolio when data lives on multiple chains?

**Solution:** The Graph + RPC multi-call
```typescript
// Pseudo-code
const ethereumData = await fetchVaultData('ethereum', userAddress);
const arbitrumData = await fetchVaultData('arbitrum', userAddress);
const baseData = await fetchVaultData('base', userAddress);

const totalValue = ethereumData.value + arbitrumData.value + baseData.value;
const allocation = {
  ethereum: (ethereumData.value / totalValue) * 100,
  arbitrum: (arbitrumData.value / totalValue) * 100,
  base: (baseData.value / totalValue) * 100,
};
```

---

## Supported DEXs by Chain

### Ethereum

| DEX | Liquidity | Fee Tiers | Notes |
|-----|-----------|-----------|-------|
| **Uniswap V3** | Highest | 0.01%, 0.05%, 0.3%, 1% | Default router |
| **1inch** | Aggregated | Variable | Best price routing |

### Arbitrum

| DEX | Liquidity | Fee Tiers | Notes |
|-----|-----------|-----------|-------|
| **Uniswap V3** | High | 0.01%, 0.05%, 0.3%, 1% | Default router |
| **Camelot** | Medium | 0.3%, 1% | Native Arbitrum DEX |
| **1inch** | Aggregated | Variable | Best price routing |

### Base

| DEX | Liquidity | Fee Tiers | Notes |
|-----|-----------|-----------|-------|
| **Uniswap V3** | Medium | 0.01%, 0.05%, 0.3%, 1% | Default router |
| **Aerodrome** | Growing | 0.05%, 0.3% | Base-native DEX |
| **1inch** | Aggregated | Variable | Best price routing |

---

## Price Feed Configuration

### Chainlink Price Feeds per Chain

**Ethereum:**
- ETH/USD: `0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419`
- BTC/USD: `0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c`
- USDC/USD: `0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6`

**Arbitrum:**
- ETH/USD: `0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612`
- BTC/USD: `0x6ce185860a4963106506C203335A2910413708e9`
- ARB/USD: `0xb2A824043730FE05F3DA2efaFa1CBbe83fa548D6`

**Base:**
- ETH/USD: `0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70`
- BTC/USD: (TBD)
- USDC/USD: (TBD)

**Note:** Addresses subject to change; always verify on [Chainlink docs](https://docs.chain.link/data-feeds/price-feeds/addresses).

---

## Cross-Chain Considerations

### What We Do NOT Implement

- ❌ **Cross-chain bridges** — No LayerZero, Wormhole, Axelar
- ❌ **Cross-chain messaging** — No CCIP, no Hyperlane
- ❌ **Unified liquidity** — Cannot swap ETH on Ethereum using liquidity on Arbitrum
- ❌ **Cross-chain rebalancing** — AI cannot automatically move funds between chains

### What Users Can Do Manually

- ✅ **Bridge via third-party** — Use official Arbitrum/Base bridges, or Across, Hop
- ✅ **CEX transfer** — Withdraw from Ethereum vault → CEX → Deposit to Arbitrum vault
- ✅ **Independent strategies** — Set different rules per chain

**Why this approach?** Bridges add smart contract risk, centralization risk, and complexity. By avoiding them, we keep the protocol simple and secure.

---

## Gas Optimization by Chain

### Ethereum

**Challenge:** High gas costs

**Optimizations:**
- Use EIP-1167 minimal proxies (saves 90% deployment gas)
- Batch operations where possible (future feature)
- Trade during low-gas periods (AI can suggest timing in Phase 1)

### Arbitrum

**Challenge:** L1 data availability costs

**Optimizations:**
- Compress calldata (minimize data posted to L1)
- Use native Arbitrum features (future)

### Base

**Challenge:** Already very cheap; optimization less critical

**Optimizations:**
- Same as Arbitrum (calldata compression)

---

## Multi-Chain Testing

### Local Testing (Hardhat)

```bash
# Fork Ethereum mainnet
npx hardhat node --fork https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY

# Fork Arbitrum
npx hardhat node --fork https://arb-mainnet.g.alchemy.com/v2/YOUR_KEY

# Fork Base
npx hardhat node --fork https://base-mainnet.g.alchemy.com/v2/YOUR_KEY
```

### Testnet Testing

| Mainnet | Testnet | Faucet |
|---------|---------|--------|
| Ethereum | Sepolia | [sepoliafaucet.com](https://sepoliafaucet.com) |
| Arbitrum | Arbitrum Goerli | [faucet.quicknode.com](https://faucet.quicknode.com/arbitrum/goerli) |
| Base | Base Goerli | [coinbase.com/faucets](https://coinbase.com/faucets/base-goerli-faucet) |

### Mainnet Rollout

1. **Phase 1:** Ethereum only (highest security, lowest risk)
2. **Phase 2:** Add Arbitrum (test multi-chain dashboard)
3. **Phase 3:** Add Base (full multi-chain)

---

## Adding New Chains

### Checklist for New Chain Support

- [ ] Chain has Chainlink Price Feeds for major assets
- [ ] Chain has established DEX with >$10M liquidity (Uniswap V3 preferred)
- [ ] Chain is EVM-compatible (or Sentient team can adapt contracts)
- [ ] Chain has reliable RPC providers
- [ ] Chain has block explorer (for contract verification)
- [ ] Chain has The Graph support (or alternative indexer)
- [ ] Community demand for this chain (Discord poll, Twitter feedback)

### Potential Future Chains

- **Optimism** — Similar to Arbitrum, strong ecosystem
- **Polygon zkEVM** — zkRollup, lower fees than Optimism
- **zkSync Era** — zkRollup, emerging DeFi
- **Linea** — Consensys zkRollup
- **Scroll** — zkRollup, EVM-equivalent

**Timeline:** 1-2 new chains per quarter after MVP launch (based on user demand)

---

## Related Documentation

- [Architecture](01-architecture.md) — How multi-chain fits into overall architecture
- [Smart Contracts](02-smart-contracts.md) — VaultFactory and PortfolioVault design
- [User Guide](08-user-guide.md) — How to create vaults on different chains

**Build across chains, manage from one place! 🌐**
