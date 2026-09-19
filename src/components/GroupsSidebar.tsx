"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import ProfileAvatar from "./ProfileAvatar";
import GroupBadge from "./GroupBadge";
import { joinedGroups } from "../_mock/groups";

export default function GroupsSidebar() {
  const pathname = usePathname();
  const [query, setQuery] = useState("");

  const activeGroupId = pathname.split("/")[2] ?? null;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return joinedGroups;
    return joinedGroups.filter((g) => g.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <aside className="flex flex-col gap-4 border-b border-border bg-background/60 px-4 py-4 sm:px-6 lg:w-72 lg:shrink-0 lg:border-b-0 lg:border-r lg:px-5 lg:py-6 xl:w-80">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold tracking-widest text-muted uppercase">
          My Groups
        </h2>
        <Link
          href="/groups/create"
          aria-label="Create group"
          className="text-muted hover:text-primary"
        >
          <FiPlus size={16} />
        </Link>
      </div>

      <label className="relative flex items-center">
        <FiSearch
          className="pointer-events-none absolute left-3 text-muted"
          size={16}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search groups"
          className="w-full rounded-lg border border-border bg-background py-2.5 pl-9 pr-3 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none"
        />
      </label>

      <ul className="flex gap-3 overflow-x-auto pb-1 lg:flex-col lg:gap-2 lg:overflow-visible lg:pb-0">
        {filtered.map((group) => {
          const isActive = activeGroupId === group.id;
          return (
            <li key={group.id} className="shrink-0 lg:shrink">
              <Link
                href={`/groups/${group.id}`}
                aria-current={isActive ? "page" : undefined}
                className={`flex w-40 items-center gap-3 rounded-lg border px-3 py-2.5 text-sm transition-colors lg:w-full ${
                  isActive
                    ? "border-primary/40 bg-primary/10 text-primary"
                    : "border-border/70 text-foreground/80 hover:bg-card"
                }`}
              >
                <ProfileAvatar src={group.avatar} alt={group.name} size={32} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium">
                    {group.name}
                  </span>
                  <span className="hidden lg:flex lg:items-center lg:gap-2">
                    <GroupBadge
                      visibility={group.visibility}
                      activity={group.activity}
                    />
                    <span className="text-xs text-muted">
                      · {group.memberCount} members
                    </span>
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
        {filtered.length === 0 && (
          <li className="px-1 text-sm text-muted">No groups found.</li>
        )}
      </ul>

      <Link
        href="/groups/create"
        className="flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground/80 hover:border-primary/40 hover:text-primary"
      >
        <FiPlus size={16} />
        Start New Group
      </Link>
    </aside>
  );
}
