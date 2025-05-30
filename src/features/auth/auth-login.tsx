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
import { loginSchema } from "./auth.schemas";
import { handleAuth } from "./auth.utils";

export function LoginForm() {
  const router = useRouter();
  const form = useHookForm({
    resolver: loginSchema,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmitFn = (data: unknown) => {
    return handleAuth({
      credentials: data as z.infer<typeof loginSchema>,
      routeFn: router.push,
      options: {
        authId: AUTH_OPTIONS_CONSTANTS.EMAIL_PASSWORD,
        routeTo: PAGE_ROUTES.DASHBOARD,
        loadingMsg: "Logging in...",
        successMsg: "Logged in successfully",
        errorMsg: "Failed to login with provided credentials",
      },
    });
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
      <HookFormField
        formControl={control}
        name="password"
        label="Password"
        renderInput={(inputSates) => <RenderPasswordInput {...inputSates} />}
      />
    </>
  );
}

function AuthLoginActions({
  isSubmitting,
}: Readonly<{ isSubmitting: boolean }>) {
  return (
    <>
      <ImsButton
        isLoading={isSubmitting}
        isLoadingLabel="Logging in..."
        variant="imsPrimary"
        disabled={isSubmitting}
        className="order-last h-12 cursor-pointer justify-self-end md:order-none"
        type="submit"
      >
        Log in
      </ImsButton>
      <Link
        href={AUTH_PAGE_ROUTES.FORGOT_PASSWORD}
        className="text-center text-sm font-medium underline"
      >
        Forgot password?
      </Link>
    </>
  );
}
