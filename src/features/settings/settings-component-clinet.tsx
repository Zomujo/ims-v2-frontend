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

export function SettingsSidebar() {
  const { hasPermission } = useSessionData();
  return (
    <nav className="flex h-full w-85 flex-col gap-y-1 overflow-y-auto rounded-2xl bg-white py-7 pr-2 pl-4">
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
  setEidtForm,
  editForm,
  className,
}: Readonly<{
  isSubmitting: boolean;
  editForm: boolean;
  className?: string;
  setEidtForm: Dispatch<SetStateAction<boolean>>;
}>) {
  return (
    <div className={cn("absolute top-0 right-0 flex gap-4", className)}>
      {!editForm && (
        <ImsButton
          startIcon={<Icon icon="hugeicons:edit-01" />}
          isLoadingLabel="Logging in..."
          variant="outline"
          type="button"
          onClick={() => setEidtForm((prev) => !prev)}
        >
          Edit
        </ImsButton>
      )}
      {editForm && (
        <>
          <ImsButton
            isLoadingLabel="Logging in..."
            variant="ghost"
            className="order-last cursor-pointer justify-self-end bg-red-50 text-red-600 hover:bg-red-600 hover:text-white md:order-none"
            type="reset"
            onClick={() => {
              setEidtForm((prev) => !prev);
            }}
          >
            Discard
          </ImsButton>
          <ImsButton
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
