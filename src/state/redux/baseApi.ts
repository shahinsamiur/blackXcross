import { createApi } from "@reduxjs/toolkit/query/react";
import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { logout } from "./slices/authSlice";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
});

type RefreshOutcome = "ok" | "unauthorized" | "failed";

let refreshPromise: Promise<RefreshOutcome> | null = null;

const refreshSession = async (
  api: any,
  extraOptions: any,
): Promise<RefreshOutcome> => {
  if (!refreshPromise) {
    refreshPromise = (async (): Promise<RefreshOutcome> => {
      const result = await rawBaseQuery(
        { url: "/auth/refresh", method: "POST" },
        api,
        extraOptions,
      );
      if (!result.error) return "ok";
      return result.error.status === 401 ? "unauthorized" : "failed";
    })().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
};

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);
  if (result.error?.status !== 401) return result;

  const url = typeof args === "string" ? args : args.url;
  if (
    url.includes("/auth/login") ||
    url.includes("/auth/refresh") ||
    url.includes("/auth/logout")
  ) {
    return result;
  }

  const outcome = await refreshSession(api, extraOptions);
  if (outcome === "unauthorized") {
    api.dispatch(logout());
    return result;
  }
  if (outcome === "failed") {
    return result;
  }

  return rawBaseQuery(args, api, extraOptions);
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "User",
    "Case",
    "Comment",
    "Group",
    "Theory",
    "Dashboard",
    "Notification",
    "Report",
    "Moderation",
    "Admin",
    "Analytics",
  ],
  endpoints: () => ({}),
});
