import type { Metadata } from "next";
import { ReactNode } from "react";
import { SearchLayoutClient } from "./search-layout-client";

export const metadata: Metadata = {
  title: "Query Vault",
  description:
    "Search and analyze any DeFi smart vault by address. View status, automation rules, and performance metrics across all supported chains.",
};

export default function SearchLayout({ children }: { children: ReactNode }) {
  return <SearchLayoutClient>{children}</SearchLayoutClient>;
}
