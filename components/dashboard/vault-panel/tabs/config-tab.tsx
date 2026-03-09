"use client";

import { getPriceFeedForToken } from "@/lib/constants/chainlink-feeds";
import { VAULT_CCIP_ABI } from "@/lib/contracts/vault-abi";
import { Ban, Check, ChevronDown, ChevronRight, Loader2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { parseUnits, zeroAddress } from "viem";
import {
  useReadContracts,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { TOKEN_DATA } from "../constants";

const TRADE_TOKENS = ["WETH", "LINK", "CCIP"];
const BASE_TOKENS = ["USDC"];

const THRESHOLD_HINTS: Record<string, { buy: string; sell: string }> = {
  WETH: { buy: "2500", sell: "3200" },
  LINK: { buy: "14", sell: "18" },
  CCIP: { buy: "1", sell: "1.2" },
};

type RuleData = {
  enabled: boolean;
  buyThreshold: string;
  sellThreshold: string;
  tradeAmount: string;
  baseToken: string;
};

const DEFAULT_RULE: RuleData = {
  enabled: false,
  buyThreshold: "",
  sellThreshold: "",
  tradeAmount: "",
  baseToken: "USDC",
};

function parseRule(rule: unknown): RuleData | null {
  if (!rule) return null;
  const r = rule as
    | { enabled?: boolean; buyThreshold?: bigint; sellThreshold?: bigint; tradeAmount?: bigint; baseToken?: string }
    | readonly unknown[];
  const en = Array.isArray(r) ? r[0] : (r as { enabled?: boolean }).enabled;
  const buy = Array.isArray(r) ? r[1] : (r as { buyThreshold?: bigint }).buyThreshold;
  const sell = Array.isArray(r) ? r[2] : (r as { sellThreshold?: bigint }).sellThreshold;
  const trade = Array.isArray(r) ? r[4] : (r as { tradeAmount?: bigint }).tradeAmount;
  const baseAddr = Array.isArray(r) ? r[5] : (r as { baseToken?: string }).baseToken;
  let baseToken = "USDC";
  if (baseAddr) {
    const sym = Object.entries(TOKEN_DATA).find(
      ([, v]) => v.address.toLowerCase() === String(baseAddr).toLowerCase()
    )?.[0];
    if (sym && BASE_TOKENS.includes(sym)) baseToken = sym;
  }
  const baseDec = TOKEN_DATA[baseToken]?.decimals ?? 18;
  return {
    enabled: Boolean(en),
    buyThreshold: buy != null && BigInt(buy) > 0n ? (Number(buy) / 1e18).toString() : "",
    sellThreshold: sell != null && BigInt(sell) > 0n ? (Number(sell) / 1e18).toString() : "",
    tradeAmount:
      trade != null && BigInt(trade) > 0n
        ? (Number(trade) / 10 ** baseDec).toString()
        : "",
    baseToken,
  };
}

interface ConfigTabProps {
  vaultAddress: `0x${string}`;
  chainId: number;
  preselectedToken?: string;
}

export function ConfigTab({ vaultAddress, chainId, preselectedToken }: ConfigTabProps) {
  const [expanded, setExpanded] = useState<Set<string>>(
    new Set(preselectedToken ? [preselectedToken] : [TRADE_TOKENS[0]])
  );
  const [formByToken, setFormByToken] = useState<Record<string, RuleData>>({});
  const [baseToken, setBaseToken] = useState("USDC");

  const contracts = useMemo(
    () =>
      TRADE_TOKENS.filter((s) => TOKEN_DATA[s]).flatMap((sym) => {
        const addr = TOKEN_DATA[sym]?.address as `0x${string}`;
        return [
          {
            address: vaultAddress,
            abi: VAULT_CCIP_ABI,
            functionName: "getTokenRule" as const,
            args: [addr] as const,
          },
          {
            address: vaultAddress,
            abi: VAULT_CCIP_ABI,
            functionName: "priceFeeds" as const,
            args: [addr] as const,
          },
        ];
      }),
    [vaultAddress]
  );

  const { data: results, refetch: refetchAll } = useReadContracts({
    contracts,
  });

  const rulesAndFeeds = TRADE_TOKENS.filter((s) => TOKEN_DATA[s]).map((sym, i) => {
    const ruleRes = results?.[i * 2];
    const feedRes = results?.[i * 2 + 1];
    const rule = ruleRes?.status === "success" ? ruleRes.result : null;
    const feed = feedRes?.status === "success" ? feedRes.result : null;
    return { sym, rule, feed };
  });

  useEffect(() => {
    rulesAndFeeds.forEach(({ sym, rule }) => {
      const parsed = parseRule(rule);
      if (parsed) {
        setFormByToken((prev) => ({ ...prev, [sym]: parsed }));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- sync from contract when results change
  }, [results]);

  const pendingTokenRule = useRef<{
    tokenAddr: `0x${string}`;
    baseAddr: `0x${string}`;
    enabled: boolean;
    buyRaw: bigint;
    sellRaw: bigint;
    tradeRaw: bigint;
  } | null>(null);
  const lastProcessedHash = useRef<`0x${string}` | undefined>(undefined);

  const { writeContract, isPending, error, reset, data: hash } = useWriteContract();
  const { status } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (status !== "success" || !hash) return;
    if (lastProcessedHash.current === hash) return;
    lastProcessedHash.current = hash;

    if (pendingTokenRule.current) {
      const p = pendingTokenRule.current;
      pendingTokenRule.current = null;
      refetchAll();
      writeContract({
        address: vaultAddress,
        abi: VAULT_CCIP_ABI,
        functionName: "setTokenRule",
        args: [p.tokenAddr, p.enabled, p.buyRaw, p.sellRaw, p.tradeRaw, p.baseAddr],
      });
    } else {
      refetchAll();
    }
  }, [status, hash, vaultAddress, writeContract, refetchAll]);

  const updateForm = (sym: string, upd: Partial<RuleData>) => {
    setFormByToken((prev) => ({
      ...prev,
      [sym]: { ...(prev[sym] ?? DEFAULT_RULE), ...upd },
    }));
  };

  const handleSave = (sym: string) => {
    const tokenAddr = TOKEN_DATA[sym]?.address as `0x${string}` | undefined;
    const baseAddr = TOKEN_DATA[baseToken]?.address as `0x${string}` | undefined;
    if (!tokenAddr || !baseAddr) return;

    const form = formByToken[sym] ?? DEFAULT_RULE;
    if (!form) return;
    const { enabled, buyThreshold, sellThreshold, tradeAmount } = form;

    const buyRaw = enabled && buyThreshold ? parseUnits(buyThreshold, 18) : 0n;
    const sellRaw = enabled && sellThreshold ? parseUnits(sellThreshold, 18) : 0n;
    const baseDec = TOKEN_DATA[baseToken]?.decimals ?? 18;
    const tradeRaw = enabled && tradeAmount ? parseUnits(tradeAmount, baseDec) : 0n;

    const feedData = rulesAndFeeds.find((r) => r.sym === sym);
    const existingFeed = (feedData?.feed as `0x${string}` | undefined) ?? zeroAddress;
    const feedAddr = getPriceFeedForToken(chainId, sym);
    const needsPriceFeed =
      feedAddr &&
      (existingFeed === zeroAddress || existingFeed === "0x0000000000000000000000000000000000000000");

    if (needsPriceFeed) {
      pendingTokenRule.current = {
        tokenAddr,
        baseAddr,
        enabled,
        buyRaw,
        sellRaw,
        tradeRaw,
      };
      writeContract({
        address: vaultAddress,
        abi: VAULT_CCIP_ABI,
        functionName: "setPriceFeed",
        args: [tokenAddr, feedAddr],
      });
    } else {
      writeContract({
        address: vaultAddress,
        abi: VAULT_CCIP_ABI,
        functionName: "setTokenRule",
        args: [tokenAddr, enabled, buyRaw, sellRaw, tradeRaw, baseAddr],
      });
    }
  };

  const handleDisable = (sym: string) => {
    const tokenAddr = TOKEN_DATA[sym]?.address as `0x${string}` | undefined;
    const baseAddr = TOKEN_DATA[baseToken]?.address as `0x${string}` | undefined;
    if (!tokenAddr || !baseAddr) return;
    writeContract({
      address: vaultAddress,
      abi: VAULT_CCIP_ABI,
      functionName: "setTokenRule",
      args: [tokenAddr, false, 0n, 0n, 0n, baseAddr],
    });
  };

  const toggleExpanded = (sym: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(sym)) next.delete(sym);
      else next.add(sym);
      return next;
    });
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border/60 bg-card-2/40 p-4 space-y-2">
        <p className="text-xs font-semibold">Token Rules</p>

        <div>
          <label className="text-[10px] text-muted block mb-1">Base token (chung)</label>
          <select
            value={baseToken}
            onChange={(e) => setBaseToken(e.target.value)}
            className="w-full rounded-lg border border-border/60 bg-card px-3 py-2 text-xs font-medium text-foreground outline-none focus:border-primary/50"
          >
            {BASE_TOKENS.filter((s) => TOKEN_DATA[s]).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <p className="text-xs text-red-400">
            {error.message}
            <button onClick={reset} className="ml-2 text-muted hover:text-foreground">
              Dismiss
            </button>
          </p>
        )}

        <div className="space-y-1">
          {rulesAndFeeds.map(({ sym, rule }) => {
            const form = formByToken[sym] ?? parseRule(rule) ?? DEFAULT_RULE;
            const isOpen = expanded.has(sym);
            const tokenAddr = TOKEN_DATA[sym]?.address as `0x${string}` | undefined;
            const baseAddr = TOKEN_DATA[baseToken]?.address as `0x${string}` | undefined;
            const enabled = form?.enabled ?? false;
            const canSave =
              tokenAddr &&
              baseAddr &&
              (enabled
                ? form?.buyThreshold &&
                  form?.sellThreshold &&
                  form?.tradeAmount &&
                  parseFloat(form.buyThreshold) > 0 &&
                  parseFloat(form.sellThreshold) > parseFloat(form.buyThreshold) &&
                  parseFloat(form.tradeAmount) > 0
                : true);

            return (
              <div
                key={sym}
                className="rounded-lg border border-border/50 bg-card/50 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleExpanded(sym)}
                  className="flex w-full items-center gap-2 px-3 py-2.5 text-left hover:bg-muted/30 transition-colors"
                >
                  {isOpen ? (
                    <ChevronDown className="h-4 w-4 shrink-0 text-muted" />
                  ) : (
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted" />
                  )}
                  <span className="text-xs font-semibold">{sym}</span>
                  <span
                    className={`ml-auto rounded px-2 py-0.5 text-[10px] font-medium ${
                      enabled ? "bg-emerald-500/20 text-emerald-400" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {enabled ? "On" : "Off"}
                  </span>
                  {enabled && form?.buyThreshold && form?.sellThreshold && (
                    <span className="text-[10px] text-muted truncate max-w-[140px]">
                      Buy &lt; ${form.buyThreshold} · Sell &gt; ${form.sellThreshold}
                    </span>
                  )}
                </button>

                {isOpen && (
                  <div className="border-t border-border/50 px-3 py-3 space-y-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`enabled-${sym}`}
                        checked={enabled}
                        onChange={(e) => updateForm(sym, { enabled: e.target.checked })}
                        className="rounded border-border/60"
                      />
                      <label htmlFor={`enabled-${sym}`} className="text-xs font-medium">
                        Enable rule
                      </label>
                    </div>

                    {enabled && (
                      <>
                        <div>
                          <label className="text-[10px] text-muted block mb-1">
                            Buy {sym} below ($)
                          </label>
                          <input
                            type="text"
                            value={form?.buyThreshold ?? ""}
                            onChange={(e) => updateForm(sym, { buyThreshold: e.target.value })}
                            placeholder={THRESHOLD_HINTS[sym]?.buy ?? "e.g. 2500"}
                            className="w-full rounded-lg border border-border/60 bg-card px-3 py-2 text-xs font-medium text-foreground outline-none focus:border-primary/50 placeholder:text-muted"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-muted block mb-1">
                            Sell {sym} above ($)
                          </label>
                          <input
                            type="text"
                            value={form?.sellThreshold ?? ""}
                            onChange={(e) => updateForm(sym, { sellThreshold: e.target.value })}
                            placeholder={THRESHOLD_HINTS[sym]?.sell ?? "e.g. 3200"}
                            className="w-full rounded-lg border border-border/60 bg-card px-3 py-2 text-xs font-medium text-foreground outline-none focus:border-primary/50 placeholder:text-muted"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-muted block mb-1">
                            Trade amount ({baseToken})
                          </label>
                          <input
                            type="text"
                            value={form?.tradeAmount ?? ""}
                            onChange={(e) => updateForm(sym, { tradeAmount: e.target.value })}
                            placeholder="100"
                            className="w-full rounded-lg border border-border/60 bg-card px-3 py-2 text-xs font-medium text-foreground outline-none focus:border-primary/50 placeholder:text-muted"
                          />
                        </div>
                      </>
                    )}

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSave(sym)}
                        disabled={isPending || !canSave}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary/20 py-2 text-xs font-semibold text-primary hover:bg-primary/30 disabled:opacity-50 transition-all"
                      >
                        {isPending ? (
                          <>
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            Saving…
                          </>
                        ) : (
                          <>
                            <Check className="h-3.5 w-3.5" />
                            Save
                          </>
                        )}
                      </button>
                      {enabled && tokenAddr && baseAddr && (
                        <button
                          onClick={() => handleDisable(sym)}
                          disabled={isPending}
                          className="flex items-center justify-center gap-2 rounded-xl border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs font-semibold text-amber-500 hover:bg-amber-500/20 disabled:opacity-50 transition-all"
                        >
                          <Ban className="h-3.5 w-3.5" />
                          Disable
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
