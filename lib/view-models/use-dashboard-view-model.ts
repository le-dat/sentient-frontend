import { dashboardMetrics, dashboardVaults } from "@/lib/mockdata/dashboard";

/**
 * Dashboard view-model.
 * Later can switch to API/GraphQL sources without touching UI components.
 */
export function useDashboardViewModel() {
  return {
    metrics: dashboardMetrics,
    vaults: dashboardVaults,
  };
}
