import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Contact} from '../types';
import {APP_ENV} from "../env";
import { RegisterField } from '../models/accounts';
export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: APP_ENV.REMOTE_BASE_URL }),
    endpoints: (builder) => ({
        getContacts: builder.query<Contact[], void>({
            query: () => 'users',
        }),
        registerUser: builder.mutation({
            query: (data: RegisterField) => ({
              url: "register/", 
              method: "POST",
              body: {
                username: data.username,
                email: data.email,
                password: data.password,
                profile: {
                  phone_number: data.phoneNumber,
                  date_of_birth: data.birthDate,
                },
              },
            }),
        }),
        loginUser: builder.mutation({
            query: (data: { email: string; password: string }) => ({
                url: "login/",
                method: "POST",
                body: data,
            }),
        }),
    }),
    
});

export const { useGetContactsQuery, useRegisterUserMutation, useLoginUserMutation } = api;
