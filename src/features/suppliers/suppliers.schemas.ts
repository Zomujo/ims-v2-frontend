import { z } from "zod";

const convertTelToGH = (tel: string) => {
  if (tel.startsWith("0")) {
    return "+233" + tel.slice(1);
  } else if (tel.startsWith("+233")) {
    return tel;
  } else {
    return "+233" + tel;
  }
};

export const supplierSchema = z.object({
  // Step 1: Supplier details (Mapping AddSupplier fields to UI steps)
  name: z.string().min(1, "Supplier name is required"),
  supplierType: z.string().optional(),
  minimumOrderQuantity: z.preprocess(
    (val) => Number(val),
    z
      .number({ invalid_type_error: "Minimum order quantity must be a number" })
      .min(0, "Minimum order quantity cannot be negative")
      .optional(),
  ),
  leadTime: z.string().optional(),
  deliveryMethod: z.string().optional(),

  // Step 2: Contact details
  primaryContactName: z.string().optional(),
  jobTitle: z.string().optional(),
  department: z.string().optional(),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .transform(convertTelToGH)
    .optional(),
  email: z
    .string()
    .optional()
    .transform((val) => (val ? val : undefined)),
  physicalAddress: z.string(),

  // Step 3: Payment Details
  paymentType: z.union([z.literal("Bank"), z.literal("Mobile Money")], {
    errorMap: () => ({ message: "Payment type is required" }),
  }),
  currency: z.string().optional(),
  paymentTerms: z.string().optional(),
  bankName: z.string().optional(),
  accountType: z.string().optional(),
  accountNumber: z.string().optional(),
  provider: z
    .union([z.literal("MTN"), z.literal("Vodafone"), z.literal("Airteltigo")])
    .optional(),
  mobileMoneyPhoneNumber: z
    .string()
    .optional()
    .transform((val) => {
      if (!val) return ""; // if undefined or empty
      return val.length > 3 ? convertTelToGH(val) : "";
    })
    .optional(),
});
