import { Badge } from "@repo/design-system/components/ui/badge";
import { Button } from "@repo/design-system/components/ui/button";
import { Bookmark, ExternalLink } from "lucide-react";
import type { ResearchSource } from "@/lib/exa/types";

interface SourceTableProps {
  onSave?: (source: ResearchSource) => void;
  savedUrls?: Set<string>;
  sources: ResearchSource[];
}

export function SourceTable({ onSave, savedUrls, sources }: SourceTableProps) {
  if (sources.length === 0) {
    return (
      <p className="p-6 text-center text-muted-foreground text-sm">
        No sources available.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-border border-b text-muted-foreground text-xs uppercase tracking-wider">
            <th className="pr-3 pb-2 pl-4 font-medium">Title</th>
            <th className="pr-3 pb-2 font-medium">Domain</th>
            <th className="pr-3 pb-2 font-medium">Date</th>
            <th className="pr-3 pb-2 font-medium">Score</th>
            <th className="pr-4 pb-2 font-medium" />
          </tr>
        </thead>
        <tbody>
          {sources.map((source) => {
            const isSaved = savedUrls?.has(source.url);
            return (
              <tr
                className="border-border/50 border-b transition-colors last:border-0 hover:bg-muted/30"
                key={source.url}
              >
                <td className="py-2.5 pr-3 pl-4">
                  <a
                    className="font-medium text-foreground hover:underline"
                    href={source.url}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {source.title}
                  </a>
                </td>
                <td className="py-2.5 pr-3 text-muted-foreground">
                  {source.domain}
                </td>
                <td className="py-2.5 pr-3 text-muted-foreground">
                  {source.publishedDate
                    ? new Date(source.publishedDate).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )
                    : "-"}
                </td>
                <td className="py-2.5 pr-3">
                  <Badge className="text-xs" variant="outline">
                    {Math.round(source.score * 100)}%
                  </Badge>
                </td>
                <td className="py-2.5 pr-4">
                  <div className="flex items-center gap-1">
                    {onSave && (
                      <Button
                        disabled={isSaved}
                        onClick={() => onSave(source)}
                        size="icon-sm"
                        variant="ghost"
                      >
                        <Bookmark
                          className={`size-3.5 ${isSaved ? "fill-current text-foreground" : "text-muted-foreground"}`}
                        />
                      </Button>
                    )}
                    <a
                      className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
                      href={source.url}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <ExternalLink className="size-3" />
                    </a>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
