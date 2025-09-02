"use client";

import { PAGE_ROUTES } from "@/lib/constant";
import { handleRequestState } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { deleteItem, getItems } from "../shared/actions/items.actions";
import CrudPage from "../shared/components/crud-page";
import useFetchData from "../shared/hooks/use-fetch-data";
import usePageCRUD from "../shared/hooks/use-page-crud";
import { CRUDACTION } from "../shared/types/utitls.types";
import { ItemsContextProvider } from "./items.context";
import { itemsTableColumns } from "./items.data";
import { useCategories } from "@/hooks/useCategories";
import { useSessionData } from "@/hooks/useSessionData";
import { PermissionModules } from "@features/shared/types/auth-action.types";
import { useOnlineStatus } from "@features/shared/hooks/useOnlineStatus";
import { API_ENDPOINTS } from "@/lib/api-constants";
import { useId } from "@/lib/providers/id-context";
import dynamic from "next/dynamic";
import LoadingOverlay from "@features/ui/loadingOverlay";
import { useEffect, useState } from "react";

const ItemForm = dynamic(
  () => import("./item-form").then((mod) => mod.ItemForm),
  {
    loading: () => <LoadingOverlay />,
  },
);

export default function ItemsList() {
  const [isPreparing, setIsPreparing] = useState(true);
  const { canWrite, canDelete } = useSessionData();
  const { handleRequests, isOnline } = useOnlineStatus();
  const { setId } = useId();
  const { categories } = useCategories();
  const router = useRouter();
  const searchParams = useSearchParams();
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
    if (!isOnline) {
      handleRequests(API_ENDPOINTS.ITEM.replace(":id", id), undefined, {
        method: "DELETE",
        removeSearchParams,
      });
      return;
    }
    const res = deleteItem(id);
    handleRequestState({ res, loadingMsg: "Deleting item...." });
    res.then(() => {
      removeSearchParams(CRUDACTION.DELETE);
      refetch();
    });
    await res;
  };

  const handleViewBatches = (id: string, title: string) => {
    setId(id, title);
    router.push(PAGE_ROUTES.ITEMS.BATCHES);
  };

  useEffect(() => {
    const itemId = searchParams.get("itemId");
    const itemName = searchParams.get("itemName");
    if (itemId && itemName) {
      handleViewBatches(itemId, itemName);
    }
    setIsPreparing(false);
  }, [searchParams]);

  return (
    <div className="round-2xl mt-2 h-[calc(100%-15rem)] bg-white pr-4 sm:h-[calc(100%-10rem)]">
      {isPreparing && <LoadingOverlay />}
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
            action: () => handleViewBatches(item.id, item.name),
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
