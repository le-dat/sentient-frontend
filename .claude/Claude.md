# Sentient Finance

> **Multi-Chain Non-Custodial AI Portfolio Automation**  
> Giao thức quản lý danh mục đầu tư đa chuỗi phi tập trung, được hỗ trợ bởi AI, cho phép người dùng tự động hóa quản lý tài sản trên nhiều blockchain trong khi vẫn giữ toàn quyền kiểm soát tài sản.

📄 **Full spec:** [Notion — AI Portfolio Automation](https://www.notion.so/resume-thangvanle/AI-Portfolio-Automation-2fa4bff1d8bd802692f7c421d26ed5c8)

---

## 1. Introduction

### What is Sentient Finance?

Sentient Finance là giao thức quản lý danh mục đầu tư đa chuỗi phi tập trung, được hỗ trợ bởi AI, cho phép người dùng tự động hóa quản lý tài sản trên nhiều blockchain trong khi vẫn giữ toàn quyền kiểm soát tài sản của mình.

### Core Features

| | |
|--|--|
| **Non-Custodial** | Bạn giữ 100% quyền kiểm soát tài sản; không chia sẻ private key; smart contract vault cá nhân cho mỗi người dùng. |
| **AI-Powered** | AI phân tích thị trường và đề xuất chiến lược; tự động điều chỉnh ngưỡng giao dịch; giám sát volatility và rủi ro. |
| **Multi-Chain** | Hỗ trợ Ethereum, Arbitrum, Base; một vault trên mỗi chain; quản lý tổng hợp qua dashboard thống nhất. |
| **Decentralized Execution** | Sử dụng Chainlink CRE để thực thi; không phụ thuộc server tập trung; minh bạch và có thể audit. |

### How It Works

1. Bạn tạo vault cá nhân trên blockchain  
2. Bạn deposit tài sản vào vault  
3. Bạn thiết lập quy tắc giao dịch (buy/sell thresholds)  
4. AI giám sát thị trường 24/7  
5. Chainlink CRE tự động thực thi giao dịch khi đạt điều kiện  
6. Bạn có thể rút tiền bất cứ lúc nào  

### Key Principles

- **1 User = 1 Vault per Chain** — Mỗi người dùng có vault riêng trên mỗi blockchain; tài sản được cách ly hoàn toàn.  
- **AI Suggests, You Control** — AI đề xuất chiến lược; bạn là người quyết định cuối cùng; mọi quy tắc được enforce on-chain.  
- **CRE Executes, You Own** — Chainlink CRE chỉ thực thi trong phạm vi quy tắc; không thể rút tiền hoặc thay đổi cấu hình; bạn giữ full quyền withdraw.  

### Who Should Use Sentient Finance?

- Traders chủ động muốn tự động hóa chiến lược  
- Investors dài hạn muốn DCA tự động  
- Multi-chain users quản lý tài sản trên nhiều chain  
- Busy professionals không có thời gian theo dõi 24/7  
- Risk-conscious users ưu tiên bảo mật non-custodial  

---

## 2. Problem & Solution

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

### Value Proposition

**For Users:** Sleep well (AI giám sát 24/7), stay in control (own 100% tài sản), never miss (auto execute khi chạm threshold), multi-chain ease (1 dashboard), security first (non-custodial, decentralized).  

**For Developers:** Composable (smart contract có thể integrate), extensible (dễ add chain/strategy), open source (minh bạch, audit được), standard compliant (ERC-20, EIP-1167).  

---

## 3. Architecture

### Layered Architecture (4 layers)

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

### 1️⃣ Smart Contract Layer

- **VaultFactory** — Deploy vault mới cho mỗi user (EIP-1167 minimal proxy); mapping user → vault; emit `VaultCreated`. Mỗi chain có VaultFactory riêng; gas-optimized.  
- **PortfolioVault** — Vault cá nhân; state: `owner`, `executor` (CRE), `rules` (token → Rule), `allowedRouters`, `maxTradeAmount`. Key functions: `initialize()`, `setTokenRule()`, `deposit()`, `withdraw()`, `executeSwap()` (CRE only, rule-constrained), `pause()`/`unpause()`.  

### 2️⃣ Automation Layer — Chainlink CRE

- **Price Monitor** — Subscribe Chainlink Price Feeds; track real-time price; so sánh với user-defined thresholds.  
- **Trigger Logic** — Check `currentPrice >= sellThreshold` hoặc `currentPrice <= buyThreshold`; validate cooldown.  
- **Execution Engine** — Gọi `vault.executeSwap()` khi điều kiện thỏa; handle failure; emit events.  

Flow: **Price Feed + User Rules → CRE Workflow → executeSwap()**

### 3️⃣ Intelligence Layer — AI Strategy Engine

- **Market Analyzer** — Historical price, volatility, trend, market regime.  
- **Threshold Optimizer** — Đề xuất buy/sell threshold; adjust theo volatility; backtest.  
- **Risk Monitor** — Portfolio risk score; abnormal volatility; alert user.  
- **Rebalancing Logic (Future)** — Gợi ý rebalancing; tối ưu allocation; cross-chain.  

AI output: `token`, `currentPrice`, `suggestedBuyThreshold`, `suggestedSellThreshold`, `confidence`, `riskScore`, `reasoning`.  

### 4️⃣ Frontend Layer — Multi-Chain Dashboard

- Portfolio Overview (tổng hợp tài sản, PnL, allocation)  
- Vault Management (vault per chain, enable/disable AI, set rules)  
- Execution History (list tx, filter by chain/token/date, tx hash)  
- AI Insights (recommendations, risk alerts, strategy metrics)  
- Chain Selector (Ethereum, Arbitrum, Base; vault address; deploy vault)  

### Multi-Chain Deployment

Mỗi chain: **VaultFactory** + **Vault Implementation** + **CRE Workflow** + **Supported DEXs** (Uniswap V3, 1inch / Camelot / Aerodrome tùy chain). Frontend aggregate vault state từ mỗi chain → unified portfolio view; real-time sync (WebSocket/Subgraph).  

### Data Flow (Execution Cycle)

1. User set rule (e.g. buyAt: $2400) → **PortfolioVault** (on-chain).  
2. **CRE Workflow** monitor price (e.g. ETH = $2395).  
3. Price check: $2395 ≤ $2400 ✅.  
4. **AI Engine** validate safe to execute.  
5. **executeSwap()** (e.g. USDC → ETH) on Uniswap.  
6. Event **SwapExecuted** → dashboard update.  

---

## 4. Smart Contracts

### Overview

1. **VaultFactory** — Tạo vault cho user (EIP-1167 clone).  
2. **PortfolioVault** — Vault cá nhân, enforce rules on-chain.  

### VaultFactory

- **State:** `vaultImplementation` (immutable), `userVaults` (user → vault), `executor` (CRE).  
- **Functions:** `createVault()` (clone + initialize + mapping + emit VaultCreated), `getUserVault(user)`.  
- **Deployment:** Mỗi chain: deploy PortfolioVault implementation → deploy VaultFactory → set CRE executor → verify.  

### PortfolioVault

- **State:** `owner`, `executor` (CRE), `paused`, `tokenRules` (token → TokenRule), `allowedRouters`, `isRouterAllowed`, `COOLDOWN_PERIOD` (e.g. 5 min), `MAX_SLIPPAGE` (e.g. 0.5%).  
- **TokenRule:** `enabled`, `buyThreshold`, `sellThreshold` (USD 18 decimals), `maxTradeAmount`, `lastTradeTime`.  
- **Access:** Owner — set rules, deposit/withdraw, routers, pause. Executor (CRE) — execute swaps within rules only; **cannot** withdraw or change config.  

---

## 5. Multi-Chain Strategy

- **Chains:** Ethereum, Arbitrum, Base.  
- **Per chain:** VaultFactory, Vault implementation, CRE workflow, DEXs (Uniswap V3, chain-specific).  
- **Unified:** One dashboard; aggregate vault state; real-time sync.  

---

## 6. User Guide

- Tạo vault (qua UI hoặc factory).  
- Deposit token vào vault.  
- Thiết lập rule per token (buy/sell threshold, max trade, cooldown).  
- Bật automation; CRE sẽ thực thi khi giá chạm ngưỡng.  
- Xem execution history và AI insights trên dashboard.  
- Withdraw bất cứ lúc nào (owner only).  
- Pause vault khi cần (emergency).  

---

## 7. Security

- **Non-custodial** — User giữ key; vault hold assets; CRE chỉ execute trong rules.  
- **On-chain rules** — Threshold, max trade, slippage, cooldown, router allowlist enforce trong contract.  
- **Executor limit** — CRE không withdraw, không đổi config.  
- **Pause** — Owner có thể pause vault khẩn cấp.  
- **Audit & verification** — OpenZeppelin audit, bug bounty, contract verification on explorers (theo Roadmap Notion).  

---

## 8. Roadmap

### Current Status: MVP (Q1 2026)

**Completed (theo Notion):**

- **Smart Contracts:** VaultFactory (Ethereum, Arbitrum, Base), PortfolioVault với rule enforcement, EIP-1167, pause, router allowlist.  
- **Automation:** Chainlink CRE workflows, price feed, auto-execution when thresholds met, cooldown.  
- **AI Engine:** Volatility analysis, threshold recommendations, risk scoring, market regime detection.  
- **Frontend:** Multi-chain dashboard, vault creation, rule management, execution history, portfolio analytics.  
- **Security:** OpenZeppelin audit, bug bounty, contract verification.  

**Phase 1 (Q2 2026):** Dynamic threshold adjustment (AI), multi-timeframe analysis, sentiment integration; gas optimization (batch, Permit2, L2); mobile app (portfolio, push, pause, AI insights, emergency withdraw).  

**Phase 2 (Q3 2026):** Advanced AI — portfolio rebalancing, multi-asset strategies, backtesting; cross-chain features.  

**Phase 3+:** Production hardening, mainnet scale, additional chains và strategies.  

---

## Repository & Getting Started

- **Spec chi tiết (tech stack, contract code, UI/UX):** [.claude/Claude.md](.claude/Claude.md)  
- **Notion (product & roadmap):** [AI Portfolio Automation](https://www.notion.so/resume-thangvanle/AI-Portfolio-Automation-2fa4bff1d8bd802692f7c421d26ed5c8)  

### Quick start

```bash
pnpm install
pnpm build
pnpm dev
```

**Chains:** Ethereum, Arbitrum, Base. **Execution:** Chainlink CRE. **Vault pattern:** EIP-1167 minimal proxy.
