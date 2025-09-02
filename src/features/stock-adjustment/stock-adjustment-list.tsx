"use client";

import { handleRequestState } from "@/lib/utils";
import { lazy, Suspense } from "react";
import {
  deleteStockAdjustment,
  getStockAdjustments,
} from "../shared/actions/stock-adjustments.actions";
import CrudPage from "../shared/components/crud-page";
import useFetchData from "../shared/hooks/use-fetch-data";
import usePageCRUD from "../shared/hooks/use-page-crud";
import { CRUDACTION } from "../shared/types/utitls.types";
import { ScrollArea } from "../ui/scroll-area";
import { StockAdjustmentProvider } from "./stock-adjustment.context";
import { stockAdjustmentTableColumns } from "./stock-adjustment.data";
import { useSessionData } from "@/hooks/useSessionData";
import { PermissionModules } from "@features/shared/types/auth-action.types";
import { CacheKey } from "@/lib/cache/cache-data";
import { useOnlineStatus } from "@features/shared/hooks/useOnlineStatus";
import { API_ENDPOINTS } from "@/lib/api-constants";
import { useItems } from "@/hooks/useItems";

const StockAdjustmentForm = lazy(() => import("./stock-adjustment-form"));

export default function StockAdjustmentList() {
  const { canWrite, canDelete } = useSessionData();
  const { handleRequests, isOnline } = useOnlineStatus();
  const { items } = useItems();
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
        { method: "DELETE" },
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
          <Suspense fallback={<div>Loading form...</div>}>
            <StockAdjustmentForm stockAdjustment={getData("edit")} />
          </Suspense>
        </StockAdjustmentProvider>
      </CrudPage>
    </ScrollArea>
  );
}
