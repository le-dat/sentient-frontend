export type AlertPreference = {
  key: string;
  label: string;
  desc: string;
  enabled: boolean;
  dot: string;
  onToggle?: (enabled: boolean) => void;
};

export type RecentNotification = {
  type: string;
  vault: string;
  chain: string;
  time: string;
  dot: string;
  textColor: string;
};
