export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  SEARCH: "/dashboard/search",
  SEARCH_VAULT: (address: string) => `/dashboard/search/${encodeURIComponent(address)}`,
  NOTIFICATIONS: "/dashboard/notifications",
} as const;
