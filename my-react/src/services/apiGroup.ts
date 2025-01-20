import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APP_ENV } from "../env";
import { IGroupItem, IGroupPostRequest, IGroupPutRequest } from '../models/types';
import { apiToken } from './apiToken';

// Створюємо API для груп
export const apiGroup = createApi({
    reducerPath: 'group',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${APP_ENV.REMOTE_BASE_URL}`,
        prepareHeaders: (headers) => {
            const token = apiToken.get(); // Отримання токену з локального сховища
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["Group"],
    endpoints: (builder) => ({
        getGroups: builder.query<IGroupItem[], void>({
            query: () => 'groups',
            providesTags: ["Group"],
        }),
        getGroup: builder.query<IGroupItem, number>({
            query: (id) => `groups/${id}/`,
            providesTags: (_, __, id) => [{ type: 'Group', id }],
        }),
        createGroup: builder.mutation<IGroupItem, IGroupPostRequest>({
            query: (newGroup) => {
                //const user = apiToken.getPayload();
                return {
                    url: 'groups/',
                    method: 'POST',
                    body: {
                        ...newGroup,
                    },
                };
            },
            invalidatesTags: ["Group"],
        }),
        updateGroup: builder.mutation<IGroupItem, IGroupPutRequest>({
            query: ({ id, ...updatedGroup }) => ({
                url: `groups/${id}/`,
                method: 'PUT',
                body: updatedGroup,
            }),
            invalidatesTags: (_, __, { id }) => [{ type: 'Group', id }],
        }),
        deleteGroup: builder.mutation<{ success: boolean }, number>({
            query: (id) => ({
                url: `groups/${id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Group"],
        }),
        getGroupMembers: builder.query<{ members: { id: number, username: string, role: string }[] }, number>({
            query: (id) => `groups/${id}/group-member/`, 
            providesTags: (_, __, id) => [{ type: 'Group', id }],
        }),
        joinGroup: builder.mutation({
            query: (groupId) => ({
                url: `groups/${groupId}/add-member/`, 
                method: 'POST',
            }),
        }),
        leaveGroup: builder.mutation({
            query: (groupId) => ({
                url: `groups/${groupId}/remove-member/`, 
                method: 'POST',
            }),
        }),
    }),
});

export const {
    useGetGroupsQuery,
    useGetGroupQuery,
    useCreateGroupMutation,
    useUpdateGroupMutation,
    useDeleteGroupMutation,
    useGetGroupMembersQuery,
    useJoinGroupMutation,
    useLeaveGroupMutation,
} = apiGroup;
