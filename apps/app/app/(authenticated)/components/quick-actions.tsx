import { Badge } from "@repo/design-system/components/ui/badge";
import { Button } from "@repo/design-system/components/ui/button";
import { cn } from "@repo/design-system/lib/utils";
import { ExternalLinkIcon, PlayIcon, PlusIcon, SearchIcon } from "lucide-react";
import Link from "next/link";

interface QuickAction {
  badge?: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

const actions: QuickAction[] = [
  {
    label: "New Project",
    href: "/projects",
    icon: PlusIcon,
    description: "Create a new project",
  },
  {
    label: "Deploy",
    href: "/cloud/deployments",
    icon: PlayIcon,
    description: "Trigger a new deployment",
    badge: "2",
  },
  {
    label: "Quick Search",
    href: "/search",
    icon: SearchIcon,
    description: "Search across all resources",
  },
  {
    label: "Documentation",
    href: "#",
    icon: ExternalLinkIcon,
    description: "Platform docs and guides",
  },
];

export const QuickActions = ({ className }: { className?: string }) => (
  <div className={cn("flex flex-wrap items-center gap-2", className)}>
    {actions.map((action) => {
      const Icon = action.icon;
      return (
        <Button
          asChild
          className="h-8 gap-1.5 px-3 font-normal text-xs transition-all duration-100 active:scale-95"
          key={action.label}
          size="sm"
          variant="outline"
        >
          <Link href={action.href}>
            <Icon className="size-3.5 shrink-0 text-muted-foreground" />
            <span>{action.label}</span>
            {action.badge && (
              <Badge
                className="ml-0.5 px-1 py-0 font-normal text-[10px] leading-none"
                variant="secondary"
              >
                {action.badge}
              </Badge>
            )}
          </Link>
        </Button>
      );
    })}
  </div>
);
