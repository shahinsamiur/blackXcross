import { api } from "../api";
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface CaseAuthor {
  id: string;
  username: string;
  firstName?: string | null;
  lastName?: string | null;
  avatarUrl?: string | null;
}

export interface CaseTag {
  id: string;
  name: string;
}

export interface CaseItem {
  id: string;
  title: string;
  description: string;
  category: string;
  investigationStatus: string;
  publishState: string;
  imageUrl?: string | null;
  location?: string | null;
  caseNumber?: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user?: CaseAuthor;
  tags?: CaseTag[];
  _count?: {
    theories: number;
    comments: number;
    files: number;
  };
}

export interface CaseListResponse {
  items: CaseItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CaseListQuery {
  search?: string;
  category?: string;
  status?: string;
  tag?: string;
  sort?: "newest" | "oldest";
  page?: number;
  limit?: number;
}

export const casesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCases: builder.query<CaseListResponse, CaseListQuery>({
      query: (params) => ({
        url: "/cases",
        params,
      }),
      transformResponse: (response: ApiResponse<CaseListResponse>) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({ type: "Case" as const, id })),
              { type: "Case", id: "LIST" },
            ]
          : [{ type: "Case", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetCasesQuery } = casesApi;