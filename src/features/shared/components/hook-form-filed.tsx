import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/features/ui/form";
import { cn } from "@/lib/utils";
import { Control, ControllerProps, FieldValues } from "react-hook-form";

type HookFormFieldProps = {
  formControl: Control<FieldValues>;
  label: string;
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
          <FormLabel>{label}</FormLabel>
          <FormControl>{renderInput(field)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
