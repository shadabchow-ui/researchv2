import "server-only";
import { z } from "zod";
import { createExaClient } from "./client";

export const AnswerRequestSchema = z.object({
  query: z.string().min(1).max(1000),
});

export type AnswerRequest = z.infer<typeof AnswerRequestSchema>;

export interface AnswerCitation {
  author: string | null;
  id: string;
  publishedDate: string | null;
  title: string;
  url: string;
}

export interface AnswerResponse {
  answer: string;
  answeredAt: string;
  citations: AnswerCitation[];
}

export async function executeAnswer(
  request: AnswerRequest,
  apiKey: string
): Promise<AnswerResponse> {
  const client = createExaClient({ apiKey });

  const result = await client.answer({
    query: request.query,
  });

  const citations: AnswerCitation[] = (result.citations ?? []).map((c) => ({
    id: c.id,
    title: c.title,
    url: c.url,
    publishedDate: c.publishedDate ?? null,
    author: c.author ?? null,
  }));

  return {
    answer: result.answer,
    citations,
    answeredAt: new Date().toISOString(),
  };
}
