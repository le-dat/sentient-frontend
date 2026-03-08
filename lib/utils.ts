import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortAddress(address: string, start = 6, end = 4): string {
  return `${address.slice(0, start)}…${address.slice(-end)}`;
}

