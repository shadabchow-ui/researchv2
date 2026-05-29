import type { Metadata } from "next";
import { Header } from "../../components/header";
import { HistoryClient } from "./history-client";

export const metadata: Metadata = {
  title: "Research History",
  description: "Past research sessions and saved results.",
};

const HistoryPage = () => (
  <>
    <Header page="History" pages={["Upcube", "Research"]} />
    <div className="flex flex-1 animate-fade-in flex-col gap-6 p-6 pt-0">
      <div className="space-y-1">
        <h1 className="font-semibold text-2xl tracking-tight">
          Research History
        </h1>
        <p className="text-muted-foreground text-sm">
          Past research sessions and saved results.
        </p>
      </div>
      <HistoryClient />
    </div>
  </>
);

export default HistoryPage;
