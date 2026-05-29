import type { Metadata } from "next";
import { Header } from "../../components/header";

export const metadata: Metadata = {
  title: "Team - Research",
  description: "Research workspace team and collaboration settings.",
};

const TeamPage = () => (
  <>
    <Header page="Team" pages={["Upcube", "Research"]} />
    <div className="flex flex-1 animate-fade-in flex-col gap-6 p-6 pt-0">
      <div className="space-y-1">
        <h1 className="font-semibold text-2xl tracking-tight">Team</h1>
        <p className="text-muted-foreground text-sm">
          Research workspace team and collaboration settings.
        </p>
      </div>
      <div className="rounded-xl border border-dashed bg-card p-8">
        <div className="mx-auto flex max-w-md flex-col items-center gap-4 text-center">
          <div className="rounded-full bg-muted p-3">
            <svg
              aria-label="Users"
              className="size-6 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <h2 className="font-semibold text-lg">
            Research team management not configured
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Team settings for research collaboration are managed through
            workspace-level organization settings. Dedicated research team
            management is not provided in this release.
          </p>
          <p className="text-muted-foreground/60 text-xs">
            Workspace members, roles, and invitations can be managed from the
            general workspace settings.
          </p>
        </div>
      </div>
    </div>
  </>
);

export default TeamPage;
