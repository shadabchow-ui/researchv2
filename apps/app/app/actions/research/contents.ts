"use server";

import { auth } from "@repo/auth/server";
import { env } from "@/env";
import type { ContentsResponse } from "@/lib/exa/contents";
import { ContentsRequestSchema, executeContents } from "@/lib/exa/contents";

export async function contentsAction(
  input: unknown
): Promise<{ data: ContentsResponse } | { error: string }> {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { error: "Not authenticated" };
    }

    if (!env.EXA_API_KEY) {
      return { error: "Exa API key is not configured" };
    }

    const parsed = ContentsRequestSchema.parse(input);

    const data = await executeContents(parsed, env.EXA_API_KEY);

    return { data };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unexpected error occurred" };
  }
}
