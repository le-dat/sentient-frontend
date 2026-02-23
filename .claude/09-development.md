# Development Guide

[← Back to Overview](Claude.md)

---

## Overview

This guide will help you set up a local development environment, run tests, and contribute to Sentient Finance. Whether you're working on smart contracts, frontend, or AI engine, you'll find everything you need here.

---

## Tech Stack Summary

| Layer | Technologies |
|-------|-------------|
| **Smart Contracts** | Solidity 0.8.20+, Hardhat, OpenZeppelin, Chainlink |
| **Automation** | Chainlink CRE, The Graph, Tenderly |
| **AI Engine** | Python 3.11+, FastAPI, scikit-learn, PostgreSQL 15+ |
| **Frontend** | React 19, Next.js 16, TypeScript 5.x, TailwindCSS, wagmi v2, viem v2 |
| **Deployment** | Vercel (frontend), AWS ECS (AI), Ethereum/Arbitrum/Base (contracts) |

---

## Repository Structure

```
cre-wallet/
├── contracts/               # Smart contracts (Solidity)
│   ├── src/
│   │   ├── VaultFactory.sol
│   │   ├── PortfolioVault.sol
│   │   └── interfaces/
│   ├── test/                # Contract tests (Hardhat)
│   ├── scripts/             # Deployment scripts
│   └── hardhat.config.ts
│
├── automation/              # Chainlink CRE workflows
│   ├── workflows/           # CRE workflow definitions
│   └── scripts/             # CRE deployment & monitoring
│
├── ai-engine/               # AI strategy engine (Python)
│   ├── src/
│   │   ├── api/             # FastAPI endpoints
│   │   ├── models/          # ML models
│   │   └── services/        # Business logic
│   ├── tests/
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/                # Next.js dashboard
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # React components
│   ├── lib/                 # Utilities, hooks, config
│   ├── public/              # Static assets
│   └── package.json
│
├── subgraph/                # The Graph indexer
│   ├── schema.graphql       # GraphQL schema
│   ├── subgraph.yaml        # Subgraph manifest
│   └── src/                 # Mapping functions
│
├── sdk/                     # TypeScript SDK (optional)
│   └── src/
│       ├── vaultFactory.ts
│       └── portfolioVault.ts
│
└── docs/                    # Documentation
    └── .claude/             # Claude Code docs (you are here!)
```

---

## Prerequisites

### Required Software

