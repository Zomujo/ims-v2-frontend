"use client";

import { useRouter } from "next/navigation";
import { JSX, FC, useEffect } from "react";
import { useSessionData } from "@/hooks/useSessionData";

function authenticationProvider(Component: FC, byPass = false) {
  return function AuthenticationProvider(
    props: JSX.IntrinsicAttributes,
  ): JSX.Element {
    const { isAuthenticated, isLoading } = useSessionData();
    const router = useRouter();

    useEffect(() => {
      if (!byPass && !isLoading && isAuthenticated) {
        router.replace("/dashboard");
      }
    }, [isAuthenticated, isLoading, router, byPass]);

    // Don't render login page if already authenticated and loading is done
    if (!byPass && !isLoading && isAuthenticated) {
      return <></>;
    }

    return <Component {...props} />;
  };
}

export { authenticationProvider };
