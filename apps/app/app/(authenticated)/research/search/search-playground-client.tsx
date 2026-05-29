"use client";

import { Badge } from "@repo/design-system/components/ui/badge";
import { Button } from "@repo/design-system/components/ui/button";
import { Card, CardContent } from "@repo/design-system/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@repo/design-system/components/ui/empty";
import { Input } from "@repo/design-system/components/ui/input";
import { Label } from "@repo/design-system/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/design-system/components/ui/select";
import { Skeleton } from "@repo/design-system/components/ui/skeleton";
import { Switch } from "@repo/design-system/components/ui/switch";
import {
  AlertCircle,
  Calendar,
  ExternalLink,
  Percent,
  Search,
  User,
} from "lucide-react";
import { useState, useTransition } from "react";
import { searchPlaygroundAction } from "@/app/actions/research/search-playground";
import type {
  SearchPlaygroundResponse,
  SearchPlaygroundSource,
} from "@/lib/exa/search-playground";

export function SearchPlaygroundClient() {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState<string>("neural");
  const [numResults, setNumResults] = useState<string>("10");
  const [useAutoprompt, setUseAutoprompt] = useState(true);
  const [category, setCategory] = useState("");
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<SearchPlaygroundResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      return;
    }

    setError(null);
    setResult(null);
    startTransition(async () => {
      const response = await searchPlaygroundAction({
        query: query.trim(),
        type: searchType,
        numResults: Number.parseInt(numResults, 10) || 10,
        useAutoprompt,
        ...(category.trim() ? { category: category.trim() } : {}),
      });
      if ("error" in response) {
        setError(response.error);
      } else {
        setResult(response.data);
      }
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-wrap gap-4">
          <div className="min-w-0 flex-1 space-y-2">
            <Label htmlFor="query">Query</Label>
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                aria-label="Search query"
                className="h-12 pr-4 pl-10 text-base"
                disabled={isPending}
                id="query"
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter your search query..."
                value={query}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-end gap-4">
          <div className="space-y-2">
            <Label htmlFor="type">Search Type</Label>
            <Select
              disabled={isPending}
              onValueChange={setSearchType}
              value={searchType}
            >
              <SelectTrigger className="w-36" id="type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="neural">Neural</SelectItem>
                <SelectItem value="keyword">Keyword</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="numResults">Results</Label>
            <Select
              disabled={isPending}
              onValueChange={setNumResults}
              value={numResults}
            >
              <SelectTrigger className="w-24" id="numResults">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="30">30</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              className="w-40"
              disabled={isPending}
              id="category"
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. company, news"
              value={category}
            />
          </div>

          <div className="flex items-center gap-2 pb-1">
            <Switch
              checked={useAutoprompt}
              disabled={isPending}
              id="autoprompt"
              onCheckedChange={setUseAutoprompt}
            />
            <Label className="cursor-pointer" htmlFor="autoprompt">
              Autoprompt
            </Label>
          </div>

          <Button
            className="gap-1.5"
            disabled={!query.trim() || isPending}
            size="sm"
            type="submit"
          >
            {isPending ? (
              <>
                <span className="size-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Searching
              </>
            ) : (
              <>
                <Search className="size-3.5" />
                Search
              </>
            )}
          </Button>
        </div>
      </form>

      {isPending && (
        <div className="space-y-3">
          <Skeleton className="h-6 w-48 rounded-md" />
          <div className="grid gap-3 sm:grid-cols-2">
            <Skeleton className="h-36 w-full rounded-xl" />
            <Skeleton className="h-36 w-full rounded-xl" />
            <Skeleton className="h-36 w-full rounded-xl" />
            <Skeleton className="h-36 w-full rounded-xl" />
          </div>
        </div>
      )}

      {error && !isPending && (
        <Empty>
          <EmptyMedia variant="icon">
            <AlertCircle className="text-destructive" />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>Search Error</EmptyTitle>
            <EmptyDescription>{error}</EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}

      {result && !isPending && result.results.length === 0 && (
        <Empty>
          <EmptyMedia variant="icon">
            <Search />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>No results found</EmptyTitle>
            <EmptyDescription>
              No sources matched your query. Try different keywords or filters.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}

      {result && !isPending && result.results.length > 0 && (
        <>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Search className="size-3.5" />
            <span>
              Results for{" "}
              <span className="font-medium text-foreground">
                &ldquo;{result.query}&rdquo;
              </span>
              <span className="mx-1.5">&mdash;</span>
              {result.resultCount} result
              {result.resultCount !== 1 ? "s" : ""}
            </span>
            {result.autopromptString && (
              <Badge className="ml-auto text-xs" variant="secondary">
                Autoprompted
              </Badge>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {result.results.map((source) => (
              <SearchSourceCard key={source.id} source={source} />
            ))}
          </div>
        </>
      )}

      {!(result || isPending || error) && (
        <Empty>
          <EmptyMedia variant="icon">
            <Search />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>Search the web</EmptyTitle>
            <EmptyDescription>
              Use the form above to search with Exa's playground controls.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}
    </div>
  );
}

function SearchSourceCard({ source }: { source: SearchPlaygroundSource }) {
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
          <a
            className="ml-auto inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
            href={source.url}
            rel="noreferrer"
            target="_blank"
          >
            <ExternalLink className="size-3" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
