import type { UpcubeModule, UpcubeStatus } from "@/lib/upcube/registry";
import { Header } from "./header";

interface ModulePageProps {
  description: string;
  modules: UpcubeModule[];
  status: UpcubeStatus;
  title: string;
}

const statusBadge = (status: UpcubeStatus) => {
  const styles: Record<UpcubeStatus, string> = {
    Foundation: "bg-muted text-muted-foreground border-border",
    Planned:
      "bg-muted/50 text-muted-foreground/60 border-dashed border-muted-foreground/30",
    Scaffold:
      "bg-muted/30 text-muted-foreground/50 border-dashed border-muted-foreground/20",
  };

  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 font-medium text-[11px] uppercase tracking-wide ${styles[status]}`}
    >
      {status}
    </span>
  );
};

export const ModulePage = ({
  title,
  description,
  status,
  modules,
}: ModulePageProps) => (
  <>
    <Header page={title} pages={["Upcube"]} />
    <div className="flex flex-1 animate-fade-in flex-col gap-6 p-6 pt-0">
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <h1 className="font-semibold text-2xl tracking-tight">{title}</h1>
          {statusBadge(status)}
        </div>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((mod) =>
          mod.status === "Planned" ? (
            <div
              className="cursor-default rounded-xl border border-dashed bg-card p-5 opacity-60"
              key={mod.id}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1.5">
                  <h3 className="font-medium leading-none">{mod.label}</h3>
                  <p className="text-muted-foreground text-sm leading-snug">
                    {mod.description}
                  </p>
                </div>
                {statusBadge(mod.status)}
              </div>
            </div>
          ) : (
            <a
              className="group rounded-xl border bg-card p-5 transition-all duration-150 ease-out hover:bg-accent/50 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] active:bg-accent/70"
              href={mod.href}
              key={mod.id}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1.5">
                  <h3 className="font-medium leading-none">{mod.label}</h3>
                  <p className="text-muted-foreground text-sm leading-snug">
                    {mod.description}
                  </p>
                </div>
                {statusBadge(mod.status)}
              </div>
            </a>
          )
        )}
      </div>
    </div>
  </>
);
