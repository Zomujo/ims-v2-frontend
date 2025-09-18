"use client";
import { useOnlineStatus } from "@features/shared/hooks/useOnlineStatus";
import { API_ENDPOINTS } from "@/lib/api-constants";
import { UI_STATE } from "@/lib/constant";
import { handleRequestState } from "@/lib/utils";
import { useEffect } from "react";
import { z } from "zod";
import {
  createStockAdjustment,
  updateStockAdjustment,
} from "../shared/actions/stock-adjustments.actions";
import { ImsButton } from "../shared/components/ims-button";
import { ImsForm } from "../shared/components/ims-forms";
import useHookForm from "../shared/hooks/use-hook-form";
import useImsSearchParams from "../shared/hooks/use-ims-search-params";
import { OneStockAdjustment } from "../shared/types/action.types";
import { StockAdjustmentFormInputs } from "./stock-adjustment-component-client";
import { stockAdjustmentSchema } from "./stock-adjustment.schemas";

type StockAdjustmentFormProps = {
  stockAdjustment?: OneStockAdjustment;
};

export default function StockAdjustmentForm({
  stockAdjustment,
}: Readonly<StockAdjustmentFormProps>) {
  const { removeSearchParams } = useImsSearchParams();
  const form = useHookForm({
    mode: "onTouched",
    resolver: stockAdjustmentSchema,
  });
  const { handleRequests, isOnline } = useOnlineStatus();

  const handleSubmit = async (data: unknown) => {
    const id = stockAdjustment?.id;
    const oneStockAdjustment = data as z.infer<typeof stockAdjustmentSchema>;
    if (!isOnline) {
      handleRequests(
        id
          ? API_ENDPOINTS.STOCK_ADJUSTMENT.replace(":id", id)
          : API_ENDPOINTS.STOCK_ADJUSTMENTS,
        data,
        { method: id ? "PATCH" : "POST", removeSearchParams, form },
      );
      return;
    }
    const res = id
      ? updateStockAdjustment(id, oneStockAdjustment)
      : createStockAdjustment(oneStockAdjustment);
    handleRequestState({
      res,
      loadingMsg: "Submitting stock adjustment....",
    });
    res.then(() => {
      form.reset();
      removeSearchParams(UI_STATE);
    });
    await res;
  };

  useEffect(() => {
    if (!stockAdjustment) return;
    form.reset({
      itemId: stockAdjustment.item.id,
      quantity: stockAdjustment.quantity,
      reason: stockAdjustment.reason,
      notes: stockAdjustment.notes,
      batchId: stockAdjustment.batch.id,
      type: stockAdjustment.type,
    });
  }, []);

  return (
    <ImsForm
      className="overflow-y-auto [&>*]:px-4"
      inputSectionClassName="overflow-y-auto"
      form={form}
      handleAuthSubmit={handleSubmit}
      RenderActions={
        <ImsButton
          isLoading={form.formState.isSubmitting}
          isLoadingLabel="Submitting..."
          disabled={!form.formState.isValid || form.formState.isSubmitting}
          variant="imsPrimary"
          type="submit"
        >
          Submit
        </ImsButton>
      }
      RenderInputs={<StockAdjustmentFormInputs control={form.control} />}
    />
  );
}
