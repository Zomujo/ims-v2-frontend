"use client";
import { handleRequestState } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import {
  deleteSaleAction,
  getSalesAction,
} from "../shared/actions/sales.action";
import CrudPage from "../shared/components/crud-page";
import useFetchData from "../shared/hooks/use-fetch-data";
import usePageCRUD from "../shared/hooks/use-page-crud";
import { Sale } from "../shared/types/sales-action.types";
import { CRUDACTION } from "../shared/types/utitls.types";
import { ScrollArea } from "../ui/scroll-area";
import { salesItemLocalStorageKey, salesTableColumns } from "./sales.data";

export default function SalesList() {
  const router = useRouter();
  const { data } = useFetchData({ fetchFn: getSalesAction });
  const [, , removeSalesItems] = useLocalStorage(salesItemLocalStorageKey, []);
  const sales = data?.rows ?? [];
  const {
    state,
    isEditMode,
    getData,
    getId,
    removeSearchParams,
    handleDeleteBtnClicked,
    handleEditBtnClicked,
    handleRemoveQueryparam,
  } = usePageCRUD<Sale>({ data: sales });

  const handleDelete = async () => {
    const id = getId(CRUDACTION.DELETE);
    const res = deleteSaleAction(id);
    handleRequestState({ res, loadingMsg: "Deleting sale...." });
    await res;
    removeSearchParams(CRUDACTION.DELETE);
  };

  const handleEdit = (item: Sale) => {
    const id = item.id;
    router.push(
      `/sales/${id}?patientId=${item.patient.cardIdentificationNumber}`,
    );
  };

  useEffect(() => {
    removeSalesItems();
  }, []);

  return (
    <ScrollArea className="h-[95%] rounded-2xl bg-white pt-5 pr-4">
      <CrudPage
        moduleName="sales"
        data={sales}
        modalAction={handleDelete}
        handleRemoveQueryparam={handleRemoveQueryparam}
        currentDataDisplayName={getData(CRUDACTION.DELETE)?.saleNumber ?? ""}
        tableColumns={salesTableColumns}
        totalPages={data?.totalPages ?? 0}
        state={state}
        isEditMode={isEditMode}
        actions={(item) => [
          {
            label: "view",
            icon: "hugeicons:view",
            action: () => handleEditBtnClicked(item),
          },
          {
            label: "edit",
            icon: "lucide:edit-2",
            action: () => handleEdit(item),
          },
          {
            label: "delete",
            icon: "solar:trash-bin-trash-line-duotone",
            action: () => handleDeleteBtnClicked(item),
          },
        ]}
      ></CrudPage>
    </ScrollArea>
  );
}
