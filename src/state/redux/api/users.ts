import { api } from "../api";
import type { CaseListResponse } from "./cases";

// --- Types ---
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PublicUser {
  id: string;
  username: string;
  firstName?: string | null;
  lastName?: string | null;
  avatarUrl?: string | null;
  bio?: string | null;
  createdAt: string;
}

export interface TheoryItem {
  id: string;
  text: string;
  caseId: string;
  case?: { id: string; title: string };
  authorId: string;
  createdAt: string;
  _count?: {
    theoryUpvotes: number;
    comments: number;
  };
}

// --- Endpoints ---
export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<PublicUser, string>({
      query: (id) => `/users/${id}`,
      transformResponse: (response: ApiResponse<PublicUser>) => response.data,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
    getUserCases: builder.query<CaseListResponse, string>({
      query: (id) => `/users/${id}/cases`,
      transformResponse: (response: ApiResponse<CaseListResponse>) => response.data,
      providesTags: (result, error, id) => [{ type: "User", id: `${id}-CASES` }],
    }),
    getUserTheories: builder.query<{ items: TheoryItem[] }, string>({
      query: (id) => `/users/${id}/theories`,
      transformResponse: (response: ApiResponse<{ items: TheoryItem[] }>) => response.data,
      providesTags: (result, error, id) => [{ type: "User", id: `${id}-THEORIES` }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserQuery, useGetUserCasesQuery, useGetUserTheoriesQuery } = usersApi;