import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormProps } from "react-hook-form";
import { z } from "zod";

export default function useHookForm<T>({
  defaultValues,
  resolver,
}: {
  defaultValues: UseFormProps["defaultValues"] &
    z.infer<T extends z.ZodTypeAny ? T : never>;
  resolver: T;
}) {
  const form = useForm({
    defaultValues,
    resolver: zodResolver(resolver as z.ZodSchema),
  });
  return form;
}
