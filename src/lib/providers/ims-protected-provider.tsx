"use client";

import { useRouter } from "next/navigation";
import { JSX, ReactNode, useEffect } from "react";
import { useSessionData } from "@/hooks/useSessionData";
import { AUTH_PAGE_ROUTES } from "@/lib/constant";

export function ImsProtectedProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const { isAuthenticated, isLoading } = useSessionData();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if we're not loading and not authenticated
    if (!isLoading && !isAuthenticated) {
      router.push(AUTH_PAGE_ROUTES.LOG_IN);
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading or nothing while checking authentication
  if (isLoading) {
    return <></>;
  }

  // Only render children if authenticated
  if (!isAuthenticated) {
    return <></>;
  }

  return <>{children}</>;
}
