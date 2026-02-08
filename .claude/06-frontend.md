# Frontend Dashboard

[← Back to Overview](Claude.md)

---

## Overview

The Sentient Finance dashboard is a React-based web application that provides a unified interface for managing vaults across multiple blockchains. It's designed to be intuitive, responsive, and secure.

**Tech Stack:** React 19, Next.js 16, TailwindCSS, wagmi, viem

---

## Technology Stack

### Core Framework

- **React 19** — Component library with concurrent rendering
- **Next.js 16** — App Router, Server Components, API routes, optimized production builds
- **TypeScript** — Type safety throughout the codebase

### Styling & UI

- **TailwindCSS** — Utility-first CSS framework
- **shadcn/ui** — Accessible, unstyled components (built on Radix UI)
- **Framer Motion** — Smooth animations and transitions
- **Recharts** — Charts for portfolio performance, allocation, history

### Blockchain Interaction

- **wagmi** — React Hooks for Ethereum (wallet connection, contract calls, transaction signing)
- **viem** — TypeScript interface for Ethereum JSON-RPC, replacing ethers.js (faster, smaller bundle)
- **RainbowKit** — Beautiful wallet connection modal (MetaMask, Coinbase Wallet, WalletConnect)

### Data Fetching

- **TanStack Query (React Query)** — Server state management, caching, automatic refetching
- **The Graph** — Indexing vault events (VaultCreated, SwapExecuted, etc.)
- **Chainlink Price Feeds** — Real-time prices (fetched via smart contract calls)

### State Management

- **Zustand** — Lightweight global state (user preferences, selected chain, UI state)
- **React Context** — Wallet state, multi-chain data

### Deployment

- **Vercel** — Automatic deployments from GitHub, edge functions, CDN
- **IPFS** (optional) — Decentralized hosting for production

---

## Dashboard Structure

### 1. Portfolio Overview

**URL:** `/dashboard`

**Components:**
- **Header:** Total portfolio value, 24h change, wallet address
- **Allocation Pie Chart:** % per chain, % per token
- **Quick Stats Cards:**
  - Total Value Locked
  - Number of Vaults
  - Active Rules
  - Total Trades (all-time)
- **Recent Activity Feed:** Last 10 trades across all vaults

**Data Sources:**
- Vault balances → RPC calls (multicall)
- Token prices → Chainlink Price Feeds
- Trade history → The Graph Subgraph

**Screenshot Wireframe:**
```
┌─────────────────────────────────────────────────────────┐
│ [Logo] Portfolio Overview           [0x1234...5678] [$] │
│                                                         │
│  Total Value: $50,342.18  (+$1,234 / +2.5%)            │
│                                                         │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐       │
│  │ $50.3K │  │ 3      │  │ 8      │  │ 47     │       │
│  │ TVL    │  │ Vaults │  │ Rules  │  │ Trades │       │
│  └────────┘  └────────┘  └────────┘  └────────┘       │
│                                                         │
│  ┌─────────────┐  ┌──────────────────────────────────┐ │
│  │ Allocation  │  │ Recent Activity                  │ │
│  │ [Pie Chart] │  │ • Bought 0.5 ETH on Arbitrum     │ │
│  │             │  │ • Sold 1000 USDC on Ethereum     │ │
│  │ ETH 60%     │  │ • Bought 0.2 ETH on Base         │ │
│  │ USDC 30%    │  │ ...                              │ │
│  │ Other 10%   │  │                                  │ │
│  └─────────────┘  └──────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

### 1.5. Price Monitor Dashboard

**URL:** `/prices` or embedded in dashboard header

**Purpose:** Real-time price tracking with visual indicators

**Components:**

**Price Ticker Bar (Header):**
```
┌─────────────────────────────────────────────────────────┐
│ ETH $2,845 +2.3% │ BTC $48,234 -0.8% │ ARB $1.23 +5.1% │
└─────────────────────────────────────────────────────────┘
```

**Price Monitor Page:**
```
┌─────────────────────────────────────────────────────────┐
│ Price Monitor                           [Add Alert] ⚡   │
│                                                         │
│ ┌────────────────────┐  ┌────────────────────────────┐ │
│ │ ETH/USD            │  │ Price Chart (24h)          │ │
│ │ $2,845.32          │  │    ╱╲                      │ │
│ │ +$64.50 (+2.3%)    │  │   ╱  ╲    ╱╲              │ │
│ │                    │  │  ╱    ╲  ╱  ╲             │ │
│ │ High: $2,890       │  │ ╱      ╲╱    ╲            │ │
│ │ Low:  $2,780       │  │                ╲___        │ │
│ │ Vol:  145.2K ETH   │  │                            │ │
│ │                    │  │ [1H][4H][1D][7D][30D]      │ │
│ │ [Set Alert]        │  └────────────────────────────┘ │
│ └────────────────────┘                                 │
│                                                         │
│ ┌────────────────────┐  ┌────────────────────────────┐ │
│ │ BTC/USD            │  │ ARB/USD                    │ │
│ │ $48,234.10         │  │ $1.23                      │ │
│ │ -$389 (-0.8%)      │  │ +$0.06 (+5.1%)             │ │
│ │ [Set Alert]        │  │ [Set Alert]                │ │
│ └────────────────────┘  └────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

