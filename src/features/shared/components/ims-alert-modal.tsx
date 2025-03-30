"use client";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/features/ui/alert-dialog";

import React from "react";

type ImsAlertModalProps = {
  trigger?: React.ReactNode;
  title?: string;
  description?: string | React.ReactNode;
  children?: React.ReactNode;
  open?: boolean;
  className?: string;
  onOpenChange?: (open: boolean) => void;
  actionNode?: React.ReactNode;
  cancelNode?: React.ReactNode;
};

export default function ImsAlertModal({
  children,
  className,
  description,
  onOpenChange,
  actionNode,
  cancelNode,
  open,
  title,
  trigger,
}: Readonly<ImsAlertModalProps>) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
      <AlertDialogContent className={className}>
        <AlertDialogHeader>
          {title && <AlertDialogTitle>{title}</AlertDialogTitle>}
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
          {children}
        </AlertDialogHeader>
        <AlertDialogFooter>
          {cancelNode && (
            <AlertDialogCancel asChild>{cancelNode}</AlertDialogCancel>
          )}
          {actionNode && (
            <AlertDialogAction asChild>{actionNode}</AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
