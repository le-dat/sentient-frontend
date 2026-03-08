import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { baseSepolia } from "wagmi/chains";

const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!walletConnectProjectId) {
  throw new Error(
    "Missing NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID. Add it to your environment before starting the app.",
  );
}

export const config = getDefaultConfig({
  appName: "Sentient Finance",
  projectId: walletConnectProjectId,
  chains: [baseSepolia],
  ssr: true,
});
