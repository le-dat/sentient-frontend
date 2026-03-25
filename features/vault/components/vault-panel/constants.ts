import { Terminal, Clock, Settings2 } from "lucide-react";

export { TOKEN_DATA, SWAP_TOKENS } from "@/lib/constants/tokens";

export const tabItems = [
  { id: "console", label: "Console", Icon: Terminal },
  { id: "history", label: "History", Icon: Clock },
  { id: "config", label: "Config", Icon: Settings2 },
] as const;
