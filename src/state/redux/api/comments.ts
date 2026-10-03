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

export interface CommentAuthor {
  id: string;
  name: string;
  username: string | null;
  avatar: string | null;
}

export interface CommentItem {
  id: string;
  content: string;
  userId: string;
  user: CommentAuthor;
  theoryId: string;
  parentId: string | null;
  replies: CommentItem[];
  createdAt: string;
  updatedAt: string;
}

export const commentsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTheoryComments: builder.query<
      PaginatedResponse<CommentItem>,
      { theoryId: string; page?: number; limit?: number }
    >({
      query: ({ theoryId, page = 1, limit = 20 }) => ({
        url: `/comments/theories/${theoryId}/comments`,
        params: { page, limit },
      }),
      transformResponse: (
        response: ApiResponse<PaginatedResponse<CommentItem>>,
      ) => response.data,
      providesTags: (result, error, { theoryId }) =>
        result
          ? [
              ...result.items.map(({ id }) => ({
                type: "Comment" as const,
                id,
              })),
              { type: "Comment", id: `THEORY-${theoryId}` },
            ]
          : [{ type: "Comment", id: `THEORY-${theoryId}` }],
    }),
    createComment: builder.mutation<
      CommentItem,
      { theoryId: string; content: string }
    >({
      query: ({ theoryId, content }) => ({
        url: `/comments/theories/${theoryId}/comments`,
        method: "POST",
        body: { content },
      }),
      transformResponse: (response: ApiResponse<CommentItem>) => response.data,
      invalidatesTags: (result, error, { theoryId }) => [
        { type: "Comment", id: `THEORY-${theoryId}` },
      ],
    }),
    createCommentReply: builder.mutation<
      CommentItem,
      { parentId: string; theoryId: string; content: string }
    >({
      query: ({ parentId, content }) => ({
        url: `/comments/comments/${parentId}/replies`,
        method: "POST",
        body: { content },
      }),
      transformResponse: (response: ApiResponse<CommentItem>) => response.data,
      invalidatesTags: (result, error, { theoryId }) => [
        { type: "Comment", id: `THEORY-${theoryId}` },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTheoryCommentsQuery,
  useCreateCommentMutation,
  useCreateCommentReplyMutation,
} = commentsApi;
