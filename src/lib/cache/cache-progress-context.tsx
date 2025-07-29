"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ProgressState {
  total: number;
  cached: number;
  percent: number;
}

interface CacheProgressContextType {
  dataProgress: ProgressState;
  setDataProgress: (progress: ProgressState) => void;
}

const CacheProgressContext = createContext<
  CacheProgressContextType | undefined
>(undefined);

const initialProgressState = { total: 0, cached: 0, percent: 0 };

export function CacheProgressProvider({ children }: { children: ReactNode }) {
  const [dataProgress, setDataProgress] =
    useState<ProgressState>(initialProgressState);

  return (
    <CacheProgressContext.Provider
      value={{
        dataProgress,
        setDataProgress,
      }}
    >
      {children}
    </CacheProgressContext.Provider>
  );
}

export const useCacheProgress = () => {
  const context = useContext(CacheProgressContext);
  if (context === undefined) {
    throw new Error(
      "useCacheProgress must be used within a CacheProgressProvider",
    );
  }
  return context;
};
