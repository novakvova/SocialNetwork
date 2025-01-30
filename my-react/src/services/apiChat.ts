import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APP_ENV } from "../env";
import { IChatItem, IChatPostRequest, IMessageItem, IMessagePostRequest, IMessagePutRequest } from '../models/types';
import { apiToken } from './apiToken';

// API для роботи з чатами та повідомленнями
export const apiChat = createApi({
  reducerPath: 'chat',
  baseQuery: fetchBaseQuery({
    baseUrl: `${APP_ENV.REMOTE_BASE_URL}`,
    prepareHeaders: (headers) => {
      // Додаємо авторизаційний токен до запитів
      const token = apiToken.getAccessToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Chat", "Message"],
  endpoints: (builder) => ({
    // Отримати всі чати
    getChats: builder.query<IChatItem[], void>({
      query: () => 'chats',
      providesTags: ["Chat"],
    }),

    // Отримати конкретний чат
    getChat: builder.query<IChatItem, number>({
      query: (id) => `chats/${id}/`,
      providesTags: (_, __, id) => [{ type: 'Chat', id }],
    }),

    getPrivateChat: builder.query<IChatItem[], number>({
      query: (id) => `chats/?participants=${id}&is_group=false`,
      providesTags: (_, __, id) => [{ type: 'Chat', id: id }],
    }),
    
    // Отримати конкретний чат за groupId
    getChatByGroupId: builder.query<IChatItem[], number>({
      query: (group) => ({
        url: `/chats/?group=${group}`
      }),
      providesTags: (_, __, group) => [{ type: 'Chat', id: group }],
    }),
    

    // Створити новий чат
    createChat: builder.mutation<IChatPostRequest, Partial<IChatPostRequest>>({
      query: (newChat) => ({
        url: '/chats/',
        method: 'POST',
        body: newChat,
      }),
      invalidatesTags: ['Chat'],
    }),

    // Оновити чат
    updateChat: builder.mutation<IChatPostRequest, { id: number; data: IChatPostRequest }>({
      query: ({ id, data }) => ({
        url: `chats/${id}/`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: 'Chat', id }],
    }),

    // Видалити чат
    deleteChat: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `chats/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ["Chat"],
    }),

    // Отримати повідомлення з чату
    getMessages: builder.query<IMessageItem[], number>({
      query: (chatId) => ({
        url: '/messages/',
        params: chatId ? { chat_id: chatId } : undefined,
      }),providesTags: (_, __, chatId) => [{ type: 'Message', id: chatId }],
    }),

    // Створити нове повідомлення
    createMessage: builder.mutation<IMessagePostRequest, Partial<IMessagePostRequest>>({
      query: (newMessage) => ({
        url: `/messages/`,
        method: 'POST',
        body: {
          ...newMessage,
        },
      }),
      invalidatesTags: (_, __, { chat }) => [{ type: 'Message', id: chat }],
    }),

    // Додайте цей метод до apiChat
    updateMessage: builder.mutation<IMessageItem, IMessagePutRequest>({
      query: ({ id, ...content }) => ({
        url: `/messages/${id}/`,
        method: 'PUT',
        body: { ...content },
      }),
      invalidatesTags: (_, __, { id }) => [{ type: 'Message', id }],
    }),

    // Видалити повідомлення
    deleteMessage: builder.mutation<{ success: boolean }, {messageId: number }>({
      query: ({messageId }) => ({
        url: `/messages/${messageId}/`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, { messageId }) => [{ type: 'Message', id: messageId }],
    }),
  }),
});

// Експортуємо хуки для використання в компонентах
export const {
  useGetChatsQuery,
  useGetChatQuery,
  useGetPrivateChatQuery,
  useGetChatByGroupIdQuery,
  useCreateChatMutation,
  useUpdateChatMutation,
  useDeleteChatMutation,
  useGetMessagesQuery,
  useCreateMessageMutation,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
} = apiChat;
