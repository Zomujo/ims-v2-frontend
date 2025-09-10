import { z } from "zod";

export const loginSchema = z.object({
  accountIdentifier: z
    .string()
    .min(1, { message: "Please enter your username or email address" }),
  password: z.string().min(1, { message: "Please enter your password" }),
});

export const createAccountSchema = z
  .object({
    fullName: z
      .string()
      .min(1, { message: "Please enter your fullname" })
      .min(3, { message: "Full name should not be less than 3 characters" }),
    email: z.preprocess(
      (val) => (val === "" ? undefined : val),
      z
        .string()
        .email({ message: "Please enter a valid email address" })
        .optional(),
    ),
    password: z.string().min(1, { message: "Please enter your password" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
    facilityName: z
      .string()
      .min(1, { message: "Please enter your facility name" }),
    facilityPassword: z
      .string()
      .min(1, { message: "Please enter your password" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,!@#$^&*()_`-])[a-zA-Z\d.,!@#$^&*()_`-]{8,32}$/,
        {
          message:
            "Password must be between 8 and 32 characters long with at least 1 special character (.,!@#$^&*()_`-) and an uppercase character",
        },
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  username: z.string().min(1, { message: "Please enter your username" }),
  contact: z
    .string()
    .min(1, { message: "Please enter your email or phone number" }),
});

export const verifyCodeSchema = z.object({
  otpCode: z.string().min(1, { message: "Please enter the verification code" }),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, { message: "Please enter your password" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,!@#$^&*()_`-])[a-zA-Z\d.,!@#$^&*()_`-]{8,32}$/,
        {
          message:
            "Password must be between 8 and 32 characters long with at least 1 special character (.,!@#$^&*()_`-) and an uppercase character",
        },
      ),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
