"use client";

import { useState } from "react";
import Link from "next/link";
import { useGetAdminReportsQuery } from "../../../../state/redux/api/admin";
const statusFilters = ["All", "PENDING", "REVIEWED", "RESOLVED", "DISMISSED"] as const;
const targetTypeFilters = ["All", "CASE", "THEORY", "COMMENT", "USER", "MESSAGE"] as const;
const statusStyles: Record<string, string> = {
  PENDING: "border-primary text-primary bg-primary/10",
  REVIEWED: "border-primary text-primary bg-primary/10",
  RESOLVED: "border-success text-success bg-success/10",
  DISMISSED: "border-border text-muted bg-card",
};

const statusLabels: Record<string, string> = {
  PENDING: "Pending",
  REVIEWED: "Reviewed",
  RESOLVED: "Resolved",
  DISMISSED: "Dismissed",
};

export default function AdminReportsPage() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] =
    useState<(typeof statusFilters)[number]>("All");
  const [targetTypeFilter, setTargetTypeFilter] =
    useState<(typeof targetTypeFilters)[number]>("All");
  const { data, isLoading, isFetching, isError } = useGetAdminReportsQuery({
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
        Reports
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
              <th className="px-4 py-3 font-medium">Reporter</th>
              <th className="px-4 py-3 font-medium">Reason</th>
              <th className="px-4 py-3 font-medium">Reported At</th>
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
              items.map((report) => (
                <tr key={report.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-medium text-foreground/90">
                    {report.targetType}
                  </td>
                  <td className="px-4 py-3 text-foreground/80">
                    {report.reporter?.username || report.reporter?.name || "—"}
                  </td>
                  <td className="px-4 py-3 text-muted">
                    <span className="line-clamp-1">{report.reason}</span>
                  </td>
                  <td className="px-4 py-3 text-foreground/80">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-md border px-2 py-1 text-[11px] font-semibold uppercase ${statusStyles[report.status]}`}
                    >
                      {statusLabels[report.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/reports/${report.id}`}
                      className="text-xs font-semibold text-primary hover:opacity-80"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}

            {!isLoading && isError && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-muted">
                  Failed to load reports.
                </td>
              </tr>
            )}

            {!isLoading && !isError && items.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-muted">
                  No reports match your filters.
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