# Security Model

[← Back to Overview](Claude.md)

---

## Overview

Security is the foundation of Sentient Finance. This document explains how we protect your funds, mitigate threats, and maintain trustlessness throughout the entire system.

**Core Principle:** You maintain 100% control. No one can withdraw your funds except you.

---

## Core Security Principles

### 1. Non-Custodial Architecture

- **1 User = 1 Vault** — Each user deploys their own smart contract vault using EIP-1167 minimal proxy pattern
- **You hold the keys** — Only your wallet can withdraw funds from your vault
- **No admin backdoors** — No owner, no multisig, no upgradability proxy that can change vault logic
- **Immutable rules** — Once deployed, vault logic cannot be changed (except by you updating your own rules)

### 2. On-Chain Rule Enforcement

- **Smart contract validates everything** — All trading rules (thresholds, slippage, cooldown) are enforced on-chain
- **AI cannot override** — AI provides suggestions; only you can set rules via on-chain transactions
- **CRE executes within bounds** — Chainlink CRE can only call `executeSwap()` with parameters that pass validation

### 3. Executor Limitations

The Chainlink CRE executor has **LIMITED** permissions:
- ✅ **CAN:** Call `executeSwap()` on your vault
- ❌ **CANNOT:** Withdraw funds
- ❌ **CANNOT:** Change your rules
- ❌ **CANNOT:** Pause your vault
- ❌ **CANNOT:** Add/remove allowed routers

**Why this matters:** Even if CRE is compromised, attacker cannot steal funds—only execute trades within your pre-approved rules.

---

## Threat Model & Mitigations

### Threat 1: Malicious Executor

**Scenario:** Chainlink CRE executor is compromised or acts maliciously.

**What attacker CANNOT do:**
- Withdraw your funds
- Change your trading rules
- Bypass slippage protection
- Trade outside allowed routers
- Ignore cooldown period

**What attacker COULD do:**
- Execute trades at suboptimal times (but still within your rules)
- Attempt to trigger trades to earn fees (but rate-limited by cooldown)

**Mitigation:**
- All trades must pass on-chain validation (`cooldown`, `maxTradeSize`, `slippage`, `allowedRouters`)
- You can pause vault anytime to stop all automation
- You can withdraw funds even when vault is paused

**Risk Level:** 🟢 Low (funds are safe, worst case is suboptimal trades)

---

### Threat 2: Smart Contract Bug

**Scenario:** Vulnerability in VaultFactory or PortfolioVault contracts.

**Examples:** Reentrancy, integer overflow, access control bypass

**Mitigation:**
- **OpenZeppelin contracts** — Using battle-tested `ReentrancyGuard`, `SafeERC20`, `Ownable`
- **Comprehensive testing** — Unit tests, integration tests, fuzzing, edge cases
- **External audit** — Professional audit by OpenZeppelin or Trail of Bits (planned before mainnet)
- **Bug bounty** — Immunefi bug bounty program ($50K-$500K rewards)
- **Emergency pause** — Vault owner can pause at any time
- **Gradual rollout** — Testnet → Limited mainnet → Full mainnet

**Risk Level:** 🟡 Medium (mitigated via audits, testing, bug bounty)

---

### Threat 3: Price Oracle Manipulation

**Scenario:** Attacker manipulates Chainlink price feed to trigger unfavorable trades.

**Attack vector:** Flash loan attack, low-liquidity pool manipulation

**Mitigation:**
- **Chainlink Price Feeds** — Decentralized oracle network with multiple data sources; manipulation requires attacking multiple independent nodes (economically infeasible)
- **Slippage protection** — Vault reverts if actual execution price deviates >X% from expected
- **Router allowlist** — Only trusted DEXs (Uniswap V3, 1inch) can be used
- **Cooldown period** — Limits how often trades can occur, making manipulation less profitable

**Risk Level:** 🟢 Low (Chainlink is highly secure; slippage adds second layer)

---

### Threat 4: Sandwich Attack

**Scenario:** MEV bot sees your pending trade and sandwiches it (front-run + back-run) to extract value.

**Attack vector:** Public mempool visibility

**Mitigation:**
- **Slippage limits** — Trades revert if price impact exceeds your tolerance
- **Private RPC** (optional) — Use Flashbots Protect or private RPC to hide transaction from public mempool
- **Router allowlist** — Only use reputable DEXs with MEV protection
- **Trade size limits** — Don't trade amounts that create high slippage

