# System Architecture

[← Back to Overview](Claude.md)

---

## Overview

Sentient Finance is built on a **4-layer architecture** that separates concerns between on-chain logic, automation, intelligence, and user interface. This design ensures security, scalability, and maintainability.

---

## The Problem We Solve

### The Problem

- **Crypto markets 24/7** — Constant monitoring pressure, missed opportunities while sleeping, stress during volatility.
- **Missed opportunities** — Can't react when price hits target levels; miss entry/exit points.
- **Cross-chain fragmentation** — Assets scattered across chains; hard to manage holistically; multiple wallets/interfaces.
- **Custodial bot risk** — Bots require private keys; server hack risk; centralized service dependency.
- **Manual complexity** — Manual rebalancing, slippage, and gas calculations; lack of safe automation tools.

### Existing Solutions Fall Short

| | CEX Stop-Limit | Trading Bots | Single-Chain Tools | **Sentient Finance** |
|--|----------------|-------------|--------------------|------------------|
| Non-custodial | ❌ | ❌ | ✅ | ✅ |
| Multi-chain | ❌ | ⚠️ Limited | ❌ | ✅ |
| AI-powered | ❌ | ⚠️ Basic | ❌ | ✅ |
| Decentralized execution | ❌ | ❌ | ⚠️ Partial | ✅ |
| On-chain rules | ❌ | ❌ | ✅ | ✅ |
| 24/7 automation | ✅ | ✅ | ✅ | ✅ |

### The Solution: Sentient Finance

- **Non-Custodial Architecture** — Personal smart contract vault; you retain 100% control; no key sharing; withdraw anytime.
- **True Multi-Chain** — Deploy vaults on Ethereum, Arbitrum, Base; unified management via single dashboard; independent strategies per chain.
- **AI-Assisted Strategy** — AI analyzes volatility and trends; suggests buy/sell thresholds; auto-adjusts; real-time risk alerts.
- **Decentralized Execution** — Chainlink CRE executes trades; no server dependency; transparent, auditable; 24/7 uptime.
- **On-Chain Rule Enforcement** — All rules enforced by smart contract; AI cannot exceed limits; max trade size, slippage protection, router allowlist, cooldown period.

---

## Layered Architecture (4 Layers)

```
┌─────────────────────────────────────┐
│ 4️⃣ Frontend Layer                   │  ← User Interface
│  Multi-chain Dashboard & Analytics  │
└─────────────────────────────────────┘
              ↕️
┌─────────────────────────────────────┐
│ 3️⃣ Intelligence Layer              │  ← AI Brain
│  Strategy Engine & Risk Analysis    │
└─────────────────────────────────────┘
              ↕️
┌─────────────────────────────────────┐
│ 2️⃣ Automation Layer                │  ← Execution Engine
│  Chainlink CRE Workflows            │
└─────────────────────────────────────┘
              ↕️
┌─────────────────────────────────────┐
│ 1️⃣ Smart Contract Layer            │  ← On-Chain Foundation
│  VaultFactory + PortfolioVault      │
└─────────────────────────────────────┘
```

### Layer 1: Smart Contract Layer

**Purpose:** On-chain foundation for non-custodial vault management

**Components:**
- **VaultFactory** — Deploys new vault for each user (EIP-1167 minimal proxy); maintains user → vault mapping; emits `VaultCreated`. One factory per chain; gas-optimized.
- **PortfolioVault** — Personal vault; state: `owner`, `executor` (CRE), `rules` (token pair → Rule), `allowedRouters`, cooldown period. Key functions: `initialize()`, `setTokenRule()`, `deposit()`, `withdraw()`, `executeSwap()` (CRE only, rule-constrained), `pause()`/`unpause()`.

**Why This Design:**
- **EIP-1167 Minimal Proxy:** Reduces deployment cost by 10x (~100k gas vs ~1M gas)
- **Per-User Vaults:** Complete asset isolation; no shared pools; no commingling risk
- **Immutable Rules:** Once set on-chain, rules cannot be bypassed by anyone (including CRE)

**See more:** [Smart Contracts](02-smart-contracts.md)

### Layer 2: Automation Layer — Chainlink CRE

**Purpose:** Decentralized 24/7 execution engine

**Components:**
- **Price Monitor** — Subscribes to Chainlink Price Feeds; tracks real-time prices; compares against user-defined thresholds.
- **Trigger Logic** — Checks `currentPrice >= sellThreshold` or `currentPrice <= buyThreshold`; validates cooldown period has passed.
- **Execution Engine** — Calls `vault.executeSwap()` when conditions met; handles failures; emits events.

**Flow:**
```
Price Feed + User Rules → CRE Workflow → executeSwap()
```

**Why Chainlink CRE:**
- **Decentralized:** No single point of failure; network of independent nodes
- **Reliable:** 99.9% uptime; battle-tested infrastructure
- **Oracle Integration:** Direct access to Chainlink Price Feeds (most reliable oracle network)
- **Cost Efficient:** Pay-per-execution model; no idle server costs

**See more:** [Automation (CRE)](03-automation-cre.md)

### Layer 3: Intelligence Layer — AI Strategy Engine

**Purpose:** Market analysis and strategy optimization

**Components:**
- **Market Analyzer** — Analyzes historical prices, volatility, trends, market regimes.
- **Threshold Optimizer** — Suggests buy/sell thresholds; adjusts based on volatility; backtests strategies.
- **Risk Monitor** — Calculates portfolio risk score; detects abnormal volatility; alerts users.
- **Rebalancing Logic (Future)** — Suggests rebalancing; optimizes allocation; cross-chain insights.

