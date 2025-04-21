"use client";
import { handleRequestState } from "@/lib/utils";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { getItemBatches } from "../shared/actions/items.actions";
import { deleteSaleAction } from "../shared/actions/sales.action";
import CrudPage from "../shared/components/crud-page";
import useFetchData from "../shared/hooks/use-fetch-data";
import usePageCRUD from "../shared/hooks/use-page-crud";
import { CRUDACTION } from "../shared/types/utitls.types";
import { itemBatchesTableColumns } from "./items.data";

export default function ItemBatchesList({
  id: itemId,
}: Readonly<{ id: string }>) {
  const { data } = useFetchData({
    fetchFn: (params) => getItemBatches(itemId, params),
  });
  const itemBatches = data?.rows ?? [];
  const {
    state,
    isEditMode,
    getData,
    getId,
    removeSearchParams,
    handleDeleteBtnClicked,
    handleEditBtnClicked,
    handleRemoveQueryparam,
  } = usePageCRUD({ data: itemBatches });

  const handleDelete = async () => {
    const id = getId(CRUDACTION.DELETE);
    const res = deleteSaleAction(id);
    handleRequestState({ res, loadingMsg: "Deleting sale...." });
    res.then(() => {
      removeSearchParams(CRUDACTION.DELETE);
    });
    await res;
  };

  return (
    <ScrollArea className="mt-2 h-[calc(100%-5rem)] rounded-2xl bg-white pr-4">
      <CrudPage
        moduleName="itemBatches"
        data={itemBatches}
        modalAction={handleDelete}
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
