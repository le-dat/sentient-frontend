"use client";

import { useState, useEffect } from "react";
import { notificationAlertPrefs } from "../fixtures";
import type { RecentNotification } from "../types";
import { getHistory, timeAgo } from "../lib/notification-history";

function toRecentNotifications(
  history: ReturnType<typeof getHistory>,
): RecentNotification[] {
  return history.map((h) => ({ ...h, time: timeAgo(h.sentAt) }));
}

export function useNotifications() {
  const [alertPrefs, setAlertPrefs] = useState(notificationAlertPrefs);
  const [recentNotifications, setRecentNotifications] = useState<RecentNotification[]>(
    () => (typeof window === "undefined" ? [] : toRecentNotifications(getHistory())),
  );

  useEffect(() => {
    function onAdded() {
      setRecentNotifications(toRecentNotifications(getHistory()));
    }
    window.addEventListener("notification-added", onAdded);
    return () => window.removeEventListener("notification-added", onAdded);
  }, []);

  function togglePref(key: string) {
    setAlertPrefs((prev) =>
      prev.map((p) => {
        if (p.key !== key) return p;
        const next = { ...p, enabled: !p.enabled };
        next.onToggle?.(next.enabled);
        return next;
      }),
    );
  }

  return { alertPrefs, togglePref, recentNotifications };
}
