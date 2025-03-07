import { signIn } from "next-auth/react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "sonner";
import { z } from "zod";
import { loginSchema } from "./auth.schemas";

export const handleSignIn = async (
  credentials: z.infer<typeof loginSchema>,
  routeTo: AppRouterInstance["push"],
) => {
  const res = signIn("email-password", {
    ...credentials,
    callbackUrl: "/dashboard",
    redirect: false,
  });
  toast.promise(res, {
    loading: "Signing in...",
    success: "Signed in successfully",
    error: "Failed to sign in with provided credentials",
  });
  const loginRes = await res;
  if (loginRes?.ok && loginRes.url) {
    routeTo(loginRes.url);
  }
};
