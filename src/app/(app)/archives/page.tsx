"use client";

import { useMemo, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { caseFiles, caseFilters, type CaseFile } from "../../../_mock/blackxcross";
import SearchFilterBar from "../../../components/blackxcross/SearchFilterBar";
import CaseCard from "../../../components/blackxcross/CaseCard";
import { usePagination } from "../../../hooks/usePagination";

const ITEMS_PER_PAGE = 9;

export default function ArchivesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] =
    useState<(typeof caseFilters)[number]>(caseFilters[0]);

  const filteredCases = useMemo(() => {
    let result: CaseFile[] = caseFiles;

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.location?.toLowerCase().includes(q),
      );
    }

    switch (activeFilter) {
      case "Cold Cases":
        result = result.filter((c) => c.status === "COLD CASE");
        break;
      case "Open Investigations":
        result = result.filter((c) => c.status === "OPEN CASE");
        break;
      case "Recent Submissions":
        result = [...result].sort(
          (a, b) =>
            new Date(b.submittedAt).getTime() -
            new Date(a.submittedAt).getTime(),
        );
        break;
      default:
        break;
    }

    return result;
  }, [searchQuery, activeFilter]);

  const { currentPage, totalPages, paginatedData, nextPage, prevPage } =
    usePagination({ data: filteredCases, itemsPerPage: ITEMS_PER_PAGE });

  return (
    <div className="flex w-full flex-col gap-6 px-4 pb-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
          Case Archive
        </h1>
        <p className="text-sm text-muted">
          {filteredCases.length} case
          {filteredCases.length === 1 ? "" : "s"} in the archive
        </p>
      </div>

      <SearchFilterBar
        onSearchChange={setSearchQuery}
        onFilterChange={setActiveFilter}
      />

      {paginatedData.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {paginatedData.map((caseFile) => (
            <CaseCard key={caseFile.id} caseFile={caseFile} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-10 text-center">
          <p className="text-sm text-muted">
            No cases match your search or filter.
          </p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 pt-2">
          <button
            type="button"
            onClick={prevPage}
            disabled={currentPage === 1}
            aria-label="Previous page"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground/80 hover:border-primary/40 hover:text-primary disabled:opacity-40 disabled:hover:border-border disabled:hover:text-foreground/80"
          >
            <FiChevronLeft size={16} />
          </button>
          <span className="text-xs font-medium text-muted">
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            onClick={nextPage}
            disabled={currentPage === totalPages}
            aria-label="Next page"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground/80 hover:border-primary/40 hover:text-primary disabled:opacity-40 disabled:hover:border-border disabled:hover:text-foreground/80"
          >
            <FiChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}