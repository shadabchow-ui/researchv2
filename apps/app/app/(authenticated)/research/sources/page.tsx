import type { Metadata } from "next";
import { Header } from "../../components/header";
import { SavedSourcesClient } from "./saved-sources-client";

export const metadata: Metadata = {
  title: "Saved Sources - Research",
  description: "Your saved research sources and citations.",
};

const SavedSourcesPage = () => (
  <>
    <Header page="Sources" pages={["Upcube", "Research"]} />
    <div className="flex flex-1 animate-fade-in flex-col gap-6 p-6 pt-0">
      <div className="space-y-1">
        <h1 className="font-semibold text-2xl tracking-tight">Saved Sources</h1>
        <p className="text-muted-foreground text-sm">
          Sources you have saved from research sessions.
        </p>
      </div>
      <SavedSourcesClient />
    </div>
  </>
);

export default SavedSourcesPage;
