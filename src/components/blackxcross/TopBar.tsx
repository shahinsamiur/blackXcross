"use client";

import { FiBell, FiMail, FiChevronDown } from "react-icons/fi";
import SkullMark from "../../components/icons/SkullMark";
import GrungeOverlay from "./GrungeOverlay";
import ProfileAvatar from "./ProfileAvatar";
function IconBadge({ count }: { count: number }) {
  return (
    <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-semibold text-foreground">
      {count}
    </span>
  );
}

export default function Header() {
  return (
    <header className="relative overflow-hidden  bg-background flex-1">
      <GrungeOverlay />

      <div className="relative flex flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:flex-row lg:items-start lg:justify-between lg:px-10 ">
        <div className="flex items-center justify-end gap-3 lg:order-2 lg:shrink-0">
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground/80 hover:text-primary"
          >
            <FiBell size={18} />
            <IconBadge count={6} />
          </button>

          <button
            type="button"
            aria-label="Messages"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground/80 hover:text-primary"
          >
            <FiMail size={18} />
            <IconBadge count={3} />
          </button>

          <button
            type="button"
            className="flex items-center gap-1.5 text-foreground/80 hover:text-primary"
          >
            <ProfileAvatar
              src="/image/hero1.jpg"
              alt="Your profile"
              size={44}
            />
            <FiChevronDown size={16} />
          </button>
        </div>

        <div className="flex flex-col gap-2 lg:order-1">
          <div className="flex items-center gap-3 sm:gap-4">
            <h1 className="font-display text-5xl leading-none tracking-wide text-foreground/90 [text-shadow:0_2px_10px_rgba(0,0,0,0.65)] sm:text-6xl lg:text-7xl">
              BLACK<span className="text-primary">×</span>CROSS
            </h1>
            <SkullMark className="h-11 w-11 shrink-0 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] sm:h-14 sm:w-14 lg:h-16 lg:w-16" />
          </div>

          <p className="text-[11px] font-medium tracking-[0.25em] text-muted uppercase sm:text-xs">
            A crowdsourced public record investigative archive
          </p>
          <p className="text-[10px] tracking-[0.2em] text-muted/80 uppercase sm:text-xs">
            Exploring cold cases. Connecting investigators. Seeking the truth.
          </p>
        </div>
      </div>
    </header>
  );
}
