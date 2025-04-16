import { Button } from "@/features/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { ImsPopover } from "./ims-popover";

export default function ImsFilters({
  children,
}: Readonly<{ children?: React.ReactNode }>) {
  return (
    <ImsPopover
      triggerProps={{ asChild: true }}
      trigger={
        <Button variant="ghost" className="h-10 border border-gray-300">
          <Icon icon="lets-icons:filter" className="h size-5" />
          <span>Filters</span>
        </Button>
      }
    >
      {children}
    </ImsPopover>
  );
}
