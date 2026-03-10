import { notificationAlertPrefs, notificationRecentItems } from "../fixtures";

export function useNotifications() {
  return {
    alertPrefs: notificationAlertPrefs,
    recentNotifications: notificationRecentItems,
  };
}
