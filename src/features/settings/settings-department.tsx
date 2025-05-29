"use client";
import { UI_STATE } from "@/lib/constant";
import { handleRequestState } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { z } from "zod";
import {
  createDepartmentAction,
  deleteDepartmentAction,
  getDepartmentsAction,
  updateDepartmentAction,
} from "../shared/actions/settings.actions";
import CrudPage from "../shared/components/crud-page";
import HookFormField from "../shared/components/hook-form-filed";
import { ImsButton } from "../shared/components/ims-button";
import { ImsForm } from "../shared/components/ims-forms";
import useHookForm from "../shared/hooks/use-hook-form";
import useImsSearchParams from "../shared/hooks/use-ims-search-params";
import usePageCRUD from "../shared/hooks/use-page-crud";
import { Department } from "../shared/types/settings-action.types";
import { CRUDACTION } from "../shared/types/utitls.types";
import { Input } from "../ui/input";
import { departmentSettingsSchema } from "./settigns.schemas";
import { settingsDepartmentTableColumns } from "./settings.data";
import { DepartmentFormProps } from "./settings.types";
import useFetchData from "@features/shared/hooks/use-fetch-data";
import { useSessionData } from "@/hooks/useSessionData";
import { PermissionModules } from "@features/shared/types/auth-action.types";

export function DepartmentManagementSettings() {
  const { canWrite, canDelete } = useSessionData();
  const { data, loading } = useFetchData({ fetchFn: getDepartmentsAction });
  const departments = data?.data.rows ?? [];
  const {
    state,
    isEditMode,
    getData,
    getId,
    removeSearchParams,
    handleDeleteBtnClicked,
    handleEditBtnClicked,
    handleRemoveQueryparam,
  } = usePageCRUD<Department>({ data: departments });

  const handleDelete = async () => {
    const id = getId(CRUDACTION.DELETE);
    const res = deleteDepartmentAction({ id });
    handleRequestState({ res, loadingMsg: "Deleting..." });
    res.then(() => {
      removeSearchParams(UI_STATE);
    });
    await res;
  };

  const handleEdit = () => {
    const department = getData(CRUDACTION.EDIT);
    return department
      ? { name: department.name, id: department.id }
      : undefined;
  };

  return (
    <>
      <CrudPage
        moduleName="department"
        data={departments}
        modalAction={handleDelete}
        handleRemoveQueryparam={handleRemoveQueryparam}
        currentDataDisplayName={getData(CRUDACTION.DELETE)?.name ?? ""}
        tableColumns={settingsDepartmentTableColumns}
        totalPages={data?.data.totalPages ?? 0}
        isLoading={loading}
        state={state}
        isEditMode={isEditMode}
        actions={(item) => [
          {
            label: "edit",
            icon: "lucide:edit-2",
            action: () => handleEditBtnClicked(item),
            hide: !canWrite(PermissionModules.DEPARTMENTS),
          },
          {
            label: "delete",
            icon: "solar:trash-bin-trash-line-duotone",
            action: () => handleDeleteBtnClicked(item),
            hide: !canDelete(PermissionModules.DEPARTMENTS),
          },
        ]}
      >
        <DepartmentForm defaultValues={handleEdit()} />
      </CrudPage>
    </>
  );
}

function DepartmentForm({ defaultValues }: Readonly<DepartmentFormProps>) {
  const router = useRouter();
  const { removeSearchParams } = useImsSearchParams();
  const form = useHookForm({
    resolver: departmentSettingsSchema,
    defaultValues: defaultValues ?? {
      name: "",
    },
  });

  const handleSubmitFn = async (data: unknown) => {
    const { name, id } = data as z.infer<typeof departmentSettingsSchema>;
    const res = defaultValues
      ? updateDepartmentAction({ name, id: id ?? "" })
      : createDepartmentAction({ name });
    handleRequestState({
      res,
      loadingMsg: defaultValues
        ? "Updating department..."
        : "Adding department...",
    });
    res.then(() => {
      removeSearchParams(UI_STATE);
      if (defaultValues) {
        router.refresh();
      }
    });
    await res;
  };

  return (
    <ImsForm
      className="px-4"
      form={form}
      handleAuthSubmit={handleSubmitFn}
      RenderInputs={
        <HookFormField
          formControl={form.control}
          name="name"
          label="Department name"
          renderInput={({ field }) => (
            <Input
              {...field}
              className="focus-visible:ring-ims-blue-300 bg-white"
              type="text"
              placeholder="Type the department name"
            />
          )}
        />
      }
      RenderActions={
        <ImsButton
          disabled={!form.formState.isValid || form.formState.isSubmitting}
          isLoading={form.formState.isSubmitting}
          isLoadingLabel={
            defaultValues ? "Updating department..." : "Adding department..."
          }
          variant="imsPrimary"
          type="submit"
        >
          {defaultValues ? "Update department" : "Add department"}
        </ImsButton>
      }
    />
  );
}
