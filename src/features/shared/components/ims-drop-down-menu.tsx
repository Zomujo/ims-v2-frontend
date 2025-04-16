"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/features/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import React from "react";

type MenuItem = {
  id: string;
  varient?: "destructive" | "default";
  node: React.ReactNode;
};

type ImsDropdownMenuProps = {
  trigger: React.ReactNode;
  menuItems: MenuItem[];
  align?: "start" | "center" | "end";
  className?: string;
};

export default function ImsDropdownMenu({
  trigger,
  menuItems,
  className,
  align = "end",
}: Readonly<ImsDropdownMenuProps>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className={cn("p-0", className)} align={align}>
        {menuItems.map(({ id, node, varient }) => (
          <DropdownMenuItem variant={varient} asChild key={id}>
            {node}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
