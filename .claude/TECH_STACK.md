# Technology Stack Reference

> **Last Updated:** 2026-02-12
> **Status:** Specification Complete

This document serves as the single source of truth for all technology versions used in Sentient Finance.

---

## Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19 | UI component library with enhanced concurrent features, actions, and optimistic updates |
| **Next.js** | 16 | Full-stack React framework with App Router, Server Components, Server Actions |
| **TypeScript** | 5.x | Type safety and developer experience |
| **wagmi** | v2 | React Hooks for Ethereum wallet connection and contract interaction |
| **viem** | v2 | TypeScript interface for Ethereum JSON-RPC (replaces ethers.js) |
| **RainbowKit** | Latest | Wallet connection modal (MetaMask, Coinbase Wallet, WalletConnect) |
| **TanStack Query** | v5 (React Query) | Server state management, caching, automatic refetching |
| **Zustand** | Latest | Lightweight global state management |
| **TailwindCSS** | Latest | Utility-first CSS framework |
| **shadcn/ui** | Latest | Accessible, unstyled components built on Radix UI |
| **Framer Motion** | Latest | Animation library |
| **Recharts** | Latest | Chart library for portfolio analytics |

**Frontend Build Tools:**
- **Node.js:** 20+ (LTS)
- **pnpm:** 9+
- **Vitest:** Unit testing
- **Playwright:** E2E testing

---

## Smart Contracts

| Technology | Version | Purpose |
|------------|---------|---------|
| **Solidity** | 0.8.20+ | Smart contract language |
| **Hardhat** | Latest | Development environment, testing framework |
| **OpenZeppelin Contracts** | 5.x | Battle-tested contract libraries (ERC20, Ownable, ReentrancyGuard, etc.) |
| **Chainlink Contracts** | Latest | Price Feeds and CRE integration |
| **Foundry** | Latest (optional) | Advanced testing and gas optimization |

**Development Tools:**
- **Tenderly:** Transaction simulation and debugging
- **Slither:** Static analysis
- **Mythril:** Security analysis

---

## Automation Layer

| Technology | Version | Purpose |
|------------|---------|---------|
| **Chainlink CRE** | Latest | Decentralized automation network for 24/7 execution |
| **Chainlink Price Feeds** | Latest | Reliable oracle data for ETH/USD, BTC/USD, etc. |
| **The Graph** | Latest | Event indexing and GraphQL queries |

---

## AI Engine (Backend)

| Technology | Version | Purpose |
|------------|---------|---------|
| **Python** | 3.11+ | Backend language |
| **FastAPI** | Latest | High-performance async API framework |
| **scikit-learn** | Latest | Machine learning (classification, regression) |
| **pandas** | Latest | Data manipulation |
| **numpy** | Latest | Numerical computing |
| **TA-Lib** | Latest | Technical analysis indicators (RSI, MACD, Bollinger Bands) |
| **PostgreSQL** | 15+ | Primary database |
| **TimescaleDB** | Latest | Time-series extension for PostgreSQL |
| **Redis** | Latest | Caching layer |
| **Alembic** | Latest | Database migrations |

**AI Development Tools:**
- **pytest:** Unit testing
- **Black:** Code formatting
- **flake8:** Linting

---

## Deployment & Infrastructure

| Component | Technology | Platform |
|-----------|-----------|----------|
| **Frontend** | Next.js 16 SSR/SSG | Vercel + IPFS (decentralized backup) |
| **AI Engine** | Docker + FastAPI | AWS ECS / GCP Cloud Run |
| **Smart Contracts** | Solidity | Ethereum, Arbitrum, Base |
| **Subgraph** | The Graph | The Graph Network / Studio |
| **Database** | PostgreSQL 15 + TimescaleDB | AWS RDS / Supabase |
| **Cache** | Redis | AWS ElastiCache / Upstash |

---

## Blockchain Networks

