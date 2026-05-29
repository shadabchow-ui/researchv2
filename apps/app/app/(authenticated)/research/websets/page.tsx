import type { Metadata } from "next";
import { Header } from "../../components/header";

export const metadata: Metadata = {
  title: "Websets - Research",
  description: "Curated collections of web entities and sources.",
};

const WebsetsPage = () => (
  <>
    <Header page="Websets" pages={["Upcube", "Research"]} />
    <div className="flex flex-1 animate-fade-in flex-col gap-6 p-6 pt-0">
      <div className="space-y-1">
        <h1 className="font-semibold text-2xl tracking-tight">Websets</h1>
        <p className="text-muted-foreground text-sm">
          Curated collections of web entities and sources.
        </p>
      </div>
      <div className="rounded-xl border border-dashed bg-card p-8">
        <div className="mx-auto flex max-w-md flex-col items-center gap-4 text-center">
          <div className="rounded-full bg-muted p-3">
            <svg
              aria-label="Globe"
              className="size-6 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>
          <h2 className="font-semibold text-lg">
            Webset management not wired yet
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Websets let you build and manage collections of web entities &mdash;
            companies, people, topics, and their related sources. The backend
            for entity collection and storage is not provided in this release.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <span className="rounded-md border bg-muted/30 px-2.5 py-1 font-mono text-muted-foreground text-xs">
              Company lists
            </span>
            <span className="rounded-md border bg-muted/30 px-2.5 py-1 font-mono text-muted-foreground text-xs">
              Topic clusters
            </span>
            <span className="rounded-md border bg-muted/30 px-2.5 py-1 font-mono text-muted-foreground text-xs">
              People collections
            </span>
            <span className="rounded-md border bg-muted/30 px-2.5 py-1 font-mono text-muted-foreground text-xs opacity-50">
              Export &middot; not wired
            </span>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default WebsetsPage;
