"use client";

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
import { toast } from "sonner";
import { authLoginAction } from "@features/shared/actions/auth.action";
import { authenticationProvider } from "@/lib/providers/authentication-provider";
import { useSessionData } from "@/hooks/useSessionData";

function LoginForm() {
  const { setSessionState } = useSessionData();
  const router = useRouter();
  const form = useHookForm({
    resolver: loginSchema,
    defaultValues: {
      accountIdentifier: "",
      password: "",
    },
  });

  const handleSubmitFn = async (data: unknown) => {
    const loadingToast = toast.loading("Authenticating...");
    const credentials = data as z.infer<typeof loginSchema>;
    try {
      const { data: loginData, error } = await authLoginAction(credentials);

      if (error) {
        throw new Error(error);
      }

      if (loginData) {
        setSessionState(loginData);
      }
      toast.success("Authenticated successfully");
      router.push(PAGE_ROUTES.DASHBOARD);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to authenticate with provided credentials");
      }
    } finally {
      toast.dismiss(loadingToast);
    }
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

export default authenticationProvider(LoginForm);

function AuthLoginInputs({ control }: Readonly<{ control: Control }>) {
  return (
    <>
      <HookFormField
        formControl={control}
        name="accountIdentifier"
        label="Email / Username"
        renderInput={({ field }) => (
          <Input
            {...field}
            className="focus-visible:ring-ims-blue-300 bg-white"
            type="text"
            placeholder="email / username"
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
