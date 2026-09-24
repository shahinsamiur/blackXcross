import { api } from "../api";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface CaseAuthor {
  id: string;
  username: string;
  name?: string | null;
  avatar?: string | null;
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

export interface CaseDetailResponse extends CaseItem {
  narrative?: string | null;
  files?: Array<{ id: string; url: string; filename: string; mimeType: string }>;
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

export interface CreateCaseRequest {
  title: string;
  description: string;
  category: string;
  investigationStatus: string;
  imageUrl: string;
  narrative?: string;
  location?: string;
  tags?: string[];
}

export interface UpdateCaseRequest extends Partial<CreateCaseRequest> {}

export interface CaseFileItem {
  id: string;
  caseId: string;
  url: string;
  filename: string;
  mimeType: string;
  size: number;
  createdAt: string;
}

export const casesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCases: builder.query<CaseListResponse, CaseListQuery>({
      query: (params) => ({ url: "/cases", params }),
      transformResponse: (response: ApiResponse<CaseListResponse>) => response.data,
      providesTags: (result) =>
        result
          ? [...result.items.map(({ id }) => ({ type: "Case" as const, id })), { type: "Case", id: "LIST" }]
          : [{ type: "Case", id: "LIST" }],
    }),
    getCase: builder.query<CaseDetailResponse, string>({
      query: (id) => `/cases/${id}`,
      transformResponse: (response: ApiResponse<CaseDetailResponse>) => response.data,
      providesTags: (result, error, id) => [{ type: "Case", id }],
    }),
    uploadCaseImage: builder.mutation<{ imageUrl: string }, File>({
      query: (file) => {
        const formData = new FormData();
        formData.append("image", file);
        return { url: "/cases/upload-image", method: "POST", body: formData };
      },
    }),
    addCaseFile: builder.mutation<CaseFileItem, { caseId: string; file: File }>({
      query: ({ caseId, file }) => {
        const formData = new FormData();
        formData.append("file", file);
        return { url: `/cases/${caseId}/files`, method: "POST", body: formData };
      },
      transformResponse: (response: ApiResponse<CaseFileItem>) => response.data,
      invalidatesTags: (result, error, { caseId }) => [{ type: "Case", id: caseId }],
    }),
    addCaseGalleryImage: builder.mutation<CaseFileItem, { caseId: string; file: File }>({
      query: ({ caseId, file }) => {
        const formData = new FormData();
        formData.append("file", file);
        return { url: `/cases/${caseId}/gallery`, method: "POST", body: formData };
      },
      transformResponse: (response: ApiResponse<CaseFileItem>) => response.data,
      invalidatesTags: (result, error, { caseId }) => [{ type: "Case", id: caseId }],
    }),
    createCase: builder.mutation<CaseDetailResponse, CreateCaseRequest>({
      query: (body) => ({ url: "/cases", method: "POST", body }),
      transformResponse: (response: ApiResponse<CaseDetailResponse>) => response.data,
      invalidatesTags: [{ type: "Case", id: "LIST" }, "User"],
    }),
    updateCase: builder.mutation<CaseDetailResponse, { id: string; data: UpdateCaseRequest }>({
      query: ({ id, data }) => ({ url: `/cases/${id}`, method: "PATCH", body: data }),
      invalidatesTags: (result, error, { id }) => [{ type: "Case", id }, { type: "Case", id: "LIST" }],
    }),
    publishCase: builder.mutation<CaseDetailResponse, string>({
      query: (id) => ({ url: `/cases/${id}/publish`, method: "POST" }),
      transformResponse: (response: ApiResponse<CaseDetailResponse>) => response.data,
      invalidatesTags: (result, error, id) => [{ type: "Case", id }, { type: "Case", id: "LIST" }],
    }),
    draftCase: builder.mutation<CaseDetailResponse, string>({
      query: (id) => ({ url: `/cases/${id}/draft`, method: "POST" }),
      transformResponse: (response: ApiResponse<CaseDetailResponse>) => response.data,
      invalidatesTags: (result, error, id) => [{ type: "Case", id }, { type: "Case", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCasesQuery,
  useGetCaseQuery,
  useUploadCaseImageMutation,
  useAddCaseFileMutation,
  useAddCaseGalleryImageMutation,
  useCreateCaseMutation,
  useUpdateCaseMutation,
  usePublishCaseMutation,
  useDraftCaseMutation,
} = casesApi;