| Network | Chain ID | Purpose | DEXs Supported |
|---------|----------|---------|----------------|
| **Ethereum Mainnet** | 1 | Large portfolios, major tokens | Uniswap V3, 1inch |
| **Arbitrum One** | 42161 | Active trading, lower fees | Uniswap V3, Camelot, 1inch |
| **Base** | 8453 | Small portfolios, Coinbase ecosystem | Uniswap V3, Aerodrome, 1inch |

**Testnet Networks:**
- Sepolia (Ethereum testnet)
- Arbitrum Sepolia
- Base Sepolia

---

## Development Environment

| Tool | Version | Purpose |
|------|---------|---------|
| **VS Code** | Latest | Primary IDE |
| **Git** | Latest | Version control |
| **Docker** | Latest | Containerization for AI engine |
| **Postman/Insomnia** | Latest | API testing |

**Recommended VS Code Extensions:**
- Solidity (Nomic Foundation)
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- GitHub Copilot (optional)

---

## API & Data Standards

| Standard | Version | Usage |
|----------|---------|-------|
| **JSON-RPC** | 2.0 | Ethereum node communication |
| **GraphQL** | Latest | The Graph subgraph queries |
| **REST** | - | AI Engine HTTP API |
| **WebSocket** | - | Real-time price updates (future) |
| **ERC-20** | - | Token standard |
| **EIP-1167** | - | Minimal proxy pattern for vault deployment |

---

## Security & Auditing

| Tool | Purpose |
|------|---------|
| **OpenZeppelin** | Security audit (planned Q2 2026) |
| **Slither** | Solidity static analysis |
| **Mythril** | Smart contract security analysis |
| **Immunefi** | Bug bounty platform |
| **Tenderly** | Transaction simulation and monitoring |

---

## Version Compatibility Matrix

| Frontend | Node.js | pnpm | wagmi | viem |
|----------|---------|------|-------|------|
| React 19 + Next.js 16 | 20+ | 9+ | v2 | v2 |

| Smart Contracts | Solidity | Hardhat | OpenZeppelin |
|-----------------|----------|---------|--------------|
| Ethereum/Arbitrum/Base | 0.8.20+ | Latest | 5.x |

| AI Engine | Python | FastAPI | PostgreSQL |
|-----------|--------|---------|------------|
| Backend API | 3.11+ | Latest | 15+ |

---

## Migration Notes

### From React 18 to React 19
- Enhanced concurrent features
- New `useOptimistic` and `useFormStatus` hooks
- Improved Server Components integration
- Actions API for form handling

### From Next.js 14 to Next.js 16
- Enhanced App Router performance
- Improved Server Actions
- Better streaming and partial prerendering
- Optimized bundle size

### Breaking Changes to Watch
- **wagmi:** Requires viem (no ethers.js)
- **TanStack Query:** New API, improved TypeScript support
- **pnpm:** May require Node.js 20+ for certain features

---

## Updating This Document

When making technology changes:

1. Update this file first
2. Update all related documentation files
3. Update CHANGELOG.md with the change
4. Ensure package.json / requirements.txt / hardhat.config match
5. Test locally before committing

**Related Files to Update:**
- `01-architecture.md` - Tech Stack section
- `06-frontend.md` - Technology Stack section
- `09-development.md` - Prerequisites and Tech Stack Summary
- `CHANGELOG.md` - Document the version change

---

## References

- [React 19 Release Notes](https://react.dev/blog/2024/04/25/react-19)
- [Next.js 16 Documentation](https://nextjs.org/docs)
- [wagmi Migration Guide](https://wagmi.sh/react/guides/migrate-from-v1-to-v2)
- [viem Documentation](https://viem.sh)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts)
- [Chainlink Documentation](https://docs.chain.link)

---

**Note:** This is a living document. Versions are subject to change as the project evolves. Always verify versions in actual package files (package.json, requirements.txt, hardhat.config.ts) before starting development.
