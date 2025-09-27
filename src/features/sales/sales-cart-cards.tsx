"use client";

import { formateCurrency } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { getBatchesNoPaginate } from "../shared/actions/items.actions";
import ImsDropdownMenu from "../shared/components/ims-drop-down-menu";
import { SaleItem } from "../shared/types/sales-action.types";
import { salesItemLocalStorageKey } from "./sales.data";
import { SaleCardTypes } from "./sales.types";
import { Minus, Plus, Trash } from "lucide-react";

export function SaleCard({
  salesItem,
  remove,
  onChange,
  index,
  quantity,
}: Readonly<SaleCardTypes>) {
  const [addedSalesItems, setAddedSalesItems] = useLocalStorage<SaleItem[]>(
    salesItemLocalStorageKey,
    [],
  );
  const [alternativeBatchMessage, setAlternativeBatchMessage] = useState<
    string | null
  >(null);

  const handleItemDelete = () => {
    remove(index);
    setAddedSalesItems(
      addedSalesItems.filter(
        (addedSalesItem) => addedSalesItem.batchId !== salesItem.batchId,
      ),
    );
  };

  useEffect(() => {
    const checkForAlternativeBatch = async () => {
      const { validity: saleItemValidity, id: itemId } = salesItem;
      if (!saleItemValidity || !itemId) return;

      try {
        const batches = await getBatchesNoPaginate(itemId);
        if (batches && batches.length > 0) {
          const alternativeBatches = batches.filter(({ validity, id }) => {
            const currentDate = new Date().toISOString();
            return (
              validity < saleItemValidity &&
              validity > currentDate &&
              id !== salesItem.batchId
            );
          });

          if (alternativeBatches.length > 0) {
            const soonestBatch = alternativeBatches.sort((a, b) =>
              a.validity.localeCompare(b.validity),
            )[0];

            const expiryDate = new Date(
              soonestBatch.validity,
            ).toLocaleDateString();
            setAlternativeBatchMessage(
              `⚠️ Alternative batch available: Batch #${soonestBatch.batchNumber} expires on ${expiryDate} (sooner than current batch). Consider using this batch first to minimize waste.`,
            );
          }
        }
      } catch (error) {
        console.error("Error checking alternative batches:", error);
      }
    };
    void checkForAlternativeBatch();
  }, []);

  const activeAddedSalesItem = addedSalesItems.find(
    (item) => item.batchId === salesItem.batchId,
  );

  const getSellingPrice = () => {
    const totalSellingPrice =
      (activeAddedSalesItem?.item?.sellingPrice ?? 0) * quantity;
    return formateCurrency(totalSellingPrice);
  };

  const handleAdd = () => {
    onChange(quantity + 1);
  };
  const handleSubtract = () => {
    if (quantity === 1) return;
    onChange(quantity - 1);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (e.target.value === "") {
      onChange(0);
      return;
    }
    if (!isNaN(newQuantity) && newQuantity > 0) {
      onChange(newQuantity);
    }
  };

  return (
    <div className="space-y-4 rounded-2xl border p-4 text-xs">
      <div className="flex w-full items-center justify-between">
        <span>{activeAddedSalesItem?.item?.name}</span>
        <ImsDropdownMenu
          trigger={
            <button
              onClick={(e) => e.preventDefault()}
              type="button"
              className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FEF2F2] text-red-600 hover:bg-red-400 hover:text-white"
            >
              <Trash size={"18"} className="text-sm" />
            </button>
          }
          menuItems={[
            {
              id: "delete",
              varient: "destructive",
              node: (
                <button
                  onClick={handleItemDelete}
                  className="w-full"
                  type="button"
                >
                  Delete
                </button>
              ),
            },
          ]}
        />
      </div>
      <div className="flex w-full items-center justify-between">
        <span>{getSellingPrice()}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSubtract}
            type="button"
            className="flex h-4 w-4 cursor-pointer items-center justify-center bg-slate-200"
          >
            <Minus className="text-sm" />
          </button>
          <input
            type="number"
            value={quantity === 0 ? "" : quantity}
            onChange={handleQuantityChange}
            className="h-8 w-10 border text-center font-bold"
          />
          <button
            onClick={handleAdd}
            type="button"
            className="flex h-4 w-4 cursor-pointer items-center justify-center bg-slate-200"
          >
            <Plus className="text-sm" />
          </button>
        </div>
      </div>
      <span className="mt-2 text-xs text-red-400">
        {alternativeBatchMessage && alternativeBatchMessage}
      </span>
    </div>
  );
}

export function SaleCartSummery({
  nhisCoveredAmount,
  amountTotal,
}: Readonly<{
  nhisCoveredAmount: number;
  amountTotal: number;
}>) {
  return (
    <div className="space-y-1 text-xs">
      <h2 className="py-2 font-bold">Summary</h2>
      <p className="flex justify-between">
        <span>Subtotal</span>
        <span>{formateCurrency(amountTotal ?? 0)}</span>
      </p>
      <p className="flex justify-between">
        <span>NHIS Covered</span>
        <span>{formateCurrency(nhisCoveredAmount)}</span>
      </p>
      <p className="flex justify-between py-4 font-bold">
        <span>Total</span>
        <span>{formateCurrency(amountTotal - nhisCoveredAmount)}</span>
      </p>
    </div>
  );
}
