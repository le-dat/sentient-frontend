import type { MonitorChainHealth, MonitorLog, MonitorSystemPanel } from "@/lib/types/monitor";

export const monitorChainHealth: MonitorChainHealth[] = [
  { chain: "Base Mainnet", rpc: "Healthy", latency: "48ms", latencyPct: 22, lastBlock: "12,841,002", dot: "bg-success", status: "success" },
  { chain: "Arbitrum", rpc: "Healthy", latency: "61ms", latencyPct: 28, lastBlock: "198,341,220", dot: "bg-success", status: "success" },
  { chain: "Ethereum", rpc: "Degraded", latency: "210ms", latencyPct: 78, lastBlock: "19,421,005", dot: "bg-warning", status: "queued" },
  { chain: "Base Sepolia", rpc: "Healthy", latency: "55ms", latencyPct: 25, lastBlock: "11,204,118", dot: "bg-success", status: "success" },
];

export const monitorLogs: MonitorLog[] = [
  { id: "exec-001", status: "success", event: "SwapExecuted", vault: "0x91f7...A4c2", chain: "Base Mainnet", tx: "0xabc...def1", time: "2m ago", gas: "0.00042 ETH" },
  { id: "exec-002", status: "failed", event: "SlippageTooHigh", vault: "0x52c4...19f1", chain: "Base Sepolia", tx: "0xfff...0001", time: "18m ago", gas: "—" },
  { id: "risk-001", status: "queued", event: "ShieldTriggered", vault: "0x91f7...A4c2", chain: "Base Mainnet", tx: "—", time: "1h ago", gas: "—" },
  { id: "exec-003", status: "success", event: "SwapExecuted", vault: "0xA8d3...F3b7", chain: "Ethereum", tx: "0x123...ab99", time: "3h ago", gas: "0.00081 ETH" },
  { id: "exec-004", status: "failed", event: "ExecutionRevert", vault: "0x52c4...19f1", chain: "Arbitrum", tx: "0xdeadbeef", time: "5h ago", gas: "—" },
];

export const monitorSystemPanels: MonitorSystemPanel[] = [
  { label: "Backend API", value: "Operational", color: "text-success", dot: "bg-success", pulse: true },
  { label: "GraphQL Indexer", value: "2 block lag", color: "text-warning", dot: "bg-warning", pulse: false },
  { label: "Chainlink Oracle", value: "Fresh", color: "text-success", dot: "bg-success", pulse: true },
  { label: "Job Queue", value: "4 pending", color: "text-muted", dot: "bg-muted", pulse: false },
  { label: "Telegram Bot", value: "Connected", color: "text-success", dot: "bg-success", pulse: true },
  { label: "Automation Node", value: "Running", color: "text-success", dot: "bg-success", pulse: true },
];
