"use client";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { ColumnDef } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";
import { ButtonLink } from "../shared/components/button-link";
import { ImsButton } from "../shared/components/ims-button";
import ImsNavTab from "../shared/components/ims-nav-tab";
import {
  FacilityUsers,
  USER_STATUS,
} from "../shared/types/settings-action.types";
import { Badge } from "../ui/badge";
import { settingsSidebarNavItems } from "./settings.data";
import { useSessionData } from "@/hooks/useSessionData";
import { useOnlineStatus } from "@features/shared/hooks/useOnlineStatus";

export function SettingsSidebar() {
  const { hasPermission } = useSessionData();
  return (
    <nav className="flex w-full flex-row gap-x-2 overflow-x-auto bg-white px-4 py-4 md:gap-x-0 md:gap-y-1 md:overflow-y-auto md:rounded-2xl md:py-7 md:pr-2 md:pl-4 xl:h-full xl:w-85 xl:flex-col">
      {settingsSidebarNavItems.map((item) => {
        return (
          (!item.permission || hasPermission(item.permission)) && (
            <ImsNavTab key={item.href} {...item} />
          )
        );
      })}
    </nav>
  );
}

export function SettingsFromActions({
  isSubmitting,
  setEditFormAction,
  editFormAction,
  className,
  disabled,
}: Readonly<{
  disabled: boolean;
  isSubmitting: boolean;
  editFormAction: boolean;
  className?: string;
  setEditFormAction: Dispatch<SetStateAction<boolean>>;
}>) {
  const { isOnline } = useOnlineStatus();
  if (!isOnline) {
    return null;
  }
  return (
    <div className={cn("absolute top-0 right-0 flex gap-4", className)}>
      {!editFormAction && (
        <ImsButton
          startIcon={<Icon icon="hugeicons:edit-01" />}
          isLoadingLabel="Logging in..."
          variant="outline"
          type="button"
          onClick={() => setEditFormAction((prev) => !prev)}
        >
          Edit
        </ImsButton>
      )}
      {editFormAction && (
        <>
          <ImsButton
            isLoadingLabel="Logging in..."
            variant="ghost"
            className="order-last cursor-pointer justify-self-end bg-red-50 text-red-600 hover:bg-red-600 hover:text-white md:order-none"
            type="reset"
            onClick={() => {
              setEditFormAction((prev) => !prev);
            }}
          >
            Discard
          </ImsButton>
          <ImsButton
            disabled={disabled || isSubmitting}
            isLoading={isSubmitting}
            isLoadingLabel="Logging in..."
            variant="imsPrimary"
            className="order-last cursor-pointer justify-self-end md:order-none"
            type="submit"
          >
            Save
          </ImsButton>
        </>
      )}
    </div>
  );
}

export function SettingsCreateButton({
  label,
  state,
}: Readonly<{ label: string; state: string }>) {
  const { isOnline } = useOnlineStatus();
  if (!isOnline) {
    return null;
  }
  return (
    <ButtonLink
      href={{ query: { state } }}
      replace
      className="absolute top-8 right-8 order-last cursor-pointer justify-self-end md:order-none"
      variant={"imsPrimary"}
    >
      {label}
    </ButtonLink>
  );
}

export const settingsUserTableColumns: ColumnDef<FacilityUsers>[] = [
  {
    accessorKey: "fullName",
    header: "User",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status.toLowerCase();
      return (
        <Badge
          className={cn("capitalize", {
            "bg-green-100 text-green-800 [&_span]:bg-green-500":
              status === USER_STATUS.ACTIVE,
            "bg-red-100 text-red-800 [&_span]:bg-red-500":
              status === USER_STATUS.DECLINED,
            "bg-orange-100 text-orange-800 [&_span]:bg-yellow-500":
              status === USER_STATUS.PENDING,
            "bg-blue-100 text-blue-800 [&_span]:bg-blue-500":
              status === USER_STATUS.ACCEPTED,
            "bg-gray-100 text-gray-800 [&_span]:bg-gray-500":
              status === USER_STATUS.INACTIVE,
          })}
        >
          <span className="h-1.5 w-1.5 rounded-full"></span>
          {status}
        </Badge>
      );
    },
  },
];
