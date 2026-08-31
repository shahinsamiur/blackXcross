"use client";

import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { caseFilters } from "../../_mock/blackxcross";

export default function SearchFilterBar() {
  const [activeFilter, setActiveFilter] = useState<string>(caseFilters[0]);

  return (
    <div className="flex flex-col gap-4 px-4 pb-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold tracking-widest text-muted uppercase">
          Search Cases
        </span>
        <label className="relative flex w-full items-center sm:w-96">
          <FiSearch
            className="pointer-events-none absolute left-4 text-muted"
            size={18}
          />
          <input
            type="text"
            placeholder="Search case files, locations, or details..."
            className="w-full rounded-lg border border-border bg-card py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none"
          />
        </label>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold tracking-widest text-muted uppercase">
          Filter Cases
        </span>
        <div className="flex flex-wrap gap-2">
          {caseFilters.map((filter) => {
            const isActive = filter === activeFilter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? "border-primary  text-primary hover:border-primary/40"
                    : "border-border bg-card text-foreground/80 hover:border-primary/40"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
