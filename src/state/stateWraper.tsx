"use client";

import { Provider } from "react-redux";
import { PropsWithChildren } from "react";
import { makeStore } from "./redux/store";
import { CounterProvider } from "./context/CounterContext";

const store = makeStore();

export default function StateWrapper({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      <CounterProvider>{children}</CounterProvider>
    </Provider>
  );
}