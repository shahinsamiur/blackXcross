import { api } from "../baseApi";

// --- Types ---
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
  createdAt: string;
}

export interface DashboardTheory {
  id: string;
  content: string;
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

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const dashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query<DashboardResponse, void>({
      query: () => "/dashboard",
      transformResponse: (response: ApiResponse<DashboardResponse>) =>
        response.data,
      providesTags: ["Dashboard"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetDashboardQuery } = dashboardApi;
