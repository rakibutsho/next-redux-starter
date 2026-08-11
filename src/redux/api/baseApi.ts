import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

// Determine the base URL based on Node environment or NEXT_PUBLIC_ENV
// Vercel / Next.js auto-sets process.env.NODE_ENV
const getBaseUrl = () => {
  if (
    process.env.NEXT_PUBLIC_ENV === "production" ||
    process.env.NODE_ENV === "production"
  ) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }
  return (
    process.env.NEXT_PUBLIC_DEV_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL
  );
};

const baseUrl = getBaseUrl();

if (!baseUrl) {
  console.warn("API URL is missing! Check your .env configuration.");
}

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl || "",
    prepareHeaders: (headers, { getState }) => {
      // Get token from Redux state
      const state = getState() as RootState;
      const token = state?.auth?.token;

      if (token) {
        // Use standard Bearer token format if applicable, or just the token
        headers.set("Authorization", `Bearer ${token}`);
      }

      // Add common headers if needed
      headers.set("Accept", "application/json");

      return headers;
    },
  }),
  // Define tag types for caching and invalidation
  tagTypes: ["User", "Profile", "Dashboard"],
  endpoints: () => ({}),
});

export default baseApi;
