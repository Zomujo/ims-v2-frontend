"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSessionContext } from "@/lib/providers/session-provider";
import { AUTH_PAGE_ROUTES } from "@/lib/constant";

export function SessionExpiredHandler() {
  const router = useRouter();
  const { clearSessionNoReload } = useSessionContext();

  useEffect(() => {
    clearSessionNoReload();
    router.replace(AUTH_PAGE_ROUTES.LOG_IN);
  }, [router]);

  return null;
}
