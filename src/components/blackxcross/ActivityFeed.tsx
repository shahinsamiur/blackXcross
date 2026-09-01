import { FiFlag, FiMessageSquare, FiPaperclip, FiImage } from "react-icons/fi";
import { activityItems, type ActivityIcon } from "../../_mock/blackxcross";
import Image from "next/image";

function ActivityIndicator({
  icon,
  meta,
}: {
  icon: ActivityIcon;
  meta?: string;
}) {
  switch (icon) {
    case "pin":
      return (
        <div className="flex shrink-0 items-center gap-2 pt-1">
          <FiFlag size={16} className="text-muted" />
          <span className="h-2.5 w-2.5 rounded-full bg-primary" />
        </div>
      );
    case "comment":
      return (
        <div className="flex shrink-0 items-center gap-1 pt-1 text-xs text-muted">
          <FiMessageSquare size={16} />
          {meta && <span>{meta}</span>}
        </div>
      );
    case "attachment":
      return (
        <div className="flex shrink-0 items-center pt-1">
          <FiPaperclip size={16} className="text-muted" />
        </div>
      );
    case "message":
      return (
        <div className="flex shrink-0 items-center pt-1">
          <FiImage size={16} className="text-muted" />
        </div>
      );
    default:
      return null;
  }
}

export default function ActivityFeed() {
  return (
    <section className="flex flex-col gap-5 rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-tight tracking-wide text-foreground/80 uppercase">
          Latest Community Activity
        </h2>

        <button
          type="button"
          className="text-xs font-semibold text-foreground/80 hover:opacity-80"
        >
          View All
        </button>
      </div>

      <ul className="flex flex-col gap-5">
        {activityItems.map((item) => {
          return (
            <li
              key={item.id}
              className="flex w-full items-start justify-between gap-3"
            >
              <div className="relative shrink-0">
                <div className="h-12 w-12 overflow-hidden rounded-full border border-border bg-card">
                  <Image
                    src={item.avatar}
                    alt={item.actor}
                    width={900}
                    height={900}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="absolute -left-0.5 top-0.5 h-2 w-2 rounded-full bg-primary" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="text-sm leading-relaxed text-foreground/90">
                  <span className="text-xs text-foreground/80">
                    {item.actor}
                  </span>{" "}
                  {item.action}
                </div>

                <div className="text-base font-medium leading-relaxed text-foreground/80 sm:text-lg">
                  {item.target}
                </div>

                <span className="mt-0.5 text-xs text-muted">
                  {item.timeAgo}
                </span>
              </div>
              <ActivityIndicator icon={item.icon} meta={item.meta} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
