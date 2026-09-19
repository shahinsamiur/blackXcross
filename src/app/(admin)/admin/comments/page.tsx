"use client";

import { useState } from "react";
import { FiSearch, FiTrash2 } from "react-icons/fi";
import {
  useGetAdminCommentsQuery,
  useDeleteAdminCommentMutation,
} from "../../../../state/redux/api/adminComments";

export default function AdminCommentsPage() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");

  const { data, isLoading, isFetching, isError } = useGetAdminCommentsQuery({
    page,
    limit: 20,
    search: search || undefined,
  });
  const [deleteComment, { isLoading: isDeleting }] = useDeleteAdminCommentMutation();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const items = data?.data.items ?? [];
  const pagination = data?.data.pagination;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(query);
    setPage(1);
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteComment(id).unwrap();
    } catch {
      alert("Failed to delete comment. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
        Comments
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
          placeholder="Search comments..."
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
            items.map((comment, i) => (
              <li
                key={comment.id}
                className={`flex w-full items-start justify-between gap-4 p-4 transition-colors hover:bg-white/2 ${
                  i !== items.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="flex min-w-0 flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-foreground/90">
                      {comment.user?.username || comment.user?.name || "Unknown"}
                    </span>
                    <span className="text-xs text-muted">
                      on {comment.theory?.title || "Unknown theory"} ·{" "}
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                    {comment.parentId && (
                      <span className="rounded-md border border-border px-1.5 py-0.5 text-[10px] font-semibold uppercase text-muted">
                        Reply
                      </span>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/70">
                    {comment.content}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleDelete(comment.id)}
                  disabled={isDeleting && deletingId === comment.id}
                  aria-label="Delete comment"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border text-foreground/80 transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary disabled:opacity-50"
                >
                  <FiTrash2 size={14} />
                </button>
              </li>
            ))}

          {!isLoading && isError && (
            <li className="p-6 text-center text-sm text-muted">
              Failed to load comments.
            </li>
          )}

          {!isLoading && !isError && items.length === 0 && (
            <li className="p-6 text-center text-sm text-muted">
              No comments match your search.
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