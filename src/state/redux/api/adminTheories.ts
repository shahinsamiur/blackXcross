import { api } from "../api";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
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

export interface AdminTheoryUser {
  id: string;
  name: string;
  username: string | null;
  avatar: string | null;
}

export interface AdminTheoryCase {
  id: string;
  title: string;
}

export interface AdminTheory {
  id: string;
  title: string;
  content: string | null;
  userId: string;
  user: AdminTheoryUser;
  caseId: string;
  case: AdminTheoryCase;
  _count: { upvotes: number; comments: number };
  createdAt: string;
  updatedAt: string;
}

export const adminTheoriesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAdminTheories: build.query<ApiResponse<PaginatedResponse<AdminTheory>>, { page?: number; limit?: number; search?: string }>({
      query: ({ page = 1, limit = 20, search }) => ({
        url: "/theories",
        params: { page, limit, search },
      }),
      providesTags: ["Theory"],
    }),
    deleteAdminTheory: build.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/theories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Theory", "Dashboard"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAdminTheoriesQuery, useDeleteAdminTheoryMutation } = adminTheoriesApi;