- **Node.js** 20+ (LTS recommended) — [nodejs.org](https://nodejs.org) (Required for Next.js 16 and React 19)
- **pnpm** 9+ — `npm install -g pnpm`
- **Python** 3.11+ — [python.org](https://python.org)
- **PostgreSQL** 15+ — [postgresql.org](https://postgresql.org) (for AI engine)
- **Git** — [git-scm.com](https://git-scm.com)

### Recommended Tools

- **VS Code** with extensions:
  - Solidity (Nomic Foundation)
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
- **Hardhat VSCode** (for smart contract debugging)
- **Foundry** (optional, for advanced contract testing)

---

## Initial Setup

### 1. Clone the Repository

<!-- Repository has not been created yet -->

### 2. Install Dependencies

<!-- No package.json files exist yet - cannot run install commands -->

### 3. Environment Variables

**Contracts (.env in `contracts/`):**
```bash
# RPC URLs
ETHEREUM_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
ARBITRUM_RPC_URL=https://arb-mainnet.g.alchemy.com/v2/YOUR_KEY
BASE_RPC_URL=https://base-mainnet.g.alchemy.com/v2/YOUR_KEY

# Deployer private key (NEVER commit this!)
DEPLOYER_PRIVATE_KEY=0x...

# Etherscan API keys (for verification)
ETHERSCAN_API_KEY=...
ARBISCAN_API_KEY=...
BASESCAN_API_KEY=...
```

**Frontend (.env.local in `frontend/`):**
```bash
# Public variables (exposed to browser)
NEXT_PUBLIC_ETHEREUM_CHAIN_ID=1
NEXT_PUBLIC_ARBITRUM_CHAIN_ID=42161
NEXT_PUBLIC_BASE_CHAIN_ID=8453

# Contract addresses (update after deployment)
NEXT_PUBLIC_VAULT_FACTORY_ETHEREUM=0x...
NEXT_PUBLIC_VAULT_FACTORY_ARBITRUM=0x...
NEXT_PUBLIC_VAULT_FACTORY_BASE=0x...

# AI Engine API
NEXT_PUBLIC_AI_API_URL=http://localhost:8000

# The Graph
NEXT_PUBLIC_GRAPH_ETHEREUM=https://api.thegraph.com/subgraphs/name/...
NEXT_PUBLIC_GRAPH_ARBITRUM=https://api.thegraph.com/subgraphs/name/...
```

**AI Engine (.env in `ai-engine/`):**
```bash
DATABASE_URL=postgresql://user:password@localhost:5432/sentient
REDIS_URL=redis://localhost:6379
COINGECKO_API_KEY=...  # Optional, for premium API
CHAINLINK_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
```

### 4. Local Blockchain (Optional)

For contract development without deploying to testnet:

```bash
# Terminal 1: Start local Hardhat node
cd contracts
npx hardhat node

# Terminal 2: Deploy contracts to local node
npx hardhat run scripts/deploy.ts --network localhost
```

---

## Development Workflow

### Smart Contracts

**Compile:**
```bash
cd contracts
npx hardhat compile
```

**Test:**
```bash
# Run all tests
npx hardhat test

# Run specific test file
npx hardhat test test/VaultFactory.test.ts

# Run with gas reporter
REPORT_GAS=true npx hardhat test

# Run with coverage
npx hardhat coverage
```

**Deploy to Testnet (Sepolia):**
```bash
npx hardhat run scripts/deploy.ts --network sepolia
```

**Verify on Etherscan:**
```bash
npx hardhat verify --network sepolia 0xYOUR_CONTRACT_ADDRESS "constructor arg 1" "arg 2"
```

**Useful Hardhat Tasks:**
```bash
# Get list of accounts
npx hardhat accounts

# Check balance
npx hardhat balance --account 0x...

# Deploy VaultFactory
npx hardhat deploy:factory --network arbitrum

# Create a vault (for testing)
npx hardhat create:vault --factory 0x... --network arbitrum
```

---

### Frontend

**Development Server:**
```bash
cd frontend
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

**Build for Production:**
```bash
pnpm build
pnpm start  # Run production build locally
```

**Linting & Formatting:**
```bash
pnpm lint        # ESLint
pnpm lint:fix    # Auto-fix issues
pnpm format      # Prettier
```

**Type Checking:**
```bash
pnpm type-check  # TypeScript compiler check
```

**Test:**
```bash
pnpm test        # Vitest unit tests
pnpm test:e2e    # Playwright E2E tests
```

---

### AI Engine

**Run Locally:**
```bash
cd ai-engine
source venv/bin/activate
uvicorn src.main:app --reload --port 8000
```

API available at [http://localhost:8000](http://localhost:8000)

**Test Endpoints:**
```bash
# Health check
curl http://localhost:8000/v1/health

# Get AI analysis
curl -X POST http://localhost:8000/v1/analyze \
  -H "Content-Type: application/json" \
  -d '{"token": "ETH/USD", "riskTolerance": "moderate"}'
```

**Run Tests:**
```bash
pytest tests/
pytest --cov=src tests/  # With coverage
```

**Database Migrations:**
```bash
# Create migration
alembic revision --autogenerate -m "Add new table"

# Apply migrations
alembic upgrade head

# Rollback
alembic downgrade -1
```

---

### The Graph Subgraph

**Install Graph CLI:**
```bash
npm install -g @graphprotocol/graph-cli
```

**Generate Code:**
```bash
cd subgraph
graph codegen
```

**Build:**
```bash
graph build
```

**Deploy to The Graph Studio:**
```bash
# TBD - Subgraph name not determined yet
graph deploy --studio <subgraph-name>
```

**Test Queries (after deployment):**
```graphql
query {
  vaults(first: 5) {
    id
    owner
    createdAt
    swaps {
      tokenIn
      tokenOut
      amountIn
      timestamp
    }
  }
}
```

---

## Testing Strategy

### Smart Contract Testing

**Test Coverage Goals:**
- Core logic (VaultFactory, PortfolioVault): **100%**
- Edge cases (reentrancy, overflow, access control): **100%**
- Integration tests (multi-contract interactions): **90%+**

**Example Test Structure:**
```typescript
// test/PortfolioVault.test.ts
describe("PortfolioVault", () => {
  describe("Deployment", () => {
    it("Should initialize with correct owner", async () => {
      // ...
    });
  });

  describe("Setting Rules", () => {
    it("Should allow owner to set rule", async () => {
      // ...
    });

    it("Should revert if non-owner tries to set rule", async () => {
      // ...
    });
  });

  describe("Executing Swaps", () => {
    it("Should execute swap when conditions met", async () => {
      // ...
    });

    it("Should revert if cooldown not passed", async () => {
      // ...
    });
  });
});
```

---

### Frontend Testing

**Unit Tests (Vitest):**
- Utility functions (formatting, validation)
- React hooks (custom hooks for wallet, vaults)

**Integration Tests (React Testing Library):**
- Component interactions (button click → modal opens)
- Form validation (invalid input → error message)

**E2E Tests (Playwright):**
- Critical user flows (create vault, set rule, deposit)
- Run on testnet fork (no real funds)

---

### AI Engine Testing

**Unit Tests (pytest):**
- Model predictions (backtesting logic)
- API endpoints (request/response validation)

**Integration Tests:**
- Database queries
- External API calls (CoinGecko, Chainlink)

**Performance Tests:**
- Endpoint latency (<500ms target)
- Throughput (100 requests/sec)

---

## Deployment

### Testnet Deployment

**1. Deploy Contracts:**
```bash
cd contracts
npx hardhat run scripts/deploy.ts --network sepolia
# Save deployed addresses
```

**2. Deploy Subgraph:**
```bash
cd subgraph
# TBD - Subgraph not created yet
graph deploy --studio <subgraph-name>
```

**3. Deploy AI Engine:**
```bash
cd ai-engine
docker build -t sentient-ai .
docker run -p 8000:8000 sentient-ai
```

**4. Deploy Frontend:**
```bash
cd frontend
# Update .env.local with testnet contract addresses
vercel --prod  # Or push to main branch for auto-deploy
```

---

### Mainnet Deployment Checklist

**Pre-Deployment:**
- [ ] Contracts audited by OpenZeppelin or Trail of Bits
- [ ] >95% test coverage on all contracts
- [ ] Bug bounty program live on Immunefi
- [ ] Emergency pause mechanism tested
- [ ] Multi-sig set up for critical operations (if applicable)
- [ ] Gas optimization verified (Hardhat gas reporter)
- [ ] Frontend security audit (penetration testing)
- [ ] AI engine stress-tested (1000+ concurrent users)

**Deployment Steps:**
1. Deploy VaultFactory to Ethereum, Arbitrum, Base
2. Verify contracts on Etherscan, Arbiscan, Basescan
3. Deploy subgraphs to The Graph Network
4. Deploy AI engine to AWS ECS (production)
5. Deploy frontend to Vercel + IPFS
6. Update docs with mainnet contract addresses
7. Announce on Discord, Twitter

**Post-Deployment:**
- [ ] Monitor for first 24h (Tenderly alerts)
- [ ] Gradual user onboarding (whitelist → public)
- [ ] Bug bounty payouts ready
- [ ] Incident response team on standby

---

## Contributing

### Branching Strategy

- **main** — Production-ready code (protected, requires PR approval)
- **dev** — Integration branch for testing
- **feature/your-feature** — New features
- **fix/bug-description** — Bug fixes
- **docs/topic** — Documentation updates

### Commit Messages

Follow Conventional Commits:
```
feat(contracts): Add cooldown period to PortfolioVault
fix(frontend): Resolve wallet connection issue on mobile
docs(readme): Update installation instructions
test(ai-engine): Add unit tests for threshold optimizer
```

### Pull Request Process

1. Create feature branch: `git checkout -b feature/my-feature`
2. Make changes, add tests
3. Commit: `git commit -m "feat: Add feature"`
4. Push: `git push origin feature/my-feature`
5. Open PR on GitHub
6. Request review from maintainers
7. Address feedback
8. Merge after approval

**PR Checklist:**
- [ ] Tests pass (`pnpm test`)
- [ ] No linting errors (`pnpm lint`)
- [ ] Documentation updated (if applicable)
- [ ] Gas usage acceptable (for contract changes)
- [ ] No security vulnerabilities introduced

---

## Code Style

### Solidity

- Follow [Solidity Style Guide](https://docs.soliditylang.org/en/latest/style-guide.html)
- Use OpenZeppelin contracts for standard functionality
- Add NatSpec comments for all public functions
- Run `solhint` before committing

```solidity
/// @notice Sets a trading rule for a token pair
/// @param tokenIn Address of input token
/// @param tokenOut Address of output token
/// @param buyThreshold Price threshold for buying (in USD with 8 decimals)
/// @param sellThreshold Price threshold for selling
function setTokenRule(
    address tokenIn,
    address tokenOut,
    uint256 buyThreshold,
    uint256 sellThreshold
) external onlyOwner {
    // Implementation
}
```

---

### TypeScript

- Use Prettier for formatting
- Follow Airbnb TypeScript style guide
- Prefer named exports over default exports
- Use `const` over `let`

```typescript
// Good
export const formatUSD = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// Bad
export default function formatUSD(amount) {
  return '$' + amount.toFixed(2);
}
```

---

### Python

- Follow PEP 8
- Use type hints
- Use Black for formatting
- Use flake8 for linting

```python
# Good
def calculate_volatility(prices: list[float], window: int = 7) -> float:
    """Calculate rolling volatility for price series."""
    return np.std(prices[-window:])

# Bad
def calc_vol(p):
    return np.std(p[-7:])
```

---

## Useful Commands

### Hardhat

```bash
npx hardhat compile              # Compile contracts
npx hardhat test                 # Run tests
npx hardhat node                 # Start local blockchain
npx hardhat run scripts/deploy.ts --network sepolia
npx hardhat verify --network sepolia 0xADDRESS
npx hardhat console --network localhost  # Interactive console
```

### pnpm (Frontend)

```bash
pnpm install                     # Install dependencies
pnpm dev                         # Start dev server
pnpm build                       # Build for production
pnpm lint                        # Run ESLint
pnpm test                        # Run Vitest tests
```

### Python (AI Engine)

```bash
uvicorn src.main:app --reload    # Start FastAPI dev server
pytest tests/                    # Run tests
black src/                       # Format code
flake8 src/                      # Lint code
alembic upgrade head             # Run migrations
```

---

## Troubleshooting Common Errors

### Hardhat Errors

**Error:** `ProviderError: transaction underpriced`
- **Fix:** Increase `gasPrice` in `hardhat.config.ts`

**Error:** `nonce too low`
- **Fix:** Reset Hardhat node: `npx hardhat clean && npx hardhat node`

**Error:** `Contract size exceeds 24KB`
- **Fix:** Enable optimizer in `hardhat.config.ts`:
  ```ts
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: { enabled: true, runs: 200 }
    }
  }
  ```

---

### Frontend Errors

**Error:** `Module not found: Can't resolve 'wagmi'`
- **Fix:** `pnpm install wagmi viem`

**Error:** `Hydration mismatch`
- **Fix:** Use `useEffect` for client-only code, or `'use client'` directive

**Error:** `ChainMismatch: User is on wrong chain`
- **Fix:** Prompt user to switch chains using `useSwitchNetwork()` hook

---

### AI Engine Errors

**Error:** `psycopg2.OperationalError: could not connect to server`
- **Fix:** Ensure PostgreSQL is running: `pg_ctl start`

**Error:** `ModuleNotFoundError: No module named 'fastapi'`
- **Fix:** Activate venv: `source venv/bin/activate` then `pip install -r requirements.txt`

---

## Resources

### Official Docs

- [Hardhat](https://hardhat.org/docs)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts)
- [Next.js](https://nextjs.org/docs)
- [wagmi](https://wagmi.sh)
- [FastAPI](https://fastapi.tiangolo.com)
- [The Graph](https://thegraph.com/docs)

### Learning

- [Solidity by Example](https://solidity-by-example.org)
- [Ethernaut (Security CTF)](https://ethernaut.openzeppelin.com)
- [Chainlink Docs](https://docs.chain.link)

### Community

<!-- Community channels not set up yet -->

---

## Related Documentation

- [Architecture](01-architecture.md) — System overview
- [Smart Contracts](02-smart-contracts.md) — Contract details
- [Frontend](06-frontend.md) — Dashboard architecture
- [API Reference](10-api-reference.md) — API docs

**Happy coding! 🚀**
