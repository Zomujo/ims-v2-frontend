"use client";
import { handleRequestState } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { deleteSaleAction } from "../shared/actions/sales.action";
import { getSales } from "../shared/actions/sales.actions";
import CrudPage from "../shared/components/crud-page";
import useFetchData from "../shared/hooks/use-fetch-data";
import usePageCRUD from "../shared/hooks/use-page-crud";
import { GetSalesDto } from "../shared/types/action.types";
import { CRUDACTION } from "../shared/types/utitls.types";
import { ScrollArea } from "../ui/scroll-area";
import { salesItemLocalStorageKey, salesTableColumns } from "./sales.data";

export default function SalesList() {
  const router = useRouter();
  const { data, loading, refetch } = useFetchData({ fetchFn: getSales });
  const [, , removeSalesItems] = useLocalStorage(salesItemLocalStorageKey, []);
  const sales = data?.rows ?? [];
  const {
    state,
    isEditMode,
    getData,
    getId,
    removeSearchParams,
    handleDeleteBtnClicked,
    handleRemoveQueryparam,
  } = usePageCRUD({ data: sales });

  const handleDelete = async () => {
    const id = getId(CRUDACTION.DELETE);
    const res = deleteSaleAction(id);
    handleRequestState({ res, loadingMsg: "Deleting sale...." });
    res.then(() => {
      removeSearchParams(CRUDACTION.DELETE);
      refetch();
    });
    await res;
  };

  const handleEdit = (item: GetSalesDto) => {
    const id = item.id;
    const patientId = item?.patient?.cardIdentificationNumber;
    router.push(
      `/sales/${id}${patientId ? "?patientId=" + item.patient.cardIdentificationNumber : ""}`,
    );
  };

  useEffect(() => {
    removeSalesItems();
  }, []);

  return (
    <ScrollArea className="mt-5 h-[95%] rounded-2xl bg-white pr-4">
      <CrudPage
        moduleName="sales"
        data={sales}
        modalAction={handleDelete}
        isLoading={loading}
        handleRemoveQueryparam={handleRemoveQueryparam}
        currentDataDisplayName={getData(CRUDACTION.DELETE)?.saleNumber ?? ""}
        tableColumns={salesTableColumns}
        totalPages={data?.totalPages ?? 0}
        state={state}
        isEditMode={isEditMode}
        actions={(item) => [
          {
            label: "edit",
            icon: "lucide:edit-2",
            action: () => handleEdit(item),
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