**AI Output:**
```json
{
  "token": "ETH",
  "currentPrice": 2850.50,
  "suggestedBuyThreshold": 2700.00,
  "suggestedSellThreshold": 3000.00,
  "confidence": 0.78,
  "riskScore": 42,
  "reasoning": "Strong support at $2700, resistance at $3000. Medium volatility."
}
```

**Important:** AI **suggests**, user **controls**. All recommendations require user approval before execution.

**See more:** [AI Engine](04-ai-engine.md)

### Layer 4: Frontend Layer — Multi-Chain Dashboard

**Purpose:** Unified interface for multi-chain portfolio management

**Features:**
- **Portfolio Overview** — Aggregates assets, P&L, allocation across all chains
- **Vault Management** — One vault per chain; enable/disable AI; configure rules
- **Execution History** — Transaction list; filterable by chain/token/date; explorer links
- **AI Insights** — Market recommendations; risk alerts; strategy performance metrics
- **Chain Selector** — Switch between Ethereum, Arbitrum, Base; view vault addresses; deploy new vaults

**Real-time Sync:**
- WebSocket connections per chain
- The Graph Subgraphs for historical data
- Event listeners (SwapExecuted, Deposit, Withdrawal)

**See more:** [Frontend](06-frontend.md)

---

## Multi-Chain Deployment

**Per Chain:**
- **VaultFactory** (one per chain)
- **Vault Implementation** (one per chain)
- **CRE Workflow** (one per chain)
- **Supported DEXs** (Uniswap V3 + chain-specific DEXs)

**Frontend Aggregation:**
- Unified dashboard aggregates vault state from each chain
- Real-time synchronization (WebSocket/Subgraph)
- Single user experience for multi-chain portfolio management

**Supported Chains:**
- **Ethereum** — Largest liquidity, most established DeFi
- **Arbitrum** — L2 scaling, low gas, fast finality
- **Base** — Coinbase-backed, low gas, growing ecosystem

**See more:** [Multi-Chain Strategy](05-multi-chain.md)

---

## Data Flow & Execution Cycle

### Example: Automated ETH Buy

1. **User sets rule** (e.g. buyAt: $2400) → **PortfolioVault** (on-chain)
2. **CRE Workflow** monitors price (e.g. ETH = $2395)
3. **Price check:** $2395 ≤ $2400 ✅
4. **AI Engine** validates safe to execute (optional risk check)
5. **CRE calls** `vault.executeSwap()` (e.g. USDC → ETH) on Uniswap
6. **Event emitted:** SwapExecuted → dashboard updates in real-time

### Component Interactions

```
User → Frontend → Smart Contracts (set rules, deposit, withdraw)
       ↓
Chainlink Price Feeds → CRE → Smart Contracts (execute swaps)
       ↓
AI Engine → Frontend → User (recommendations, alerts)
       ↓
Smart Contract Events → Subgraph → Frontend (real-time updates)
```

---

## Technology Stack

### Blockchain
- **Chains:** Ethereum, Arbitrum, Base
- **Smart Contracts:** Solidity 0.8.20+, Hardhat, OpenZeppelin
- **Automation:** Chainlink CRE (Chainlink Automation)
- **Oracles:** Chainlink Price Feeds
- **DEXs:** Uniswap V3, 1inch, Camelot, Aerodrome

### Backend
- **AI Engine:** Python 3.11, scikit-learn, pandas, FastAPI
- **Database:** PostgreSQL + TimescaleDB
- **Indexing:** The Graph (Subgraphs)

### Frontend
- **Framework:** Next.js 16 (React 19), TypeScript 5.x
- **Web3:** wagmi v2, viem v2, RainbowKit
- **State:** Zustand, TanStack Query (React Query v5)
- **Styling:** TailwindCSS, shadcn/ui (Radix UI)

---

## Design Trade-offs

### Why Non-Custodial?
- **Security:** Users retain full control; no central point of failure
- **Trust:** No need to trust intermediaries with funds
- **Regulatory:** Not a money transmitter; no KYC required

### Why Chainlink CRE vs. Centralized Bot?
- **Decentralization:** No single server to hack or go down
- **Transparency:** All execution logic is auditable on-chain
- **Reliability:** 99.9% uptime; distributed network of nodes

### Why EIP-1167 Minimal Proxy?
- **Gas Efficiency:** 10x cheaper deployment (~100k vs ~1M gas)
- **Security:** Implementation contract is immutable and audited once
- **Scalability:** Users can deploy vaults without high gas costs

### Why Multi-Chain (Not Cross-Chain Bridges)?
- **Security:** Bridges are major attack vectors; we avoid them entirely
- **Simplicity:** Independent vaults are easier to reason about and secure
- **Flexibility:** Different strategies per chain; no cross-chain complexity

---

## Value Proposition

**For Users:**
- **Sleep well** — AI monitors 24/7; no need to watch markets constantly
- **Stay in control** — Own 100% of assets; withdraw anytime
- **Never miss opportunities** — Auto-execute when thresholds hit; capture every opportunity
- **Multi-chain simplicity** — One dashboard for all chains
- **Security first** — Non-custodial, decentralized, audited

**For Developers:**
- **Composable** — Smart contracts can integrate with other DeFi protocols
- **Extensible** — Easy to add new chains and strategies
- **Open source** — Transparent, auditable, community-driven
- **Standards compliant** — ERC-20, EIP-1167, Chainlink standards

---

## Related Documentation

- [Smart Contracts](02-smart-contracts.md) — Detailed contract specifications
- [Automation (CRE)](03-automation-cre.md) — Chainlink integration details
- [AI Engine](04-ai-engine.md) — AI algorithms and strategies
- [Multi-Chain](05-multi-chain.md) — Multi-chain deployment guide
- [Security](07-security.md) — Security model and threat analysis
