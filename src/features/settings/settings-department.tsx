"use client";
import { UI_STATE } from "@/lib/constant";
import { handleRequestState } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { z } from "zod";
import {
  createDepartmentAction,
  deleteDepartmentAction,
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
import {
  DepartmentFormProps,
  DepartmentManagementSettingsProps,
} from "./settings.types";

export function DepartmentManagementSettings({
  departments,
  totalPages,
}: DepartmentManagementSettingsProps) {
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
    await res;
    removeSearchParams(UI_STATE);
  };

  const handleEdit = () => {
    const department = getData(CRUDACTION.EDIT);
    return department
      ? { name: department.name, id: department.id }
      : undefined;
  };

  return (
    <CrudPage
      moduleName="department"
      data={departments}
      modalAction={handleDelete}
      handleRemoveQueryparam={handleRemoveQueryparam}
      currentDataDisplayName={getData(CRUDACTION.DELETE)?.name ?? ""}
      tableColumns={settingsDepartmentTableColumns}
      totalPages={totalPages}
      state={state}
      isEditMode={isEditMode}
      actions={(item) => [
        {
          label: "edit",
          icon: "lucide:edit-2",
          action: () => handleEditBtnClicked(item),
        },
        {
          label: "delete",
          icon: "solar:trash-bin-trash-line-duotone",
          action: () => handleDeleteBtnClicked(item),
        },
      ]}
    >
      <DepartmentForm defaultValues={handleEdit()} />
    </CrudPage>
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
    await res;
    removeSearchParams(UI_STATE);
    if (defaultValues) {
      router.refresh();
    }
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
