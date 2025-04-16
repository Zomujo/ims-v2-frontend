"use client";
import { Popover, PopoverContent, PopoverTrigger } from "@/features/ui/popover";
import { cn } from "@/lib/utils";
import { ComponentProps, PropsWithChildren } from "react";

export function ImsPopover({
  children,
  trigger,
  triggerProps,
  className,
  contentAlign,
  contentClassName,
  onOpenChange,
}: Readonly<
  PropsWithChildren<{
    trigger: React.ReactNode;
    triggerProps?: ComponentProps<typeof PopoverTrigger>;
    className?: string;
    contentAlign?: ComponentProps<typeof PopoverContent>["align"];
    contentClassName?: ComponentProps<typeof PopoverContent>["className"];
    onOpenChange?: (isOpen: boolean) => void;
  }>
>) {
  return (
    <Popover onOpenChange={onOpenChange}>
      <PopoverTrigger className={className} {...triggerProps}>
        {trigger}
      </PopoverTrigger>
      <PopoverContent
        align={contentAlign}
        className={cn("w-max p-0", contentClassName)}
      >
        {children}
      </PopoverContent>
    </Popover>
  );
}
