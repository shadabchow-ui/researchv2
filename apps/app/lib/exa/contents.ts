import "server-only";
import { z } from "zod";
import { createExaClient } from "./client";

export const ContentsRequestSchema = z.object({
  urls: z.array(z.string().url()).min(1).max(10),
  maxCharacters: z.number().int().min(1).max(10_000).optional(),
  livecrawl: z.enum(["always", "never", "fallback"]).optional(),
});

export type ContentsRequest = z.infer<typeof ContentsRequestSchema>;

export interface ContentsResult {
  author: string | null;
  domain: string;
  id: string;
  publishedDate: string | null;
  text: string;
  title: string;
  url: string;
}

export interface ContentsResponse {
  fetchedAt: string;
  results: ContentsResult[];
}

const WWW_REGEX = /^www\./;

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(WWW_REGEX, "");
  } catch {
    return url;
  }
}

export async function executeContents(
  request: ContentsRequest,
  apiKey: string
): Promise<ContentsResponse> {
  const client = createExaClient({ apiKey });

  const body: Record<string, unknown> = {
    urls: request.urls,
  };

  if (request.maxCharacters !== undefined || request.livecrawl) {
    body.text = {};
    if (request.maxCharacters !== undefined) {
      (body.text as Record<string, unknown>).maxCharacters =
        request.maxCharacters;
    }
  }

  if (request.livecrawl) {
    body.livecrawl = request.livecrawl;
  }

  const result = await client.contents(body as never);

  const results: ContentsResult[] = result.results.map((r) => ({
    id: r.id,
    title: r.title,
    url: r.url,
    domain: getDomain(r.url),
    text: r.text,
    author: r.author ?? null,
    publishedDate: r.publishedDate ?? null,
  }));

  return {
    results,
    fetchedAt: new Date().toISOString(),
  };
}
