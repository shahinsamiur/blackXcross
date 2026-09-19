"use client";

import { useState } from "react";
import Link from "next/link";
import {
  useGetModerationQueueQuery,
  type ModerationItem,
} from "../../../../state/redux/api/moderation";

const statusFilters = ["All", "PENDING", "APPROVED", "REJECTED"] as const;
const targetTypeFilters = ["All", "CASE", "THEORY", "COMMENT"] as const;

const statusStyles: Record<ModerationItem["status"], string> = {
  PENDING: "border-primary text-primary bg-primary/10",
  APPROVED: "border-success text-success bg-success/10",
  REJECTED: "border-border text-muted bg-card",
};

const statusLabels: Record<ModerationItem["status"], string> = {
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
};

export default function AdminModerationPage() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] =
    useState<(typeof statusFilters)[number]>("All");
  const [targetTypeFilter, setTargetTypeFilter] =
    useState<(typeof targetTypeFilters)[number]>("All");

  const { data, isLoading, isFetching, isError } = useGetModerationQueueQuery({
    page,
    limit: 20,
    status: statusFilter === "All" ? undefined : statusFilter,
    targetType: targetTypeFilter === "All" ? undefined : targetTypeFilter,
  });

  const items = data?.data.items ?? [];
  const pagination = data?.data.pagination;

  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
        Moderation
      </h1>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {statusFilters.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => {
                setStatusFilter(status);
                setPage(1);
              }}
              className={`rounded-lg border px-3 py-2 text-xs font-semibold ${
                statusFilter === status
                  ? "border-primary text-primary bg-primary/10"
                  : "border-border text-foreground/80 hover:border-primary/40"
              }`}
            >
              {status === "All" ? "All" : statusLabels[status]}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {targetTypeFilters.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => {
                setTargetTypeFilter(type);
                setPage(1);
              }}
              className={`rounded-lg border px-3 py-2 text-xs font-semibold ${
                targetTypeFilter === type
                  ? "border-primary text-primary bg-primary/10"
                  : "border-border text-foreground/80 hover:border-primary/40"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full min-w-160 text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">AI Flag Reason</th>
              <th className="px-4 py-3 font-medium">Reviewer</th>
              <th className="px-4 py-3 font-medium">Flagged At</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {isLoading &&
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <td colSpan={6} className="px-4 py-3">
                    <div className="h-4 w-full animate-pulse rounded bg-border" />
                  </td>
                </tr>
              ))}

            {!isLoading &&
              items.map((item) => (
                <tr key={item.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-medium text-foreground/90">
                    {item.targetType}
                  </td>
                  <td className="px-4 py-3 text-muted">{item.reason || "—"}</td>
                  <td className="px-4 py-3 text-foreground/80">
                    {item.reviewer?.username || item.reviewer?.name || "—"}
                  </td>
                  <td className="px-4 py-3 text-foreground/80">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-md border px-2 py-1 text-[11px] font-semibold uppercase ${statusStyles[item.status]}`}
                    >
                      {statusLabels[item.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/moderation/${item.id}`}
                      className="text-xs font-semibold text-primary hover:opacity-80"
                    >
                      Review
                    </Link>
                  </td>
                </tr>
              ))}

            {!isLoading && isError && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-muted">
                  Failed to load moderation queue.
                </td>
              </tr>
            )}

            {!isLoading && !isError && items.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-muted">
                  No flagged content matches your filters.
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