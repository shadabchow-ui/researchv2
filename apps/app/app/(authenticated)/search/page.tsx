import { SearchIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { platformPages, upcubeProducts } from "@/lib/upcube/registry";
import { ConsoleEmptyState } from "../components/empty-state";
import { Header } from "../components/header";

interface SearchPageProperties {
  searchParams: Promise<{
    q: string;
  }>;
}

export const generateMetadata = async ({
  searchParams,
}: SearchPageProperties) => {
  const { q } = await searchParams;

  return {
    title: q ? `${q} - Search results` : "Search",
    description: "Cross-product global search.",
  };
};

const allEntries = [
  ...upcubeProducts.flatMap((p) => [
    { label: p.name, href: p.href, type: "Product" as const },
    ...p.modules.map((m) => ({
      label: m.label,
      href: m.href,
      type: "Module" as const,
    })),
  ]),
  ...platformPages.map((p) => ({
    label: p.label,
    href: p.href,
    type: "Platform" as const,
  })),
];

const SearchPage = async ({ searchParams }: SearchPageProperties) => {
  const { q } = await searchParams;

  if (!q) {
    redirect("/");
  }

  const query = q.toLowerCase();
  const results = allEntries.filter((entry) =>
    entry.label.toLowerCase().includes(query)
  );

  return (
    <>
      <Header page="Search" pages={["Upcube"]} />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-1.5 px-1">
          <p className="text-muted-foreground text-sm">
            {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;
            {q}&rdquo;
          </p>
        </div>
        {results.length > 0 ? (
          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
            {results.map((entry) => (
              <a
                className="group rounded-xl border bg-card p-4 transition-all duration-150 ease-out hover:bg-accent/50 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] active:bg-accent/70"
                href={entry.href}
                key={entry.href}
              >
                <div className="space-y-1">
                  <h3 className="font-medium leading-none">{entry.label}</h3>
                  <p className="text-muted-foreground text-xs">{entry.type}</p>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <ConsoleEmptyState
            description={`No results for "${q}". Try a different search term.`}
            icon={SearchIcon}
            title="No results found"
          />
        )}
      </div>
    </>
  );
};

export default SearchPage;
