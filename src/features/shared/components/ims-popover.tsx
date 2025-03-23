"use client";
import { Popover, PopoverContent, PopoverTrigger } from "@/features/ui/popover";
import { PropsWithChildren } from "react";

export function ImsPopover({
  children,
  trigger,
  className,
}: Readonly<
  PropsWithChildren<{
    trigger: React.ReactNode;
    className?: string;
  }>
>) {
  return (
    <Popover>
      <PopoverTrigger className={className}>{trigger}</PopoverTrigger>
      <PopoverContent className="w-max p-0">{children}</PopoverContent>
    </Popover>
  );
}
