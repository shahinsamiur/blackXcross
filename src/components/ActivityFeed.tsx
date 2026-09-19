import { FiFlag, FiMessageSquare } from "react-icons/fi";
import Image from "next/image";
import type { DashboardActivity } from "@/src/state/redux/api/dashboard";

interface ActivityFeedProps {
  activities: DashboardActivity[];
  isLoading?: boolean;
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMins = Math.floor((now.getTime() - date.getTime()) / 60000);
  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${Math.floor(diffHours / 24)}d ago`;
}

function ActivityIndicator({ type }: { type: string }) {
  if (type === "CASE") {
    return (
      <div className="flex shrink-0 items-center gap-2 pt-1">
        <FiFlag size={16} className="text-muted" />
        <span className="h-2.5 w-2.5 rounded-full bg-primary" />
      </div>
    );
  }
  return (
    <div className="flex shrink-0 items-center gap-1 pt-1 text-xs text-muted">
      <FiMessageSquare size={16} />
    </div>
  );
}

export default function ActivityFeed({ activities, isLoading }: ActivityFeedProps) {
  if (isLoading) {
    return (
      <section className="flex flex-col gap-5 rounded-xl border border-border bg-card p-5">
        <div className="h-4 w-48 animate-pulse rounded bg-muted" />
        <div className="flex flex-col gap-5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex w-full items-start justify-between gap-3">
              <div className="h-12 w-12 animate-pulse rounded-full bg-muted" />
              <div className="flex flex-1 flex-col gap-2">
                <div className="h-3 w-32 animate-pulse rounded bg-muted" />
                <div className="h-4 w-48 animate-pulse rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-5 rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-tight tracking-wide text-foreground/80 uppercase">
          Latest Community Activity
        </h2>
        <button
          type="button"
          className="text-xs font-semibold text-foreground/80 hover:opacity-80 border border-border px-4 py-2 rounded-lg hover:bg-primary/10 cursor-pointer"
        >
          View All
        </button>
      </div>

      {!activities || activities.length === 0 ? (
        <p className="text-sm text-muted">No recent activity.</p>
      ) : (
        <ul className="flex flex-col gap-5">
          {activities.map((item) => {
            const actorName = item.author.name || item.author.username || "Anonymous";
            const actionText = item.type === "COMMENT" ? "commented on" : item.type === "CASE" ? "created case" : "posted theory";
            const target = item.caseTitle || item.theoryTitle || "Unknown";

            return (
              <li key={item.id} className="flex w-full items-start justify-between gap-3">
                <div className="relative shrink-0">
                  <div className="h-12 w-12 overflow-hidden rounded-full border border-border bg-card">
                    {item.author.avatarUrl ? (
                      <Image
                        src={item.author.avatarUrl}
                        alt={actorName}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-muted text-lg font-bold text-foreground/50">
                        {actorName[0]?.toUpperCase()}
                      </div>
                    )}
                  </div>
                  <span className="absolute -left-0.5 top-0.5 h-2 w-2 rounded-full bg-primary" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="text-sm leading-relaxed text-foreground/90">
                    <span className="text-xs text-foreground/80">{actorName}</span>{" "}
                    {actionText}
                  </div>
                  <div className="text-base font-medium leading-relaxed text-foreground/80 sm:text-lg truncate">
                    {target}
                  </div>
                  <span className="mt-0.5 text-xs text-muted">
                    {formatTimeAgo(item.createdAt)}
                  </span>
                </div>
                <ActivityIndicator type={item.type} />
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}