**Features:**

1. **Real-time Price Updates**
   - WebSocket connection to price feeds
   - Update every 10 seconds
   - Smooth animations for price changes
   - Color-coded: green (up), red (down), gray (no change)

2. **Price Charts**
   - Interactive charts (Recharts library)
   - Multiple timeframes: 1H, 4H, 1D, 7D, 30D
   - Hover to see exact price at timestamp
   - Zoom/pan capabilities

3. **Price Statistics**
   - 24h high/low
   - 24h volume
   - Market cap (if available)
   - Price change percentage (1h, 24h, 7d, 30d)

4. **Quick Alert Setup**
   - "Set Alert" button on each price card
   - Quick modal: Enter target price → Select notification channel → Done
   - One-click alerts for common thresholds (+5%, -5%, +10%, -10%)

---

### 1.6. Features Control Panel

**URL:** `/settings/features` or embedded in Settings page

**Purpose:** User-configurable feature toggles with default states

**Features Table:**

| Feature               | Description                                           | Default | User Control |
| --------------------- | ----------------------------------------------------- | ------- | ------------ |
| **Price Monitor**     | Track real-time prices, display on dashboard          | ON      | Toggle ON/OFF |
| **Price Alerts**      | Receive notifications when price reaches thresholds   | ON      | Toggle + Configure channels |
| **Auto Swap**         | Automatically swap tokens based on trading rules      | OFF     | Toggle + Set rules |
| **AI Trading**        | AI autonomously executes trades within spending limits | OFF     | Toggle + Set limits |

**UI Component:**

```tsx
// FeatureToggle.tsx
<Card>
  <div className="flex items-center justify-between">
    <div>
      <h3>Price Monitor</h3>
      <p className="text-sm text-gray-500">
        Track real-time prices, display on dashboard
      </p>
    </div>
    <Switch
      checked={features.priceMonitor}
      onChange={() => toggleFeature('priceMonitor')}
    />
  </div>
</Card>

<Card>
  <div className="flex items-center justify-between">
    <div>
      <h3>Price Alerts ⚡</h3>
      <p className="text-sm text-gray-500">
        Receive notifications when price reaches thresholds
      </p>
      {features.priceAlerts && (
        <div className="mt-2">
          <Badge>Email</Badge>
          <Badge>Discord</Badge>
          <Badge>Telegram</Badge>
          <Link href="/settings/alerts">Configure →</Link>
        </div>
      )}
    </div>
    <Switch
      checked={features.priceAlerts}
      onChange={() => toggleFeature('priceAlerts')}
    />
  </div>
</Card>

<Card>
  <div className="flex items-center justify-between">
    <div>
      <h3>Auto Swap 🔄</h3>
      <p className="text-sm text-gray-500">
        Automatically swap tokens based on trading rules
      </p>
      {features.autoSwap && (
        <div className="mt-2 text-sm">
          <span className="text-green-600">✓ 3 active rules</span>
          <Link href="/vaults/[id]/rules" className="ml-2">
            Manage rules →
          </Link>
        </div>
      )}
    </div>
    <Switch
      checked={features.autoSwap}
      onChange={() => toggleFeature('autoSwap')}
    />
  </div>
</Card>

<Card className="border-yellow-200 bg-yellow-50">
  <div className="flex items-center justify-between">
    <div>
      <h3>AI Trading 🤖</h3>
      <p className="text-sm text-gray-500">
        AI autonomously executes trades within spending limits
      </p>
      {!features.aiTrading ? (
        <Alert className="mt-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            AI Trading is OFF. Enable to let AI make autonomous trading decisions within your limits.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="mt-2 space-y-1 text-sm">
          <div>Daily Limit: $2,450 / $5,000 (49%)</div>
          <div>Weekly Limit: $8,200 / $20,000 (41%)</div>
          <Link href="/settings/ai-trading" className="text-blue-600">
            Configure limits →
          </Link>
        </div>
      )}
    </div>
    <Switch
      checked={features.aiTrading}
      onChange={() => handleAITradingToggle()}
      disabled={!isAITradingConfigured}
    />
  </div>
</Card>
```

