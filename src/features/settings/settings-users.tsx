"use client";
import { ACCESS_LEVELS, UI_STATE } from "@/lib/constant";
import { handleRequestState } from "@/lib/utils";
import { use, useEffect } from "react";
import { Control, useFieldArray } from "react-hook-form";
import { z } from "zod";
import {
  addUserAction,
  editUserRoleAction,
  getUserAction,
} from "../shared/actions/settings.actions";
import CrudPage from "../shared/components/crud-page";
import HookFormField from "../shared/components/hook-form-filed";
import { ImsButton } from "../shared/components/ims-button";
import { ImsForm } from "../shared/components/ims-forms";
import { ImsSelect } from "../shared/components/ims-select";
import useHookForm from "../shared/hooks/use-hook-form";
import useImsSearchParams from "../shared/hooks/use-ims-search-params";
import usePageCRUD from "../shared/hooks/use-page-crud";
import { AuthIMSUserProfile } from "../shared/types/auth-action.types";
import {
  FacilityUsers,
  USER_STATUS,
} from "../shared/types/settings-action.types";
import { CRUDACTION } from "../shared/types/utitls.types";
import { Input } from "../ui/input";
import { newUserSettingsSchema } from "./settigns.schemas";
import { settingsUserTableColumns } from "./settings-component-clinet";
import {
  ManageUsersContext,
  ManageUsersContextProvider,
} from "./settings.context";
import { defaultPermissions } from "./settings.data";
import { ManageUsersSettingsProps } from "./settings.types";

type ManageUsersSettingsFormProps = {
  defaultValues?: z.infer<typeof newUserSettingsSchema> | null;
};

export default function ManageUsersSettings({
  users,
  departments,
  roles,
  totalPages,
}: Readonly<ManageUsersSettingsProps>) {
  const {
    state,
    isEditMode,
    singleData,
    getData,
    handleActionBtnClicked,
    handleEditBtnClicked,
    handleRemoveQueryparam,
  } = usePageCRUD<FacilityUsers, AuthIMSUserProfile>({
    data: users,
    getSingleDataFn: getUserAction,
  });

  const handleDeactivateUser = async () => {};
  const handleChangeUserRole = () => {
    return singleData
      ? ({
          email: singleData?.email,
          fullName: singleData?.fullName,
          role: singleData?.role,
          departmentId: singleData?.departmentId,
          permissions: getUpdatedPermissions(singleData?.permissions ?? []),
          id: singleData?.id,
        } as ManageUsersSettingsFormProps["defaultValues"])
      : null;
  };

  return (
    <CrudPage
      moduleName="user"
      data={users}
      state={state}
      isEditMode={singleData ? isEditMode : false}
      totalPages={totalPages}
      modalAction={handleDeactivateUser}
      modalActionLabel="Deactivate User"
      tableColumns={settingsUserTableColumns}
      handleRemoveQueryparam={handleRemoveQueryparam}
      currentDataDisplayName={getData(CRUDACTION.STATUS)?.fullName ?? ""}
      openModal={state.includes(CRUDACTION.STATUS)}
      actions={(item) => {
        const status = item.status.toLowerCase();
        const isActive = status === USER_STATUS.ACTIVE;
        const isDeclined = status === USER_STATUS.DECLINED;
        return [
          {
            label: "change role",
            icon: "lucide:edit-2",
            action: () => handleEditBtnClicked(item),
          },
          isActive || isDeclined
            ? {
                label: isActive ? "deactivate user" : "activate user",
                icon: "material-symbols:delete-outline",
                type: "destructive",
                action: () =>
                  handleActionBtnClicked({
                    id: item.id,
                    action: CRUDACTION.STATUS,
                  }),
              }
            : null,
        ];
      }}
    >
      <ManageUsersContextProvider value={{ roles, departments, isEditMode }}>
        <ManageUsersSettingsForm defaultValues={handleChangeUserRole()} />
      </ManageUsersContextProvider>
    </CrudPage>
  );
}
const getUpdatedPermissions = (rolePermissions: string[]) => {
  const permMap = Object.fromEntries(
    rolePermissions.map((p) => [p.split(":")[0], p]),
  );
  return defaultPermissions.map((perm) => permMap[perm.split(":")[0]] || perm);
};

