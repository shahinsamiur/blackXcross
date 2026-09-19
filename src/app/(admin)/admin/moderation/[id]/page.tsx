"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FiArrowLeft, FiCheck, FiX, FiAlertTriangle } from "react-icons/fi";
import {
  useGetModerationItemQuery,
  useApproveModerationItemMutation,
  useRejectModerationItemMutation,
} from "../../../../../state/redux/api/moderation";

const statusLabels = {
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
} as const;

export default function AdminModerationDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetModerationItemQuery(params.id);
  const [approve, { isLoading: isApproving }] =
    useApproveModerationItemMutation();
  const [reject, { isLoading: isRejecting }] =
    useRejectModerationItemMutation();

  const item = data?.data;

  if (isLoading) {
    return (
      <div className="flex w-full flex-col gap-6">
        <div className="h-5 w-32 animate-pulse rounded bg-border" />
        <div className="h-56 w-full animate-pulse rounded-xl bg-border" />
      </div>
    );
  }

  if (isError || !item) {
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

  const handleApprove = async () => {
    try {
      await approve(item.id).unwrap();
    } catch {
      alert("Failed to approve item. Please try again.");
    }
  };

  const handleReject = async () => {
    try {
      await reject(item.id).unwrap();
    } catch {
      alert("Failed to reject item. Please try again.");
    }
  };

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
              {item.targetType}
            </span>
            <span className="text-sm text-muted">
              Flagged {new Date(item.createdAt).toLocaleDateString()}
              {item.reviewer &&
                ` · Reviewed by ${item.reviewer.username || item.reviewer.name}`}
            </span>
          </div>
          <span className="rounded-md border border-border px-2.5 py-1 text-[11px] font-semibold uppercase text-muted">
            {statusLabels[item.status]}
          </span>
        </div>

        <div className="flex items-start gap-3 rounded-lg border border-primary/40 bg-primary/5 p-4">
          <FiAlertTriangle className="mt-0.5 shrink-0 text-primary" size={18} />
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-primary">
              AI Flag Reason
            </span>
            <p className="text-sm text-foreground/80">
              {item.reason || "No reason provided."}
            </p>
          </div>
        </div>

        {item.status === "PENDING" && (
          <div className="flex flex-wrap gap-3 border-t border-border pt-5">
            <button
              type="button"
              onClick={handleApprove}
              disabled={isApproving || isRejecting}
              className="flex items-center gap-1.5 rounded-lg border border-success px-3 py-2 text-xs font-semibold text-success hover:bg-success/10 disabled:opacity-50"
            >
              <FiCheck size={14} />
              {isApproving ? "Approving..." : "Approve"}
            </button>
            <button
              type="button"
              onClick={handleReject}
              disabled={isApproving || isRejecting}
              className="flex items-center gap-1.5 rounded-lg border border-primary px-3 py-2 text-xs font-semibold text-primary hover:bg-primary/10 disabled:opacity-50"
            >
              <FiX size={14} />
              {isRejecting ? "Rejecting..." : "Reject"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}