**Feature Interactions:**

1. **Price Monitor → Price Alerts**
   - Price Alerts requires Price Monitor to be enabled
   - If Price Monitor is disabled, Price Alerts automatically disabled

2. **Auto Swap (Rule-based)**
   - Independent feature
   - User sets explicit buy/sell thresholds
   - CRE executes when conditions met

3. **AI Trading (Autonomous)**
   - Requires user to configure spending limits first
   - Cannot be enabled without limits
   - Shows warning modal before enabling
   - One-click emergency stop button always visible when active

**Warning Modal for AI Trading:**

```
┌────────────────────────────────────────┐
│ ⚠️  Enable AI Auto-Trading?            │
├────────────────────────────────────────┤
│                                        │
│ AI will autonomously execute trades    │
│ within your spending limits:           │
│                                        │
│ • Daily Limit: $5,000                  │
│ • Per-Trade Limit: $1,000              │
│ • Max Drawdown: 15%                    │
│                                        │
│ You can pause AI trading at any time   │
│ with one click. All trades are logged  │
│ and transparent.                       │
│                                        │
│ [Cancel] [Configure Limits]            │
│          [Enable AI Trading] →         │
└────────────────────────────────────────┘
```

---

### 2. Vault Management

**URL:** `/vaults`

**Features:**
- **List all vaults** (grouped by chain)
- **Create new vault** (button triggers wallet chain switch + transaction)
- **Vault cards** showing:
  - Chain icon (Ethereum, Arbitrum, Base)
  - Vault address (truncated, copy button)
  - Total value
  - Number of active rules
  - Status (Active, Paused)
- **Click vault card** → Navigate to vault details

**Components:**
```tsx
// VaultCard.tsx
<Card>
  <ChainBadge chain="arbitrum" />
  <Address>0xabcd...1234</Address>
  <Value>$15,234.56</Value>
  <Rules>3 active rules</Rules>
  <Status>Active</Status>
  <Button onClick={navigateToVault}>Manage</Button>
</Card>
```

---

### 3. Rule Configuration

**URL:** `/vaults/[vaultAddress]/rules`

**Features:**
- **List existing rules** (table view)
- **Add new rule** (form modal)
- **Edit rule** (inline edit or modal)
- **Disable/Enable rule** (toggle)
- **Delete rule** (with confirmation)

**Rule Form Fields:**
- Token Pair (dropdown: USDC/ETH, USDC/BTC, etc.)
- Buy Threshold (USD)
- Sell Threshold (USD)
- Trade Amount (tokens)
- Slippage Tolerance (%)
- Cooldown Period (hours)

**AI Integration:**
- **"Get AI Suggestions" button** → Calls AI Engine API
- **AI response** → Auto-fills form fields
- **User can override** before submitting

