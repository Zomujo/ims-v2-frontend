"use client";
import { handleRequestState, isStepValid } from "@/lib/utils";
import { useCallback, useState } from "react";
import { z } from "zod";
import { deleteSaleAction } from "../shared/actions/sales.action";
import {
  addSupplier,
  getSupplier,
  getSuppliers,
  updateSupplier,
} from "../shared/actions/supplier.actions";
import CrudPage from "../shared/components/crud-page";
import { ImsButton, ProgressBar } from "../shared/components/ims-button";
import { ImsForm } from "../shared/components/ims-forms";
import useFetchData from "../shared/hooks/use-fetch-data";
import useHookForm from "../shared/hooks/use-hook-form";
import usePageCRUD from "../shared/hooks/use-page-crud";
import { CRUDACTION } from "../shared/types/utitls.types";
import { ScrollArea } from "../ui/scroll-area";
import { SupplierFormInputs } from "./suppliers-component-client";
import { supplierDefaultValues, suppliersTableColumns } from "./suppliers.data";
import { supplierSchema } from "./suppliers.schemas";
import useImsSearchParams from "../shared/hooks/use-ims-search-params";
import { UI_STATE } from "@/lib/constant";
import LoadingOverlay from "@features/ui/loadingOverlay";

export default function SuppliersList() {
  const { data, loading } = useFetchData({ fetchFn: getSuppliers });
  const suppliers = data?.rows ?? [];

  const {
    state,
    isEditMode,
    getData,
    getId,
    removeSearchParams,
    handleDeleteBtnClicked,
    handleEditBtnClicked,
    handleRemoveQueryparam,
  } = usePageCRUD({ data: suppliers });

  const handleDelete = async () => {
    const id = getId(CRUDACTION.DELETE);
    const res = deleteSaleAction(id);
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
        data={suppliers}
        isLoading={loading}
        modalAction={handleDelete}
        handleRemoveQueryparam={handleRemoveQueryparam}
        currentDataDisplayName={getData(CRUDACTION.DELETE)?.name ?? ""}
        tableColumns={suppliersTableColumns}
        totalPages={data?.totalPages ?? 0}
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
            type: "destructive",
            action: () => handleDeleteBtnClicked(item),
          },
        ]}
      >
        <SupplierForm supplierId={isEditMode ? getId(CRUDACTION.EDIT) : ""} />
      </CrudPage>
    </ScrollArea>
  );
}

type SupplierFormProps = {
  supplierId?: string;
};

function SupplierForm({ supplierId }: Readonly<SupplierFormProps>) {
  const [currentStep, setCurrentStep] = useState(1);
  const { removeSearchParams } = useImsSearchParams();
  const isEditMode = !!supplierId;
  const [isLoading, setIsLoading] = useState(false);

  const form = useHookForm({
    resolver: supplierSchema,
    defaultValues: supplierDefaultValues,
  });

  const { loading } = useFetchData({
    fetchFn: async () => getSupplier(supplierId ?? ""),
    exercuteOnMount: !!supplierId,
    deps: [supplierId],
    onSuccess: (data) => {
      const supplierData = data.data ?? {};
      form.reset({ ...supplierData });
    },
  });

  const totalSteps = 3;

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepFilled = useCallback(() => {
    const stepFieldMap: Record<number, string[]> = {
      1: [
        "name",
        "brandTradeName",
        "supplierType",
        "minimumOrderQuantity",
        "leadTime",
        "deliveryMethod",
      ],
      2: [
        "primaryContactName",
        "jobTitle",
        "department",
        "phoneNumber",
        "email",
        "physicalAddress",
        "mailingAddress",
        "emergencyContactName",
        "emergencyContactTitle",
        "emergencyContactNumber",
      ],
    };
    const fields = stepFieldMap[currentStep];
    return fields ? isStepValid(fields, form.watch()) : true;
  }, [currentStep, form]);

  const handleSubmit = async (data: unknown) => {
    setIsLoading(true);
    const oneSupplier = data as z.infer<typeof supplierSchema>;
    const res = isEditMode
      ? updateSupplier(supplierId, oneSupplier)
      : addSupplier(oneSupplier);

    handleRequestState({
      res,
      loadingMsg: supplierId ? "Updating supplier...." : "Adding supplier....",
      successMsg: supplierId
        ? "Supplier updated successfully"
        : "Supplier added successfully",
    });
    res.then(() => {
      form.reset();
      removeSearchParams(UI_STATE);
      setIsLoading(false);
    });
  };

  if (isEditMode && loading) {
    return <LoadingOverlay />;
  }
  return (
    <ImsForm
      form={form}
      handleAuthSubmit={handleSubmit}
      RenderInputs={
        <SupplierFormInputs
          paymentType={form.watch()["paymentType"]}
          control={form.control}
          currentStep={currentStep}
        />
      }
      RenderActions={
        <>
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          <div className="flex w-full gap-4">
            {currentStep > 1 && (
              <ImsButton
                className="flex-1"
                variant="outline"
                onClick={handleBack}
                type="button" // Prevent form submission
              >
                Go back
              </ImsButton>
            )}
            {currentStep < totalSteps && (
              <ImsButton
                className="flex-1"
                type="button"
                variant="imsPrimary"
                onClick={handleNext}
                disabled={!isStepFilled()}
              >
                Next
              </ImsButton>
            )}
            {currentStep === totalSteps && (
              <ImsButton
                className="flex-1"
                type="submit"
                variant="imsPrimary"
                disabled={isLoading}
                isLoading={isLoading}
                isLoadingLabel={
                  supplierId ? "Updating Supplier..." : "Adding Supplier..."
                }
              >
                {supplierId ? "Update Supplier" : "Add Supplier"}
              </ImsButton>
            )}
          </div>
        </>
      }
      className="overflow-y-auto [&>*]:px-4"
      inputSectionClassName="overflow-y-auto"
    />
  );
}
