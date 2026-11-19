"use client";

import { useMemo, useState } from "react";
import SearchFilterBar from "../../components/SearchFilterBar";
import CaseCardsRow from "../../components/CaseCardsRow";
import ActivityFeed from "../../components/ActivityFeed";
import InvestigationsMap from "../../components/InvestigationsMap";
import TrendingTheories from "../../components/TrendingTheories";
import CtaBanner from "../../components/CtaBanner";
import { useGetDashboardQuery } from "../../state/redux/api/dashboard";
import { caseFilters } from "../../_mock/blackxcross";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";

interface ErrorData {
  message?: string;
}

type DashboardCase = {
  title?: string;
  name?: string;
  location?: string;
  summary?: string;
  description?: string;
  details?: string;
  status?: string;
  type?: string;
  caseType?: string;
  category?: string;
};

export default function Home() {
  const { data, isLoading, isError, error } = useGetDashboardQuery();
  const [query, setQuery] = useState("");
  const [caseFilter, setCaseFilter] = useState<string>(caseFilters[0]);

  const getErrorMessage = (
    err: FetchBaseQueryError | SerializedError,
  ): string => {
    if ("message" in err && err.message) return err.message;
    if ("data" in err && err.data) {
      const errorData = err.data as ErrorData;
      return errorData.message || JSON.stringify(errorData.message);
    }
    if ("error" in err && typeof err.error === "string") return err.error;
    return "An unknown error occurred";
  };

  const visibleCases = useMemo(() => {
    const source = (data?.recentCases ?? []) as DashboardCase[];
    const q = query.trim().toLowerCase();
    const showAll = !caseFilter || caseFilter === caseFilters[0];
    const wanted = caseFilter.toLowerCase().replace(/\s*case\s*/g, "").trim();

    return source
      .filter((item) => {
        const kind = String(
          item.status ?? item.type ?? item.caseType ?? item.category ?? "",
        ).toLowerCase();
        const typeOk = showAll || kind.includes(wanted);
        if (!typeOk) return false;
        if (!q) return true;
        const haystack = [
          item.title,
          item.name,
          item.location,
          item.summary,
          item.description,
          item.details,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      })
      .slice(0, 5);
  }, [data?.recentCases, query, caseFilter]);

  return (
    <div className="flex w-full flex-col gap-4 px-4 pb-8 sm:px-6 lg:px-8">
      <SearchFilterBar onSearch={setQuery} onFilterChange={setCaseFilter} />
      <CaseCardsRow cases={visibleCases} isLoading={isLoading} />
      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
        <ActivityFeed
          activities={data?.recentActivity || []}
          isLoading={isLoading}
        />
               <InvestigationsMap stats={data?.stats} />
        <TrendingTheories
          theories={data?.trendingTheories || []}
          isLoading={isLoading}
        />
      </div>
      <CtaBanner />
      {isError && (
        <div className="rounded-lg border border-danger bg-danger/10 p-4 text-center text-danger">
          <p className="font-medium">
            Failed to load dashboard data. Please try again later.
          </p>
          {process.env.NODE_ENV === "development" && error && (
            <pre className="mt-2 text-left text-xs whitespace-pre-wrap wrap-break-word bg-black/5 p-3 rounded-md">
              {getErrorMessage(error)}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}