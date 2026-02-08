# User Guide

[← Back to Overview](Claude.md)

---

## Welcome to Sentient Finance

This guide will help you create your first vault, set up trading rules, and automate your portfolio management. By the end, you'll have a fully automated portfolio that trades 24/7 while you maintain full control.

### Prerequisites

Before you start, make sure you have:
- **A Web3 wallet** (MetaMask, Coinbase Wallet, WalletConnect)
- **Funds on your chosen blockchain** (Ethereum, Arbitrum, or Base)
- **Gas tokens** (ETH for transaction fees)
- **Basic understanding** of DeFi, wallets, and blockchain transactions

---

## Getting Started

<!-- Application not deployed yet -->

### Step 1: Connect Your Wallet (Planned)

1. Visit the application
2. Click **"Connect Wallet"**
3. Choose your wallet provider
4. Approve the connection request
5. Your address will appear in the top-right corner

### Step 2: Select a Blockchain

Choose which blockchain you want to use for this vault:

| Chain | Best For | Gas Fees | DEX Liquidity |
|-------|----------|----------|---------------|
| **Ethereum** | Large portfolios, major tokens | High | Highest |
| **Arbitrum** | Active trading, lower fees | Low | High |
| **Base** | Lower caps, Coinbase ecosystem | Very Low | Medium |

**Note:** You can create vaults on multiple chains and manage them all from one dashboard.

### Step 3: Create Your Vault

1. Click **"Create Vault"**
2. Review the transaction details
3. Confirm in your wallet
4. Wait for transaction confirmation (~10-60 seconds)
5. Your vault address will appear in your dashboard

**What just happened?** A smart contract vault was deployed specifically for you. Only you can deposit/withdraw from this vault.

### Step 4: Deposit Funds

1. Navigate to your vault
2. Click **"Deposit"**
3. Choose token (USDC, WETH, etc.)
4. Enter amount
5. Click **"Approve"** (first-time only)
6. Click **"Deposit"**
7. Confirm both transactions in your wallet

**Security Note:** Your funds remain in YOUR vault. The automation system cannot withdraw your funds, only execute trades according to your rules.

---

## Setting Trading Rules

### Step 5: Configure Your First Rule

Let's set up a simple rule: **Buy ETH when it drops below $2,800, sell when it rises above $3,200.**

1. Click **"Add Rule"**
2. Fill in the form:
   ```
   Token Pair: USDC → WETH
   Buy Threshold: $2,800
   Sell Threshold: $3,200
   Trade Amount: 1000 USDC
   Slippage: 1%
   ```
3. Click **"Save Rule"**
4. Confirm transaction in wallet

**How it works:**
- When ETH price ≤ $2,800, Chainlink CRE will swap 1,000 USDC → WETH
- When ETH price ≥ $3,200, Chainlink CRE will swap WETH → 1,000 USDC
- Cooldown period (24h) prevents multiple executions in short time

### Step 6: Get AI Recommendations (Optional)

Want help setting optimal thresholds?

1. Click **"AI Insights"** on your vault
2. Review AI-suggested thresholds based on:
   - Historical volatility
   - Current market regime
   - Risk tolerance
3. Click **"Apply Suggestions"** to auto-fill the rule form
4. Review and adjust if needed
5. Save the rule

**Remember:** AI suggests, you control. You can always override AI recommendations.

---

## How Automation Works

### Execution Flow

```
1. Chainlink CRE monitors price feeds 24/7
2. Price crosses your threshold (e.g., ETH = $2,799)
3. CRE triggers vault.executeSwap()
4. Vault validates:
   ✓ Cooldown period passed?
   ✓ Slippage within limit?
   ✓ Router is allowed?
   ✓ Trade size within max?
5. If valid → Execute swap on DEX (Uniswap, 1inch)
6. If invalid → Revert (no trade)
7. Log event → Appears in your dashboard
```

### Cooldown Period

- **Default:** 24 hours between trades for the same rule
- **Why:** Prevents rapid trading in volatile markets; reduces gas costs; protects against manipulation
- **Can you change it?** Yes, update the rule (minimum 1 hour recommended)

### Slippage Protection

- **What it is:** Maximum price difference you'll accept during trade execution
- **Default:** 1% (trade reverts if price moves >1% unfavorably)
- **Best practice:**
  - Low liquidity pairs: 2-3%
  - High liquidity pairs: 0.5-1%
  - Very volatile markets: Consider 2-5%

---

## Monitoring Your Portfolio

### Portfolio Overview

Your dashboard shows:
- **Total Value:** Aggregated across all chains
- **Allocation:** Pie chart of token distribution
- **Recent Activity:** Last 10 trades
- **Active Rules:** All configured trading rules
- **AI Alerts:** Risk warnings, volatility changes

### Vault Details

Click on any vault to see:
- Current holdings
- Active rules with status
- Execution history (filterable by date, token)
- Performance metrics (% gain/loss, total volume)

### Execution History

View all past trades:
- **Timestamp:** When trade executed
- **Type:** Buy or Sell
- **Price:** Execution price
- **Amount:** Tokens swapped
- **Slippage:** Actual slippage experienced
- **Gas:** Transaction cost
- **Export:** Download CSV for tax reporting

