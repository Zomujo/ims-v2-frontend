import { z } from "zod";
import { Gender } from "@features/shared/types/action.types";

export const GENDER_OPTIONS = [
  { label: "Male", value: Gender.MALE },
  { label: "Female", value: Gender.FEMALE },
  { label: "Other", value: Gender.OTHER },
] as const;

export const newPatientSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Please enter your fullname" })
      .min(3, { message: "Full name should not be less than 3 characters" }),
    cardIdentificationNumber: z.string().optional(),
    secondaryIdentificationNumber: z.string().optional(),
    dateOfBirth: z
      .string()
      .min(1, {
        message: "Please select date of birth",
      })
      .refine(
        (date) => {
          const selectedDate = new Date(date);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return selectedDate <= today;
        },
        {
          message: "Date of birth cannot be in the future",
        },
      ),
    gender: z.nativeEnum(Gender).optional(),
    diagnosis: z.string().optional(),
    weight: z.preprocess(
      (val) =>
        val === "" || val === null || val === undefined
          ? undefined
          : Number(val),
      z
        .number({ invalid_type_error: "Weight must be a number" })
        .positive({ message: "Weight must be greater than 0" })
        .max(500, { message: "Please enter a valid weight" })
        .optional(),
    ),
  })
  .transform((data) => {
    return {
      ...data,
      dateOfBirth: new Date(data.dateOfBirth).toISOString(),
    };
  });

export const salesCartSchema = z.object({
  patientCardId: z.string().optional(),
  paymentType: z
    .array(
      z.enum(["CASH", "ONLINE", "NHIS"], {
        errorMap: () => ({ message: "Please select a valid payment type" }),
      }),
    )
    .min(1, { message: "Please add at least one payment type" }),
  notes: z.string().optional(),
  icdCode: z.string().optional(),
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
  insured: z.enum(["true", "false"]),
});
