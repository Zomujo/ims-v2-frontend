"use client";

import { AUTH_PAGE_ROUTES } from "@/lib/constant";
import { handleRequestState } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { Control } from "react-hook-form";
import { z } from "zod";
import { authForgotPasswordVerifyCodeAction } from "../shared/actions/auth.action";
import HookFormField from "../shared/components/hook-form-filed";
import { ImsButton } from "../shared/components/ims-button";
import useHookForm from "../shared/hooks/use-hook-form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { AuthForm } from "./auth-components-client";
import { verifyCodeSchema } from "./auth.schemas";

export function VerifyCodeForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const form = useHookForm({
    resolver: verifyCodeSchema,
    defaultValues: {
      otpCode: "",
    },
  });

  const handleSubmitFn = async (data: unknown) => {
    const email = searchParams.get("email") ?? "";
    const otpCode = (data as z.infer<typeof verifyCodeSchema>).otpCode;
    const res = authForgotPasswordVerifyCodeAction({
      email,
      code: otpCode,
    });
    handleRequestState({ res, loadingMsg: "Verifying code..." });
    if ((await res).statusCode === 200) {
      router.push(`${AUTH_PAGE_ROUTES.RESET_PASSWORD}?email=${email}`);
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
      name="otpCode"
      label=""
      renderInput={({ field }) => (
        <InputOTP {...field} maxLength={5}>
          <InputOTPGroup className="w-full gap-x-4">
            {
              // prettier-ignore
              [0, 1, 2, 3, 4].map((index) => (
                <InputOTPSlot 
                  key={index}
                  index={index}
                  defaultValue={"O"}
                  className="h-17 w-[40%] text-3xl border rounded-2xl!"
                />
            ))
            }
          </InputOTPGroup>
        </InputOTP>
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
      Verify code
    </ImsButton>
  );
}
