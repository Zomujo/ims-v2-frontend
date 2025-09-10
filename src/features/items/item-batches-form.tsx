"use client";
import { UI_STATE } from "@/lib/constant";
import { handleRequestState } from "@/lib/utils";
import { z } from "zod";
import {
  addBatch,
  getBatch,
  updateBatch,
} from "../shared/actions/items.actions";
import HookFormField, {
  inputTypeNumber,
} from "../shared/components/hook-form-filed";
import { ImsButton } from "../shared/components/ims-button";
import { ImsForm } from "../shared/components/ims-forms";
import { ImsSelect } from "../shared/components/ims-select";
import useFetchData from "../shared/hooks/use-fetch-data";
import useHookForm from "../shared/hooks/use-hook-form";
import useImsSearchParams from "../shared/hooks/use-ims-search-params";
import { BatchResponseDto } from "../shared/types/action.types";
import { Input } from "../ui/input";
import { amountTypes, itemBatchFormSchema } from "./items.schemas";
import { useEffect, useMemo, useState } from "react";
import LoadingOverlay from "@features/ui/loadingOverlay";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@features/ui/tooltip";
import { CacheKey } from "@/lib/cache/cache-data";
import { getSuppliersNoPaginate } from "@features/shared/actions/supplier.actions";
import { useOnlineStatus } from "@features/shared/hooks/useOnlineStatus";
import { API_ENDPOINTS } from "@/lib/api-constants";

