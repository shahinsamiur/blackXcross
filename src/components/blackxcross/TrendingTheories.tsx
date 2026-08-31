import { FiZap, FiThumbsUp } from "react-icons/fi";
import { trendingTheories } from "../../_mock/blackxcross";

export default function TrendingTheories() {
  return (
    <section className="flex flex-col gap-5 rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold tracking-wide text-foreground uppercase">
          Trending Theories
        </h2>
        <button
          type="button"
          className="text-xs font-semibold text-primary hover:opacity-80"
        >
          View All
        </button>
      </div>

      <ul className="flex flex-col gap-4">
        {trendingTheories.map((theory) => (
          <li key={theory.id} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <FiZap size={14} />
            </span>
            <p className="flex-1 text-sm leading-snug text-foreground/90">
              {theory.text}
            </p>
            <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-muted">
              <FiThumbsUp size={12} />
              {theory.likes}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
