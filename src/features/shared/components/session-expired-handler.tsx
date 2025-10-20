"use client";

import { clearImsSession } from "@/lib/config/ims-session";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function SessionExpiredHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    clearImsSession();
  }, [router, searchParams]);

  return null;
}
