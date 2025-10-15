"use client";

import { useRouter } from "next/navigation";
import { JSX, ReactNode, useEffect, useRef } from "react";
import { useSessionData } from "@/hooks/useSessionData";
import { AUTH_PAGE_ROUTES } from "@/lib/constant";

export function ImsProtectedProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const { isAuthenticated, isLoading } = useSessionData();
  const router = useRouter();
  const hasRedirected = useRef(false);

  useEffect(() => {
    console.log("Auth status:", { isAuthenticated, isLoading });
    console.log("Has redirected:", hasRedirected.current);
    if (!isLoading && !isAuthenticated && !hasRedirected.current) {
      hasRedirected.current = true;
      router.replace(AUTH_PAGE_ROUTES.LOG_IN);
    }
  }, [isAuthenticated, isLoading, router]);

  // Don't render anything until we know authentication status
  if (isLoading || !isAuthenticated) {
    return <></>;
  }

  return <>{children}</>;
}
