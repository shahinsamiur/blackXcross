"use client";

import { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { adminGroups } from "../../../../_mock/admin";

type GroupStatus = "Active" | "Archived";

const statusFilters: (GroupStatus | "All")[] = ["All", "Active", "Archived"];

export default function AdminGroupsPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<GroupStatus | "All">(
    "All"
  );

  const filteredGroups = useMemo(() => {
    return adminGroups.filter((group) => {
      const matchesQuery = group.name
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || group.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter]);

  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
        Groups
      </h1>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <FiSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            size={16}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search groups..."
            className="w-full rounded-lg border border-border bg-card py-2.5 pl-9 pr-3 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {statusFilters.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`rounded-lg border px-3 py-2 text-xs font-semibold ${
                statusFilter === status
                  ? "border-primary text-primary bg-primary/10"
                  : "border-border text-foreground/80 hover:border-primary/40"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full min-w-140 text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
              <th className="px-4 py-3 font-medium">Group</th>
              <th className="px-4 py-3 font-medium">Owner</th>
              <th className="px-4 py-3 font-medium">Members</th>
              <th className="px-4 py-3 font-medium">Created</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredGroups.map((group) => (
              <tr key={group.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-medium text-foreground/90">
                  {group.name}
                </td>
                <td className="px-4 py-3 text-foreground/80">
                  {group.ownerUsername}
                </td>
                <td className="px-4 py-3 text-foreground/80">
                  {group.memberCount}
                </td>
                <td className="px-4 py-3 text-foreground/80">
                  {group.createdAt}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-md border px-2 py-1 text-[11px] font-semibold uppercase ${
                      group.status === "Active"
                        ? "border-success text-success bg-success/10"
                        : "border-border text-muted bg-card"
                    }`}
                  >
                    {group.status}
                  </span>
                </td>
              </tr>
            ))}
            {filteredGroups.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-muted">
                  No groups match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}