type ItemBatchesFormProps = {
  batchId?: string;
  itemId?: string;
};
export function ItemBatchesForm({ batchId, itemId }: ItemBatchesFormProps) {
  const { data: suppliers, loading } = useFetchData({
    fetchFn: getSuppliersNoPaginate,
    cacheKey: CacheKey.SuppliersNoPaginate,
  });
  const { removeSearchParams } = useImsSearchParams();
  const form = useHookForm({
    resolver: itemBatchFormSchema,
    mode: "onTouched",
  });
  const supplierOptions = useMemo(
    () =>
      suppliers?.map((supplier) => ({
        value: supplier.id,
        label: supplier.name,
      })),
    [suppliers],
  );

  const [useBoxes, setUseBoxes] = useState(false);
  const [insuranceMarkup, setInsuranceMarkup] = useState(false);
  const [boxes, setBoxes] = useState<number>();
  const [itemsPerBox, setItemsPerBox] = useState<number>();
  const [isLoadingBatch, setIsLoadingBatch] = useState(false);
  const [batch, setBatch] = useState<BatchResponseDto>();
  const { handleRequests, isOnline } = useOnlineStatus();

  const setMarkupData = (checked: boolean) => {
    if (checked) {
      setInsuranceMarkup(true);
      form.setValue(
        "markup",
        {
          type: "NHIS",
          amountType: amountTypes[0],
          amount: 100,
        },
        { shouldValidate: true },
      );
    } else {
      setInsuranceMarkup(false);
      form.setValue("markup", undefined, { shouldValidate: true });
    }
  };

  useEffect(() => {
    const getEditBatch = async () => {
      if (batchId) {
        setIsLoadingBatch(true);
        const response = await getBatch(batchId);
        const batchData = response.data;
        if (batchData) {
          setBatch(batchData);
          form.reset({
            ...batchData,
            supplierId: batchData.supplier.id,
            validity: new Date(batchData.validity).toLocaleDateString("en-CA", {
              formatMatcher: "basic",
            }),
          });
          setInsuranceMarkup(!!batchData.markup);
        }
        setIsLoadingBatch(false);
      }
    };
    void getEditBatch();
  }, [batchId, form]);

  useEffect(() => {
    if (useBoxes) {
      if (boxes && itemsPerBox) {
        const calculated = Number(boxes) * Number(itemsPerBox);
        form.setValue("quantity", calculated, { shouldValidate: true });
      } else {
        form.setValue("quantity", undefined, { shouldValidate: true });
      }
    } else {
      if (batch) {
        form.setValue("quantity", batch.quantity, { shouldValidate: true });
      }
    }
  }, [boxes, itemsPerBox, useBoxes, form, batch]);

  const handleSubmit = async (data: unknown) => {
    const oneBatchData = data as z.infer<typeof itemBatchFormSchema>;
    if (!isOnline) {
      handleRequests(
        batchId
          ? API_ENDPOINTS.ITEM_EDIT_BATCH.replace(":id", batchId)
          : API_ENDPOINTS.ITEMS_ADD_BATCH,
        batchId
          ? oneBatchData
          : {
              ...oneBatchData,
              itemId: itemId ?? "",
            },
        {
          method: batchId ? "PATCH" : "POST",
          removeSearchParams: removeSearchParams,
          form,
        },
      );
      return;
    }
    const res = batchId
      ? updateBatch(batchId, oneBatchData)
      : addBatch({ ...oneBatchData, itemId: itemId ?? "" });
    res.then(() => {
      form.reset();
      removeSearchParams(UI_STATE);
    });
    handleRequestState({
      res,
      loadingMsg: batchId ? "Updating batch...." : "Adding new batch...",
    });
    await res;
  };
  return (
    <>
      {isLoadingBatch && <LoadingOverlay />}
      <ImsForm
        className="overflow-y-auto [&>*]:px-4"
        inputSectionClassName="overflow-y-auto"
        form={form}
        handleAuthSubmit={handleSubmit}
        RenderActions={
          <ImsButton
            isLoading={form.formState.isSubmitting}
            isLoadingLabel={batch ? "Updating batch..." : "Adding new batch..."}
            variant="imsPrimary"
            disabled={form.formState.isSubmitting}
            type="submit"
          >
            {batch ? "Update Batch" : "Add Batch"}
          </ImsButton>
        }
        RenderInputs={
          <>
            <HookFormField
              formControl={form.control}
              name="batchNumber"
              label="Batch Number"
              renderInput={({ field }) => {
                return (
                  <Input
                    {...field}
                    className="focus-visible:ring-ims-blue-300 bg-white"
                    type="text"
                    placeholder="eg: BATCH123"
                  />
                );
              }}
            />
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={useBoxes}
                  onChange={(e) => setUseBoxes(e.target.checked)}
                />
                Use boxes & items per box
              </label>

              {useBoxes ? (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="mb-2 text-sm font-medium">Boxes</p>
                    <Input
                      type="number"
                      value={boxes}
                      onChange={(e) => setBoxes(Number(e.target.value))}
                      placeholder="e.g. 5"
                      className="bg-white"
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium">Items per Box</p>
                    <Input
                      type="number"
                      value={itemsPerBox}
                      onChange={(e) => setItemsPerBox(Number(e.target.value))}
                      placeholder="e.g. 10"
                      className="bg-white"
                    />
                  </div>
                  <div className="col-span-2 text-sm text-gray-500">
                    Quantity (<strong>{form.watch("quantity")}</strong>)
                  </div>
                  <span className="text-sm text-red-500">
                    {String(form.formState.errors["quantity"]?.message ?? "")}
                  </span>
                </div>
              ) : (
                <HookFormField
                  formControl={form.control}
                  name="quantity"
                  label="Quantity"
                  renderInput={({ field }) => (
                    <Input
                      {...inputTypeNumber(field)}
                      className="focus-visible:ring-ims-blue-300 bg-white"
                      type="number"
                      placeholder="eg: 100"
                    />
                  )}
                />
              )}
            </div>
            <HookFormField
              formControl={form.control}
              name="validity"
              label="Expiry Date"
              renderInput={({ field }) => (
                <Input
                  {...field}
                  className="focus-visible:ring-ims-blue-300 flex h-11 flex-col justify-between bg-white pt-2.5"
                  placeholder="eg: 2023-12-31"
                  type="month"
                />
              )}
            />
            <HookFormField
              formControl={form.control}
              name="supplierId"
              label="Supplier"
              renderInput={({ field }) => (
                <ImsSelect
                  options={supplierOptions ?? []}
                  showNone={false}
                  loading={loading}
                  moduleName="supplier"
                  {...field}
                  className="focus-visible:ring-ims-blue-300 !h-11 bg-white"
                />
              )}
            />
            <div className="flex gap-x-4">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={insuranceMarkup}
                  onChange={({ target }) => setMarkupData(target.checked)}
                  disabled={!!batchId && !!batch?.markup}
                />
                Insurance Covered
              </label>
              {!!batchId && !!batch?.markup && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      You cannot uncheck an already existing markup. Remove
                      insurance markup by using the functionality on the
                      dropdown
                    </p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
            {insuranceMarkup && (
              <HookFormField
                formControl={form.control}
                name="markup.type"
                label="Insurance Type"
                renderInput={({ field }) => (
                  <Input
                    {...field}
                    value={field.value ?? "NHIS"}
                    className="focus-visible:ring-ims-blue-300 bg-white"
                    placeholder="eg: NHIS"
                    disabled={true}
                  />
                )}
              />
            )}
          </>
        }
      />
    </>
  );
}
