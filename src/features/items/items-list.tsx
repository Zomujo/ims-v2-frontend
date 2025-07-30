"use client";

import { PAGE_ROUTES, UI_STATE } from "@/lib/constant";
import { handleRequestState, isStepValid } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import { z } from "zod";
import {
  addItem,
  deleteItem,
  getItem,
  getItems,
  updateItem,
} from "../shared/actions/items.actions";
import CrudPage from "../shared/components/crud-page";
import { ImsButton, ProgressBar } from "../shared/components/ims-button";
import { ImsForm } from "../shared/components/ims-forms";
import useFetchData from "../shared/hooks/use-fetch-data";
import useHookForm from "../shared/hooks/use-hook-form";
import useImsSearchParams from "../shared/hooks/use-ims-search-params";
import usePageCRUD from "../shared/hooks/use-page-crud";
import { CRUDACTION } from "../shared/types/utitls.types";
import { ItemFormInputs } from "./items-component-client";
import { ItemsContextProvider } from "./items.context";
import { itemsTableColumns } from "./items.data";
import { itemFormSchema } from "./items.schemas";
import LoadingOverlay from "@features/ui/loadingOverlay";
import { useCategories } from "@/hooks/useCategories";
import { useSessionData } from "@/hooks/useSessionData";
import { PermissionModules } from "@features/shared/types/auth-action.types";

export default function ItemsList() {
  const { canWrite, canDelete } = useSessionData();
  const { categories } = useCategories();
  const router = useRouter();
  const { data, loading, refetch } = useFetchData({
    fetchFn: getItems,
    arrayQueries: ["categories"],
    cacheKey: "items-list",
    searchField: "itemFullName",
  });
  const items = data?.rows ?? [];
  const {
    state,
    isEditMode,
    getData,
    getId,
    removeSearchParams,
    handleDeleteBtnClicked,
    handleEditBtnClicked,
    handleRemoveQueryparam,
  } = usePageCRUD({ data: items });

  const handleDelete = async () => {
    const id = getId(CRUDACTION.DELETE);
    const res = deleteItem(id);
    handleRequestState({ res, loadingMsg: "Deleting item...." });
    res.then(() => {
      removeSearchParams(CRUDACTION.DELETE);
      refetch();
    });
    await res;
  };

  const handleViewBatches = (id: string) => {
    router.push(PAGE_ROUTES.ITEMS.BATCHES.replace(":itemId", id));
  };

  return (
    <div className="roundd-2xl mt-2 h-[calc(100%-15rem)] bg-white pr-4 sm:h-[calc(100%-10rem)]">
      <CrudPage
        moduleName="items"
        data={items}
        isLoading={loading}
        modalAction={handleDelete}
        handleRemoveQueryparam={handleRemoveQueryparam}
        currentDataDisplayName={getData(CRUDACTION.DELETE)?.name ?? ""}
        tableColumns={itemsTableColumns}
        totalPages={data?.totalPages ?? 0}
        state={state}
        isEditMode={isEditMode}
        actions={(item) => [
          {
            label: "edit",
            icon: "lucide:edit-2",
            action: () => handleEditBtnClicked(item),
            hide: !canWrite(PermissionModules.ITEMS),
          },
          {
            label: "view batches",
            icon: "solar:box-bold-duotone",
            action: () => handleViewBatches(item.id),
          },
          {
            label: "delete",
            icon: "solar:trash-bin-trash-line-duotone",
            type: "destructive",
            action: () => handleDeleteBtnClicked(item),
            hide: !canDelete(PermissionModules.ITEMS),
          },
        ]}
      >
        <ItemsContextProvider value={{ categories }}>
          <ItemForm itemId={getId(CRUDACTION.EDIT)} isEditMode={isEditMode} />
        </ItemsContextProvider>
      </CrudPage>
    </div>
  );
}

export function ItemForm({
  isEditMode,
  itemId,
}: Readonly<{
  isEditMode?: boolean;
  itemId?: string;
}>) {
  const [isLoading, setIsLoading] = useState(false);
  const { removeSearchParams } = useImsSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;

  const form = useHookForm({
    resolver: itemFormSchema,
    mode: "onTouched",
  });

  const isStepFilled = useCallback(() => {
    const stepOneFields = [
      "name",
      "categoryId",
      "manufacturer",
      "dosageForm",
      "strength",
      "unitOfMeasurement",
    ];
    return isStepValid(stepOneFields, form.watch());
  }, [form]);

  const handleSubmit = async (data: unknown) => {
    const onItemData = data as z.infer<typeof itemFormSchema>;
    const res = isEditMode
      ? updateItem(itemId ?? "", onItemData)
      : addItem(onItemData);
    handleRequestState({ res, loadingMsg: "Adding item..." });
    res.then(() => {
      form.reset();
      removeSearchParams(UI_STATE);
    });
    await res;
  };

  const handleNext = async (e: MouseEvent) => {
    e.preventDefault();
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = (e: MouseEvent) => {
    e.preventDefault();
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  useEffect(() => {
    if (!isEditMode) return;
    const fetchItem = async () => {
      setIsLoading(true);
      const res = await getItem(itemId ?? "");
      const item = res.data;
      if (item) {
        const {
          brandName,
          categoryId,
          costPrice,
          sellingPrice,
          dosageForm,
          manufacturer,
          name,
          reorderPoint,
          strength,
          unitOfMeasurement,
        } = item;
        form.reset({
          brandName,
          categoryId,
          costPrice,
          sellingPrice,
          dosageForm,
          manufacturer,
          name,
          reorderPoint,
          strength: Number(strength),
          unitOfMeasurement,
        });
        const markup = ((sellingPrice - costPrice) / costPrice) * 100;
        form.setValue("sellingPriceMarkup", markup, {
          shouldValidate: true,
          shouldTouch: true,
        });
      }
      setIsLoading(false);
    };
    void fetchItem();
  }, []);

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <ImsForm
        className="overflow-y-auto [&>*]:px-4"
        inputSectionClassName="overflow-y-auto"
        form={form}
        handleAuthSubmit={handleSubmit}
        RenderActions={
          <>
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
            <div className="flex w-full gap-4">
              {currentStep > 1 && (
                <ImsButton
                  className="flex-1"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={form.formState.isSubmitting}
                  type="button"
                >
                  Go Back
                </ImsButton>
              )}
              {currentStep < totalSteps ? (
                <ImsButton
                  className="flex-1"
                  variant="imsPrimary"
                  onClick={handleNext}
                  disabled={form.formState.isSubmitting || !isStepFilled()}
                  type="button"
                >
                  Next
                </ImsButton>
              ) : (
                <ImsButton
                  className="flex-1"
                  isLoading={form.formState.isSubmitting}
                  isLoadingLabel={
                    isEditMode ? "Updating Item..." : "Adding Item..."
                  }
                  disabled={
                    form.formState.isSubmitting || !form.formState.isValid
                  }
                  variant="imsPrimary"
                  type="submit"
                >
                  {isEditMode ? "Update Item" : "Add Item"}
                </ImsButton>
              )}
            </div>
          </>
        }
        RenderInputs={<ItemFormInputs form={form} currentStep={currentStep} />}
      />
    </>
  );
}
