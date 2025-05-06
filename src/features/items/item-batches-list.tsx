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
import { IdData } from "../shared/types/action.types";
import { CRUDACTION } from "../shared/types/utitls.types";
import { Input } from "../ui/input";
import { itemBatchesTableColumns } from "./items.data";
import { itemBatchFormSchema } from "./items.schemas";

type ItemBatchesListProps = {
  itemId?: string;
  batch?: z.infer<typeof itemBatchFormSchema>;
  batchId?: string;
  suppliers: IdData[];
};
export default function ItemBatchesList({
  itemId,
  suppliers,
}: Readonly<ItemBatchesListProps>) {
  const { data } = useFetchData({
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
        isEditMode={isEditMode}
        actions={(item) => [
          {
            label: "edit",
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
    defaultValues: batch ?? {
      batchNumber: "",
      quantity: undefined,
      supplierId: "",
      validity: "",
    },
  });
  const supplierOptions = suppliers.map((supplier) => ({
    value: supplier.id,
    label: supplier.name,
  }));

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