**Screenshot Wireframe:**
```
┌─────────────────────────────────────────────────────────┐
│ Vault: 0xabcd...1234 (Arbitrum)                         │
│                                                         │
│ [Add Rule] [Get AI Suggestions]                        │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Pair      Buy      Sell     Amount  Status  Actions │ │
│ ├─────────────────────────────────────────────────────┤ │
│ │ ETH/USDC  $2,750   $3,250   1000    Active  [Edit]  │ │
│ │ BTC/USDC  $45,000  $52,000  5000    Active  [Edit]  │ │
│ │ ARB/USDC  $1.20    $1.50    2000    Paused  [Edit]  │ │
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

### 4. Execution History

**URL:** `/vaults/[vaultAddress]/history`

**Features:**
- **Filterable table:**
  - Date range picker
  - Token filter (ETH, BTC, etc.)
  - Type filter (Buy, Sell)
- **Columns:**
  - Timestamp
  - Type (Buy/Sell with icon)
  - Token Pair
  - Amount
  - Price
  - Slippage (actual)
  - Gas Cost
  - Transaction Hash (link to block explorer)
- **Export to CSV** button
- **Pagination** (50 per page)

**Data Source:** The Graph Subgraph (SwapExecuted events)

---

### 5. AI Insights

**URL:** `/insights`

**Features:**
- **Market Overview:**
  - Current trends (bullish, bearish, sideways)
  - Volatility indicators
  - Support/Resistance levels
- **AI Recommendations:**
  - Threshold suggestions per vault
  - Risk alerts (portfolio concentration, drawdown, volatility spike)
- **Performance Metrics:**
  - AI-suggested vs. user-set returns
  - Backtest accuracy
  - Win rate

**Components:**
```tsx
// AIInsightCard.tsx
<Card>
  <Title>ETH Market Analysis</Title>
  <Trend>Bullish (+68% confidence)</Trend>
  <Recommendation>
    Buy at $2,560, Sell at $3,190
    (Backtest: +28.5% over 90 days)
  </Recommendation>
  <Button onClick={applyToVault}>Apply to Vault</Button>
</Card>
```

---

### 6. Settings

**URL:** `/settings`

**Features:**
- **Wallet:** Connected address, disconnect button
- **Chain Preferences:** Default chain for new vaults
- **Notifications:** Email, Discord webhook, Telegram bot
- **Risk Tolerance:** Conservative, Moderate, Aggressive (affects AI suggestions)
- **Router Allowlist:** Add/remove DEX router addresses per vault
- **Export Data:** Download all vault data as JSON
- **Delete Account:** Remove all user data (GDPR compliance)

---

## User Flows

### Flow 1: Create Vault & Set Rule

1. User lands on `/dashboard`
2. Click **"Create Vault"**
3. Modal: "Select Chain" → Choose Arbitrum
4. If wallet on wrong chain → Prompt to switch
5. User approves chain switch
6. Click **"Confirm Create Vault"**
7. Wallet prompts transaction (~$1 gas)
8. User confirms
9. Wait for transaction (~10 seconds)
10. Success! Vault created at `0xabcd...1234`
11. Navigate to `/vaults/0xabcd...1234/rules`
12. Click **"Add Rule"**
13. Fill form: USDC/ETH, Buy $2,750, Sell $3,250, Amount 1000
14. Click **"Save Rule"**
15. Wallet prompts transaction
16. User confirms
17. Success! Rule active, CRE now monitoring

**Total time:** ~2 minutes

---

### Flow 2: Deposit Funds

1. Navigate to vault `/vaults/0xabcd...1234`
2. Click **"Deposit"**
3. Modal: Select token (USDC), enter amount (5000)
4. Click **"Approve"** (first-time only)
5. Wallet prompts approval transaction
6. User confirms
7. Wait for approval (~10 seconds)
8. Click **"Deposit"**
9. Wallet prompts deposit transaction
10. User confirms
11. Success! Balance updated in dashboard

---

### Flow 3: View Execution

1. Navigate to `/vaults/0xabcd...1234/history`
2. See table of past trades
3. Click on a trade → Modal with full details:
   - Transaction hash (link to Arbiscan)
   - Execution price
   - Slippage (expected vs. actual)
   - Gas cost
   - Before/After portfolio state

---

## Real-Time Updates

### Data Freshness Strategy

| Data Type | Update Method | Frequency |
|-----------|---------------|-----------|
| **Vault balances** | RPC multicall | Every 30 seconds (React Query polling) |
| **Token prices** | Chainlink Price Feeds | Every 10 seconds |
| **Execution history** | The Graph Subgraph | Every 10 seconds (polling) |
| **AI insights** | REST API | On-demand (cached 5 minutes) |

### WebSocket (Future — Phase 1)

For real-time notifications:
- New trade executed → Toast notification
- Vault paused → Alert banner
- Price threshold crossed → Push notification (if enabled)

---

## Mobile Responsiveness

**Design Philosophy:** Mobile-first

**Breakpoints:**
- **Mobile:** < 640px (1 column, stacked cards)
- **Tablet:** 640px - 1024px (2 columns)
- **Desktop:** > 1024px (3+ columns, full dashboard)

**Key Considerations:**
- Large touch targets (48px minimum)
- Bottom navigation bar on mobile
- Swipeable vault cards
- Collapsible sections to reduce scrolling

---

## Accessibility (a11y)

**Compliance:** WCAG 2.1 Level AA

**Features:**
- Keyboard navigation (Tab, Enter, Esc)
- Screen reader support (ARIA labels)
- High contrast mode
- Focus indicators
- Alt text for all images/icons

**Testing:** Lighthouse, axe DevTools

---

## Performance Optimization

### Code Splitting

- **Route-based:** Each page is a separate bundle (Next.js automatic)
- **Component-based:** Lazy load heavy components (charts, modals)

```tsx
const RechartsChart = dynamic(() => import('./Chart'), { ssr: false });
```

### Lazy Loading

- Load vault data only when user navigates to vault page
- Defer loading of execution history until "History" tab clicked

### Caching

- **React Query:** Cache RPC responses for 30 seconds
- **Service Worker:** Cache static assets (fonts, icons)
- **Next.js ISR:** Pre-render public pages (landing, docs)

### Bundle Size

- Target: < 300KB initial JS bundle
- Use `next/bundle-analyzer` to identify bloat
- Tree-shake unused dependencies

---

## Security

### Frontend Security Practices

- ✅ **No private keys stored** — Only wallet connection via wagmi
- ✅ **Transaction simulation** — Show estimated outcome before signing (Tenderly Simulate API)
- ✅ **Address verification** — Display full contract address before approval
- ✅ **HTTPS only** — Force redirect from HTTP
- ✅ **Content Security Policy** — Prevent XSS attacks
- ✅ **Input validation** — Sanitize all user inputs
- ✅ **Rate limiting** — Prevent API abuse (Vercel Edge Functions)

### What Users See Before Transactions

**Example: Setting a rule**
```
┌────────────────────────────────────┐
│ You are about to set a trading    │
│ rule on your vault:                │
│                                    │
│ Vault: 0xabcd...1234 (Arbitrum)    │
│ Rule: Buy ETH at $2,750            │
│       Sell ETH at $3,250           │
│ Max Trade: 1,000 USDC              │
│ Slippage: 1%                       │
│                                    │
│ Estimated Gas: 0.0005 ETH (~$1.42) │
│                                    │
│ [Cancel] [Confirm in Wallet]       │
└────────────────────────────────────┘
```

---

## Testing

### Unit Tests

- **Framework:** Vitest (faster than Jest for Vite/Next.js)
- **Coverage target:** >80% for utility functions, hooks
- **Example:** Test token amount formatting, address truncation

```tsx
// Example test
import { formatUSD } from '@/lib/format';

