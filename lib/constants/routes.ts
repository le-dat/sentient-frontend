export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  SEARCH: "/dashboard/search",
  SEARCH_VAULT: (address: string) => `/dashboard/search/${encodeURIComponent(address)}`,
  CCIP: "/dashboard/ccip",
  NOTIFICATIONS: "/dashboard/notifications",
} as const;
