import { z } from "zod";

export const generalSettingsSchema = z.object({
  fullName: z.string().optional(),
  email: z.string().email().optional(),
  phoneNumber: z.string().optional(),
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
  email: z
    .string()
    .min(1, { message: "Please enter email address" })
    .email({ message: "Please enter a valid email address" }),
  role: z.string().min(1, { message: "Please select a role" }),
  departmentId: z.string().optional(),
  permissions: z.array(z.string()),
  id: z.string().optional(),
});
