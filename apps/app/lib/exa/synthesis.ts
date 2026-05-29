import "server-only";
import { generateObject } from "@repo/ai";
import { keys } from "@repo/ai/keys";
import { models } from "@repo/ai/lib/models";
import type {
  ResearchBrief,
  ResearchFinding,
  ResearchNextStep,
  ResearchSource,
} from "./types";
import { ResearchBriefSchema } from "./types";

const SYNTHESIS_TIMEOUT_MS = 15_000;

function buildSourceContext(sources: ResearchSource[]): string {
  return sources
    .map(
      (s, i) =>
        `[${i}] Title: ${s.title}\n    URL: ${s.url}\n    Domain: ${s.domain}\n    Snippet: ${s.snippet.slice(0, 500)}`
    )
    .join("\n\n");
}

function buildSystemPrompt(): string {
  return `You are a research synthesis assistant. Your task is to analyze search results and produce a structured brief.

Rules:
- Only reference sources by their [index] number as shown in the provided source list.
- Never invent or hallucinate citations. Every citation must reference a real source index.
- If sources don't contain enough information to support a finding, omit it.
- Keep the summary concise (2-4 sentences).
- Limit key findings to at most 5.
- If no conflicting claims are found, return an empty conflicts array.
- Limit next steps to at most 3.`;
}

function extractFindings(sources: ResearchSource[]): ResearchFinding[] {
  const findings: ResearchFinding[] = [];
  const scored = [...sources].sort((a, b) => b.score - a.score);
  const topSources = scored.slice(0, 5);

  for (const source of topSources) {
    const snippet = source.snippet.trim();
    if (!snippet) {
      continue;
    }

    const index = sources.indexOf(source);
    const citation = {
      sourceIndex: index,
      sourceUrl: source.url,
      sourceTitle: source.title,
    };

    const findingText =
      snippet.length > 120 ? `${snippet.slice(0, 120)}...` : snippet;
    findings.push({
      finding: `${source.title}: ${findingText}`,
      citations: [citation],
    });
  }

  return findings;
}

function buildDomainGroups(
  sources: ResearchSource[]
): Map<string, ResearchSource[]> {
  const domainGroups = new Map<string, ResearchSource[]>();
  for (const source of sources) {
    const group = domainGroups.get(source.domain) ?? [];
    group.push(source);
    domainGroups.set(source.domain, group);
  }
  return domainGroups;
}

function buildFallbackNextSteps(
  sources: ResearchSource[],
  domainGroups: Map<string, ResearchSource[]>
): ResearchNextStep[] {
  const steps: ResearchNextStep[] = [];
  const topDomain = [...domainGroups.entries()].sort(
    (a, b) => b[1].length - a[1].length
  )[0];

  steps.push({
    step: "Review top sources for deeper analysis",
    rationale: `The most common domain "${topDomain[0]}" has ${topDomain[1].length} source${topDomain[1].length !== 1 ? "s" : ""} — review these first for authoritative information.`,
  });

  if (sources.length >= 5) {
    steps.push({
      step: "Refine search for more specific results",
      rationale: `With ${sources.length} sources available, narrowing the query may surface more targeted information on specific subtopics.`,
    });
  }

  steps.push({
    step: "Verify findings across primary sources",
    rationale:
      "AI-powered synthesis could extract structured findings, detect conflicts, and recommend next steps from these sources.",
  });

  return steps;
}

function buildFallbackSummary(
  query: string,
  sources: ResearchSource[],
  domainCount: number,
  findingCount: number
): string {
  if (sources.length === 0) {
    return `No sources found for "${query}".`;
  }

  const sourceWord = sources.length !== 1 ? "s" : "";
  const domainWord = domainCount !== 1 ? "s" : "";

  if (findingCount === 0) {
    return `Found ${sources.length} source${sourceWord} across ${domainCount} domain${domainWord} for "${query}". No detailed findings could be extracted from snippets.`;
  }

  const findingWord = findingCount !== 1 ? "s" : "";
  return `Found ${sources.length} source${sourceWord} across ${domainCount} domain${domainWord} for "${query}". Top sources cover ${findingCount} key finding${findingWord}.`;
}

function deterministicFallback(
  query: string,
  sources: ResearchSource[]
): ResearchBrief {
  const findings = extractFindings(sources);
  const domainGroups = buildDomainGroups(sources);
  const distinctDomains = domainGroups.size;
  const summary = buildFallbackSummary(
    query,
    sources,
    distinctDomains,
    findings.length
  );
  const nextSteps =
    sources.length > 0 ? buildFallbackNextSteps(sources, domainGroups) : [];

  return {
    summary,
    keyFindings: findings,
    conflicts: [],
    nextSteps,
    generatedAt: new Date().toISOString(),
    modelSynthesisAvailable: false,
  };
}

function validateBrief(
  brief: unknown,
  sources: ResearchSource[]
): Omit<ResearchBrief, "generatedAt" | "modelSynthesisAvailable"> {
  const parsed = ResearchBriefSchema.parse(brief);

  const validIndices = new Set(sources.map((_, i) => i));

  function citationReferencesValidSource(citation: {
    sourceIndex: number;
  }): boolean {
    return validIndices.has(citation.sourceIndex);
  }

  parsed.keyFindings = parsed.keyFindings.filter((f) =>
    f.citations.every(citationReferencesValidSource)
  );

  for (const conflict of parsed.conflicts) {
    conflict.sources = conflict.sources.filter(citationReferencesValidSource);
    conflict.counterSources = conflict.counterSources.filter(
      citationReferencesValidSource
    );
  }
  parsed.conflicts = parsed.conflicts.filter(
    (c) => c.sources.length > 0 && c.counterSources.length > 0
  );

  return parsed;
}

export async function synthesize(
  query: string,
  sources: ResearchSource[]
): Promise<ResearchBrief> {
  if (sources.length === 0) {
    return {
      summary: `No sources available to synthesize for "${query}".`,
      keyFindings: [],
      conflicts: [],
      nextSteps: [],
      generatedAt: new Date().toISOString(),
      modelSynthesisAvailable: false,
    };
  }

  const apiKey = keys().OPENAI_API_KEY;

  if (!apiKey) {
    return deterministicFallback(query, sources);
  }

  const sourceContext = buildSourceContext(sources);

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), SYNTHESIS_TIMEOUT_MS);

    const result = await generateObject({
      model: models.chat,
      schema: ResearchBriefSchema,
      system: buildSystemPrompt(),
      prompt: `Analyze these search results for the query: "${query}"\n\nSources:\n${sourceContext}\n\nProduce a structured research brief with key findings, any conflicting claims, and recommended next steps grounded only in the provided sources.`,
      abortSignal: controller.signal,
    });

    clearTimeout(timer);

    const brief = validateBrief(result.object, sources);

    return {
      ...brief,
      generatedAt: new Date().toISOString(),
      modelSynthesisAvailable: true,
    };
  } catch (error) {
    if (
      error instanceof Error &&
      (error.name === "AbortError" ||
        error.message.includes("abort") ||
        error.message.includes("timeout"))
    ) {
      console.warn("Synthesis model call timed out, using fallback");
    } else {
      console.warn("Synthesis model call failed, using fallback:", error);
    }
    return deterministicFallback(query, sources);
  }
}
