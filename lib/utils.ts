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

export function formatError(error: unknown): string {
  if (error == null) return "An unknown error occurred";
  if (typeof error === "string") return _cleanMessage(error);
  if (typeof error === "object" && !Array.isArray(error)) {
    const obj = error as Record<string, unknown>;
    const apiMsg =
      (typeof obj.error === "string" ? obj.error : null) ??
      (typeof obj.detail === "string" ? obj.detail : null);
    if (apiMsg) return _cleanMessage(apiMsg);
  }
  if (error instanceof Error) return _classifyMessage(error.message);
  return "An unknown error occurred";
}

function _classifyMessage(raw: string): string {
  const msg = raw.toLowerCase();
  if (msg.includes("user rejected") || msg.includes("user denied"))
    return "User rejected";
  if (msg.includes("insufficient funds"))
    return "Insufficient funds for gas";
  if (msg.includes("nonce too low") || msg.includes("nonce has already been used"))
    return "Nonce conflict, try again";
  if (msg.includes("execution reverted") || msg.includes("contract reverted")) {
    const revertMatch =
      raw.match(/revert(?:ed)?\s+(?:reason\s*:\s*)?["']?([^"'\n]{1,80})["']?/i) ??
      raw.match(/Error:\s+([A-Z][a-zA-Z0-9 ]{1,60})/);
    if (revertMatch?.[1]) {
      const reason = revertMatch[1].trim().replace(/['"]/g, "");
      return reason.length > 0 ? reason : "Contract reverted";
    }
    return "Contract reverted";
  }
  return _cleanMessage(raw);
}

function _cleanMessage(raw: string): string {
  let clean = raw
    .replace(/\b0x[0-9a-fA-F]{8,}\b/g, "")
    .replace(/\bABI:\s*\[.*?\]/gs, "")
    .replace(/\s*Details:.*$/s, "")
    .replace(/\s+/g, " ")
    .trim();
  if (clean.length > 200) clean = clean.slice(0, 200) + "…";
  return clean || "An unknown error occurred";
}
