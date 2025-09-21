import { z } from "zod";

export const generalSettingsSchema = z.object({
  fullName: z.string().nonempty("Full name is required"),
  email: z.string().email("Invalid email format").nonempty("Email is required"),
  phoneNumber: z
    .string()
    .regex(/^\+233\d{9}$/, {
      message: "Phone number must start with +233 and be 14 characters long",
    })
    .nonempty("Phone number is required"),
  otpCode: z.string().optional(),
});

export const departmentSettingsSchema = z.object({
  name: z.string().min(3, "Department name is required"),
  id: z.string().optional(),
});

export const newUserSettingsSchema = z.object({
  fullName: z
    .string()
    .min(1, { message: "Please enter fullname" })
    .min(3, { message: "Full name should not be less than 3 characters" }),
  email: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z
      .string()
      .email({ message: "Please enter a valid email address" })
      .optional(),
  ),
  role: z.string().min(1, { message: "Please select a role" }),
  departmentId: z.string().optional(),
  permissions: z.array(z.string()),
  id: z.string().optional(),
});

export const settingsExpirySchema = z.object({
  intervalQuantity: z
    .number({ required_error: "Required" })
    .min(1, "Must be greater than 0"),
  intervalUnit: z.enum(["days", "weeks", "months"]),
});
