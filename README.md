# Sentient Finance Frontend

A modern, professor-style Next.js frontend for **Sentient Finance**, a decentralized smart vault management and analysis platform built on **Chainlink**.

## Chainlink Integration

This frontend integrates with Chainlink **Price Feeds** and **CCIP** (cross-chain Emergency Shield).

### Files Using Chainlink

| File                                                                                                           | Purpose                                                 |
| -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| [`lib/constants/chainlink-feeds.ts`](lib/constants/chainlink-feeds.ts)                                         | Chainlink price feed addresses (USD) per chain          |
| [`components/dashboard/vault-panel/tabs/config-tab.tsx`](components/dashboard/vault-panel/tabs/config-tab.tsx) | `setPriceFeed`, `getPriceFeedForToken` for vault config |
| [`components/query/ccip-panel.tsx`](components/query/ccip-panel.tsx)                                           | CCIP config UI, Emergency Shield                        |
| [`app/dashboard/ccip/page.tsx`](app/dashboard/ccip/page.tsx)                                                   | CCIP Cross-Chain page                                   |
| [`lib/api/client.ts`](lib/api/client.ts)                                                                       | `getCCIPConfig`, `estimateCCIPFee` API calls            |
| [`lib/api/hooks.ts`](lib/api/hooks.ts)                                                                         | `useCCIPConfig`, `useCCIPEstimateFee` hooks             |
| [`lib/api/types.ts`](lib/api/types.ts)                                                                         | `CCIPConfigResponse`, `CCIPChainConfig` types           |

## App Flow Summary

- **Landing (`/`)**: Brand vision & ecosystem highlights.
- **Dashboard (`/dashboard`)**: Portfolio management & vault creation.
- **Query (`/dashboard/search`)**: Network-wide vault discovery & analysis.
- **Alerts (`/dashboard/notifications`)**: Telegram automation & monitoring.

## Getting Started

First, install the dependencies using Bun:

```bash
bun install
```

Then, run the development server:

```bash
bun run dev
```
