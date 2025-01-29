import { configureStore } from '@reduxjs/toolkit';
import accountSlice from './account/accountSlice'; 
import { apiGroup } from '../services/apiGroup';
import { api } from '../services/apiUser';
import { authMiddleware } from './middlewares/authMiddleware';
import { apiChat } from '../services/apiChat';
import { apiPosts } from "../services/apiPost";

export const store = configureStore({
  reducer: {
    account: accountSlice,
    [api.reducerPath]: api.reducer,
    [apiGroup.reducerPath]: apiGroup.reducer, 
    [apiChat.reducerPath]: apiChat.reducer, 
    [apiPosts.reducerPath]: apiPosts.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      api.middleware, 
      apiGroup.middleware, 
      apiChat.middleware, 
      apiPosts.middleware,
      authMiddleware),
      
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
