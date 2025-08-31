"use client";
import { UI_STATE } from "@/lib/constant";
import { handleRequestState } from "@/lib/utils";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import {
  getItemBatches,
  removalMarkupFromBatch,
} from "../shared/actions/items.actions";
import CrudPage from "../shared/components/crud-page";
import useFetchData from "../shared/hooks/use-fetch-data";
import usePageCRUD from "../shared/hooks/use-page-crud";
import { CRUDACTION } from "../shared/types/utitls.types";
import { itemBatchesTableColumns } from "./items.data";
import { usePageHeading } from "@/hooks/usePageHeading";
import { useEffect } from "react";
import { useSessionData } from "@/hooks/useSessionData";
import { PermissionModules } from "@features/shared/types/auth-action.types";
import { useId } from "@/lib/providers/id-context";
import { CacheKey } from "@/lib/cache/cache-data";
import { useOnlineStatus } from "@features/shared/hooks/useOnlineStatus";
import { API_ENDPOINTS } from "@/lib/api-constants";
import dynamic from "next/dynamic";
import LoadingOverlay from "@features/ui/loadingOverlay";

const ItemBatchesForm = dynamic(
  () =>
    import("./item-batches-form").then((mod) => ({
      default: mod.ItemBatchesForm,
    })),
  {
    loading: () => <LoadingOverlay />,
  },
);

export default function ItemBatchesList() {
  const { id: itemId, title } = useId();
  const { canWrite } = useSessionData();
  const { handleRequests, isOnline } = useOnlineStatus();
  const { updateCustomHeading } = usePageHeading();
  const { data, loading } = useFetchData({
    fetchFn: (params) => getItemBatches(itemId ?? "", params),
    cacheKey: CacheKey.ItemBatchesList,
    cacheKeyId: itemId,
  });
  const itemBatches = data?.rows ?? [];

  const {
    state,
    isEditMode,
    getData,
    handleEditBtnClicked,
    handleRemoveQueryparam,
    getId,
    handleDeleteBtnClicked,
    removeSearchParams,
  } = usePageCRUD({ data: itemBatches });
  const batch = getData(CRUDACTION.EDIT);

  useEffect(() => {
    updateCustomHeading({
      title: `${title} batches`,
      description: `Manage ${title} batches`,
    });
  }, [title]);

  const handleMarkupRemoval = async () => {
    const id = getId(CRUDACTION.DELETE);
    if (!isOnline) {
      handleRequests(
        API_ENDPOINTS.BATCH_MARKUP.replace(":batchId", id),
        undefined,
        {
          method: "DELETE",
          removeSearchParams,
        },
      );
      return;
    }
    const res = removalMarkupFromBatch(id);
    handleRequestState({
      res,
      loadingMsg: "Removing markup...",
      successMsg: "Markup removed successfully",
    });
    res.then(() => {
      removeSearchParams(UI_STATE);
    });
    await res;
  };

  return (
    <ScrollArea className="mt-2 h-[calc(100%-5rem)] rounded-2xl bg-white pr-4">
      <CrudPage
        moduleName="item batches"
        data={itemBatches}
        modalAction={() => {
          void handleMarkupRemoval();
        }}
        handleRemoveQueryparam={handleRemoveQueryparam}
        modalActionLabel={"Remove insurance markup for batch"}
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
          {
            label: "remove markup",
            hide: !canWrite(PermissionModules.ITEMS) || !item.markup,
            icon: "solar:trash-bin-trash-line-duotone",
            action: () => handleDeleteBtnClicked(item),
          },
        ]}
      >
        <ItemBatchesForm batchId={batch?.id} itemId={itemId} />
      </CrudPage>
    </ScrollArea>
  );
}
