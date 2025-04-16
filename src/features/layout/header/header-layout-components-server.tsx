import { LogOutButton } from "@/features/auth/auth-components-client";
import { authUserProfileAction } from "@/features/shared/actions/auth.action";
import { ButtonLink } from "@/features/shared/components/button-link";
import { ImsAvatar } from "@/features/shared/components/ims-avatar";
import ImsDropdownMenu from "@/features/shared/components/ims-drop-down-menu";
import { ImsPopover } from "@/features/shared/components/ims-popover";
import { PAGE_ROUTES } from "@/lib/constant";
import { getInitials } from "@/lib/utils";
import { BellIcon, EllipsisIcon, SettingsIcon } from "lucide-react";

export function NotificationButton() {
  return (
    <ImsPopover
      className="cursor-pointer rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200"
      trigger={<BellIcon size={20} />}
    >
      <div className="p-4">
        <h3 className="text-lg font-semibold">Notifications</h3>
        <p className="text-sm text-gray-500">No new notifications</p>
      </div>
    </ImsPopover>
  );
}

export async function UserProfileButton() {
  const imsUserProfile = await authUserProfileAction();

  return (
    <ImsDropdownMenu
      trigger={
        <div className="flex cursor-pointer items-center gap-x-2">
          <ImsAvatar
            src={imsUserProfile.imageUrl ?? ""}
            alt={imsUserProfile.fullName}
            fallback={getInitials(imsUserProfile.fullName)}
          />
          <span className="ml-2">{imsUserProfile.fullName}</span>
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
