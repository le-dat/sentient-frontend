import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatUnits } from "viem";
import { EXPLORER_BASE, EXPLORER_FALLBACK } from "@/lib/constants/urls";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortAddress(address: string, start = 6, end = 4): string {
  return `${address.slice(0, start)}…${address.slice(-end)}`;
}

export function formatTimestamp(ts: string | null): string {
  if (!ts) return "—";
  const d = new Date(ts);
  const diff = Date.now() - d.getTime();
  if (diff < 60_000) return "just now";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return d.toLocaleDateString();
}

export function getExplorerBase(chainId: number): string {
  return EXPLORER_BASE[chainId] ?? EXPLORER_FALLBACK;
}

export function groupByChain<T extends { chain: string }>(items: T[]): Record<string, T[]> {
  return items.reduce<Record<string, T[]>>((acc, item) => {
    if (!acc[item.chain]) acc[item.chain] = [];
    acc[item.chain].push(item);
    return acc;
  }, {});
}

/**
 * Format a raw token amount (bigint or string) with given decimals.
 * Large values (>=1000) use locale formatting; small values use 4 significant figures.
 */
export function formatAmount(raw: bigint | string | number, decimals = 18): string {
  try {
    const n = parseFloat(formatUnits(BigInt(String(raw)), decimals));
    return n >= 1000
      ? n.toLocaleString("en-US", { maximumFractionDigits: 2 })
      : parseFloat(n.toPrecision(4)).toString();
  } catch {
    return "—";
  }
}

/** Returns true if the string is a valid EVM address (0x + 40 hex chars). */
export function isValidAddress(addr: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(addr);
}
