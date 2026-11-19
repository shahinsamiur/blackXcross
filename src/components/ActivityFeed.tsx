import { FiFlag, FiMessageSquare } from "react-icons/fi";
import type { DashboardActivity } from "@/src/state/redux/api/dashboard";
import ProfileAvatar from "./ProfileAvatar";

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
  const Icon = type === "CASE" ? FiFlag : FiMessageSquare;
  return (
    <span className="flex shrink-0 items-center text-muted">
      <Icon size={14} />
    </span>
  );
}

export default function ActivityFeed({
  activities,
  isLoading,
}: ActivityFeedProps) {
  if (isLoading) {
    return (
      <section className="flex flex-col gap-5 rounded-xl border border-border bg-card p-5">
        <div className="h-4 w-48 animate-pulse rounded bg-muted" />
        <div className="flex flex-col">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 py-4 ${i !== 3 ? "border-b border-border" : ""}`}
            >
              <div className="h-9 w-9 animate-pulse rounded-full bg-muted" />
              <div className="h-4 flex-1 animate-pulse rounded bg-muted" />
              <div className="h-4 w-8 animate-pulse rounded bg-muted" />
            </div>
          ))}
        </div>
      </section>
    );
  }
  return (
    <section className="flex flex-col gap-5 rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold tracking-wide text-foreground/80 uppercase">
          Latest Community Activity
        </h2>
        <button
          type="button"
          className="text-xs font-semibold text-red-500 hover:text-red-400 cursor-pointer"
        >
          View All
        </button>
      </div>

      {!activities || activities.length === 0 ? (
        <p className="text-sm text-muted">No recent activity.</p>
      ) : (
        <ul className="flex flex-col">
          {activities.map((item, index) => {
            const actorName =
              item.author.name || item.author.username || "Anonymous";
            const actionText =
              item.type === "COMMENT"
                ? "commented on"
                : item.type === "CASE"
                  ? "created case"
                  : "posted theory";
            const target = item.caseTitle || item.theoryTitle || "Unknown";

            return (
              <li
                key={item.id}
                className={`flex items-center gap-3 py-4 ${
                  index !== activities.length - 1
                    ? "border-b border-border"
                    : ""
                }`}
              >
                {item.author.avatarUrl ? (
                  <ProfileAvatar
                    src={item.author.avatarUrl}
                    alt={actorName}
                    size={36}
                  />
                ) : (
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-xs font-bold text-red-500">
                    {actorName[0]?.toUpperCase()}
                  </span>
                )}
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="truncate text-xs text-muted">
                    <span className="font-semibold text-foreground/90">
                      {actorName}
                    </span>{" "}
                    {actionText} · {formatTimeAgo(item.createdAt)}
                  </span>
                  <p className="truncate text-sm leading-snug text-foreground/80">
                    {target}
                  </p>
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