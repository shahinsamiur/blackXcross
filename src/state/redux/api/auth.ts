import { api } from "../api";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface User {
  id: string;
  email: string;
  username: string;
  name?: string | null;
  avatarUrl?: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterResponse {
  user: {
    id: string;
    email: string;
    username: string;
  };
  message: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface VerifyEmailRequest {
  code: string;
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<{ data: { user: User } }, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: ["User"],
      transformResponse: (response: { data: { user: User } }) => response,
      transformErrorResponse: (response) => {
        return { status: response.status, message: "Not authenticated" };
      },
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation<{ message: string }, ForgotPasswordRequest>({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation<{ message: string }, ResetPasswordRequest>({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
    verifyEmail: builder.mutation<{ message: string }, VerifyEmailRequest>({
      query: (data) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMeQuery,
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation,
} = authApi;