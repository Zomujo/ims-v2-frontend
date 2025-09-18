"use client";

import { AUTH_PAGE_ROUTES, PAGE_ROUTES } from "@/lib/constant";
import { useRouter } from "next/navigation";
import { Control } from "react-hook-form";
import { z } from "zod";
import {
  authChangePasswordAction,
  authForgotPasswordResetPasswordAction,
} from "../shared/actions/auth.action";
import HookFormField from "../shared/components/hook-form-filed";
import { ImsButton } from "../shared/components/ims-button";
import useHookForm from "../shared/hooks/use-hook-form";
import { AuthForm, RenderPasswordInput } from "./auth-components-client";
import { resetPasswordSchema } from "./auth.schemas";
import { useSessionData } from "@/hooks/useSessionData";
import { UserStatus } from "@features/shared/types/auth-action.types";
import { useState } from "react";
import { toast } from "sonner";
import { authenticationProvider } from "@/lib/providers/authentication-provider";

function ResetPasswordForm() {
  const { updateUserStatus } = useSessionData();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useHookForm({
    resolver: resetPasswordSchema,
    defaultValues: {
      confirmPassword: "",
      password: "",
    },
  });

  const handleSubmitFn = async (data: unknown) => {
    const searchParams = new URLSearchParams(window.location.search);
    const username = searchParams.get("username");
    const loadingToast = toast.loading("Resetting password...");
    const { password: newPassword } = data as z.infer<
      typeof resetPasswordSchema
    >;
    try {
      setIsSubmitting(true);
      const response = username
        ? await authForgotPasswordResetPasswordAction({
            username,
            newPassword,
          })
        : await authChangePasswordAction({ newPassword });

      if ("error" in response) {
        throw new Error(response.error);
      }

      if (!username) {
        updateUserStatus(UserStatus.ACTIVE);
      }

      form.reset();
      toast.success("Password has been reset successfully.");
      router.replace(
        username ? AUTH_PAGE_ROUTES.LOG_IN : PAGE_ROUTES.DASHBOARD,
      );
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to reset password. Please try again.");
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

export default authenticationProvider(ResetPasswordForm, true);

function AuthLoginInputs({ control }: Readonly<{ control: Control }>) {
  return (
    <>
      <HookFormField
        formControl={control}
        name="password"
        label="Password"
        renderInput={(inputSates) => <RenderPasswordInput {...inputSates} />}
      />
      <HookFormField
        formControl={control}
        name="confirmPassword"
        label="Confirm Password"
        renderInput={(inputSates) => <RenderPasswordInput {...inputSates} />}
      />
    </>
  );
}

function AuthLoginActions({
  isSubmitting,
}: Readonly<{ isSubmitting: boolean }>) {
  return (
    <ImsButton
      isLoading={isSubmitting}
      isLoadingLabel="Resetting password..."
      variant="imsPrimary"
      className="order-last h-12 cursor-pointer justify-self-end md:order-none"
      type="submit"
    >
      Reset password
    </ImsButton>
  );
}
