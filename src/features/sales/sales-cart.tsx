"use client";
import { formateCurrency, handleRequestState } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldArray } from "react-hook-form";
import { useIsClient, useLocalStorage, useReadLocalStorage } from "usehooks-ts";
import { z } from "zod";
import { createSaleAction } from "../shared/actions/sales.action";
import { getSale, updateSale } from "../shared/actions/sales.actions";
import HookFormField from "../shared/components/hook-form-filed";
import { ImsButton } from "../shared/components/ims-button";
import ImsDropdownMenu from "../shared/components/ims-drop-down-menu";
import { ImsForm } from "../shared/components/ims-forms";
import { ImsSelect } from "../shared/components/ims-select";
import useHookForm from "../shared/hooks/use-hook-form";
import useImsSearchParams from "../shared/hooks/use-ims-search-params";
import { SaleItem } from "../shared/types/sales-action.types";
import { ScrollArea } from "../ui/scroll-area";
import { Textarea } from "../ui/textarea";
import { paymentTypeOptions, salesItemLocalStorageKey } from "./sales.data";
import { salesCartSchema } from "./sales.schemas";
import { SaleCardTypes } from "./sales.types";
import { isSalesEditMode } from "./sales.utils";
import LoadingOverlay from "@features/ui/loadingOverlay";

