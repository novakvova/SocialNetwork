import { configureStore } from '@reduxjs/toolkit';
import accountSlice from './account/accountSlice'; 
import { apiGroup } from '../services/apiGroup';
import { api } from '../services/apiUser';
import { authMiddleware } from './middlewares/authMiddleware';

export const store = configureStore({
  reducer: {
    account: accountSlice,
    [api.reducerPath]: api.reducer,
    [apiGroup.reducerPath]: apiGroup.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      api.middleware, 
      apiGroup.middleware, 
      authMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
