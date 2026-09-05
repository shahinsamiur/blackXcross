"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import {
  moderationItems,
  type ModerationStatus,
} from "../../../../_mock/admin";

const statusFilters: (ModerationStatus | "All")[] = [
  "All",
  "Flagged",
  "Approved",
  "Rejected",
];

const statusStyles: Record<ModerationStatus, string> = {
  Flagged: "border-primary text-primary bg-primary/10",
  Approved: "border-success text-success bg-success/10",
  Rejected: "border-border text-muted bg-card",
};

export default function AdminModerationPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ModerationStatus | "All">(
    "All"
  );

  const filteredItems = useMemo(() => {
    return moderationItems.filter((item) => {
      const matchesQuery = item.contentLabel
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter]);

  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
        Moderation
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
            placeholder="Search flagged content..."
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
              <th className="px-4 py-3 font-medium">Content</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Submitted By</th>
              <th className="px-4 py-3 font-medium">AI Flag Reason</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-medium text-foreground/90">
                  {item.contentLabel}
                </td>
                <td className="px-4 py-3 text-foreground/80">
                  {item.contentType}
                </td>
                <td className="px-4 py-3 text-foreground/80">
                  {item.submittedBy}
                </td>
                <td className="px-4 py-3 text-muted">{item.aiFlagReason}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-md border px-2 py-1 text-[11px] font-semibold uppercase ${statusStyles[item.status]}`}
                  >
                    {item.status}
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
            {filteredItems.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-muted">
                  No flagged content matches your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}