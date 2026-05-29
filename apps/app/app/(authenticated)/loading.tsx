import { Skeleton } from "@repo/design-system/components/ui/skeleton";

const LoadingSkeleton = () => (
  <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
    <div className="space-y-1">
      <Skeleton className="h-7 w-48" />
      <Skeleton className="h-4 w-72" />
    </div>
    <div className="space-y-3">
      <Skeleton className="h-4 w-20" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border bg-card p-5">
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-3 w-48" />
          </div>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-3 w-48" />
          </div>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-3 w-48" />
          </div>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-3 w-48" />
          </div>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-3 w-48" />
          </div>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-3 w-48" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default LoadingSkeleton;
