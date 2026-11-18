"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FiX, FiZoomIn, FiZoomOut, FiRotateCcw } from "react-icons/fi";

type LightboxImage = {
  url: string;
  filename: string;
};

type ImageLightboxProps = {
  image: LightboxImage;
  onClose: () => void;
};

const MIN_SCALE = 1;
const MAX_SCALE = 5;
const STEP = 0.5;

export function ImageLightbox({ image, onClose }: ImageLightboxProps) {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, offsetX: 0, offsetY: 0 });

  const zoomTo = useCallback((next: number) => {
    const clamped = Math.min(MAX_SCALE, Math.max(MIN_SCALE, next));
    setScale(clamped);
    if (clamped === MIN_SCALE) setOffset({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "+" || e.key === "=") zoomTo(scale + STEP);
      else if (e.key === "-") zoomTo(scale - STEP);
      else if (e.key === "0") zoomTo(MIN_SCALE);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [scale, onClose, zoomTo]);

  const handlePointerDown = (e: React.PointerEvent<HTMLImageElement>) => {
    if (scale <= MIN_SCALE) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      offsetX: offset.x,
      offsetY: offset.y,
    };
    setDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLImageElement>) => {
    if (!dragging) return;
    setOffset({
      x: dragStart.current.offsetX + (e.clientX - dragStart.current.x),
      y: dragStart.current.offsetY + (e.clientY - dragStart.current.y),
    });
  };

  const handlePointerUp = () => setDragging(false);

  const toolbarButton =
    "rounded-md bg-white/10 p-2 text-white transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.filename}
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onWheel={(e) => zoomTo(scale - e.deltaY * 0.002)}
    >
      <div className="absolute right-4 top-4 z-10 flex items-center gap-2">
        <button
          type="button"
          aria-label="Zoom out"
          onClick={() => zoomTo(scale - STEP)}
          disabled={scale <= MIN_SCALE}
          className={toolbarButton}
        >
          <FiZoomOut size={18} />
        </button>
        <span className="min-w-12 text-center text-xs font-medium text-white/80">
          {Math.round(scale * 100)}%
        </span>
        <button
          type="button"
          aria-label="Zoom in"
          onClick={() => zoomTo(scale + STEP)}
          disabled={scale >= MAX_SCALE}
          className={toolbarButton}
        >
          <FiZoomIn size={18} />
        </button>
        <button
          type="button"
          aria-label="Reset zoom"
          onClick={() => zoomTo(MIN_SCALE)}
          disabled={scale === MIN_SCALE}
          className={toolbarButton}
        >
          <FiRotateCcw size={18} />
        </button>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className={toolbarButton}
        >
          <FiX size={18} />
        </button>
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.url}
        alt={image.filename}
        draggable={false}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onDoubleClick={() => zoomTo(scale > MIN_SCALE ? MIN_SCALE : 2.5)}
        className="max-h-[85vh] max-w-[90vw] touch-none select-none object-contain"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
          cursor: scale > MIN_SCALE ? (dragging ? "grabbing" : "grab") : "zoom-in",
          transition: dragging ? "none" : "transform 150ms ease-out",
        }}
      />

      <p className="pointer-events-none absolute bottom-4 left-1/2 max-w-[80vw] -translate-x-1/2 truncate text-xs text-white/80">
        {image.filename}
      </p>
    </div>
  );
}