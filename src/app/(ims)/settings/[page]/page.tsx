import { SettingsCreateButton } from "@/features/settings/settings-component-clinet";
import { UserAvatarGeneralSettings } from "@/features/settings/settings-component-server";
import { DepartmentManagementSettings } from "@/features/settings/settings-department";
import { GeneralSettingsAccountForm } from "@/features/settings/settings-general-form";
import SettingsSecurityForm from "@/features/settings/settings-security-form";
import ManageUsersSettings from "@/features/settings/settings-users";
import { authUserProfileAction } from "@/features/shared/actions/auth.action";
import {
  getDepartmentsAction,
  getRolesAction,
  getUsersAction,
} from "@/features/shared/actions/settings.actions";
import SettingsSearchWithFilter from "@features/settings/settings-search-with-filter";

type SettingPages = {
  params: Promise<{ page: string }>;
  searchParams: Promise<{ page: string }>;
};

const pageWithDrawerUI = ["departments", "users"];

export default async function SettingsPages({
  params,
  searchParams,
}: Readonly<SettingPages>) {
  const { page } = await params;
  const { page: searchPage } = await searchParams;
  const SettingsPage =
    renderSettingsPage[page as keyof typeof renderSettingsPage] ??
    (() => <></>);
  return (
    <section className="relative w-full overflow-y-auto rounded-2xl bg-white p-8">
      <SettingsSearchWithFilter />
      {pageWithDrawerUI.includes(page) && (
        <SettingsCreateButton
          state="create"
          label={createBtnLabel[page as keyof typeof createBtnLabel]}
        />
      )}
      <SettingsPage page={searchPage} />
    </section>
  );
}

const renderSettingsPage = {
  general: GeneralSettings,
  security: SecuritySettings,
  departments: DepartmentSettings,
  users: UsersSettings,
  default: () => <div>Page not found</div>,
} as const;
const createBtnLabel = {
  departments: "Add new department",
  users: "Add new user",
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

async function SecuritySettings() {
  /**
   * TODO: Implement sessions
   */
  return <SettingsSecurityForm />;
}

async function DepartmentSettings() {
  return <DepartmentManagementSettings />;
}

async function UsersSettings({ page }: Readonly<{ page: string }>) {
  const [allFacilityUsers, allDepartments, allRoles] = await Promise.all([
    getUsersAction({ page }),
    getDepartmentsAction({ pageSize: "0" }),
    getRolesAction({ pageSize: "0" }),
  ]);
  return (
    <ManageUsersSettings
      users={allFacilityUsers.data.rows}
      departments={allDepartments.data.rows}
      roles={allRoles.data}
      {...allFacilityUsers.data}
    />
  );
}
