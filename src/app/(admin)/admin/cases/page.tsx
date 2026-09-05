"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import {
  FiArrowLeft,
  FiEdit2,
  FiFileText,
  FiImage,
  FiMic,
  FiMapPin,
  FiThumbsUp,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { FaFire } from "react-icons/fa6";
import { caseFiles, trendingTheories } from "../../../../_mock/blackxcross";

const evidenceIcons = {
  image: FiImage,
  document: FiFileText,
  audio: FiMic,
};

export default function CaseDetailsPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const caseFile = caseFiles.find((c) => c.id === params.id);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(
    null
  );

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
    caseFile.relatedTheoryIds?.includes(theory.id)
  );
  const gallery = caseFile.gallery ?? [];

  const showPrevImage = () => {
    setActiveImageIndex((prev) =>
      prev === null ? null : (prev - 1 + gallery.length) % gallery.length
    );
  };

  const showNextImage = () => {
    setActiveImageIndex((prev) =>
      prev === null ? null : (prev + 1) % gallery.length
    );
  };

  return (
    <div className="flex w-full flex-col gap-6 px-4 pb-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
        >
          <FiArrowLeft size={16} />
          Back to Cases
        </Link>

        <Link
          href={`/cases/${caseFile.id}/edit`}
          className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground/80 transition-colors hover:border-primary/40 hover:text-primary"
        >
          <FiEdit2 size={14} />
          Edit Case
        </Link>
      </div>

      <div
        className="relative flex h-60 w-full items-end overflow-hidden rounded-xl border border-border bg-cover bg-center p-6 shadow-lg sm:h-80 sm:p-8"
        style={{
          backgroundImage: `
            linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.92)),
            url(${caseFile.image})
          `,
        }}
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span
              className={`rounded-md px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase ${
                isOpen
                  ? "border border-success bg-success/15 text-success"
                  : "border border-primary bg-primary/10 text-primary"
              }`}
            >
              {caseFile.status}
            </span>
            <span className="text-xs font-medium tracking-wide text-muted">
              {caseFile.caseNumber}
            </span>
          </div>
          <h1 className="text-2xl font-light leading-tight tracking-tight text-foreground sm:text-4xl">
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

      <div className="grid w-full grid-cols-1 items-start gap-4 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <section className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
            <h2 className="text-xs font-bold tracking-widest text-primary uppercase">
              Case Narrative
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              {caseFile.narrative ?? caseFile.description}
            </p>
          </section>

          {gallery.length > 0 && (
            <section className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
              <h2 className="text-xs font-bold tracking-widest text-primary uppercase">
                Gallery
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {gallery.map((src, i) => (
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
                      className={`flex items-center gap-3 py-3.5 ${
                        i !== caseFile.evidence!.length - 1
                          ? "border-b border-border"
                          : ""
                      }`}
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon size={16} />
                      </span>
                      <span className="text-sm text-foreground/90">
                        {item.label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          <section className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
            <h2 className="text-xs font-bold tracking-widest text-primary uppercase">
              Discussion
            </h2>
            {caseFile.comments && caseFile.comments.length > 0 ? (
              <ul className="flex flex-col gap-5">
                {caseFile.comments.map((comment) => (
                  <li key={comment.id} className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
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
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted">
                No discussion yet. Be the first to share a theory on this case.
              </p>
            )}
          </section>
        </div>

        <div className="flex flex-col gap-4">
          <section className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
            <h2 className="text-xs font-bold tracking-widest text-primary uppercase">
              Quick Facts
            </h2>
            <div className="flex flex-col divide-y divide-border">
              <div className="flex items-center justify-between py-2.5 text-sm first:pt-0">
                <span className="text-muted">Case Number</span>
                <span className="font-medium text-foreground/90">
                  {caseFile.caseNumber}
                </span>
              </div>
              <div className="flex items-center justify-between py-2.5 text-sm">
                <span className="text-muted">Status</span>
                <span className="font-medium text-foreground/90">
                  {caseFile.status}
                </span>
              </div>
              <div className="flex items-center justify-between py-2.5 text-sm">
                <span className="text-muted">Theories</span>
                <span className="font-medium text-foreground/90">
                  {caseFile.theoryCount}
                </span>
              </div>
              {caseFile.location && (
                <div className="flex items-center justify-between gap-4 py-2.5 text-sm last:pb-0">
                  <span className="shrink-0 text-muted">Location</span>
                  <span className="text-right font-medium text-foreground/90">
                    {caseFile.location}
                  </span>
                </div>
              )}
            </div>
          </section>

          {relatedTheories.length > 0 && (
            <section className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
              <h2 className="text-xs font-bold tracking-widest text-primary uppercase">
                Related Theories
              </h2>
              <ul className="flex flex-col">
                {relatedTheories.map((theory, i) => (
                  <li
                    key={theory.id}
                    className={`flex items-center gap-3 py-3.5 ${
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

      {activeImageIndex !== null && gallery.length > 0 && (
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

          {gallery.length > 1 && (
            <button
              type="button"
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                showPrevImage();
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
              src={gallery[activeImageIndex]}
              alt={`${caseFile.title} full evidence photo ${
                activeImageIndex + 1
              }`}
              fill
              className="rounded-lg object-contain"
            />
          </div>

          {gallery.length > 1 && (
            <button
              type="button"
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation();
                showNextImage();
              }}
              className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-foreground/80 hover:text-primary sm:right-8"
            >
              <FiChevronRight size={20} />
            </button>
          )}

          <span className="absolute bottom-4 text-xs text-muted">
            {activeImageIndex + 1} / {gallery.length}
          </span>
        </div>
      )}
    </div>
  );
}