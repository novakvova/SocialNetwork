import { configureStore } from '@reduxjs/toolkit';
import accountSlice from './account/accountSlice'; 
import { apiGroup } from '../services/apiGroup';
import { api } from '../services/apiUser';
import { authMiddleware } from './middlewares/authMiddleware';
import { apiChat } from '../services/apiChat';
import { apiPosts } from "../services/apiPost";
import { apiSearch } from '../services/apiSearch';

export const store = configureStore({
  reducer: {
    account: accountSlice,
    [api.reducerPath]: api.reducer,
    [apiGroup.reducerPath]: apiGroup.reducer, 
    [apiChat.reducerPath]: apiChat.reducer, 
    [apiPosts.reducerPath]: apiPosts.reducer,
    [apiSearch.reducerPath]: apiSearch.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      api.middleware, 
      apiGroup.middleware, 
      apiChat.middleware, 
      apiPosts.middleware,
      apiSearch.middleware,
      authMiddleware),
      
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
