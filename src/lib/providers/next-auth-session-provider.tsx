"use client";
import { SessionProvider, SessionProviderProps } from "next-auth/react";
import React from "react";

const NextAuthSessionProvider = ({ children }: SessionProviderProps) => {
  return (
    <SessionProvider refetchOnWindowFocus={false} refetchWhenOffline={false}>
      {children}
    </SessionProvider>
  );
};

export default NextAuthSessionProvider;
