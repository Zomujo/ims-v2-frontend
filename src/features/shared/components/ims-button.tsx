import { Button } from "@/features/ui/button";
import React from "react";
import { LoaderCircleIcon } from "lucide-react";

export function ImsButton({
  children,
  isLoading,
  isLoadingLabel = "Loading...",
  ...props
}: React.ComponentProps<typeof Button> & {
  isLoading?: boolean;
  isLoadingLabel?: string;
}) {
  return (
    <Button {...props}>
      {isLoading ? (
        <>
          <span>{isLoadingLabel}</span>
          <LoaderCircleIcon className="animate-spin" />
        </>
      ) : (
        children
      )}
    </Button>
  );
}
