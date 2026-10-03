"use client";

import { FiPlus, FiTrash2 } from "react-icons/fi";
import Image from "next/image";
type GalleryImageUploadProps = {
  images: string[];
  max: number;
  onFilesSelected: (files: File[]) => void;
  onRemove: (index: number) => void;
};

export function GalleryImageUpload({
  images,
  max,
  onFilesSelected,
  onRemove,
}: GalleryImageUploadProps) {
  const atLimit = images.length >= max;
  return (
    <div className="flex flex-col gap-3 border-t border-border pt-6">
      <span className="text-sm font-medium text-foreground/80">
        Gallery Images ({images.length}/{max})
      </span>
      {images.length > 0 && (
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {images.map((url, i) => (
            <li
              key={`${url}-${i}`}
              className="group relative aspect-square overflow-hidden rounded-lg border border-border bg-background"
            >
              <Image
                src={url}
                alt=""
                className="h-full w-full object-cover"
                width={200}
                height={200}
              />
              <button
                type="button"
                aria-label="Remove image"
                onClick={() => onRemove(i)}
                className="absolute right-1 top-1 rounded-md bg-black/60 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <FiTrash2 size={12} />
              </button>
            </li>
          ))}
        </ul>
      )}
      <label
        className={`flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border px-3 py-4 text-xs font-semibold text-foreground/80 ${
          atLimit
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer hover:border-primary/40 hover:text-primary"
        }`}
      >
        <FiPlus size={14} />
        Upload Images
        <input
          type="file"
          accept="image/*"
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
          Maximum of {max} gallery images reached.
        </p>
      )}
    </div>
  );
}