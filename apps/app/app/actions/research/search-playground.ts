"use server";

import { auth } from "@repo/auth/server";
import { env } from "@/env";
import type { SearchPlaygroundResponse } from "@/lib/exa/search-playground";
import {
  executeSearchPlayground,
  SearchPlaygroundRequestSchema,
} from "@/lib/exa/search-playground";

export async function searchPlaygroundAction(
  input: unknown
): Promise<{ data: SearchPlaygroundResponse } | { error: string }> {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { error: "Not authenticated" };
    }

    if (!env.EXA_API_KEY) {
      return { error: "Exa API key is not configured" };
    }

    const parsed = SearchPlaygroundRequestSchema.parse(input);

    const data = await executeSearchPlayground(parsed, env.EXA_API_KEY);

    return { data };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unexpected error occurred" };
  }
}
