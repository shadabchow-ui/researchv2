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
import { Skeleton } from "@repo/design-system/components/ui/skeleton";
import { Textarea } from "@repo/design-system/components/ui/textarea";
import {
  AlertCircle,
  Calendar,
  ExternalLink,
  FileText,
  User,
} from "lucide-react";
import { useState, useTransition } from "react";
import { contentsAction } from "@/app/actions/research/contents";
import type { ContentsResult } from "@/lib/exa/contents";

export function ContentsClient() {
  const [urlsInput, setUrlsInput] = useState("");
  const [maxCharacters, setMaxCharacters] = useState("3000");
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<ContentsResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const urls = urlsInput
      .split("\n")
      .map((u) => u.trim())
      .filter(Boolean);

    if (urls.length === 0) {
      return;
    }

    setError(null);
    setResult(null);
    startTransition(async () => {
      const maxChars = Number.parseInt(maxCharacters, 10);
      const response = await contentsAction({
        urls,
        ...(maxChars > 0 ? { maxCharacters: maxChars } : {}),
      });
      if ("error" in response) {
        setError(response.error);
      } else {
        setResult(response.data.results);
      }
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="urls">URLs (one per line)</Label>
          <Textarea
            aria-label="URLs to fetch"
            className="min-h-[100px] font-mono text-sm"
            disabled={isPending}
            id="urls"
            onChange={(e) => setUrlsInput(e.target.value)}
            placeholder="https://example.com/article-1&#10;https://example.com/article-2"
            value={urlsInput}
          />
        </div>

        <div className="flex flex-wrap items-end gap-4">
          <div className="space-y-2">
            <Label htmlFor="maxCharacters">Max characters per result</Label>
            <Input
              className="w-36"
              disabled={isPending}
              id="maxCharacters"
              onChange={(e) => setMaxCharacters(e.target.value)}
              type="number"
              value={maxCharacters}
            />
          </div>

          <Button
            className="gap-1.5"
            disabled={!urlsInput.trim() || isPending}
            type="submit"
          >
            {isPending ? (
              <>
                <span className="size-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Fetching
              </>
            ) : (
              <>
                <FileText className="size-3.5" />
                Fetch Contents
              </>
            )}
          </Button>
        </div>
      </form>

      {isPending && (
        <div className="space-y-4">
          <Skeleton className="h-6 w-48 rounded-md" />
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
        </div>
      )}

      {error && !isPending && (
        <Empty>
          <EmptyMedia variant="icon">
            <AlertCircle className="text-destructive" />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>Contents Error</EmptyTitle>
            <EmptyDescription>{error}</EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}

      {result && !isPending && result.length === 0 && (
        <Empty>
          <EmptyMedia variant="icon">
            <FileText />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>No content retrieved</EmptyTitle>
            <EmptyDescription>
              The API returned no results for the provided URLs.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}

      {result && !isPending && result.length > 0 && (
        <div className="flex flex-col gap-4">
          <p className="text-muted-foreground text-sm">
            Retrieved content from {result.length} URL
            {result.length !== 1 ? "s" : ""}
          </p>
          {result.map((item) => (
            <ContentsCard item={item} key={item.id} />
          ))}
        </div>
      )}

      {!(result || isPending || error) && (
        <Empty>
          <EmptyMedia variant="icon">
            <FileText />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>Fetch page contents</EmptyTitle>
            <EmptyDescription>
              Enter one or more URLs to retrieve their full text content and
              metadata.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}
    </div>
  );
}

function ContentsCard({ item }: { item: ContentsResult }) {
  return (
    <Card className="gap-0 py-0">
      <CardContent className="flex flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1 space-y-0.5">
            <a
              className="font-medium text-muted-foreground text-xs transition-colors hover:text-foreground"
              href={item.url}
              rel="noreferrer"
              target="_blank"
            >
              {item.domain}
            </a>
            <h3 className="font-semibold text-sm leading-snug">
              <a
                className="hover:underline"
                href={item.url}
                rel="noreferrer"
                target="_blank"
              >
                {item.title}
              </a>
            </h3>
          </div>
          <a
            className="inline-flex shrink-0 items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
            href={item.url}
            rel="noreferrer"
            target="_blank"
          >
            <ExternalLink className="size-3.5" />
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-muted-foreground text-xs">
          {item.publishedDate && (
            <span className="flex items-center gap-1">
              <Calendar className="size-3" />
              {new Date(item.publishedDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          )}
          {item.author && (
            <span className="flex items-center gap-1">
              <User className="size-3" />
              {item.author}
            </span>
          )}
          <Badge className="text-xs" variant="outline">
            {item.text.length.toLocaleString()} chars
          </Badge>
        </div>

        <div className="max-h-96 overflow-y-auto whitespace-pre-wrap rounded-md border bg-muted/30 p-3 font-mono text-muted-foreground text-xs leading-relaxed">
          {item.text.slice(0, 10_000)}
          {item.text.length > 10_000 && (
            <span className="mt-1 block italic">
              ... truncated to 10,000 characters
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
