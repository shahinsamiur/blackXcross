"use client";

import { useId, SVGProps } from "react";

export default function SkullMark(props: SVGProps<SVGSVGElement>) {
  const gradientId = useId();

  return (
    <svg viewBox="0 0 24 24" {...props}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--foreground)" stopOpacity="0.95" />
          <stop offset="55%" stopColor="var(--muted)" stopOpacity="1" />
          <stop
            offset="100%"
            stopColor="var(--foreground)"
            stopOpacity="0.55"
          />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gradientId})`}
        d="M12 2C6.48 2 2 6.15 2 11.25c0 3.2 1.77 6.02 4.47 7.66-.13.53-.35 1.4-.35 1.4a.75.75 0 0 0 .96.9l2.02-.7c.42.1.86.17 1.3.21v1.53a.75.75 0 0 0 1.5 0v-1.5h.2v1.5a.75.75 0 0 0 1.5 0v-1.53c.44-.04.88-.11 1.3-.21l2.02.7a.75.75 0 0 0 .96-.9s-.22-.87-.35-1.4C20.23 17.27 22 14.45 22 11.25 22 6.15 17.52 2 12 2Zm-4 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm8 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm-4 1.5a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z"
      />
    </svg>
  );
}
