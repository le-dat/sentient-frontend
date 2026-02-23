# AI Strategy Engine

[← Back to Overview](Claude.md)

---

## Overview

The AI Engine is the intelligence layer that analyzes market data and provides data-driven recommendations to help you optimize your trading strategies. It's designed to assist, not to control—**AI suggests, you decide.**

**Key Principle:** AI recommendations are **off-chain suggestions**. Only you can set on-chain trading rules via wallet transactions.

---

## Core Components

The AI Engine consists of three main modules:

### 1. Market Analyzer

**Purpose:** Analyze market conditions to identify optimal entry/exit points

**Capabilities:**
- **Volatility analysis** — Calculate historical volatility (HV), implied volatility (IV), Bollinger Bands
- **Trend detection** — Identify bullish, bearish, or sideways trends using moving averages (MA), MACD, RSI
- **Market regime detection** — Classify current market as "high volatility," "low volatility," "trending up," "trending down," "choppy"
- **Support/resistance levels** — Identify key price levels using historical data

**Data Sources:**
- Chainlink Price Feeds (on-chain, tamper-proof)
- CoinGecko API (historical data, 24h volume, market cap)
- The Graph Subgraph (execution history from your vaults)

**Output:**
```json
{
  "token": "ETH/USD",
  "currentPrice": 2845.32,
  "volatility": {
    "7d": 0.42,
    "30d": 0.38,
    "regime": "moderate"
  },
  "trend": {
    "direction": "bullish",
    "strength": 0.68,
    "indicators": {
      "ma50": 2720,
      "ma200": 2450,
      "rsi": 62
    }
  },
  "supportResistance": {
    "support": [2750, 2680, 2600],
    "resistance": [2900, 2980, 3100]
  }
}
```

---

### 2. Threshold Optimizer

**Purpose:** Suggest optimal buy/sell thresholds based on backtesting and risk tolerance

**How it works:**
1. **Collect historical data** (price, volume, volatility for last 90 days)
2. **Simulate strategies** with different thresholds (e.g., buy at -5%, -10%, -15%; sell at +5%, +10%, +15%)
3. **Backtest performance** for each strategy (total return, Sharpe ratio, max drawdown)
4. **Rank strategies** by risk-adjusted return
5. **Return top 3 recommendations** tailored to user's risk tolerance

**Risk Tolerance Levels:**

| Level | Target Return | Max Drawdown | Threshold Range | Example |
|-------|--------------|--------------|-----------------|---------|
| **Conservative** | 10-20% APY | -15% | Buy: -3% to -8% / Sell: +3% to +8% | Buy ETH at -5%, Sell at +5% |
| **Moderate** | 20-40% APY | -25% | Buy: -8% to -15% / Sell: +8% to +15% | Buy ETH at -10%, Sell at +12% |
| **Aggressive** | 40%+ APY | -40% | Buy: -15% to -30% / Sell: +15% to +30% | Buy ETH at -20%, Sell at +25% |

**Output:**
```json
{
  "token": "ETH/USD",
  "currentPrice": 2845.32,
  "riskTolerance": "moderate",
  "recommendations": [
    {
      "strategy": "Mean Reversion",
      "buyThreshold": 2560,
      "sellThreshold": 3190,
      "backtestResults": {
        "period": "90d",
        "totalReturn": 32.5,
        "sharpeRatio": 1.84,
        "maxDrawdown": -18.2,
        "winRate": 0.67,
        "numTrades": 12
      },
      "confidence": 0.82
    },
    {
      "strategy": "Trend Following",
      "buyThreshold": 2680,
      "sellThreshold": 3100,
      "backtestResults": {
        "period": "90d",
        "totalReturn": 28.1,
        "sharpeRatio": 1.62,
        "maxDrawdown": -22.4,
        "winRate": 0.58,
        "numTrades": 18
      },
      "confidence": 0.75
    }
  ]
}
```

---

### 3. Risk Monitor

**Purpose:** Continuously monitor portfolio risk and alert on dangerous conditions

**Metrics tracked:**
- **Portfolio concentration** — % of portfolio in single asset (warn if >50%)
- **Drawdown from peak** — Current value vs. all-time high (warn if >30%)
- **Volatility spike** — Sudden increase in volatility (warn if 2x normal)
- **Correlation risk** — High correlation across positions (warn if corr >0.8)
- **Liquidation risk** — Not applicable (no leverage in MVP, but future consideration)

**Alert Levels:**

