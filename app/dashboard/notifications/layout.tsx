import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Alerts & Notifications",
  description:
    "Manage your vault alert preferences and connect notification channels. Get real-time updates on price triggers, deposits, and vault activity via Telegram.",
};

export default function NotificationsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
