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

export function ForgotPasswordForm() {
  const router = useRouter();
  const form = useHookForm({
    resolver: forgotPasswordSchema,
    defaultValues: {
      email: "",
    },
  });

  const handleSubmitFn = async (data: unknown) => {
    const email = (data as z.infer<typeof forgotPasswordSchema>).email;
    const res = authForgotPasswordSendMailAction(email);
    handleRequestState({ res, loadingMsg: "Sending verification code..." });
    if ((await res).statusCode === 200) {
      router.push(`${AUTH_PAGE_ROUTES.FORGOT_PASSWORD_VERIFY}?email=${email}`);
    }
    return res;
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
    <HookFormField
      formControl={control}
      name="email"
      label="Email"
      renderInput={({ field }) => (
        <Input
          {...field}
          className="focus-visible:ring-ims-blue-300 bg-white"
          type="email"
          placeholder="Email"
        />
      )}
    />
  );
}

function AuthLoginActions({
  isSubmitting,
}: Readonly<{ isSubmitting: boolean }>) {
  return (
    <ImsButton
      isLoading={isSubmitting}
      isLoadingLabel="Logging in..."
      variant="ghost"
      className="bg-ims-blue-300 hover:bg-ims-blue-200 dark:bg-ims-blue-300 dark:hover:bg-ims-blue-300/80 order-last h-12 cursor-pointer justify-self-end text-white hover:text-white md:order-none"
      type="submit"
    >
      Continue
    </ImsButton>
  );
}
