import { z } from "zod";

export const newPatientSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Please enter your fullname" })
      .min(3, { message: "Full name should not be less than 3 characters" }),
    cardIdentificationNumber: z
      .string()
      .min(1, { message: "Please add card identification number" }),
    dateOfBirth: z.string().min(1, {
      message: "Please select date of birth",
    }),
  })
  .transform((data) => {
    return {
      ...data,
      dateOfBirth: new Date(data.dateOfBirth).toISOString(),
    };
  });

export const salesCartSchema = z.object({
  patientCardId: z.string().optional(),
  paymentType: z.enum(["CASH", "ONLINE"], {
    errorMap: () => ({ message: "Please select a valid payment type" }),
  }),
  notes: z.string().optional(),
  saleItems: z
    .array(
      z.object({
        batchId: z.string().min(1, {
          message: "Please select a batch",
        }),
        quantity: z
          .number()
          .min(1, {
            message: "Please select a quantity",
          })
          .max(100, {
            message: "Quantity should not be more than 100",
          }),
      }),
    )
    .min(1, { message: "Please add at least one sale item" }),
});
