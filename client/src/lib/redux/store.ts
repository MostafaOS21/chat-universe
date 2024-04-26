import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import { apiRedux } from "@/lib/redux/api/rtk-query-api";
import { get } from "http";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
      [apiRedux.reducerPath]: apiRedux.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiRedux.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
