"use client";

import { AUTH_PAGE_ROUTES, PAGE_ROUTES } from "@/lib/constant";
import { handleRequestState } from "@/lib/utils";
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

export function ResetPasswordForm() {
  const { updateUserStatus } = useSessionData();
  const router = useRouter();
  const form = useHookForm({
    resolver: resetPasswordSchema,
    defaultValues: {
      confirmPassword: "",
      password: "",
    },
  });

  const handleSubmitFn = async (data: unknown) => {
    const searchParams = new URLSearchParams(window.location.search);
    const email = searchParams.get("email");
    const newPassword = (data as z.infer<typeof resetPasswordSchema>).password;
    const res = email
      ? authForgotPasswordResetPasswordAction({ email, newPassword })
      : authChangePasswordAction({ newPassword });
    handleRequestState({ res, loadingMsg: "Resetting password..." });
    await res;
    await updateUserStatus(UserStatus.ACTIVE);
    searchParams.delete("email");
    router.replace(email ? AUTH_PAGE_ROUTES.LOG_IN : PAGE_ROUTES.DASHBOARD);
  };

  return (
    <AuthForm
      form={form}
      handleAuthSubmit={handleSubmitFn}
      RenderActions={
        <AuthLoginActions isSubmitting={form.formState.isSubmitting} />
      }
      RenderInputs={<AuthLoginInputs control={form.control} />}
    />
  );
}

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
