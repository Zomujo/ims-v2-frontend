"use client";
import { handleRequestState } from "@/lib/utils";
import { getItemCategories } from "../shared/actions/item-categories.actions";
import { deleteSaleAction } from "../shared/actions/sales.action";
import CrudPage from "../shared/components/crud-page";
import useFetchData from "../shared/hooks/use-fetch-data";
import usePageCRUD from "../shared/hooks/use-page-crud";
import { CRUDACTION } from "../shared/types/utitls.types";
import { ScrollArea } from "../ui/scroll-area";
import { itemCategoriesTableColumns } from "./categories.data";

export default function CategoriesList() {
  const { data } = useFetchData({ fetchFn: getItemCategories });
  const itemCategories = data?.rows ?? [];
  const {
    state,
    isEditMode,
    getData,
    getId,
    removeSearchParams,
    handleDeleteBtnClicked,
    handleEditBtnClicked,
    handleRemoveQueryparam,
  } = usePageCRUD({ data: itemCategories });

  const handleDelete = async () => {
    const id = getId(CRUDACTION.DELETE);
    const res = deleteSaleAction(id);
    handleRequestState({ res, loadingMsg: "Deleting category...." });
    res.then(() => {
      removeSearchParams(CRUDACTION.DELETE);
    });
    await res;
  };

  return (
    <ScrollArea className="mt-2 h-[calc(100%-5rem)] rounded-2xl bg-white pr-4">
      <CrudPage
        moduleName="item categories"
        data={itemCategories}
        modalAction={handleDelete}
        handleRemoveQueryparam={handleRemoveQueryparam}
        currentDataDisplayName={getData(CRUDACTION.DELETE)?.name ?? ""}
        tableColumns={itemCategoriesTableColumns}
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
