import type { Metadata } from "next";
import { Header } from "../components/header";
import { ResearchClient } from "./client-page";

export const metadata: Metadata = {
  title: "Research",
  description: "Search the web with AI-powered depth and context.",
};

const ResearchPage = () => (
  <>
    <Header page="Research" pages={["Upcube"]} />
    <div className="flex flex-1 animate-fade-in flex-col gap-6 p-6 pt-0">
      <div className="space-y-1">
        <h1 className="font-semibold text-2xl tracking-tight">Research</h1>
        <p className="text-muted-foreground text-sm">
          Search the web with AI-powered depth and context.
        </p>
      </div>
      <ResearchClient />
    </div>
  </>
);

export default ResearchPage;
