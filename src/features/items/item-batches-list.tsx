"use client";
import { UI_STATE } from "@/lib/constant";
import { handleRequestState } from "@/lib/utils";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { z } from "zod";
import {
  addBatch,
  getItemBatches,
  updateBatch,
} from "../shared/actions/items.actions";
import CrudPage from "../shared/components/crud-page";
import HookFormField, {
  inputTypeNumber,
} from "../shared/components/hook-form-filed";
import { ImsButton } from "../shared/components/ims-button";
import { ImsForm } from "../shared/components/ims-forms";
import { ImsSelect } from "../shared/components/ims-select";
import useFetchData from "../shared/hooks/use-fetch-data";
import useHookForm from "../shared/hooks/use-hook-form";
import useImsSearchParams from "../shared/hooks/use-ims-search-params";
import usePageCRUD from "../shared/hooks/use-page-crud";
import { IdData, OneItem } from "../shared/types/action.types";
import { CRUDACTION } from "../shared/types/utitls.types";
import { Input } from "../ui/input";
import { itemBatchesTableColumns } from "./items.data";
import { itemBatchFormSchema } from "./items.schemas";
import { usePageHeading } from "@/hooks/usePageHeading";
import { useEffect, useState } from "react";
import { useSessionData } from "@/hooks/useSessionData";
import { PermissionModules } from "@features/shared/types/auth-action.types";

type ItemBatchesListProps = {
  itemId?: string;
  batch?: z.infer<typeof itemBatchFormSchema>;
  batchId?: string;
  suppliers: IdData[];
  oneItem?: OneItem;
};
export default function ItemBatchesList({
  itemId,
  suppliers,
  oneItem,
}: Readonly<ItemBatchesListProps>) {
  const { canWrite } = useSessionData();
  const { updateCustomHeading } = usePageHeading();
  const { data, loading } = useFetchData({
    fetchFn: (params) => getItemBatches(itemId ?? "", params),
  });
  const itemBatches = data?.rows ?? [];

  const {
    state,
    isEditMode,
    getData,
    handleEditBtnClicked,
    handleRemoveQueryparam,
  } = usePageCRUD({ data: itemBatches });
  const batch = getData(CRUDACTION.EDIT);

  useEffect(() => {
    updateCustomHeading({
      title: `${oneItem?.name} batches`,
      description: `Manage ${oneItem?.name} batches`,
    });
  }, []);

  return (
    <ScrollArea className="mt-2 h-[calc(100%-5rem)] rounded-2xl bg-white pr-4">
      <CrudPage
        moduleName="item batches"
        data={itemBatches}
        modalAction={() => {}}
        handleRemoveQueryparam={handleRemoveQueryparam}
        currentDataDisplayName={getData(CRUDACTION.DELETE)?.batchNumber ?? ""}
        tableColumns={itemBatchesTableColumns}
        totalPages={data?.totalPages ?? 0}
        state={state}
        isLoading={loading}
        isEditMode={isEditMode}
        actions={(item) => [
          {
            label: "edit",
            hide: !canWrite(PermissionModules.ITEMS),
            icon: "lucide:edit-2",
            action: () => handleEditBtnClicked(item),
          },
        ]}
      >
        <ItemBatchesForm
          batch={
            batch
              ? {
                  batchNumber: batch?.batchNumber ?? "",
                  quantity: batch?.quantity ?? 0,
                  supplierId: batch?.supplier.id ?? "",
                  validity: new Date(batch?.validity ?? "").toLocaleDateString(
                    "en-CA",
                    { formatMatcher: "basic" },
                  ),
                }
              : undefined
          }
          batchId={batch?.id}
          suppliers={suppliers}
          itemId={itemId}
        />
      </CrudPage>
    </ScrollArea>
  );
}

function ItemBatchesForm({
  suppliers,
  batch,
  batchId,
  itemId,
}: Readonly<ItemBatchesListProps>) {
  const { removeSearchParams } = useImsSearchParams();
  const form = useHookForm({
    resolver: itemBatchFormSchema,
    defaultValues: batch,
    mode: "onTouched",
  });
  const supplierOptions = suppliers.map((supplier) => ({
    value: supplier.id,
    label: supplier.name,
  }));

  const [useBoxes, setUseBoxes] = useState(false);
  const [boxes, setBoxes] = useState<number>(0);
  const [itemsPerBox, setItemsPerBox] = useState<number>(0);

  useEffect(() => {
    if (useBoxes) {
      const calculated = Number(boxes) * Number(itemsPerBox);
      form.setValue("quantity", calculated, { shouldValidate: true });
    }
  }, [boxes, itemsPerBox, useBoxes]);

  const handleSubmit = async (data: unknown) => {
    const oneBatchData = data as z.infer<typeof itemBatchFormSchema>;
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
            label="Validity"
            renderInput={({ field }) => (
              <Input
                {...field}
                className="focus-visible:ring-ims-blue-300 flex h-11 flex-col justify-between bg-white pt-2.5"
                placeholder="eg: 2023-12-31"
                type="date"
              />
            )}
          />
          <HookFormField
            formControl={form.control}
            name="supplierId"
            label="Supplier"
            renderInput={({ field }) => (
              <ImsSelect
                options={supplierOptions}
                moduleName="supplier"
                {...field}
                className="focus-visible:ring-ims-blue-300 !h-11 bg-white"
              />
            )}
          />
        </>
      }
    />
  );
}
