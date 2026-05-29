import { z } from "zod";

export type ResearchMode = "fast" | "deep" | "company" | "market";

export interface ResearchSource {
  author: string | null;
  domain: string;
  publishedDate: string | null;
  score: number;
  snippet: string;
  title: string;
  url: string;
}

export interface ResearchMetadata {
  mode: ResearchMode;
  provider: "exa";
  resultCount: number;
  searchedAt: string;
}

export interface ResearchResponse {
  brief?: ResearchBrief;
  metadata: ResearchMetadata;
  mode: ResearchMode;
  query: string;
  sources: ResearchSource[];
}

export const ResearchRequestSchema = z.object({
  query: z.string().min(1).max(500),
  mode: z.enum(["fast", "deep", "company", "market"]).default("deep"),
  maxResults: z.number().int().min(1).max(50).default(10),
  includeDomains: z.array(z.string()).optional(),
  excludeDomains: z.array(z.string()).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export type ResearchRequest = z.infer<typeof ResearchRequestSchema>;

export interface ResearchCitation {
  sourceIndex: number;
  sourceTitle: string;
  sourceUrl: string;
}

export interface ResearchFinding {
  citations: ResearchCitation[];
  finding: string;
}

export interface ResearchConflict {
  claim: string;
  counterClaim: string;
  counterSources: ResearchCitation[];
  sources: ResearchCitation[];
}

export interface ResearchNextStep {
  rationale: string;
  step: string;
}

export interface ResearchBrief {
  conflicts: ResearchConflict[];
  generatedAt: string;
  keyFindings: ResearchFinding[];
  modelSynthesisAvailable: boolean;
  nextSteps: ResearchNextStep[];
  summary: string;
}

export const ResearchBriefSchema = z.object({
  summary: z.string().min(1),
  keyFindings: z.array(
    z.object({
      finding: z.string().min(1),
      citations: z.array(
        z.object({
          sourceIndex: z.number().int().min(0),
          sourceUrl: z.string(),
          sourceTitle: z.string(),
        })
      ),
    })
  ),
  conflicts: z.array(
    z.object({
      claim: z.string().min(1),
      sources: z.array(
        z.object({
          sourceIndex: z.number().int().min(0),
          sourceUrl: z.string(),
          sourceTitle: z.string(),
        })
      ),
      counterClaim: z.string().min(1),
      counterSources: z.array(
        z.object({
          sourceIndex: z.number().int().min(0),
          sourceUrl: z.string(),
          sourceTitle: z.string(),
        })
      ),
    })
  ),
  nextSteps: z.array(
    z.object({
      step: z.string().min(1),
      rationale: z.string().min(1),
    })
  ),
});
