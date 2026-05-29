"use client";

import { Button } from "@repo/design-system/components/ui/button";
import { Input } from "@repo/design-system/components/ui/input";
import { cn } from "@repo/design-system/lib/utils";
import { Building2, Search, Sparkles, TrendingUp, Zap } from "lucide-react";
import { useState } from "react";
import type { ResearchMode } from "@/lib/exa/types";

interface ModeOption {
  description: string;
  icon: typeof Search;
  label: string;
  value: ResearchMode;
}

const modes: ModeOption[] = [
  {
    value: "fast",
    label: "Fast",
    icon: Zap,
    description: "Quick web and news results",
  },
  {
    value: "deep",
    label: "Deep",
    icon: Sparkles,
    description: "Comprehensive multi-source analysis",
  },
  {
    value: "company",
    label: "Company",
    icon: Building2,
    description: "Business and competitive data",
  },
  {
    value: "market",
    label: "Market",
    icon: TrendingUp,
    description: "Trends and forecasts",
  },
];

interface ResearchFormProps {
  isSearching: boolean;
  onSubmit: (query: string, mode: ResearchMode) => void;
}

export function ResearchForm({ isSearching, onSubmit }: ResearchFormProps) {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<ResearchMode>("deep");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query.trim(), mode);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          aria-label="Research query"
          className="h-12 pr-4 pl-10 text-base"
          disabled={isSearching}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search anything... e.g. "AI semiconductor market trends 2026"'
          value={query}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {modes.map((m) => {
          const Icon = m.icon;
          const isActive = mode === m.value;
          return (
            <Button
              className={cn("gap-1.5", isActive && "shadow-sm")}
              disabled={isSearching}
              key={m.value}
              onClick={() => setMode(m.value)}
              size="sm"
              title={m.description}
              type="button"
              variant={isActive ? "default" : "outline"}
            >
              <Icon className="size-3.5" />
              {m.label}
            </Button>
          );
        })}

        <Button
          className="ml-auto gap-1.5"
          disabled={!query.trim() || isSearching}
          size="sm"
          type="submit"
        >
          {isSearching ? (
            <>
              <span className="size-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Searching
            </>
          ) : (
            <>
              <Search className="size-3.5" />
              Research
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
