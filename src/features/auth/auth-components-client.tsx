"use client";

import { useRouter } from "next/navigation";
import { Form } from "../ui/form";
import { AuthFormProps } from "./auth.types";
import { Button } from "../ui/button";

export function AuthForm({
  form,
  handleAuthSubmit,
  RenderActions,
  RenderInputs,
}: Readonly<AuthFormProps>) {
  const router = useRouter();
  const handleSubmitFn = (data: unknown) => {
    handleAuthSubmit(data, router.push);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitFn)}
        className="flex flex-1 flex-col justify-between pt-10 md:justify-normal md:gap-y-15"
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
