"use client";

import { useRouter } from "next/navigation";
import { JSX, FC, useEffect, useRef } from "react";
import { useSessionData } from "@/hooks/useSessionData";

function authenticationProvider(Component: FC, byPass = false) {
  return function AuthenticationProvider(
    props: JSX.IntrinsicAttributes,
  ): JSX.Element {
    const { isAuthenticated, isLoading } = useSessionData();
    const router = useRouter();
    const hasRedirected = useRef(false);

    useEffect(() => {
      if (!byPass && !isLoading && isAuthenticated && !hasRedirected.current) {
        hasRedirected.current = true;
        router.replace("/dashboard");
      }
    }, [isAuthenticated, isLoading, byPass]);

    if (isLoading) {
      return <></>;
    }

    if (!byPass && isAuthenticated) {
      return <></>;
    }

    return <Component {...props} />;
  };
}

export { authenticationProvider };
