"use server";

import { auth } from "@repo/auth/server";
import { database } from "@repo/database";
import { z } from "zod";

const SaveSessionSchema = z.object({
  query: z.string().min(1).max(500),
  mode: z.enum(["fast", "deep", "company", "market"]),
  resultCount: z.number().int().min(0),
  sources: z.array(
    z.object({
      title: z.string(),
      url: z.string(),
      domain: z.string(),
      snippet: z.string(),
      author: z.string().nullable().optional(),
      publishedDate: z.string().nullable().optional(),
      score: z.number().nullable().optional(),
    })
  ),
});

export async function saveResearchSession(
  input: unknown
): Promise<{ data: { id: string } } | { error: string }> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { error: "Not authenticated" };
    }

    const parsed = SaveSessionSchema.parse(input);

    const session = await database.researchSession.create({
      data: {
        userId,
        query: parsed.query,
        mode: parsed.mode,
        resultCount: parsed.resultCount,
        sources: {
          create: parsed.sources.map((s) => ({
            userId,
            title: s.title,
            url: s.url,
            domain: s.domain,
            snippet: s.snippet,
            author: s.author ?? null,
            publishedDate: s.publishedDate ?? null,
            score: s.score ?? null,
          })),
        },
      },
    });

    return { data: { id: session.id } };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unexpected error occurred" };
  }
}

export async function listResearchSessions(): Promise<
  | {
      data: Array<{
        id: string;
        query: string;
        mode: string;
        resultCount: number;
        createdAt: Date;
      }>;
    }
  | { error: string }
> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { error: "Not authenticated" };
    }

    const sessions = await database.researchSession.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 50,
      select: {
        id: true,
        query: true,
        mode: true,
        resultCount: true,
        createdAt: true,
      },
    });

    return { data: sessions };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unexpected error occurred" };
  }
}
