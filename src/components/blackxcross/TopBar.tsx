"use client";

import { FiBell, FiMail, FiChevronDown, FiUser } from "react-icons/fi";

export default function TopBar() {
  return (
    <div className="flex items-center justify-end gap-4 px-4 py-4 sm:px-6 lg:px-8">
      <button
        type="button"
        aria-label="Notifications"
        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground/80 hover:text-primary"
      >
        <FiBell size={18} />
        <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-semibold text-background">
          6
        </span>
      </button>

      <button
        type="button"
        aria-label="Messages"
        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground/80 hover:text-primary"
      >
        <FiMail size={18} />
        <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-semibold text-background">
          3
        </span>
      </button>

      <button
        type="button"
        className="flex items-center gap-2 rounded-full border border-border bg-card py-1 pl-1 pr-3 text-foreground/80 hover:text-primary"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-background text-muted">
          <FiUser size={16} />
        </span>
        <FiChevronDown size={16} />
      </button>
    </div>
  );
}
