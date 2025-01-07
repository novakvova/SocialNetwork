import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Contact} from '../types';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:9178/api/api/' }),
    endpoints: (builder) => ({
        getContacts: builder.query<Contact[], void>({
            query: () => 'users/',
        }),
        
    }),
});

export const { useGetContactsQuery, } = api;
