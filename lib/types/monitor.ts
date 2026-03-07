export type MonitorChainHealth = {
  chain: string;
  rpc: string;
  latency: string;
  latencyPct: number;
  lastBlock: string;
  dot: string;
  status: "success" | "queued";
};

export type MonitorLog = {
  id: string;
  status: "success" | "failed" | "queued";
  event: string;
  vault: string;
  chain: string;
  tx: string;
  time: string;
  gas: string;
};

export type MonitorSystemPanel = {
  label: string;
  value: string;
  color: string;
  dot: string;
  pulse: boolean;
};
