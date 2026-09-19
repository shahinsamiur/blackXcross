"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/state/redux/store";
import { logout } from "@/src/state/redux/slices/authSlice";
import { GiCrossMark } from "react-icons/gi";
import {
  FiBell,
  FiMail,
  FiChevronDown,
  FiUser,
  FiSettings,
  FiLogOut,
  FiLogIn,
} from "react-icons/fi";
import GrungeOverlay from "./GrungeOverlay";
import ProfileAvatar from "./ProfileAvatar";

function IconBadge({ count }: { count: number }) {
  return (
    <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-semibold text-foreground">
      {count}
    </span>
  );
}

const placeholderNotifications = [
  {
    id: "n1",
    text: "ForensicPhil uploaded new evidence in Hinterkaifeck Murders Revisited",
    time: "5 min ago",
  },
  { id: "n2", text: "Your theory received 12 new upvotes", time: "1 hour ago" },
  {
    id: "n3",
    text: "Alpine Anomaly Team posted an update",
    time: "3 hours ago",
  },
];

const placeholderMessages = [
  {
    id: "m1",
    from: "TrueCrimeJane",
    text: "Did you see the new radio signal data?",
    time: "10 min ago",
  },
  {
    id: "m2",
    from: "Investigator_X",
    text: "Joining the 1984 Highway Slip thread.",
    time: "2 hours ago",
  },
];

type OpenMenu = "notifications" | "messages" | "profile" | null;

function DropdownPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute right-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-lg border border-border bg-card shadow-xl sm:w-80">
      {children}
    </div>
  );
}

export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (menu: OpenMenu) => {
    setOpenMenu((current) => (current === menu ? null : menu));
  };

  const handleLogout = () => {
    document.cookie = "token=; path=/; max-age=0";
    document.cookie = "refreshToken=; path=/; max-age=0";
    dispatch(logout());
    router.push("/");
  };

  return (
    <header className="relative bg-background flex-1">
      <GrungeOverlay />
      <div className="relative flex flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:flex-row lg:items-start lg:justify-between lg:px-10">
        <div
          ref={containerRef}
          className="flex items-center justify-end gap-3 lg:order-2 lg:shrink-0"
        >
          {isAuthenticated && (
            <div className="relative">
              <button
                type="button"
                aria-label="Notifications"
                onClick={() => toggleMenu("notifications")}
                className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground/80 hover:text-primary sm:h-10 sm:w-10 cursor-pointer"
              >
                <FiBell size={16} className="sm:hidden" />
                <FiBell size={18} className="hidden sm:block" />
                <IconBadge count={placeholderNotifications.length} />
              </button>

              {openMenu === "notifications" && (
                <DropdownPanel>
                  <div className="border-b border-border px-4 py-3">
                    <h3 className="text-sm font-semibold text-foreground">
                      Notifications
                    </h3>
                  </div>
                  <ul className="max-h-96 overflow-y-auto">
                    {placeholderNotifications.map((n) => (
                      <li
                        key={n.id}
                        className="border-b border-border px-4 py-3 text-sm text-foreground/80 last:border-b-0 hover:bg-background"
                      >
                        <p className="leading-snug">{n.text}</p>
                        <span className="mt-1 block text-xs text-muted">
                          {n.time}
                        </span>
                      </li>
                    ))}
                  </ul>
                </DropdownPanel>
              )}
            </div>
          )}

          {isAuthenticated && (
            <div className="relative">
              <button
                type="button"
                aria-label="Messages"
                onClick={() => toggleMenu("messages")}
                className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground/80 hover:text-primary sm:h-10 sm:w-10 cursor-pointer"
              >
                <FiMail size={16} className="sm:hidden" />
                <FiMail size={18} className="hidden sm:block" />
                <IconBadge count={placeholderMessages.length} />
              </button>

              {openMenu === "messages" && (
                <DropdownPanel>
                  <div className="border-b border-border px-4 py-3">
                    <h3 className="text-sm font-semibold text-foreground">
                      Messages
                    </h3>
                  </div>
                  <ul className="max-h-72 overflow-y-auto">
                    {placeholderMessages.map((m) => (
                      <li
                        key={m.id}
                        className="border-b border-border px-4 py-3 text-sm text-foreground/80 last:border-b-0 hover:bg-background"
                      >
                        <p className="font-medium text-foreground/90">{m.from}</p>
                        <p className="mt-0.5 truncate leading-snug text-foreground/70">
                          {m.text}
                        </p>
                        <span className="mt-1 block text-xs text-muted">
                          {m.time}
                        </span>
                      </li>
                    ))}
                  </ul>
                </DropdownPanel>
              )}
            </div>
          )}

          <div className="relative">
            {!isAuthenticated ? (
              <Link
                href="/auth/login"
                className="flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-3 py-2 text-sm font-medium text-primary hover:bg-primary/20 cursor-pointer"
              >
                <FiLogIn size={16} />
                <span className="hidden sm:inline">Sign In</span>
              </Link>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => toggleMenu("profile")}
                  className="flex items-center gap-1.5 text-foreground/80 hover:text-primary cursor-pointer"
                >
                  {user?.avatarUrl ? (
                    <ProfileAvatar
                      src={user.avatarUrl}
                      alt={user.username || "Profile"}
                      size={40}
                    />
                  ) : (
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground/80">
                      <FiUser size={20} />
                    </span>
                  )}
                  <FiChevronDown size={16} />
                </button>
                {openMenu === "profile" && (
                  <DropdownPanel>
                    <ul className="py-1">
                      <li>
                        <Link
                          href="/my-dossier"
                          className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-foreground/80 hover:bg-background hover:text-primary"
                        >
                          <FiUser size={16} />
                          View Profile
                        </Link>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-foreground/80 hover:bg-background hover:text-primary"
                        >
                          <FiSettings size={16} />
                          Settings
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="flex w-full items-center gap-2.5 border-t border-border px-4 py-2.5 text-left text-sm text-primary hover:bg-background cursor-pointer"
                        >
                          <FiLogOut size={16} />
                          Log Out
                        </button>
                      </li>
                    </ul>
                  </DropdownPanel>
                )}
              </>
            )}
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-2 lg:order-1">
          <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-4">
            <h1 className="font-display min-w-0 wrap-break-word text-3xl leading-none w-full flex tracking-wide text-foreground/90 [text-shadow:0_2px_10px_rgba(0,0,0,0.65)] xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              BLACK<span className="text-primary"><GiCrossMark /></span>CROSS
            </h1>
          </div>
          <p className="text-[10px] font-medium tracking-[0.2em] text-muted/80 uppercase sm:text-[11px] sm:tracking-[0.25em] md:text-xs">
            A crowdsourced public record investigative archive
          </p>
          <p className="text-[9px] tracking-[0.15em] text-muted/80 uppercase sm:text-[10px] sm:tracking-[0.2em] md:text-xs">
            Exploring cold cases. Connecting investigators. Seeking the truth.
          </p>
        </div>
      </div>
    </header>
  );
}