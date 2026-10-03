"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/state/redux/store";
import { logout } from "@/src/state/redux/slices/authSlice";
import { useLogoutMutation } from "@/src/state/redux/api/auth";
import Image from "next/image";
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
  if (!count) return null;
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

function DropdownPanel({
  title,
  footerHref,
  footerLabel,
  children,
}: {
  title: string;
  footerHref?: string;
  footerLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="absolute right-0 top-full z-50 mt-2 w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-border bg-card shadow-xl">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </div>
      {children}
      {footerHref && footerLabel && (
        <Link
          href={footerHref}
          className="block border-t border-border px-4 py-2.5 text-center text-xs font-semibold text-primary hover:bg-background"
        >
          {footerLabel}
        </Link>
      )}
    </div>
  );
}

function EmptyDropdownState({ label }: { label: string }) {
  return (
    <div className="px-4 py-8 text-center text-xs text-muted">{label}</div>
  );
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  );
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fix: Use the RTK Query logout mutation to hit the backend
  const [logoutMutation] = useLogoutMutation();

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

  // Fix: Call backend API, then update Redux state and redirect
  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      dispatch(logout());
      router.push("/");
    }
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
                <DropdownPanel
                  title="Notifications"
                  footerHref="/notifications"
                  footerLabel="View all notifications"
                >
                  {placeholderNotifications.length === 0 ? (
                    <EmptyDropdownState label="You're all caught up." />
                  ) : (
                    <ul className="max-h-80 overflow-y-auto">
                      {placeholderNotifications.map((n) => (
                        <li
                          key={n.id}
                          className="flex gap-3 border-b border-border px-4 py-3 last:border-b-0 hover:bg-background"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm leading-snug text-foreground/90">
                              {n.text}
                            </p>
                            <span className="mt-1 block text-xs text-muted">
                              {n.time}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
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
                <DropdownPanel
                  title="Messages"
                  footerHref="/notifications"
                  footerLabel="View all messages"
                >
                  {placeholderMessages.length === 0 ? (
                    <EmptyDropdownState label="No messages yet." />
                  ) : (
                    <ul className="max-h-80 overflow-y-auto">
                      {placeholderMessages.map((m) => (
                        <li
                          key={m.id}
                          className="flex gap-3 border-b border-border px-4 py-3 last:border-b-0 hover:bg-background"
                        >
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                            {getInitials(m.from)}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-foreground/90">
                              {m.from}
                            </p>
                            <p className="mt-0.5 truncate text-sm leading-snug text-muted">
                              {m.text}
                            </p>
                            <span className="mt-1 block text-xs text-muted">
                              {m.time}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
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
                  <div className="absolute right-0 top-full z-50 mt-2 w-[min(16rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-border bg-card shadow-xl">
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
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-2 lg:order-1 w-full">
          <div className="flex min-w-0 flex-wrap items-center justify-center gap-2 sm:gap-4  w-full">
            <Image
              src="/image/logo.png"
              alt="BLACK×CROSS"
              className="h-24 w-auto object-contain xs:h-28 sm:h-32 md:h-36 lg:h-44"
              width={1000}
              height={800}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
