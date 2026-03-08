"use client";

import { useQuery } from "@tanstack/react-query";
import {
  listVaults,
  getVault,
  getVaultHistory,
  type ListVaultsParams,
  type GetVaultParams,
  type GetVaultHistoryParams,
} from "./client";

export const vaultKeys = {
  all: ["vaults"] as const,
  lists: (params?: ListVaultsParams) =>
    [...vaultKeys.all, "list", params] as const,
  detail: (address: string, params?: GetVaultParams) =>
    [...vaultKeys.all, "detail", address, params] as const,
  history: (address: string, params?: GetVaultHistoryParams) =>
    [...vaultKeys.all, "history", address, params] as const,
};

export function useVaultsList(
  params: ListVaultsParams = {},
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: vaultKeys.lists(params),
    queryFn: () => listVaults(params),
    enabled: options?.enabled ?? true,
  });
}

export function useVaultDetail(address: string, params?: GetVaultParams) {
  return useQuery({
    queryKey: vaultKeys.detail(address, params),
    queryFn: () => getVault(address, params ?? {}),
    enabled: !!address && address.startsWith("0x") && address.length === 42,
  });
}

export function useVaultHistory(
  address: string,
  params?: GetVaultHistoryParams,
) {
  return useQuery({
    queryKey: vaultKeys.history(address, params),
    queryFn: () => getVaultHistory(address, params ?? {}),
    enabled: !!address && address.startsWith("0x") && address.length === 42,
  });
}
