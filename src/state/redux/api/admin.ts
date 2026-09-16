import { api } from "../api";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}


export interface AdminReport {
  id: string;
  reporterId: string;
  targetId: string;
  targetType: string;
  targetLabel: string;
  reporter: string;
  reason: string;
  status: string;
  createdAt: string;
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
  createdAt: string
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

export const adminApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAdminDashboard: build.query<ApiResponse<AdminDashboardData>, void>({
      query: () => "/admin/dashboard",
      providesTags: ["Dashboard"],
    }),
    getAdminUsers: build.query<
      ApiResponse<PaginatedResponse<AdminUser>>,
      { page?: number; limit?: number; search?: string; role?: string; status?: string }
    >({
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
    getAdminCases: build.query<
      ApiResponse<PaginatedResponse<AdminCase>>,
      { page?: number; limit?: number; search?: string; publishState?: string; category?: string }
    >({
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

    getAdminReports: build.query<
      ApiResponse<PaginatedResponse<AdminReport>>,
      { page?: number; limit?: number; status?: string; targetType?: string }
    >({
      query: ({ page = 1, limit = 20, status, targetType }) => ({
        url: "/admin/reports",
        params: { page, limit, status, targetType },
      }),
      providesTags: ["Report"],
    }),
    updateReport: build.mutation<
      ApiResponse<AdminReport>,
      { id: string; status: string; adminNotes?: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/admin/reports/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Report", "Dashboard"],
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
  useUpdateReportMutation,
} = adminApi;