| Level | Condition | Action |
|-------|-----------|--------|
| 🟢 **Normal** | All metrics within normal range | No action |
| 🟡 **Caution** | 1 metric approaching threshold | Dashboard notification |
| 🔴 **Warning** | 1+ metrics exceeding threshold | Email + Discord alert |
| ⚫ **Critical** | Multiple severe threshold breaches | Suggest pausing vault |

**Output:**
```json
{
  "portfolioValue": 50000,
  "riskScore": 6.2,
  "riskLevel": "caution",
  "alerts": [
    {
      "type": "concentration",
      "severity": "medium",
      "message": "ETH represents 62% of portfolio. Consider diversifying.",
      "recommendation": "Rebalance to <50% in single asset"
    },
    {
      "type": "volatility",
      "severity": "low",
      "message": "ETH volatility increased 1.8x in last 7 days.",
      "recommendation": "Consider widening slippage to 2%"
    }
  ]
}
```

---

### 4. AI Auto-Trading Mode (Phase 1.5)

**Purpose:** Allow AI to autonomously execute trades within user-defined spending limits

**Key Principle:** AI can execute trades automatically, but with strict guardrails set by the user.

**How It Works:**

1. **User Enables AI Auto-Trading**
   - User must explicitly opt-in via dashboard settings
   - Requires signing a transaction to grant AI executor permissions
   - Can be disabled/paused at any time

2. **User Sets Spending Limits**
   ```javascript
   {
     dailyLimit: 5000,      // Max $5,000 USD per day
     weeklyLimit: 20000,    // Max $20,000 USD per week
     perTradeLimit: 2000,   // Max $2,000 per single trade
     maxDrawdown: 0.15,     // Pause if portfolio drops >15%
     allowedTokens: ["ETH", "BTC", "USDC"]  // Only trade these tokens
   }
   ```

3. **AI Makes Autonomous Decisions**
   - AI analyzes market conditions in real-time
   - Decides when to buy/sell based on its strategy
   - Executes trades automatically (no user approval needed)
   - All trades stay within spending limits

4. **Safety Features**
   - **Spending limits enforced on-chain** (via smart contract)
   - **Circuit breaker:** Auto-pause if unusual activity detected
   - **Cooldown period:** Minimum 5 minutes between AI trades
   - **Emergency stop:** User can pause AI with one click
   - **Activity log:** Full transparency of AI decisions

**Example Scenario:**

User enables AI Auto-Trading with these settings:
- Daily limit: $5,000
- Per-trade limit: $1,000
- Strategy: Conservative (10-20% APY target)

AI observes:
- ETH drops from $3,000 to $2,750 (-8.3%)
- Market sentiment still bullish
- Good entry point based on support level

AI executes autonomously:
- Buy $1,000 USDC → ETH at $2,750
- User receives notification: "AI bought 0.36 ETH at $2,750"
- Remaining daily limit: $4,000

**User Controls:**

| Setting | Purpose |
|---------|---------|
| **Enable/Disable** | Turn AI Auto-Trading on/off |
| **Daily Limit** | Max USD spent per day |
| **Weekly Limit** | Max USD spent per week |
| **Per-Trade Limit** | Max USD per single trade |
| **Max Drawdown** | Auto-pause if portfolio drops X% |
| **Risk Tolerance** | Conservative, Moderate, Aggressive |
| **Allowed Tokens** | Whitelist of tradeable tokens |
| **Emergency Stop** | Immediately pause all AI activity |

**Notifications:**

Users receive real-time notifications for:
- AI trade executed (with details)
- Approaching spending limits (80%, 90%, 100%)
- Circuit breaker triggered
- Strategy performance updates (daily summary)

**Dashboard Display:**

```
┌─────────────────────────────────────────┐
│ AI Auto-Trading: ACTIVE 🟢              │
├─────────────────────────────────────────┤
│ Daily Limit:    $2,450 / $5,000 (49%)   │
│ Weekly Limit:   $8,200 / $20,000 (41%)  │
│ Trades Today:   4 (3 wins, 1 loss)      │
│ 24h Return:     +$127 (+2.5%)           │
│                                         │
│ [Pause AI] [View Activity Log]          │
└─────────────────────────────────────────┘
```

**Smart Contract Integration:**

