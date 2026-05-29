import type { Metadata } from "next";
import { Header } from "../../components/header";

export const metadata: Metadata = {
  title: "Billing - Research",
  description: "Billing is not configured for this Research app.",
};

const BillingPage = () => (
  <>
    <Header page="Billing" pages={["Upcube", "Research"]} />
    <div className="flex flex-1 animate-fade-in flex-col gap-6 p-6 pt-0">
      <div className="space-y-1">
        <h1 className="font-semibold text-2xl tracking-tight">Billing</h1>
        <p className="text-muted-foreground text-sm">
          Billing is not configured for this Research app.
        </p>
      </div>
      <div className="rounded-xl border border-dashed bg-card p-8">
        <div className="mx-auto flex max-w-md flex-col items-center gap-4 text-center">
          <div className="rounded-full bg-muted p-3">
            <svg
              aria-label="Credit card"
              className="size-6 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <rect height="14" rx="2" width="20" x="2" y="5" />
              <path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              <path d="M2 19h20" />
            </svg>
          </div>
          <h2 className="font-semibold text-lg">
            Billing is not configured for this Research app
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Billing for research features is not configured separately in this
            release. Plan details, invoices, and payment methods are not
            available.
          </p>
        </div>
      </div>
    </div>
  </>
);

export default BillingPage;
