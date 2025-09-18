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
  const { isAuthenticated } = useSessionData();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(AUTH_PAGE_ROUTES.LOG_IN);
    }
  }, [isAuthenticated]);

  return <>{children}</>;
}
