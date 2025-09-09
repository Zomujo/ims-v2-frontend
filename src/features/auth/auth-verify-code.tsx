"use client";

import { AUTH_PAGE_ROUTES } from "@/lib/constant";
import { useRouter, useSearchParams } from "next/navigation";
import { Control } from "react-hook-form";
import { z } from "zod";
import { authForgotPasswordVerifyCodeAction } from "../shared/actions/auth.action";
import HookFormField from "../shared/components/hook-form-filed";
import { ImsButton } from "../shared/components/ims-button";
import ImsOTPInput from "../shared/components/ims-otp-input";
import useHookForm from "../shared/hooks/use-hook-form";
import { AuthForm } from "./auth-components-client";
import { verifyCodeSchema } from "./auth.schemas";
import { useState } from "react";
import { toast } from "sonner";

export function VerifyCodeForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams.get("username") ?? "";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useHookForm({
    resolver: verifyCodeSchema,
    defaultValues: {
      otpCode: "",
    },
  });

  const handleSubmitFn = async (data: unknown) => {
    const loadingToast = toast.loading("Verifying code...");
    const { otpCode } = data as z.infer<typeof verifyCodeSchema>;
    try {
      setIsSubmitting(true);
      const response = await authForgotPasswordVerifyCodeAction({
        username,
        code: Number(otpCode),
      });
      if ("error" in response) {
        throw new Error(response.error);
      }
      form.reset();
      toast.success("Code verified successfully.");
      router.push(`${AUTH_PAGE_ROUTES.RESET_PASSWORD}?username=${username}`);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to verify code. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
      toast.dismiss(loadingToast);
    }
  };

  return (
    <AuthForm
      form={form}
      handleAuthSubmit={handleSubmitFn}
      RenderActions={<AuthLoginActions isSubmitting={isSubmitting} />}
      RenderInputs={<AuthLoginInputs control={form.control} />}
    />
  );
}

function AuthLoginInputs({ control }: Readonly<{ control: Control }>) {
  return (
    <HookFormField
      formControl={control}
      name="otpCode"
      label=""
      renderInput={({ field }) => <ImsOTPInput {...field} otpBoxes={5} />}
    />
  );
}

function AuthLoginActions({
  isSubmitting,
}: Readonly<{ isSubmitting: boolean }>) {
  return (
    <ImsButton
      isLoading={isSubmitting}
      disabled={isSubmitting}
      isLoadingLabel="Logging in..."
      className="order-last h-12 cursor-pointer justify-self-end md:order-none"
      type="submit"
    >
      Verify code
    </ImsButton>
  );
}
