# Product Roadmap

[← Back to Overview](Claude.md)

---

## Current Status: Specification Complete (Q1 2026) 📝

### Specification Status

**Smart Contracts:**
- ✅ VaultFactory specification complete
- ✅ PortfolioVault specification complete
- ✅ EIP-1167 minimal proxy pattern design
- ✅ Security features specified (pause, cooldown, slippage protection, router allowlist)
- 🔄 Implementation: Not started

**Automation:**
- ✅ Chainlink CRE integration design complete
- ✅ Price feed monitoring workflow specified
- ✅ Auto-execution logic documented
- 🔄 Deployment: Not started

**AI Engine:**
- ✅ Architecture specified (volatility analysis, threshold optimization, risk scoring)
- ✅ API endpoints documented
- 🔄 Implementation: Not started

**Frontend:**
- ✅ Multi-chain dashboard design complete
- ✅ UI/UX flows documented
- ✅ Component architecture specified
- 🔄 Implementation: Not started

**Security:**
- ✅ Threat model documented
- ✅ Security features specified
- 📅 OpenZeppelin audit scheduled Q2 2026 (after implementation)
- 📅 Bug bounty program planned Q2 2026

### MVP Capabilities

**Users can:**
- Create personal vaults on 3 chains
- Deposit/withdraw assets anytime
- Set buy/sell thresholds per token
- Receive AI-powered threshold recommendations
- View portfolio across all chains
- Monitor execution history
- Pause vaults in emergency

**System provides:**
- 24/7 automated execution
- Non-custodial security
- On-chain rule enforcement
- Real-time price monitoring
- Multi-chain support

---

## Phase 1: Enhanced Intelligence (Q2 2026)

### Goals
- Improve AI recommendations with multi-timeframe analysis
- Optimize execution efficiency (gas, slippage)
- Launch mobile app for on-the-go portfolio management

### Features

#### 1.1 Dynamic Threshold Adjustment
- **Description:** AI automatically adjusts thresholds based on market volatility
- **User Control:** User approves AI to adjust within range (e.g., ±10%)
- **Benefit:** Tighter thresholds in stable markets, wider in volatile
- **Status:** 🔄 In Development

#### 1.2 Multi-Timeframe Analysis
- **Description:** Analyze 1h, 4h, 1d, 1w timeframes for better signals
- **Benefit:** More accurate trend detection, higher win rate
- **Status:** 🔄 In Development

#### 1.3 Sentiment Integration
- **Description:** Incorporate social sentiment (Twitter, Reddit) into AI
- **Sources:** LunarCrush, Santiment APIs
- **Status:** 📋 Research Phase

#### 1.4 Gas Optimization
- **Batch operations:** Execute multiple swaps in one transaction
- **Permit2 integration:** Gasless ERC-20 approvals
- **Target:** 30% reduction in gas costs
- **Status:** 📋 Planning

#### 1.5 Mobile App (iOS + Android)
- **Features:** Portfolio overview, push notifications, quick pause, AI insights
- **Tech:** React Native
- **Launch:** 📅 End of Q2 2026

### Success Metrics
- [ ] AI recommendation acceptance rate > 60%
- [ ] User retention rate > 70%
- [ ] Mobile app installs > 1,000
- [ ] Total value locked (TVL) > $10M

---

## Phase 2: Advanced Automation (Q3 2026)

### Goals
- Portfolio-level intelligence (rebalancing, multi-asset strategies)
- Cross-chain analytics (read-only, no bridges)
- Advanced risk management

### Features

#### 2.1 Portfolio Rebalancing
- **Description:** AI suggests rebalancing to maintain target allocation
- **Example:** Target 60% ETH / 40% USDC → AI suggests selling ETH when 70/30
- **User Control:** User sets target & tolerance (±5%)
- **Status:** 📋 Planning

#### 2.2 Multi-Asset Strategies
- **Description:** Coordinated trades across multiple assets
- **Example:** "When BTC drops 10%, buy ETH" (correlation-based)
- **Status:** 🔬 Research Phase

#### 2.3 Backtesting Platform
- **Description:** Users backtest strategies before deploying
- **Data:** 1-3 years historical price data
- **Output:** Expected return, max drawdown, Sharpe ratio
- **Status:** 📋 Planning

#### 2.4 Cross-Chain Analytics (Read-Only)
- **Description:** Aggregated analytics across all chains
- **Features:** Multi-chain allocation, correlation analysis, rebalancing suggestions
- **No Bridges:** Still independent vaults; suggestions only
- **Status:** 📋 Planning

