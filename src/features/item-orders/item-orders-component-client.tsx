"use client";

import { Control } from "react-hook-form";
import HookFormField, {
  inputTypeNumber,
} from "../shared/components/hook-form-filed";
import { ImsSelect } from "../shared/components/ims-select";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { mockPaymentTypes } from "./item-orders.data";
import { ItemOrdersContext } from "./item-orders-context";
import { use } from "react";

type ItemFormInputsProps = {
  control: Control;
};
export function ItemOrdersInputs({ control }: Readonly<ItemFormInputsProps>) {
  const { items, suppliers } = use(ItemOrdersContext);
  const itemsOptions = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));
  const suppliersOptions = suppliers.map((supplier) => ({
    label: supplier.name,
    value: supplier.id,
  }));
  return (
    <>
      <HookFormField
        formControl={control}
        name="itemId"
        label="Item"
        renderInput={({ field }) => (
          <ImsSelect
            options={itemsOptions}
            moduleName="item"
            onChange={field.onChange}
            value={field.value}
            className="focus-visible:ring-ims-blue-300 !h-11 bg-white"
          />
        )}
      />
      <HookFormField
        formControl={control}
        name="quantity"
        label="Quantity"
        renderInput={({ field }) => (
          <Input
            {...field}
            {...inputTypeNumber(field)}
            type="number"
            className="focus-visible:ring-ims-blue-300 bg-white"
            placeholder="100"
          />
        )}
      />
      <HookFormField
        formControl={control}
        name="supplierId"
        label="Supplier"
        renderInput={({ field }) => (
          <ImsSelect
            options={suppliersOptions}
            moduleName="supplier"
            onChange={field.onChange}
            value={field.value}
            className="focus-visible:ring-ims-blue-300 !h-11 bg-white"
          />
        )}
      />
      <HookFormField
        formControl={control}
        name="expectedDeliveryDate"
        label="Expected Delivery Date"
        renderInput={({ field }) => (
          <Input
            {...field}
            type="date"
            className="focus-visible:ring-ims-blue-300 flex h-11 flex-col justify-between bg-white pt-2.5"
            placeholder="Eg. 2023-10-27"
          />
        )}
      />
      <HookFormField
        formControl={control}
        name="paymentMethod"
        label="Payment method"
        renderInput={({ field }) => (
          <ImsSelect
            options={mockPaymentTypes}
            moduleName="option"
            onChange={field.onChange}
            value={field.value}
            className="focus-visible:ring-ims-blue-300 !h-11 bg-white"
          />
        )}
      />
      <HookFormField
        formControl={control}
        name="deliveryMethod"
        label="Delivery Method"
        renderInput={({ field }) => (
          <Input
            {...field}
            type="text"
            className="focus-visible:ring-ims-blue-300 !h-11 bg-white"
          />
        )}
      />
      <HookFormField
        formControl={control}
        name="deliveryAddress"
        label="Delivery Address"
        renderInput={({ field }) => (
          <Textarea
            {...field}
            className="focus-visible:ring-ims-blue-300 bg-white"
            placeholder="Add address"
          />
        )}
      />
      <HookFormField
        formControl={control}
        name="additionalNotes"
        label="Additional Notes"
        renderInput={({ field }) => (
          <Textarea
            {...field}
            className="focus-visible:ring-ims-blue-300 bg-white"
            placeholder="Add notes"
          />
        )}
      />
    </>
  );
}
