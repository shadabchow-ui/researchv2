import "server-only";

const EXA_API_BASE = "https://api.exa.ai";
const EXA_SEARCH_PATH = "/search";
const EXA_CONTENTS_PATH = "/contents";
const EXA_ANSWER_PATH = "/answer";
const DEFAULT_TIMEOUT_MS = 30_000;

export interface ExaClientOptions {
  apiKey: string;
  timeout?: number;
}

export interface ExaSearchParams {
  category?: string;
  endPublishedDate?: string;
  excludeDomains?: string[];
  includeDomains?: string[];
  numResults?: number;
  query: string;
  startPublishedDate?: string;
  type?: string;
  useAutoprompt?: boolean;
}

export interface ExaRawResult {
  author?: string;
  id: string;
  publishedDate?: string;
  score?: number;
  text?: string;
  title: string;
  url: string;
}

export interface ExaSearchResponse {
  autopromptString?: string;
  costCalls?: number;
  results: ExaRawResult[];
}

export interface ExaContentsParams {
  livecrawl?: "always" | "never" | "fallback";
  text?: {
    includeHtmlTags?: boolean;
    maxCharacters?: number;
  };
  urls: string[];
}

export interface ExaContentsResult {
  author: string | null;
  domain: string;
  id: string;
  publishedDate: string | null;
  text: string;
  title: string;
  url: string;
}

export interface ExaContentsResponse {
  results: ExaContentsResult[];
}

export interface ExaAnswerParams {
  query: string;
}

export interface ExaAnswerCitation {
  author: string | null;
  id: string;
  publishedDate: string | null;
  title: string;
  url: string;
}

export interface ExaAnswerResponse {
  answer: string;
  citations: ExaAnswerCitation[];
}

export function createExaClient(options: ExaClientOptions) {
  const { apiKey, timeout = DEFAULT_TIMEOUT_MS } = options;

  async function search(params: ExaSearchParams): Promise<ExaSearchResponse> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${EXA_API_BASE}${EXA_SEARCH_PATH}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify(params),
        signal: controller.signal,
      });

      if (!response.ok) {
        const body = await response.text().catch(() => "");
        throw new Error(`Exa API error (${response.status}): ${body}`);
      }

      const data = (await response.json()) as ExaSearchResponse;

      return data;
    } finally {
      clearTimeout(timer);
    }
  }

  async function contents(
    params: ExaContentsParams
  ): Promise<ExaContentsResponse> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${EXA_API_BASE}${EXA_CONTENTS_PATH}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify(params),
        signal: controller.signal,
      });

      if (!response.ok) {
        const body = await response.text().catch(() => "");
        throw new Error(`Exa API error (${response.status}): ${body}`);
      }

      const data = (await response.json()) as ExaContentsResponse;

      return data;
    } finally {
      clearTimeout(timer);
    }
  }

  async function answer(params: ExaAnswerParams): Promise<ExaAnswerResponse> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${EXA_API_BASE}${EXA_ANSWER_PATH}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify(params),
        signal: controller.signal,
      });

      if (!response.ok) {
        const body = await response.text().catch(() => "");
        throw new Error(`Exa API error (${response.status}): ${body}`);
      }

      const data = (await response.json()) as ExaAnswerResponse;

      return data;
    } finally {
      clearTimeout(timer);
    }
  }

  return { search, contents, answer };
}

export type ExaClient = ReturnType<typeof createExaClient>;