```solidity
// New vault permission for AI executor
function enableAITrading(
  uint256 dailyLimit,
  uint256 weeklyLimit,
  uint256 perTradeLimit,
  uint256 maxDrawdown
) external onlyOwner {
  aiTradingConfig = AITradingConfig({
    enabled: true,
    dailyLimit: dailyLimit,
    weeklyLimit: weeklyLimit,
    perTradeLimit: perTradeLimit,
    maxDrawdown: maxDrawdown,
    dailySpent: 0,
    weeklySpent: 0,
    lastResetDay: block.timestamp / 1 days,
    lastResetWeek: block.timestamp / 1 weeks
  });
  emit AITradingEnabled(dailyLimit, weeklyLimit);
}

// AI executor can only call within limits
function executeAITrade(...) external onlyAIExecutor {
  require(aiTradingConfig.enabled, "AI trading disabled");
  require(amount <= aiTradingConfig.perTradeLimit, "Exceeds per-trade limit");
  require(aiTradingConfig.dailySpent + amount <= aiTradingConfig.dailyLimit, "Exceeds daily limit");
  // ... execute trade
}
```

**Transparency & Trust:**

- **Full activity log:** Every AI decision is logged with reasoning
- **Backtesting results:** Show how AI would have performed historically
- **Performance tracking:** Compare AI returns vs. user-set rules
- **Open source AI logic:** Strategy code published on GitHub
- **Third-party audits:** AI logic audited by security firms

**Limitations:**

- ❌ AI cannot withdraw funds (only swap within vault)
- ❌ AI cannot change spending limits (only user can)
- ❌ AI cannot transfer vault ownership
- ❌ AI cannot disable user's emergency stop button

**Status:** Planned for Phase 1.5 (Q2 2026). Currently in design phase.

---

### 5. Rebalancing Logic (Future — Phase 2)

**Purpose:** Suggest portfolio rebalancing to maintain target allocation

**Example:**
- **Target:** 60% ETH, 30% BTC, 10% Stablecoins
- **Current:** 70% ETH, 20% BTC, 10% Stablecoins
- **AI suggests:** Sell 10% ETH → Buy 10% BTC

**Status:** Not implemented in MVP. Planned for Q3 2026.

---

## AI Output Format

All AI responses follow a consistent JSON schema:

```json
{
  "timestamp": "2026-02-08T12:34:56Z",
  "requestId": "uuid-12345",
  "token": "ETH/USD",
  "analysisType": "threshold_optimization",
  "result": {
    "recommendations": [...],
    "marketContext": {...},
    "backtestResults": {...}
  },
  "metadata": {
    "modelVersion": "v1.2.3",
    "dataSource": "chainlink+coingecko",
    "processingTimeMs": 234
  }
}
```

**Why JSON?** Allows frontend to programmatically parse and display recommendations in a user-friendly UI.

---

## Technology Stack

### Backend Infrastructure

- **Language:** Python 3.11
- **Framework:** FastAPI (high-performance async API)
- **ML Libraries:**
  - `scikit-learn` — Classification, regression, feature engineering
  - `pandas` / `numpy` — Data manipulation
  - `TA-Lib` — Technical analysis indicators (RSI, MACD, Bollinger Bands)
- **Database:** PostgreSQL (store historical price data, backtest results)
- **Caching:** Redis (cache Chainlink prices, reduce API calls)
- **Deployment:** Docker + AWS ECS / GCP Cloud Run

### Machine Learning Models (MVP)

**Current approach:** Statistical models, not deep learning

- **Volatility prediction:** GARCH (Generalized Autoregressive Conditional Heteroskedasticity)
- **Trend detection:** Moving averages, MACD crossovers
- **Backtesting:** Walk-forward analysis with rolling window

**Why not deep learning in MVP?** Simpler models are more interpretable, require less data, and are easier to debug. Deep learning planned for Phase 2.

---

## User Interaction Model

### 1. Request AI Insights

User clicks **"Get AI Insights"** in dashboard → Frontend calls AI Engine API:

```http
POST /v1/analyze
Content-Type: application/json

{
  "token": "ETH/USD",
  "riskTolerance": "moderate",
  "currentHoldings": {
    "ETH": 10.5,
    "USDC": 5000
  }
}
```

### 2. AI Analyzes & Returns Recommendations

AI Engine responds in ~1-3 seconds:

```json
{
  "recommendations": [
    {
      "buyThreshold": 2560,
      "sellThreshold": 3190,
      "expectedReturn": 28.5,
      "confidence": 0.82
    }
  ],
  "marketContext": {
    "trend": "bullish",
    "volatility": "moderate"
  }
}
```

### 3. User Reviews & Decides

Frontend displays:
- **AI Suggestion:** "Buy ETH at $2,560, Sell at $3,190"
- **Backtest:** +28.5% over 90 days, 67% win rate
- **Market Context:** Bullish trend, moderate volatility

User options:
- ✅ **Accept** → Auto-fill rule form with AI values
- ✏️ **Modify** → Adjust thresholds before saving
- ❌ **Reject** → Manually set different thresholds

