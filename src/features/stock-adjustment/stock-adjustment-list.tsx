"use client";
import { UI_STATE } from "@/lib/constant";
import { handleRequestState } from "@/lib/utils";
import { useEffect } from "react";
import { z } from "zod";
import {
  createStockAdjustment,
  deleteStockAdjustment,
  getStockAdjustments,
  updateStockAdjustment,
} from "../shared/actions/stock-adjustments.actions";
import CrudPage from "../shared/components/crud-page";
import { ImsButton } from "../shared/components/ims-button";
import { ImsForm } from "../shared/components/ims-forms";
import useFetchData from "../shared/hooks/use-fetch-data";
import useHookForm from "../shared/hooks/use-hook-form";
import useImsSearchParams from "../shared/hooks/use-ims-search-params";
import usePageCRUD from "../shared/hooks/use-page-crud";
import { IdData, OneStockAdjustment } from "../shared/types/action.types";
import { CRUDACTION } from "../shared/types/utitls.types";
import { ScrollArea } from "../ui/scroll-area";
import { StockAdjustmentFormInputs } from "./stock-adjustment-component-client";
import { StockAdjustmentProvider } from "./stock-adjustment.context";
import { stockAdjustmentTableColumns } from "./stock-adjustment.data";
import { stockAdjustmentSchema } from "./stock-adjustment.schemas";
import { useSessionData } from "@/hooks/useSessionData";
import { PermissionModules } from "@features/shared/types/auth-action.types";
import { CacheKey } from "@/lib/cache/cache-data";
import { useOnlineStatus } from "@features/shared/hooks/useOnlineStatus";
import { API_ENDPOINTS } from "@/lib/api-constants";

type StockAdjustmentListProps = {
  items: IdData[];
};
export default function StockAdjustmentList({
  items,
}: Readonly<StockAdjustmentListProps>) {
  const { canWrite, canDelete } = useSessionData();
  const { handleRequests, isOnline } = useOnlineStatus();
  const { data, loading } = useFetchData({
    fetchFn: getStockAdjustments,
    cacheKey: CacheKey.StockAdjustmentList,
    searchField: "reason",
  });
  const stockAdjustments = data?.rows ?? [];
  const {
    state,
    isEditMode,
    getData,
    getId,
    removeSearchParams,
    handleDeleteBtnClicked,
    handleEditBtnClicked,
    handleRemoveQueryparam,
  } = usePageCRUD({ data: stockAdjustments });

  const handleDelete = async () => {
    const id = getId(CRUDACTION.DELETE);
    if (!isOnline) {
      handleRequests(
        API_ENDPOINTS.STOCK_ADJUSTMENT.replace(":id", id),
        undefined,
        "DELETE",
      );
      return;
    }
    const res = deleteStockAdjustment(id);
    handleRequestState({ res, loadingMsg: "Deleting stock adjustment...." });
    res.then(() => {
      removeSearchParams(CRUDACTION.DELETE);
    });
    await res;
  };

  return (
    <ScrollArea className="mt-2 h-[calc(100%-5rem)] rounded-2xl bg-white pr-4">
      <CrudPage
        isLoading={loading}
        moduleName="Stock Adjustments"
        data={stockAdjustments}
        modalAction={handleDelete}
        handleRemoveQueryparam={handleRemoveQueryparam}
        currentDataDisplayName={getData(CRUDACTION.DELETE)?.item.name ?? ""}
        tableColumns={stockAdjustmentTableColumns}
        totalPages={data?.totalPages ?? 0}
        state={state}
        isEditMode={isEditMode}
        actions={(item) => [
          {
            label: "edit",
            icon: "lucide:edit-2",
            action: () => handleEditBtnClicked(item),
            hide: !canWrite(PermissionModules.STOCK_ADJUSTMENT),
          },
          {
            label: "delete",
            icon: "solar:trash-bin-trash-line-duotone",
            type: "destructive",
            action: () => handleDeleteBtnClicked(item),
            hide: !canDelete(PermissionModules.STOCK_ADJUSTMENT),
          },
        ]}
      >
        <StockAdjustmentProvider value={{ items }}>
          <StockAdjustmentForm stockAdjustment={getData("edit")} />
        </StockAdjustmentProvider>
      </CrudPage>
    </ScrollArea>
  );
}

type StockAdjustmentFormProps = {
  stockAdjustment?: OneStockAdjustment;
};

export function StockAdjustmentForm({
  stockAdjustment,
}: Readonly<StockAdjustmentFormProps>) {
  const { removeSearchParams } = useImsSearchParams();
  const form = useHookForm({
    mode: "onTouched",
    resolver: stockAdjustmentSchema,
  });
  const { handleRequests, isOnline } = useOnlineStatus();

  const handleSubmit = async (data: unknown) => {
    const id = stockAdjustment?.id;
    const oneStockAdjustment = data as z.infer<typeof stockAdjustmentSchema>;
    if (!isOnline) {
      handleRequests(
        id
          ? API_ENDPOINTS.STOCK_ADJUSTMENTS.replace(":id", id)
          : API_ENDPOINTS.STOCK_ADJUSTMENTS,
        data,
        id ? "PATCH" : "POST",
      );
      return;
    }
    const res = id
      ? updateStockAdjustment(id, oneStockAdjustment)
      : createStockAdjustment(oneStockAdjustment);
    handleRequestState({
      res,
      loadingMsg: "Submitting stock adjustment....",
    });
    res.then(() => {
      form.reset();
      removeSearchParams(UI_STATE);
    });
    await res;
  };

  useEffect(() => {
    if (!stockAdjustment) return;
    form.reset({
      itemId: stockAdjustment.item.id,
      quantity: stockAdjustment.quantity,
      reason: stockAdjustment.reason,
      notes: stockAdjustment.notes,
      batchId: stockAdjustment.batch.id,
      type: stockAdjustment.type,
    });
  }, []);

  return (
    <ImsForm
      className="overflow-y-auto [&>*]:px-4"
      inputSectionClassName="overflow-y-auto"
      form={form}
      handleAuthSubmit={handleSubmit}
      RenderActions={
        <ImsButton
          isLoading={form.formState.isSubmitting}
          isLoadingLabel="Submitting..."
          disabled={!form.formState.isValid || form.formState.isSubmitting}
          variant="imsPrimary"
          type="submit"
        >
          Submit
        </ImsButton>
      }
      RenderInputs={<StockAdjustmentFormInputs control={form.control} />}
    />
  );
}
