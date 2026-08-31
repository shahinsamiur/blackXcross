"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { testimonials } from "../lib/data";

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section id="testimonials" className="bg-ink py-20 text-ivory md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
          What the finance team says, not marketing.
        </h2>
        <p className="mt-2 text-sm text-ivory/50">Drag to browse</p>
      </div>

      <motion.div
        ref={trackRef}
        className="mt-10 flex cursor-grab gap-5 overflow-x-hidden px-6 active:cursor-grabbing md:px-[calc((100%-72rem)/2+1.5rem)]"
        drag="x"
        dragConstraints={{ left: -1200, right: 0 }}
        dragElastic={0.1}
      >
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="w-[300px] shrink-0 select-none rounded-lg border border-ivory/15 bg-ivory/5 p-6 md:w-[360px]"
          >
            <p className="text-lg leading-relaxed text-ivory/90">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="mt-6">
              <p className="font-display text-sm font-semibold">{t.name}</p>
              <p className="text-xs text-ivory/50">{t.role}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
