import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface DashboardAuthor {
  id: string;
  name: string | null;
  username: string | null;
  avatarUrl: string | null;
}

export interface DashboardCase {
  id: string;
  title: string;
  category: string;
  status: string;
  imageUrl?: string | null;
  author: DashboardAuthor;
  // _count: { theories: number; comments: number };
  createdAt: string;
}

export interface DashboardTheory {
  id: string;
  text: string;
  author: DashboardAuthor;
  case: { id: string; title: string };
  _count: { theoryUpvotes: number; comments: number };
  createdAt: string;
}

export interface DashboardActivity {
  id: string;
  type: "COMMENT" | "CASE" | "THEORY";
  author: DashboardAuthor;
  caseTitle?: string | null;
  theoryTitle?: string | null;
  createdAt: string;
}

export interface DashboardStats {
  totalCases: number;
  totalTheories: number;
  totalUsers: number;
}

export interface DashboardResponse {
  recentCases: DashboardCase[];
  trendingTheories: DashboardTheory[];
  recentActivity: DashboardActivity[];
  stats: DashboardStats;
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
    credentials: "include",
  }),
  tagTypes: ["Dashboard", "Case", "Theory", "User", "Group", "Comment"],
  endpoints: (builder) => ({
    getDashboard: builder.query<DashboardResponse, void>({
      query: () => "/dashboard",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetDashboardQuery } = api;