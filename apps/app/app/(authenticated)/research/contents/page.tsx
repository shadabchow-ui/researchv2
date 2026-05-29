import type { Metadata } from "next";
import { Header } from "../../components/header";
import { ContentsClient } from "./contents-client";

export const metadata: Metadata = {
  title: "Contents - Research",
  description: "Retrieve full content and metadata from URLs via Exa.",
};

const ContentsPage = () => (
  <>
    <Header page="Contents" pages={["Upcube", "Research"]} />
    <div className="flex flex-1 animate-fade-in flex-col gap-6 p-6 pt-0">
      <div className="space-y-1">
        <h1 className="font-semibold text-2xl tracking-tight">Contents</h1>
        <p className="text-muted-foreground text-sm">
          Retrieve full content and metadata from URLs.
        </p>
      </div>
      <ContentsClient />
    </div>
  </>
);

export default ContentsPage;
