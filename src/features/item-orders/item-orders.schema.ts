import { z } from "zod";

export const orderFormSchema = z.object({
  itemId: z.string().min(1, "Item is required"),
  quantity: z.preprocess(
    (val) => Number(val),
    z
      .number({ invalid_type_error: "Quantity must be a number" })
      .int()
      .min(1, "Quantity must be at least 1")
      .optional(),
  ),
  supplierId: z.string().min(1, "Supplier is required"),
  expectedDeliveryDate: z.string().optional(), // Use string for date input, validate format if needed
  paymentMethod: z.string().min(1, "Payment method is required"),
  deliveryMethod: z.string().min(1, "Delivery method is required"),
  deliveryAddress: z.string().optional(), // Assuming optional
  additionalNotes: z.string().optional(), // Assuming optional
});
