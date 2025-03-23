"use client";

import { EyeOffIcon, LogOutIcon, LucideEye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { Input } from "../ui/input";
import { AuthFormProps, RenderPasswordInputProps } from "./auth.types";
import { signOut } from "next-auth/react";
import { ImsButton } from "../shared/components/ims-button";
import { cn } from "@/lib/utils";

export function AuthForm({
  form,
  handleAuthSubmit,
  RenderActions,
  RenderInputs,
  className,
}: Readonly<AuthFormProps>) {
  const router = useRouter();
  const handleSubmitFn = async (data: unknown) => {
    await handleAuthSubmit(data, router.push);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitFn)}
        className={cn(
          "flex flex-1 flex-col justify-between gap-y-15 pt-10 md:justify-normal md:gap-y-15",
          className,
        )}
      >
        <section className="space-y-8">{RenderInputs}</section>
        <section className="flex flex-col gap-y-4">{RenderActions}</section>
      </form>
    </Form>
  );
}

export function GobackButton() {
  const router = useRouter();
  return (
    <Button type="button" onClick={() => router.back()} variant="secondary">
      Go back
    </Button>
  );
}

export function LogOutButton() {
  return (
    <ImsButton
      onClick={() => signOut()}
      startIcon={<LogOutIcon className="rotate-180" />}
      variant="ghost"
      className="flex justify-start rounded-none p-0 py-6 pl-3 text-red-500 hover:bg-red-500 hover:text-white"
    >
      Logout
    </ImsButton>
  );
}

export function RenderPasswordInput({
  field,
}: Readonly<RenderPasswordInputProps>) {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="relative">
      <Input
        {...field}
        className="focus-visible:ring-ims-blue-300 bg-white"
        type={showPassword ? "text" : "password"}
        placeholder="Password"
      />
      {showPassword ? (
        <LucideEye
          size={20}
          className="absolute top-1/2 right-4 -translate-y-1/2 stroke-neutral-400"
          onClick={handleShowPassword}
        />
      ) : (
        <EyeOffIcon
          size={20}
          className="absolute top-1/2 right-4 -translate-y-1/2 stroke-neutral-400"
          onClick={handleShowPassword}
        />
      )}
    </div>
  );
}
