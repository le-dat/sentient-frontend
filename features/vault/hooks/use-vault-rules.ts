import { getPriceFeedForToken } from "@/lib/constants/chainlink-feeds";
import { VAULT_CCIP_ABI } from "@/lib/contracts";
import { useEffect, useMemo, useRef, useState } from "react";
import { parseUnits, zeroAddress } from "viem";
import { useReadContracts, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { TOKEN_DATA } from "../components/vault-panel/constants";
import { DEFAULT_RULE, RuleData, TRADE_TOKENS, parseRule } from "../types";

interface UseVaultRulesOptions {
  vaultAddress: `0x${string}`;
  chainId: number;
}

export function useVaultRules({ vaultAddress, chainId }: UseVaultRulesOptions) {
  const [formByToken, setFormByToken] = useState<Record<string, RuleData>>({});
  const [baseToken, setBaseToken] = useState("USDC");

  // ── Contract reads ──────────────────────────────────────────────────────────
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

  const { data: results, refetch: refetchAll } = useReadContracts({ contracts });

  const rulesAndFeeds = TRADE_TOKENS.filter((s) => TOKEN_DATA[s]).map((sym, i) => {
    const ruleRes = results?.[i * 2];
    const feedRes = results?.[i * 2 + 1];
    const rule = ruleRes?.status === "success" ? ruleRes.result : null;
    const feed = feedRes?.status === "success" ? feedRes.result : null;
    return { sym, rule, feed };
  });

  // Sync form state from on-chain data
  useEffect(() => {
    rulesAndFeeds.forEach(({ sym, rule }) => {
      const parsed = parseRule(rule);
      if (parsed) {
        setFormByToken((prev) => ({ ...prev, [sym]: parsed }));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- sync from contract when results change
  }, [results]);

  // ── Contract writes ─────────────────────────────────────────────────────────
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

  // ── Form helpers ────────────────────────────────────────────────────────────
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
    const { enabled, buyThreshold, sellThreshold, tradeAmount } = form;

    const buyRaw = enabled && buyThreshold ? parseUnits(buyThreshold, 18) : 0n;
    const sellRaw = enabled && sellThreshold ? parseUnits(sellThreshold, 18) : 0n;
    const baseDec = TOKEN_DATA[baseToken]?.decimals ?? 18;
    const tradeRaw = enabled && tradeAmount ? parseUnits(tradeAmount, baseDec) : 0n;

    const feedData = rulesAndFeeds.find((r) => r.sym === sym);
    const existingFeed = (feedData?.feed as `0x${string}` | undefined) ?? zeroAddress;
    const feedAddr = getPriceFeedForToken(chainId, sym);
    const needsPriceFeed = feedAddr && existingFeed === zeroAddress;

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

  return {
    rulesAndFeeds,
    formByToken,
    baseToken,
    setBaseToken,
    updateForm,
    handleSave,
    handleDisable,
    isPending,
    error,
    reset,
  };
}
