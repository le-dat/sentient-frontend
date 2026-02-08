# Sentient Finance

> **Multi-Chain Non-Custodial AI Portfolio Automation**
> Giao thức quản lý danh mục đầu tư đa chuỗi phi tập trung, được hỗ trợ bởi AI, cho phép người dùng tự động hóa quản lý tài sản trên nhiều blockchain trong khi vẫn giữ toàn quyền kiểm soát tài sản.

📄 **Full spec:** [Notion — AI Portfolio Automation](https://www.notion.so/resume-thangvanle/AI-Portfolio-Automation-2fa4bff1d8bd802692f7c421d26ed5c8)

---

## Quick Links

[Architecture](01-architecture.md) | [Smart Contracts](02-smart-contracts.md) | [AI Engine](04-ai-engine.md) | [User Guide](08-user-guide.md) | [Roadmap](11-roadmap.md)

---

## What is Sentient Finance?

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
- [**Smart Contracts**](02-smart-contracts.md) — VaultFactory & PortfolioVault detailed specifications
- [**Automation (CRE)**](03-automation-cre.md) — Chainlink CRE integration and execution workflows
- [**AI Engine**](04-ai-engine.md) — Market analysis, threshold optimization, and risk monitoring
- [**Multi-Chain**](05-multi-chain.md) — Multi-chain deployment strategy and considerations
- [**Frontend**](06-frontend.md) — Dashboard architecture, components, and user flows
- [**Development**](09-development.md) — Setup, local development, and contributing guide
- [**API Reference**](10-api-reference.md) — Contract ABIs, function signatures, and API endpoints

### 🗺️ Project Planning
- [**Roadmap**](11-roadmap.md) — Product phases, milestones, and future features

---

## Who Should Use This?

- Traders chủ động muốn tự động hóa chiến lược
- Investors dài hạn muốn DCA tự động
- Multi-chain users quản lý tài sản trên nhiều chain
- Busy professionals không có thời gian theo dõi 24/7
- Risk-conscious users ưu tiên bảo mật non-custodial

---

## External Resources

- **Full Spec:** [Notion — AI Portfolio Automation](https://www.notion.so/resume-thangvanle/AI-Portfolio-Automation-2fa4bff1d8bd802692f7c421d26ed5c8)
