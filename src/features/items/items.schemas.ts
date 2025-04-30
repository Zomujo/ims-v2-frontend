import { z } from "zod";

export const itemFormSchema = z.object({
  name: z.string().min(1, "Item name is required"),
  brandName: z.string().min(1, "Brand name is required"),
  code: z.string().min(1, "Item code is required"),
  dosageForm: z.string().min(1, "Dosage form is required"),
  strength: z.string().min(1, "Strength is required"),
  unitOfMeasurement: z.string().min(1, "Unit of measure is required"),
  manufacturer: z.string().min(1, "Manufacturer is required"),
  reorderPoint: z
    .number()
    .min(1, "Reorder level must be non-negative and greater than 0"),
  costPrice: z
    .number()
    .min(1, "Cost price must be non-negative and greater than 0"),
  sellingPrice: z
    .number()
    .min(1, "Selling price must be non-negative and greater than 0"),
  storageReq: z.string().min(1, "Storage requirement is required"),
  ISO: z.string().min(1, "ISO is required"),
  categoryId: z.string().min(1, "Category ID is required"),
  fdaApproval: z.string().min(1, "FDA approval is required"),
});
