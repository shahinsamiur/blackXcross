"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { IoBriefcaseSharp } from "react-icons/io5";
import { myGroups, myContacts, sidebarNav } from "../_mock/blackxcross";
import RequireAuthModal from "@/src/components/ui/RequireAuthModal";

const navIcons = {
  home: FiHome,
  archives: FiCalendar,
  "community-hub": FiUsers,
  "my-dossier": FiUser,
  case: IoBriefcaseSharp,
};

function SidebarContent() {
  const pathname = usePathname();
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
                  ? "border-transparent border-l-primary bg-[linear-gradient(90deg,rgba(196,30,58,0.25),transparent)] text-red-400"
                  : "border-transparent text-gray-400 hover:bg-primary/10 hover:text-white"
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
              <span className="relative flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-800 bg-card text-muted">
                {group.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={group.avatar}
                    alt={group.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <FiUsers size={14} />
                )}
              </span>
              <span className="flex-1 truncate text-gray-300 text-nowrap">
                {group.name}
              </span>
              <span className="flex shrink-0 items-center gap-1.5 text-xs text-muted">
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
              className="flex items-center gap-2 text-sm text-gray-300"
            >
              <span className="relative flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-card text-muted">
                {contact.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <FiUser size={14} />
                )}
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
        className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-[#3d0a12]/40 px-4 py-2.5 text-sm font-medium text-gray-200 hover:border-primary/40 hover:text-primary"
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
          className="w-full rounded-lg border border-border bg-[#1a1a1a] py-2.5 pl-9 pr-3 text-sm text-foreground placeholder:text-gray-600 focus:border-[#7a1526] focus:outline-none"
        />
      </label>

      <div className="mt-auto rounded-lg border border-[#3d0a12]/20 bg-card p-5">
        <p className="text-sm italic leading-relaxed text-gray-500">
          &ldquo;The truth is out there. The cases are here.&rdquo;
        </p>
        <p className="mt-2 text-xs text-[#9b1b30]">— BLACK×CROSS</p>
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
      <div className="flex h-16 items-center gap-3 border-b border-[#3d0a12]/30 px-4 sm:px-6 lg:hidden">
        <button
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setMobileOpen((v) => !v)}
          className="text-foreground"
        >
          {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
        <span className="text-base font-black tracking-wide text-white sm:text-lg">
          BLACK×CROSS
        </span>
      </div>

      <aside className="hidden w-64 shrink-0 border-r border-[#3d0a12]/40 bg-card lg:flex lg:flex-col xl:w-72">
        <div className="flex h-20 items-center gap-3 border-b border-[#3d0a12]/30 px-6">
          {/* <FiMenu size={20} className="text-muted" /> */}
          <span className="text-xl font-black tracking-wide text-white">
            BLACKXCROSS
          </span>
        </div>
        <SidebarContent />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative z-50 flex h-full w-[85%] max-w-xs flex-col border-r border-[#3d0a12]/40 bg-card sm:w-80 md:w-96">
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-[#3d0a12]/30 px-4 sm:h-20 sm:px-6">
              <span className="text-base font-black tracking-wide text-white sm:text-lg">
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