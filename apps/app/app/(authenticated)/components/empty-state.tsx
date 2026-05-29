import { Button } from "@repo/design-system/components/ui/button";
import { cn } from "@repo/design-system/lib/utils";
import { InboxIcon, type LucideIcon } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  actionHref?: string;
  actionLabel?: string;
  className?: string;
  description: string;
  icon?: LucideIcon;
  title: string;
}

export const ConsoleEmptyState = ({
  icon: Icon = InboxIcon,
  title,
  description,
  actionLabel,
  actionHref,
  className,
}: EmptyStateProps) => (
  <div
    className={cn(
      "flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed px-6 py-10 text-center transition-all duration-150 ease-out",
      className
    )}
  >
    <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
      <Icon className="size-5 text-muted-foreground" />
    </div>
    <div className="space-y-1">
      <p className="font-medium text-sm">{title}</p>
      <p className="max-w-sm text-muted-foreground text-xs">{description}</p>
    </div>
    {actionLabel && actionHref && (
      <Button
        asChild
        className="mt-1 h-7 gap-1.5 px-3 text-xs"
        size="sm"
        variant="outline"
      >
        <Link href={actionHref}>{actionLabel}</Link>
      </Button>
    )}
  </div>
);