### 4. User Sets On-Chain Rule

Regardless of choice, user must **sign a transaction** to save the rule on-chain. AI cannot set rules autonomously.

---

## Privacy & Data

### What Data AI Engine Collects

- ✅ **Public blockchain data** (prices, volumes, DEX liquidity)
- ✅ **Your vault holdings** (to calculate portfolio risk)
- ✅ **Your execution history** (to improve recommendations)

### What AI Engine DOES NOT Collect

- ❌ **Your private keys** (never leave your wallet)
- ❌ **Your wallet address** (unless you explicitly connect)
- ❌ **Your identity** (no KYC, no emails, no tracking cookies)

### Data Storage

- All data is **aggregated and anonymized** for model training
- No personally identifiable information (PII) stored
- You can delete your data anytime (GDPR compliant)

---

## Performance Monitoring

### Metrics Tracked

- **Recommendation accuracy** — Did AI-suggested thresholds outperform user-set thresholds?
- **Backtest vs. actual** — How well did backtested returns match real execution?
- **Alert precision** — False positive rate for risk alerts
- **API latency** — 95th percentile response time
- **Model drift** — Are models degrading over time?

### Continuous Improvement

- Weekly model retraining with latest data
- A/B testing of different strategies
- User feedback collection ("Was this recommendation helpful?")
- Quarterly model version upgrades

---

## Future Enhancements

### Phase 1 (Q2 2026): Enhanced Intelligence

- **Sentiment analysis** — Integrate Twitter, Reddit sentiment for altcoins
- **Multi-timeframe analysis** — Combine 1h, 4h, 1d signals for higher accuracy
- **Gas optimization** — Suggest best time to trade based on historical gas prices
- **Dynamic thresholds** — Auto-adjust thresholds based on market regime changes

### Phase 2 (Q3 2026): Advanced AI

- **LSTM networks** — Deep learning for price prediction
- **Reinforcement learning** — RL agent learns optimal strategies via simulation
- **Portfolio rebalancing** — Auto-suggest rebalancing to maintain target allocation
- **Multi-asset strategies** — Pair trading, arbitrage, basket strategies

### Phase 3 (Q4 2026): Institutional-Grade

- **Custom model training** — Allow users to train models on their own data
- **Strategy backtesting platform** — Full UI for backtesting custom strategies
- **Risk management tools** — VaR (Value at Risk), CVaR, stress testing
- **API access** — Programmatic access for quant traders

---

## API Endpoints

See [API Reference](10-api-reference.md) for full documentation.

**Quick overview:**

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/v1/health` | GET | Health check |
| `/v1/analyze` | POST | Get market analysis |
| `/v1/optimize` | POST | Get threshold recommendations |
| `/v1/risk` | POST | Get portfolio risk score |

---

## Testing & Validation

### Backtesting

- **Walk-forward validation** — Train on 70% data, test on 30% unseen data
- **Out-of-sample testing** — Test on data from different market regimes
- **Monte Carlo simulation** — Simulate 1,000+ scenarios to estimate risk

### Live Testing (Paper Trading)

Before recommending strategies to users:
1. Paper trade strategy for 30 days
2. Compare paper results to backtest predictions
3. If Sharpe ratio >1.5 and max drawdown <20% → Approve for production
4. If not → Retrain model

### User Feedback Loop

- "Was this recommendation helpful?" (thumbs up/down)
- Track which AI recommendations users accept vs. reject
- Retrain models to align with user preferences

---

## Limitations & Disclaimers

### What AI Can Do

- ✅ Analyze historical patterns and trends
- ✅ Backtest strategies on past data
- ✅ Calculate statistical probabilities
- ✅ Suggest data-driven thresholds

### What AI Cannot Do

- ❌ **Predict the future** — Past performance ≠ future results
- ❌ **Guarantee profits** — All trading involves risk
- ❌ **Account for black swans** — Unexpected events (COVID, LUNA crash) invalidate historical models
- ❌ **Replace your judgment** — You make final decisions, not AI

### Use AI Responsibly

- Review all AI suggestions before applying
- Understand the strategy (don't blindly trust)
- Start small and test thoroughly
- Diversify (don't put all funds in one AI-recommended strategy)
- Monitor performance regularly

---

## Related Documentation

- [Architecture](01-architecture.md) — How AI Engine fits into system architecture
- [User Guide](08-user-guide.md) — How to use AI insights in practice
- [API Reference](10-api-reference.md) — Full API docs for AI endpoints

**AI is a tool, not a crystal ball. Use wisely! 🧠**
