import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APP_ENV } from "../env";
import { apiToken } from "./apiToken";

export const apiSearch = createApi({
  reducerPath: 'search',
  baseQuery: fetchBaseQuery({
    baseUrl: `${APP_ENV.REMOTE_BASE_URL}`,
    prepareHeaders: (headers) => {
      const token = apiToken.getAccessToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    search: builder.query<{ users: any[]; groups: any[]; posts: any[] }, string>({
      query: (query) => `search/?q=${query}`,
    }),
  }),
});

export const { useSearchQuery } = apiSearch;
