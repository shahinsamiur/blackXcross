"use client";

import { useState } from "react";
import Image from "next/image";
import { DEFAULT_AVATAR } from "../utils/avatar";

export default function ProfileAvatar({
  src,
  alt,
  size = 44,
}: {
  src: string;
  alt: string;
  size?: number;
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const finalSrc = !src || failedSrc === src ? DEFAULT_AVATAR : src;

  return (
    <span
      className="relative block shrink-0 overflow-hidden rounded-full ring-1 ring-primary/30"
      style={{ width: size, height: size }}
    >
      <Image
        src={finalSrc}
        alt={alt}
        fill
        unoptimized
        sizes={`${size}px`}
        onError={() => setFailedSrc(src)}
        className="object-cover grayscale contrast-125"
      />
      <span
        aria-hidden
        className="absolute inset-0 bg-primary mix-blend-multiply opacity-70"
      />
      <span
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle,transparent_35%,var(--background)_115%)] opacity-70"
      />
    </span>
  );
}