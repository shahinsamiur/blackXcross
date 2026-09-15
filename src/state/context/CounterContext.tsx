"use client";

import { createContext, useContext, useState, PropsWithChildren } from "react";

type CounterContextType = {
  count: number;
  increment: () => void;
  decrement: () => void;
};

const CounterContext = createContext<CounterContextType | undefined>(undefined);

// Use PropsWithChildren to explicitly tell TypeScript this component accepts children
export const CounterProvider = ({ children }: PropsWithChildren) => {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);

  return (
    <CounterContext.Provider value={{ count, increment, decrement }}>
      {children}
    </CounterContext.Provider>
  );
};

export const useCounter = () => {
  const context = useContext(CounterContext);
  if (!context)
    throw new Error("useCounter must be used within CounterProvider");
  return context;
};