import { PackageIcon } from "lucide-react";
import type { Metadata } from "next";
import { ConsoleEmptyState } from "../components/empty-state";
import { Header } from "../components/header";

export const metadata: Metadata = {
  title: "Artifacts",
  description: "Files, assets, and build outputs.",
};

const ArtifactsPage = () => (
  <>
    <Header page="Artifacts" pages={["Upcube"]} />
    <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
      <div className="space-y-1">
        <h1 className="font-semibold text-2xl tracking-tight">Artifacts</h1>
        <p className="text-muted-foreground text-sm">
          Files, assets, and build outputs.
        </p>
      </div>
      <ConsoleEmptyState
        description="Build artifacts and outputs will appear here once you deploy."
        icon={PackageIcon}
        title="No artifacts yet"
      />
    </div>
  </>
);

export default ArtifactsPage;
