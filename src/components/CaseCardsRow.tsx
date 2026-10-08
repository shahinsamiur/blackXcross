"use client";

import { useRef, useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import CaseCard from "./CaseCard";

interface CaseCardsRowProps {
  cases: any[];
  isLoading?: boolean;
}

export default function CaseCardsRow({ cases, isLoading }: CaseCardsRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeft(scrollLeft > 0);
      setShowRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (el) el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [cases]);

  const scrollPrev = () =>
    scrollRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  const scrollNext = () =>
    scrollRef.current?.scrollBy({ left: 320, behavior: "smooth" });

  if (isLoading) {
    return (
      <div className="relative px-4 pb-8 sm:px-6 lg:px-8">
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 scrollbar-none [&::-webkit-scrollbar]:hidden">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-64 w-80 shrink-0 animate-pulse rounded-xl bg-muted"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!cases || cases.length === 0) {
    return (
      <div className="px-4 pb-8 text-center text-muted sm:px-6 lg:px-8">
        No recent cases found.
      </div>
    );
  }

  return (
    <div className="relative px-4 pb-8 sm:px-6 lg:px-8">
      {showLeft && (
        <button
          type="button"
          aria-label="Scroll left"
          onClick={scrollPrev}
          className="absolute left-2 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-foreground/80 shadow-lg hover:text-primary sm:left-4 lg:flex"
        >
          <FiChevronLeft size={18} />
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory flex-col items-center gap-4 pb-2 scrollbar-none [&::-webkit-scrollbar]:hidden sm:flex-row sm:items-stretch sm:overflow-x-auto"
      >
        {cases.map((caseFile) => (
          <div
            key={caseFile.id}
            className="w-full shrink-0 snap-start sm:w-72 sm:max-w-none md:w-92"
          >
            <CaseCard caseFile={caseFile} />
          </div>
        ))}
      </div>

      {showRight && (
        <button
          type="button"
          aria-label="Show more cases"
          onClick={scrollNext}
          className="absolute right-2 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-foreground/80 shadow-lg hover:text-primary sm:right-4 lg:flex"
        >
          <FiChevronRight size={18} />
        </button>
      )}
    </div>
  );
}
