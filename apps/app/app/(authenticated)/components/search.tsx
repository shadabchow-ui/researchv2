"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@repo/design-system/components/ui/command";
import { Kbd } from "@repo/design-system/components/ui/kbd";
import {
  AnchorIcon,
  ArchiveIcon,
  BotIcon,
  BriefcaseIcon,
  CloudIcon,
  DatabaseIcon,
  FolderKanbanIcon,
  GraduationCapIcon,
  LayoutDashboardIcon,
  LifeBuoyIcon,
  SearchIcon,
  SendIcon,
  SettingsIcon,
  ShoppingCartIcon,
  StoreIcon,
  UserCheckIcon,
  WorkflowIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { platformPages, upcubeProducts } from "@/lib/upcube/registry";

const EXISTING_ROUTES = new Set([
  "/",
  "/ai",
  "/cloud",
  "/identity",
  "/workflow",
  "/data",
  "/academy",
  "/commerce",
  "/marketplace",
  "/jobs",
  "/projects",
  "/artifacts",
  "/search",
  "/settings",
  "/webhooks",
]);

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Bot: BotIcon,
  Cloud: CloudIcon,
  UserCheck: UserCheckIcon,
  Workflow: WorkflowIcon,
  Database: DatabaseIcon,
  GraduationCap: GraduationCapIcon,
  ShoppingCart: ShoppingCartIcon,
  Store: StoreIcon,
  Briefcase: BriefcaseIcon,
  LayoutDashboard: LayoutDashboardIcon,
  FolderKanban: FolderKanbanIcon,
  Archive: ArchiveIcon,
  Search: SearchIcon,
  Settings: SettingsIcon,
};

export function Search() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const runCommand = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router]
  );

  return (
    <>
      <button
        aria-label="Open command palette"
        className="flex w-full items-center gap-2 rounded-md px-4 py-1.5 text-muted-foreground text-xs transition-all duration-100 ease-out hover:bg-accent/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:bg-accent/70"
        onClick={() => setOpen(true)}
        type="button"
      >
        <SearchIcon size={16} />
        <span className="flex-1 text-left">Search...</span>
        <Kbd>
          <span className="text-[10px]">&#8984;K</span>
        </Kbd>
      </button>
      <CommandDialog onOpenChange={setOpen} open={open}>
        <CommandInput placeholder="Search pages and commands..." />
        <CommandList>
          <CommandEmpty>
            <div className="flex flex-col items-center gap-1 py-8">
              <p className="font-medium text-sm">No results found</p>
              <p className="text-muted-foreground text-xs">
                Try a different search term or browse the sidebar
              </p>
            </div>
          </CommandEmpty>
          <CommandGroup heading="Overview">
            <CommandItem onSelect={() => runCommand("/")}>
              <LayoutDashboardIcon className="mr-2 size-4" />
              <span>Overview</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Products">
            {upcubeProducts.map((product) => {
              const Icon = iconMap[product.icon] || LayoutDashboardIcon;
              return (
                <CommandItem
                  key={product.id}
                  onSelect={() => runCommand(product.href)}
                >
                  <Icon className="mr-2 size-4" />
                  <span>{product.name}</span>
                  <CommandShortcut>{product.status}</CommandShortcut>
                </CommandItem>
              );
            })}
          </CommandGroup>
          <CommandGroup heading="Platform">
            {platformPages
              .filter((p) => EXISTING_ROUTES.has(p.href))
              .map((page) => {
                const Icon = iconMap[page.icon] || LayoutDashboardIcon;
                return (
                  <CommandItem
                    key={page.id}
                    onSelect={() => runCommand(page.href)}
                  >
                    <Icon className="mr-2 size-4" />
                    <span>{page.label}</span>
                  </CommandItem>
                );
              })}
            <CommandItem onSelect={() => runCommand("/webhooks")}>
              <AnchorIcon className="mr-2 size-4" />
              <span>Webhooks</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Other">
            <CommandItem disabled>
              <LifeBuoyIcon className="mr-2 size-4" />
              <span>Support</span>
              <CommandShortcut>Coming soon</CommandShortcut>
            </CommandItem>
            <CommandItem disabled>
              <SendIcon className="mr-2 size-4" />
              <span>Feedback</span>
              <CommandShortcut>Coming soon</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
