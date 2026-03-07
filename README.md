# Sentient Finance Frontend

A modern, professor-style Next.js frontend for **Sentient Finance**, a decentralized smart vault management and analysis platform built on **Chainlink**.

## App Flow Summary

- **Landing (`/`)**: Brand vision & ecosystem highlights.
- **Dashboard (`/dashboard`)**: Portfolio management & vault creation.
- **Query (`/dashboard/search`)**: Network-wide vault discovery & analysis.
- **Alerts (`/dashboard/notifications`)**: Telegram automation & monitoring.

## Tech Stack & Shared Primitives

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Web3 Interface**: [Wagmi](https://wagmi.sh/) / Viem / WalletConnect
- **Package Manager**: [Bun](https://bun.sh/) (Recommended)

### Core UI Assets

- `components/layout/app-shell.tsx`: Main dashboard layout.
- `components/ui/*`: Reusable Primitive design tokens.
- `app/globals.css`: Dark DeFi baseline with custom tokens (`--primary`, `--card`, etc.).

## Getting Started

First, install the dependencies using Bun:

```bash
bun install
```

Then, run the development server:

```bash
bun run dev
```
