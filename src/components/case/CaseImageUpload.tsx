"use client";

import { FiPlus, FiTrash2 } from "react-icons/fi";
import Image from "next/image";
type CaseImageUploadProps = {
  value: string;
  onSelect: (file: File) => void;
  onRemove: () => void;
  error?: string;
  label?: string;
};

export function CaseImageUpload({
  value,
  onSelect,
  onRemove,
  error,
  label = "Case Image",
}: CaseImageUploadProps) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-foreground/80">
        {label}
      </label>

      {value ? (
        <div className="group relative mb-1 aspect-video w-full max-w-sm overflow-hidden rounded-lg border border-border bg-background">
          <Image
            src={value}
            alt=""
            className="h-full w-full object-cover"
            width={640}
            height={360}
          />
          <button
            type="button"
            aria-label="Remove case image"
            onClick={onRemove}
            className="absolute right-2 top-2 rounded-md bg-black/60 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100"
          >
            <FiTrash2 size={14} />
          </button>
        </div>
      ) : (
        <label className="flex w-full max-w-sm cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-border px-3 py-6 text-xs font-semibold text-foreground/80 hover:border-primary/40 hover:text-primary">
          <FiPlus size={14} />
          Upload Case Image
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onSelect(file);
              e.target.value = "";
            }}
            className="hidden"
          />
        </label>
      )}
      {error && <p className="mt-1 text-xs text-primary">{error}</p>}
    </div>
  );
}