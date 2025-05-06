"use client";

import { PAGE_ROUTES } from "@/lib/constant";
import { usePathname } from "next/navigation";
import { PropsWithChildren, use } from "react";
import { Control } from "react-hook-form";
import HookFormField, {
  inputTypeNumber,
  MultiStep,
} from "../shared/components/hook-form-filed";
import { ImsSelect } from "../shared/components/ims-select";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { ItemsContext } from "./items.context";

export function ShowItemsDashboard({ children }: Readonly<PropsWithChildren>) {
  const pathName = usePathname();
  if (pathName === PAGE_ROUTES.ITEMS.VIEW) return children;
  return null;
}

// Placeholder options for dropdowns
const dosageFormOptions = [
  { value: "LIQUIDS", label: "Liquid" },
  { value: "SOLIDS", label: "Solid" },
];

type ItemFormInputsProps = {
  control: Control;
  currentStep: number;
};

export function ItemFormInputs({
  control,
  currentStep,
}: Readonly<ItemFormInputsProps>) {
  // State to manage supplier details based on supplier selection
  const { categories } = use(ItemsContext);

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
              moduleName="item category"
              {...field}
              className="focus-visible:ring-ims-blue-300 !h-11 bg-white"
            />
          )}
        />
        <HookFormField
          formControl={control}
          name="code"
          label="Item Code/ID"
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
          name="dosageForm"
          label="Dosage Form"
          renderInput={({ field }) => (
            <ImsSelect
              options={dosageFormOptions}
              moduleName="dosage form"
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
              type="text"
              className="focus-visible:ring-ims-blue-300 !h-11 bg-white"
            />
          )}
        />
        <HookFormField
          formControl={control}
          name="unitOfMeasurement"
          label="Unit of Measurement"
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
          name="manufacturer"
          label="Manufacturer"
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
          name="fdaApproval"
          label="FDA Approval"
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
          name="ISO"
          label="ISO"
          renderInput={({ field }) => (
            <Input
              {...field}
              type="text"
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
          label="Selling Price (Markup)"
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
        <HookFormField
          formControl={control}
          name="storageReq"
          label="Storage Requirement"
          renderInput={({ field }) => (
            <Textarea
              {...field}
              className="focus-visible:ring-0.5 focus-visible:ring-ims-blue-300 !h-11 bg-white"
            />
          )}
        />
      </MultiStep>
    </>
  );
}
