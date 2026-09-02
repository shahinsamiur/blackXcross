import { FiBell, FiPaperclip, FiMessageCircle, FiMapPin } from "react-icons/fi";

// Placeholder: mirrors the shape of placeholderNotifications in Header.tsx
// (which isn't exported) until a real notifications data source exists.
const notifications = [
  {
    id: "n1",
    icon: "attachment",
    text: "ForensicPhil uploaded new evidence in Hinterkaifeck Murders Revisited",
    time: "5 min ago",
  },
  {
    id: "n2",
    icon: "message",
    text: "Your theory received 12 new upvotes",
    time: "1 hour ago",
  },
  {
    id: "n3",
    icon: "pin",
    text: "Alpine Anomaly Team posted an update",
    time: "3 hours ago",
  },
] as const;

const iconMap = {
  attachment: FiPaperclip,
  message: FiMessageCircle,
  pin: FiMapPin,
};

export default function NotificationsPage() {
  return (
    <div className="flex w-full flex-col gap-6 px-4 pb-8 sm:px-6 lg:px-8">
      <div className="flex items-center gap-2">
        <FiBell size={18} className="text-muted" />
        <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
          Notifications
        </h1>
      </div>

      {notifications.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {notifications.map((n) => {
            const Icon = iconMap[n.icon];
            return (
              <li
                key={n.id}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-background text-primary">
                  <Icon size={16} />
                </span>
                <div className="flex min-w-0 flex-col gap-1">
                  <p className="text-sm leading-snug text-foreground/90">
                    {n.text}
                  </p>
                  <span className="text-xs text-muted">{n.time}</span>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="rounded-lg border border-border bg-card p-6 text-sm text-muted">
          You&apos;re all caught up.
        </p>
      )}
    </div>
  );
}
