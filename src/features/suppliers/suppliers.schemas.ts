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
  supplierType: z.string().min(1, "Supplier type is required"),
  minimumOrderQuantity: z.preprocess(
    (val) => Number(val),
    z
      .number({ invalid_type_error: "Minimum order quantity must be a number" })
      .min(0, "Minimum order quantity cannot be negative")
      .optional(),
  ),
  leadTime: z.string().min(1, "Lead time is required"),
  deliveryMethod: z.string().min(1, "Delivery method is required"),

  // Step 2: Contact details
  primaryContactName: z.string().min(1, "Primary contact name is required"),
  jobTitle: z.string(),
  department: z.string(),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .transform(convertTelToGH),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  physicalAddress: z.string().min(1, "Physical Address is required"),

  // Step 3: Payment Details
  paymentType: z.union([z.literal("Bank"), z.literal("Mobile Money")], {
    errorMap: () => ({ message: "Payment type is required" }),
  }),
  currency: z.string().min(1, "Currency is required"),
  paymentTerms: z.string().min(1, "Payment terms are required"),
  bankName: z.string().optional(),
  accountType: z.string().optional(),
  accountNumber: z.string().optional(),
  provider: z
    .union([z.literal("MTN"), z.literal("Vodafone"), z.literal("Airteltigo")])
    .optional(),
  mobileMoneyPhoneNumber: z.string().transform(convertTelToGH).optional(),
});
