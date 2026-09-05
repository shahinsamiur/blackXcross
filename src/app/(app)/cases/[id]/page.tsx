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
                  <div
                    key={`${caseFile.id}-gallery-${i}`}
                    className="relative aspect-video overflow-hidden rounded-lg border border-border"
                  >
                    <Image
                      src={src}
                      alt={`${caseFile.title} evidence photo ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {caseFile.evidence && caseFile.evidence.length > 0 && (
            <section className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5">
              <h2 className="text-sm font-bold tracking-wide text-foreground/80 uppercase">
                Evidence
              </h2>
              <ul className="flex flex-col">
                {caseFile.evidence.map((item, i) => {
                  const Icon = evidenceIcons[item.type];
                  return (
                    <li
                      key={item.id}
                      className={`flex items-center gap-3 py-3 ${
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

          <section className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5">
            <h2 className="text-sm font-bold tracking-wide text-foreground/80 uppercase">
              Discussion
            </h2>
            {caseFile.comments && caseFile.comments.length > 0 ? (
              <ul className="flex flex-col gap-4">
                {caseFile.comments.map((comment) => (
                  <li key={comment.id} className="flex flex-col gap-1">
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
    </div>
  );
}