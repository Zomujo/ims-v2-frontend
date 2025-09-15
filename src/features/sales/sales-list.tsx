"use client";
import { handleRequestState } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useLocalStorage } from "usehooks-ts";
import { deleteSaleAction } from "../shared/actions/sales.action";
import { getSales } from "../shared/actions/sales.actions";
import CrudPage from "../shared/components/crud-page";
import useFetchData from "../shared/hooks/use-fetch-data";
import usePageCRUD from "../shared/hooks/use-page-crud";
import { GetSalesDto } from "../shared/types/action.types";
import { CRUDACTION } from "../shared/types/utitls.types";
import { salesItemLocalStorageKey, salesTableColumns } from "./sales.data";
import { useSessionData } from "@/hooks/useSessionData";
import { PermissionModules } from "@features/shared/types/auth-action.types";
import useImsSearchParams from "@features/shared/hooks/use-ims-search-params";
import { ColumnDef } from "@tanstack/react-table";
import { CacheKey } from "@/lib/cache/cache-data";

export default function SalesList() {
  const { setSearchParams, getSearchParams } = useImsSearchParams();
  const { canWrite, canDelete } = useSessionData();
  const router = useRouter();
  const { data, loading, refetch } = useFetchData({
    fetchFn: getSales,
    cacheKey: CacheKey.SalesList,
  });
  const [, , removeSalesItems] = useLocalStorage(salesItemLocalStorageKey, []);
  const sales = data?.rows ?? [];
  console.log("sales", sales);
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

  useEffect(() => {
    setSearchParams({ key: "todaySales", value: "true" });
  }, []);

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

  const todaySales = useMemo(
    () => getSearchParams("todaySales") === "true",
    [getSearchParams],
  );

  const columnsWithDate: ColumnDef<GetSalesDto>[] = useMemo(
    () => [
      ...salesTableColumns.slice(0, 3),
      {
        header: todaySales ? "Time Dispensed" : "Date Created",
        accessorKey: "createdAt",
        cell: ({ row }) => {
          const date = new Date(row.original.createdAt);
          if (todaySales) {
            return date.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            });
          }
          return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
        },
      },
      ...salesTableColumns.slice(3),
    ],
    [todaySales],
  );

  return (
    <div className="roundd-2xl mt-2 h-[calc(100%-15rem)] bg-white pr-4 sm:h-[calc(100%-10rem)]">
      <CrudPage
        moduleName="sales"
        data={sales}
        isLoading={loading}
        modalAction={handleDelete}
        handleRemoveQueryparam={handleRemoveQueryparam}
        currentDataDisplayName={getData(CRUDACTION.DELETE)?.saleNumber ?? ""}
        tableColumns={columnsWithDate}
        totalPages={data?.totalPages ?? 0}
        state={state}
        isEditMode={isEditMode}
        actions={(item) => [
          {
            label: "edit",
            icon: "lucide:edit-2",
            action: () => handleEdit(item),
            hide: !canWrite(PermissionModules.SALES),
          },
          {
            label: "delete",
            icon: "solar:trash-bin-trash-line-duotone",
            type: "destructive",
            action: () => handleDeleteBtnClicked(item),
            hide: !canDelete(PermissionModules.SALES),
          },
        ]}
      ></CrudPage>
    </div>
  );
}
