import { monitorChainHealth, monitorLogs, monitorSystemPanels } from "@/lib/mockdata/monitor";

export function useMonitorViewModel() {
  return {
    chainHealth: monitorChainHealth,
    logs: monitorLogs,
    systemPanels: monitorSystemPanels,
  };
}
