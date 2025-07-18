"use client";

import { use, useEffect, useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import HookFormField, {
  inputTypeNumber,
  MultiStep,
} from "../shared/components/hook-form-filed";
import { ImsSelect } from "../shared/components/ims-select";
import { Input } from "../ui/input";
import { ItemsContext } from "./items.context";
import {
  dosageFormOptions,
  prescriptionUnits,
} from "@features/items/items.data";

type ItemFormInputsProps = {
  form: UseFormReturn;
  currentStep: number;
};

export function ItemFormInputs({
  form,
  currentStep,
}: Readonly<ItemFormInputsProps>) {
  const { control, setValue, watch } = form;
  const { categories } = use(ItemsContext);

  const sellingPrice = watch("sellingPrice");
  const sellingPriceMarkup = watch("sellingPriceMarkup");
  const costPrice = watch("costPrice");

  const updatingFromPrice = useRef(false);
  const updatingFromMarkup = useRef(false);

  useEffect(() => {
    if (updatingFromMarkup.current) {
      updatingFromMarkup.current = false;
      return;
    }

    const cp = Number(costPrice);
    const sp = Number(sellingPrice);

    if (cp > 0 && sp >= 0) {
      const markup = ((sp - cp) / cp) * 100;
      updatingFromPrice.current = true;
      setValue("sellingPriceMarkup", parseFloat(markup.toFixed(2)), {
        shouldTouch: true,
        shouldValidate: true,
      });
    }
  }, [sellingPrice, costPrice]);

  useEffect(() => {
    if (updatingFromPrice.current) {
      updatingFromPrice.current = false;
      return;
    }
    const cp = Number(costPrice);
    const markup = Number(sellingPriceMarkup);

    if (cp > 0 && markup >= 0) {
      const sp = cp * (1 + markup / 100);
      updatingFromMarkup.current = true;
      setValue("sellingPrice", parseFloat(sp.toFixed(2)), {
        shouldTouch: true,
        shouldValidate: true,
      });
    }
  }, [sellingPriceMarkup, costPrice]);

  return (
    <>
      <MultiStep currentStep={currentStep} step={1}>
        <h2 className="text-lg font-semibold">Item Details</h2>
        <HookFormField
          formControl={control}
          name="name"
          label="Item Name"
          renderInput={({ field }) => (
            <Input
              {...field}
              className="focus-visible:ring-ims-blue-300 bg-white"
              type="text"
              placeholder="Eg. paracetamol"
            />
          )}
        />
        <HookFormField
          formControl={control}
          name="brandName"
          label="Brand Name"
          renderInput={({ field }) => (
            <Input
              {...field}
              className="focus-visible:ring-ims-blue-300 bg-white"
              type="text"
              placeholder="Eg. Panadol"
            />
          )}
        />
        <HookFormField
          formControl={control}
          name="categoryId"
          label="Category"
          renderInput={({ field }) => (
            <ImsSelect
              options={(categories ?? []).map((category) => ({
                value: category.id,
                label: category.name,
              }))}
              showNone={false}
              moduleName="item category"
              {...field}
              className="focus-visible:ring-ims-blue-300 !h-11 bg-white"
            />
          )}
        />
        <HookFormField
          formControl={control}
          name="dosageForm"
          label="Dosage Form"
          renderInput={({ field }) => (
            <ImsSelect
              options={dosageFormOptions}
              moduleName="dosage form"
              showNone={false}
              {...field}
              className="focus-visible:ring-ims-blue-300 !h-11 bg-white"
            />
          )}
        />
        <HookFormField
          formControl={control}
          name="strength"
          label="Strength (uses measured unit by default)"
          renderInput={({ field }) => (
            <Input
              {...field}
              placeholder="Eg. 500"
              {...inputTypeNumber(field)}
              type="number"
              className="focus-visible:ring-ims-blue-300 !h-11 bg-white"
            />
          )}
        />
        <HookFormField
          formControl={control}
          name="unitOfMeasurement"
          label="Unit of Measurement"
          renderInput={({ field }) => (
            <ImsSelect
              showNone={false}
              options={prescriptionUnits}
              moduleName="unit of measurement"
              {...field}
              className="focus-visible:ring-ims-blue-300 !h-11 bg-white"
            />
          )}
        />
        <HookFormField
          formControl={control}
          name="manufacturer"
          label="Supplier / Manufacturer"
          renderInput={({ field }) => (
            <Input
              {...field}
              type="text"
              placeholder="Eg. ABC Pharmaceuticals"
              className="focus-visible:ring-ims-blue-300 !h-11 bg-white"
            />
          )}
        />
      </MultiStep>
      <MultiStep currentStep={currentStep} step={2}>
        <h2 className="text-lg font-semibold">Price and Other Details</h2>
        <HookFormField
          formControl={control}
          name="reorderPoint"
          label="Reorder Point"
          renderInput={({ field }) => (
            <Input
              {...inputTypeNumber(field)}
              type="number"
              className="focus-visible:ring-ims-blue-300 bg-white"
              placeholder="Eg. 20000"
            />
          )}
        />
        <HookFormField
          formControl={control}
          name="costPrice"
          label="Cost Price"
          renderInput={({ field }) => (
            <div className="flex items-center gap-2">
              <span className="text-sm">GHS</span>
              <Input
                {...inputTypeNumber(field)}
                type="number"
                className="focus-visible:ring-ims-blue-300 bg-white"
                placeholder="Eg. 20000.00"
              />
            </div>
          )}
        />
        <HookFormField
          formControl={control}
          name="sellingPrice"
          label="Selling Price"
          renderInput={({ field }) => (
            <div className="flex items-center gap-2">
              <span className="text-sm">GHS</span>
              <Input
                {...inputTypeNumber(field)}
                type="number"
                className="focus-visible:ring-ims-blue-300 bg-white"
                placeholder="Eg. 15"
              />
            </div>
          )}
        />
        <HookFormField
          formControl={control}
          name="sellingPriceMarkup"
          label="Selling Price Markup"
          renderInput={({ field }) => (
            <div className="flex items-center gap-2">
              <Input
                {...inputTypeNumber(field)}
                type="number"
                className="focus-visible:ring-ims-blue-300 bg-white"
                placeholder="Eg. 20"
              />
              <span className="text-sm">%</span>
            </div>
          )}
        />
      </MultiStep>
    </>
  );
}
