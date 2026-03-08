/**
 * API client for sentient-backend.
 * Base URL: NEXT_PUBLIC_API_URL (default: http://localhost:8000)
 */

import type {
  PaginatedResponse,
  VaultDetail,
  VaultListItem,
  HistoryItem,
  CCIPConfigResponse,
  EstimateFeeRequest,
  EstimateFeeResponse,
} from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export interface ApiError {
  detail: string | Record<string, unknown>;
  status: number;
}

async function handleResponse<T>(res: Response): Promise<T> {
  const text = await res.text();
  if (!res.ok) {
    let detail: string | Record<string, unknown> = text;
    try {
      detail = JSON.parse(text) as Record<string, unknown>;
    } catch {
      // keep text
    }
    throw { detail, status: res.status } as ApiError;
  }
  if (!text) return {} as T;
  return JSON.parse(text) as T;
}

export interface ListVaultsParams {
  chain?: number;
  owner?: string;
  limit?: number;
  offset?: number;
}

export async function listVaults(
  params: ListVaultsParams = {},
): Promise<PaginatedResponse<VaultListItem>> {
  const search = new URLSearchParams();
  if (params.chain != null) search.set("chain", String(params.chain));
  if (params.owner) search.set("owner", params.owner);
  if (params.limit != null) search.set("limit", String(params.limit));
  if (params.offset != null) search.set("offset", String(params.offset));
  const qs = search.toString();
  const url = `${API_BASE}/api/v1/vaults${qs ? `?${qs}` : ""}`;
  const res = await fetch(url);
  return handleResponse<PaginatedResponse<VaultListItem>>(res);
}

export interface GetVaultParams {
  chain?: number;
}

export async function getVault(
  address: string,
  params: GetVaultParams = {},
): Promise<VaultDetail> {
  const search = new URLSearchParams();
  if (params.chain != null) search.set("chain", String(params.chain));
  const qs = search.toString();
  const url = `${API_BASE}/api/v1/vaults/${encodeURIComponent(address)}${qs ? `?${qs}` : ""}`;
  const res = await fetch(url);
  return handleResponse<VaultDetail>(res);
}

export interface GetVaultHistoryParams {
  chain?: number;
  type?: string;
  from?: string;
  to?: string;
  limit?: number;
  offset?: number;
}

export async function getVaultHistory(
  address: string,
  params: GetVaultHistoryParams = {},
): Promise<PaginatedResponse<HistoryItem>> {
  const search = new URLSearchParams();
  if (params.chain != null) search.set("chain", String(params.chain));
  if (params.type) search.set("type", params.type);
  if (params.from) search.set("from", params.from);
  if (params.to) search.set("to", params.to);
  if (params.limit != null) search.set("limit", String(params.limit));
  if (params.offset != null) search.set("offset", String(params.offset));
  const qs = search.toString();
  const url = `${API_BASE}/api/v1/vaults/${encodeURIComponent(address)}/history${qs ? `?${qs}` : ""}`;
  const res = await fetch(url);
  return handleResponse<PaginatedResponse<HistoryItem>>(res);
}

export async function getCCIPConfig(): Promise<CCIPConfigResponse> {
  const res = await fetch(`${API_BASE}/api/v1/vaults/ccip/config`);
  return handleResponse<CCIPConfigResponse>(res);
}

export async function estimateCCIPFee(
  body: EstimateFeeRequest,
): Promise<EstimateFeeResponse> {
  const res = await fetch(`${API_BASE}/api/v1/vaults/ccip/estimate-fee`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      vault_address: body.vault_address,
      chain_id: body.chain_id ?? 84532,
      destination_chain_selector: body.destination_chain_selector,
      token_address: body.token_address,
      amount: body.amount,
      receiver: body.receiver,
    }),
  });
  return handleResponse<EstimateFeeResponse>(res);
}
