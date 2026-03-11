import type { AlertPreference } from "./types";

export const notificationAlertPrefs: AlertPreference[] = [
  {
    key: "buy",
    label: "Buy threshold triggered",
    desc: "Notify when price hits your buy rule",
    enabled: true,
    dot: "bg-success",
    onToggle: () => {
      console.log("Buy toggle");
    },
  },
  {
    key: "sell",
    label: "Sell threshold triggered",
    desc: "Notify when price hits your sell rule",
    enabled: true,
    dot: "bg-danger",
    onToggle: () => {
      console.log("Sell toggle");
    },
  },
  {
    key: "fail",
    label: "Swap execution failed",
    desc: "Immediate alert on reverts or slippage",
    enabled: true,
    dot: "bg-danger",
    onToggle: () => {
      console.log("Fail toggle");
    },
  },
  {
    key: "risk",
    label: "Risk shield activated",
    desc: "Notify when a circuit-breaker fires",
    enabled: true,
    dot: "bg-warning",
    onToggle: () => {
      console.log("Risk toggle");
    },
  },
];
