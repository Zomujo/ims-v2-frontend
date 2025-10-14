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
    if (!isLoading && !isAuthenticated) {
      router.replace(AUTH_PAGE_ROUTES.LOG_IN);
    }
  }, [isAuthenticated, isLoading, router]);

  // Don't render anything until we know authentication status
  if (isLoading || !isAuthenticated) {
    return <></>;
  }

  return <>{children}</>;
}
