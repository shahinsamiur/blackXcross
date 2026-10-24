import { api } from "../baseApi";

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

interface RawGroup {
  id: string;
  name: string;
  description?: string | null;
  isPrivate: boolean;
  createdAt: string;
  _count?: { members: number };
}

interface RawGroupListResponse {
  items: RawGroup[];
  pagination?: GroupListResponse["pagination"];
}

const toGroupItem = (group: RawGroup): GroupItem => ({
  id: group.id,
  name: group.name,
  description: group.description ?? "",
  visibility: group.isPrivate ? "private" : "public",
  memberCount: group._count?.members ?? 0,
  createdAt: group.createdAt,
});

export interface CreateGroupRequest {
  name: string;
  description?: string;
  isPrivate?: boolean;
}

export interface CreatedGroup {
  id: string;
  name: string;
  description?: string | null;
  isPrivate: boolean;
  createdAt: string;
}

export const groupsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getGroups: builder.query<GroupListResponse, void>({
      query: () => "/groups",
      transformResponse: (
        response: ApiResponse<RawGroupListResponse>,
      ): GroupListResponse => ({
        ...response.data,
        items: response.data.items.map(toGroupItem),
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({ type: "Group" as const, id })),
              { type: "Group", id: "LIST" },
            ]
          : [{ type: "Group", id: "LIST" }],
    }),
    createGroup: builder.mutation<CreatedGroup, CreateGroupRequest>({
      query: (body) => ({ url: "/groups", method: "POST", body }),
      transformResponse: (response: ApiResponse<CreatedGroup>) => response.data,
      invalidatesTags: [{ type: "Group", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetGroupsQuery, useCreateGroupMutation } = groupsApi;