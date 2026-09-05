"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  FiArrowLeft,
  FiEdit2,
  FiFileText,
  FiImage,
  FiMic,
  FiMapPin,
  FiThumbsUp,
  FiDownload,
  FiChevronRight,
  FiChevronLeft,
  FiX,
} from "react-icons/fi";
import { FaFire } from "react-icons/fa6";
import { caseFiles, trendingTheories } from "../../../../_mock/blackxcross";
import { useState } from "react";
const evidenceIcons = {
  image: FiImage,
  document: FiFileText,
  audio: FiMic,
};

export default function CaseDetailsPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const caseFile = caseFiles.find((c) => c.id === params.id);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  if (!caseFile) {
    return (
      <div className="flex w-full flex-col items-center gap-3 px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="text-sm text-muted">
          Case not found. It may have been removed or the link is incorrect.
        </p>
        <button
          type="button"
          onClick={() => router.push("/")}
          className="text-sm font-semibold text-primary hover:opacity-80"
        >
          Back to Cases
        </button>
      </div>
    );
  }

  const isOpen = caseFile.status === "OPEN CASE";
  const relatedTheories = trendingTheories.filter((theory) =>
    caseFile.relatedTheoryIds?.includes(theory.id),
  );

  return (
    <div className="flex w-full flex-col gap-6 px-4 pb-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm font-medium text-foreground/80 hover:text-primary"
        >
          <FiArrowLeft size={16} />
          Back to Cases
        </Link>

        <Link
          href={`/cases/${caseFile.id}/edit`}
          className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground/80 hover:border-primary/40 hover:text-primary"
        >
          <FiEdit2 size={14} />
          Edit Case
        </Link>
      </div>

      <div
        className="relative flex h-56 w-full items-end overflow-hidden rounded-xl border border-border bg-cover bg-center p-5 sm:h-72 sm:p-6"
        style={{
          backgroundImage: `
            linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.9)),
            url(${caseFile.image})
          `,
        }}
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span
              className={`rounded-md px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase ${
                isOpen
                  ? "bg-success/15 text-success border border-success"
                  : "bg-primary/10 border border-primary text-primary"
              }`}
            >
              {caseFile.status}
            </span>
            <span className="text-xs font-medium text-muted">
              {caseFile.caseNumber}
            </span>
          </div>
          <h1 className="text-2xl font-light leading-tight tracking-tight text-foreground sm:text-3xl">
            {caseFile.title}
          </h1>
          {caseFile.location && (
            <span className="flex items-center gap-1.5 text-xs text-muted">
              <FiMapPin size={14} />
              {caseFile.location}
            </span>
          )}
        </div>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <section className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5">
            <h2 className="text-sm font-bold tracking-wide text-foreground/80 uppercase">
              Case Narrative
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              {caseFile.narrative ?? caseFile.description}
            </p>
          </section>

          {caseFile.gallery && caseFile.gallery.length > 0 && (
            <section className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5">
              <h2 className="text-sm font-bold tracking-wide text-foreground/80 uppercase">
                Gallery
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {caseFile.gallery.map((src, i) => (
                  <button
                    key={`${caseFile.id}-gallery-${i}`}
                    type="button"
                    onClick={() => setActiveImageIndex(i)}
                    className="group relative aspect-video overflow-hidden rounded-lg border border-border focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <Image
                      src={src}
                      alt={`${caseFile.title} evidence photo ${i + 1}`}
                      fill
                      className="object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
                  </button>
                ))}
              </div>
            </section>
          )}

          {caseFile.evidence && caseFile.evidence.length > 0 && (
            <section className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
              <h2 className="text-xs font-bold tracking-widest text-primary uppercase">
                Evidence
              </h2>
              <ul className="flex flex-col">
                {caseFile.evidence.map((item, i) => {
                  const Icon = evidenceIcons[item.type];
                  return (
                    <li
                      key={item.id}
                      className={`flex items-center justify-between gap-3 py-3.5 ${
                        i !== caseFile.evidence!.length - 1
                          ? "border-b border-border"
                          : ""
                      }`}
                    >
                      <div className="flex min-w-0 flex-1 items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Icon size={16} />
                        </span>
                        <span className="truncate text-sm text-foreground/90">
                          {item.label}
                        </span>
                      </div>
                      <button
                        type="button"
                        aria-label={`Download ${item.label}`}
                        className="flex shrink-0 items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground/80 transition-colors hover:border-primary/40 hover:text-primary"
                      >
                        <FiDownload size={13} />
                        Download
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          <section className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold tracking-wide text-foreground/80 uppercase">
                Discussion
              </h2>
              {caseFile.comments && caseFile.comments.length > 0 && (
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                  {caseFile.comments.length}
                </span>
              )}
            </div>

            {caseFile.comments && caseFile.comments.length > 0 ? (
              <ul className="flex flex-col">
                {caseFile.comments.map((comment, i) => {
                  const initials = comment.author
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase();

                  return (
                    <li
                      key={comment.id}
                      className={`flex items-start gap-3 py-4 ${
                        i !== caseFile.comments!.length - 1
                          ? "border-b border-border"
                          : "pb-0"
                      } ${i === 0 ? "pt-0" : ""}`}
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {initials}
                      </span>
                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <div className="flex flex-wrap items-baseline gap-2">
                          <span className="text-sm font-semibold text-foreground/90">
                            {comment.author}
                          </span>
                          <span className="text-xs text-muted">
                            {comment.timeAgo}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed text-muted">
                          {comment.text}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-sm text-muted">
                No discussion yet. Be the first to share a theory on this case.
              </p>
            )}
          </section>
        </div>

        <div className="flex flex-col gap-4">
          <section className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5">
            <h2 className="text-sm font-bold tracking-wide text-foreground/80 uppercase">
              Quick Facts
            </h2>
            <div className="flex flex-col gap-2 text-sm text-muted">
              <div className="flex items-center justify-between">
                <span>Case Number</span>
                <span className="text-foreground/80">
                  {caseFile.caseNumber}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Status</span>
                <span className="text-foreground/80">{caseFile.status}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Theories</span>
                <span className="text-foreground/80">
                  {caseFile.theoryCount}
                </span>
              </div>
              {caseFile.location && (
                <div className="flex items-center justify-between">
                  <span>Location</span>
                  <span className="text-right text-foreground/80">
                    {caseFile.location}
                  </span>
                </div>
              )}
            </div>
          </section>

          {relatedTheories.length > 0 && (
            <section className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5">
              <h2 className="text-sm font-bold tracking-wide text-foreground/80 uppercase">
                Related Theories
              </h2>
              <ul className="flex flex-col">
                {relatedTheories.map((theory, i) => (
                  <li
                    key={theory.id}
                    className={`flex items-center gap-3 py-3 ${
                      i !== relatedTheories.length - 1
                        ? "border-b border-border"
                        : ""
                    }`}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <FaFire size={16} />
                    </span>
                    <p className="flex-1 text-sm leading-snug text-foreground/90">
                      {theory.text}
                    </p>
                    <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-muted">
                      <FiThumbsUp size={12} />
                      {theory.likes}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
      {activeImageIndex !== null &&
        caseFile.gallery &&
        caseFile.gallery.length > 0 && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setActiveImageIndex(null)}
          >
            <button
              type="button"
              aria-label="Close preview"
              onClick={() => setActiveImageIndex(null)}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground/80 hover:text-primary"
            >
              <FiX size={18} />
            </button>

            {caseFile.gallery.length > 1 && (
              <button
                type="button"
                aria-label="Previous image"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIndex((prev) =>
                    prev === null
                      ? null
                      : (prev - 1 + caseFile.gallery!.length) %
                        caseFile.gallery!.length,
                  );
                }}
                className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-foreground/80 hover:text-primary sm:left-8"
              >
                <FiChevronLeft size={20} />
              </button>
            )}

            <div
              className="relative h-[70vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={caseFile.gallery[activeImageIndex]}
                alt={`${caseFile.title} full evidence photo ${
                  activeImageIndex + 1
                }`}
                fill
                className="rounded-lg object-contain"
              />
            </div>

            {caseFile.gallery.length > 1 && (
              <button
                type="button"
                aria-label="Next image"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIndex((prev) =>
                    prev === null
                      ? null
                      : (prev + 1) % caseFile.gallery!.length,
                  );
                }}
                className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-foreground/80 hover:text-primary sm:right-8"
              >
                <FiChevronRight size={20} />
              </button>
            )}

            <span className="absolute bottom-4 text-xs text-muted">
              {activeImageIndex + 1} / {caseFile.gallery.length}
            </span>
          </div>
        )}
    </div>
  );
}
