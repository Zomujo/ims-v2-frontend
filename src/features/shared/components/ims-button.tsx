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
      {startIcon && <span className="mr-2">{startIcon}</span>}
      {isLoading ? (
        <>
          <span>{isLoadingLabel}</span>
          <LoaderCircleIcon className="animate-spin" />
        </>
      ) : (
        children
      )}
      {endIcon && <span className="ml-2">{endIcon}</span>}
    </Button>
  );
}
