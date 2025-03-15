import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ComponentProps, ReactElement } from "react";
import { ControllerProps, FieldValues, UseFormReturn } from "react-hook-form";

export type AuthFormHeadingProps = {
  title: string;
  description: string;
  className?: string;
};

export type AuthHeaderProps = {
  btnLabel: string;
  btnHrf: string;
  hideBadge?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export type AuthFormProps = {
  form: UseFormReturn;
  handleAuthSubmit: (
    credentials: unknown,
    routerFn: AppRouterInstance["push"],
  ) => Promise<unknown>;
  RenderInputs: ReactElement;
  RenderActions: ReactElement;
};

export type RenderPasswordInputProps = ComponentProps<
  ControllerProps<FieldValues>["render"]
>;
