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

export type ChainInfo = {
  id: number;
  name: string;
  symbol: string;
  color: string;
  vaultCount: number;
  enabled: boolean;
};
