"use client";

import { AUTH_PAGE_ROUTES } from "@/lib/constant";
import { handleRequestState } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Control } from "react-hook-form";
import { z } from "zod";
import { authForgotPasswordSendMailAction } from "../shared/actions/auth.action";
import HookFormField from "../shared/components/hook-form-filed";
import { ImsButton } from "../shared/components/ims-button";
import useHookForm from "../shared/hooks/use-hook-form";
import { Input } from "../ui/input";
import { AuthForm } from "./auth-components-client";
import { forgotPasswordSchema } from "./auth.schemas";
import { toast } from "sonner";

export function ForgotPasswordForm() {
  const router = useRouter();
  const form = useHookForm({
    resolver: forgotPasswordSchema,
    defaultValues: {
      username: "",
      contact: "",
    },
  });

  const handleSubmitFn = async (data: unknown) => {
    const { username, contact } = data as z.infer<typeof forgotPasswordSchema>;
    const res = authForgotPasswordSendMailAction({ username, contact });
    handleRequestState({ res, loadingMsg: "Sending verification code..." });
    res.then((response) => {
      if (response.error) {
        toast.error(response.error);
        return;
      }
      router.push(
        `${AUTH_PAGE_ROUTES.FORGOT_PASSWORD_VERIFY}?username=${username}&contact=${contact}`,
      );
    });
    await res;
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
        name="username"
        label="Username"
        renderInput={({ field }) => (
          <Input
            {...field}
            className="focus-visible:ring-ims-blue-300 bg-white"
            type="text"
            placeholder="Username"
          />
        )}
      />
      <HookFormField
        formControl={control}
        name="contact"
        label="Email or Phone Number"
        renderInput={({ field }) => (
          <Input
            {...field}
            className="focus-visible:ring-ims-blue-300 bg-white"
            type="text"
            placeholder="Email or Phone Number"
          />
        )}
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
      isLoadingLabel="Logging in..."
      variant="imsPrimary"
      className="order-last h-12 cursor-pointer justify-self-end md:order-none"
      type="submit"
    >
      Continue
    </ImsButton>
  );
}
