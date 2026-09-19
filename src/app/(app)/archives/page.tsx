"use client";

import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import SearchFilterBar from "../../../components/SearchFilterBar";
import CaseCard from "../../../components/CaseCard";
import { useGetCasesQuery } from "@/src/state/redux/api/cases"; 

const caseFilters = ["All Cases", "Cold Cases", "Open Investigations", "Recent Submissions"];
const ITEMS_PER_PAGE = 9;

const SkeletonCard = () => (
  <div className="flex w-60 shrink-0 snap-start flex-col gap-8 rounded-xl border border-border bg-card p-5 px-3 sm:w-72 sm:gap-10 sm:px-4 md:w-92 animate-pulse">
    <div className="flex items-center justify-between gap-2">
      <div className="h-5 w-20 rounded-md bg-muted" />
      <div className="h-4 w-12 rounded bg-muted" />
    </div>
    <div className="flex flex-col gap-6 sm:gap-10">
      <div className="h-6 w-3/4 rounded bg-muted" />
      <div className="h-4 w-full rounded bg-muted" />
      <div className="h-4 w-5/6 rounded bg-muted" />
    </div>
    <div className="mt-auto flex items-center justify-between gap-2 pt-2">
      <div className="h-5 w-20 rounded bg-muted" />
      <div className="h-4 w-16 rounded bg-muted" />
    </div>
  </div>
);

export default function ArchivesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>(caseFilters[0]);
  const [currentPage, setCurrentPage] = useState(1);

  const queryParams = {
    search: searchQuery.trim() || undefined,
    status:
      activeFilter === "Cold Cases"
        ? "COLD"
        : activeFilter === "Open Investigations"
          ? "OPEN"
          : undefined,
    sort: activeFilter === "Recent Submissions" ? "newest" : "newest",
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  };

  const { data, isLoading, isFetching, error } = useGetCasesQuery(queryParams);

  const cases = data?.items || [];
  const totalPages = data?.pagination?.totalPages || 1;

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleFilterChange = (val: string | unknown) => {
    setActiveFilter(val as string);
    setCurrentPage(1);
  };

  return (
    <div className="flex w-full flex-col gap-6 px-4 pb-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
          Case Archive
        </h1>
        <p className="text-sm text-muted">
          {data?.pagination?.total ?? 0} case
          {(data?.pagination?.total ?? 0) === 1 ? "" : "s"} in the archive
        </p>
      </div>

      <SearchFilterBar
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
      />

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-10 text-center">
          <p className="text-sm text-destructive">
            Failed to load cases. Please try again later.
          </p>
        </div>
      ) : cases.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cases.map((caseFile) => (
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
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1 || isFetching}
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
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || isFetching}
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