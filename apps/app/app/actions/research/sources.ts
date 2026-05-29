"use server";

import { auth } from "@repo/auth/server";
import { database } from "@repo/database";
import { z } from "zod";

const SaveSourceSchema = z.object({
  title: z.string().min(1).max(500),
  url: z.string().min(1),
  domain: z.string().min(1),
  snippet: z.string(),
  author: z.string().nullable().optional(),
  publishedDate: z.string().nullable().optional(),
  score: z.number().nullable().optional(),
});

export async function saveSource(
  input: unknown
): Promise<{ data: { id: string } } | { error: string }> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { error: "Not authenticated" };
    }

    const parsed = SaveSourceSchema.parse(input);

    const existing = await database.researchSource.findUnique({
      where: { userId_url: { userId, url: parsed.url } },
    });

    if (existing) {
      return { data: { id: existing.id } };
    }

    const source = await database.researchSource.create({
      data: {
        userId,
        title: parsed.title,
        url: parsed.url,
        domain: parsed.domain,
        snippet: parsed.snippet,
        author: parsed.author ?? null,
        publishedDate: parsed.publishedDate ?? null,
        score: parsed.score ?? null,
      },
    });

    return { data: { id: source.id } };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unexpected error occurred" };
  }
}

export async function listSavedSources(): Promise<
  | {
      data: Array<{
        id: string;
        title: string;
        url: string;
        domain: string;
        snippet: string;
        author: string | null;
        publishedDate: string | null;
        score: number | null;
        savedAt: Date;
      }>;
    }
  | { error: string }
> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { error: "Not authenticated" };
    }

    const sources = await database.researchSource.findMany({
      where: { userId },
      orderBy: { savedAt: "desc" },
      take: 100,
      select: {
        id: true,
        title: true,
        url: true,
        domain: true,
        snippet: true,
        author: true,
        publishedDate: true,
        score: true,
        savedAt: true,
      },
    });

    return { data: sources };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unexpected error occurred" };
  }
}

export async function getSavedSource(id: string): Promise<
  | {
      data: {
        author: string | null;
        domain: string;
        id: string;
        metadata: unknown;
        publishedDate: string | null;
        savedAt: Date;
        score: number | null;
        snippet: string;
        title: string;
        url: string;
      };
    }
  | { error: string }
> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { error: "Not authenticated" };
    }

    const source = await database.researchSource.findUnique({
      where: { id },
    });

    if (!source) {
      return { error: "Source not found" };
    }
    if (source.userId !== userId) {
      return { error: "Not authorized" };
    }

    return { data: source };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unexpected error occurred" };
  }
}

export async function deleteSavedSource(
  id: string
): Promise<{ data: { success: true } } | { error: string }> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { error: "Not authenticated" };
    }

    const source = await database.researchSource.findUnique({
      where: { id },
    });

    if (!source) {
      return { error: "Source not found" };
    }
    if (source.userId !== userId) {
      return { error: "Not authorized" };
    }

    await database.researchSource.delete({ where: { id } });

    return { data: { success: true as const } };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unexpected error occurred" };
  }
}
