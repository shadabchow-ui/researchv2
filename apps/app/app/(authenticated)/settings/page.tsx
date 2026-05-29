import type { Metadata } from "next";
import { Header } from "../components/header";

export const metadata: Metadata = {
  title: "Settings",
  description: "Account, workspace, and billing settings.",
};

const SettingsPage = () => (
  <>
    <Header page="Settings" pages={["Upcube"]} />
    <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="group rounded-xl border bg-card p-5 transition-all duration-150 ease-out hover:bg-accent/50 hover:shadow-sm active:scale-[0.98]">
          <h3 className="font-medium leading-none">General</h3>
          <p className="mt-1.5 text-muted-foreground text-sm leading-snug">
            Account name, email, and profile preferences.
          </p>
        </div>
        <div className="group rounded-xl border bg-card p-5 transition-all duration-150 ease-out hover:bg-accent/50 hover:shadow-sm active:scale-[0.98]">
          <h3 className="font-medium leading-none">Team</h3>
          <p className="mt-1.5 text-muted-foreground text-sm leading-snug">
            Workspace members, roles, and invitations.
          </p>
        </div>
        <div className="group rounded-xl border bg-card p-5 transition-all duration-150 ease-out hover:bg-accent/50 hover:shadow-sm active:scale-[0.98]">
          <h3 className="font-medium leading-none">Billing</h3>
          <p className="mt-1.5 text-muted-foreground text-sm leading-snug">
            Plan, invoices, and payment methods.
          </p>
        </div>
        <div className="group rounded-xl border bg-card p-5 transition-all duration-150 ease-out hover:bg-accent/50 hover:shadow-sm active:scale-[0.98]">
          <h3 className="font-medium leading-none">Limits</h3>
          <p className="mt-1.5 text-muted-foreground text-sm leading-snug">
            Usage quotas and rate limits.
          </p>
        </div>
        <div className="group rounded-xl border bg-card p-5 transition-all duration-150 ease-out hover:bg-accent/50 hover:shadow-sm active:scale-[0.98]">
          <h3 className="font-medium leading-none">API Keys</h3>
          <p className="mt-1.5 text-muted-foreground text-sm leading-snug">
            Manage personal access tokens.
          </p>
        </div>
        <div className="group rounded-xl border bg-card p-5 transition-all duration-150 ease-out hover:bg-accent/50 hover:shadow-sm active:scale-[0.98]">
          <h3 className="font-medium leading-none">Security</h3>
          <p className="mt-1.5 text-muted-foreground text-sm leading-snug">
            Sessions, devices, and audit log.
          </p>
        </div>
      </div>
    </div>
  </>
);

export default SettingsPage;
