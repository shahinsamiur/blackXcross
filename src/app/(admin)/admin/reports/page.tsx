"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { adminReports, type ReportStatus } from "../../../../_mock/admin";

const statusFilters: (ReportStatus | "All")[] = [
  "All",
  "Pending",
  "Resolved",
  "Dismissed",
];

const statusStyles: Record<ReportStatus, string> = {
  Pending: "border-primary text-primary bg-primary/10",
  Resolved: "border-success text-success bg-success/10",
  Dismissed: "border-border text-muted bg-card",
};

export default function AdminReportsPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ReportStatus | "All">(
    "All"
  );

  const filteredReports = useMemo(() => {
    return adminReports.filter((report) => {
      const matchesQuery =
        report.targetLabel.toLowerCase().includes(query.toLowerCase()) ||
        report.reporter.toLowerCase().includes(query.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || report.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter]);

  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
        Reports
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
            placeholder="Search by target or reporter..."
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
        <table className="w-full min-w-160 text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
              <th className="px-4 py-3 font-medium">Target</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Reporter</th>
              <th className="px-4 py-3 font-medium">Reason</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report) => (
              <tr key={report.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-medium text-foreground/90">
                  {report.targetLabel}
                </td>
                <td className="px-4 py-3 text-foreground/80">
                  {report.targetType}
                </td>
                <td className="px-4 py-3 text-foreground/80">
                  {report.reporter}
                </td>
                <td className="px-4 py-3 text-muted">{report.reason}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-md border px-2 py-1 text-[11px] font-semibold uppercase ${statusStyles[report.status]}`}
                  >
                    {report.status}
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
            {filteredReports.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-muted">
                  No reports match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}