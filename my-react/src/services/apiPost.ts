import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APP_ENV } from "../env";
import { Post, Comment } from "../models/posts";
import { apiToken } from './apiToken';

export const apiPosts = createApi({
    reducerPath: 'posts',
    baseQuery: fetchBaseQuery({
        baseUrl: APP_ENV.REMOTE_BASE_URL, 
        prepareHeaders: (headers) => {
            const token = apiToken.getAccessToken(); 
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["Post", "Comments"],
    endpoints: (builder) => ({
        getPosts: builder.query<Post[], void>({
            query: () => '/posts/',
            providesTags: ["Post"],
        }),
        likePost: builder.mutation<void, number>({
            query: (postId) => ({
                url: `posts/posts/${postId}/like/`,
                method: 'POST',
            }),
            invalidatesTags: [{ type: 'Post' }],
        }),
        commentPost: builder.mutation<void, { postId: number; content: string }>({
            query: ({ postId, content }) => ({
                url: `posts/posts/${postId}/comment/`,
                method: 'POST',
                body: { content },
            }),
            invalidatesTags: ['Comments'],
        }),
        getComments: builder.query<Comment[], { postId: number }>({
            query: ({ postId }) => `posts/posts/${postId}/comments/`,
            providesTags: ['Comments'],
        }),
        createPost: builder.mutation<Post, { title: string; content: string; image?: string }>({
            query: (postData) => ({
                url: "posts/posts/create_post/",
                method: "POST",
                body: postData,
            }),
            invalidatesTags: ["Post"],
        }),
    }),
});

export const {
    useGetPostsQuery,
    useLikePostMutation,
    useCommentPostMutation,
    useGetCommentsQuery,
    useCreatePostMutation,
} = apiPosts;
