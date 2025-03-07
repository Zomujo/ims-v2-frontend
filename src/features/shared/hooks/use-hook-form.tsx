import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormProps } from "react-hook-form";
import { AnyZodObject } from "zod";

export default function useHookForm({
  defaultValues,
  resolver,
}: {
  defaultValues: UseFormProps["defaultValues"];
  resolver: AnyZodObject;
}) {
  const form = useForm({
    defaultValues,
    resolver: zodResolver(resolver),
  });
  return form;
}
