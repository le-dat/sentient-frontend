import type { AlertPreference } from "./types";

export const notificationAlertPrefs: AlertPreference[] = [
  { key: "buy", label: "Buy threshold triggered", desc: "Notify when price hits your buy rule", enabled: true, dot: "bg-success" },
  { key: "sell", label: "Sell threshold triggered", desc: "Notify when price hits your sell rule", enabled: true, dot: "bg-danger" },
  { key: "fail", label: "Swap execution failed", desc: "Immediate alert on reverts or slippage", enabled: true, dot: "bg-danger" },
  { key: "risk", label: "Risk shield activated", desc: "Notify when a circuit-breaker fires", enabled: true, dot: "bg-warning" },
  // { key: "health", label: "Chain health degraded", desc: "Alert on RPC lag or oracle staleness", enabled: false, dot: "bg-muted" },
  // { key: "queue", label: "Job queue backlog", desc: "Warn when pending jobs exceed threshold", enabled: false, dot: "bg-muted" },
];

