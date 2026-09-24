import { api } from "../baseApi";

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

export interface AdminCommentUser {
  id: string;
  name: string;
  username: string | null;
  avatar: string | null;
}

export interface AdminCommentTheory {
  id: string;
  title: string;
}

export interface AdminComment {
  id: string;
  content: string;
  userId: string;
  user: AdminCommentUser;
  theoryId: string;
  theory: AdminCommentTheory;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
}

export const adminCommentsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAdminComments: build.query<ApiResponse<PaginatedResponse<AdminComment>>, { page?: number; limit?: number; search?: string }>({
      query: ({ page = 1, limit = 20, search }) => ({
        url: "/comments",
        params: { page, limit, search },
      }),
      providesTags: ["Comment"],
    }),
    deleteAdminComment: build.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/comments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comment", "Dashboard"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAdminCommentsQuery, useDeleteAdminCommentMutation } = adminCommentsApi;