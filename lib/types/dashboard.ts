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

export type HealthItem = {
  label: string;
  value: string;
  color: string;
  dot: string;
  pulse: boolean;
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

export type ActivityItem = {
  type: string;
  vault: string;
  time: string;
  dotColor: string;
  textColor: string;
};
