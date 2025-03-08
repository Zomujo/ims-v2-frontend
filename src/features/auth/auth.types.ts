import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReactElement } from "react";
import { UseFormReturn } from "react-hook-form";

export type AuthFormHeadingProps = {
  title: string;
  description: string;
  className?: string;
};

export type AuthHeaderProps = {
  btnLabel: string;
  btnHrf: string;
  hideButton?: boolean;
  hideBadge?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export type AuthFormProps = {
  form: UseFormReturn;
  handleAuthSubmit: (
    credentials: unknown,
    routerFn: AppRouterInstance["push"],
  ) => void;
  RenderInputs: ReactElement;
  RenderActions: ReactElement;
};
