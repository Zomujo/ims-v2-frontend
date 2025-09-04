"use client";
import { getInitials } from "@/lib/utils";
import { ImsAvatar } from "../shared/components/ims-avatar";
import { Badge } from "../ui/badge";
import { SettingsEditAvatarForm } from "./settings-general-form";
import { useSessionData } from "@/hooks/useSessionData";

export function UserAvatarGeneralSettings() {
  const { fullName, profileImage, role, email } = useSessionData();
  return (
    <div className="mt-10 flex items-center gap-x-4">
      <SettingsEditAvatarForm
        fullName={fullName ?? ""}
        imgURL={profileImage ?? ""}
      >
        <ImsAvatar
          src={profileImage ?? ""}
          alt={fullName ?? ""}
          fallback={getInitials(fullName ?? "")}
          className="h-16 w-16"
        />
      </SettingsEditAvatarForm>
      <div className="flex flex-col">
        <p className="flex items-center gap-x-2 text-xl font-bold">
          {fullName}
          <Badge className="bg-[#D97706] capitalize">{role}</Badge>
        </p>
        <span className="text-sm text-gray-500">{email}</span>
      </div>
    </div>
  );
}
