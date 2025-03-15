import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormProps } from "react-hook-form";
import { z } from "zod";

export default function useHookForm({
  defaultValues,
  resolver,
}: {
  defaultValues: UseFormProps["defaultValues"];
  resolver: z.ZodTypeAny;
}) {
  const form = useForm({
    defaultValues,
    resolver: zodResolver(resolver),
  });
  return form;
}
