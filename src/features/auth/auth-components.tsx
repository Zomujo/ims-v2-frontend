import { cn } from "@/lib/utils";
import { ButtonLink } from "../shared/components/button-link";
import { Badge } from "../ui/badge";
import { AuthFormHeadingProps, AuthHeaderProps } from "./auth.types";

export function AuthHeader({
  btnLabel,
  btnHrf,
  hideButton,
  children,
  ...props
}: Readonly<AuthHeaderProps>) {
  return (
    <div className={cn("flex items-center justify-between", props.className)}>
      <div className="flex items-center gap-2">
        <h3 className="text-2xl font-semibold">IMS</h3>
        <Badge variant={"destructive"} className="rounded-2xl">
          BETA
        </Badge>
      </div>
      {!hideButton && (
        <ButtonLink className="" href={btnHrf} variant="secondary">
          {btnLabel}
        </ButtonLink>
      )}
      {children}
    </div>
  );
}

export function AuthFormHeading({
  title,
  description,
  ...props
}: Readonly<AuthFormHeadingProps>) {
  return (
    <section className={cn("mt-[20%] flex flex-col gap-y-3", props.className)}>
      <h2 className="text-2xl font-semibold md:text-4xl">{title}</h2>
      <p className="text-sm text-gray-500">{description}</p>
    </section>
  );
}
