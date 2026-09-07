"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FiArrowLeft, FiThumbsUp } from "react-icons/fi";
import { caseFiles, trendingTheories } from "../../../../../../_mock/blackxcross";

export default function TheoryDetailsPage() {
  const router = useRouter();
  const params = useParams<{ id: string; theoryId: string }>();

  const theory = trendingTheories.find((t) => t.id === params.theoryId);
  const caseFile = caseFiles.find((c) => c.id === params.id);

  if (!theory || !caseFile) {
    return (
      <div className="flex w-full flex-col items-center gap-3 px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="text-sm text-muted">
          Theory not found. It may have been removed or the link is incorrect.
        </p>
        <button
          type="button"
          onClick={() => router.push(`/cases/${params.id}`)}
          className="text-sm font-semibold text-primary hover:opacity-80"
        >
          Back to Case
        </button>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6 px-4 pb-8 sm:px-6 lg:px-8">
      <Link
        href={`/cases/${caseFile.id}`}
        className="flex items-center gap-1.5 text-sm font-medium text-foreground/80 hover:text-primary"
      >
        <FiArrowLeft size={16} />
        Back to {caseFile.title}
      </Link>

      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <section className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
              <span className="font-semibold text-foreground/80">
                {theory.author}
              </span>
              <span>·</span>
              <span>{theory.postedAt}</span>
            </div>
            <h1 className="text-xl font-light leading-tight tracking-tight text-foreground sm:text-2xl">
              {theory.text}
            </h1>
            <p className="text-sm leading-relaxed text-muted">
              {theory.body}
            </p>
            <div className="flex items-center gap-1.5 pt-2 text-xs font-medium text-muted">
              <FiThumbsUp size={14} />
              {theory.likes} upvotes
            </div>
          </section>

          <section className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold tracking-wide text-foreground/80 uppercase">
                Discussion
              </h2>
              {theory.comments && theory.comments.length > 0 && (
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                  {theory.comments.length}
                </span>
              )}
            </div>

            {theory.comments && theory.comments.length > 0 ? (
              <ul className="flex flex-col">
                {theory.comments.map((comment, i) => {
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
                        i !== theory.comments!.length - 1
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
                No discussion yet. Be the first to weigh in on this theory.
              </p>
            )}
          </section>
        </div>

        <div className="flex flex-col gap-4">
          <section className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5">
            <h2 className="text-sm font-bold tracking-wide text-foreground/80 uppercase">
              Case
            </h2>
            <Link
              href={`/cases/${caseFile.id}`}
              className="text-sm font-medium text-primary hover:opacity-80"
            >
              {caseFile.title}
            </Link>
            <div className="flex flex-col gap-2 pt-1 text-sm text-muted">
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
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}