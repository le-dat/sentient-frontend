# Autonomous DeFi AI Wallet System

> **Topic:** DeFi Web3 + Wallet + Finance + Data Streams (Chainlink)
> **Version:** 2.0 (2026 Edition)
> **Target Chain:** Base (EVM L2)
> **Price Source:** Crescent Network (CRE) via Cosmos RPC + CoinGecko

---

## 1. Core System Configuration

| Feature           | Provider/Technology                | Description                                                                 |
| ----------------- | ---------------------------------- | --------------------------------------------------------------------------- |
| **Data Oracle**   | **Chainlink Data Streams**         | Cung cấp giá real-time với độ trễ cực thấp cho AI ra quyết định.            |
| **Cross-Chain**   | **Axelar Network + Chainlink CCIP**| Bridge tài sản giữa Cosmos (Crescent) và EVM (Base).                        |
| **Automation**    | **Chainlink Automation**           | Kích hoạt (Trigger) các lệnh smart contract khi đạt điều kiện AI thiết lập. |
| **Security**      | **Account Abstraction (ERC-4337)** | Cho phép AI ký lệnh thay người dùng trong hạn mức (Spending Limit).         |
| **DEX**           | **Uniswap V3**                     | Swap execution trên Base với slippage protection.                           |

---

## 2. Tech Stack

### Backend Services

| Layer         | Technology              | Purpose                                      |
| ------------- | ----------------------- | -------------------------------------------- |
| Runtime       | Node.js 20+ / Bun       | Event-driven, real-time streaming            |
| Language      | TypeScript 5.x          | Type safety cho DeFi logic                   |
| Framework     | Fastify / Hono          | High performance API                         |
| Queue         | BullMQ + Redis          | Reliable job processing cho transactions     |
| Database      | PostgreSQL + TimescaleDB| Time-series data cho price history           |
| Cache         | Redis                   | Real-time price cache, pub/sub               |
| AI Engine     | LangChain.js + Claude   | Reasoning cho trading decisions              |

### Blockchain Integration

| Component     | Technology              | Purpose                                      |
| ------------- | ----------------------- | -------------------------------------------- |
| Cosmos SDK    | CosmJS / @cosmjs/stargate| Interact với Crescent Network               |
| EVM           | viem + wagmi            | Type-safe EVM interactions                   |
| Account Abstraction | Biconomy SDK      | ERC-4337 implementation                      |
| DEX           | Uniswap V3 SDK          | Swap execution trên Base                     |
| Bridge        | Axelar SDK              | Cosmos-EVM bridge                            |

### Frontend

| Component     | Technology              |
| ------------- | ----------------------- |
| Framework     | Next.js 16+ (App Router)|
| State         | Zustand + TanStack Query|
| Wallet        | RainbowKit / Dynamic    |
| Charts        | TradingView Lightweight |
| UI            | Tailwind CSS + shadcn/ui|

---

## 3. Project Structure

```text
cre-wallet/
├── apps/
│   ├── web/                    # Next.js Dashboard
│   │   ├── app/
│   │   │   ├── (dashboard)/
│   │   │   │   ├── page.tsx    # Main dashboard
│   │   │   │   ├── portfolio/
│   │   │   │   ├── settings/
│   │   │   │   └── ai-config/
│   │   │   └── api/
│   │   ├── components/
│   │   │   ├── ui/             # shadcn components
│   │   │   ├── charts/
│   │   │   └── ai-brain/
│   │   └── hooks/
│   │
│   ├── telegram-bot/           # Notification bot
│   └── worker/                 # Background job processor
│
├── packages/
│   ├── ai-engine/              # AI Decision Engine
│   │   ├── src/
│   │   │   ├── decision-engine.ts
│   │   │   ├── strategies/
│   │   │   └── tools/
│   │
│   ├── price-monitor/          # Price Monitoring Service
│   │   ├── src/
│   │   │   ├── sources/
│   │   │   │   ├── chainlink.ts
│   │   │   │   ├── coingecko.ts
│   │   │   │   └── cosmos-rpc.ts
│   │   │   └── aggregator.ts
│   │
│   ├── smart-wallet/           # ERC-4337 Account Abstraction
│   ├── bridge/                 # Axelar Cross-chain Bridge
│   ├── swap-executor/          # Uniswap V3 Integration
│   ├── database/               # Drizzle ORM + Migrations
│   └── shared/                 # Shared utilities
│
├── contracts/                  # Foundry Smart Contracts
│   ├── src/
│   │   ├── AIWallet.sol
│   │   ├── SwapModule.sol
│   │   └── SpendingLimitModule.sol
│   └── test/
│
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

---

## 4. Smart Contracts

### AIWallet.sol (ERC-4337)

```solidity
// Core features:
// - Owner + AI operator dual-key system
// - Spending limits per token
// - Protocol whitelist
// - Emergency withdraw function

