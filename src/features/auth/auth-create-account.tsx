"use client";

import { AUTH_OPTIONS_CONSTANTS } from "@/lib/config/auth.config";
import { AUTH_PAGE_ROUTES, PAGE_ROUTES } from "@/lib/constant";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Control } from "react-hook-form";
import { z } from "zod";
import HookFormField from "../shared/components/hook-form-filed";
import { ImsButton } from "../shared/components/ims-button";
import useHookForm from "../shared/hooks/use-hook-form";
import { Input } from "../ui/input";
import { AuthForm, RenderPasswordInput } from "./auth-components-client";
import { authCreateAccountInputsData } from "./auth.data";
import { createAccountSchema, loginSchema } from "./auth.schemas";
import { getFormDefaultValues, handleAuth } from "./auth.utils";

export function CreateAccountForm() {
  const router = useRouter();
  const form = useHookForm({
    resolver: createAccountSchema,
    defaultValues: getFormDefaultValues(authCreateAccountInputsData),
  });

  const handleSubmitFn = async (data: unknown) => {
    return handleAuth({
      credentials: data as z.infer<typeof loginSchema>,
      routeFn: router.push,
      options: {
        authId: AUTH_OPTIONS_CONSTANTS.EMAIL_PASSWORD,
        routeTo: PAGE_ROUTES.DASHBOARD,
        loadingMsg: "Creating account...",
        successMsg: "Account created successfully",
        errorMsg: "Failed to create account with provided credentials",
      },
    });
  };

  return (
    <AuthForm
      form={form}
      handleAuthSubmit={handleSubmitFn}
      RenderActions={
        <AuthCreateAccountActions isSubmitting={form.formState.isSubmitting} />
      }
      RenderInputs={<AuthCreateAccountInputs control={form.control} />}
    />
  );
}

function AuthCreateAccountInputs({ control }: Readonly<{ control: Control }>) {
  return (
    <>
      {authCreateAccountInputsData.map((input) => {
        if (input.type === "password") {
          return (
            <HookFormField
              key={input.name}
              formControl={control}
              name={input.name}
              label={input.label}
              renderInput={(inputSates) => (
                <RenderPasswordInput {...inputSates} />
              )}
            />
          );
        }
        return (
          <HookFormField
            key={input.name}
            formControl={control}
            name={input.name}
            label={input.label}
            renderInput={({ field }) => (
              <Input
                {...field}
                className="focus-visible:ring-ims-blue-300 bg-white"
                type={input.type}
                placeholder={input.placeholder}
              />
            )}
          />
        );
      })}
    </>
  );
}

function AuthCreateAccountActions({
  isSubmitting,
}: Readonly<{ isSubmitting: boolean }>) {
  return (
    <>
      <ImsButton
        isLoading={isSubmitting}
        isLoadingLabel="Logging in..."
        variant="ghost"
        className="bg-ims-blue-300 hover:bg-ims-blue-200 dark:bg-ims-blue-300 dark:hover:bg-ims-blue-300/80 h-12 cursor-pointer justify-self-end text-white hover:text-white md:order-none"
        type="submit"
      >
        Create Account
      </ImsButton>
      <p className="text-sm text-gray-500">
        By creating an account, you agree to Stealth{" "}
        <Link
          href={AUTH_PAGE_ROUTES.FORGOT_PASSWORD}
          className="text-center font-medium underline"
        >
          Terms of Service
        </Link>{" "}
        &{" "}
        <Link
          href={AUTH_PAGE_ROUTES.FORGOT_PASSWORD}
          className="text-center font-medium underline"
        >
          Privacy Policy
        </Link>
      </p>
    </>
  );
}
