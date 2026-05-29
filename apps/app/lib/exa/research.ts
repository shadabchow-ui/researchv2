import "server-only";
import { createExaClient } from "./client";
import type {
  ResearchMetadata,
  ResearchRequest,
  ResearchResponse,
  ResearchSource,
} from "./types";

function modeToExaConfig(mode: ResearchRequest["mode"]): {
  numResults: number;
  useAutoprompt: boolean;
  type: string;
  category?: string;
} {
  switch (mode) {
    case "fast":
      return { numResults: 10, useAutoprompt: true, type: "keyword" };
    case "deep":
      return { numResults: 20, useAutoprompt: true, type: "neural" };
    case "company":
      return {
        numResults: 20,
        useAutoprompt: true,
        type: "neural",
        category: "company",
      };
    case "market":
      return {
        numResults: 20,
        useAutoprompt: true,
        type: "neural",
        category: "research paper",
      };
    default:
      return { numResults: 10, useAutoprompt: true, type: "keyword" };
  }
}

const WWW_REGEX = /^www\./;

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(WWW_REGEX, "");
  } catch {
    return url;
  }
}

function normalizeResults(
  rawResults: Array<{
    title: string;
    url: string;
    publishedDate?: string;
    author?: string;
    score?: number;
    id: string;
    text?: string;
  }>
): ResearchSource[] {
  return rawResults.map((r) => ({
    title: r.title,
    url: r.url,
    domain: getDomain(r.url),
    snippet: r.text ?? "",
    publishedDate: r.publishedDate ?? null,
    author: r.author ?? null,
    score: r.score ?? 0,
  }));
}

export async function executeResearch(
  request: ResearchRequest,
  apiKey: string
): Promise<ResearchResponse> {
  const client = createExaClient({ apiKey });
  const exaConfig = modeToExaConfig(request.mode);

  const result = await client.search({
    query: request.query,
    numResults: exaConfig.numResults,
    useAutoprompt: exaConfig.useAutoprompt,
    type: exaConfig.type,
    category: exaConfig.category,
    includeDomains: request.includeDomains,
    excludeDomains: request.excludeDomains,
    startPublishedDate: request.startDate,
    endPublishedDate: request.endDate,
  });

  const sources = normalizeResults(result.results);

  const metadata: ResearchMetadata = {
    provider: "exa",
    searchedAt: new Date().toISOString(),
    resultCount: result.results.length,
    mode: request.mode,
  };

  return {
    query: request.query,
    mode: request.mode,
    sources,
    metadata,
  };
}
