import { notificationAlertPrefs, notificationRecentItems } from "@/lib/mockdata/notifications";

export function useNotificationsViewModel() {
  return {
    alertPrefs: notificationAlertPrefs,
    recentNotifications: notificationRecentItems,
  };
}
