import { Badge } from "@repo/design-system/components/ui/badge";
import { cn } from "@repo/design-system/lib/utils";

interface TrustBadgeProps {
  confidence: "high" | "medium" | "low";
}

const dotColors: Record<string, string> = {
  high: "bg-emerald-500",
  medium: "bg-amber-400",
  low: "bg-muted-foreground/50",
};

const labelColors: Record<string, string> = {
  high: "text-emerald-600 dark:text-emerald-400",
  medium: "text-amber-600 dark:text-amber-400",
  low: "text-muted-foreground",
};

export function TrustBadge({ confidence }: TrustBadgeProps) {
  return (
    <Badge
      className={cn(
        "gap-1.5 border-0 bg-muted font-normal",
        labelColors[confidence]
      )}
      variant="outline"
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", dotColors[confidence])} />
      {confidence}
    </Badge>
  );
}
