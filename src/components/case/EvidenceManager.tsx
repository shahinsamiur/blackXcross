"use client";

import {
  FiUpload,
  FiTrash2,
  FiImage,
  FiFileText,
  FiMusic,
} from "react-icons/fi";
import type { CaseEvidenceItem } from "../../_mock/blackxcross";
type EvidenceManagerProps = {
  evidence: CaseEvidenceItem[];
  max: number;
  onFilesSelected: (files: File[]) => void;
  onRemove: (id: string) => void;
  error?: string;
};
export function EvidenceManager({
  evidence,
  max,
  onFilesSelected,
  onRemove,
  error,
}: EvidenceManagerProps) {
  const atLimit = evidence.length >= max;
  return (
    <div className="flex flex-col gap-3 border-t border-border pt-6">
      <span className="text-sm font-medium text-foreground/80">
        Evidence ({evidence.length}/{max})
      </span>
      <div className="flex items-center justify-betweenflex-wrap!">
        {evidence.length > 0 && (
          <ul className="flex  gap-2  w-full">
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
                  className="group flex items-center gap-3 rounded-lg border border-border bg-background px-3 py-2.5 transition-colors hover:border-primary/30 "
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
      </div>
      <label
        className={`flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border px-3 py-6 text-xs font-semibold text-foreground/80 ${
          atLimit
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer hover:border-primary/40 hover:text-primary"
        }`}
      >
        <FiUpload size={14} />
        Upload Evidence (image, audio, video, PDF)
        <input
          type="file"
          accept="image/*,audio/*,video/*,.pdf"
          multiple
          onChange={(e) => {
            const files = Array.from(e.target.files ?? []);
            if (files.length) onFilesSelected(files);
            e.target.value = "";
          }}
          disabled={atLimit}
          className="hidden"
        />
      </label>
      {atLimit && (
        <p className="text-xs text-muted">
          Maximum of {max} evidence files reached.
        </p>
      )}
      {error && <p className="mt-1 text-xs text-primary">{error}</p>}
    </div>
  );
}
