"use client";

import { useState } from "react";
import { FiSearch, FiThumbsUp, FiMessageSquare, FiTrash2 } from "react-icons/fi";
import {
  useGetAdminTheoriesQuery,
  useDeleteAdminTheoryMutation,
} from "../../../../state/redux/api/adminTheories";

export default function AdminTheoriesPage() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");

  const { data, isLoading, isFetching, isError } = useGetAdminTheoriesQuery({
    page,
    limit: 20,
    search: search || undefined,
  });
  const [deleteTheory, { isLoading: isDeleting }] = useDeleteAdminTheoryMutation();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const items = data?.data.items ?? [];
  const pagination = data?.data.pagination;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(query);
    setPage(1);
  };

  const handleRemove = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteTheory(id).unwrap();
    } catch {
      alert("Failed to remove theory. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
        Theories
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
          placeholder="Search theories..."
          className="w-full rounded-lg border border-border bg-card py-2.5 pl-9 pr-3 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none"
        />
      </form>

      <div className="rounded-xl border border-border bg-card">
        <ul className="flex flex-col">
          {isLoading &&
            Array.from({ length: 5 }).map((_, i) => (
              <li key={i} className="p-4">
                <div className="h-5 w-full animate-pulse rounded bg-border" />
              </li>
            ))}

          {!isLoading &&
            items.map((theory, i) => (
              <li
                key={theory.id}
                className={`flex items-center gap-3 p-4 ${
                  i !== items.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <p className="truncate text-sm font-medium text-foreground/90">
                    {theory.title}
                  </p>
                  <span className="text-xs text-muted">
                    by {theory.user?.username || theory.user?.name || "Unknown"} on{" "}
                    {theory.case?.title || "Unknown case"}
                  </span>
                </div>
                <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-muted">
                  <FiThumbsUp size={12} />
                  {theory._count?.upvotes ?? 0}
                </span>
                <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-muted">
                  <FiMessageSquare size={12} />
                  {theory._count?.comments ?? 0}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemove(theory.id)}
                  disabled={isDeleting && deletingId === theory.id}
                  aria-label="Remove theory"
                  className="flex shrink-0 items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-semibold text-foreground/80 hover:border-primary/40 hover:text-primary disabled:opacity-50"
                >
                  <FiTrash2 size={13} />
                  {isDeleting && deletingId === theory.id ? "Removing..." : "Remove"}
                </button>
              </li>
            ))}

          {!isLoading && isError && (
            <li className="p-6 text-center text-sm text-muted">
              Failed to load theories.
            </li>
          )}

          {!isLoading && !isError && items.length === 0 && (
            <li className="p-6 text-center text-sm text-muted">
              No theories match your search.
            </li>
          )}
        </ul>
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