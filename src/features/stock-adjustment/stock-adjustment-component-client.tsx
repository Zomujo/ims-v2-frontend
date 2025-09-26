"use client";
import { use } from "react";
import { Control, useWatch } from "react-hook-form";
import { getBatchesNoPaginate } from "../shared/actions/items.actions";
import HookFormField, {
  inputTypeNumber,
} from "../shared/components/hook-form-filed";
import { ImsSelect } from "../shared/components/ims-select";
import useFetchData from "../shared/hooks/use-fetch-data";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { StockAdjustmentContext } from "./stock-adjustment.context";
import LoadingOverlay from "@features/ui/loadingOverlay";
import { stockAdjustmentReasons } from "@/lib/constant";
import { CacheKey } from "@/lib/cache/cache-data";
import {
  BatchesNoPaginate,
  Pagination,
} from "@features/shared/types/action.types";

type StockAdjustmentFormInputsProps = {
  control: Control;
};

const adjustmentTypeOptions = [
  { value: "REDUCTION", label: "Reduction" },
  { value: "INCREMENT", label: "Increment" },
];

export function StockAdjustmentFormInputs({
  control,
}: Readonly<StockAdjustmentFormInputsProps>) {
  const { items } = use(StockAdjustmentContext);
  const selectedItemId = useWatch()["itemId"];
  const { data: batches, loading } = useFetchData({
    fetchFn: async () => getBatchesNoPaginate(selectedItemId),
    cacheKeyId: selectedItemId,
    cacheKey: CacheKey.ItemBatchesList,
    deps: [selectedItemId],
  });
  const itemOptions = items.map((item) => ({
    value: item.id,
    label: item.itemFullName,
  }));
  const batchOptions = (
    Array.isArray(batches)
      ? batches
      : batches && "rows" in batches
        ? (batches as Pagination<BatchesNoPaginate>).rows
        : []
  ).map((batch: Pick<BatchesNoPaginate, "id" | "batchNumber">) => ({
    value: batch.id,
    label: batch.batchNumber,
  }));

  if (loading) {
    return <LoadingOverlay />;
  }

  return (
    <>
      <HookFormField
        formControl={control}
        name="itemId"
        label="Item"
        renderInput={({ field }) => (
          <ImsSelect
            options={itemOptions}
            moduleName="item"
            showNone={false}
            {...field}
            defaultValue={field.value}
            className="focus-visible:ring-ims-blue-300 !h-11 bg-white"
          />
        )}
      />
      <HookFormField
        formControl={control}
        name="batchId"
        label="Batch"
        renderInput={({ field }) => (
          <ImsSelect
            {...field}
            options={batchOptions}
            defaultValue={field.value}
            showNone={false}
            moduleName="batch"
            noResultsText={
              control._getWatch("itemId")
                ? "No batches found for this item"
                : "Select an item first"
            }
            className="focus-visible:ring-ims-blue-300 !h-11 bg-white"
          />
        )}
      />
      <HookFormField
        formControl={control}
        name="quantity"
        label="Quantity"
        renderInput={({ field }) => (
          <Input
            {...field}
            {...inputTypeNumber(field)}
            type="number"
            className="focus-visible:ring-ims-blue-300 bg-white"
          />
        )}
      />
      <HookFormField
        formControl={control}
        name="type"
        label="Adjustment Type"
        renderInput={({ field }) => (
          <ImsSelect
            options={adjustmentTypeOptions}
            moduleName="adjustment type"
            showNone={false}
            {...field}
            className="focus-visible:ring-ims-blue-300 !h-11 bg-white"
          />
        )}
      />
      <HookFormField
        formControl={control}
        name="reason"
        label="Reason for Adjustment"
        renderInput={({ field }) => (
          <ImsSelect
            options={stockAdjustmentReasons}
            moduleName="reason for adjustment"
            {...field}
            className="focus-visible:ring-ims-blue-300 !h-11 bg-white"
          />
        )}
      />
      <HookFormField
        formControl={control}
        name="notes"
        label="Notes"
        renderInput={({ field }) => (
          <Textarea
            {...field}
            placeholder="Enter notes..."
            className="focus-visible:ring-ims-blue-300 bg-white"
          />
        )}
      />
    </>
  );
}
