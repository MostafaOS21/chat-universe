"use client";
import { ReactNode, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/lib/redux/store";
import AuthProvider from "./AuthProvider";

export default function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
}
