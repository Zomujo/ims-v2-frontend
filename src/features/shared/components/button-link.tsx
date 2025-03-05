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
  className,
  ...props
}: Readonly<
  PropsWithChildren<
    { href: Url; className?: string } & VariantProps<typeof buttonVariants>
  >
>) {
  return (
    <Link
      {...props}
      className={cn(buttonVariants({ size, variant, className }))}
      href={href}
      {...props}
    >
      {children}
    </Link>
  );
}
