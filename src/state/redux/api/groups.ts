import { api } from "../api";

// --- Types ---
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface GroupItem {
  id: string;
  name: string;
  description: string;
  avatarUrl?: string | null;
  category?: string | null;
  visibility: "public" | "private";
  memberCount: number;
  onlineCount?: number;
  createdAt: string;
}

export interface GroupListResponse {
  items: GroupItem[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}


export const groupsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getGroups: builder.query<GroupListResponse, void>({
      query: () => "/groups",
      transformResponse: (response: ApiResponse<GroupListResponse>) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({ type: "Group" as const, id })),
              { type: "Group", id: "LIST" },
            ]
          : [{ type: "Group", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetGroupsQuery } = groupsApi;