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

export interface ModerationReviewer {
  id: string;
  name: string;
  username: string | null;
}

export interface ModerationItem {
  id: string;
  targetType: "CASE" | "THEORY" | "COMMENT";
  targetId: string;
  reason: string | null;
  status: "PENDING" | "APPROVED" | "REJECTED";
  reviewedBy: string | null;
  reviewer: ModerationReviewer | null;
  fileUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export const moderationApi = api.injectEndpoints({
  endpoints: (build) => ({
    getModerationQueue: build.query<
      ApiResponse<PaginatedResponse<ModerationItem>>,
      { page?: number; limit?: number; status?: string; targetType?: string }
    >({
      query: ({ page = 1, limit = 20, status, targetType }) => ({
        url: "/moderation/queue",
        params: { page, limit, status, targetType },
      }),
      providesTags: ["Moderation"],
    }),
    getModerationItem: build.query<ApiResponse<ModerationItem>, string>({
      query: (id) => `/moderation/${id}`,
      providesTags: (result, error, id) => [{ type: "Moderation", id }],
    }),
    approveModerationItem: build.mutation<ApiResponse<ModerationItem>, string>({
      query: (id) => ({
        url: `/moderation/${id}/approve`,
        method: "POST",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Moderation", id },
        "Moderation",
        "Dashboard",
      ],
    }),
    rejectModerationItem: build.mutation<ApiResponse<ModerationItem>, string>({
      query: (id) => ({
        url: `/moderation/${id}/reject`,
        method: "POST",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Moderation", id },
        "Moderation",
        "Dashboard",
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetModerationQueueQuery,
  useGetModerationItemQuery,
  useApproveModerationItemMutation,
  useRejectModerationItemMutation,
} = moderationApi;
