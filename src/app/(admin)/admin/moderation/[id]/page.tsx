"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FiArrowLeft, FiCheck, FiX, FiAlertTriangle } from "react-icons/fi";
import {
  moderationItems,
  type ModerationStatus,
} from "../../../../../_mock/admin";

export default function AdminModerationDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const item = moderationItems.find((m) => m.id === params.id);
  const [status, setStatus] = useState<ModerationStatus | undefined>(
    item?.status
  );

  if (!item) {
    return (
      <div className="flex w-full flex-col items-center gap-3 py-16 text-center">
        <p className="text-sm text-muted">
          Flagged item not found. It may have been removed or the link is
          incorrect.
        </p>
        <button
          type="button"
          onClick={() => router.push("/admin/moderation")}
          className="text-sm font-semibold text-primary hover:opacity-80"
        >
          Back to Moderation
        </button>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <Link
        href="/admin/moderation"
        className="flex w-fit items-center gap-1.5 text-sm font-medium text-foreground/80 hover:text-primary"
      >
        <FiArrowLeft size={16} />
        Back to Moderation
      </Link>

      <div className="flex flex-col gap-6 rounded-xl border border-border bg-card p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-wide text-muted">
              {item.contentType}
            </span>
            <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
              {item.contentLabel}
            </h1>
            <span className="text-sm text-muted">
              Submitted by {item.submittedBy} · {item.flaggedAt}
            </span>
          </div>
          {status && (
            <span className="rounded-md border border-border px-2.5 py-1 text-[11px] font-semibold uppercase text-muted">
              {status}
            </span>
          )}
        </div>

        <div className="flex items-start gap-3 rounded-lg border border-primary/40 bg-primary/5 p-4">
          <FiAlertTriangle className="mt-0.5 shrink-0 text-primary" size={18} />
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-primary">
              AI Flag Reason
            </span>
            <p className="text-sm text-foreground/80">{item.aiFlagReason}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 border-t border-border pt-5">
          <button
            type="button"
            onClick={() => setStatus("Approved")}
            className="flex items-center gap-1.5 rounded-lg border border-success px-3 py-2 text-xs font-semibold text-success hover:bg-success/10"
          >
            <FiCheck size={14} />
            Approve
          </button>
          <button
            type="button"
            onClick={() => setStatus("Rejected")}
            className="flex items-center gap-1.5 rounded-lg border border-primary px-3 py-2 text-xs font-semibold text-primary hover:bg-primary/10"
          >
            <FiX size={14} />
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}