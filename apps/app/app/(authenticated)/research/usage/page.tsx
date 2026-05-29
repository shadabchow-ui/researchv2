import type { Metadata } from "next";
import { Header } from "../../components/header";

export const metadata: Metadata = {
  title: "Usage - Research",
  description: "Usage tracking is not connected yet.",
};

const UsagePage = () => (
  <>
    <Header page="Usage" pages={["Upcube", "Research"]} />
    <div className="flex flex-1 animate-fade-in flex-col gap-6 p-6 pt-0">
      <div className="space-y-1">
        <h1 className="font-semibold text-2xl tracking-tight">Usage</h1>
        <p className="text-muted-foreground text-sm">
          Usage tracking is not connected yet.
        </p>
      </div>
      <div className="rounded-xl border border-dashed bg-card p-8">
        <div className="mx-auto flex max-w-md flex-col items-center gap-4 text-center">
          <div className="rounded-full bg-muted p-3">
            <svg
              aria-label="Bar chart"
              className="size-6 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M3 3v18h18" />
              <path d="M7 16l4-8 4 4 4-6" />
            </svg>
          </div>
          <h2 className="font-semibold text-lg">
            Usage tracking not connected yet
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Usage metrics will show your research activity volume. The usage
            tracking backend is not provided in this release.
          </p>
        </div>
      </div>
    </div>
  </>
);

export default UsagePage;
