"use client";

import { Button } from "@repo/design-system/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@repo/design-system/components/ui/empty";
import { Skeleton } from "@repo/design-system/components/ui/skeleton";
import { AlertCircle, FileSearch, Save, Search } from "lucide-react";
import { useState, useTransition } from "react";
import { saveResearchSession } from "@/app/actions/research/history";
import { researchSearch } from "@/app/actions/research/search";
import { saveSource } from "@/app/actions/research/sources";
import type {
  ResearchMode,
  ResearchResponse,
  ResearchSource,
} from "@/lib/exa/types";
import { ResearchBrief } from "./components/research-brief";
import { ResearchForm } from "./components/research-form";
import { ResearchResults } from "./components/research-results";
import { SourceTable } from "./components/source-table";

export function ResearchClient() {
  const [result, setResult] = useState<ResearchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [sessionSaved, setSessionSaved] = useState(false);
  const [savingSession, setSavingSession] = useState(false);
  const [savedUrls, setSavedUrls] = useState<Set<string>>(new Set());

  const handleSubmit = (q: string, m: ResearchMode) => {
    setError(null);
    setResult(null);
    setSessionSaved(false);
    setSavedUrls(new Set());
    startTransition(async () => {
      const response = await researchSearch({ query: q, mode: m });
      if ("error" in response) {
        setError(response.error);
      } else {
        setResult(response.data);
      }
    });
  };

  const handleSaveSession = () => {
    if (!result) {
      return;
    }
    setSavingSession(true);
    startTransition(async () => {
      const response = await saveResearchSession({
        query: result.query,
        mode: result.mode,
        resultCount: result.metadata.resultCount,
        sources: result.sources.map((s) => ({
          title: s.title,
          url: s.url,
          domain: s.domain,
          snippet: s.snippet,
          author: s.author,
          publishedDate: s.publishedDate,
          score: s.score,
        })),
      });
      if ("data" in response) {
        setSessionSaved(true);
      }
      setSavingSession(false);
    });
  };

  const handleSaveSource = async (source: ResearchSource) => {
    if (savedUrls.has(source.url)) {
      return;
    }
    const response = await saveSource({
      title: source.title,
      url: source.url,
      domain: source.domain,
      snippet: source.snippet,
      author: source.author,
      publishedDate: source.publishedDate,
      score: source.score,
    });
    if ("data" in response) {
      setSavedUrls((prev) => new Set(prev).add(source.url));
    }
  };

  const saveButtonLabel = (() => {
    if (sessionSaved) {
      return "Saved";
    }
    if (savingSession) {
      return "Saving...";
    }
    return "Save Research";
  })();

  return (
    <div className="flex flex-col gap-6">
      <ResearchForm isSearching={isPending} onSubmit={handleSubmit} />

      {isPending && (
        <div className="space-y-4">
          <Skeleton className="h-24 w-full rounded-xl" />
          <div className="grid gap-3 sm:grid-cols-2">
            <Skeleton className="h-40 w-full rounded-xl" />
            <Skeleton className="h-40 w-full rounded-xl" />
            <Skeleton className="h-40 w-full rounded-xl" />
            <Skeleton className="h-40 w-full rounded-xl" />
          </div>
        </div>
      )}

      {error && !isPending && (
        <Empty>
          <EmptyMedia variant="icon">
            <AlertCircle className="text-destructive" />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>Research Error</EmptyTitle>
            <EmptyDescription>{error}</EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}

      {result && !isPending && result.sources.length === 0 && (
        <Empty>
          <EmptyMedia variant="icon">
            <FileSearch />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>No results found</EmptyTitle>
            <EmptyDescription>
              No sources matched your query. Try a different search term or
              mode.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}

      {result && !isPending && result.sources.length > 0 && (
        <>
          <div className="flex items-center justify-between gap-2 text-muted-foreground text-sm">
            <div className="flex items-center gap-2">
              <Search className="size-3.5" />
              <span>
                Results for{" "}
                <span className="font-medium text-foreground">
                  &ldquo;{result.query}&rdquo;
                </span>
                <span className="mx-1.5">&mdash;</span>
                {result.metadata.resultCount} source
                {result.metadata.resultCount !== 1 ? "s" : ""}
                <span className="mx-1.5">&middot;</span>
                {modeLabel(result.metadata.mode)} mode
              </span>
            </div>
            <Button
              disabled={sessionSaved || savingSession}
              onClick={handleSaveSession}
              size="sm"
              variant={sessionSaved ? "secondary" : "outline"}
            >
              <Save className="mr-1 size-3.5" />
              {saveButtonLabel}
            </Button>
          </div>

          <ResearchBrief
            metadata={result.metadata}
            query={result.query}
            sources={result.sources}
          />

          <ResearchResults
            onSave={handleSaveSource}
            savedUrls={savedUrls}
            sources={result.sources}
          />

          <div className="flex flex-col gap-3">
            <h2 className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
              All Sources
            </h2>
            <div className="overflow-hidden rounded-lg border bg-card">
              <SourceTable
                onSave={handleSaveSource}
                savedUrls={savedUrls}
                sources={result.sources}
              />
            </div>
          </div>
        </>
      )}

      {!(result || isPending || error) && (
        <Empty>
          <EmptyMedia variant="icon">
            <Search />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>Enter a query to start researching</EmptyTitle>
            <EmptyDescription>
              Choose a research mode and describe what you want to find.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}
    </div>
  );
}

function modeLabel(mode: ResearchMode): string {
  const labels: Record<ResearchMode, string> = {
    fast: "Fast Search",
    deep: "Deep Research",
    company: "Company Research",
    market: "Market Research",
  };
  return labels[mode];
}
