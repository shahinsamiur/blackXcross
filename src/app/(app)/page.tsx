"use client";

import SearchFilterBar from "../../components/blackxcross/SearchFilterBar";
import CaseCardsRow from "../../components/blackxcross/CaseCardsRow";
import ActivityFeed from "../../components/blackxcross/ActivityFeed";
import InvestigationsMap from "../../components/blackxcross/InvestigationsMap";
import TrendingTheories from "../../components/blackxcross/TrendingTheories";
import CtaBanner from "../../components/blackxcross/CtaBanner";
import { useGetDashboardQuery } from "../../state/redux/api";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";

interface ErrorData {
   message?: string;

}

export default function Home() {
  const { data, isLoading, isError, error } = useGetDashboardQuery();

  const getErrorMessage = (err: FetchBaseQueryError | SerializedError): string => {
    if ("message" in err && err.message) {
      return err.message;
    }
    if ("data" in err && err.data) {
      const errorData = err.data as ErrorData;
      console.log("ahfasdf" , errorData)
      return errorData.message || JSON.stringify(errorData.message);
    }
    if ("error" in err && typeof err.error === "string") {
      return err.error;
    }
    
    return "An unknown error occurred";
  };

  return (
    <div className="flex w-full flex-col gap-4 px-4 pb-8 sm:px-6 lg:px-8">
      <SearchFilterBar />
      
      <CaseCardsRow cases={data?.recentCases || []} isLoading={isLoading} />
      
      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
        <ActivityFeed activities={data?.recentActivity || []} isLoading={isLoading} />
        <InvestigationsMap />
        <TrendingTheories theories={data?.trendingTheories || []} isLoading={isLoading} />
      </div>
      
      <CtaBanner />
      
      {isError && (
        <div className="rounded-lg border border-danger bg-danger/10 p-4 text-center text-danger">
          <p className="font-medium">Failed to load dashboard data. Please try again later.</p>
          
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