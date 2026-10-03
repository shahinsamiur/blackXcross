import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import type { CaseItem } from "../state/redux/api/cases";

export default function CaseCard({ caseFile }: { caseFile: CaseItem }) {
  const isOpen = caseFile.investigationStatus === "OPEN";

  const displayStatus =
    caseFile.investigationStatus === "COLD"
      ? "COLD CASE"
      : caseFile.investigationStatus === "OPEN"
        ? "OPEN CASE"
        : caseFile.investigationStatus || "UNKNOWN";

  return (
    <article
      className="flex w-full flex-col gap-8 rounded-xl border border-border bg-card p-5 px-3 bg-cover bg-center sm:gap-10 sm:px-4"
      style={{
        backgroundImage: `
          linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.8),
            rgba(0, 0, 0, 1)
          ),
          url(${caseFile.imageUrl || "/image/hero1.jpg"})
        `,
      }}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className={`rounded-md px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase ${
            isOpen
              ? "bg-success/15 text-success border border-success"
              : "bg-primary/10 border border-primary text-primary"
          }`}
        >
          {displayStatus}
        </span>

        <span className="shrink-0 text-xs font-medium text-muted">
          {caseFile.caseNumber || `#${caseFile.id.slice(0, 6)}`}
        </span>
      </div>

      <div className="flex flex-col gap-6 sm:gap-10">
        <h3 className="text-xl font-light leading-tight tracking-tight text-foreground/80 sm:text-2xl">
          {caseFile.title}
        </h3>

        <p className="text-sm leading-relaxed text-muted line-clamp-3">
          {caseFile.description}
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between gap-2 pt-2">
        <Link
          href={`/cases/${caseFile.id}`}
          className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary hover:opacity-80"
        >
          View Case
          <FiArrowRight size={14} />
        </Link>

        <span className="shrink-0 text-xs text-muted">
          {caseFile._count?.theories || 0} Theories
        </span>
      </div>
    </article>
  );
}
