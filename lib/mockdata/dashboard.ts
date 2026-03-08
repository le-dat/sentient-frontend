import type { VaultItem } from "@/lib/types/dashboard";

export const dashboardVaults: VaultItem[] = [
  {
    addr: "0x91f7...A4c2",
    chain: "Base",
    status: "active",
    balance: "5,000 USDC / 1.2 WETH",
    rule: "DCA Buy · Risk Shield Active",
    lastExecution: "2m ago",
    pnl: "+$420.00",
    pnlUp: true,
  },
  {
    addr: "0x52c4...19f1",
    chain: "Arbitrum",
    status: "paused",
    balance: "2,500 USDC / 0.8 WETH",
    rule: "Momentum Sell · Trailing Stop",
    lastExecution: "18m ago",
    pnl: "-$120.50",
    pnlUp: false,
  },
  {
    addr: "0xA8d3...F3b7",
    chain: "Ethereum",
    status: "active",
    balance: "10,000 USDC / 2.5 WETH",
    rule: "Grid Trading · Auto-Rebalance",
    lastExecution: "1h ago",
    pnl: "+$1,200.00",
    pnlUp: true,
  },
];
