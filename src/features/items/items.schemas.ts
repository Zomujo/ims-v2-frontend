import { z } from "zod";

export const itemFormSchema = z.object({
  name: z.string().min(1, "Item name is required"),
  brandName: z.string().min(1, "Brand name is required"),
  code: z.string().min(1, "Item code is required"),
  dosageForm: z.string().min(1, "Dosage form is required"),
  strength: z
    .string()
    .nonempty("Unit of Measurement is required")
    .min(1, "Unit of Measurement cannot be empty"),
  unitOfMeasurement: z
    .string()
    .nonempty("Unit of Measurement is required")
    .min(1, "Unit of Measurement cannot be empty"),
  manufacturer: z.string().min(1, "Manufacturer is required"),
  reorderPoint: z
    .number()
    .min(1, "Reorder level must be non-negative and greater than 0")
    .optional(),
  costPrice: z
    .number()
    .min(1, "Cost price must be non-negative and greater than 0")
    .optional(),
  sellingPrice: z
    .number()
    .min(1, "Selling price must be non-negative and greater than 0")
    .optional(),
  storageReq: z.string().min(1, "Storage requirement is required"),
  ISO: z.string().min(1, "ISO is required"),
  categoryId: z.string().min(1, "Category ID is required"),
  fdaApproval: z.string().min(1, "FDA approval is required"),
});

export const itemBatchFormSchema = z.object({
  quantity: z.number().min(1, "Quantity is required").optional(),
  validity: z.string().min(1, "Validity is required"),
  batchNumber: z.string().min(1, "Batch number is required"),
  supplierId: z.string().min(1, "Supplier ID is required"),
});