function ManageUsersSettingsForm({
  defaultValues,
}: Readonly<ManageUsersSettingsFormProps>) {
  const { roles, isEditMode } = use(ManageUsersContext);
  const { removeSearchParams } = useImsSearchParams();

  const form = useHookForm({
    resolver: newUserSettingsSchema,
    defaultValues: defaultValues ?? {
      fullName: "",
      email: "",
      role: "",
      departmentId: "",
      permissions: defaultPermissions,
    },
  });

  const handleSubmit = async (data: unknown) => {
    const newUser = data as ManageUsersSettingsFormProps["defaultValues"];
    const res = isEditMode
      ? editUserRoleAction({
          id: newUser?.id ?? "",
          newUserRole: {
            role: newUser?.role,
            permissions: newUser?.permissions,
          },
        })
      : addUserAction({
          ...newUser,
          departmentId: newUser?.departmentId || null,
        });
    handleRequestState({
      res,
      loadingMsg: isEditMode ? "Updating user role..." : "Adding user...",
    });
    res.then(() => {
      removeSearchParams(UI_STATE);
    });
    await res;
  };

  useEffect(() => {
    const setDefaultPermissions = () => {
      form.setValue("permissions", defaultPermissions);
    };

    if (!form.getFieldState("role").isDirty && !defaultValues) {
      setDefaultPermissions();
      return;
    }

    const selectedRole = roles.find(
      ({ role }) => role === form.getValues("role"),
    );

    if (selectedRole?.permissions) {
      const mergedPermissions = getUpdatedPermissions(selectedRole.permissions);
      form.setValue("permissions", mergedPermissions);
    } else {
      setDefaultPermissions();
    }
  }, [form.watch("role")]);

  return (
    <ImsForm
      className="overflow-y-auto [&>*]:px-4"
      inputSectionClassName="overflow-y-auto"
      form={form}
      handleAuthSubmit={handleSubmit}
      RenderActions={
        <ImsButton
          isLoading={form.formState.isSubmitting}
          isLoadingLabel={
            isEditMode ? "Updating user role..." : "Adding user..."
          }
          variant="imsPrimary"
          type="submit"
        >
          {isEditMode ? "Update user role" : "Add user"}
        </ImsButton>
      }
      RenderInputs={<ManagerUsersSettingsFormInputs control={form.control} />}
    />
  );
}

function ManagerUsersSettingsFormInputs({
  control,
}: Readonly<{ control: Control }>) {
  const { roles, departments, isEditMode } = use(ManageUsersContext);
  const comboboxRoles = roles.map((role) => ({
    value: role.role,
    label: role.role,
  }));
  const comboboxDepartments = departments.map((department) => ({
    value: department.id,
    label: department.name,
  }));

  return (
    <>
      <HookFormField
        formControl={control}
        name="fullName"
        label="Full Name"
        renderInput={({ field }) => {
          return (
            <Input
              {...field}
              className="focus-visible:ring-ims-blue-300 bg-white"
              type="text"
              placeholder="eg. John Doe"
              disabled={isEditMode}
            />
          );
        }}
      />
      <HookFormField
        formControl={control}
        name="email"
        label="Email"
        renderInput={({ field }) => (
          <Input
            {...field}
            className="focus-visible:ring-ims-blue-300 bg-white"
            type="email"
            placeholder="eg. example@mail.com"
            disabled={isEditMode}
          />
        )}
      />{" "}
      <HookFormField
        formControl={control}
        name="departmentId"
        label="Choose Department"
        renderInput={({ field }) => (
          <ImsSelect
            disabled={isEditMode}
            options={comboboxDepartments}
            defaultValue={field.value}
            moduleName="department"
            onChange={(value) => field.onChange(value)}
            value={field.value}
            className="focus-visible:ring-ims-blue-300 !h-11 bg-white"
          />
        )}
      />
      <HookFormField
        formControl={control}
        name="role"
        label="Assign Role"
        renderInput={({ field }) => (
          <ImsSelect
            options={comboboxRoles}
            moduleName="role"
            onChange={(value) => field.onChange(value)}
            value={field.value}
            className="focus-visible:ring-ims-blue-300 !h-11 bg-white"
          />
        )}
      />
      <PermissionsInputs control={control} />
    </>
  );
}

function PermissionsInputs({ control }: Readonly<{ control: Control }>) {
  const getLabel = (index: number) => {
    return defaultPermissions[index].replace("_", " ");
  };
  const { fields: permissions } = useFieldArray({
    control,
    name: "permissions",
  });

  return (
    <>
      <h3 className="my-4 font-semibold">Permissions</h3>
      {permissions.map((item, index) => {
        return (
          <HookFormField
            key={item.id}
            formControl={control}
            name={`permissions.${index}`}
            label={
              <span className="font-medium capitalize">{getLabel(index)}</span>
            }
            className="flex items-center justify-between"
            renderInput={({ field }) => {
              return (
                <ImsSelect
                  className="w-[55%]"
                  onChange={(access) => {
                    if (access === "none") {
                      field.onChange("");
                      return;
                    }
                    field.onChange(field.value.split(":")[0] + ":" + access);
                  }}
                  value={field.value.split(":")?.[1] ?? ""}
                  moduleName="permission"
                  options={ACCESS_LEVELS.map((access) => ({
                    value: access,
                    label: access,
                  }))}
                />
              );
            }}
          />
        );
      })}
    </>
  );
}
