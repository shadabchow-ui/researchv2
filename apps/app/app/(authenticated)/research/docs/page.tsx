import type { Metadata } from "next";
import { Header } from "../../components/header";

export const metadata: Metadata = {
  title: "Research Docs",
  description: "Learn how to use the Research platform effectively.",
};

const sections = [
  {
    title: "Getting Started",
    items: [
      {
        label: "What is Research?",
        description:
          "Research is an AI-powered search platform that lets you search the web with configurable depth, save sources, and monitor topics over time.",
      },
      {
        label: "Quick Start Guide",
        description:
          "Enter a query on the Research home page, select a mode (Fast, Deep, Company, or Market), and review your results. Save interesting sources and sessions for later.",
      },
      {
        label: "Research Modes",
        description:
          "Fast mode returns quick keyword-based results. Deep mode uses neural search for comprehensive analysis. Company and Market modes focus on specific categories.",
      },
    ],
  },
  {
    title: "Features",
    items: [
      {
        label: "Saved Sources",
        description:
          "Bookmark individual sources from any research session to build a personal library. Sources are deduplicated by URL.",
      },
      {
        label: "Research History",
        description:
          "Every research session is saved automatically. Browse past queries, revisit results, and export sessions as Markdown or JSON.",
      },
      {
        label: "Watchlists",
        description:
          "Create watchlists to monitor topics over time. Each watchlist stores a query and mode for quick re-runs. Scheduled monitoring is not yet available.",
      },
      {
        label: "Research Agent",
        description:
          "Run autonomous research tasks with configurable effort and output. Agent infrastructure is not yet wired.",
      },
      {
        label: "Websets",
        description:
          "Build curated collections of entities and sources. Entity collection management is not yet wired.",
      },
      {
        label: "Monitors",
        description:
          "Schedule recurring research checks and detect changes. Background scheduling is not yet configured.",
      },
    ],
  },
  {
    title: "Integration",
    items: [
      {
        label: "Export Formats",
        description:
          "Research sessions can be exported as Markdown (for documentation) or JSON (for programmatic use). Each export includes all sources and metadata.",
      },
      {
        label: "API Access",
        description:
          "Upcube Research is a research product, not an API platform. User-facing API access and key management are not available.",
      },
    ],
  },
];

const DocsPage = () => (
  <>
    <Header page="Docs" pages={["Upcube", "Research"]} />
    <div className="flex flex-1 animate-fade-in flex-col gap-8 p-6 pt-0">
      <div className="space-y-1">
        <h1 className="font-semibold text-2xl tracking-tight">Research Docs</h1>
        <p className="text-muted-foreground text-sm">
          Learn how to use the Research platform effectively.
        </p>
      </div>
      {sections.map((section) => (
        <div className="space-y-3" key={section.title}>
          <h2 className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
            {section.title}
          </h2>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {section.items.map((item) => (
              <div className="rounded-lg border bg-card p-4" key={item.label}>
                <h3 className="font-medium text-sm">{item.label}</h3>
                <p className="mt-1 text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </>
);

export default DocsPage;