type SaleCartFormData = z.infer<typeof salesCartSchema>;
const handleSalesItem = (saleItems: SaleItem, isEditMode?: boolean) => {
  return {
    batchId: saleItems.batchId,
    quantity: isEditMode ? saleItems.quantity : 1,
  };
};
const patientIdKey = "patientId";
export default function SalesCart() {
  const salesId = useParams().id;
  const isEditMode = isSalesEditMode(salesId);
  const isClient = useIsClient();
  const { getSearchParams, removeSearchParams } = useImsSearchParams();
  const [addedSalesItems, setSalesItems, removeSalesItems] = useLocalStorage<
    SaleItem[]
  >(salesItemLocalStorageKey, []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useHookForm({
    resolver: salesCartSchema,
    defaultValues: {
      saleItems: [],
      paymentType: "CASH",
      notes: "",
    },
  });

  const { fields, remove } = useFieldArray({
    name: "saleItems",
    control: form.control,
  });

  // Update form when sales items change in non-edit mode
  useEffect(() => {
    const saleItem = addedSalesItems.slice(-1)[0];
    const isItemAlreadyAdded = form
      .getValues()
      [
        "saleItems"
      ].some((item: SaleItem) => item.batchId === saleItem?.batchId);
    if (isItemAlreadyAdded) return;
    if (!saleItem) return;
    form.setValue("saleItems", [
      ...form.getValues()["saleItems"],
      handleSalesItem(saleItem),
    ]);
  }, [addedSalesItems, form, isEditMode]);

  // Fetch and set sale data in edit mode

  useEffect(() => {
    if (!isEditMode) return;
    const fetchSaleData = async () => {
      setIsLoading(true);
      const response = await getSale(salesId as string);
      const saleData = response.data;
      if (!saleData) return;
      const saleItems = saleData.saleItems as SaleItem[];
      form.setValue("notes", saleData.notes);
      form.setValue("paymentType", saleData.paymentType);
      form.setValue(
        "saleItems",
        saleItems.map((item) => handleSalesItem(item, true)),
      );
      setSalesItems(saleItems);
      setIsLoading(false);
    };

    void fetchSaleData();
  }, []);

  const handleSubmit = async (data: unknown) => {
    setIsSubmitting(true);
    const patientCardId = getSearchParams(patientIdKey);
    const dataWithPatientId = { ...(data as SaleCartFormData), patientCardId };
    const action = isEditMode
      ? updateSale(salesId as string, dataWithPatientId)
      : createSaleAction(dataWithPatientId);
    handleRequestState({ res: action, loadingMsg: "Saving sales..." });
    action.then(() => {
      printReceipt(data as SaleCartFormData, addedSalesItems);
      removeSalesItems();
      removeSearchParams(patientIdKey);
      form.reset();
      setIsSubmitting(false);
    });
    await action;
  };

  if (!isClient) return null;

  return (
    <ScrollArea className="relative h-[99%] w-full flex-[0.4] rounded-xl border bg-white">
      {isLoading && <LoadingOverlay />}
      <ImsForm
        className="gap-y-0 px-4 py-2 pb-2"
        form={form}
        handleAuthSubmit={handleSubmit}
        inputSectionClassName="space-y-3 pt-12"
        RenderInputs={
          <>
            <h2 className="absolute inset-x-0 top-0 rounded-xl bg-white px-6 py-2 font-bold">
              Sale Cart ( {addedSalesItems?.length} )
            </h2>
            <HookFormField
              formControl={form.control}
              name="paymentType"
              label="Select type of payment"
              renderInput={({ field }) => (
                <ImsSelect
                  options={paymentTypeOptions}
                  defaultValue={field.value}
                  moduleName="payment type"
                  onChange={(value) => field.onChange(value)}
                  value={field.value}
                  className="focus-visible:ring-0.5 focus-visible:ring-ims-blue-300 !h-11 bg-white"
                />
              )}
            />
            {fields.map((item, index) => {
              return (
                <HookFormField
                  key={item.id}
                  formControl={form.control}
                  name={`saleItems.${index}.quantity`}
                  label=""
                  renderInput={({ field }) => {
                    return (
                      <SaleCard
                        remove={remove}
                        salesItem={item}
                        index={index}
                        quantity={field.value}
                        onChange={field.onChange}
                      />
                    );
                  }}
                />
              );
            })}
            <HookFormField
              formControl={form.control}
              name="notes"
              label="Sale notes"
              className="py-4"
              renderInput={({ field }) => (
                <Textarea
                  {...field}
                  className="focus-visible:ring-0.5 focus-visible:ring-ims-blue-300 !h-11 bg-white"
                />
              )}
            />
            <SaleCartSummery formSalesItems={form.watch()["saleItems"]} />
          </>
        }
        RenderActions={
          <ImsButton
            isLoading={isSubmitting}
            isLoadingLabel={"Adding user..."}
            disabled={isSubmitting || !form.formState.isValid}
            variant="imsPrimary"
            type="submit"
            className=" "
          >
            {isEditMode ? "Update and Print Bill" : " Save and Print Bill"}
          </ImsButton>
        }
      />
    </ScrollArea>
  );
}

function SaleCard({
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

  const handleItemDelete = () => {
    remove(index);
    setAddedSalesItems(
      addedSalesItems.filter(
        (addedSalesItem) => addedSalesItem.batchId !== salesItem.batchId,
      ),
    );
  };

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
              <Icon icon="solar:trash-bin-minimalistic-bold-duotone" />
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
        <div className="flex gap-2">
          <button
            onClick={handleSubtract}
            type="button"
            className="flex h-4 w-4 cursor-pointer items-center justify-center bg-slate-200"
          >
            <Icon icon="ic:outline-minus" className="text-sm" />
          </button>
          <span className="w-4 text-center font-bold">{quantity}</span>
          <button
            onClick={handleAdd}
            type="button"
            className="flex h-4 w-4 cursor-pointer items-center justify-center bg-slate-200"
          >
            <Icon icon="mynaui:plus-solid" className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
}

function SaleCartSummery({
  formSalesItems,
}: Readonly<{ formSalesItems: SaleCartFormData["saleItems"] }>) {
  const addedSalesItems = useReadLocalStorage<SaleItem[]>(
    salesItemLocalStorageKey,
  );
  const amountSubtotal = formSalesItems?.reduce((acc, saleItem) => {
    const sellingPrice =
      addedSalesItems?.find((item) => item.batchId === saleItem.batchId)?.item
        ?.sellingPrice ?? 0;
    return acc + saleItem.quantity * sellingPrice;
  }, 0);

  return (
    <div className="space-y-1 text-xs">
      <h2 className="py-2 font-bold">Summary</h2>
      <p className="flex justify-between">
        <span>Subtotal</span>
        <span>{formateCurrency(amountSubtotal ?? 0)}</span>
      </p>
      <p className="flex justify-between">
        <span>Discount</span>
        <span>GHC 0.00</span>
      </p>
      <p className="flex justify-between py-4 font-bold">
        <span>Total</span>
        <span>{formateCurrency(amountSubtotal)}</span>
      </p>
    </div>
  );
}

const printReceipt = (data: SaleCartFormData, addedSalesItems: SaleItem[]) => {
  const receiptContent = `
    <html lang="en">
      <head>
        <title>Receipt</title>
        <style>
          @media print {
            body { 
              width: 90mm;
              margin: 0;
              padding: 0;
            }
          }
          body {
            font-family: 'Courier New', monospace;
            padding: 10px;
            margin: 0;
            display: flex;
            justify-content: center;
            background-color: #fff;
          }
          .receipt-card {
            width: 340px;
            background: white;
            padding: 10px;
            border: 1px solid #000;
          }
          .header {
            text-align: center;
            border-bottom: 1px dashed #000;
            padding-bottom: 10px;
            margin-bottom: 10px;
          }
          .header h1 {
            font-size: 18px;
            margin: 5px 0;
          }
          .info {
            font-size: 12px;
            margin: 5px 0;
          }
          .items {
            margin: 15px 0;
            border-bottom: 1px dashed #000;
            padding-bottom: 10px;
          }
          .item {
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            margin: 5px 0;
          }
          .batch-id {
            font-size: 8px;
            color: #666;
          }
          .total {
            font-weight: bold;
            text-align: right;
            font-size: 14px;
            margin-top: 10px;
          }
          .footer {
            text-align: center;
            font-size: 10px;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="receipt-card">
          <div class="header">
            <h1>SALES RECEIPT</h1>
            <div class="info">Date: ${new Date().toLocaleString()}</div>
            <div class="info">Payment: ${data.paymentType}</div>
          </div>
          
          <div class="items">
            ${data.saleItems
              .map((item) => {
                const saleItem = addedSalesItems.find(
                  (sale) => sale.batchId === item.batchId,
                );
                const itemName = saleItem?.item?.name ?? "";
                const price = saleItem?.item?.sellingPrice ?? 0;
                const total = price * item.quantity;
                return `
                <div class="item">
                  <div>
                    ${itemName}
                    <div class="batch-id">#${item.batchId}</div>
                  </div>
                  <div>
                    ${item.quantity} x GHC ${price.toFixed(2)} = GHC ${total.toFixed(2)}
                  </div>
                </div>
              `;
              })
              .join("")}
          </div>

          <div class="total">
            TOTAL: GHC ${data.saleItems
              .reduce(
                (acc, item) =>
                  acc +
                  item.quantity *
                    (addedSalesItems?.find(
                      (addedItem) => addedItem.batchId === item.batchId,
                    )?.item?.sellingPrice || 0),
                0,
              )
              .toFixed(2)}
          </div>

          ${data.notes ? `<div class="info">Notes: ${data.notes}</div>` : ""}
          
          <div class="footer">
            Thank you for your purchase!
          </div>
        </div>
      </body>
    </html>
  `;

  const receiptBlob = new Blob([receiptContent], { type: "text/html" });
  const receiptUrl = URL.createObjectURL(receiptBlob);
  const receiptWindow = window.open(
    receiptUrl,
    "Receipt",
    "width=400,height=600",
  );

  if (receiptWindow) {
    receiptWindow.addEventListener("load", () => {
      receiptWindow.print();
      URL.revokeObjectURL(receiptUrl);
    });
  }
};