test('formatUSD', () => {
  expect(formatUSD(1234.56)).toBe('$1,234.56');
  expect(formatUSD(0.1)).toBe('$0.10');
});
```

### Integration Tests

- **Framework:** React Testing Library
- **Test:** Component interactions (click button → modal opens)

### End-to-End Tests

- **Framework:** Playwright
- **Test scenarios:**
  - Connect wallet → Create vault → Set rule → Deposit
  - View execution history → Filter by date → Export CSV

**Run E2E tests on testnet forks** (no real transactions)

---

## Deployment

### Vercel (Primary)

**Workflow:**
1. Push to `main` branch → Automatic deployment to production
2. Push to `dev` branch → Automatic preview deployment
3. Pull request → Automatic preview URL

**Features:**
- Edge Functions (API routes)
- Automatic HTTPS
- Custom domain (TBD)
- Analytics (Web Vitals, Core Web Vitals)

### IPFS (Decentralized Backup)

**Why IPFS?** Censorship resistance, decentralized hosting

**Workflow:**
1. Build production bundle: `pnpm build`
2. Export static site: `pnpm export`
3. Upload to IPFS: `ipfs add -r out/`
4. Pin on Pinata or Infura
5. Distribute IPFS hash to users (e.g., `ipfs://QmXyz...`)

**ENS Integration (Future):**
- Point `sentient.eth` → IPFS hash
- Users access via [sentient.eth.limo](https://sentient.eth.limo)

---

## Related Documentation

- [Architecture](01-architecture.md) — How frontend fits into system architecture
- [User Guide](08-user-guide.md) — Step-by-step usage instructions
- [API Reference](10-api-reference.md) — API endpoints used by frontend
- [Development Guide](09-development.md) — How to run frontend locally

**Build beautiful interfaces, empower users! 🎨**
