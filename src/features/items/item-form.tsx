"use client";

import { MouseEvent, useCallback, useEffect, useState } from "react";
import { z } from "zod";
import {
  addItem,
  getItem,
  updateItem,
} from "@features/shared/actions/items.actions";
import { ImsButton, ProgressBar } from "@features/shared/components/ims-button";
import { ImsForm } from "@features/shared/components/ims-forms";
import useHookForm from "@features/shared/hooks/use-hook-form";
import useImsSearchParams from "@features/shared/hooks/use-ims-search-params";
import { useOnlineStatus } from "@features/shared/hooks/useOnlineStatus";
import LoadingOverlay from "@features/ui/loadingOverlay";
import { API_ENDPOINTS } from "@/lib/api-constants";
import { UI_STATE } from "@/lib/constant";
import { handleRequestState, isStepValid } from "@/lib/utils";
import { ItemFormInputs } from "./items-component-client";
import { itemFormSchema } from "./items.schemas";

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
  const { handleRequests, isOnline } = useOnlineStatus();
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
    if (!isOnline) {
      handleRequests(
        isEditMode && itemId
          ? API_ENDPOINTS.ITEM.replace(":id", itemId)
          : API_ENDPOINTS.ITEMS,
        data,
        {
          method: isEditMode ? "PATCH" : "POST",
          removeSearchParams: removeSearchParams,
          form,
        },
      );
      return;
    }
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
  }, [isEditMode, itemId, form]);

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