struct SpendingLimit {
    uint256 dailyLimit;
    uint256 perTransactionLimit;
    uint256 cooldownPeriod;
    uint256 lastTransactionTime;
}

// Key functions:
function execute(address target, uint256 value, bytes calldata data) external;
function setAIOperator(address newOperator) external onlyOwner;
function setSpendingLimit(address token, uint256 daily, uint256 perTx) external;
function emergencyWithdraw(address token) external onlyOwner;
```

### SwapModule.sol (Uniswap V3)

```solidity
// Uniswap V3 on Base addresses:
address constant SWAP_ROUTER = 0x2626664c2603336E57B271c5C0b26F421741e481;
address constant USDC = 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913;

// Key functions:
function swapExactInput(
    address tokenIn,
    address tokenOut,
    uint256 amountIn,
    uint256 amountOutMinimum,
    uint24 fee
) external returns (uint256 amountOut);

function emergencySwapToStable(
    address tokenIn,
    uint256 amountIn,
    uint256 maxSlippageBps
) external returns (uint256 amountOut);
```

---

## 5. Cross-Chain Bridge (Cosmos → EVM)

### Bridge Flow

```text
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│  CRESCENT   │      │   AXELAR    │      │    BASE     │
│  (Cosmos)   │      │   BRIDGE    │      │    (EVM)    │
├─────────────┤      ├─────────────┤      ├─────────────┤
│             │      │             │      │             │
│  CRE Token  │─IBC─▶│   Gateway   │─────▶│  axlCRE     │
│             │      │             │      │  (Wrapped)  │
└─────────────┘      └─────────────┘      └──────┬──────┘
                                                  │
                                                  ▼
                                          ┌─────────────┐
                                          │ Uniswap V3  │
                                          │    Swap     │
                                          └──────┬──────┘
                                                  │
                                                  ▼
                                          ┌─────────────┐
                                          │    USDC     │
                                          │ (Stablecoin)│
                                          └─────────────┘
```

### Alternative Route (nếu Axelar không support CRE trực tiếp)

1. Swap CRE → ATOM/OSMO trên Crescent DEX
2. Bridge ATOM/OSMO via Axelar to Base
3. Swap to USDC on Base

---

## 6. AI Autopilot Settings

### A. Risk Management

```yaml
Risk_Profiles:
  - Conservative: "Chỉ alert, không auto-swap. Yêu cầu user confirm."
  - Moderate: "Auto-swap 50% khi giá giảm >10%, full swap khi >15%"
  - Aggressive: "AI tự quyết định dựa trên technical analysis"

Safety_Triggers:
  - Slippage_Protection: "Max 0.5% per trade"
  - Panic_Sell: "Auto-swap to USDC if asset drops >15% in 1 hour"
  - Gas_Optimization: "Only execute when Gwei < 30"
  - Daily_Limit: "Max $10,000 per day"
  - Per_Tx_Limit: "Max $1,000 per transaction"
```

### B. AI Decision Engine

```typescript
interface AIDecision {
  action: 'hold' | 'swap' | 'partial_swap' | 'alert';
  confidence: number; // 0-1
  reasoning: string;
  params?: {
    percentage: number;
    targetToken: string;
    maxSlippage: number;
  };
  urgency: 'low' | 'medium' | 'high' | 'critical';
}

