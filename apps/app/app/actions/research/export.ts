"use server";

import { auth } from "@repo/auth/server";
import { database } from "@repo/database";

function modeLabel(mode: string): string {
  const labels: Record<string, string> = {
    fast: "Fast Search",
    deep: "Deep Research",
    company: "Company Research",
    market: "Market Research",
  };
  return labels[mode] ?? mode;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatScore(score: number | null): string {
  if (score === null || score === undefined) {
    return "N/A";
  }
  return `${Math.round(score * 100)}%`;
}

interface SessionWithSources {
  createdAt: Date;
  id: string;
  mode: string;
  query: string;
  resultCount: number;
  sources: Array<{
    author: string | null;
    domain: string;
    publishedDate: string | null;
    score: number | null;
    snippet: string;
    title: string;
    url: string;
  }>;
}

async function getSessionWithSources(
  sessionId: string,
  userId: string
): Promise<SessionWithSources | null> {
  const session = await database.researchSession.findUnique({
    where: { id: sessionId },
    include: { sources: true },
  });

  if (!session || session.userId !== userId) {
    return null;
  }

  return {
    id: session.id,
    query: session.query,
    mode: session.mode,
    resultCount: session.resultCount,
    createdAt: session.createdAt,
    sources: session.sources.map((s) => ({
      title: s.title,
      url: s.url,
      domain: s.domain,
      snippet: s.snippet,
      author: s.author,
      publishedDate: s.publishedDate,
      score: s.score,
    })),
  };
}

function buildMarkdown(session: SessionWithSources): string {
  const lines: string[] = [];

  lines.push("# Research Session");
  lines.push("");
  lines.push(`**Query:** "${session.query}"`);
  lines.push(`**Mode:** ${modeLabel(session.mode)}`);
  lines.push(`**Results:** ${session.resultCount} sources`);
  lines.push(`**Created:** ${formatDate(session.createdAt)}`);
  lines.push("");

  if (session.sources.length === 0) {
    lines.push("_No sources saved with this session._");
    lines.push("");
    return lines.join("\n");
  }

  lines.push("## Sources");
  lines.push("");

  for (const [index, source] of session.sources.entries()) {
    lines.push(`### ${index + 1}. ${source.title}`);
    lines.push("");
    lines.push(`- **Domain:** ${source.domain}`);
    lines.push(`- **URL:** ${source.url}`);
    if (source.author) {
      lines.push(`- **Author:** ${source.author}`);
    }
    if (source.publishedDate) {
      lines.push(
        `- **Published:** ${new Date(source.publishedDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
      );
    }
    lines.push(`- **Score:** ${formatScore(source.score)}`);
    if (source.snippet) {
      lines.push("");
      lines.push(`   ${source.snippet}`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

function buildJson(session: SessionWithSources): string {
  return JSON.stringify(
    {
      query: session.query,
      mode: session.mode,
      resultCount: session.resultCount,
      createdAt: session.createdAt.toISOString(),
      sources: session.sources.map((s) => ({
        title: s.title,
        url: s.url,
        domain: s.domain,
        snippet: s.snippet,
        author: s.author,
        publishedDate: s.publishedDate,
        score: s.score,
      })),
    },
    null,
    2
  );
}

export async function exportResearchSessionMarkdown(
  sessionId: string
): Promise<
  { data: { content: string; filename: string } } | { error: string }
> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { error: "Not authenticated" };
    }

    const session = await getSessionWithSources(sessionId, userId);
    if (!session) {
      return { error: "Session not found" };
    }

    const content = buildMarkdown(session);
    const filename = `research-${session.id.slice(0, 8)}.md`;

    return { data: { content, filename } };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unexpected error occurred" };
  }
}

export async function exportResearchSessionJson(
  sessionId: string
): Promise<
  { data: { content: string; filename: string } } | { error: string }
> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { error: "Not authenticated" };
    }

    const session = await getSessionWithSources(sessionId, userId);
    if (!session) {
      return { error: "Session not found" };
    }

    const content = buildJson(session);
    const filename = `research-${session.id.slice(0, 8)}.json`;

    return { data: { content, filename } };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unexpected error occurred" };
  }
}
