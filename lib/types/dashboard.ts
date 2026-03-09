export type MetricCard = {
  label: string;
  value: string;
  sub: string;
  subColor: string;
  border: string;
  gradient: string;
  iconColor: string;
  iconKey: "grid" | "coin" | "chart" | "bell";
};

export type VaultItem = {
  addr: string;
  chain: string;
  status: "active" | "paused";
  balance: string;
  rule: string;
  lastExecution: string;
  pnl: string;
  pnlUp: boolean;
};

export type ChainInfo = {
  id: number;
  name: string;
  symbol: string;
  color: string;
  vaultCount: number;
  enabled: boolean;
};
