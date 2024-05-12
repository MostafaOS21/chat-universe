import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import apiSlice from "./api/apiSlice";
import { requestsSlice } from "./features/requests/requestsSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
      [requestsSlice.reducerPath]: requestsSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
