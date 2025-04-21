"use client";

import { handleRequestState } from "@/lib/utils";
import { getItems } from "../shared/actions/items.actions";
import { deleteSaleAction } from "../shared/actions/sales.action";
import CrudPage from "../shared/components/crud-page";
import useFetchData from "../shared/hooks/use-fetch-data";
import usePageCRUD from "../shared/hooks/use-page-crud";
import { CRUDACTION } from "../shared/types/utitls.types";
import { ScrollArea } from "../ui/scroll-area";
import { itemsTableColumns } from "./items.data";
import { useRouter } from "next/navigation";
import { PAGE_ROUTES } from "@/lib/constant";

export default function ItemsList() {
  const router = useRouter();
  const { data } = useFetchData({ fetchFn: getItems });
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
    const res = deleteSaleAction(id);
    handleRequestState({ res, loadingMsg: "Deleting sale...." });
    res.then(() => {
      removeSearchParams(CRUDACTION.DELETE);
    });
    await res;
  };

  const handleViewBatches = (id: string) => {
    router.push(PAGE_ROUTES.ITEMS.BATCHES.replace(":itemId", id));
  };

  return (
    <ScrollArea className="mt-2 h-[calc(100%-5rem)] rounded-2xl bg-white pr-4">
      <CrudPage
        moduleName="items"
        data={items}
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
          },
          {
            label: "view batches",
            icon: "solar:box-bold-duotone",
            action: () => handleViewBatches(item.id),
          },
          {
            label: "delete",
            icon: "solar:trash-bin-trash-line-duotone",
            type: "destructive",
            action: () => handleDeleteBtnClicked(item),
          },
        ]}
      ></CrudPage>
    </ScrollArea>
  );
}
