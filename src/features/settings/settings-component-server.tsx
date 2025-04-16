import { getInitials } from "@/lib/utils";
import { ImsAvatar } from "../shared/components/ims-avatar";
import { Badge } from "../ui/badge";
import { SettingsEditAvatarForm } from "./settings-general-form";

type UserAvatarGeneralSettingsProps = {
  fullName: string;
  email: string;
  role: string;
  imageUrl: string;
};

export async function UserAvatarGeneralSettings({
  fullName,
  email,
  role,
  imageUrl,
}: Readonly<UserAvatarGeneralSettingsProps>) {
  return (
    <div className="mt-10 flex items-center gap-x-4">
      <SettingsEditAvatarForm fullName={fullName} imgURL={imageUrl}>
        <ImsAvatar
          src={imageUrl}
          alt={fullName}
          fallback={getInitials(fullName)}
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
