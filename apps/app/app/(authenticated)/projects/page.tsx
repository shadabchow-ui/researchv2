import { FolderKanbanIcon } from "lucide-react";
import type { Metadata } from "next";
import { ConsoleEmptyState } from "../components/empty-state";
import { Header } from "../components/header";

export const metadata: Metadata = {
  title: "Projects",
  description: "Workspace projects and collections.",
};

const ProjectsPage = () => (
  <>
    <Header page="Projects" pages={["Upcube"]} />
    <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
      <div className="space-y-1">
        <h1 className="font-semibold text-2xl tracking-tight">Projects</h1>
        <p className="text-muted-foreground text-sm">
          Workspace projects and collections.
        </p>
      </div>
      <ConsoleEmptyState
        actionHref="/projects/new"
        actionLabel="Create Project"
        description="Create your first project to get started with the platform."
        icon={FolderKanbanIcon}
        title="No projects yet"
      />
    </div>
  </>
);

export default ProjectsPage;
