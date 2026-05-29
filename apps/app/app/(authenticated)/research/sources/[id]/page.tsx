import { Badge } from "@repo/design-system/components/ui/badge";
import {
  ArrowLeft,
  Bookmark,
  Calendar,
  ExternalLink,
  Globe,
  Percent,
  User,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSavedSource } from "@/app/actions/research/sources";
import { Header } from "../../../components/header";
import { TrustBadge } from "../../components/trust-badge";

export const metadata: Metadata = {
  title: "Source Detail - Research",
  description: "View saved research source details.",
};

function confidenceLevel(score: number): "high" | "medium" | "low" {
  if (score >= 0.5) {
    return "high";
  }
  if (score >= 0.25) {
    return "medium";
  }
  return "low";
}

interface PageProps {
  params: Promise<{ id: string }>;
}

const SourceDetailPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const result = await getSavedSource(id);

  if ("error" in result) {
    if (
      result.error === "Source not found" ||
      result.error === "Not authorized"
    ) {
      notFound();
    }
    return (
      <>
        <Header page="Source" pages={["Upcube", "Research", "Sources"]} />
        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
          <Globe className="size-12 text-destructive" />
          <h2 className="font-semibold text-xl">Error loading source</h2>
          <p className="text-muted-foreground text-sm">{result.error}</p>
          <Link
            className="inline-flex items-center gap-1.5 text-muted-foreground text-sm hover:text-foreground"
            href="/research/sources"
          >
            <ArrowLeft className="size-4" />
            Back to Saved Sources
          </Link>
        </div>
      </>
    );
  }

  const source = result.data;

  return (
    <>
      <Header page="Source Detail" pages={["Upcube", "Research", "Sources"]} />
      <div className="flex flex-1 animate-fade-in flex-col gap-6 p-6 pt-0">
        <Link
          className="inline-flex items-center gap-1.5 text-muted-foreground text-sm hover:text-foreground"
          href="/research/sources"
        >
          <ArrowLeft className="size-4" />
          Back to Saved Sources
        </Link>

        <div className="space-y-1">
          <h1 className="font-semibold text-2xl tracking-tight">
            {source.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            <a
              className="inline-flex items-center gap-1 text-muted-foreground text-sm hover:underline"
              href={source.url}
              rel="noreferrer"
              target="_blank"
            >
              <Globe className="size-3.5" />
              {source.domain}
              <ExternalLink className="size-3" />
            </a>
            {source.score !== null && (
              <>
                <span className="text-muted-foreground">·</span>
                <TrustBadge confidence={confidenceLevel(source.score)} />
                <Badge className="text-xs" variant="outline">
                  <Percent className="mr-0.5 size-3" />
                  {Math.round(source.score * 100)}% relevance
                </Badge>
              </>
            )}
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <p className="text-foreground/85 text-sm leading-relaxed">
            {source.snippet}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {source.author && (
            <div className="space-y-1 rounded-lg border bg-card p-4">
              <p className="flex items-center gap-1.5 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                <User className="size-3.5" />
                Author
              </p>
              <p className="text-sm">{source.author}</p>
            </div>
          )}
          {source.publishedDate && (
            <div className="space-y-1 rounded-lg border bg-card p-4">
              <p className="flex items-center gap-1.5 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                <Calendar className="size-3.5" />
                Published
              </p>
              <p className="text-sm">
                {new Date(source.publishedDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          )}
          <div className="space-y-1 rounded-lg border bg-card p-4">
            <p className="flex items-center gap-1.5 font-medium text-muted-foreground text-xs uppercase tracking-wider">
              <Bookmark className="size-3.5" />
              Saved
            </p>
            <p className="text-sm">
              {new Date(source.savedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>
          </div>
          <div className="space-y-1 rounded-lg border bg-card p-4">
            <p className="flex items-center gap-1.5 font-medium text-muted-foreground text-xs uppercase tracking-wider">
              <Globe className="size-3.5" />
              Source URL
            </p>
            <a
              className="inline-flex items-center gap-1 text-foreground text-sm underline-offset-2 hover:underline"
              href={source.url}
              rel="noreferrer"
              target="_blank"
            >
              Open original
              <ExternalLink className="size-3.5" />
            </a>
          </div>
          {source.metadata != null && (
            <div className="space-y-1 rounded-lg border bg-card p-4 sm:col-span-2">
              <p className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
                Additional Metadata
              </p>
              <pre className="overflow-x-auto text-muted-foreground text-xs">
                {JSON.stringify(source.metadata, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SourceDetailPage;