#### 2.5 Advanced Risk Management
- **Stop-loss:** Auto-sell if portfolio drops > X%
- **Take-profit:** Auto-sell if portfolio gains > Y%
- **Volatility circuit breaker:** Pause if volatility > 3x normal
- **Status:** 📋 Planning

### Success Metrics
- [ ] TVL > $50M
- [ ] Average portfolio return > market benchmark
- [ ] User-created strategies > 100

---

## Phase 3: Production Hardening (Q4 2026)

### Goals
- Scale to mainnet production
- Institutional features
- Governance launch (DAO)

### Features

#### 3.1 Multi-Sig & Governance
- **DAO Governance:** Token-based voting for protocol upgrades
- **Multi-Sig Treasury:** Community-controlled protocol fees
- **Status:** 📋 Design Phase

#### 3.2 Institutional Features
- **Sub-accounts:** Institutions manage multiple vaults
- **API access:** Programmatic vault management
- **White-label:** Custom-branded dashboards for partners
- **Status:** 📋 Planning

#### 3.3 Insurance Integration
- **Partner:** Nexus Mutual / InsurAce
- **Coverage:** Smart contract exploits, oracle failures
- **Cost:** ~2-5% of insured amount annually
- **Status:** 🤝 Negotiation Phase

#### 3.4 Layer 2 Expansion
- **New Chains:** Optimism, Polygon zkEVM, zkSync Era, Scroll
- **Criteria:** Chainlink support, mature DEX ecosystem
- **Status:** 📊 Evaluation Phase

#### 3.5 Formal Verification
- **Tools:** Certora, Halmos
- **Goal:** Mathematically prove contract correctness
- **Status:** 📋 Planning

### Success Metrics
- [ ] TVL > $100M
- [ ] Zero security incidents
- [ ] Institutional clients > 10
- [ ] Governance proposals > 50

---

## Phase 4: Ecosystem Expansion (2027+)

### Vision
- Full DeFi composability
- AI marketplace
- Multi-strategy portfolios

### Potential Features
- **Yield Farming:** Auto-compound yields from Aave, Compound
- **NFT Portfolio Management:** Blue-chip NFT strategies
- **Options & Derivatives:** Automated hedging with Lyra, Aevo
- **AI Model Marketplace:** Users train & sell custom AI models
- **Social Trading:** Follow & copy successful traders
- **On-Chain Privacy:** zk-proofs for private portfolios

### Success Metrics
- [ ] TVL > $500M
- [ ] Supported chains > 10
- [ ] Active users > 100,000

---

## Milestones

| Quarter | Milestone | Status |
|---------|-----------|--------|
| Q1 2026 | Complete System Specification | ✅ Complete |
| Q1 2026 | Begin MVP Implementation | 🔄 In Progress |
| Q2 2026 | MVP Implementation Complete | 📅 Target |
| Q2 2026 | Testnet Deployment | 📅 Target |
| Q2 2026 | Security Audit (OpenZeppelin or Trail of Bits) | 📅 Planned |
| Q2 2026 | Bug Bounty Program Launch | 📅 Planned |
| Q3 2026 | Mainnet Launch (Limited Beta) | 📅 Target |
| Q3 2026 | Mobile App Launch | 📅 Planned |
| Q4 2026 | Portfolio Rebalancing Feature | 📅 Planned |
| Q4 2026 | TVL > $10M | 🎯 Goal |
| 2027+ | DAO Governance & Ecosystem Expansion | 💡 Concept |

---

## Community Involvement

### How to Contribute
- **Bug Reports:** GitHub Issues, Discord
- **Feature Requests:** Community forum
- **Code Contributions:** Pull requests welcome
- **Governance:** Vote on proposals (post-DAO launch)
- **Testing:** Join beta programs

### Feedback Channels
- **Documentation:** [Claude.md](.claude/Claude.md)
- **Full Spec:** [Notion](https://www.notion.so/resume-thangvanle/AI-Portfolio-Automation-2fa4bff1d8bd802692f7c421d26ed5c8)

---

## Disclaimer

This roadmap is subject to change based on:
- Technical feasibility
- Security considerations
- Market conditions
- Community feedback
- Regulatory environment

Not all features are guaranteed to ship as described. Dates are estimates and may shift based on development priorities.

---

## Related Documentation

- [Architecture](01-architecture.md) — System design supporting this roadmap
- [Security](07-security.md) — Security measures at each phase
- [Development](09-development.md) — How to contribute to development
