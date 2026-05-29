import type { Metadata } from "next";
import { Header } from "../../components/header";

export const metadata: Metadata = {
  title: "Monitors - Research",
  description: "Scheduled research monitoring and change detection.",
};

const MonitorsPage = () => (
  <>
    <Header page="Monitors" pages={["Upcube", "Research"]} />
    <div className="flex flex-1 animate-fade-in flex-col gap-6 p-6 pt-0">
      <div className="space-y-1">
        <h1 className="font-semibold text-2xl tracking-tight">Monitors</h1>
        <p className="text-muted-foreground text-sm">
          Scheduled research monitoring and change detection.
        </p>
      </div>
      <div className="rounded-xl border border-dashed bg-card p-8">
        <div className="mx-auto flex max-w-md flex-col items-center gap-4 text-center">
          <div className="rounded-full bg-muted p-3">
            <svg
              aria-label="Clock"
              className="size-6 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
          </div>
          <h2 className="font-semibold text-lg">
            Background monitoring not wired yet
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Monitors will run scheduled searches on your{" "}
            <a
              className="underline underline-offset-2 hover:text-foreground"
              href="/research/watchlists"
            >
              watchlists
            </a>{" "}
            and alert you to new or changed results. The cron/scheduler
            infrastructure for background execution is not provided in this
            release.
          </p>
          <div className="w-full space-y-2 text-left text-muted-foreground text-xs">
            <div className="flex items-center justify-between rounded-md border bg-muted/30 px-3 py-2">
              <span className="font-medium text-foreground/70">
                Scheduled execution
              </span>
              <span className="italic opacity-50">not configured</span>
            </div>
            <div className="flex items-center justify-between rounded-md border bg-muted/30 px-3 py-2">
              <span className="font-medium text-foreground/70">
                Change detection
              </span>
              <span className="italic opacity-50">not configured</span>
            </div>
            <div className="flex items-center justify-between rounded-md border bg-muted/30 px-3 py-2">
              <span className="font-medium text-foreground/70">
                Notification delivery
              </span>
              <span className="italic opacity-50">not configured</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default MonitorsPage;
