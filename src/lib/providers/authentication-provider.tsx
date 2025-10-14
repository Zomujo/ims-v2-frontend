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
        router.push("/dashboard");
      }
    }, [isAuthenticated, isLoading, router, byPass]);

    return <Component {...props} />;
  };
}

export { authenticationProvider };
