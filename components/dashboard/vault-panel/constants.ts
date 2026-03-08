import { Terminal, Clock, Settings2 } from "lucide-react";

export const TOKEN_DATA: Record<string, { name: string }> = {
  USDC: { name: "USD Coin" },
  USDT: { name: "Tether" },
  DAI: { name: "Dai" },
  WETH: { name: "Wrapped Ethereum" },
  ETH: { name: "Ethereum" },
  WBTC: { name: "Wrapped Bitcoin" },
  BTC: { name: "Bitcoin" },
  SOL: { name: "Solana" },
  BNB: { name: "BNB" },
  XRP: { name: "XRP" },
};

export const STABLE_COINS = ["USDC", "USDT", "DAI"];

export const tabItems = [
  { id: "console", label: "Console", Icon: Terminal },
  { id: "history", label: "History", Icon: Clock },
  { id: "config", label: "Config", Icon: Settings2 },
] as const;