// Decision rules:
// 1. Price drop >15% in 1h + auto-swap enabled → Full swap to USDC
// 2. Price drop 5-15% + high volatility → Partial swap (50%)
// 3. RSI < 30 (oversold) + bearish trend → Alert only (potential reversal)
// 4. Normal conditions → Hold and monitor
```

### C. Autonomous Actions

- [x] **Auto-Swap Protection:** Tự động swap sang stablecoin khi giá giảm mạnh.
- [x] **Price Alerts:** Gửi notification qua Telegram/Email.
- [x] **MEV Protection:** Sử dụng Flashbots hoặc private RPC.
- [ ] **Auto-Harvest:** Tự động thu hoạch yield (future feature).
- [ ] **Yield Hopping:** Tự động chuyển vốn tìm APY cao hơn (future feature).

---

## 7. Security

### Spending Limits (Hard-coded in Smart Contract)

| Limit Type          | Default Value | Configurable |
| ------------------- | ------------- | ------------ |
| Daily Limit         | $10,000       | Yes          |
| Per Transaction     | $1,000        | Yes          |
| Cooldown Period     | 5 minutes     | Yes          |
| Protocol Whitelist  | Uniswap only  | Yes          |

### AI Operator Permissions

```text
┌─────────────────────────────────────────────────────────┐
│                    PERMISSION LEVELS                     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  OWNER (User's EOA)                                     │
│  ├── Full control                                       │
│  ├── Can change AI operator                             │
│  ├── Can update spending limits                         │
│  ├── Can emergency withdraw                             │
│  └── Can disable AI completely                          │
│                                                          │
│  AI OPERATOR (Backend Wallet)                           │
│  ├── Execute swaps within limits                        │
│  ├── Only interact with whitelisted protocols           │
│  ├── Cannot change permissions                          │
│  └── Cannot withdraw to external addresses              │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Kill Switch

- Owner có thể gọi `disableAI()` bất cứ lúc nào
- AI operator address sẽ bị revoke ngay lập tức
- Tất cả pending transactions sẽ bị cancel

---

## 8. UI/UX Design System

### Color Palette

- **Primary:** Midnight Navy (`#0A0E17`) - Tạo cảm giác an toàn, tài chính.
- **Accent:** Cyber Emerald (`#00FFA3`) - Biểu thị trạng thái AI "Online".
- **Alert:** Infrared (`#FF4B4B`) - Cảnh báo rủi ro cao.
- **Style:** **Glassmorphism** với các hiệu ứng Layer tinh tế.

### Key UI Components

1. **AI Brain Widget:** Vòng tròn năng lượng đập theo nhịp Data Feed.
2. **Activity Stream:** Log hành động dạng terminal với icons.
3. **Protection Status:** Shield icon hiển thị trạng thái bảo vệ.
4. **Risk Meter:** Gauge hiển thị mức độ rủi ro portfolio.

---

## 9. Roadmap

### Phase 1: Foundation

- [ ] Setup monorepo với Turborepo + pnpm
- [ ] Deploy smart contracts to Base Sepolia
- [ ] Implement price monitoring (CoinGecko API)
- [ ] Basic Next.js dashboard

### Phase 2: Core Features

- [ ] ERC-4337 integration với Biconomy
- [ ] AI Decision Engine với LangChain + Claude
- [ ] Uniswap V3 swap execution
- [ ] Alert system (Telegram, Email)

### Phase 3: Cross-Chain

- [ ] Axelar bridge integration
- [ ] IBC transfer handling (Crescent → Axelar)
- [ ] Multi-chain portfolio view

### Phase 4: Production

- [ ] Security audit
- [ ] Mainnet deployment (Base)
- [ ] Performance optimization
- [ ] Voice-to-DeFi (future)

---

## 10. MVP Features (User Options)

User có thể enable/disable từng tính năng:

| Feature               | Description                                           | Default |
| --------------------- | ----------------------------------------------------- | ------- |
| **Price Monitor**     | Theo dõi giá real-time, hiển thị trên dashboard       | ON      |
| **Price Alerts**      | Gửi notification khi giá đạt ngưỡng                   | ON      |
| **Auto Swap**         | Tự động swap sang USDC khi giá giảm mạnh              | OFF     |
| **AI Trading**        | AI tự quyết định chiến lược (với spending limits)     | OFF     |

---

## Notes

- **CRE Token Status:** Cần verify CRE còn được trade trên exchanges. Nếu không, hệ thống sẽ support các token khác (ETH, ATOM, etc.)
- **Gas Fees:** Base có gas fees rất thấp (~$0.001 per tx), phù hợp cho frequent trading.
- **Testnet First:** Luôn test trên Base Sepolia trước khi deploy mainnet.
