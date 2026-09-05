"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FiArrowLeft, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { adminReports, type ReportStatus } from "../../../../../_mock/admin";

const statusStyles: Record<ReportStatus, string> = {
  Pending: "border-primary text-primary bg-primary/10",
  Resolved: "border-success text-success bg-success/10",
  Dismissed: "border-border text-muted bg-card",
};

export default function AdminReportDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const report = adminReports.find((r) => r.id === params.id);
  const [status, setStatus] = useState<ReportStatus | undefined>(
    report?.status
  );

  if (!report) {
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
            <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
              {report.targetLabel}
            </h1>
            <span className="text-sm text-muted">
              Reported by {report.reporter} · {report.submittedAt}
            </span>
          </div>
          {status && (
            <span
              className={`rounded-md border px-2.5 py-1 text-[11px] font-semibold uppercase ${statusStyles[status]}`}
            >
              {status}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2 rounded-lg border border-border p-4">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted">
            Reason: {report.reason}
          </span>
          <p className="text-sm leading-relaxed text-foreground/80">
            {report.details}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 border-t border-border pt-5">
          <button
            type="button"
            onClick={() => setStatus("Resolved")}
            className="flex items-center gap-1.5 rounded-lg border border-success px-3 py-2 text-xs font-semibold text-success hover:bg-success/10"
          >
            <FiCheckCircle size={14} />
            Resolve
          </button>
          <button
            type="button"
            onClick={() => setStatus("Dismissed")}
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground/80 hover:border-primary/40 hover:text-primary"
          >
            <FiXCircle size={14} />
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}