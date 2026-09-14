"use client";

import { Provider } from "react-redux";
import { makeStore } from "./redux/store";
import { CounterProvider } from "./context/CounterContext";

const store = makeStore();

export default function StateWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <CounterProvider>{children}</CounterProvider>
    </Provider>
  );
}