"use client";
import { handleRequestState } from "@/lib/utils";
import { useParams } from "next/navigation";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { useFieldArray } from "react-hook-form";
import { useIsClient, useLocalStorage } from "usehooks-ts";
import { createSaleAction } from "../shared/actions/sales.action";
import { getSale, updateSale } from "../shared/actions/sales.actions";
import HookFormField from "../shared/components/hook-form-filed";
import { ImsButton } from "../shared/components/ims-button";
import { ImsForm } from "../shared/components/ims-forms";
import { ImsSelect } from "../shared/components/ims-select";
import useHookForm from "../shared/hooks/use-hook-form";
import { SaleItem } from "../shared/types/sales-action.types";
import { ScrollArea } from "../ui/scroll-area";
import { Textarea } from "../ui/textarea";
import {
  hasInsuranceOptions,
  paymentTypeOptions,
  salesItemLocalStorageKey,
} from "./sales.data";
import { salesCartSchema } from "./sales.schemas";
import { SaleCartFormData } from "./sales.types";
import { isSalesEditMode } from "./sales.utils";
import { useOnlineStatus } from "@features/shared/hooks/useOnlineStatus";
import { API_ENDPOINTS } from "@/lib/api-constants";
import { API_ENDPOINTS_OLD } from "@/lib/constant";
import { Skeleton } from "@features/ui/skeleton";

const LoadingOverlay = lazy(() => import("@features/ui/loadingOverlay"));
const MultiSelect = lazy(() =>
  import("@features/ui/multiSelect").then((module) => ({
    default: module.MultiSelect,
  })),
);
const SaleCard = lazy(() =>
  import("./sales-cart-cards").then((module) => ({
    default: module.SaleCard,
  })),
);
const SaleCartSummery = lazy(() =>
  import("./sales-cart-cards").then((module) => ({
    default: module.SaleCartSummery,
  })),
);

const handleSalesItem = (saleItems: SaleItem, isEditMode?: boolean) => {
  return {
    batchId: saleItems.batchId,
    quantity: isEditMode ? saleItems.quantity : 1,
  };
};
type SalesCartProps = {
  patientCardId?: string;
};
export default function SalesCart({ patientCardId }: SalesCartProps) {
  const salesId = useParams().id;
  const isEditMode = isSalesEditMode(salesId);
  const isClient = useIsClient();
  const [addedSalesItems, setSalesItems, removeSalesItems] = useLocalStorage<
    SaleItem[]
  >(salesItemLocalStorageKey, []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { handleRequests, isOnline } = useOnlineStatus();

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
  }, [
    formSalesItems,
    addedSalesItemsMap,
    hasActiveNHIS,
    JSON.stringify(formSalesItems),
  ]);

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
      const saleItems = saleData.saleItems as unknown as SaleItem[];
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
    const dataWithPatientId = { ...(data as SaleCartFormData), patientCardId };
    if (!isOnline) {
      handleRequests(
        isEditMode
          ? API_ENDPOINTS.SALE.replace(":id", salesId as string)
          : API_ENDPOINTS_OLD.SALES,
        isEditMode
          ? {
              ...dataWithPatientId,
              insured: dataWithPatientId.insured === "true",
            }
          : {
              ...dataWithPatientId,
              insured:
                (dataWithPatientId as { insured: "true" | "false" }).insured ===
                "true",
            },
        { method: isEditMode ? "PATCH" : "POST" },
      );
      return;
    }
    setIsSubmitting(true);
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
      {isLoading && (
        <Suspense>
          <LoadingOverlay />
        </Suspense>
      )}
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
            <Suspense fallback={<Skeleton className="h-11 w-full" />}>
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
            </Suspense>
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
                      <Suspense fallback={<Skeleton className="h-28 w-full" />}>
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
                      </Suspense>
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
            <Suspense fallback={<Skeleton className="h-24 w-full" />}>
              <SaleCartSummery
                amountTotal={amountSubtotal}
                nhisCoveredAmount={nhisCoveredAmount}
              />
            </Suspense>
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
