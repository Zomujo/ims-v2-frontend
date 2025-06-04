"use client";
import { LogOutButton } from "@/features/auth/auth-components-client";
import { ButtonLink } from "@/features/shared/components/button-link";
import { ImsAvatar } from "@/features/shared/components/ims-avatar";
import ImsDropdownMenu from "@/features/shared/components/ims-drop-down-menu";
import { ImsPopover } from "@/features/shared/components/ims-popover";
import { PAGE_ROUTES } from "@/lib/constant";
import { cn, getInitials } from "@/lib/utils";
import { BellIcon, EllipsisIcon, SettingsIcon } from "lucide-react";
import { useSessionData } from "@/hooks/useSessionData";
import RealtimeNotifications from "@features/notifications/notifications";
import { useGlobalNotifications } from "@features/notifications/notifications-context";

export function NotificationButton() {
  const { unreadCount, isConnected } = useGlobalNotifications();

  return (
    <ImsPopover
      className="relative cursor-pointer rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200"
      contentClassName="w-full max-w-[470px]"
      trigger={
        <div className="relative">
          <BellIcon size={20} />
          {unreadCount > 0 && (
            <span className="absolute -top-3 -right-4 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
          <span
            className={cn(
              "absolute -right-1 -bottom-1 h-3 w-3 rounded-full border-2 border-white",
              isConnected ? "bg-green-500" : "bg-red-500",
            )}
          />
        </div>
      }
    >
      <RealtimeNotifications />
    </ImsPopover>
  );
}

export function UserProfileButton() {
  const { profileImage, fullName } = useSessionData();

  return (
    <ImsDropdownMenu
      trigger={
        <div className="flex cursor-pointer items-center gap-x-2">
          <ImsAvatar
            src={profileImage ?? ""}
            alt={fullName ?? "Profile Image"}
            fallback={getInitials(fullName ?? "")}
          />
          <span className="ml-2">{fullName}</span>
          <EllipsisIcon className="rotate-90" size={20} />
        </div>
      }
      menuItems={[
        {
          id: "settings",
          node: (
            <ButtonLink
              href={PAGE_ROUTES.SETTINGS.GENERAL}
              variant={"ghost"}
              startIcon={<SettingsIcon />}
              className="flex justify-start rounded-none p-0 py-6 pl-3"
            >
              Settings
            </ButtonLink>
          ),
        },
        {
          id: "logout",
          node: <LogOutButton />,
        },
      ]}
    />
  );
}
