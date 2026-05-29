import "server-only";
import { z } from "zod";
import { createExaClient } from "./client";

export const SearchPlaygroundRequestSchema = z.object({
  query: z.string().min(1).max(500),
  type: z.enum(["keyword", "neural"]).default("neural"),
  numResults: z.number().int().min(1).max(50).default(10),
  includeDomains: z.array(z.string()).optional(),
  excludeDomains: z.array(z.string()).optional(),
  startPublishedDate: z.string().optional(),
  endPublishedDate: z.string().optional(),
  useAutoprompt: z.boolean().default(true),
  category: z.string().optional(),
  highlights: z.boolean().default(false),
});

export type SearchPlaygroundRequest = z.infer<
  typeof SearchPlaygroundRequestSchema
>;

export interface SearchPlaygroundSource {
  author: string | null;
  domain: string;
  highlights?: string[];
  id: string;
  publishedDate: string | null;
  score: number;
  snippet: string;
  title: string;
  url: string;
}

export interface SearchPlaygroundResponse {
  autopromptString?: string;
  query: string;
  resultCount: number;
  results: SearchPlaygroundSource[];
  searchedAt: string;
}

const WWW_REGEX = /^www\./;

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(WWW_REGEX, "");
  } catch {
    return url;
  }
}

export async function executeSearchPlayground(
  request: SearchPlaygroundRequest,
  apiKey: string
): Promise<SearchPlaygroundResponse> {
  const client = createExaClient({ apiKey });

  const body: Record<string, unknown> = {
    query: request.query,
    type: request.type,
    numResults: request.numResults,
    useAutoprompt: request.useAutoprompt,
  };

  if (request.includeDomains && request.includeDomains.length > 0) {
    body.includeDomains = request.includeDomains;
  }
  if (request.excludeDomains && request.excludeDomains.length > 0) {
    body.excludeDomains = request.excludeDomains;
  }
  if (request.startPublishedDate) {
    body.startPublishedDate = request.startPublishedDate;
  }
  if (request.endPublishedDate) {
    body.endPublishedDate = request.endPublishedDate;
  }
  if (request.category) {
    body.category = request.category;
  }

  const result = await client.search(body as never);

  const results: SearchPlaygroundSource[] = result.results.map((r) => ({
    id: r.id,
    title: r.title,
    url: r.url,
    domain: getDomain(r.url),
    snippet: r.text ?? "",
    publishedDate: r.publishedDate ?? null,
    author: r.author ?? null,
    score: r.score ?? 0,
  }));

  return {
    query: request.query,
    resultCount: result.results.length,
    results,
    autopromptString: result.autopromptString,
    searchedAt: new Date().toISOString(),
  };
}
