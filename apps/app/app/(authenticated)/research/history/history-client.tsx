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
  Clock,
  FileCode2,
  FileText,
  Globe,
  History,
  Search,
  Sparkles,
} from "lucide-react";
import { useCallback, useEffect, useState, useTransition } from "react";
import {
  exportResearchSessionJson,
  exportResearchSessionMarkdown,
} from "@/app/actions/research/export";
import { listResearchSessions } from "@/app/actions/research/history";

interface Session {
  createdAt: Date;
  id: string;
  mode: string;
  query: string;
  resultCount: number;
}

function modeLabel(mode: string): string {
  const labels: Record<string, string> = {
    fast: "Fast Search",
    deep: "Deep Research",
    company: "Company Research",
    market: "Market Research",
  };
  return labels[mode] ?? mode;
}

function modeIcon(mode: string) {
  if (mode === "fast") {
    return <Search className="size-3" />;
  }
  if (mode === "company") {
    return <Globe className="size-3" />;
  }
  if (mode === "market") {
    return <Sparkles className="size-3" />;
  }
  return <Sparkles className="size-3" />;
}

function downloadContent(content: string, filename: string) {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function HistoryClient() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [exportingId, setExportingId] = useState<string | null>(null);
  const [_isPending, startTransition] = useTransition();

  const fetchSessions = useCallback(() => {
    startTransition(async () => {
      const result = await listResearchSessions();
      if ("error" in result) {
        setError(result.error);
      } else {
        setSessions(result.data);
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  const handleExportMarkdown = (sessionId: string) => {
    setExportingId(sessionId);
    startTransition(async () => {
      const result = await exportResearchSessionMarkdown(sessionId);
      if ("data" in result) {
        downloadContent(result.data.content, result.data.filename);
      }
      setExportingId(null);
    });
  };

  const handleExportJson = (sessionId: string) => {
    setExportingId(sessionId);
    startTransition(async () => {
      const result = await exportResearchSessionJson(sessionId);
      if ("data" in result) {
        downloadContent(result.data.content, result.data.filename);
      }
      setExportingId(null);
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
          <History className="text-destructive" />
        </EmptyMedia>
        <EmptyHeader>
          <EmptyTitle>Error loading history</EmptyTitle>
          <EmptyDescription>{error}</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  if (sessions.length === 0) {
    return (
      <Empty>
        <EmptyMedia variant="icon">
          <History />
        </EmptyMedia>
        <EmptyHeader>
          <EmptyTitle>No research history yet</EmptyTitle>
          <EmptyDescription>
            Saved research sessions will appear here. Run a search and save it
            to get started.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-muted-foreground text-sm">
        {sessions.length} saved session{sessions.length !== 1 ? "s" : ""}
      </p>
      <div className="divide-y divide-border overflow-hidden rounded-lg border bg-card">
        {sessions.map((session) => {
          const isExporting = exportingId === session.id;
          return (
            <div
              className="flex items-start gap-4 p-4 transition-colors hover:bg-muted/30"
              key={session.id}
            >
              <div className="min-w-0 flex-1 space-y-1.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <p className="font-medium text-foreground text-sm">
                      &ldquo;{session.query}&rdquo;
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {session.resultCount} source
                      {session.resultCount !== 1 ? "s" : ""} &middot;{" "}
                      {modeLabel(session.mode)}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5">
                    <Button
                      disabled={isExporting}
                      onClick={() => handleExportMarkdown(session.id)}
                      size="icon-sm"
                      title="Export as Markdown"
                      variant="ghost"
                    >
                      <FileText className="size-3.5 text-muted-foreground" />
                    </Button>
                    <Button
                      disabled={isExporting}
                      onClick={() => handleExportJson(session.id)}
                      size="icon-sm"
                      title="Export as JSON"
                      variant="ghost"
                    >
                      <FileCode2 className="size-3.5 text-muted-foreground" />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-muted-foreground text-xs">
                  <span className="flex items-center gap-1">
                    <Clock className="size-3" />
                    {new Date(session.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    {modeIcon(session.mode)}
                    {modeLabel(session.mode)}
                  </span>
                  <Badge className="text-xs" variant="outline">
                    {session.resultCount} source
                    {session.resultCount !== 1 ? "s" : ""}
                  </Badge>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
