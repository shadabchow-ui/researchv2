"use server";

import { auth } from "@repo/auth/server";
import { env } from "@/env";
import { executeResearch } from "@/lib/exa/research";
import { synthesize } from "@/lib/exa/synthesis";
import type { ResearchResponse } from "@/lib/exa/types";
import { ResearchRequestSchema } from "@/lib/exa/types";

export async function researchSearch(
  input: unknown
): Promise<{ data: ResearchResponse } | { error: string }> {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { error: "Not authenticated" };
    }

    if (!env.EXA_API_KEY) {
      return { error: "Exa API key is not configured" };
    }

    const parsed = ResearchRequestSchema.parse(input);

    const result = await executeResearch(parsed, env.EXA_API_KEY);

    const brief = await synthesize(result.query, result.sources);

    return { data: { ...result, brief } };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unexpected error occurred" };
  }
}
