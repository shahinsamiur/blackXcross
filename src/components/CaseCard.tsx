import Link from "next/link";
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
    <article className="group relative w-full overflow-hidden rounded-xl border border-gray-800/80 bg-card transition-all duration-300 hover:border-primary/40">
      <div className="absolute left-3 top-3 z-10">
        <span
          className={`rounded border px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase ${
            isOpen
              ? "border-red-800/50 bg-red-900/80 text-red-400"
              : "border-primary/50 bg-primary/20 text-primary"
          }`}
        >
          {displayStatus}
        </span>
      </div>

      <div className="absolute right-3 top-3 z-10 font-mono text-[10px] text-muted">
        {caseFile.caseNumber || `#${caseFile.id.slice(0, 6)}`}
      </div>

      <div className="relative h-28 overflow-hidden bg-linear-to-b from-gray-900 to-card">
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-card to-transparent" />
      </div>

      <div className="p-4 pt-2">
        <h3 className="mb-1 font-display text-sm text-white transition group-hover:text-primary">
          {caseFile.title}
        </h3>
        <p className="line-clamp-2 text-xs leading-relaxed text-muted">
          {caseFile.description}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <Link
            href={`/cases/${caseFile.id}`}
            className="text-[11px] font-medium text-primary hover:opacity-80"
          >
            Open Dossier →
          </Link>
          <span className="text-[11px] text-gray-600">
            {caseFile._count?.theories || 0} Theories
          </span>
        </div>
      </div>
    </article>
  );
}