"use client";
import { ColumnDef } from "@tanstack/react-table";
import { IMSDataTable } from "../shared/components/ims-data-table";
import ImsSearchBar from "../shared/components/ims-search-bar";
import { SaleItem } from "../shared/types/sales-action.types";
import { Button } from "../ui/button";
import { salesItemLocalStorageKey, salesItemsColumns } from "./sales.data";
import { useLocalStorage } from "usehooks-ts";
import useFetchData from "../shared/hooks/use-fetch-data";
import { getSalesItemsAction } from "../shared/actions/sales.action";
import { CacheKey } from "@/lib/cache/cache-data";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Plus, Minus } from "lucide-react";

export default function SalesItemList({
  refetchSales,
  setRefetchSales,
}: {
  refetchSales: boolean;
  setRefetchSales: Dispatch<SetStateAction<boolean>>;
}) {
  const { data, loading, refetch } = useFetchData({
    fetchFn: getSalesItemsAction,
    cacheKey: CacheKey.SalesItemList,
  });
  const salesItems = data?.rows ?? [];
  const [addedSalesItems, setSalesItem] = useLocalStorage<SaleItem[]>(
    salesItemLocalStorageKey,
    [],
  );

  useEffect(() => {
    if (refetchSales) {
      refetch();
      setRefetchSales(false);
    }
  }, [refetch, refetchSales, setRefetchSales]);

  return (
    <div className="h-full pt-4">
      <ImsSearchBar className="ml-4 w-full" />
      <div className="h-full overflow-auto pb-24">
        <IMSDataTable<SaleItem, unknown>
          isLoading={loading}
          totalPages={data?.totalPages ?? 0}
          columns={salesItemsColumns.concat(
            getActionColumn<SaleItem, unknown>({
              addedSalesItems,
              setSalesItem,
            }),
          )}
          data={salesItems}
        />
      </div>
    </div>
  );
}

const getActionColumn = <TData, TValue>({
  addedSalesItems,
  setSalesItem,
}: Readonly<{
  addedSalesItems: SaleItem[];
  setSalesItem: Dispatch<SetStateAction<SaleItem[]>>;
}>): ColumnDef<TData, TValue> => {
  return {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original as SaleItem;
      const isAdded = !!addedSalesItems.find(
        (addedItem) => addedItem.batchId === item.batchId,
      );
      const actionItem = isAdded
        ? {
            label: "Remove",
            action: () => {
              setSalesItem(
                addedSalesItems.filter(
                  (addedItem) => addedItem.batchId !== item.batchId,
                ),
              );
            },
          }
        : {
            label: "Add",
            action: () => {
              setSalesItem([...addedSalesItems, item]);
            },
          };
      return (
        <Button
          key={actionItem.label}
          onClick={() => actionItem.action()}
          variant="ghost"
          className="w-max border bg-indigo-600 p-0 text-xs text-white"
        >
          {isAdded ? (
            <>
              <Minus />
              <span>{actionItem.label}</span>
            </>
          ) : (
            <>
              <Plus />
              <span>{actionItem.label}</span>
            </>
          )}
          <span className="sr-only">
            {isAdded ? "Remove item" : "Add item"}
          </span>
        </Button>
      );
    },
  };
};
