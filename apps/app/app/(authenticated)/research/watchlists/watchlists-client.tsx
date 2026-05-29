"use client";

import { Badge } from "@repo/design-system/components/ui/badge";
import { Button } from "@repo/design-system/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/design-system/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@repo/design-system/components/ui/empty";
import { Input } from "@repo/design-system/components/ui/input";
import { Skeleton } from "@repo/design-system/components/ui/skeleton";
import {
  Bell,
  BellOff,
  Building2,
  Clock,
  Eye,
  Globe,
  Plus,
  Sparkles,
  Trash2,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useState, useTransition } from "react";
import {
  createWatchlist,
  deleteWatchlist,
  listWatchlists,
  updateWatchlist,
} from "@/app/actions/research/watchlists";
import type { ResearchMode } from "@/lib/exa/types";

interface Watchlist {
  createdAt: Date;
  description: string | null;
  enabled: boolean;
  frequency: string;
  id: string;
  mode: string;
  name: string;
  query: string;
  updatedAt: Date;
}

const modeIcons: Record<string, typeof Sparkles> = {
  fast: Zap,
  deep: Sparkles,
  company: Building2,
  market: TrendingUp,
};

export function WatchlistsClient() {
  const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState("");
  const [newQuery, setNewQuery] = useState("");
  const [newMode, setNewMode] = useState<ResearchMode>("deep");

  const fetchWatchlists = useCallback(() => {
    startTransition(async () => {
      const result = await listWatchlists();
      if ("error" in result) {
        setError(result.error);
      } else {
        setWatchlists(result.data);
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    fetchWatchlists();
  }, [fetchWatchlists]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!(newName.trim() && newQuery.trim())) {
      return;
    }

    startTransition(async () => {
      const result = await createWatchlist({
        name: newName.trim(),
        query: newQuery.trim(),
        mode: newMode,
      });
      if ("error" in result) {
        setError(result.error);
      } else {
        setNewName("");
        setNewQuery("");
        setNewMode("deep");
        setShowCreate(false);
        fetchWatchlists();
      }
    });
  };

  const handleToggle = (watchlist: Watchlist) => {
    startTransition(async () => {
      const result = await updateWatchlist({
        id: watchlist.id,
        enabled: !watchlist.enabled,
      });
      if ("error" in result) {
        setError(result.error);
      } else {
        setWatchlists((prev) =>
          prev.map((w) =>
            w.id === watchlist.id ? { ...w, enabled: !w.enabled } : w
          )
        );
      }
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      const result = await deleteWatchlist(id);
      if ("error" in result) {
        setError(result.error);
      } else {
        setWatchlists((prev) => prev.filter((w) => w.id !== id));
      }
    });
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((n) => (
          <Skeleton className="h-32 w-full rounded-xl" key={`skel-${n}`} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Empty>
        <EmptyMedia variant="icon">
          <Globe className="text-destructive" />
        </EmptyMedia>
        <EmptyHeader>
          <EmptyTitle>Error loading watchlists</EmptyTitle>
          <EmptyDescription>{error}</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm">
          {watchlists.length} watchlist{watchlists.length !== 1 ? "s" : ""}
        </p>
        <Button
          onClick={() => setShowCreate(!showCreate)}
          size="sm"
          variant={showCreate ? "outline" : "default"}
        >
          <Plus className="mr-1 size-3.5" />
          {showCreate ? "Cancel" : "New Watchlist"}
        </Button>
      </div>

      {showCreate && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Bell className="size-4 text-muted-foreground" />
              Create Watchlist
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-3" onSubmit={handleCreate}>
              <Input
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Watchlist name"
                value={newName}
              />
              <Input
                onChange={(e) => setNewQuery(e.target.value)}
                placeholder="Search query to monitor"
                value={newQuery}
              />
              <div className="flex items-center gap-2">
                {(["deep", "fast", "company", "market"] as const).map(
                  (mode) => {
                    const Icon = modeIcons[mode];
                    const isActive = newMode === mode;
                    return (
                      <Button
                        className="gap-1.5"
                        key={mode}
                        onClick={() => setNewMode(mode)}
                        size="sm"
                        type="button"
                        variant={isActive ? "default" : "outline"}
                      >
                        <Icon className="size-3.5" />
                        {mode.charAt(0).toUpperCase() + mode.slice(1)}
                      </Button>
                    );
                  }
                )}
              </div>
              <Button
                className="self-start"
                disabled={!(newName.trim() && newQuery.trim()) || isPending}
                size="sm"
                type="submit"
              >
                <Plus className="mr-1 size-3.5" />
                Create Watchlist
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {watchlists.length === 0 && !showCreate && (
        <Empty>
          <EmptyMedia variant="icon">
            <Bell />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>No watchlists yet</EmptyTitle>
            <EmptyDescription>
              Create a watchlist to monitor topics and track changes over time.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}

      {watchlists.map((watchlist) => {
        const ModeIcon = modeIcons[watchlist.mode] ?? Sparkles;
        return (
          <div
            className="flex items-start gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-muted/30"
            key={watchlist.id}
          >
            <div className="min-w-0 flex-1 space-y-1.5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-medium text-sm">{watchlist.name}</h3>
                  {watchlist.description && (
                    <p className="text-muted-foreground text-xs">
                      {watchlist.description}
                    </p>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <Badge
                    className="gap-1 text-xs"
                    variant={watchlist.enabled ? "default" : "secondary"}
                  >
                    {watchlist.enabled ? (
                      <Bell className="size-3" />
                    ) : (
                      <BellOff className="size-3" />
                    )}
                    {watchlist.enabled ? "Active" : "Paused"}
                  </Badge>
                  <Button
                    disabled={isPending}
                    onClick={() => handleToggle(watchlist)}
                    size="icon-sm"
                    variant="ghost"
                  >
                    {watchlist.enabled ? (
                      <Eye className="size-3.5" />
                    ) : (
                      <Eye className="size-3.5 text-muted-foreground" />
                    )}
                  </Button>
                  <Button
                    disabled={isPending}
                    onClick={() => handleDelete(watchlist.id)}
                    size="icon-sm"
                    variant="ghost"
                  >
                    <Trash2 className="size-3.5 text-muted-foreground hover:text-destructive" />
                  </Button>
                </div>
              </div>
              <p className="text-muted-foreground text-xs">
                <span className="font-medium text-foreground/80">
                  &ldquo;{watchlist.query}&rdquo;
                </span>
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-muted-foreground text-xs">
                <span className="flex items-center gap-1">
                  <ModeIcon className="size-3" />
                  {watchlist.mode.charAt(0).toUpperCase() +
                    watchlist.mode.slice(1)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="size-3" />
                  {frequencyLabel(watchlist.frequency)}
                </span>
                <span className="flex items-center gap-1">
                  <Bell className="size-3" />
                  Created{" "}
                  {new Date(watchlist.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function frequencyLabel(frequency: string): string {
  if (frequency === "daily") {
    return "Daily";
  }
  if (frequency === "weekly") {
    return "Weekly";
  }
  return "Manual";
}
