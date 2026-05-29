"use client";

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
import { AlertCircle, ExternalLink, MessageSquare } from "lucide-react";
import { useState, useTransition } from "react";
import { answerAction } from "@/app/actions/research/answer";
import type { AnswerCitation } from "@/lib/exa/answer";

const WWW_REGEX = /^www\./;

export function AnswerClient() {
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const [answer, setAnswer] = useState<string | null>(null);
  const [citations, setCitations] = useState<AnswerCitation[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      return;
    }

    setError(null);
    setAnswer(null);
    setCitations([]);
    startTransition(async () => {
      const response = await answerAction({ query: query.trim() });
      if ("error" in response) {
        setError(response.error);
      } else {
        setAnswer(response.data.answer);
        setCitations(response.data.citations);
      }
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="question">Question</Label>
          <div className="relative">
            <MessageSquare className="pointer-events-none absolute top-3 left-3.5 size-4 text-muted-foreground" />
            <Input
              aria-label="Question"
              className="h-12 pr-4 pl-10 text-base"
              disabled={isPending}
              id="question"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything... e.g. What is the latest research on AI safety?"
              value={query}
            />
          </div>
        </div>

        <Button
          className="gap-1.5"
          disabled={!query.trim() || isPending}
          type="submit"
        >
          {isPending ? (
            <>
              <span className="size-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Answering
            </>
          ) : (
            <>
              <MessageSquare className="size-3.5" />
              Ask
            </>
          )}
        </Button>
      </form>

      {isPending && (
        <div className="space-y-4">
          <Skeleton className="h-6 w-48 rounded-md" />
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
        </div>
      )}

      {error && !isPending && (
        <Empty>
          <EmptyMedia variant="icon">
            <AlertCircle className="text-destructive" />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>Answer Error</EmptyTitle>
            <EmptyDescription>{error}</EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}

      {answer && !isPending && (
        <div className="flex flex-col gap-6">
          <Card className="gap-0 py-0">
            <CardContent className="flex flex-col gap-4 p-4">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <MessageSquare className="size-4" />
                <span>
                  Answer for{" "}
                  <span className="font-medium text-foreground">
                    &ldquo;{query}&rdquo;
                  </span>
                </span>
              </div>
              <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap leading-relaxed">
                {answer}
              </div>
            </CardContent>
          </Card>

          {citations.length > 0 && (
            <div className="flex flex-col gap-3">
              <h2 className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
                Sources ({citations.length})
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {citations.map((citation) => (
                  <CitationCard citation={citation} key={citation.id} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {!(answer || isPending || error) && (
        <Empty>
          <EmptyMedia variant="icon">
            <MessageSquare />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>Ask a question</EmptyTitle>
            <EmptyDescription>
              Enter a question above to get an AI-generated answer with cited
              sources.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}
    </div>
  );
}

function CitationCard({ citation }: { citation: AnswerCitation }) {
  return (
    <Card className="group gap-0 py-0 transition-all duration-150 ease-out hover:shadow-sm">
      <CardContent className="flex flex-col gap-2 p-4">
        <div className="min-w-0 flex-1 space-y-0.5">
          <span className="font-medium text-muted-foreground text-xs">
            {new URL(citation.url).hostname.replace(WWW_REGEX, "")}
          </span>
          <h3 className="font-semibold text-sm leading-snug">
            <a
              className="hover:underline"
              href={citation.url}
              rel="noreferrer"
              target="_blank"
            >
              {citation.title}
            </a>
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {citation.publishedDate && (
            <span className="text-muted-foreground text-xs">
              {new Date(citation.publishedDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          )}
          <a
            className="ml-auto inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
            href={citation.url}
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
