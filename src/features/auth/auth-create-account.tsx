"use client";

import { AUTH_PAGE_ROUTES } from "@/lib/constant";
import Link from "next/link";
import { Control } from "react-hook-form";
import HookFormField from "../shared/components/hook-form-filed";
import { ImsButton } from "../shared/components/ims-button";
import useHookForm from "../shared/hooks/use-hook-form";
import { Input } from "../ui/input";
import { AuthForm, RenderPasswordInput } from "./auth-components-client";
import { authCreateAccountInputsData } from "./auth.data";
import { createAccountSchema } from "./auth.schemas";
import { AuthAccountCreationProps } from "@features/shared/types/auth-action.types";
import { useState } from "react";
import { toast } from "sonner";
import { authCreateAccountAction } from "@features/shared/actions/auth.action";
import { useRouter } from "next/navigation";
import { authenticationProvider } from "@/lib/providers/authentication-provider";

function CreateAccountForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useHookForm({
    resolver: createAccountSchema,
  });

  const handleSubmitFn = async (data: unknown) => {
    const loadingToast = toast.loading("Creating account...");
    const userData = data as AuthAccountCreationProps;
    try {
      setIsSubmitting(true);
      const response = await authCreateAccountAction(userData);
      if ("error" in response) {
        throw new Error(response.error);
      }
      form.reset();
      toast.success(
        "You account has been created successfully. You can now log in.",
      );
      router.push(AUTH_PAGE_ROUTES.LOG_IN);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(
          "Failed to create account with provided information. Please try again.",
        );
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
      RenderActions={<AuthCreateAccountActions isSubmitting={isSubmitting} />}
      RenderInputs={<AuthCreateAccountInputs control={form.control} />}
    />
  );
}

export default authenticationProvider(CreateAccountForm);

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
        disabled={isSubmitting}
        isLoadingLabel="Logging in..."
        variant="imsPrimary"
        className="h-12 cursor-pointer justify-self-end md:order-none"
        type="submit"
      >
        Create Account
      </ImsButton>
      <p className="text-sm text-gray-500">
        By creating an account, you agree to Inyabon MedSync{" "}
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
