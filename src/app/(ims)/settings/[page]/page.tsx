import { UserAvatarGeneralSettings } from "@/features/settings/settings-component-server";
import { GeneralSettingsAccountForm } from "@/features/settings/settings-general-form";
import { authUserProfileAction } from "@/features/shared/actions/auth.action";
import PageHeading from "@/features/shared/components/page-heading";
import React from "react";

type SettingPages = {
  params: Promise<{ page: string }>;
};

export default async function SettingsPages({
  params,
}: Readonly<SettingPages>) {
  const { page } = await params;
  return (
    <section className="w-full rounded-2xl bg-white p-8">
      <PageHeading routeLevel={2} />
      {renderSettingsPage[page as keyof typeof renderSettingsPage]}
    </section>
  );
}

const renderSettingsPage = {
  general: <GeneralSettings />,
} as const;

async function GeneralSettings() {
  const imsUserProfile = await authUserProfileAction();

  return (
    <div className="flex flex-col gap-y-14">
      <UserAvatarGeneralSettings
        fullName={imsUserProfile.fullName ?? ""}
        imageUrl={imsUserProfile.imageUrl ?? ""}
        role={imsUserProfile.role ?? ""}
        email={imsUserProfile?.email ?? ""}
      />
      <GeneralSettingsAccountForm
        fullName={imsUserProfile.fullName ?? ""}
        email={imsUserProfile?.email ?? ""}
        phoneNumber={imsUserProfile.phoneNumber ?? ""}
      />
    </div>
  );
}
