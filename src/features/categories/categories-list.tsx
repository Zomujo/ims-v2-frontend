"use client";
import { UI_STATE } from "@/lib/constant";
import { handleRequestState } from "@/lib/utils";
import { z } from "zod";
import {
  addItemCategory,
  deleteItemCategory,
  getItemCategories,
  updateItemCategory,
} from "../shared/actions/item-categories.actions";
import CrudPage from "../shared/components/crud-page";
import HookFormField from "../shared/components/hook-form-filed";
import { ImsButton } from "../shared/components/ims-button";
import { ImsForm } from "../shared/components/ims-forms";
import useFetchData from "../shared/hooks/use-fetch-data";
import useHookForm from "../shared/hooks/use-hook-form";
import useImsSearchParams from "../shared/hooks/use-ims-search-params";
import usePageCRUD from "../shared/hooks/use-page-crud";
import { CRUDACTION } from "../shared/types/utitls.types";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { itemCategoriesTableColumns } from "./categories.data";
import { categoryFormSchema } from "./categories.schemas";

export default function CategoriesList() {
  const { data, loading } = useFetchData({ fetchFn: getItemCategories });
  const itemCategories = data?.rows ?? [];
  const {
    state,
    isEditMode,
    getData,
    getId,
    removeSearchParams,
    handleDeleteBtnClicked,
    handleEditBtnClicked,
    handleRemoveQueryparam,
  } = usePageCRUD({ data: itemCategories });

  const handleDelete = async () => {
    const id = getId(CRUDACTION.DELETE);
    const res = deleteItemCategory(id);
    handleRequestState({ res, loadingMsg: "Deleting category...." });
    res.then(() => {
      removeSearchParams(CRUDACTION.DELETE);
    });
    await res;
  };

  return (
    <ScrollArea className="mt-2 h-[calc(100%-5rem)] rounded-2xl bg-white pr-4">
      <CrudPage
        moduleName="item categories"
        data={itemCategories}
        modalAction={handleDelete}
        handleRemoveQueryparam={handleRemoveQueryparam}
        currentDataDisplayName={getData(CRUDACTION.DELETE)?.name ?? ""}
        tableColumns={itemCategoriesTableColumns}
        totalPages={data?.totalPages ?? 0}
        state={state}
        isEditMode={isEditMode}
        isLoading={loading}
        actions={(item) => [
          {
            label: "edit",
            icon: "lucide:edit-2",
            action: () => handleEditBtnClicked(item),
          },
          {
            label: "delete",
            icon: "solar:trash-bin-trash-line-duotone",
            type: "destructive",
            action: () => handleDeleteBtnClicked(item),
          },
        ]}
      >
        <CategoriesForm
          categoryId={getId(CRUDACTION.EDIT)}
          categroryName={getData("edit")?.name}
        />
      </CrudPage>
    </ScrollArea>
  );
}

function CategoriesForm({
  categroryName,
  categoryId,
}: Readonly<{ categroryName?: string; categoryId?: string }>) {
  const { removeSearchParams } = useImsSearchParams();
  const form = useHookForm({
    resolver: categoryFormSchema,
    defaultValues: {
      name: categroryName ?? "",
    },
  });
  const isEditMode = !!categroryName;

  const handleSubmit = async (data: unknown) => {
    const oneCategoryData = data as z.infer<typeof categoryFormSchema>;
    const res = isEditMode
      ? updateItemCategory(categoryId ?? "", oneCategoryData)
      : addItemCategory(oneCategoryData);
    handleRequestState({
      res,
      loadingMsg: isEditMode ? "Updating category..." : "Adding category...",
    });
    res.then(() => {
      removeSearchParams(UI_STATE);
    });
    await res;
  };
  return (
    <ImsForm
      className="overflow-y-auto [&>*]:px-4"
      inputSectionClassName="overflow-y-auto"
      form={form}
      handleAuthSubmit={handleSubmit}
      RenderActions={
        <ImsButton
          className="flex-1"
          isLoading={form.formState.isSubmitting}
          isLoadingLabel={
            isEditMode ? "Updating category" : "Adding category..."
          }
          variant="imsPrimary"
          type="submit"
        >
          {isEditMode ? "Update Category" : "Add Category"}
        </ImsButton>
      }
      RenderInputs={
        <HookFormField
          formControl={form.control}
          name="name"
          label="Category Name"
          renderInput={({ field }) => (
            <Input
              {...field}
              className="focus-visible:ring-ims-blue-300 bg-white"
              type="text"
              placeholder="Eg. Paracetamol"
            />
          )}
        />
      }
    />
  );
}
