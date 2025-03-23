import { buttonVariants } from "@/features/ui/button";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { PropsWithChildren } from "react";

export function ButtonLink({
  children,
  href,
  variant,
  size,
  endIcon,
  startIcon,
  className,
  ...props
}: Readonly<
  PropsWithChildren<
    {
      href: Url;
      className?: string;
      startIcon?: React.ReactNode;
      endIcon?: React.ReactNode;
    } & VariantProps<typeof buttonVariants>
  >
>) {
  return (
    <Link
      {...props}
      className={cn(buttonVariants({ size, variant, className }))}
      href={href}
      {...props}
    >
      {startIcon && <span>{startIcon}</span>}
      {children}
      {endIcon && <span>{endIcon}</span>}
    </Link>
  );
}
