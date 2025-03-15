import { signIn } from "next-auth/react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "sonner";

type HandleAuthFnProps = {
  credentials: Record<string, unknown>;
  routeFn: AppRouterInstance["push"];
  options: {
    authId: string;
    routeTo: string;
    loadingMsg?: string;
    successMsg?: string;
    errorMsg?: string;
  };
};

export const handleAuth = async ({
  credentials,
  routeFn,
  options: { authId, routeTo, loadingMsg, successMsg, errorMsg },
}: HandleAuthFnProps) => {
  const res = signIn(authId, {
    ...credentials,
    callbackUrl: routeTo,
    redirect: false,
  });
  toast.promise(res, {
    loading: loadingMsg ?? "Loading...",
    success: successMsg ?? "Authenticated successfully",
    error: errorMsg ?? "Failed to authenticate with provided credentials",
  });
  const authRes = await res;
  if (authRes?.ok && authRes.url) {
    routeFn(authRes.url);
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

export const isTokenExpired = (timeToCompare: string) => {
  const currentDate = new Date().getTime();
  const formatTimeToCompare = new Date(timeToCompare).getTime();
  const currentTimeStampInSec = Math.floor(currentDate / 1000);
  const timeToCompareInSec = Math.floor(formatTimeToCompare / 1000);
  return currentTimeStampInSec > timeToCompareInSec;
};
