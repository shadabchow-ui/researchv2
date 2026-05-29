"use server";

import { auth } from "@repo/auth/server";
import { env } from "@/env";
import type { AnswerResponse } from "@/lib/exa/answer";
import { AnswerRequestSchema, executeAnswer } from "@/lib/exa/answer";

export async function answerAction(
  input: unknown
): Promise<{ data: AnswerResponse } | { error: string }> {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { error: "Not authenticated" };
    }

    if (!env.EXA_API_KEY) {
      return { error: "Exa API key is not configured" };
    }

    const parsed = AnswerRequestSchema.parse(input);

    const data = await executeAnswer(parsed, env.EXA_API_KEY);

    return { data };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unexpected error occurred" };
  }
}
