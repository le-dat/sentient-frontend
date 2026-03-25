"use client";

import { ROUTES } from "@/lib/constants/routes";
import { Navbar } from "@/components/layout/navbar";
import Link from "next/link";

export function LandingNav() {
  return (
    <Navbar
      right={
        <Link
          href={ROUTES.DASHBOARD}
          target="_blank"
          rel="noopener noreferrer"
          className="from-primary to-primary/80 shadow-primary/20 hover:shadow-primary/35 rounded-full bg-linear-to-r px-5 py-2 text-sm font-semibold text-white shadow-md transition-all hover:opacity-95"
        >
          Launch App
        </Link>
      }
    />
  );
}
