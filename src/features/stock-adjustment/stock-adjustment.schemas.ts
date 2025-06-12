import { z } from "zod";

export const stockAdjustmentSchema = z.object({
  itemId: z.string().nonempty("Item is required"),
  batchId: z.string().nonempty("Batch number is required"),
  quantity: z
    .number({
      message: "Quantity is required",
    })
    .min(1, "Quantity must be at least 1"),
  type: z.enum(["REDUCTION", "INCREMENT"]),
  reason: z.string().nonempty("Please provide a reason for the adjustment"),
  notes: z.string().optional(),
});
