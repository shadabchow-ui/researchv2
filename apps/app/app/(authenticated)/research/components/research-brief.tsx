import { Badge } from "@repo/design-system/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/design-system/components/ui/card";
import {
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileText,
  Globe,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import type {
  ResearchBrief as ResearchBriefType,
  ResearchMetadata,
  ResearchSource,
} from "@/lib/exa/types";

interface ResearchBriefProps {
  brief?: ResearchBriefType;
  metadata: ResearchMetadata;
  query: string;
  sources: ResearchSource[];
}

export function ResearchBrief({
  brief,
  metadata,
  query,
  sources,
}: ResearchBriefProps) {
  const avgScore =
    sources.length > 0
      ? Math.round(
          (sources.reduce((sum, s) => sum + s.score, 0) / sources.length) * 100
        )
      : 0;

  const topDomains = [...new Set(sources.map((s) => s.domain))].slice(0, 5);

  const formattedDate = new Date(metadata.searchedAt).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="size-4 text-muted-foreground" />
              Research Brief
            </CardTitle>
            <Badge className="gap-1" variant="secondary">
              <Sparkles className="size-3" />
              {avgScore}% avg. relevance
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm leading-relaxed">
            Searched for{" "}
            <span className="font-medium text-foreground">
              &ldquo;{query}&rdquo;
            </span>{" "}
            across {metadata.resultCount} source
            {metadata.resultCount !== 1 ? "s" : ""}.
            {sources.length > 0
              ? ` The top results span ${topDomains.length} domain${topDomains.length !== 1 ? "s" : ""} with an average relevance score of ${avgScore}%.`
              : ""}
          </p>

          {topDomains.length > 0 && (
            <div className="space-y-1.5">
              <h4 className="flex items-center gap-1.5 font-medium text-muted-foreground text-xs">
                <Globe className="size-3" />
                Key Domains
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {topDomains.map((domain) => (
                  <Badge className="text-xs" key={domain} variant="outline">
                    {domain}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-4 text-muted-foreground text-xs">
            <span className="flex items-center gap-1">
              <Globe className="size-3" />
              {metadata.resultCount} sources
            </span>
            <span className="flex items-center gap-1">
              <Sparkles className="size-3" />
              {modeLabel(metadata.mode)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="size-3" />
              {formattedDate}
            </span>
          </div>
        </CardContent>
      </Card>

      {brief && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Lightbulb className="size-4 text-muted-foreground" />
              Synthesis
              {!brief.modelSynthesisAvailable && (
                <Badge className="ml-2 text-xs" variant="outline">
                  Statistics-based
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed">{brief.summary}</p>

            {brief.keyFindings.length > 0 && (
              <div className="space-y-2">
                <h4 className="flex items-center gap-1.5 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                  <CheckCircle2 className="size-3" />
                  Key Findings
                </h4>
                <ul className="space-y-2">
                  {brief.keyFindings.map((finding) => (
                    <li
                      className="flex gap-2 text-sm"
                      key={
                        finding.citations[0]?.sourceIndex ??
                        finding.finding.slice(0, 20)
                      }
                    >
                      <ChevronRight className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                      <div>
                        <p>{finding.finding}</p>
                        <p className="mt-0.5 text-muted-foreground text-xs">
                          Sources:{" "}
                          {finding.citations.map((c, j) => (
                            <span key={c.sourceIndex}>
                              {j > 0 && ", "}
                              <a
                                className="underline underline-offset-2 hover:text-foreground"
                                href={c.sourceUrl}
                                rel="noopener noreferrer"
                                target="_blank"
                              >
                                [{c.sourceIndex + 1}]
                              </a>
                            </span>
                          ))}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {brief.conflicts.length > 0 && (
              <div className="space-y-3">
                <h4 className="flex items-center gap-1.5 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                  <AlertCircle className="size-3" />
                  Conflicting Claims
                </h4>
                {brief.conflicts.map((conflict) => (
                  <div
                    className="space-y-2 rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-950"
                    key={
                      conflict.sources[0]?.sourceIndex ??
                      conflict.claim.slice(0, 20)
                    }
                  >
                    <div>
                      <p className="font-medium text-muted-foreground text-xs">
                        Claim
                      </p>
                      <p className="text-sm">{conflict.claim}</p>
                      <p className="mt-0.5 text-muted-foreground text-xs">
                        Sources:{" "}
                        {conflict.sources.map((c, j) => (
                          <span key={c.sourceIndex}>
                            {j > 0 && ", "}
                            <a
                              className="underline underline-offset-2 hover:text-foreground"
                              href={c.sourceUrl}
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              [{c.sourceIndex + 1}]
                            </a>
                          </span>
                        ))}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground text-xs">
                        Counter-claim
                      </p>
                      <p className="text-sm">{conflict.counterClaim}</p>
                      <p className="mt-0.5 text-muted-foreground text-xs">
                        Sources:{" "}
                        {conflict.counterSources.map((c, j) => (
                          <span key={c.sourceIndex}>
                            {j > 0 && ", "}
                            <a
                              className="underline underline-offset-2 hover:text-foreground"
                              href={c.sourceUrl}
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              [{c.sourceIndex + 1}]
                            </a>
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {brief.nextSteps.length > 0 && (
              <div className="space-y-2">
                <h4 className="flex items-center gap-1.5 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                  <ChevronRight className="size-3" />
                  Recommended Next Steps
                </h4>
                <ul className="space-y-2">
                  {brief.nextSteps.map((step) => (
                    <li className="flex gap-2 text-sm" key={step.step}>
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-[10px] text-muted-foreground">
                        {brief.nextSteps.indexOf(step) + 1}
                      </span>
                      <div>
                        <p className="font-medium">{step.step}</p>
                        <p className="text-muted-foreground">
                          {step.rationale}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
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
