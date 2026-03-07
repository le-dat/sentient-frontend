import { LayoutGrid, Coins, TrendingUp, Bell } from "lucide-react";
import type { MetricCard } from "@/lib/types/dashboard";

const iconMap = {
  grid: <LayoutGrid className="h-4 w-4" />,
  coin: <Coins className="h-4 w-4" />,
  chart: <TrendingUp className="h-4 w-4" />,
  bell: <Bell className="h-4 w-4" />,
} satisfies Record<MetricCard["iconKey"], React.ReactNode>;

export function MetricCardItem({ metric }: { metric: MetricCard }) {
  return (
    <div className={`rounded-2xl border bg-linear-to-br ${metric.border} ${metric.gradient} p-4`}>
      <div className={`mb-2 ${metric.iconColor}`}>{iconMap[metric.iconKey]}</div>
      <p className="text-xs text-muted">{metric.label}</p>
      <p className="mt-0.5 text-2xl font-bold">{metric.value}</p>
      <p className={`mt-0.5 text-xs ${metric.subColor}`}>{metric.sub}</p>
    </div>
  );
}
