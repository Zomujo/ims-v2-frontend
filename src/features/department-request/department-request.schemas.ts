import { z } from "zod";

export const departmentRequestSchema = z.object({
  itemId: z
    .string()
    .min(1, "Item ID is required")
    .refine((val) => val !== "none", {
      message: "Item ID cannot be 'none'",
    }),
  quantity: z.number().min(1),
  additionalNotes: z.string().min(1, "Additional notes are required"),
});
