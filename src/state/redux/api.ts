import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tagTypes = [
  "Dashboard",
  "Case",
  "Theory",
  "User",
  "Group",
  "Comment",
  "Notification",
  "Report",
  "Moderation",
  "Auth",
] as const;

export type TagType = (typeof tagTypes)[number];

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
    credentials: "include",
  }),
  tagTypes: [...tagTypes],
  endpoints: () => ({}),
});

export const { reducer: apiReducer, middleware: apiMiddleware } = api;