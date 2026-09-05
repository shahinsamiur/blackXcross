"use client";

import { FiPlus, FiTrash2, FiImage, FiFileText, FiMusic } from "react-icons/fi";
import type { CaseEvidenceItem } from "../../_mock/blackxcross";

type EvidenceManagerProps = {
  evidence: CaseEvidenceItem[];
  evidenceTypes: CaseEvidenceItem["type"][];
  newLabel: string;
  newType: CaseEvidenceItem["type"];
  onLabelChange: (value: string) => void;
  onTypeChange: (value: CaseEvidenceItem["type"]) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
};

export function EvidenceManager({
  evidence,
  evidenceTypes,
  newLabel,
  newType,
  onLabelChange,
  onTypeChange,
  onAdd,
  onRemove,
}: EvidenceManagerProps) {
  return (
    <div className="flex flex-col gap-3 border-t border-border pt-6">
      <span className="text-sm font-medium text-foreground/80">Evidence</span>

      {evidence.length > 0 && (
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {evidence.map((item) => {
            const icon =
              item.type === "image" ? (
                <FiImage size={16} />
              ) : item.type === "audio" ? (
                <FiMusic size={16} />
              ) : (
                <FiFileText size={16} />
              );

            return (
              <li
                key={item.id}
                className="group flex items-center gap-3 rounded-lg border border-border bg-background px-3 py-2.5 transition-colors hover:border-primary/30"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  {icon}
                </span>
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-sm font-medium text-foreground/90">
                    {item.label}
                  </span>
                  <span className="text-xs uppercase tracking-wide text-muted">
                    {item.type}
                  </span>
                </div>
                <button
                  type="button"
                  aria-label="Remove evidence"
                  onClick={() => onRemove(item.id)}
                  className="shrink-0 text-muted opacity-0 transition-opacity hover:text-primary group-hover:opacity-100 sm:opacity-100"
                >
                  <FiTrash2 size={14} />
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          value={newLabel}
          onChange={(e) => onLabelChange(e.target.value)}
          placeholder="Evidence label, e.g. Dispatch log"
          className="flex-1 rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none"
        />
        <select
          value={newType}
          onChange={(e) => onTypeChange(e.target.value as CaseEvidenceItem["type"])}
          className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary/50 focus:outline-none"
        >
          {evidenceTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={onAdd}
          className="flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2.5 text-xs font-semibold text-foreground/80 hover:border-primary/40 hover:text-primary"
        >
          <FiPlus size={14} />
          Add
        </button>
      </div>
    </div>
  );
}