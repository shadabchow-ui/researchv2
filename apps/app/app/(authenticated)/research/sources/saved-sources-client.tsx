"use client";

import { Badge } from "@repo/design-system/components/ui/badge";
import { Button } from "@repo/design-system/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@repo/design-system/components/ui/empty";
import { Skeleton } from "@repo/design-system/components/ui/skeleton";
import {
  Bookmark,
  Calendar,
  ExternalLink,
  Globe,
  Percent,
  Trash2,
  User,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState, useTransition } from "react";
import {
  deleteSavedSource,
  listSavedSources,
} from "@/app/actions/research/sources";

interface SavedSource {
  author: string | null;
  domain: string;
  id: string;
  publishedDate: string | null;
  savedAt: Date;
  score: number | null;
  snippet: string;
  title: string;
  url: string;
}

export function SavedSourcesClient() {
  const [sources, setSources] = useState<SavedSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const fetchSources = useCallback(() => {
    startTransition(async () => {
      const result = await listSavedSources();
      if ("error" in result) {
        setError(result.error);
      } else {
        setSources(result.data);
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    fetchSources();
  }, [fetchSources]);

  const handleDelete = (id: string) => {
    startTransition(async () => {
      const result = await deleteSavedSource(id);
      if ("error" in result) {
        setError(result.error);
      } else {
        setSources((prev) => prev.filter((s) => s.id !== id));
      }
    });
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((n) => (
          <Skeleton className="h-24 w-full rounded-xl" key={`skel-${n}`} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Empty>
        <EmptyMedia variant="icon">
          <Globe className="text-destructive" />
        </EmptyMedia>
        <EmptyHeader>
          <EmptyTitle>Error loading sources</EmptyTitle>
          <EmptyDescription>{error}</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  if (sources.length === 0) {
    return (
      <Empty>
        <EmptyMedia variant="icon">
          <Bookmark />
        </EmptyMedia>
        <EmptyHeader>
          <EmptyTitle>No saved sources yet</EmptyTitle>
          <EmptyDescription>
            Sources you save from research results will appear here.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-muted-foreground text-sm">
        {sources.length} saved source{sources.length !== 1 ? "s" : ""}
      </p>
      <div className="divide-y divide-border overflow-hidden rounded-lg border bg-card">
        {sources.map((source) => (
          <div
            className="flex items-start gap-4 p-4 transition-colors hover:bg-muted/30"
            key={source.id}
          >
            <div className="min-w-0 flex-1 space-y-1.5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1 space-y-0.5">
                  <Link
                    className="font-medium text-foreground text-sm hover:underline"
                    href={`/research/sources/${source.id}`}
                  >
                    {source.title}
                  </Link>
                  <p className="text-muted-foreground text-xs">
                    {source.domain}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {source.score !== null && (
                    <Badge className="text-xs" variant="outline">
                      <Percent className="mr-0.5 size-3" />
                      {Math.round(source.score * 100)}%
                    </Badge>
                  )}
                  <Button
                    disabled={isPending}
                    onClick={() => handleDelete(source.id)}
                    size="icon-sm"
                    variant="ghost"
                  >
                    <Trash2 className="size-3.5 text-muted-foreground hover:text-destructive" />
                  </Button>
                </div>
              </div>
              <p className="line-clamp-2 text-muted-foreground text-xs">
                {source.snippet}
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-muted-foreground text-xs">
                {source.publishedDate && (
                  <span className="flex items-center gap-1">
                    <Calendar className="size-3" />
                    {new Date(source.publishedDate).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </span>
                )}
                {source.author && (
                  <span className="flex items-center gap-1">
                    <User className="size-3" />
                    {source.author}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Bookmark className="size-3" />
                  Saved{" "}
                  {new Date(source.savedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <a
                  className="ml-auto inline-flex items-center gap-1 font-medium text-foreground/60 transition-colors hover:text-foreground"
                  href={source.url}
                  rel="noreferrer"
                  target="_blank"
                >
                  <ExternalLink className="size-3" />
                  Open original
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
