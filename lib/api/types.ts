/**
 * API types aligned with sentient-backend /api/v1/vaults responses.
 */

export interface VaultListItem {
  chain_id: number;
  address: string;
  created_block_number: number | null;
  created_tx_hash: string | null;
  created_timestamp: string | null;
}

export interface VaultDetail {
  chain_id: number;
  address: string;
  created_block_number: number | null;
  created_tx_hash: string | null;
  created_timestamp: string | null;
  event_count: number;
  latest_event_block: number | null;
  latest_event_timestamp: string | null;
}

export interface HistoryItem {
  chain_id: number;
  vault_address: string;
  event_type: string;
  block_number: number;
  tx_hash: string;
  log_index: number;
  timestamp: string;
  payload_json: Record<string, unknown>;
}

export interface PaginatedResponse<T> {
  total: number;
  limit: number;
  offset: number;
  items: T[];
}
