import { cn } from "@repo/design-system/lib/utils";
import type { StatItem } from "./sample-data";

interface StatCardProps {
  item: StatItem;
}

const trendIcons: Record<string, string> = {
  up: "↑",
  down: "↓",
  neutral: "→",
};

const trendColors: Record<string, string> = {
  up: "text-success",
  down: "text-destructive",
  neutral: "text-muted-foreground",
};

export const StatCard = ({ item }: StatCardProps) => (
  <div className="flex flex-col gap-1 rounded-lg border bg-card p-4 transition-all duration-150 ease-out hover:bg-accent/30">
    <span className="font-medium text-muted-foreground text-xs">
      {item.label}
    </span>
    <div className="flex items-baseline gap-2">
      <span className="font-semibold text-2xl tracking-tight">
        {item.value}
      </span>
      {item.trend && (
        <span className={cn("font-medium text-xs", trendColors[item.trend])}>
          {trendIcons[item.trend]}
        </span>
      )}
    </div>
    {item.trendLabel && (
      <span className="text-muted-foreground text-xs">{item.trendLabel}</span>
    )}
  </div>
);
