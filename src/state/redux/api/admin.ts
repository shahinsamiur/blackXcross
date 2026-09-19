import { api } from "../api";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface AdminReportReporter {
  id: string;
  name: string;
  username: string | null;
  avatar: string | null;
}

export interface AdminReport {
  id: string;
  reporterId: string;
  reporter: AdminReportReporter;
  targetType: string;
  targetId: string;
  reason: string;
  status: string;
  adminNotes: string | null;
  resolvedBy: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AdminFlag {
  id: string;
  contentId: string;
  contentType: string;
  contentLabel: string;
  aiFlagReason: string;
  reason: string;
  status: string;
  flaggedAt: string;
}

export interface AdminCase {
  id: string;
  title: string;
  authorId: string;
  category: string;
  publishState: string;
  createdAt: string;
}

export interface AdminDashboardData {
  totals: {
    users: number;
    cases: number;
    theories: number;
    comments: number;
    pendingReports: number;
    pendingModeration: number;
  };
  growth: {
    last7Days: { users: number; cases: number };
    last30Days: { users: number; cases: number };
  };
  recentUsers: Array<{
    id: string;
    name: string;
    username: string | null;
    avatar: string | null;
    role: string;
    status: string;
    createdAt: string;
  }>;
  recentReports: AdminReport[];
  recentFlags?: AdminFlag[];
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: string;
  status: "ACTIVE" | "SUSPENDED" | "BANNED" | "Active" | "Suspended" | "Banned";
  joinDate: string;
  casesSubmitted: number;
  reportsFiled: number;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
export interface AdminAnalyticsResponse {
  totals: {
    users: number;
    cases: number;
    theories: number;
    comments: number;
    pendingReports: number;
    pendingModeration: number;
  };
  growth: {
    last7Days: { users: number; cases: number };
    last30Days: { users: number; cases: number };
  };
  casesByCategory: { category: string | null; count: number }[];
  reportsByStatus: { status: string; count: number }[];
}

export const adminApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAdminDashboard: build.query<ApiResponse<AdminDashboardData>, void>({
      query: () => "/admin/dashboard",
      providesTags: ["Dashboard"],
    }),
    getAdminUsers: build.query<ApiResponse<PaginatedResponse<AdminUser>>, { page?: number; limit?: number; search?: string; role?: string; status?: string }>({
      query: ({ page = 1, limit = 20, search, role, status }) => ({
        url: "/admin/users",
        params: { page, limit, search, role, status },
      }),
      providesTags: ["User"],
    }),
    suspendUser: build.mutation<ApiResponse<AdminUser>, string>({
      query: (id) => ({
        url: `/admin/users/${id}/suspend`,
        method: "PATCH",
      }),
      invalidatesTags: ["User", "Dashboard"],
    }),
    banUser: build.mutation<ApiResponse<AdminUser>, string>({
      query: (id) => ({
        url: `/admin/users/${id}/ban`,
        method: "PATCH",
      }),
      invalidatesTags: ["User", "Dashboard"],
    }),
    getAdminCases: build.query<ApiResponse<PaginatedResponse<AdminCase>>, { page?: number; limit?: number; search?: string; publishState?: string; category?: string }>({
      query: ({ page = 1, limit = 20, search, publishState, category }) => ({
        url: "/admin/cases",
        params: { page, limit, search, publishState, category },
      }),
      providesTags: ["Case"],
    }),
    deleteCase: build.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/admin/cases/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Case", "Dashboard"],
    }),
    getAdminUserById: build.query<ApiResponse<AdminUser>, string>({
      query: (id) => `/admin/users/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
    reactivateUser: build.mutation<ApiResponse<AdminUser>, string>({
      query: (id) => ({
        url: `/admin/users/${id}/reactivate`,
        method: "PATCH",
      }),
      invalidatesTags: ["User", "Dashboard"],
    }),
    getAdminReports: build.query<ApiResponse<PaginatedResponse<AdminReport>>, { page?: number; limit?: number; status?: string; targetType?: string }>({
      query: ({ page = 1, limit = 20, status, targetType }) => ({
        url: "/admin/reports",
        params: { page, limit, status, targetType },
      }),
      providesTags: ["Report"],
    }),
    getAdminReportById: build.query<ApiResponse<AdminReport>, string>({
      query: (id) => `/reports/${id}`,
      providesTags: (result, error, id) => [{ type: "Report", id }],
    }),
    updateReport: build.mutation<ApiResponse<AdminReport>, { id: string; status: string; adminNotes?: string }>({
      query: ({ id, ...body }) => ({
        url: `/admin/reports/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Report", "Dashboard"],
    }),
    getAdminAnalytics: build.query<AdminAnalyticsResponse, void>({
  query: () => '/admin/analytics',
  providesTags: [{ type: 'Analytics', id: 'OVERVIEW' }], 
  // Note: Ensure 'Analytics' is added to your base API `tagTypes` array if not already present
}),
  }),
  overrideExisting: false,
});

export const {
  useGetAdminDashboardQuery,
  useGetAdminUsersQuery,
  useGetAdminUserByIdQuery,
  useSuspendUserMutation,
  useBanUserMutation,
  useReactivateUserMutation,
  useGetAdminCasesQuery,
  useDeleteCaseMutation,
  useGetAdminReportsQuery,
  useGetAdminReportByIdQuery,
  useUpdateReportMutation,
  useGetAdminAnalyticsQuery
} = adminApi;