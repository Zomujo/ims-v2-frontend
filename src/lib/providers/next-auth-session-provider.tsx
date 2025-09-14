"use client";
import { SessionProvider, SessionProviderProps } from "next-auth/react";
import React from "react";

const NextAuthSessionProvider = ({
  children,
  ...props
}: SessionProviderProps) => {
  return (
    <SessionProvider
      refetchOnWindowFocus={
        typeof navigator !== "undefined" && navigator.onLine
      }
      refetchWhenOffline={false}
      {...props}
    >
      {children}
    </SessionProvider>
  );
};

export default NextAuthSessionProvider;
