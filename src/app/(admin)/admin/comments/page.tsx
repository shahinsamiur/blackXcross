"use client";

import { useMemo, useState } from "react";
import { FiSearch, FiEye, FiEyeOff } from "react-icons/fi";
import {
  adminComments as initialComments,
  type AdminComment,
  type AdminCommentStatus,
} from "../../../../_mock/admin";

const statusFilters: (AdminCommentStatus | "All")[] = [
  "All",
  "Visible",
  "Hidden",
  "Flagged",
];

const statusStyles: Record<AdminCommentStatus, string> = {
  Visible: "border-success text-success bg-success/10",
  Hidden: "border-border text-muted bg-card",
  Flagged: "border-primary text-primary bg-primary/10",
};

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<AdminComment[]>(initialComments);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<AdminCommentStatus | "All">(
    "All",
  );

  const toggleVisibility = (id: string) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: c.status === "Hidden" ? "Visible" : "Hidden" }
          : c,
      ),
    );
  };

  const filteredComments = useMemo(() => {
    return comments.filter((comment) => {
      const matchesQuery = comment.text
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || comment.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [comments, query, statusFilter]);

  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
        Comments
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
            placeholder="Search comments..."
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

      <div className="rounded-xl border border-border bg-card">
        <ul className="flex flex-col">
          {filteredComments.map((comment, i) => (
            <li
              key={comment.id}
              className={`flex w-full! items-start! justify-between! gap-4 p-4 transition-colors  hover:bg-white/2 ${
                comment.status === "Hidden" ? "opacity-60" : ""
              } ${
                i !== filteredComments.length - 1
                  ? "border-b border-border"
                  : ""
              }`}
            >
              <div className="flex min-w-0 flex-col gap-1 ">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-foreground/90">
                    {comment.author}
                  </span>
                  <span className="text-xs text-muted">
                    on {comment.caseLabel} · {comment.postedAt}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-foreground/70">
                  {comment.text}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <span
                  className={`rounded-md border px-2 py-1 text-[11px] font-semibold uppercase ${statusStyles[comment.status]}`}
                >
                  {comment.status}
                </span>
                <button
                  type="button"
                  onClick={() => toggleVisibility(comment.id)}
                  aria-label={
                    comment.status === "Hidden"
                      ? "Show comment"
                      : "Hide comment"
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-foreground/80 transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                >
                  {comment.status === "Hidden" ? (
                    <FiEye size={14} />
                  ) : (
                    <FiEyeOff size={14} />
                  )}
                </button>
              </div>
            </li>
          ))}
          {filteredComments.length === 0 && (
            <li className="p-6 text-center text-sm text-muted">
              No comments match your search.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
