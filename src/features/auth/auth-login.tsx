"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import HookFormField from "../shared/components/hook-form-filed";
import { ImsButton } from "../shared/components/ims-button";
import useHookForm from "../shared/hooks/use-hook-form";
import { Form } from "../ui/form";
import { Input } from "../ui/input";
import { loginSchema } from "./auth.schemas";
import { handleSignIn } from "./auth.utils";

export function LoginForm() {
  const router = useRouter();
  const form = useHookForm({
    resolver: loginSchema,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) =>
          handleSignIn(data as z.infer<typeof loginSchema>, router.push),
        )}
        className="flex flex-col gap-7 pt-10"
      >
        <HookFormField
          formControl={form.control}
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
          formControl={form.control}
          name="password"
          label="Password"
          renderInput={({ field }) => (
            <Input
              {...field}
              className="focus-visible:ring-ims-blue-300 bg-white"
              type="password"
              placeholder="Password"
            />
          )}
        />
        <ImsButton
          isLoading={form.formState.isSubmitting}
          isLoadingLabel="Logging in..."
          variant="ghost"
          className="bg-ims-blue-300 hover:bg-ims-blue-200 dark:bg-ims-blue-300 dark:hover:bg-ims-blue-300/80 h-12 cursor-pointer text-white hover:text-white"
          type="submit"
        >
          Submit
        </ImsButton>
      </form>
    </Form>
  );
}
