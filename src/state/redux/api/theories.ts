import { api } from "../baseApi";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface TheoryAuthor {
  id: string;
  name: string;
  username: string | null;
  avatar: string | null;
}

export interface TheoryItem {
  id: string;
  title: string;
  content: string | null;
  userId: string;
  user: TheoryAuthor;
  caseId: string;
  _count: { upvotes: number; comments: number };
  createdAt: string;
  updatedAt: string;
}

export interface CreateTheoryRequest {
  title: string;
  content?: string;
}

export const theoriesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCaseTheories: builder.query<TheoryItem[], string>({
      query: (caseId) => `/theories/cases/${caseId}/theories`,
      transformResponse: (response: ApiResponse<TheoryItem[]>) => response.data,
      providesTags: (result, error, caseId) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Theory" as const, id })),
              { type: "Theory", id: `CASE-${caseId}` },
            ]
          : [{ type: "Theory", id: `CASE-${caseId}` }],
    }),
    createTheory: builder.mutation<
      TheoryItem,
      { caseId: string; data: CreateTheoryRequest }
    >({
      query: ({ caseId, data }) => ({
        url: `/theories/cases/${caseId}/theories`,
        method: "POST",
        body: data,
      }),
      transformResponse: (response: ApiResponse<TheoryItem>) => response.data,
      invalidatesTags: (result, error, { caseId }) => [
        { type: "Theory", id: `CASE-${caseId}` },
      ],
    }),
    upvoteTheory: builder.mutation<void, { id: string; caseId: string }>({
      query: ({ id }) => ({
        url: `/theories/theories/${id}/upvote`,
        method: "POST",
      }),
      invalidatesTags: (result, error, { id, caseId }) => [
        { type: "Theory", id },
        { type: "Theory", id: `CASE-${caseId}` },
      ],
    }),
    removeTheoryUpvote: builder.mutation<void, { id: string; caseId: string }>({
      query: ({ id }) => ({
        url: `/theories/theories/${id}/upvote`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { id, caseId }) => [
        { type: "Theory", id },
        { type: "Theory", id: `CASE-${caseId}` },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCaseTheoriesQuery,
  useCreateTheoryMutation,
  useUpvoteTheoryMutation,
  useRemoveTheoryUpvoteMutation,
} = theoriesApi;
