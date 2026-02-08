# System Architecture

[← Back to Overview](Claude.md)

---

## Overview

Sentient Finance is built on a **4-layer architecture** that separates concerns between on-chain logic, automation, intelligence, and user interface. This design ensures security, scalability, and maintainability.

---

## The Problem We Solve

### The Problem

- **Crypto markets 24/7** — Constant monitoring pressure, missed opportunities khi ngủ, stress khi biến động.
- **Missed opportunities** — Không kịp phản ứng khi giá chạm mức mong muốn; bỏ lỡ entry/exit point.
- **Cross-chain fragmentation** — Tài sản phân tán; khó quản lý tổng thể; nhiều ví/giao diện.
- **Custodial bot risk** — Bot yêu cầu private key; rủi ro hack server; phụ thuộc dịch vụ tập trung.
- **Manual complexity** — Tự tính rebalancing, slippage, gas; thiếu công cụ tự động hóa an toàn.

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

- **Non-Custodial Architecture** — Smart contract vault cá nhân; bạn giữ 100% quyền; không chia sẻ key; withdraw bất cứ lúc nào.
- **True Multi-Chain** — Deploy vault trên Ethereum, Arbitrum, Base; quản lý tổng hợp qua 1 dashboard; chiến lược độc lập từng chain.
- **AI-Assisted Strategy** — AI phân tích volatility và xu hướng; đề xuất buy/sell threshold; tự động điều chỉnh; cảnh báo rủi ro real-time.
- **Decentralized Execution** — Chainlink CRE thực thi; không phụ thuộc server; minh bạch, audit được; uptime 24/7.
- **On-Chain Rule Enforcement** — Mọi quy tắc enforce bởi smart contract; AI không thể vượt giới hạn; max trade size, slippage protection, router allowlist, cooldown.

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
- **VaultFactory** — Deploy vault mới cho mỗi user (EIP-1167 minimal proxy); mapping user → vault; emit `VaultCreated`. Mỗi chain có VaultFactory riêng; gas-optimized.
- **PortfolioVault** — Vault cá nhân; state: `owner`, `executor` (CRE), `rules` (token → Rule), `allowedRouters`, `maxTradeAmount`. Key functions: `initialize()`, `setTokenRule()`, `deposit()`, `withdraw()`, `executeSwap()` (CRE only, rule-constrained), `pause()`/`unpause()`.

**Why This Design:**
- **EIP-1167 Minimal Proxy:** Reduces deployment cost by 10x (~100k gas vs ~1M gas)
- **Per-User Vaults:** Complete asset isolation; no shared pools; no commingling risk
- **Immutable Rules:** Once set on-chain, rules cannot be bypassed by anyone (including CRE)

**See more:** [Smart Contracts](02-smart-contracts.md)

### Layer 2: Automation Layer — Chainlink CRE

**Purpose:** Decentralized 24/7 execution engine

**Components:**
- **Price Monitor** — Subscribe Chainlink Price Feeds; track real-time price; so sánh với user-defined thresholds.
- **Trigger Logic** — Check `currentPrice >= sellThreshold` hoặc `currentPrice <= buyThreshold`; validate cooldown.
- **Execution Engine** — Gọi `vault.executeSwap()` khi điều kiện thỏa; handle failure; emit events.

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
- **Market Analyzer** — Historical price, volatility, trend, market regime.
- **Threshold Optimizer** — Đề xuất buy/sell threshold; adjust theo volatility; backtest.
- **Risk Monitor** — Portfolio risk score; abnormal volatility; alert user.
- **Rebalancing Logic (Future)** — Gợi ý rebalancing; tối ưu allocation; cross-chain.

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
- **Portfolio Overview** — Tổng hợp tài sản, PnL, allocation across all chains
- **Vault Management** — Vault per chain, enable/disable AI, set rules
- **Execution History** — List tx, filter by chain/token/date, tx hash links
- **AI Insights** — Recommendations, risk alerts, strategy metrics
- **Chain Selector** — Ethereum, Arbitrum, Base; vault address; deploy vault button

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
- Unified dashboard aggregates vault state từ mỗi chain
- Real-time sync (WebSocket/Subgraph)
- Single UX for multi-chain portfolio

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
- **AI Engine:** Python, scikit-learn, pandas, FastAPI
- **Database:** PostgreSQL + TimescaleDB
- **Indexing:** The Graph (Subgraphs)

### Frontend
- **Framework:** Next.js 14 (React 18), TypeScript
- **Web3:** wagmi v2, viem, RainbowKit
- **State:** Zustand, TanStack Query
- **Styling:** TailwindCSS, shadcn/ui

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
- **Sleep well** — AI giám sát 24/7; không cần monitor thị trường
- **Stay in control** — Own 100% tài sản; withdraw bất cứ lúc nào
- **Never miss** — Auto execute khi chạm threshold; không bỏ lỡ cơ hội
- **Multi-chain ease** — 1 dashboard cho tất cả chains
- **Security first** — Non-custodial, decentralized, audited

**For Developers:**
- **Composable** — Smart contracts có thể integrate vào DeFi protocols khác
- **Extensible** — Dễ add chain/strategy mới
- **Open source** — Minh bạch, audit được, community-driven
- **Standard compliant** — ERC-20, EIP-1167, Chainlink standards

---

## Related Documentation

- [Smart Contracts](02-smart-contracts.md) — Detailed contract specifications
- [Automation (CRE)](03-automation-cre.md) — Chainlink integration details
- [AI Engine](04-ai-engine.md) — AI algorithms and strategies
- [Multi-Chain](05-multi-chain.md) — Multi-chain deployment guide
- [Security](07-security.md) — Security model and threat analysis
