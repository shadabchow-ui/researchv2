import type { Metadata } from "next";
import { Header } from "../../components/header";

export const metadata: Metadata = {
  title: "Research Agent",
  description: "AI-powered research agent with configurable effort and output.",
};

const AgentPage = () => (
  <>
    <Header page="Agent" pages={["Upcube", "Research"]} />
    <div className="flex flex-1 animate-fade-in flex-col gap-6 p-6 pt-0">
      <div className="space-y-1">
        <h1 className="font-semibold text-2xl tracking-tight">
          Research Agent
        </h1>
        <p className="text-muted-foreground text-sm">
          AI-powered research agent with configurable effort and output.
        </p>
      </div>
      <div className="rounded-xl border border-dashed bg-card p-8">
        <div className="mx-auto flex max-w-md flex-col items-center gap-4 text-center">
          <div className="rounded-full bg-muted p-3">
            <svg
              aria-label="Agent"
              className="size-6 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 8V4H8" />
              <rect height="8" rx="2" width="4" x="18" y="4" />
              <rect height="8" rx="2" width="16" x="4" y="12" />
              <path d="M8 16v2" />
              <path d="M12 16v4" />
              <path d="M16 16v2" />
            </svg>
          </div>
          <h2 className="font-semibold text-lg">Agent backend not wired yet</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            The Research Agent will let you run autonomous research tasks with
            configurable query, effort depth, and output format. The backend
            contract for agent execution is not provided in this release.
          </p>
          <div className="w-full space-y-3 rounded-lg border bg-muted/30 p-4 text-left text-muted-foreground text-xs">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border bg-background font-mono text-[10px]">
                1
              </span>
              <span>Enter a research question or topic</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border bg-background font-mono text-[10px]">
                2
              </span>
              <span>Select effort level &mdash; quick, balanced, or deep</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border bg-background font-mono text-[10px]">
                3
              </span>
              <span>
                Choose output format &mdash; brief, report, or structured data
              </span>
            </div>
            <div className="flex items-center gap-2 opacity-40">
              <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border bg-background font-mono text-[10px]">
                4
              </span>
              <span>
                Run agent &mdash; <span className="italic">not wired</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default AgentPage;
