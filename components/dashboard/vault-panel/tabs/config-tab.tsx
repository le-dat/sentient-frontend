"use client";

import { useState, useEffect, useRef } from "react";
import { useWriteContract, useReadContract, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits, zeroAddress } from "viem";
import { Loader2, Check } from "lucide-react";
import { VAULT_CCIP_ABI } from "@/lib/contracts/vault-abi";
import { TOKEN_DATA } from "../constants";
import { getPriceFeedForToken } from "@/lib/constants/chainlink-feeds";

const TRADE_TOKENS = ["WETH", "LINK", "CCIP"];
const BASE_TOKENS = ["USDC"];

const THRESHOLD_HINTS: Record<string, { buy: string; sell: string }> = {
  WETH: { buy: "2500", sell: "3200" },
  LINK: { buy: "14", sell: "18" },
  CCIP: { buy: "1", sell: "1.2" },
};

interface ConfigTabProps {
  vaultAddress: `0x${string}`;
  chainId: number;
  preselectedToken?: string;
}

export function ConfigTab({ vaultAddress, chainId, preselectedToken }: ConfigTabProps) {
  const [token, setToken] = useState(preselectedToken || "WETH");
  const [baseToken, setBaseToken] = useState("USDC");
  const [buyThreshold, setBuyThreshold] = useState("");
  const [sellThreshold, setSellThreshold] = useState("");
  const [tradeAmount, setTradeAmount] = useState("");
  const [enabled, setEnabled] = useState(true);

  const tokenAddr = TOKEN_DATA[token]?.address as `0x${string}` | undefined;
  const baseAddr = TOKEN_DATA[baseToken]?.address as `0x${string}` | undefined;

  const { data: rule, refetch: refetchRule } = useReadContract({
    address: tokenAddr ? vaultAddress : undefined,
    abi: VAULT_CCIP_ABI,
    functionName: "getTokenRule",
    args: tokenAddr ? [tokenAddr] : undefined,
  });

  const { data: currentFeed, refetch: refetchFeed } = useReadContract({
    address: tokenAddr ? vaultAddress : undefined,
    abi: VAULT_CCIP_ABI,
    functionName: "priceFeeds",
    args: tokenAddr ? [tokenAddr] : undefined,
  });

  const pendingTokenRule = useRef<{
    tokenAddr: `0x${string}`;
    baseAddr: `0x${string}`;
    enabled: boolean;
    buyRaw: bigint;
    sellRaw: bigint;
    tradeRaw: bigint;
  } | null>(null);
  const lastProcessedHash = useRef<`0x${string}` | undefined>(undefined);

  useEffect(() => {
    if (preselectedToken) setToken(preselectedToken);
  }, [preselectedToken]);

  useEffect(() => {
    if (!rule) return;
    const r = rule as
      | { enabled?: boolean; buyThreshold?: bigint; sellThreshold?: bigint; tradeAmount?: bigint; baseToken?: string }
      | readonly unknown[];
    const en = Array.isArray(r) ? r[0] : (r as { enabled?: boolean }).enabled;
    const buy = Array.isArray(r) ? r[1] : (r as { buyThreshold?: bigint }).buyThreshold;
    const sell = Array.isArray(r) ? r[2] : (r as { sellThreshold?: bigint }).sellThreshold;
    const trade = Array.isArray(r) ? r[4] : (r as { tradeAmount?: bigint }).tradeAmount;
    const baseAddr = Array.isArray(r) ? r[5] : (r as { baseToken?: string }).baseToken;
    setEnabled(Boolean(en));
    setBuyThreshold(buy != null && BigInt(buy) > 0n ? (Number(buy) / 1e18).toString() : "");
    setSellThreshold(sell != null && BigInt(sell) > 0n ? (Number(sell) / 1e18).toString() : "");
    if (baseAddr) {
      const sym = Object.entries(TOKEN_DATA).find(
        ([, v]) => v.address.toLowerCase() === String(baseAddr).toLowerCase()
      )?.[0];
      if (sym && BASE_TOKENS.includes(sym)) setBaseToken(sym);
    }
    if (trade != null && BigInt(trade) > 0n) {
      const sym = baseAddr
        ? Object.entries(TOKEN_DATA).find(
            ([, v]) => v.address.toLowerCase() === String(baseAddr).toLowerCase()
          )?.[0]
        : baseToken;
      const dec = TOKEN_DATA[sym ?? baseToken]?.decimals ?? 18;
      setTradeAmount((Number(trade) / 10 ** dec).toString());
    } else {
      setTradeAmount("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- baseToken used as fallback for decimals only
  }, [rule]);

  const { writeContract, isPending, error, reset, data: hash } = useWriteContract();
  const { status } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (status !== "success" || !hash) return;
    if (lastProcessedHash.current === hash) return;
    lastProcessedHash.current = hash;

    if (pendingTokenRule.current) {
      const p = pendingTokenRule.current;
      pendingTokenRule.current = null;
      refetchFeed();
      writeContract({
        address: vaultAddress,
        abi: VAULT_CCIP_ABI,
        functionName: "setTokenRule",
        args: [p.tokenAddr, p.enabled, p.buyRaw, p.sellRaw, p.tradeRaw, p.baseAddr],
      });
    } else {
      refetchRule();
    }
  }, [status, hash, vaultAddress, writeContract, refetchFeed, refetchRule]);

  const handleSave = () => {
    if (!tokenAddr || !baseAddr) return;

    const buyRaw = enabled && buyThreshold ? parseUnits(buyThreshold, 18) : 0n;
    const sellRaw = enabled && sellThreshold ? parseUnits(sellThreshold, 18) : 0n;
    const baseDec = TOKEN_DATA[baseToken]?.decimals ?? 18;
    const tradeRaw = enabled && tradeAmount ? parseUnits(tradeAmount, baseDec) : 0n;

    const feedAddr = getPriceFeedForToken(chainId, token);
    const existingFeed = (currentFeed as `0x${string}` | undefined) ?? zeroAddress;
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

  const canSave =
    tokenAddr &&
    baseAddr &&
    (enabled
      ? buyThreshold &&
        sellThreshold &&
        tradeAmount &&
        parseFloat(buyThreshold) > 0 &&
        parseFloat(sellThreshold) > parseFloat(buyThreshold) &&
        parseFloat(tradeAmount) > 0
      : true);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border/60 bg-card-2/40 p-4 space-y-4">
        <p className="text-xs font-semibold">Token Rule</p>

        <div>
          <label className="text-[10px] text-muted block mb-1">Token (to trade)</label>
          <select
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-full rounded-lg border border-border/60 bg-card px-3 py-2 text-xs font-medium text-foreground outline-none focus:border-primary/50"
          >
            {TRADE_TOKENS.filter((s) => TOKEN_DATA[s]).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[10px] text-muted block mb-1">Base token</label>
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

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="enabled"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
            className="rounded border-border/60"
          />
          <label htmlFor="enabled" className="text-xs font-medium">
            Enable rule
          </label>
        </div>

        {enabled && (
          <>
            <div>
              <label className="text-[10px] text-muted block mb-1">
                Buy {token} below ($)
              </label>
              <input
                type="text"
                value={buyThreshold}
                onChange={(e) => setBuyThreshold(e.target.value)}
                placeholder={THRESHOLD_HINTS[token]?.buy ?? "e.g. 2500"}
                className="w-full rounded-lg border border-border/60 bg-card px-3 py-2 text-xs font-medium text-foreground outline-none focus:border-primary/50 placeholder:text-muted"
              />
            </div>

            <div>
              <label className="text-[10px] text-muted block mb-1">
                Sell {token} above ($)
              </label>
              <input
                type="text"
                value={sellThreshold}
                onChange={(e) => setSellThreshold(e.target.value)}
                placeholder={THRESHOLD_HINTS[token]?.sell ?? "e.g. 3200"}
                className="w-full rounded-lg border border-border/60 bg-card px-3 py-2 text-xs font-medium text-foreground outline-none focus:border-primary/50 placeholder:text-muted"
              />
            </div>

            <div>
              <label className="text-[10px] text-muted block mb-1">
                Trade amount ({baseToken})
              </label>
              <input
                type="text"
                value={tradeAmount}
                onChange={(e) => setTradeAmount(e.target.value)}
                placeholder="100"
                className="w-full rounded-lg border border-border/60 bg-card px-3 py-2 text-xs font-medium text-foreground outline-none focus:border-primary/50 placeholder:text-muted"
              />
            </div>
          </>
        )}

        {error && (
          <p className="text-xs text-red-400">
            {error.message}
            <button onClick={reset} className="ml-2 text-muted hover:text-foreground">
              Dismiss
            </button>
          </p>
        )}

        <button
          onClick={handleSave}
          disabled={isPending || !canSave}
          className="flex items-center justify-center gap-2 w-full rounded-xl bg-primary/20 py-2.5 text-xs font-semibold text-primary hover:bg-primary/30 disabled:opacity-50 transition-all"
        >
          {isPending ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Saving…
            </>
          ) : (
            <>
              <Check className="h-3.5 w-3.5" />
              Save Rule
            </>
          )}
        </button>
      </div>
    </div>
  );
}
