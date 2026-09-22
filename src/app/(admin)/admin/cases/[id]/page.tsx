"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { FiArrowLeft, FiCheck, FiX, FiFileText, FiFile } from "react-icons/fi";
import { useGetAdminCaseByIdQuery } from "../../../../../state/redux/api/admin";
import {
  usePublishCaseMutation,
  useDraftCaseMutation,
} from "../../../../../state/redux/api/cases";
import Skeleton from "../../../../../components/ui/Skeleton";

const renderEvidencePreview = (file: { id: string; url: string; filename: string; mimeType: string }) => {
  if (file.mimeType.startsWith("image/")) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-background">
        <Image src={file.url} alt={file.filename} fill className="object-cover" />
      </div>
    );
  }
  if (file.mimeType.startsWith("audio/")) {
    return <audio controls src={file.url} className="w-full" />;
  }
  if (file.mimeType.startsWith("video/")) {
    return (
      <video controls src={file.url} className="aspect-video w-full rounded-lg border border-border bg-background" />
    );
  }
  return (
    <a
      href={file.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-sm text-primary hover:underline"
    >
      <FiFileText size={16} />
      Open file
    </a>
  );
};

export default function AdminCaseDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetAdminCaseByIdQuery(params.id);
  const [publishCase, { isLoading: isApproving }] = usePublishCaseMutation();
  const [draftCase, { isLoading: isRejecting }] = useDraftCaseMutation();
  const caseFile = data?.data;

  if (isLoading) {
    return (
      <div className="flex w-full flex-col gap-6">
        <Skeleton className="h-5 w-32" />
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 sm:p-6">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-9 w-32" />
        </div>
      </div>
    );
  }

  if (isError || !caseFile) {
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

  const handleApprove = async () => {
    try {
      await publishCase(caseFile.id).unwrap();
    } catch (err) {
      alert("Failed to approve case. Please try again.");
    }
  };

  const handleReject = async () => {
    try {
      await draftCase(caseFile.id).unwrap();
    } catch (err) {
      alert("Failed to reject case. Please try again.");
    }
  };

  const isBusy = isApproving || isRejecting;

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
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-md border px-2.5 py-1 text-[11px] font-semibold uppercase ${
                  caseFile.publishState === "PUBLISHED"
                    ? "border-success text-success bg-success/10"
                    : "border-border text-muted"
                }`}
              >
                {caseFile.publishState}
              </span>
              {caseFile.category && (
                <span className="rounded-md border border-border px-2.5 py-1 text-[11px] font-semibold uppercase text-muted">
                  {caseFile.category}
                </span>
              )}
              {caseFile.investigationStatus && (
                <span className="rounded-md border border-border px-2.5 py-1 text-[11px] font-semibold uppercase text-muted">
                  {caseFile.investigationStatus}
                </span>
              )}
              {caseFile.caseNumber && (
                <span className="text-xs text-muted">
                  {caseFile.caseNumber}
                </span>
              )}
            </div>
            <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
              {caseFile.title}
            </h1>
            {caseFile.location && (
              <span className="text-xs text-muted">{caseFile.location}</span>
            )}
          </div>

          {caseFile.user && (
            <div className="flex items-center gap-2">
              {caseFile.user.avatar && (
                <div className="relative h-8 w-8 overflow-hidden rounded-full border border-border">
                  <Image src={caseFile.user.avatar} alt={caseFile.user.username} fill className="object-cover" />
                </div>
              )}
              <span className="text-xs text-muted">
                Submitted by {caseFile.user.name || caseFile.user.username}
              </span>
            </div>
          )}
        </div>

        {caseFile.imageUrl && (
          <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-lg border border-border bg-background">
            <Image src={caseFile.imageUrl} alt={caseFile.title} fill className="object-cover" />
          </div>
        )}

        <p className="text-sm leading-relaxed text-muted">
          {caseFile.narrative}
        </p>

        {caseFile.tags && caseFile.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 border-t border-border pt-5">
            {caseFile.tags.map((tag) => (
              <span
                key={tag.id}
                className="rounded-md border border-border px-2.5 py-1 text-[11px] font-medium text-foreground/80"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        {caseFile.files && caseFile.files.length > 0 && (
          <div className="flex flex-col gap-3 border-t border-border pt-5">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">
              Evidence Submitted ({caseFile.files.length})
            </span>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {caseFile.files.map((item) => (
                <div key={item.id} className="flex flex-col gap-1.5">
                  {renderEvidencePreview(item)}
                  <span className="flex items-center gap-1.5 truncate text-xs text-foreground/80">
                    <FiFile size={12} className="shrink-0" />
                    {item.filename}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3 border-t border-border pt-5">
          <button
            type="button"
            disabled={isBusy || caseFile.publishState === "PUBLISHED"}
            onClick={handleApprove}
            className="flex items-center gap-1.5 rounded-lg border border-success px-3 py-2 text-xs font-semibold text-success hover:bg-success/10 disabled:opacity-50"
          >
            <FiCheck size={14} />
            {isApproving ? "Approving..." : "Approve"}
          </button>
          <button
            type="button"
            disabled={isBusy || caseFile.publishState === "DRAFT"}
            onClick={handleReject}
            className="flex items-center gap-1.5 rounded-lg border border-primary px-3 py-2 text-xs font-semibold text-primary hover:bg-primary/10 disabled:opacity-50"
          >
            <FiX size={14} />
            {isRejecting ? "Rejecting..." : "Reject"}
          </button>
        </div>
      </div>
    </div>
  );
}