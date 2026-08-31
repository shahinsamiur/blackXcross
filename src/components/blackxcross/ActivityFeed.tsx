import {
  FiMapPin,
  FiMessageCircle,
  FiPaperclip,
  FiMessageSquare,
} from "react-icons/fi";
import { activityItems, type ActivityIcon } from "../../_mock/blackxcross";

const iconMap: Record<ActivityIcon, typeof FiMapPin> = {
  pin: FiMapPin,
  comment: FiMessageCircle,
  attachment: FiPaperclip,
  message: FiMessageSquare,
};

export default function ActivityFeed() {
  return (
    <section className="flex flex-col gap-5 rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-tight tracking-wide text-foreground/80 uppercase">
          Latest Community Activity
        </h2>
        <button
          type="button"
          className="text-xs font-semibold text-primary hover:opacity-80"
        >
          View All
        </button>
      </div>

      <ul className="flex flex-col gap-5">
        {activityItems.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <li
              key={item.id}
              className="flex gap-3 justify-between! w-full items-start "
            >
              <span className=" flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon size={16} />
              </span>
              <div className="flex flex-1 flex-col gap-1">
                <p className="text-sm leading-snug text-foreground/90">
                  <span className="text-xs text-foreground">{item.actor}</span>{" "}
                  {item.action}
                  <div className="font-semibold text-foreground">
                    {item.target}
                  </div>
                </p>
                <div className="flex items-center gap-2 text-xs text-muted">
                  <span>{item.timeAgo}</span>
                  {item.meta && (
                    <span className="flex items-center gap-1">
                      <FiMessageCircle size={12} />
                      {item.meta}
                    </span>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
