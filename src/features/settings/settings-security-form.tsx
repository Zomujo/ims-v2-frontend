"use client";
import React, { useEffect, useState } from "react";
import { resetPasswordSchema } from "../auth/auth.schemas";
import useHookForm from "../shared/hooks/use-hook-form";
import { Control } from "react-hook-form";
import { AuthForm, RenderPasswordInput } from "../auth/auth-components-client";
import HookFormField from "../shared/components/hook-form-filed";
import { SettingsFromActions } from "./settings-component-client";
import { cn, handleRequestState } from "@/lib/utils";
import { changePassword } from "../shared/actions/settings.actions";
import { z } from "zod";

export default function SettingsSecurityForm() {
  const [editForm, setEditForm] = useState(false);
  const form = useHookForm({
    resolver: resetPasswordSchema,
    defaultValues: {
      confirmPassword: "",
      password: "",
    },
  });

  const handleSubmitFn = async (data: unknown) => {
    const { password } = data as z.infer<typeof resetPasswordSchema>;
    const res = changePassword(password);
    handleRequestState({ res, loadingMsg: "Changing password....." });
    res.then(() => {
      setEditForm(false);
    });
    return res;
  };

  useEffect(() => {
    form.reset();
  }, [editForm]);

  return (
    <AuthForm
      form={form}
      handleAuthSubmit={handleSubmitFn}
      className="relative flex"
      RenderActions={
        <SettingsFromActions
          editFormAction={editForm}
          setEditFormAction={setEditForm}
          isSubmitting={form.formState.isSubmitting}
          className={cn("top-8 right-8", { "": editForm })}
          disabled={!form.formState.isValid}
        />
      }
      RenderInputs={
        <SecuritySettingsInputs editForm={editForm} control={form.control} />
      }
    />
  );
}

function SecuritySettingsInputs({
  control,
  editForm,
}: Readonly<{ control: Control; editForm: boolean }>) {
  return (
    <>
      <HookFormField
        formControl={control}
        name="password"
        label={
          <div className="flex flex-col">
            <span className="text-lg">Password</span>
            <span className="text-sm text-gray-400">Change your password</span>
          </div>
        }
        className="flex-1"
        renderInput={(inputSates) => (
          <RenderPasswordInput
            disabled={!editForm}
            className="w-1/2"
            placeholder={editForm ? "Enter your new password" : "************"}
            {...inputSates}
          />
        )}
      />
      {editForm && (
        <HookFormField
          formControl={control}
          name="confirmPassword"
          label="Confirm Password"
          className="[&_[data-slot='form-label']]:text-lg"
          renderInput={(inputSates) => (
            <RenderPasswordInput
              disabled={!editForm}
              placeholder="Confirm your new password"
              className="w-1/2"
              {...inputSates}
            />
          )}
        />
      )}
    </>
  );
}
