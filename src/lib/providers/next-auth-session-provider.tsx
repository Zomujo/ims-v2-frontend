"use client";
import { SessionProvider, SessionProviderProps } from "next-auth/react";
import React from "react";

const NextAuthSessionProvider = ({
  children,
  ...props
}: SessionProviderProps) => {
  return <SessionProvider {...props}>{children}</SessionProvider>;
};

export default NextAuthSessionProvider;
