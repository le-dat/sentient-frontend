import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "CCIP Cross-Chain",
  description:
    "Configure Chainlink CCIP router and execute Emergency Shield to protect your vault assets across multiple EVM chains.",
};

export default function CCIPLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
