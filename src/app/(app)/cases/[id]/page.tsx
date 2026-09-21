"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { FiArrowLeft, FiEdit2, FiFileText, FiImage, FiMic, FiMapPin, FiDownload, } from "react-icons/fi";
import { useGetCaseQuery } from "../../../../state/redux/api/cases";
import type { RootState } from "../../../../state/redux/store";

const evidenceIcons = { image: FiImage, document: FiFileText, audio: FiMic };

export default function CaseDetailsPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { data: caseData, isLoading, isError } = useGetCaseQuery(params.id);
  const { user, status } = useSelector((state: RootState) => state.auth);
  const canEdit = status === "authenticated" && !!user && caseData?.userId === user.id;

  if (isLoading) {
    return (
      <div className="flex w-full flex-col gap-6 px-4 pb-8 sm:px-6 lg:px-8">
        <div className="h-8 w-32 animate-pulse rounded bg-border" />
        <div className="h-64 w-full animate-pulse rounded-xl bg-border" />
        <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="flex flex-col gap-4 lg:col-span-2">
            <div className="h-40 w-full animate-pulse rounded-xl bg-border" />
            <div className="h-60 w-full animate-pulse rounded-xl bg-border" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="h-48 w-full animate-pulse rounded-xl bg-border" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !caseData) {
    return (
      <div className="flex w-full flex-col items-center gap-3 px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="text-sm text-muted">Case not found. It may have been removed or the link is incorrect.</p>
        <button type="button" onClick={() => router.push("/")} className="text-sm font-semibold text-primary hover:opacity-80">Back to Cases</button>
      </div>
    );
  }

  const isOpen = caseData.investigationStatus === "OPEN" || caseData.investigationStatus === "SOLVED";
  
  const evidence = caseData.files?.map((file) => {
    let type: "image" | "document" | "audio" = "document";
    if (file.mimeType.startsWith("image/")) type = "image";
    else if (file.mimeType.startsWith("audio/")) type = "audio";
    return { id: file.id, label: file.filename, type };
  }) || [];

  return (
    <div className="flex w-full flex-col gap-6 px-4 pb-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1.5 text-sm font-medium text-foreground/80 hover:text-primary">
          <FiArrowLeft size={16} /> Back to Cases
        </Link>
        {canEdit && (
          <Link href={`/cases/${caseData.id}/edit`} className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground/80 hover:border-primary/40 hover:text-primary">
            <FiEdit2 size={14} /> Edit Case
          </Link>
        )}
      </div>

      <div className="relative flex h-56 w-full items-end overflow-hidden rounded-xl border border-border bg-cover bg-center p-5 sm:h-72 sm:p-6" style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.9)), url(${caseData.imageUrl || "/image/hero1.jpg"})` }}>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className={`rounded-md px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase ${isOpen ? "bg-success/15 text-success border border-success" : "bg-primary/10 border border-primary text-primary"}`}>
              {isOpen ? "OPEN CASE" : "COLD CASE"}
            </span>
            <span className="text-xs font-medium text-muted">{caseData.caseNumber || `CASE-${caseData.id.slice(0, 6).toUpperCase()}`}</span>
          </div>
          <h1 className="text-2xl font-light leading-tight tracking-tight text-foreground sm:text-3xl">{caseData.title}</h1>
          {caseData.location && (
            <span className="flex items-center gap-1.5 text-xs text-muted">
              <FiMapPin size={14} /> {caseData.location}
            </span>
          )}
        </div>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <section className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5">
            <h2 className="text-sm font-bold tracking-wide text-foreground/80 uppercase">Case Narrative</h2>
            <p className="text-sm leading-relaxed text-muted">{caseData.narrative || caseData.description}</p>
          </section>

          {evidence.length > 0 && (
            <section className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
              <h2 className="text-xs font-bold tracking-widest text-primary uppercase">Evidence</h2>
              <ul className="flex flex-col">
                {evidence.map((item, i) => {
                  const Icon = evidenceIcons[item.type];
                  return (
                    <li key={item.id} className={`flex items-center justify-between gap-3 py-3.5 ${i !== evidence.length - 1 ? "border-b border-border" : ""}`}>
                      <div className="flex min-w-0 flex-1 items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Icon size={16} />
                        </span>
                        <span className="truncate text-sm text-foreground/90">{item.label}</span>
                      </div>
                      <button type="button" aria-label={`Download ${item.label}`} className="flex shrink-0 items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground/80 transition-colors hover:border-primary/40 hover:text-primary">
                        <FiDownload size={13} /> Download
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <section className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5">
            <h2 className="text-sm font-bold tracking-wide text-foreground/80 uppercase">Quick Facts</h2>
            <div className="flex flex-col gap-2 text-sm text-muted">
              <div className="flex items-center justify-between">
                <span>Status</span>
                <span className="text-foreground/80">{isOpen ? "OPEN CASE" : "COLD CASE"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Theories</span>
                <span className="text-foreground/80">{caseData._count?.theories || 0}</span>
              </div>
              {caseData.location && (
                <div className="flex items-center justify-between">
                  <span>Location</span>
                  <span className="text-right text-foreground/80">{caseData.location}</span>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}