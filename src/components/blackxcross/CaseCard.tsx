import { FiArrowRight } from "react-icons/fi";
import type { CaseFile } from "../../_mock/blackxcross";

export default function CaseCard({ caseFile }: { caseFile: CaseFile }) {
  const isOpen = caseFile.status === "OPEN CASE";

  return (
    <article className="flex w-60! shrink-0 snap-start flex-col gap-10 rounded-xl border border-border bg-card p-5 px-2 sm:w-80">
      <div className="flex items-center justify-between">
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

      <div className="flex flex-col gap-10">
        <h3 className="text-2xl font-light leading-tight tracking-tight text-foreground/80">
          {caseFile.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted">
          {caseFile.description}
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between pt-2">
        <button
          type="button"
          className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:opacity-80 cursor-pointer"
        >
          {caseFile.ctaLabel}
          <FiArrowRight size={14} />
        </button>
        <span className="text-xs text-muted">
          {caseFile.theoryCount} Theories
        </span>
      </div>
    </article>
  );
}
