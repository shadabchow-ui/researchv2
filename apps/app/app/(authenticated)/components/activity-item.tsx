import {
  CloudIcon,
  FolderKanbanIcon,
  GlobeIcon,
  type LucideIcon,
  SettingsIcon,
  UserPlusIcon,
} from "lucide-react";
import type { Activity } from "./sample-data";

const activityIcons: Record<string, LucideIcon> = {
  deployment: CloudIcon,
  project: FolderKanbanIcon,
  domain: GlobeIcon,
  member: UserPlusIcon,
  config: SettingsIcon,
};

interface ActivityItemProps {
  activity: Activity;
  isLast?: boolean;
}

export const ActivityItem = ({ activity, isLast }: ActivityItemProps) => {
  const Icon = activityIcons[activity.type] ?? SettingsIcon;

  return (
    <div className="relative flex items-start gap-3 px-4 py-2.5 transition-colors duration-100 hover:bg-accent/20">
      {!isLast && (
        <div className="absolute top-[36px] bottom-0 left-[23px] w-px bg-border" />
      )}
      <div className="flex size-7 shrink-0 items-center justify-center rounded-full border bg-muted/30">
        <Icon className="size-3 text-muted-foreground" />
      </div>
      <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
        <span className="truncate text-sm">{activity.message}</span>
        <span className="shrink-0 text-muted-foreground text-xs tabular-nums">
          {activity.timestamp}
        </span>
      </div>
    </div>
  );
};
