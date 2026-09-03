"use client";

import { useState } from "react";
import { FiBell, FiPaperclip, FiMessageCircle, FiMapPin } from "react-icons/fi";

type NotificationIcon = "attachment" | "message" | "pin";

interface Notification {
  id: string;
  icon: NotificationIcon;
  text: string;
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: "n1",
    icon: "attachment",
    text: "ForensicPhil uploaded new evidence in Hinterkaifeck Murders Revisited",
    time: "5 min ago",
    read: false,
  },
  {
    id: "n2",
    icon: "message",
    text: "Your theory received 12 new upvotes",
    time: "1 hour ago",
    read: false,
  },
  {
    id: "n3",
    icon: "pin",
    text: "Alpine Anomaly Team posted an update",
    time: "3 hours ago",
    read: true,
  },
];

const iconMap = {
  attachment: FiPaperclip,
  message: FiMessageCircle,
  pin: FiMapPin,
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(
    initialNotifications.map((n) => ({ ...n })),
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  const toggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="flex w-full flex-col gap-6 px-4 pb-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FiBell size={18} className="text-muted" />
          <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
            Notifications
          </h1>
          {unreadCount > 0 && (
            <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-foreground">
              {unreadCount}
            </span>
          )}
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={markAllAsRead}
            className="text-sm font-medium text-primary hover:underline cursor-pointer"
          >
            Mark all as read
          </button>
        )}
      </div>

      {notifications.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {notifications.map((n) => {
            const Icon = iconMap[n.icon];
            return (
              <li
                key={n.id}
                onClick={() => toggleRead(n.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleRead(n.id);
                  }
                }}
                className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
                  n.read
                    ? "border-border bg-card"
                    : "border-primary/40 bg-card ring-1 ring-primary/20"
                }`}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-background text-primary">
                  <Icon size={16} />
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <p className="text-sm leading-snug text-foreground/90">
                    {n.text}
                  </p>
                  <span className="text-xs text-muted">{n.time}</span>
                </div>
                {!n.read && (
                  <span
                    aria-label="Unread"
                    className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary"
                  />
                )}
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
