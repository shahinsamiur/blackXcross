"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FiPlus, FiSearch } from "react-icons/fi";
import TornCard from "../../../components/ui/TornCard";
import ProfileAvatar from "../../../components/ProfileAvatar";
import GroupBadge from "../../../components/GroupBadge";
import { groups } from "../../../_mock/groups";
const filters = ["All", "Joined", "Public", "Private"] as const;
type Filter = (typeof filters)[number];
export default function GroupsPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("All");
  const filtered = useMemo(() => {
    return groups.filter((g) => {
      const matchesQuery = g.name.toLowerCase().includes(query.toLowerCase());
      const matchesFilter =
        filter === "All" ||
        (filter === "Joined" && g.joined) ||
        (filter === "Public" && g.visibility === "public") ||
        (filter === "Private" && g.visibility === "private");
      return matchesQuery && matchesFilter;
    });
  }, [query, filter]);
  return (
    <div className="flex flex-col gap-6 px-4 py-6 sm:px-6 lg:px-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl text-foreground/90 sm:text-3xl">
            Groups
          </h1>
          <p className="mt-1 text-sm text-muted">
            Discover and join investigation groups.
          </p>
        </div>
        <Link
          href="/groups/create"
          className="flex items-center justify-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-4 py-2.5 text-sm font-medium text-primary hover:bg-primary/20"
        >
          <FiPlus size={16} />
          Start New Group
        </Link>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative flex flex-1 items-center">
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
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                filter === f
                  ? "border-primary/40 bg-primary/10 text-primary"
                  : "border-border text-foreground/70 hover:bg-card"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((group) => (
          <TornCard key={group.id} className="flex flex-col gap-4 p-5">
            <div className="flex items-center gap-3">
              <ProfileAvatar src={group.avatar} alt={group.name} size={44} />
              <div className="min-w-0">
                <p className="truncate font-semibold text-foreground/90">
                  {group.name}
                </p>
                <GroupBadge
                  visibility={group.visibility}
                  activity={group.activity}
                />
              </div>
            </div>
            <p className="line-clamp-2 text-sm text-foreground/70">
              {group.description}
            </p>
            <div className="flex items-center justify-between text-xs text-muted">
              <span>{group.category}</span>
              <span>{group.memberCount} members</span>
            </div>
            <Link
              href={`/groups/${group.id}`}
              className="mt-auto flex items-center justify-center rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground/80 hover:border-primary/40 hover:text-primary"
            >
              {group.joined ? "View Group" : "Join Group"}
            </Link>
          </TornCard>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-muted">No groups match your search.</p>
        )}
      </div>
    </div>
  );
}
