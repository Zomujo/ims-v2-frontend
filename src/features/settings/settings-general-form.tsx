"use client";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Control } from "react-hook-form";
import { z } from "zod";
import { AuthForm } from "../auth/auth-components-client";
import HookFormField from "../shared/components/hook-form-filed";
import ImsOTPInput from "../shared/components/ims-otp-input";
import useHookForm from "../shared/hooks/use-hook-form";
import { Input } from "../ui/input";
import { generalSettingsSchema } from "./settigns.schemas";
import { SettingsFromActions } from "./settings-component-clinet";
import { settingsAccountInfoFields } from "./settings.data";
import {
    handleAccountInfoChange,
    handleEmailChange,
    handleEmailChangeOtp,
} from "./settings.utils";

type SettingsFormData = z.infer<typeof generalSettingsSchema>;
export function GeneralSettingsAccountForm({
  fullName,
  email,
  phoneNumber,
}: Readonly<{
  fullName: string;
  email: string;
  phoneNumber: string;
}>) {
  const [editForm, setEditForm] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const form = useHookForm({
    resolver: generalSettingsSchema,
    defaultValues: {
      email,
      fullName,
      phoneNumber,
      otpCode: "",
    },
  });

  const handleSubmitFn = async (data: unknown) => {
    const {
      otpCode,
      email = "",
      fullName = "",
      phoneNumber = "",
    } = data as SettingsFormData;
    if (form.getFieldState("email").isDirty && !otpSent) {
      await handleEmailChange(email ?? "", setOtpSent);
    }
    if (otpSent && form.getFieldState("otpCode").isDirty) {
      await handleEmailChangeOtp({ email, otpCode });
    }
    if (
      form.getFieldState("fullName").isDirty ||
      form.getFieldState("phoneNumber").isDirty
    ) {
      await handleAccountInfoChange({ fullName, phoneNumber });
    }
    return Promise.resolve();
  };

  useEffect(() => {
    form.reset({
      email,
      fullName,
      phoneNumber,
      otpCode: "",
    });
    setOtpSent(false);
  }, [editForm]);

  return (
    <AuthForm
      form={form}
      handleAuthSubmit={handleSubmitFn}
      RenderActions={
        <SettingsFromActions
          editForm={editForm}
          setEidtForm={setEditForm}
          isSubmitting={form.formState.isSubmitting}
        />
      }
      RenderInputs={
        <SettingsFormInputs
          otpSent={otpSent}
          editForm={editForm}
          control={form.control}
        />
      }
      className="relative pt-0"
    />
  );
}

function SettingsFormInputs({
  control,
  editForm,
  otpSent,
}: Readonly<{ control: Control; editForm: boolean; otpSent: boolean }>) {
  return (
    <>
      <h3 className="text-xl">Account</h3>
      {otpSent && (
        <HookFormField
          className={cn("b w-1/2", {
            "gap-y-0 [data-slot='form-label']:text-gray-100": !editForm,
          })}
          formControl={control}
          name="otpCode"
          label="Input OTP Sent to Email"
          renderInput={({ field }) => <ImsOTPInput {...field} otpBoxes={6} />}
        />
      )}
      {!otpSent && (
        <HookFormField
          className={cn("flex-1", {
            "gap-y-0 [data-slot='form-label']:text-gray-100": !editForm,
          })}
          formControl={control}
          name="email"
          label="Email"
          renderInput={({ field }) => (
            <Input
              {...field}
              className="focus-visible:ring-ims-blue-300 bg-white disabled:border-0 disabled:bg-transparent disabled:p-0 disabled:text-lg disabled:opacity-100 disabled:shadow-none"
              type="email"
              placeholder="Email"
              disabled={!editForm}
            />
          )}
        />
      )}
      <div className="flex gap-4">
        {settingsAccountInfoFields.map((input) => {
          return (
            <HookFormField
              className={cn("flex-1", {
                "gap-y-0": !editForm,
              })}
              key={input.name}
              formControl={control}
              name={input.name}
              label={input.label}
              renderInput={({ field }) => (
                <Input
                  {...field}
                  className={
                    "focus-visible:ring-ims-blue-300 bg-white disabled:border-0 disabled:bg-transparent disabled:p-0 disabled:text-lg disabled:opacity-100 disabled:shadow-none"
                  }
                  disabled={!editForm}
                  type={input.type}
                  placeholder={editForm ? input.placeholder : ""}
                />
              )}
            />
          );
        })}
      </div>
    </>
  );
}
