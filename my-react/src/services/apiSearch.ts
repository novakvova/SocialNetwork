import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiToken } from "./apiToken";

const BASE_URL = "http://127.0.0.1:9178/api";

export const apiSearch = createApi({
  reducerPath: 'search',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = apiToken.getAccessToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    searchUsers: builder.query<any[], string>({
      query: (query) => `users/search?search=${encodeURIComponent(query)}`,
    }),
    searchGroups: builder.query< any[], string>({
      query: (query) => `groups/search?search=${encodeURIComponent(query)}`,
    }),
    searchPosts: builder.query<any[], string>({
      query: (query) => `posts/search?search=${encodeURIComponent(query)}`,
    }),
  }),
});

export const { useSearchUsersQuery, useSearchGroupsQuery, useSearchPostsQuery } = apiSearch;
