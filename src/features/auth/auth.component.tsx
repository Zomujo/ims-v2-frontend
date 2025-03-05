import { cn } from "@/lib/utils";
import { ButtonLink } from "../shared/components/button-link";
import { Badge } from "../ui/badge";
import React from "react";

export function LoginForm() {
  return <div className="bg-blue w-2/3 text-8xl">Login</div>;
}

export function AuthHeader({
  btnLabel,
  btnHrf,
  ...props
}: Readonly<{ btnLabel: string; btnHrf: string }> &
  React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center justify-between", props.className)}>
      <div className="flex items-center gap-2">
        <h3 className="text-2xl font-semibold">IMS</h3>
        <Badge variant={"destructive"} className="rounded-2xl">
          BETA
        </Badge>
      </div>
      <ButtonLink href={btnHrf} variant="secondary">
        {btnLabel}
      </ButtonLink>
    </div>
  );
}
