import { configureStore } from '@reduxjs/toolkit';
import accountSlice from './account/accountSlice'; 
import { apiGroup } from '../services/apiGroup';
import { api } from '../services/apiUser';

export const store = configureStore({
  reducer: {
    account: accountSlice,
    [apiGroup.reducerPath]: apiGroup.reducer, 
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware) 
      .concat(apiGroup.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
