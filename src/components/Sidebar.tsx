"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/src/state/redux/store";
import {
  FiMenu,
  FiX,
  FiHome,
  FiCalendar,
  FiUsers,
  FiUser,
  FiPlus,
  FiSearch,
} from "react-icons/fi";
import { myGroups, myContacts, sidebarNav } from "../_mock/blackxcross";
import RequireAuthModal from "@/src/components/ui/RequireAuthModal";

const navIcons = {
  home: FiHome,
  archives: FiCalendar,
  "community-hub": FiUsers,
  "my-dossier": FiUser,
};

function SidebarContent() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [authModalTarget, setAuthModalTarget] = useState<string | null>(null);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    if (!isAuthenticated) {
      e.preventDefault();
      setAuthModalTarget(href);
    }
  };

  return (
    <div className="flex h-full flex-col gap-8 overflow-y-auto px-6 py-6">
      <nav className="flex flex-col gap-1">
        {sidebarNav.map((item) => {
          const Icon = navIcons[item.id as keyof typeof navIcons];
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "border-primary/40 bg-primary/10 text-primary"
                  : "border-transparent text-foreground/80 hover:bg-card"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-semibold tracking-widest text-muted uppercase">
            My Groups
          </h2>
          <button
            type="button"
            aria-label="Create group"
            className="text-muted hover:text-primary"
          >
            <FiPlus size={16} />
          </button>
        </div>
        <ul className="flex flex-col gap-3">
          {myGroups.map((group) => (
            <li
              key={group.id}
              className="flex items-center! justify-between! gap-2 text-sm text-foreground/90 w-full"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full text-muted bg-card border border-gray-800"></span>
              <span className="flex-1 truncate text-foreground/80 text-nowrap">
                {group.name}
              </span>
              <span className="flex shrink-0 items-center gap-1.5 text-xs text-foreground/50">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                {group.memberCount}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-semibold tracking-widest text-muted uppercase">
            My Contacts
          </h2>
          <button
            type="button"
            aria-label="Add contact"
            className="text-muted hover:text-primary"
          >
            <FiPlus size={16} />
          </button>
        </div>
        <ul className="flex flex-col gap-3">
          {myContacts.map((contact, i) => (
            <li
              key={`${contact.id}-${i}`}
              className="flex items-center gap-2 text-sm text-foreground/80"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-card text-muted">
                <FiUser size={14} />
              </span>
              <span className="truncate">{contact.name}</span>
              {contact.online && (
                <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
              )}
            </li>
          ))}
        </ul>
      </div>

      <Link
        href="/groups/create"
        type="button"
        className="flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground/80 hover:border-primary/40 hover:text-primary"
      >
        <FiPlus size={16} />
        Start New Group
      </Link>

      <label className="relative flex items-center">
        <FiSearch
          className="pointer-events-none absolute left-3 text-muted"
          size={16}
        />
        <input
          type="text"
          placeholder="Find Contacts"
          className="w-full rounded-lg border border-border bg-background py-2.5 pl-9 pr-3 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none"
        />
      </label>

      <div className="mt-auto rounded-lg border border-border bg-card p-5">
        <p className="text-sm italic leading-relaxed text-foreground/80">
          &ldquo;The truth is out there. The cases are here.&rdquo;
        </p>
        <p className="mt-2 text-xs text-muted">— BLACK×CROSS</p>
      </div>

      {authModalTarget && (
        <RequireAuthModal
          isOpen={true}
          onClose={() => setAuthModalTarget(null)}
          targetPath={authModalTarget}
        />
      )}
    </div>
  );
}

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="flex h-16 items-center gap-3 border-b border-border px-4 sm:px-6 lg:hidden">
        <button
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setMobileOpen((v) => !v)}
          className="text-foreground"
        >
          {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
        <span className="text-base font-black tracking-wide sm:text-lg">
          BLACK×CROSS
        </span>
      </div>

      <aside className="hidden w-64 shrink-0 border-r border-border lg:flex lg:flex-col xl:w-72">
        <div className="flex h-20 items-center gap-3 border-b border-border px-6">
          <FiMenu size={20} className="text-muted" />
          <span className="text-xl font-black tracking-wide">BLACK×CROSS</span>
        </div>
        <SidebarContent />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            className="absolute inset-0 bg-background/80"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative z-50 flex h-full w-[85%] max-w-xs flex-col border-r border-border bg-background sm:w-80 md:w-96">
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-4 sm:h-20 sm:px-6">
              <span className="text-base font-black tracking-wide sm:text-lg">
                BLACK×CROSS
              </span>
              <button
                type="button"
                aria-label="Close navigation"
                onClick={() => setMobileOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-foreground/80 hover:bg-card hover:text-primary"
              >
                <FiX size={20} />
              </button>
            </div>
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
}