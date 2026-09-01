import { FaFire } from "react-icons/fa6";
import { FiThumbsUp } from "react-icons/fi";
import { trendingTheories } from "../../_mock/blackxcross";

export default function TrendingTheories() {
  return (
    <section className="flex flex-col gap-5 rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold tracking-wide text-foreground/80 uppercase">
          Trending Theories
        </h2>
        <button
          type="button"
          className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-foreground/80 hover:bg-primary/10 hover:opacity-90"
        >
          View All
        </button>
      </div>

      <ul className="flex flex-col">
        {trendingTheories.map((theory, index) => (
          <li
            key={theory.id}
            className={`flex items-center gap-3 py-4 ${
              index !== trendingTheories.length - 1
                ? "border-b border-border"
                : ""
            }`}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <FaFire size={16} />
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
