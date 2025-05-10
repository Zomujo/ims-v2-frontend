import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/features/ui/form";
import { cn } from "@/lib/utils";
import { ChangeEvent, PropsWithChildren } from "react";
import {
  Control,
  ControllerProps,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";

type HookFormFieldProps = {
  formControl: Control<FieldValues>;
  label?: string | React.ReactNode;
  name: string;
  className?: string;
  renderInput: ControllerProps<FieldValues>["render"];
};

export default function HookFormField({
  formControl,
  label,
  name,
  className,
  renderInput,
}: Readonly<HookFormFieldProps>) {
  return (
    <FormField
      control={formControl}
      name={name}
      render={(field) => (
        <FormItem className={cn("gap-3", className)}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>{renderInput(field)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function MultiStep({
  currentStep,
  children,
  step = 1,
}: Readonly<PropsWithChildren<{ currentStep: number; step: number }>>) {
  return (
    <div
      className={cn("space-y-8", {
        hidden: currentStep !== step,
      })}
    >
      {children}
    </div>
  );
}

export const inputTypeNumber = (
  field: ControllerRenderProps<FieldValues, string>,
) => {
  return {
    value: field.value === undefined ? "" : String(field.value),
    onChange(e: ChangeEvent<HTMLInputElement>) {
      const value = e.target.value;
      field.onChange(value === "" ? undefined : Number(value));
    },
  };
};
