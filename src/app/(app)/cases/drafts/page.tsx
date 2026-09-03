"use client";

import Link from "next/link";
import { FiPlus, FiFileText } from "react-icons/fi";

const draftCases: never[] = [];

export default function CaseDraftsPage() {
  return (
    <div className="flex w-full flex-col gap-6 px-4 pb-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
          Draft Cases
        </h1>
        <Link
          href="/cases/create"
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-foreground hover:opacity-90"
        >
          <FiPlus size={16} />
          New Case
        </Link>
      </div>

      {draftCases.length > 0 ? (
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"></div>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-10 text-center">
          <FiFileText size={28} className="text-muted" />
          <p className="text-sm text-muted">
            No draft cases yet. Cases you start but don&apos;t submit will
            appear here.
          </p>
          <Link
            href="/cases/create"
            className="mt-2 text-sm font-semibold text-primary hover:opacity-80"
          >
            Start a new case
          </Link>
        </div>
      )}
    </div>
  );
}
