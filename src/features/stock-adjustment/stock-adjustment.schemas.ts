import { z } from "zod";

export const stockAdjustmentSchema = z.object({
  itemId: z.string(),
  batchId: z.string(),
  quantity: z.number().min(1),
  type: z.enum(["REDUCTION", "INCREMENT"]),
  reason: z.string(),
  notes: z.string().optional(),
});
