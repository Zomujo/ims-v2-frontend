"use client";

import { Button } from "@/features/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/features/ui/sheet";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type ImsSheetProps = {
  trigger?: ReactNode;
  title?: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  direction?: "top" | "bottom" | "left" | "right";
  className?: string;
};

export function ImsSheet({
  trigger,
  title,
  description,
  children,
  footer,
  open,
  onOpenChange,
  direction = "right",
  className,
}: Readonly<ImsSheetProps>) {
  return (
    <Sheet modal open={open} onOpenChange={onOpenChange}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent
        onPointerDownOutside={($event) => $event.preventDefault()}
        className={cn("inset-y-2 h-[98%] rounded-2xl md:max-w-md", className)}
        side={direction}
      >
        {(title || description) && (
          <SheetHeader>
            {title && <SheetTitle>{title}</SheetTitle>}
            {description && <SheetDescription>{description}</SheetDescription>}
          </SheetHeader>
        )}
        {children}
        {footer && (
          <SheetFooter>
            {footer}
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
