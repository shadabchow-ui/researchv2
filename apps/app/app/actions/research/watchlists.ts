"use server";

import { auth } from "@repo/auth/server";
import { database } from "@repo/database";
import { z } from "zod";

const CreateWatchlistSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(500).optional(),
  query: z.string().min(1).max(500),
  mode: z.enum(["fast", "deep", "company", "market"]).default("deep"),
  frequency: z.enum(["manual", "daily", "weekly"]).default("manual"),
});

const UpdateWatchlistSchema = z.object({
  id: z.string(),
  enabled: z.boolean().optional(),
  frequency: z.enum(["manual", "daily", "weekly"]).optional(),
});

export async function createWatchlist(
  input: unknown
): Promise<{ data: { id: string } } | { error: string }> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { error: "Not authenticated" };
    }

    const parsed = CreateWatchlistSchema.parse(input);

    const watchlist = await database.researchWatchlist.create({
      data: {
        userId,
        name: parsed.name,
        description: parsed.description ?? null,
        query: parsed.query,
        mode: parsed.mode,
        frequency: parsed.frequency,
      },
    });

    return { data: { id: watchlist.id } };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unexpected error occurred" };
  }
}

export async function listWatchlists(): Promise<
  | {
      data: Array<{
        id: string;
        name: string;
        description: string | null;
        query: string;
        mode: string;
        frequency: string;
        enabled: boolean;
        createdAt: Date;
        updatedAt: Date;
      }>;
    }
  | { error: string }
> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { error: "Not authenticated" };
    }

    const watchlists = await database.researchWatchlist.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      take: 50,
    });

    return { data: watchlists };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unexpected error occurred" };
  }
}

export async function updateWatchlist(
  input: unknown
): Promise<{ data: { id: string } } | { error: string }> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { error: "Not authenticated" };
    }

    const parsed = UpdateWatchlistSchema.parse(input);

    const existing = await database.researchWatchlist.findUnique({
      where: { id: parsed.id },
    });

    if (!existing) {
      return { error: "Watchlist not found" };
    }
    if (existing.userId !== userId) {
      return { error: "Not authorized" };
    }

    const watchlist = await database.researchWatchlist.update({
      where: { id: parsed.id },
      data: {
        ...(parsed.enabled !== undefined && { enabled: parsed.enabled }),
        ...(parsed.frequency !== undefined && { frequency: parsed.frequency }),
      },
    });

    return { data: { id: watchlist.id } };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unexpected error occurred" };
  }
}

export async function deleteWatchlist(
  id: string
): Promise<{ data: { success: true } } | { error: string }> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { error: "Not authenticated" };
    }

    const existing = await database.researchWatchlist.findUnique({
      where: { id },
    });

    if (!existing) {
      return { error: "Watchlist not found" };
    }
    if (existing.userId !== userId) {
      return { error: "Not authorized" };
    }

    await database.researchWatchlist.delete({ where: { id } });

    return { data: { success: true as const } };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unexpected error occurred" };
  }
}
