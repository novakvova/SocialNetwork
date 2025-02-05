import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'; 
import { APP_ENV } from "../env";
import { IChatItem, IChatPostRequest, IMessageItem, IMessagePostRequest, IMessagePutRequest } from '../models/types';
import { apiToken } from './apiToken';

export const apiChat = createApi({
  reducerPath: 'chat',
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
  tagTypes: ["Chat", "Message"],
  endpoints: (builder) => ({
    getChats: builder.query<IChatItem[], void>({
      query: () => 'chats/',
      providesTags: ["Chat"],
    }),

    getChat: builder.query<IChatItem, number>({
      query: (id) => `chats/${id}/`,
      providesTags: (_, __, id) => [{ type: 'Chat', id }],
    }),

    getPrivateChat: builder.query<IChatItem[], number>({
      query: (id) => `chats/?participants=${id}&is_group=false`,
      providesTags: (_, __, id) => [{ type: 'Chat', id }],
    }),

    getChatByGroupName: builder.query<IChatItem[], string>({
      query: (group) => `chats/??group_name=${group}`,
      providesTags: (_, __, group) => [{ type: 'Chat', id: group }],
    }),

    getChatBySlug: builder.query<IChatItem, string>({
      query: (slug) => `chats/${slug}/`,
      providesTags: (_, __, slug) => [{ type: 'Chat', id: slug }],
    }),

    createChat: builder.mutation<IChatPostRequest, Partial<IChatPostRequest>>({
      query: (newChat) => ({
        url: 'chats/',
        method: 'POST',
        body: newChat,
      }),
      invalidatesTags: ['Chat'],
    }),

    updateChat: builder.mutation<IChatPostRequest, { id: number; data: IChatPostRequest }>({
      query: ({ id, data }) => ({
        url: `chats/${id}/`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: 'Chat', id }],
    }),

    deleteChat: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `chats/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ["Chat"],
    }),

    getMessages: builder.query<IMessageItem[], number>({
      query: (chatId) => `messages/?chat=${chatId}`,
      providesTags: (_, __, chatId) => [{ type: 'Message', id: chatId }],
    }),

    createMessage: builder.mutation<IMessagePostRequest, Partial<IMessagePostRequest>>({
      query: (newMessage) => ({
        url: 'messages/',
        method: 'POST',
        body: newMessage,
      }),
      invalidatesTags: (_, __, { chat }) => [{ type: 'Message', id: chat }],
    }),

    updateMessage: builder.mutation<IMessageItem, IMessagePutRequest>({
      query: ({ id, ...content }) => ({
        url: `messages/${id}/`,
        method: 'PUT',
        body: content,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: 'Message', id }],
    }),

    deleteMessage: builder.mutation<{ success: boolean }, { messageId: number }>({
      query: ({ messageId }) => ({
        url: `messages/${messageId}/`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, { messageId }) => [{ type: 'Message', id: messageId }],
    }),
  }),
});

export const {
  useGetChatsQuery,
  useGetChatQuery,
  useGetPrivateChatQuery,
  useGetChatByGroupNameQuery,
  useGetChatBySlugQuery,
  useCreateChatMutation,
  useUpdateChatMutation,
  useDeleteChatMutation,
  useGetMessagesQuery,
  useCreateMessageMutation,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
} = apiChat;