---

## Managing Your Vault

### Update a Rule

1. Go to **"Rules"** tab in your vault
2. Click **"Edit"** on the rule
3. Modify thresholds, amounts, or slippage
4. Click **"Update Rule"**
5. Confirm transaction

### Disable a Rule

Want to pause a specific rule without deleting it?

1. Click **"Disable"** on the rule
2. Confirm transaction
3. Rule remains visible but won't execute
4. Re-enable anytime with **"Enable"**

### Withdraw Funds

1. Navigate to your vault
2. Click **"Withdraw"**
3. Choose token and amount (or "Withdraw All")
4. Confirm transaction
5. Funds arrive in your wallet immediately

**Important:** You can withdraw anytime, even if rules are active. No lock-up period.

### Pause Vault (Emergency)

If you need to stop ALL automation immediately:

1. Click **"Pause Vault"** (⏸️ icon)
2. Confirm transaction
3. All rules stop executing
4. You can still withdraw funds
5. Unpause when ready

**Use cases:** Market emergency, suspected bug, going offline for extended period.

### Unpause Vault

1. Click **"Unpause Vault"** (▶️ icon)
2. Confirm transaction
3. Rules resume normal operation

---

## Advanced Features

### Multi-Chain Portfolio

Manage vaults across multiple chains:
- View aggregated portfolio value
- Set different strategies per chain
- Compare performance across chains
- Export consolidated reports

**Example:** Conservative ETH strategy on Ethereum mainnet, aggressive altcoin strategy on Arbitrum.

### Router Allowlist

Control which DEXs can be used for swaps:
1. Go to vault **"Settings"**
2. Click **"Manage Routers"**
3. Add/remove DEX router addresses
4. Only allowed routers can execute trades

**Default allowed:** Uniswap V3, 1inch Aggregator

### AI Risk Tolerance

Adjust how conservative or aggressive AI recommendations are:
1. Go to **"AI Settings"**
2. Choose risk level: **Conservative** | **Moderate** | **Aggressive**
3. AI will adjust threshold suggestions accordingly

---

## Troubleshooting

### My vault isn't executing trades

**Check:**
- ✅ Rule is enabled (not disabled or paused)?
- ✅ Cooldown period has passed since last trade?
- ✅ Vault has sufficient balance for the trade?
- ✅ Price has actually crossed the threshold?
- ✅ Slippage tolerance isn't too tight?

**Solution:** Review execution history for revert reasons. Most common: "Cooldown not passed" or "Insufficient balance."

### Transaction failed

**Possible reasons:**
- Insufficient gas in wallet
- Price moved too fast (slippage exceeded)
- Network congestion
- Router address not allowed

**Solution:** Check error message in wallet. Retry with higher gas or wider slippage if appropriate.

### Can't withdraw funds

**This should NEVER happen** if:
- You are the vault owner
- You're connected with the correct wallet

**If stuck:** Contact support immediately via Discord. This indicates a potential bug.

---

## Security Best Practices

### ✅ DO

- Verify contract addresses before depositing
- Use hardware wallets for large portfolios
- Start small and test thoroughly
- Review AI suggestions before applying
- Set reasonable slippage limits (0.5-2%)
- Enable notifications for trades
- Regularly check execution history

### ❌ DON'T

- Share your private keys or seed phrase
- Approve unlimited token allowances
- Set slippage >5% (risk of sandwich attacks)
- Use untrusted frontend URLs
- Ignore security warnings in dashboard
- Set max trade size = entire portfolio (leave buffer for gas)

---

## Getting Help

### Resources

- **Docs:** [Full documentation](.claude/Claude.md)
- **Full Spec:** [Notion Documentation](https://www.notion.so/resume-thangvanle/AI-Portfolio-Automation-2fa4bff1d8bd802692f7c421d26ed5c8)

### Before Asking for Help

1. Check this guide
2. Search Discord for similar issues
3. Review transaction on block explorer (Etherscan, Arbiscan)
4. Prepare: wallet address, transaction hash, error message

---

## Complete Workflow Example

**Goal:** Automate ETH buy/sell on Arbitrum with AI assistance.

1. **Connect** MetaMask to Arbitrum network
2. **Create vault** on Arbitrum (~$1 gas)
3. **Deposit** 5,000 USDC
4. **Get AI insights** → AI suggests: Buy at $2,750, Sell at $3,250
5. **Review suggestion** → Looks good, but adjust sell to $3,300 for higher profit target
6. **Set rule:**
   ```
   USDC → WETH
   Buy: $2,750
   Sell: $3,300
   Amount: 2,000 USDC per trade
   Slippage: 1%
   ```
7. **Save & wait** → CRE monitors 24/7
8. **Trade executes** when ETH hits $2,740 → Buy 2,000 USDC → ~0.72 WETH
9. **Review history** → Check execution price, slippage, gas cost
10. **Withdraw profits** anytime or let it continue trading

**Result:** Hands-free portfolio management while you sleep, work, or travel.

---

## Next Steps

- Read [Security Model](07-security.md) to understand how your funds are protected
- Explore [API Reference](10-api-reference.md) if you want to build custom integrations
- Join Discord to share strategies with the community

**Happy automated trading! 🚀**
