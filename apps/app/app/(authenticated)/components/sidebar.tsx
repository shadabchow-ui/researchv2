"use client";

import { OrganizationSwitcher, UserButton } from "@repo/auth/client";
import { ModeToggle } from "@repo/design-system/components/mode-toggle";
import { Button } from "@repo/design-system/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@repo/design-system/components/ui/sidebar";
import { NotificationsTrigger } from "@repo/notifications/components/trigger";
import {
  BellIcon,
  BookOpenIcon,
  BookTextIcon,
  FileTextIcon,
  HistoryIcon,
  LayoutIcon,
  MessageSquareIcon,
  RadarIcon,
  SearchIcon,
  SettingsIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { researchNavGroups } from "@/lib/upcube/research-navigation";

interface GlobalSidebarProperties {
  readonly children: ReactNode;
}

const navIconMap: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  Bell: BellIcon,
  BookOpen: BookOpenIcon,
  BookText: BookTextIcon,
  FileText: FileTextIcon,
  History: HistoryIcon,
  Layout: LayoutIcon,
  MessageSquare: MessageSquareIcon,
  Radar: RadarIcon,
  Search: SearchIcon,
  Settings: SettingsIcon,
};

export const GlobalSidebar = ({ children }: GlobalSidebarProperties) => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <Sidebar collapsible="icon" variant="inset">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="flex items-center px-2 py-1.5">
                <Image
                  alt="Upcube Research"
                  className="shrink-0 invert dark:invert-0"
                  height={28}
                  src="/logo.png"
                  width={28}
                />
              </div>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <div className="h-[36px] overflow-hidden transition-all [&>div]:w-full">
                <OrganizationSwitcher
                  afterSelectOrganizationUrl="/"
                  hidePersonal
                />
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          {researchNavGroups.map((group) => (
            <SidebarGroup key={group.label}>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              <SidebarMenu>
                {group.items.map((item) => {
                  const Icon = navIconMap[item.icon];
                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive(item.href)}
                        tooltip={item.label}
                      >
                        <Link href={item.href}>
                          {Icon && <Icon />}
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center gap-2">
              <UserButton
                appearance={{
                  elements: {
                    rootBox: "flex overflow-hidden w-full",
                    userButtonBox: "flex-row-reverse",
                    userButtonOuterIdentifier: "truncate pl-0",
                  },
                }}
                showName
              />
              <div className="flex shrink-0 items-center gap-px">
                <ModeToggle />
                <Button
                  asChild
                  className="shrink-0"
                  size="icon"
                  variant="ghost"
                >
                  <div>
                    <NotificationsTrigger />
                  </div>
                </Button>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </>
  );
};
