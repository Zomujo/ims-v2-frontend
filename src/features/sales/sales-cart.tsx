"use client";
import { formateCurrency, handleRequestState } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useFieldArray } from "react-hook-form";
import { useIsClient, useLocalStorage } from "usehooks-ts";
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
import {
  hasInsuranceOptions,
  paymentTypeOptions,
  salesItemLocalStorageKey,
} from "./sales.data";
import { salesCartSchema } from "./sales.schemas";
import { SaleCardTypes, SaleCartFormData } from "./sales.types";
import { isSalesEditMode } from "./sales.utils";
import LoadingOverlay from "@features/ui/loadingOverlay";
import { getBatchesNoPaginate } from "@features/shared/actions/items.actions";
import { MultiSelect } from "@features/ui/multiSelect";

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
      paymentType: [],
      notes: "",
      insured: "false",
    },
  });

  const { fields, remove } = useFieldArray({
    name: "saleItems",
    control: form.control,
  });
  const formSalesItems = form.watch()["saleItems"];
  const insured = form.watch("insured");
  const hasActiveNHIS = insured === "true";
  const paymentType = form.watch("paymentType");

  const addedSalesItemsMap = useMemo(
    () => new Map(addedSalesItems.map((item) => [item.batchId, item])),
    [addedSalesItems],
  );

  const { amountSubtotal, nhisCoveredAmount } = useMemo(() => {
    const totals = {
      amountSubtotal: 0,
      nhisCoveredAmount: 0,
    };

    if (!formSalesItems) {
      return totals;
    }

    for (const saleItem of formSalesItems) {
      const item = addedSalesItemsMap.get(saleItem.batchId);
      const sellingPrice = item?.item?.sellingPrice ?? 0;
      const quantity = saleItem.quantity;

      totals.amountSubtotal += quantity * sellingPrice;

      if (hasActiveNHIS && item?.markup) {
        totals.nhisCoveredAmount += quantity * sellingPrice;
      }
    }

    return totals;
  }, [formSalesItems, addedSalesItemsMap, hasActiveNHIS]);

  const allHaveNHIS = useMemo(() => {
    return (
      !!addedSalesItems.length &&
      addedSalesItems.every(({ markup }) => !!markup) &&
      hasActiveNHIS
    );
  }, [addedSalesItems, hasActiveNHIS]);

  const nhisItemsIncluded = useMemo(() => {
    return addedSalesItems.some(({ markup }) => !!markup);
  }, [addedSalesItems]);

  useEffect(() => {
    if (addedSalesItems.length === 0 || !hasActiveNHIS) {
      form.setValue("paymentType", []);
    } else if (allHaveNHIS) {
      form.setValue("paymentType", ["NHIS"], { shouldValidate: true });
    }
  }, [addedSalesItems.length, allHaveNHIS]);

  const paymentTypeOptionsBuilder = useMemo(() => {
    if (!nhisItemsIncluded) {
      return paymentTypeOptions.filter(({ value }) => value !== "NHIS");
    }
    return paymentTypeOptions;
  }, [allHaveNHIS, hasActiveNHIS, nhisItemsIncluded]);

  useEffect(() => {
    if (paymentType.includes("NHIS")) {
      form.setValue("insured", "true", { shouldValidate: true });
    }
  }, [paymentType]);

  useEffect(() => {
    const currentItems = form.getValues()["saleItems"] as SaleItem[];
    const newItems = addedSalesItems.filter(
      (item) => !currentItems.some((i) => i.batchId === item.batchId),
    );
    if (!newItems.length) return;
    form.setValue(
      "saleItems",
      [...currentItems, ...newItems.map((i) => handleSalesItem(i))],
      { shouldValidate: true },
    );
  }, [addedSalesItems, form, isEditMode]);

  useEffect(() => {
    if (!isEditMode) return;
    const fetchSaleData = async () => {
      setIsLoading(true);
      const response = await getSale(salesId as string);
      const saleData = response.data;
      if (!saleData) return;
      const saleItems = saleData.saleItems as SaleItem[];
      form.setValue("notes", saleData.notes, { shouldValidate: true });
      form.setValue("paymentType", saleData.paymentType);
      form.setValue(
        "saleItems",
        saleItems.map((item) => handleSalesItem(item, true)),
        {
          shouldValidate: true,
        },
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
      // TODO: We will not be using receipts for the pilot program
      // printReceipt(
      //   data as SaleCartFormData,
      //   addedSalesItems,
      //   amountSubtotal,
      //   nhisCoveredAmount,
      // );
      removeSalesItems();
      removeSearchParams(patientIdKey);
      form.reset();
      setIsSubmitting(false);
    });
    await action;
  };

  if (!isClient) return null;

  const salesItemBuilder = (batchId: string) => {
    const foundSalesItem = addedSalesItems.find((sale) => {
      return sale.batchId === batchId;
    });

    return {
      id: foundSalesItem?.item.id ?? "",
      ...foundSalesItem,
    };
  };

  return (
    <ScrollArea className="relative h-[99%] w-full flex-[0.4] rounded-xl border bg-white py-5">
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
            <MultiSelect
              options={paymentTypeOptionsBuilder}
              onValueChange={(value) =>
                form.setValue("paymentType", value, { shouldValidate: true })
              }
              defaultValue={paymentType}
              value={paymentType}
              disabled={allHaveNHIS}
              animation={2}
              variant="inverted"
            />
            <HookFormField
              formControl={form.control}
              name="insured"
              label="Patient has active NHIS"
              renderInput={({ field }) => (
                <ImsSelect
                  showNone={false}
                  disabled={paymentType === "NHIS"}
                  defaultValue={"false"}
                  options={hasInsuranceOptions}
                  moduleName="Yes or No"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  className="focus-visible:ring-ims-blue-300 !h-11 bg-white"
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
                        salesItem={{
                          ...salesItemBuilder(
                            (item as unknown as SaleItem).batchId,
                          ),
                        }}
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
            <SaleCartSummery
              amountTotal={amountSubtotal}
              nhisCoveredAmount={nhisCoveredAmount}
            />
          </>
        }
        RenderActions={
          <ImsButton
            isLoading={isSubmitting}
            isLoadingLabel={"Submitting..."}
            disabled={isSubmitting || !form.formState.isValid}
            variant="imsPrimary"
            type="submit"
            className=" "
          >
            {isEditMode ? "Update Sale" : " Save Sale"}
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
      <span className="mt-2 text-xs text-red-400">
        {alternativeBatchMessage && alternativeBatchMessage}
      </span>
    </div>
  );
}

function SaleCartSummery({
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
