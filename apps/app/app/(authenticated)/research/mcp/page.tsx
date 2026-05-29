import type { Metadata } from "next";
import { Header } from "../../components/header";

export const metadata: Metadata = {
  title: "MCP - Research",
  description: "Model Context Protocol integration for research capabilities.",
};

const McpPage = () => (
  <>
    <Header page="MCP" pages={["Upcube", "Research"]} />
    <div className="flex flex-1 animate-fade-in flex-col gap-6 p-6 pt-0">
      <div className="space-y-1">
        <h1 className="font-semibold text-2xl tracking-tight">
          Model Context Protocol (MCP)
        </h1>
        <p className="text-muted-foreground text-sm">
          Connect AI assistants to your research data using MCP.
        </p>
      </div>
      <div className="rounded-xl border border-dashed bg-card p-8">
        <div className="mx-auto flex max-w-md flex-col items-center gap-4 text-center">
          <div className="rounded-full bg-muted p-3">
            <svg
              aria-label="Plug"
              className="size-6 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2" />
              <path d="M18 14h-8" />
              <path d="M15 18h-5" />
              <path d="M10 6h8v4h-8V6z" />
            </svg>
          </div>
          <h2 className="font-semibold text-lg">
            MCP integration not configured
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Model Context Protocol (MCP) enables AI assistants to access your
            research data, sources, and history through a standardized
            interface. MCP server configuration is not provided in this release
            &mdash; no tokens, endpoints, or URLs are available.
          </p>
          <div className="w-full space-y-2 text-left text-muted-foreground text-xs">
            <div className="flex items-center justify-between rounded-md border bg-muted/30 px-3 py-2">
              <span className="font-medium text-foreground/70">
                MCP server endpoint
              </span>
              <span className="italic opacity-50">not provided</span>
            </div>
            <div className="flex items-center justify-between rounded-md border bg-muted/30 px-3 py-2">
              <span className="font-medium text-foreground/70">
                Access token
              </span>
              <span className="italic opacity-50">not provided</span>
            </div>
            <div className="flex items-center justify-between rounded-md border bg-muted/30 px-3 py-2">
              <span className="font-medium text-foreground/70">
                Available tools
              </span>
              <span className="italic opacity-50">not configured</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default McpPage;
