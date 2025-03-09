import { signIn } from "next-auth/react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "sonner";

type HandleAuthFnProps = {
  credentials: Record<string, unknown>;
  routeTo: AppRouterInstance["push"];
  options: {
    authId: string;
    route: string;
    loadingMsg?: string;
    successMsg?: string;
    errorMsg?: string;
  };
};

export const handleAuth = async ({
  credentials,
  routeTo,
  options: { authId, route, loadingMsg, successMsg, errorMsg },
}: HandleAuthFnProps) => {
  const res = signIn(authId, {
    ...credentials,
    callbackUrl: route,
    redirect: false,
  });
  toast.promise(res, {
    loading: loadingMsg ?? "Loading...",
    success: successMsg ?? "Authenticated successfully",
    error: errorMsg ?? "Failed to authenticate with provided credentials",
  });
  const authRes = await res;
  if (authRes?.ok && authRes.url) {
    routeTo(authRes.url);
  }
};

export const getFormDefaultValues = (
  inputs: Readonly<Record<string, string>[]>,
) =>
  inputs.reduce(
    (acc, input) => {
      acc[input.name] = "";
      return acc;
    },
    {} as Record<string, string>,
  );
