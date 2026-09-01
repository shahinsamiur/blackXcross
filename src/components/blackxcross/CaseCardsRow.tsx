"use client";

import { useRef } from "react";
import { FiChevronRight } from "react-icons/fi";
import { caseFiles } from "../../_mock/blackxcross";
import CaseCard from "./CaseCard";

export default function CaseCardsRow() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollNext = () => {
    scrollRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  return (
    <div className="relative px-4 pb-8 sm:px-6 lg:px-8">
      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 scrollbar-none [&::-webkit-scrollbar]:hidden"
      >
        {caseFiles.map((caseFile) => (
          <CaseCard key={caseFile.id} caseFile={caseFile} />
        ))}
      </div>

      <button
        type="button"
        aria-label="Show more cases"
        onClick={scrollNext}
        className="absolute right-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-foreground/80 shadow-lg hover:text-primary sm:right-4 lg:flex"
      >
        <FiChevronRight size={18} />
      </button>
    </div>
  );
}
