import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APP_ENV } from '../env';
import { Chat, Message } from '../models/types';

// Типи для Chat та Message

// RTK Query API
export const apiChat = createApi({
  reducerPath: 'apiChat',
  baseQuery: fetchBaseQuery({
    baseUrl: APP_ENV.REMOTE_BASE_URL,
  }),
  tagTypes: ['Chat', 'Message'],
  endpoints: (builder) => ({
    // Отримати всі чати
    getChats: builder.query<Chat[], void>({
      query: () => 'chats/',
      providesTags: ['Chat'],
    }),

    // Створити новий чат
    createChat: builder.mutation<Chat, Partial<Chat>>({
      query: (newChat) => ({
        url: '/chats/',
        method: 'POST',
        body: newChat,
      }),
      invalidatesTags: ['Chat'],
    }),

    // Отримати всі повідомлення
    getMessages: builder.query<Message[], { chatId?: number }>({
      query: ({ chatId }) => ({
        url: '/messages/',
        params: chatId ? { chat_id: chatId } : undefined,
      }),
      providesTags: ['Message'],
    }),

    // Створити нове повідомлення
    createMessage: builder.mutation<Message, Partial<Message>>({
      query: (newMessage) => ({
        url: '/messages/',
        method: 'POST',
        body: newMessage,
      }),
      invalidatesTags: ['Message'],
    }),

    // Видалити повідомлення
    deleteMessage: builder.mutation<void, number>({
      query: (messageId) => ({
        url: `/messages/${messageId}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Message'],
    }),
  }),
});

// Хуки для використання API
export const {
  useGetChatsQuery,
  useCreateChatMutation,
  useGetMessagesQuery,
  useCreateMessageMutation,
  useDeleteMessageMutation,
} = apiChat;
