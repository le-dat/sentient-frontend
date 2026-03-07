import type { ActivityItem, HealthItem, MetricCard, VaultItem } from "@/lib/types/dashboard";

export const dashboardMetrics: MetricCard[] = [
  {
    label: "Total Vaults",
    value: "12",
    sub: "3 paused",
    subColor: "text-muted",
    border: "border-primary/30",
    gradient: "from-primary/8 to-transparent",
    iconColor: "text-primary",
    iconKey: "grid",
  },
  {
    label: "Estimated TVL",
    value: "$128,430",
    sub: "+4.2% today",
    subColor: "text-success",
    border: "border-success/30",
    gradient: "from-success/8 to-transparent",
    iconColor: "text-success",
    iconKey: "coin",
  },
  {
    label: "24h Executions",
    value: "42",
    sub: "36 ✓ · 6 ✗",
    subColor: "text-muted",
    border: "border-border/60",
    gradient: "from-card-2/40 to-transparent",
    iconColor: "text-muted",
    iconKey: "chart",
  },
  {
    label: "Active Alerts",
    value: "2",
    sub: "unresolved",
    subColor: "text-warning",
    border: "border-warning/30",
    gradient: "from-warning/8 to-transparent",
    iconColor: "text-warning",
    iconKey: "bell",
  },
];

export const dashboardHealth: HealthItem[] = [
  { label: "Backend API", value: "Healthy", color: "text-success", dot: "bg-success", pulse: true },
  { label: "GraphQL lag", value: "2 blocks", color: "text-warning", dot: "bg-warning", pulse: false },
  { label: "RPC", value: "Up", color: "text-success", dot: "bg-success", pulse: true },
  { label: "Queue backlog", value: "4 jobs", color: "text-muted", dot: "bg-muted", pulse: false },
];

export const dashboardVaults: VaultItem[] = [
  {
    addr: "0x91f7...A4c2",
    chain: "Base Mainnet",
    status: "active",
    balance: "3,200 USDC / 0.82 WETH",
    rule: "Buy < $1,900 · Sell > $2,350",
    lastExecution: "3m ago",
    pnl: "+$4,210",
    pnlUp: true,
  },
  {
    addr: "0x52c4...19f1",
    chain: "Base Sepolia",
    status: "paused",
    balance: "500 USDC / 0.00 WETH",
    rule: "Buy < $1,850 · Sell > $2,100",
    lastExecution: "2h ago",
    pnl: "-$120",
    pnlUp: false,
  },
];

export const dashboardActivities: ActivityItem[] = [
  { type: "SwapExecuted", vault: "0x91f7...A4c2", time: "2m ago", dotColor: "bg-success", textColor: "text-success" },
  { type: "TokenRuleSet", vault: "0x52c4...19f1", time: "40m ago", dotColor: "bg-primary", textColor: "text-primary" },
  { type: "ShieldTriggered", vault: "0x91f7...A4c2", time: "3h ago", dotColor: "bg-warning", textColor: "text-warning" },
  { type: "ExecutionFailed", vault: "0xA8d3...F3b7", time: "5h ago", dotColor: "bg-danger", textColor: "text-danger" },
];

export const dashboardAlertReasons = ["SlippageTooHigh", "Stale oracle price", "Execution revert"];
