"use client";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ColumnDef } from "@tanstack/react-table";
import { CrudPageProps } from "../settings/settings.types";
import { IMSDataTable } from "../shared/components/ims-data-table";
import ImsSearchBar from "../shared/components/ims-search-bar";
import { SaleItem } from "../shared/types/sales-action.types";
import { Button } from "../ui/button";
import { salesItemLocalStorageKey, salesItemsColumns } from "./sales.data";
import { ScrollArea } from "../ui/scroll-area";
import { useLocalStorage } from "usehooks-ts";

type SalesItemListProps = {
  salesItems: SaleItem[];
  totalPages: number;
};

export default function SalesItemList({
  salesItems,
  totalPages,
}: Readonly<SalesItemListProps>) {
  const [addedSalesItems, setSalesItem] = useLocalStorage<SaleItem[]>(
    salesItemLocalStorageKey,
    [],
  );

  return (
    <ScrollArea className="h-[87%] rounded-2xl bg-white pt-5 pr-4">
      <ImsSearchBar className="ml-4 w-full" />
      <IMSDataTable<SaleItem, unknown>
        totalPages={totalPages}
        columns={salesItemsColumns.concat(
          getActionColumn<SaleItem, unknown>({
            actions: (item) => [
              {
                label: "Add",
                icon: "mdi:plus",
                action: () => {
                  console.log("added item>>>>>>>", item);
                  setSalesItem([...addedSalesItems, item]);
                },
              },
            ],
            addedSalesItems,
          }),
        )}
        data={salesItems}
      />
    </ScrollArea>
  );
}

const getActionColumn = <TData, TValue>({
  actions,
  addedSalesItems,
}: Readonly<{
  actions: CrudPageProps<TData>["actions"];
  addedSalesItems: SaleItem[];
}>): ColumnDef<TData, TValue> => {
  return {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original;
      const isAdded = !!addedSalesItems.find(
        (addedItem) => addedItem.batchId === (item as SaleItem).batchId,
      );
      return (
        <>
          {actions(item)?.map((actionItem) => {
            return (
              <Button
                disabled={isAdded}
                key={actionItem?.label}
                onClick={() => actionItem?.action()}
                variant="ghost"
                className="w-max border p-0 text-xs"
              >
                {isAdded ? (
                  <span className="px-4">Added</span>
                ) : (
                  <>
                    <Icon
                      className={cn({
                        "text-ims-red-300": actionItem?.type === "destructive",
                      })}
                      icon={actionItem?.icon ?? ""}
                    />
                    <span>{actionItem?.label}</span>
                  </>
                )}
                <span className="sr-only">Add item</span>
              </Button>
            );
          })}
        </>
      );
    },
  };
};
