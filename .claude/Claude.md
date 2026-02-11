# Sentient Finance

> **Multi-Chain Non-Custodial AI Portfolio Automation**
> Giao thức quản lý danh mục đầu tư đa chuỗi phi tập trung, được hỗ trợ bởi AI, cho phép người dùng tự động hóa quản lý tài sản trên nhiều blockchain trong khi vẫn giữ toàn quyền kiểm soát tài sản.

📄 **Full spec:** [Notion — AI Portfolio Automation](https://www.notion.so/resume-thangvanle/AI-Portfolio-Automation-2fa4bff1d8bd802692f7c421d26ed5c8)

---

## Quick Links

[Architecture](01-architecture.md) | [Smart Contracts](02-smart-contracts.md) | [AI Engine](04-ai-engine.md) | [User Guide](08-user-guide.md) | [Roadmap](11-roadmap.md)

---

## What is Sentient Finance?

Sentient Finance is a decentralized, AI-powered, multi-chain portfolio management protocol that enables users to automate asset management across multiple blockchains while maintaining full custody and control of their assets.

### Core Features

| Feature | Description |
|---------|-------------|
| **Non-Custodial** | You retain 100% control of your assets; no private key sharing; personal smart contract vault for each user. |
| **AI-Powered** | AI analyzes markets and suggests strategies; automatically adjusts trading thresholds; monitors volatility and risk. |
| **Multi-Chain** | Supports Ethereum, Arbitrum, Base; one vault per chain; unified management via single dashboard. |
| **Decentralized Execution** | Uses Chainlink CRE for execution; no centralized server dependency; transparent and auditable. |

### How It Works

1. You create a personal vault on the blockchain
2. You deposit assets into your vault
3. You set trading rules (buy/sell thresholds)
4. AI monitors markets 24/7
5. Chainlink CRE automatically executes trades when conditions are met
6. You can withdraw funds at any time

### Key Principles

- **1 User = 1 Vault per Chain** — Each user has a dedicated vault on each blockchain; assets are completely isolated.
- **AI Suggests, You Control** — AI suggests strategies; you make the final decisions; all rules are enforced on-chain.
- **CRE Executes, You Own** — Chainlink CRE only executes within rule boundaries; cannot withdraw funds or change configuration; you retain full withdrawal rights.

---

## Architecture at a Glance

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

**Layer 1:** Smart contracts (VaultFactory, PortfolioVault) manage user vaults and enforce trading rules on-chain.
**Layer 2:** Chainlink CRE monitors price feeds and automatically executes trades when conditions are met.
**Layer 3:** AI Engine analyzes market data and provides optimized threshold recommendations.
**Layer 4:** Frontend dashboard provides unified multi-chain portfolio management interface.

---

## Documentation Index

### 📘 For Users
- [**User Guide**](08-user-guide.md) — Step-by-step guide to create vaults, set rules, and manage your portfolio
- [**Security**](07-security.md) — Security model, best practices, and threat mitigations

### 👨‍💻 For Developers
- [**Architecture**](01-architecture.md) — System design, component interactions, and data flow
- [**Tech Stack**](TECH_STACK.md) — Complete technology version reference (React 19, Next.js 16, Solidity, etc.)
- [**Smart Contracts**](02-smart-contracts.md) — VaultFactory & PortfolioVault detailed specifications
- [**Automation (CRE)**](03-automation-cre.md) — Chainlink CRE integration and execution workflows
- [**AI Engine**](04-ai-engine.md) — Market analysis, threshold optimization, and risk monitoring
- [**Multi-Chain**](05-multi-chain.md) — Multi-chain deployment strategy and considerations
- [**Frontend**](06-frontend.md) — Dashboard architecture, components, and user flows
- [**Development**](09-development.md) — Setup, local development, and contributing guide
- [**API Reference**](10-api-reference.md) — Contract ABIs, function signatures, and API endpoints

### 🗺️ Project Planning
- [**Roadmap**](11-roadmap.md) — Product phases, milestones, and future features
- [**Changelog**](CHANGELOG.md) — Documentation updates and version history

---

## Who Should Use This?

- Active traders who want to automate their strategies
- Long-term investors who want automated DCA (dollar-cost averaging)
- Multi-chain users managing assets across multiple blockchains
- Busy professionals who don't have time to monitor markets 24/7
- Risk-conscious users who prioritize non-custodial security

---

## External Resources

- **Full Spec:** [Notion — AI Portfolio Automation](https://www.notion.so/resume-thangvanle/AI-Portfolio-Automation-2fa4bff1d8bd802692f7c421d26ed5c8)
