"use client";

import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useGetAdminGroupsQuery } from "../../../../state/redux/api/adminGroups";

export default function AdminGroupsPage() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const { data, isLoading, isFetching, isError } = useGetAdminGroupsQuery({
    page,
    limit: 20,
    search: search || undefined,
  });

  const items = data?.data.items ?? [];
  const pagination = data?.data.pagination;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(query);
    setPage(1);
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
        Groups
      </h1>

      <form onSubmit={handleSearch} className="relative w-full max-w-sm">
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
      </form>

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full min-w-140 text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
              <th className="px-4 py-3 font-medium">Group</th>
              <th className="px-4 py-3 font-medium">Owner</th>
              <th className="px-4 py-3 font-medium">Members</th>
              <th className="px-4 py-3 font-medium">Created</th>
              <th className="px-4 py-3 font-medium">Visibility</th>
            </tr>
          </thead>
          <tbody>
            {isLoading &&
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <td colSpan={5} className="px-4 py-3">
                    <div className="h-4 w-full animate-pulse rounded bg-border" />
                  </td>
                </tr>
              ))}

            {!isLoading &&
              items.map((group) => {
                const owner = group.members?.[0]?.user;
                return (
                  <tr key={group.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-medium text-foreground/90">
                      {group.name}
                    </td>
                    <td className="px-4 py-3 text-foreground/80">
                      {owner?.username || owner?.name || "—"}
                    </td>
                    <td className="px-4 py-3 text-foreground/80">
                      {group._count?.members ?? 0}
                    </td>
                    <td className="px-4 py-3 text-foreground/80">
                      {new Date(group.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-md border px-2 py-1 text-[11px] font-semibold uppercase ${
                          group.isPrivate
                            ? "border-border text-muted bg-card"
                            : "border-success text-success bg-success/10"
                        }`}
                      >
                        {group.isPrivate ? "Private" : "Public"}
                      </span>
                    </td>
                  </tr>
                );
              })}

            {!isLoading && isError && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-muted">
                  Failed to load groups.
                </td>
              </tr>
            )}

            {!isLoading && !isError && items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-muted">
                  No groups match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between text-xs text-muted">
          <span>
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={page <= 1 || isFetching}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded-lg border border-border px-3 py-1.5 font-semibold text-foreground/80 disabled:opacity-40"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={page >= pagination.totalPages || isFetching}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-lg border border-border px-3 py-1.5 font-semibold text-foreground/80 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}