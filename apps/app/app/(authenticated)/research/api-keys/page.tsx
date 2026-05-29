import type { Metadata } from "next";
import { Header } from "../../components/header";

export const metadata: Metadata = {
  title: "API Keys - Research",
  description:
    "Upcube Research does not provide user-facing API key management.",
};

const ApiKeysPage = () => (
  <>
    <Header page="API Keys" pages={["Upcube", "Research"]} />
    <div className="flex flex-1 animate-fade-in flex-col gap-6 p-6 pt-0">
      <div className="space-y-1">
        <h1 className="font-semibold text-2xl tracking-tight">API Keys</h1>
        <p className="text-muted-foreground text-sm">
          Upcube Research does not provide user-facing API key management.
        </p>
      </div>
      <div className="rounded-xl border border-dashed bg-card p-8">
        <div className="mx-auto flex max-w-md flex-col items-center gap-4 text-center">
          <div className="rounded-full bg-muted p-3">
            <svg
              aria-label="Key"
              className="size-6 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
            </svg>
          </div>
          <h2 className="font-semibold text-lg">
            API key management is not available
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Upcube Research does not currently provide user-facing API key
            management. This app is a research product, not an API platform.
            Provider secrets remain server-only and are not exposed.
          </p>
        </div>
      </div>
    </div>
  </>
);

export default ApiKeysPage;
