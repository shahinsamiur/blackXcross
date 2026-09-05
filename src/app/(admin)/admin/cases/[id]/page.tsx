"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FiArrowLeft, FiCheck, FiX, FiTrash2 } from "react-icons/fi";
import { adminCases } from "../../../../../_mock/admin";

type ReviewState = "Pending" | "Approved" | "Rejected" | "Deleted";

export default function AdminCaseDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const caseFile = adminCases.find((c) => c.id === params.id);
  const [reviewState, setReviewState] = useState<ReviewState>("Pending");

  if (!caseFile) {
    return (
      <div className="flex w-full flex-col items-center gap-3 py-16 text-center">
        <p className="text-sm text-muted">
          Case not found. It may have been removed or the link is incorrect.
        </p>
        <button
          type="button"
          onClick={() => router.push("/admin/cases")}
          className="text-sm font-semibold text-primary hover:opacity-80"
        >
          Back to Cases
        </button>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <Link
        href="/admin/cases"
        className="flex w-fit items-center gap-1.5 text-sm font-medium text-foreground/80 hover:text-primary"
      >
        <FiArrowLeft size={16} />
        Back to Cases
      </Link>

      <div className="flex flex-col gap-6 rounded-xl border border-border bg-card p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span
                className={`rounded-md border px-2.5 py-1 text-[11px] font-semibold uppercase ${
                  caseFile.status === "OPEN CASE"
                    ? "border-success text-success bg-success/10"
                    : "border-primary text-primary bg-primary/10"
                }`}
              >
                {caseFile.status}
              </span>
              <span className="text-xs text-muted">{caseFile.caseNumber}</span>
            </div>
            <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
              {caseFile.title}
            </h1>
          </div>
          <span className="rounded-md border border-border px-2.5 py-1 text-[11px] font-semibold uppercase text-muted">
            {reviewState}
          </span>
        </div>

        <p className="text-sm leading-relaxed text-muted">
          {caseFile.narrative ?? caseFile.description}
        </p>

        {caseFile.evidence && caseFile.evidence.length > 0 && (
          <div className="flex flex-col gap-2 border-t border-border pt-5">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">
              Evidence Submitted
            </span>
            <ul className="flex flex-col gap-1">
              {caseFile.evidence.map((item) => (
                <li key={item.id} className="text-sm text-foreground/80">
                  • {item.label}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-wrap gap-3 border-t border-border pt-5">
          <button
            type="button"
            onClick={() => setReviewState("Approved")}
            className="flex items-center gap-1.5 rounded-lg border border-success px-3 py-2 text-xs font-semibold text-success hover:bg-success/10"
          >
            <FiCheck size={14} />
            Approve
          </button>
          <button
            type="button"
            onClick={() => setReviewState("Rejected")}
            className="flex items-center gap-1.5 rounded-lg border border-primary px-3 py-2 text-xs font-semibold text-primary hover:bg-primary/10"
          >
            <FiX size={14} />
            Reject
          </button>
          <button
            type="button"
            onClick={() => setReviewState("Deleted")}
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground/80 hover:border-primary/40 hover:text-primary"
          >
            <FiTrash2 size={14} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}