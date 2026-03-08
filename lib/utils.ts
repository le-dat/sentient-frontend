import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortAddress(address: string, start = 6, end = 4): string {
  return `${address.slice(0, start)}…${address.slice(-end)}`;
}

export function groupByChain<T extends { chain: string }>(items: T[]): Record<string, T[]> {
  return items.reduce<Record<string, T[]>>((acc, item) => {
    if (!acc[item.chain]) acc[item.chain] = [];
    acc[item.chain].push(item);
    return acc;
  }, {});
}

