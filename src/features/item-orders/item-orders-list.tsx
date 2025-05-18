"use client";
import { handleRequestState } from "@/lib/utils";
import {
  changeItemOrderState,
  createItemOrder,
  deleteItemOrder,
  getItemOrder,
  getItemOrders,
  updateItemOrder,
} from "../shared/actions/item-orders.actions";
import CrudPage from "../shared/components/crud-page";
import { ImsButton } from "../shared/components/ims-button";
import { ImsForm } from "../shared/components/ims-forms";
import useFetchData from "../shared/hooks/use-fetch-data";
import useHookForm from "../shared/hooks/use-hook-form";
import usePageCRUD from "../shared/hooks/use-page-crud";
import { IdData, ItemOrderStatus } from "../shared/types/action.types";
import { CRUDACTION } from "../shared/types/utitls.types";
import { ScrollArea } from "../ui/scroll-area";
import { ItemOrdersInputs } from "./item-orders-component-client";
import { ItemOrdersProvider } from "./item-orders-context";
import { itemOrdersTableColumns } from "./item-orders.data";
import { orderFormSchema } from "./item-orders.schema";
import { z } from "zod";
import useImsSearchParams from "../shared/hooks/use-ims-search-params";
import { UI_STATE } from "@/lib/constant";
import { useEffect, useState } from "react";
import LoadingOverlay from "@features/ui/loadingOverlay";

type ItemOrdersListProps = {
  items: IdData[];
  suppliers: IdData[];
};

export default function ItemOrdersList({
  items,
  suppliers,
}: Readonly<ItemOrdersListProps>) {
  const { data, loading, refetch } = useFetchData({
    fetchFn: getItemOrders,
  });
  const itemOrders = data?.rows ?? [];
  const {
    state,
    isEditMode,
    getData,
    getId,
    removeSearchParams,
    handleDeleteBtnClicked,
    handleEditBtnClicked,
    handleRemoveQueryparam,
  } = usePageCRUD({ data: itemOrders });

  const handleDelete = async () => {
    const id = getId(CRUDACTION.DELETE);
    const res = deleteItemOrder(id);
    handleRequestState({ res, loadingMsg: "Deleting item order...." });
    res.then(() => {
      removeSearchParams(CRUDACTION.DELETE);
    });
    await res;
  };

  const handleItemOrderState = (id: string, status: ItemOrderStatus) => {
    const res = changeItemOrderState(id, { status });
    handleRequestState({ res, loadingMsg: "Changing item order state..." });
    res.then(() => {
      refetch();
    });
  };
  const handleCurrentState = (status: string) => {
    return {
      [ItemOrderStatus.DRAFT]: ItemOrderStatus.REQUESTED,
      [ItemOrderStatus.REQUESTED]: ItemOrderStatus.DELIVERING,
      [ItemOrderStatus.DELIVERING]: ItemOrderStatus.RECEIVED,
    }[status];
  };

  return (
    <ScrollArea className="mt-2 h-[calc(100%-5rem)] rounded-2xl bg-white pr-4">
      <CrudPage
        moduleName="item categories"
        data={itemOrders}
        isLoading={loading}
        modalAction={handleDelete}
        handleRemoveQueryparam={handleRemoveQueryparam}
        currentDataDisplayName={getData(CRUDACTION.DELETE)?.orderNumber ?? ""}
        tableColumns={itemOrdersTableColumns}
        totalPages={data?.totalPages ?? 0}
        state={state}
        isEditMode={isEditMode}
        actions={(item) =>
          [
            {
              label: "edit",
              icon: "lucide:edit-2",
              action: () => handleEditBtnClicked(item),
            },
            // TODO: Will probably be added but at the moment, no functionality for this
            // {
            //   label: "print PDF",
            //   icon: "solar:printer-2-outline",
            //   action: () => handleDeleteBtnClicked(item),
            // },
            item.status !== ItemOrderStatus.RECEIVED && {
              label: handleCurrentState(item.status) ?? "",
              action: () =>
                handleItemOrderState(
                  item.id,
                  handleCurrentState(item.status) as ItemOrderStatus,
                ),
              icon: "hugeicons:view",
            },
            item.status !== ItemOrderStatus.RECEIVED && {
              label: "delete",
              icon: "lucide:trash-2",
              type: "destructive",
              action: () => handleDeleteBtnClicked(item),
            },
          ].slice(
            [ItemOrderStatus.DELIVERING, ItemOrderStatus.RECEIVED].includes(
              item.status,
            )
              ? 1
              : 0,
          )
        }
      >
        <ItemOrdersProvider value={{ items, suppliers }}>
          <ItemOrdersForm
            itemOrderId={getId(CRUDACTION.EDIT)}
            isEditMode={isEditMode}
          />
        </ItemOrdersProvider>
      </CrudPage>
    </ScrollArea>
  );
}

export function ItemOrdersForm({
  isEditMode,
  itemOrderId,
}: Readonly<{
  isEditMode?: boolean;
  itemOrderId?: string;
}>) {
  const [isLoading, setIsLoading] = useState(false);
  const { removeSearchParams } = useImsSearchParams();
  const form = useHookForm({
    resolver: orderFormSchema,
    defaultValues: {
      itemId: "",
      supplierId: "",
      quantity: undefined,
      expectedDeliveryDate: "",
      paymentMethod: "",
      deliveryMethod: "",
      deliveryAddress: "",
      additionalNotes: "",
    },
  });

  const handleSubmit = async (data: unknown) => {
    const orderData = data as z.infer<typeof orderFormSchema>;
    const res = isEditMode
      ? updateItemOrder(itemOrderId, orderData)
      : createItemOrder({
          ...orderData,
          status: ItemOrderStatus.DRAFT,
        });
    handleRequestState({
      res,
      loadingMsg: isEditMode
        ? "Updating item order..."
        : "Creating item order...",
    });
    res.then(() => {
      form.reset();
      removeSearchParams(UI_STATE);
    });
  };

  useEffect(() => {
    if (!isEditMode) return;
    const fetchItemOrder = async () => {
      setIsLoading(true);
      const { data } = await getItemOrder(itemOrderId ?? "");
      if (data) {
        const { expectedDeliveryDate } = data;
        form.reset({
          ...data,
          expectedDeliveryDate: expectedDeliveryDate.split("T")[0],
        });
        setIsLoading(false);
      }
    };
    void fetchItemOrder();
  }, []);

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <ImsForm
        form={form}
        handleAuthSubmit={handleSubmit}
        RenderInputs={<ItemOrdersInputs control={form.control} />}
        RenderActions={
          <ImsButton
            type="submit"
            variant="imsPrimary"
            disabled={form.formState.isSubmitting}
            isLoading={form.formState.isSubmitting}
            isLoadingLabel="Saving..."
          >
            Save
          </ImsButton>
        }
        className="overflow-y-auto [&>*]:px-4"
        inputSectionClassName="overflow-y-auto"
      />
    </>
  );
}
