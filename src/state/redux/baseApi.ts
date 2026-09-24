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
  "Analytics"
] as const;

export type TagType = (typeof tagTypes)[number];

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api", 
    credentials: "include",
  }),
  tagTypes: [...tagTypes],
  endpoints: () => ({}),
});

export const { reducer: apiReducer, middleware: apiMiddleware } = api;