"use client";

import { TopVaults } from "../../../components/query/top-vaults";

export default function SearchPage() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <TopVaults />
    </div>
  );
}
