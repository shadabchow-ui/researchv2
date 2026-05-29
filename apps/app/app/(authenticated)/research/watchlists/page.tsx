import type { Metadata } from "next";
import { Header } from "../../components/header";
import { WatchlistsClient } from "./watchlists-client";

export const metadata: Metadata = {
  title: "Watchlists - Research",
  description: "Monitor topics and track changes over time.",
};

const WatchlistsPage = () => (
  <>
    <Header page="Watchlists" pages={["Upcube", "Research"]} />
    <div className="flex flex-1 animate-fade-in flex-col gap-6 p-6 pt-0">
      <div className="space-y-1">
        <h1 className="font-semibold text-2xl tracking-tight">Watchlists</h1>
        <p className="text-muted-foreground text-sm">
          Monitor topics and track changes over time.
        </p>
      </div>
      <WatchlistsClient />
    </div>
  </>
);

export default WatchlistsPage;
