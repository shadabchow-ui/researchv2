import { Button } from "@repo/design-system/components/ui/button";
import { Card, CardContent } from "@repo/design-system/components/ui/card";
import { Bookmark, Calendar, ExternalLink, Percent, User } from "lucide-react";
import type { ResearchSource } from "@/lib/exa/types";
import { TrustBadge } from "./trust-badge";

interface SourceCardProps {
  isSaved?: boolean;
  onSave?: (source: ResearchSource) => void;
  source: ResearchSource;
}

function confidenceLevel(score: number): "high" | "medium" | "low" {
  if (score >= 0.5) {
    return "high";
  }
  if (score >= 0.25) {
    return "medium";
  }
  return "low";
}

export function SourceCard({ isSaved, onSave, source }: SourceCardProps) {
  return (
    <Card className="group gap-0 py-0 transition-all duration-150 ease-out hover:shadow-sm">
      <CardContent className="flex flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1 space-y-0.5">
            <a
              className="font-medium text-muted-foreground text-xs transition-colors hover:text-foreground"
              href={source.url}
              rel="noreferrer"
              target="_blank"
            >
              {source.domain}
            </a>
            <h3 className="font-semibold text-sm leading-snug">
              <a
                className="hover:underline"
                href={source.url}
                rel="noreferrer"
                target="_blank"
              >
                {source.title}
              </a>
            </h3>
          </div>
          <TrustBadge confidence={confidenceLevel(source.score)} />
        </div>

        <p className="line-clamp-3 text-muted-foreground text-sm leading-relaxed">
          {source.snippet}
        </p>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-muted-foreground text-xs">
          {source.publishedDate && (
            <span className="flex items-center gap-1">
              <Calendar className="size-3" />
              {new Date(source.publishedDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          )}
          {source.author && (
            <span className="flex items-center gap-1">
              <User className="size-3" />
              {source.author}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Percent className="size-3" />
            {Math.round(source.score * 100)}% relevance
          </span>
          <div className="ml-auto flex items-center gap-1">
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
              className="inline-flex items-center gap-1 font-medium text-foreground/60 transition-colors hover:text-foreground"
              href={source.url}
              rel="noreferrer"
              target="_blank"
            >
              <ExternalLink className="size-3" />
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
