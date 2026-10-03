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

export interface AdminGroupOwnerMember {
  user: {
    id: string;
    name: string;
    username: string | null;
    avatar: string | null;
  };
}

export interface AdminGroup {
  id: string;
  name: string;
  description: string | null;
  isPrivate: boolean;
  members: AdminGroupOwnerMember[];
  _count: { members: number };
  createdAt: string;
  updatedAt: string;
}

export const adminGroupsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAdminGroups: build.query<
      ApiResponse<PaginatedResponse<AdminGroup>>,
      { page?: number; limit?: number; search?: string }
    >({
      query: ({ page = 1, limit = 20, search }) => ({
        url: "/groups",
        params: { page, limit, search },
      }),
      providesTags: ["Group"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAdminGroupsQuery } = adminGroupsApi;
