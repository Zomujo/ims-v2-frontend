"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

const sizeVariants = {
  default: {
    width: "w-8",
    height: "h-[1.15rem]",
    thumbSize: "size-4",
  },
  lg: {
    width: "w-10",
    height: "h-[1.5em]",
    thumbSize: "size-5",
  },
  xl: {
    width: "w-12",
    height: "h-[1.75rem]",
    thumbSize: "size-6",
  },
};

function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: keyof typeof sizeVariants;
}) {
  const { width, height, thumbSize } =
    sizeVariants[size] || sizeVariants.default;
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        width,
        height,
        "peer inline-flex shrink-0 items-center rounded-full border border-neutral-200 shadow-xs transition-all outline-none focus-visible:border-neutral-950 focus-visible:ring-[3px] focus-visible:ring-neutral-950/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-neutral-900 data-[state=unchecked]:bg-neutral-200 dark:border-neutral-800 dark:focus-visible:border-neutral-300 dark:focus-visible:ring-neutral-300/50 dark:data-[state=checked]:bg-neutral-50 dark:dark:data-[state=unchecked]:bg-neutral-800/80",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          thumbSize,
          "pointer-events-none block rounded-full bg-white ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0 dark:bg-neutral-950 dark:dark:data-[state=checked]:bg-neutral-900 dark:data-[state=checked]:bg-neutral-50 dark:dark:data-[state=unchecked]:bg-neutral-50 dark:data-[state=unchecked]:bg-neutral-950",
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
