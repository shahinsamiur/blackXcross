import { FaFire } from "react-icons/fa6";
import { FiThumbsUp } from "react-icons/fi";
import type { DashboardTheory } from "@/src/state/redux/api/dashboard";
import ProfileAvatar from "./ProfileAvatar";

interface TrendingTheoriesProps {
  theories: DashboardTheory[];
  isLoading?: boolean;
}

export default function TrendingTheories({
  theories,
  isLoading,
}: TrendingTheoriesProps) {
  if (isLoading) {
    return (
      <section className="flex flex-col gap-5 rounded-xl border border-border bg-card p-5">
        <div className="h-4 w-40 animate-pulse rounded bg-muted" />
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
          Trending Theories
        </h2>
        <button
          type="button"
          className="text-xs font-semibold text-red-500 hover:text-red-400 cursor-pointer"
        >
          View All
        </button>
      </div>

      {!theories || theories.length === 0 ? (
        <p className="text-sm text-muted">No trending theories yet.</p>
      ) : (
        <ul className="flex flex-col">
          {theories.map((theory, index) => (
            <li
              key={theory.id}
              className={`flex items-center gap-3 py-4 ${
                index !== theories.length - 1 ? "border-b border-border" : ""
              }`}
            >
              {theory.author?.avatarUrl ? (
                <ProfileAvatar
                  src={theory.author.avatarUrl}
                  alt={theory.author.name || "Author"}
                  size={36}
                />
              ) : (
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                  <FaFire size={16} />
                </span>
              )}
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="truncate text-xs font-semibold text-foreground/90">
                  {theory.author?.name ||
                    theory.author?.username ||
                    "Anonymous"}
                </span>
                <p className="truncate text-sm leading-snug text-foreground/80">
                  {theory.content}
                </p>
              </div>
              <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-muted">
                <FiThumbsUp size={12} />
                {theory._count.theoryUpvotes}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}