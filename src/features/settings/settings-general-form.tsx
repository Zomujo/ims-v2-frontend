"use client";
import { cn, getInitials, handleRequestState } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { Control } from "react-hook-form";
import { z } from "zod";
import { AuthForm } from "../auth/auth-components-client";
import { uploadAvatarAction } from "../shared/actions/settings.actions";
import HookFormField from "../shared/components/hook-form-filed";
import { ImsAvatar } from "../shared/components/ims-avatar";
import { ImsButton } from "../shared/components/ims-button";
import ImsOTPInput from "../shared/components/ims-otp-input";
import { ImsPopover } from "../shared/components/ims-popover";
import useHookForm from "../shared/hooks/use-hook-form";
import { Input } from "../ui/input";
import { generalSettingsSchema } from "./settigns.schemas";
import { SettingsFromActions } from "./settings-component-clinet";
import { settingsAccountInfoFields } from "./settings.data";
import {
  handleAccountInfoChange,
  handleEmailChange,
  handleEmailChangeOtp,
  readImgFile,
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
      email: dataEmail = "",
      fullName: dataFullName = "",
      phoneNumber: dataPhoneNumber = "",
    } = data as SettingsFormData;
    if (form.getFieldState("email").isDirty && !otpSent) {
      await handleEmailChange(dataEmail ?? "", setOtpSent);
    }
    if (otpSent && form.getFieldState("otpCode").isDirty) {
      await handleEmailChangeOtp(
        {
          email: dataEmail,
          otpCode,
        },
        setEditForm,
      );
    }
    if (
      form.getFieldState("fullName").isDirty ||
      form.getFieldState("phoneNumber").isDirty
    ) {
      await handleAccountInfoChange({
        fullName: dataFullName,
        phoneNumber: dataPhoneNumber,
      });
    }
    return Promise.resolve();
  };

  useEffect(() => {
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
          className={cn("w-1/2", {
            "gap-y-0 [data-slot='form-label']:text-gray-100": !editForm,
          })}
          formControl={control}
          name="otpCode"
          label="Input OTP Sent to Email"
          renderInput={({ field }) => (
            <ImsOTPInput className="h-12" {...field} otpBoxes={5} />
          )}
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

export function SettingsEditAvatarForm({
  children,
  imgURL = null,
  fullName = "",
}: Readonly<PropsWithChildren<{ imgURL: string | null; fullName: string }>>) {
  const [imgFile, setImgFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    readImgFile({ setImg: setImgFile, file });
  };
  const handleDiscard = () => {
    setImgFile(null);
  };

  const handleSave = async () => {
    const fileInput = fileInputRef.current;
    if (!fileInput || !imgFile) return;
    const res = uploadAvatarAction(fileInput.files?.[0] as File);
    handleRequestState({ res, loadingMsg: "Uploading image..." });
    res.then(() => {
      setImgFile(null);
    });
  };

  return (
    <ImsPopover
      onOpenChange={handleDiscard}
      contentClassName="flex items-center gap-x-4 p-2"
      contentAlign="start"
      className="cursor-pointer"
      trigger={children}
    >
      <Input
        ref={fileInputRef}
        className="hidden"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      <ImsAvatar
        src={imgFile ?? imgURL}
        alt={fullName}
        fallback={getInitials(fullName)}
        className="h-16 w-16"
      />
      {!imgFile && (
        <ImsButton
          variant="outline"
          startIcon={<Icon icon="hugeicons:edit-01" />}
          className="text-xs"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
        >
          Edit
        </ImsButton>
      )}
      {imgFile && (
        <>
          <ImsButton
            size="sm"
            className="bg-red-50 text-xs text-red-600 hover:bg-red-600 hover:text-white"
            onClick={handleDiscard}
          >
            Discard
          </ImsButton>
          <ImsButton
            size="sm"
            className="bg-ims-blue-300 hover:bg-ims-blue-200 text-xs"
            onClick={handleSave}
          >
            Save
          </ImsButton>
        </>
      )}
    </ImsPopover>
  );
}
