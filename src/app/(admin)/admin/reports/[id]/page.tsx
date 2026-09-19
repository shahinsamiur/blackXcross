"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FiArrowLeft, FiCheckCircle, FiXCircle, FiEye } from "react-icons/fi";
import {
  useGetAdminReportByIdQuery,
  useUpdateReportMutation,
} from "../../../../../state/redux/api/admin";

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

export default function AdminReportDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetAdminReportByIdQuery(params.id);
  const [updateReport, { isLoading: isUpdating }] = useUpdateReportMutation();
  const [adminNotes, setAdminNotes] = useState<string | null>(null);

  const report = data?.data;

  if (isLoading) {
    return (
      <div className="flex w-full flex-col gap-6">
        <div className="h-5 w-32 animate-pulse rounded bg-border" />
        <div className="h-56 w-full animate-pulse rounded-xl bg-border" />
      </div>
    );
  }

  if (isError || !report) {
    return (
      <div className="flex w-full flex-col items-center gap-3 py-16 text-center">
        <p className="text-sm text-muted">
          Report not found. It may have been removed or the link is incorrect.
        </p>
        <button
          type="button"
          onClick={() => router.push("/admin/reports")}
          className="text-sm font-semibold text-primary hover:opacity-80"
        >
          Back to Reports
        </button>
      </div>
    );
  }

  const notes = adminNotes ?? report.adminNotes ?? "";

  const handleUpdate = async (status: string) => {
    try {
      await updateReport({
        id: report.id,
        status,
        adminNotes: notes || undefined,
      }).unwrap();
    } catch {
      alert("Failed to update report. Please try again.");
    }
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <Link
        href="/admin/reports"
        className="flex w-fit items-center gap-1.5 text-sm font-medium text-foreground/80 hover:text-primary"
      >
        <FiArrowLeft size={16} />
        Back to Reports
      </Link>

      <div className="flex flex-col gap-6 rounded-xl border border-border bg-card p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-wide text-muted">
              {report.targetType} Report
            </span>
            <span className="text-sm text-muted">
              Reported by {report.reporter?.username || report.reporter?.name || "Unknown"} ·{" "}
              {new Date(report.createdAt).toLocaleDateString()}
            </span>
          </div>
          <span
            className={`rounded-md border px-2.5 py-1 text-[11px] font-semibold uppercase ${statusStyles[report.status]}`}
          >
            {statusLabels[report.status]}
          </span>
        </div>

        <div className="flex flex-col gap-2 rounded-lg border border-border p-4">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted">
            Reason
          </span>
          <p className="text-sm leading-relaxed text-foreground/80">
            {report.reason}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="adminNotes"
            className="text-xs font-semibold uppercase tracking-wide text-muted"
          >
            Admin Notes
          </label>
          <textarea
            id="adminNotes"
            value={notes}
            onChange={(e) => setAdminNotes(e.target.value)}
            rows={3}
            placeholder="Add internal notes..."
            className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-3 border-t border-border pt-5">
          <button
            type="button"
            onClick={() => handleUpdate("REVIEWED")}
            disabled={isUpdating}
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground/80 hover:border-primary/40 hover:text-primary disabled:opacity-50"
          >
            <FiEye size={14} />
            {isUpdating ? "Saving..." : "Mark Reviewed"}
          </button>
          <button
            type="button"
            onClick={() => handleUpdate("RESOLVED")}
            disabled={isUpdating}
            className="flex items-center gap-1.5 rounded-lg border border-success px-3 py-2 text-xs font-semibold text-success hover:bg-success/10 disabled:opacity-50"
          >
            <FiCheckCircle size={14} />
            {isUpdating ? "Saving..." : "Resolve"}
          </button>
          <button
            type="button"
            onClick={() => handleUpdate("DISMISSED")}
            disabled={isUpdating}
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground/80 hover:border-primary/40 hover:text-primary disabled:opacity-50"
          >
            <FiXCircle size={14} />
            {isUpdating ? "Saving..." : "Dismiss"}
          </button>
        </div>
      </div>
    </div>
  );
}