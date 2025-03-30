import { AuthFormProps } from "@/features/auth/auth.types";
import { Form } from "@/features/ui/form";
import { cn } from "@/lib/utils";
type IMSFormProps = Omit<AuthFormProps, "handleAuthSubmit"> & {
  handleAuthSubmit: (data: unknown) => Promise<void>;
  inputSectionClassName?: string;
  actionSectionClassName?: string;
};

export function ImsForm({
  form,
  handleAuthSubmit,
  RenderActions,
  RenderInputs,
  className,
  inputSectionClassName,
  actionSectionClassName,
}: Readonly<IMSFormProps>) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleAuthSubmit)}
        className={cn(
          "flex flex-1 flex-col justify-between gap-y-8 pb-4",
          className,
        )}
      >
        <section className={cn("space-y-8", inputSectionClassName)}>
          {RenderInputs}
        </section>
        <section
          className={cn("flex flex-col gap-y-4", actionSectionClassName)}
        >
          {RenderActions}
        </section>
      </form>
    </Form>
  );
}
