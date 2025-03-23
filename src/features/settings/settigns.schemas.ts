import { z } from "zod";

export const generalSettingsSchema = z.object({
  fullName: z.string().optional(),
  email: z.string().email().optional(),
  phoneNumber: z.string().optional(),
  otpCode: z
    .string()
    .optional()
    .transform((val) => parseInt(val ?? "", 10)),
});
