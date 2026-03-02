import type { AlertPreference, RecentNotification } from "@/lib/types/notifications";

export const notificationAlertPrefs: AlertPreference[] = [
  { key: "buy", label: "Buy threshold triggered", desc: "Notify when price hits your buy rule", enabled: true, iconColor: "text-success", dot: "bg-success" },
  { key: "sell", label: "Sell threshold triggered", desc: "Notify when price hits your sell rule", enabled: true, iconColor: "text-danger", dot: "bg-danger" },
  { key: "fail", label: "Swap execution failed", desc: "Immediate alert on reverts or slippage", enabled: true, iconColor: "text-danger", dot: "bg-danger" },
  { key: "risk", label: "Risk shield activated", desc: "Notify when a circuit-breaker fires", enabled: true, iconColor: "text-warning", dot: "bg-warning" },
  { key: "health", label: "Chain health degraded", desc: "Alert on RPC lag or oracle staleness", enabled: false, iconColor: "text-muted", dot: "bg-muted" },
  { key: "queue", label: "Job queue backlog", desc: "Warn when pending jobs exceed threshold", enabled: false, iconColor: "text-muted", dot: "bg-muted" },
];

export const notificationRecentItems: RecentNotification[] = [
  { type: "SwapExecuted", vault: "0x91f7...A4c2", chain: "Base", time: "2m ago", dot: "bg-success", textColor: "text-success" },
  { type: "SlippageTooHigh", vault: "0x52c4...19f1", chain: "Arbitrum", time: "18m ago", dot: "bg-danger", textColor: "text-danger" },
  { type: "ShieldTriggered", vault: "0x91f7...A4c2", chain: "Base", time: "1h ago", dot: "bg-warning", textColor: "text-warning" },
  { type: "RuleUpdated", vault: "0xA8d3...F3b7", chain: "Ethereum", time: "3h ago", dot: "bg-primary", textColor: "text-primary" },
  { type: "VaultPaused", vault: "0x52c4...19f1", chain: "Base Sepolia", time: "5h ago", dot: "bg-muted", textColor: "text-muted" },
];
