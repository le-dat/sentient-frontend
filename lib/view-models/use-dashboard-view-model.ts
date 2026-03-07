import {
  dashboardActivities,
  dashboardAlertReasons,
  dashboardHealth,
  dashboardMetrics,
  dashboardVaults,
} from "@/lib/mockdata/dashboard";

/**
 * Dashboard view-model.
 * Later can switch to API/GraphQL sources without touching UI components.
 */
export function useDashboardViewModel() {
  return {
    metrics: dashboardMetrics,
    health: dashboardHealth,
    vaults: dashboardVaults,
    activities: dashboardActivities,
    alertReasons: dashboardAlertReasons,
  };
}
