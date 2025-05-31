"use client";

import { Provider } from "react-redux";
import { persistor, store } from "../store";
import { ReactNode } from "react";
import { PersistGate } from "redux-persist/integration/react";
import GeneralLoader from "@/components/loader/GeneralLoader";

export function ReduxProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={<GeneralLoader />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
