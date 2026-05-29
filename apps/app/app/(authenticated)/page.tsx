import { keys as aiKeys } from "@repo/ai/keys";
import type { LucideIcon } from "lucide-react";
import {
  Bookmark,
  BookOpen,
  FileText,
  History,
  Layout,
  MessageSquare,
  Radar,
  Search,
  Sparkles,
  Zap,
} from "lucide-react";
import type { Metadata } from "next";
import { env } from "@/env";
import { Header } from "./components/header";

export const metadata: Metadata = {
  title: "Upcube Research",
  description:
    "Search, analyze, save, and monitor web intelligence with Upcube Research.",
};

const exaConfigured = Boolean(env.EXA_API_KEY);
const synthesisConfigured = Boolean(aiKeys().OPENAI_API_KEY);

interface QuickAction {
  color: string;
  description: string;
  href: string;
  icon: LucideIcon;
  label: string;
}

const quickActions: QuickAction[] = [
  {
    href: "/research",
    icon: Radar,
    label: "Research Home",
    description: "Search the web with AI-powered depth and context.",
    color: "text-indigo-500",
  },
  {
    href: "/research/search",
    icon: Search,
    label: "Search Playground",
    description: "Granular controls for type, count, and filters.",
    color: "text-sky-500",
  },
  {
    href: "/research/contents",
    icon: FileText,
    label: "Contents",
    description: "Retrieve full content and metadata from URLs.",
    color: "text-emerald-500",
  },
  {
    href: "/research/answer",
    icon: MessageSquare,
    label: "Answer",
    description: "Ask questions and get answers with cited sources.",
    color: "text-violet-500",
  },
  {
    href: "/research/sources",
    icon: Bookmark,
    label: "Saved Sources",
    description: "Your bookmarked sources from research sessions.",
    color: "text-amber-500",
  },
  {
    href: "/research/watchlists",
    icon: Zap,
    label: "Watchlists",
    description: "Monitor topics and track changes over time.",
    color: "text-rose-500",
  },
  {
    href: "/research/history",
    icon: History,
    label: "History",
    description: "Past research sessions and saved results.",
    color: "text-blue-500",
  },
  {
    href: "/research/templates",
    icon: Layout,
    label: "Templates",
    description: "Pre-built research templates for common use cases.",
    color: "text-teal-500",
  },
];

interface StatusItem {
  icon: LucideIcon;
  label: string;
  ok: boolean;
  status: string;
}

const statusItems: StatusItem[] = [
  {
    icon: Zap,
    label: "Exa Search API",
    status: exaConfigured ? "Configured" : "Not configured",
    ok: exaConfigured,
  },
  {
    icon: Sparkles,
    label: "AI Synthesis",
    status: synthesisConfigured ? "Available" : "Fallback mode",
    ok: synthesisConfigured,
  },
  {
    icon: BookOpen,
    label: "Saved Sources",
    status: "Manage in Sources",
    ok: true,
  },
  {
    icon: History,
    label: "Research History",
    status: "View history",
    ok: true,
  },
];

const ResearchHomePage = () => (
  <>
    <Header page="Upcube Research" pages={[]} />
    <div className="flex flex-1 animate-fade-in flex-col gap-8 p-6 pt-0">
      <div className="flex flex-col gap-1.5">
        <h1 className="font-semibold text-2xl tracking-tight">
          Upcube Research
        </h1>
        <p className="text-muted-foreground text-sm">
          Search, analyze, save, and monitor web intelligence.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
          Quick Actions
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <a
                className="group rounded-xl border bg-card p-5 transition-all duration-150 ease-out hover:bg-accent/50 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]"
                href={action.href}
                key={action.href}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted ${action.color} transition-colors group-hover:bg-accent`}
                  >
                    <Icon className="size-5" />
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <h3 className="font-medium text-sm leading-none">
                      {action.label}
                    </h3>
                    <p className="text-muted-foreground text-xs leading-snug">
                      {action.description}
                    </p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
          System Status
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statusItems.map((item) => {
            const Icon = item.icon;
            return (
              <div className="rounded-xl border bg-card p-5" key={item.label}>
                <div className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Icon className="size-5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <h3 className="font-medium text-sm leading-none">
                      {item.label}
                    </h3>
                    <p
                      className={
                        item.ok
                          ? "text-muted-foreground text-xs leading-snug"
                          : "text-muted-foreground text-xs italic leading-snug"
                      }
                    >
                      {item.status}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </>
);

export default ResearchHomePage;
