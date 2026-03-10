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
          className="rounded-full bg-linear-to-r from-primary to-primary/80 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all hover:shadow-primary/35 hover:opacity-95"
        >
          Launch App
        </Link>
      }
    />
  );
}
