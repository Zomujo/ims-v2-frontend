import { Button } from "@/features/ui/button";
import React from "react";
import { LoaderCircleIcon } from "lucide-react";

export function ImsButton({
  children,
  isLoading,
  isLoadingLabel = "Loading...",
  startIcon,
  endIcon,
  ...props
}: React.ComponentProps<typeof Button> & {
  isLoading?: boolean;
  isLoadingLabel?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}) {
  return (
    <Button {...props}>
      {startIcon && <span>{startIcon}</span>}
      {isLoading ? (
        <>
          <span>{isLoadingLabel}</span>
          <LoaderCircleIcon className="animate-spin" />
        </>
      ) : (
        children
      )}
      {endIcon && <span>{endIcon}</span>}
    </Button>
  );
}

export function ProgressBar({
  totalSteps,
  currentStep,
}: Readonly<{
  totalSteps: number;
  currentStep: number;
}>) {
  return (
    <div className="mb-4 flex w-full items-center gap-2">
      {Array.from({ length: totalSteps }, (_, index) => {
        const isCurentStep = index + 1 <= currentStep;
        return (
          <span
            key={`${_}-${index}`}
            className="flex h-2 w-full rounded-full bg-gray-200"
          >
            <span
              className="bg-ims-blue-300 h-2 rounded-full"
              style={{
                width: isCurentStep ? "100%" : "0%",
              }}
            />
          </span>
        );
      })}
    </div>
  );
}
