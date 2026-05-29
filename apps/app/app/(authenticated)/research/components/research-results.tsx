import type { ResearchSource } from "@/lib/exa/types";
import { SourceCard } from "./source-card";

interface ResearchResultsProps {
  onSave?: (source: ResearchSource) => void;
  savedUrls?: Set<string>;
  sources: ResearchSource[];
}

export function ResearchResults({
  onSave,
  savedUrls,
  sources,
}: ResearchResultsProps) {
  if (sources.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h2 className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
        Top Sources
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {sources.slice(0, 6).map((source) => (
          <SourceCard
            isSaved={savedUrls?.has(source.url)}
            key={source.url}
            onSave={onSave}
            source={source}
          />
        ))}
      </div>
    </div>
  );
}