**User best practice:**
- Set slippage to 0.5-1% for major pairs
- Use private RPC if trading large amounts
- Avoid low-liquidity pairs

**Risk Level:** 🟡 Medium (user can mitigate via settings)

---

### Threat 5: Reentrancy Attack

**Scenario:** Malicious token contract calls back into vault during swap to drain funds.

**Attack vector:** ERC20 `transferFrom()` or `transfer()` hook

**Mitigation:**
- **ReentrancyGuard** — OpenZeppelin `nonReentrant` modifier on `executeSwap()`, `deposit()`, `withdraw()`
- **Checks-Effects-Interactions pattern** — State updated before external calls
- **SafeERC20** — Prevents common token vulnerabilities

**Risk Level:** 🟢 Very Low (fully mitigated via OpenZeppelin)

---

### Threat 6: Phishing Attack

**Scenario:** User is tricked into approving malicious contract or sending funds to fake address.

**Attack vector:** Fake frontend, phishing emails, Discord scams

**Mitigation (User Side):**
- **Verify URLs** — Always verify official URLs before connecting wallet
- **Check contract addresses** — Compare against official docs before approving
- **Review transactions** — Read what you're signing (MetaMask shows contract address)
- **Hardware wallets** — Use Ledger/Trezor for large portfolios

**Mitigation (Protocol Side):**
- Clear UI warnings when approving tokens
- Address verification tooltips
- Official contract addresses published on GitHub + docs
- Community monitoring for scam reports

**Risk Level:** 🟡 Medium (user-dependent; education is key)

---

### Threat 7: Bridge Hack

**Scenario:** Cross-chain bridge is exploited, funds lost.

**Mitigation:**
- **NO BRIDGES USED** — Sentient Finance intentionally does NOT use cross-chain bridges
- **1 Vault per Chain** — Each chain is fully isolated; if Arbitrum has an issue, your Ethereum vault is unaffected
- **No cross-chain messaging** — No LayerZero, Axelar, or Wormhole dependencies

**Risk Level:** 🟢 Not Applicable (bridges not used by design)

---

## Security Features in Smart Contracts

### Cooldown Period

- **Purpose:** Prevent rapid trading, reduce manipulation risk, limit MEV damage
- **Default:** 24 hours between trades for same rule
- **Configurable:** User can adjust (minimum 1 hour)
- **Enforcement:** On-chain; CRE cannot bypass

### Max Trade Size

- **Purpose:** Limit damage from single malicious or erroneous trade
- **Set by user** per rule
- **Enforcement:** Vault reverts if trade exceeds limit

### Slippage Protection

- **Purpose:** Prevent unfavorable execution due to price movement or manipulation
- **User-configurable:** 0.1% - 10%
- **Enforcement:** Vault reverts if `actualPrice` deviates >X% from `expectedPrice`

### Router Allowlist

- **Purpose:** Ensure trades only happen on trusted DEXs
- **Default allowed:** Uniswap V3, 1inch Aggregator
- **User-configurable:** Add/remove router addresses
- **Enforcement:** Vault reverts if router not in allowlist

### Pause Mechanism

- **Purpose:** Emergency stop for all automation
- **Who can pause:** Only vault owner (you)
- **Effect:** All `executeSwap()` calls revert
- **Withdraw still works:** You can always withdraw even when paused

---

## Audit & Verification

### Pre-Launch Security Checklist

- [x] OpenZeppelin contracts used for all security-critical logic
- [x] ReentrancyGuard on all state-changing functions
- [x] Comprehensive test coverage (>95%)
- [ ] External audit by OpenZeppelin or Trail of Bits (Q2 2026)
- [ ] Bug bounty program on Immunefi (Q2 2026)
- [ ] Formal verification of core invariants (Q4 2026)

### Contract Verification

All contracts are verified on block explorers:
- **Etherscan** (Ethereum)
- **Arbiscan** (Arbitrum)
- **Basescan** (Base)

**Why this matters:** Anyone can read the source code and verify it matches the deployed bytecode.

### Bug Bounty Program

- **Platform:** Immunefi
- **Rewards:** $1K - $500K depending on severity
- **Scope:** VaultFactory, PortfolioVault, CRE workflows
- **Launch:** Q2 2026 after audit

