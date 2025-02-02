import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {APP_ENV} from "../env";
import { RegisterField } from '../models/accounts';
import { Contact } from '../models/types';
export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: APP_ENV.REMOTE_BASE_URL }),
    endpoints: (builder) => ({
        getContacts: builder.query<Contact[], void>({
            query: () => 'users/users',
        }),      
        getUser: builder.query<Contact, number>({
            query: (id) => `users/users/${id}/`,
        }),
        registerUser: builder.mutation({
            query: (data: RegisterField) => ({
              url: "users/register/", 
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
                url: "users/login/",
                method: "POST",
                body: data,
            }),
        }),
    }),
    
});

export const { useGetContactsQuery, useRegisterUserMutation, useLoginUserMutation, useGetUserQuery } = api;
