import { api } from "../api";
import type { CaseItem } from "./cases";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PublicUser {
  id: string;
  username: string;
  name?: string | null;
  bio?: string | null;
  avatar?: string | null;
  title?: string | null;
  location?: string | null;
  website?: string | null;
  createdAt: string;
}

export interface TheoryItem {
  id: string;
  text: string;
  caseId: string;
  case?: { id: string; title: string };
  authorId: string;
  createdAt: string;
  _count?: { theoryUpvotes: number; comments: number };
}

export interface UpdateUserRequest {
  name?: string;
  username?: string;
  bio?: string;
  avatar?: string;
  title?: string;
  location?: string;
  website?: string;
}

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<PublicUser, string>({
      query: (id) => `/users/${id}`,
      transformResponse: (response: ApiResponse<PublicUser>) => response.data,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
    getMe: builder.query<PublicUser, void>({
      query: () => `/users/me`,
      transformResponse: (response: ApiResponse<PublicUser>) => response.data,
      providesTags: (result) =>
        result ? [{ type: "User", id: result.id }] : ["User"],
    }),
    getUserCases: builder.query<CaseItem[], string>({
      query: (id) => `/users/${id}/cases`,
      transformResponse: (response: ApiResponse<CaseItem[]>) => response.data,
      providesTags: (result, error, id) => [
        { type: "User", id: `${id}-CASES` },
      ],
    }),
    getUserTheories: builder.query<{ items: TheoryItem[] }, string>({
      query: (id) => `/users/${id}/theories`,
      transformResponse: (response: ApiResponse<{ items: TheoryItem[] }>) =>
        response.data,
      providesTags: (result, error, id) => [
        { type: "User", id: `${id}-THEORIES` },
      ],
    }),
    uploadAvatar: builder.mutation<PublicUser, { id: string; file: File }>({
      query: ({ id, file }) => {
        const formData = new FormData();
        formData.append("avatar", file);
        return { url: `/users/${id}/avatar`, method: "POST", body: formData };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "User", id }],
    }),
    updateUser: builder.mutation<
      PublicUser,
      { id: string; data: UpdateUserRequest }
    >({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "User", id }],
    }),
    deleteUser: builder.mutation<{ message: string }, string>({
      query: (id) => ({ url: `/users/${id}`, method: "DELETE" }),
      invalidatesTags: ["User"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMeQuery,
  useGetUserQuery,
  useGetUserCasesQuery,
  useGetUserTheoriesQuery,
  useUploadAvatarMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
