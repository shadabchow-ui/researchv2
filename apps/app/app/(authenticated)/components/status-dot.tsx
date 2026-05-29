import { cn } from "@repo/design-system/lib/utils";

const dotVariants: Record<string, string> = {
  ready: "bg-success",
  building: "bg-chart-3 animate-pulse",
  failed: "bg-destructive",
  canceled: "bg-muted-foreground/40",
  queued: "bg-muted-foreground/60",
};

interface StatusDotProps {
  className?: string;
  status: string;
}

export const StatusDot = ({ className, status }: StatusDotProps) => (
  <span
    className={cn(
      "inline-block size-1.5 shrink-0 rounded-full",
      dotVariants[status] ?? "bg-muted-foreground/40",
      className
    )}
  />
);
