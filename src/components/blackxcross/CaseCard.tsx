import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import type { CaseFile } from "../../_mock/blackxcross";

export default function CaseCard({ caseFile }: { caseFile: CaseFile }) {
  const isOpen = caseFile.status === "OPEN CASE";

  return (
    <article
      className="flex w-60 shrink-0 snap-start flex-col gap-8 rounded-xl border border-border bg-card p-5 px-3 bg-cover bg-center sm:w-72 sm:gap-10 sm:px-4 md:w-80"
      style={{
        backgroundImage: `
          linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.8),
            rgba(0, 0, 0, 1)
          ),
          url(${caseFile.image})
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
          {caseFile.status}
        </span>

        <span className="shrink-0 text-xs font-medium text-muted">
          {caseFile.caseNumber}
        </span>
      </div>

      <div className="flex flex-col gap-6 sm:gap-10">
        <h3 className="text-xl font-light leading-tight tracking-tight text-foreground/80 sm:text-2xl">
          {caseFile.title}
        </h3>

        <p className="text-sm leading-relaxed text-muted">
          {caseFile.description}
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between gap-2 pt-2">
        <Link
          href={`/cases/${caseFile.id}`}
          className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary hover:opacity-80"
        >
          {caseFile.ctaLabel}
          <FiArrowRight size={14} />
        </Link>

        <span className="shrink-0 text-xs text-muted">
          {caseFile.theoryCount} Theories
        </span>
      </div>
    </article>
  );
}