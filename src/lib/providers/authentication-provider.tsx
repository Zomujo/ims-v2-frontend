"use client";

import { useRouter } from "next/navigation";
import { JSX, FC, useEffect } from "react";
import { useSessionData } from "@/hooks/useSessionData";

function authenticationProvider(Component: FC, byPass = false) {
  return function AuthenticationProvider(
    props: JSX.IntrinsicAttributes,
  ): JSX.Element {
    const { isAuthenticated } = useSessionData();
    const router = useRouter();
    useEffect(() => {
      if (!byPass && isAuthenticated) {
        router.push("/dashboard");
      }
    }, [isAuthenticated]);
    return <Component {...props} />;
  };
}

export { authenticationProvider };
