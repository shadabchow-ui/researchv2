import type { Metadata } from "next";
import { Header } from "../../components/header";
import { SearchPlaygroundClient } from "./search-playground-client";

export const metadata: Metadata = {
  title: "Search - Research",
  description: "Search the web with Exa's playground controls.",
};

const SearchPlaygroundPage = () => (
  <>
    <Header page="Search" pages={["Upcube", "Research"]} />
    <div className="flex flex-1 animate-fade-in flex-col gap-6 p-6 pt-0">
      <div className="space-y-1">
        <h1 className="font-semibold text-2xl tracking-tight">
          Search Playground
        </h1>
        <p className="text-muted-foreground text-sm">
          Search the web with granular controls for type, count, and date
          filters.
        </p>
      </div>
      <SearchPlaygroundClient />
    </div>
  </>
);

export default SearchPlaygroundPage;