---

## User Security Best Practices

### ✅ DO

- Use hardware wallets (Ledger, Trezor) for portfolios >$10K
- Verify contract addresses on multiple sources (GitHub, docs, Etherscan)
- Start with small test deposits
- Review all AI suggestions before applying
- Set slippage to 0.5-1% for major tokens
- Enable 2FA on wallet if available
- Bookmark official URL
- Keep seed phrase offline (paper, metal plate)

### ❌ DON'T

- Share private keys or seed phrase with ANYONE (not even support!)
- Approve unlimited token allowances
- Use suspicious URLs (check for typos like "senteint.finance")
- Ignore wallet warnings
- Set max trade size = entire portfolio (leave buffer)
- Use public WiFi for large transactions
- Click links in unsolicited Discord DMs

---

## Developer Security Best Practices

### Smart Contract Development

- Always use OpenZeppelin contracts for standard functionality
- Follow Checks-Effects-Interactions pattern
- Add `nonReentrant` to all state-changing external functions
- Use `SafeERC20` for all token transfers
- Validate all inputs (zero address, overflow, underflow)
- Write comprehensive tests (unit, integration, fuzzing)
- Run Slither and Mythril before deploying
- Use Hardhat + Tenderly for simulation
- Document security assumptions in code comments

### Frontend Security

- Sanitize all user inputs
- Use Content Security Policy (CSP) headers
- Simulate transactions before submitting
- Show clear approval warnings
- Verify contract addresses client-side
- Use HTTPS only
- Implement rate limiting on API endpoints

---

## Incident Response Plan

In the unlikely event of a security incident:

### 1. Detection

- Automated monitoring alerts (Tenderly, Defender)
- Community reports (Discord, Twitter)
- Bug bounty submission

### 2. Immediate Response (within 1 hour)

- **Pause all affected vaults** (if feasible)
- **Alert community** via Discord, Twitter, website banner
- **Freeze further deployments**
- **Assemble response team** (developers, auditors, legal)

### 3. Investigation (within 24 hours)

- Identify root cause
- Determine scope (which contracts, how many users affected)
- Estimate potential losses

### 4. Mitigation (within 48 hours)

- Deploy fix if possible
- If not fixable, deploy new contracts
- Provide migration path for users
- Coordinate with affected users

### 5. Post-Mortem (within 1 week)

- Public incident report
- Timeline of events
- Root cause analysis
- Lessons learned
- Preventive measures for future

### 6. Compensation (if applicable)

- Determine if users lost funds due to protocol bug
- Establish compensation plan
- Execute reimbursements

---

## Compliance & Legal

### Regulatory Considerations

- **Non-custodial = Lower regulatory risk** — Users control their own keys
- **No trading advice** — AI provides data-driven suggestions, not financial advice
- **Geographic restrictions** — Some jurisdictions may restrict DeFi usage (check your local laws)
- **Tax implications** — All trades are on-chain; users responsible for tax reporting

### Terms of Use

- Use at your own risk
- No warranties or guarantees
- Protocol is experimental software
- Audit your own risk tolerance
- Comply with local regulations

---

## Future Security Enhancements

### Phase 3 (Q4 2026): Production Hardening

- **Formal verification** of core invariants using Certora or Runtime Verification
- **Multi-sig governance** for protocol upgrades
- **Time-locked upgrades** (48-hour delay before changes take effect)
- **On-chain insurance integration** (Nexus Mutual, InsurAce)
- **Advanced monitoring** (anomaly detection, ML-based threat detection)

### Phase 4 (2027+)

- **Zero-knowledge proofs** for private trading strategies
- **Social recovery** for lost keys (Argent-style)
- **Account abstraction** (ERC-4337) for gas-less transactions

---

## Questions & Support

**Security concerns?** See [security documentation](.claude/07-security.md)

**Found a bug?** Bug bounty program planned for Q2 2026

**General questions?** See [documentation](.claude/Claude.md)

---

## Related Documentation

- [User Guide](08-user-guide.md) — Best practices for safe usage
- [Smart Contracts](02-smart-contracts.md) — Technical details of security mechanisms
- [Development Guide](09-development.md) — Security checklist for contributors

**Stay safe and trade smart! 🛡️**
