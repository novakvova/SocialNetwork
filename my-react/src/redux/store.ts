import { configureStore } from '@reduxjs/toolkit';
import { api } from '../services/apiUser'; 
import accountSlice from "./account/accountSlice"

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer, 
    account: accountSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware), 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
