import { TOKEN_DATA } from "./components/vault-panel/constants";

export type VaultItem = {
  addr: string;
  owner?: string | null;
  chain: string;
  chainId?: number;
  status: "active" | "paused";
  balance: string;
  rule: string;
  lastExecution: string;
  pnl: string;
  pnlUp: boolean;
};

export const TRADE_TOKENS = ["WETH", "LINK", "CCIP"];
export const BASE_TOKENS = ["USDC"];

export type RuleData = {
  enabled: boolean;
  buyThreshold: string;
  sellThreshold: string;
  tradeAmount: string;
  baseToken: string;
};

export const DEFAULT_RULE: RuleData = {
  enabled: false,
  buyThreshold: "",
  sellThreshold: "",
  tradeAmount: "",
  baseToken: "USDC",
};

export function parseRule(rule: unknown): RuleData | null {
  if (!rule) return null;
  const r = rule as
    | {
        enabled?: boolean;
        buyThreshold?: bigint;
        sellThreshold?: bigint;
        tradeAmount?: bigint;
        baseToken?: string;
      }
    | readonly unknown[];
  const en = Array.isArray(r) ? r[0] : (r as { enabled?: boolean }).enabled;
  const buy = Array.isArray(r) ? r[1] : (r as { buyThreshold?: bigint }).buyThreshold;
  const sell = Array.isArray(r) ? r[2] : (r as { sellThreshold?: bigint }).sellThreshold;
  const trade = Array.isArray(r) ? r[4] : (r as { tradeAmount?: bigint }).tradeAmount;
  const baseAddr = Array.isArray(r) ? r[5] : (r as { baseToken?: string }).baseToken;

  let baseToken = "USDC";
  if (baseAddr) {
    const sym = Object.entries(TOKEN_DATA).find(
      ([, v]) => v.address.toLowerCase() === String(baseAddr).toLowerCase(),
    )?.[0];
    if (sym && BASE_TOKENS.includes(sym)) baseToken = sym;
  }

  const baseDec = TOKEN_DATA[baseToken]?.decimals ?? 18;
  return {
    enabled: Boolean(en),
    buyThreshold: buy != null && BigInt(buy) > 0n ? (Number(buy) / 1e18).toString() : "",
    sellThreshold: sell != null && BigInt(sell) > 0n ? (Number(sell) / 1e18).toString() : "",
    tradeAmount:
      trade != null && BigInt(trade) > 0n ? (Number(trade) / 10 ** baseDec).toString() : "",
    baseToken,
  };
}
