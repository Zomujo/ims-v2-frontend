"use client";
import { UI_STATE } from "@/lib/constant";
import { getAgeFromDate, handleRequestState } from "@/lib/utils";
import { z } from "zod";
import { createNewPatientAction } from "../../shared/actions/sales.action";
import HookFormField from "../../shared/components/hook-form-filed";
import { ImsButton } from "../../shared/components/ims-button";
import { ImsForm } from "../../shared/components/ims-forms";
import { ImsSelect } from "../../shared/components/ims-select";
import useHookForm from "../../shared/hooks/use-hook-form";
import useImsSearchParams from "../../shared/hooks/use-ims-search-params";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { newPatientSchema, GENDER_OPTIONS } from "../sales.schemas";
import { useOnlineStatus } from "@features/shared/hooks/useOnlineStatus";
import { API_ENDPOINTS } from "@/lib/api-constants";
import { Patient } from "@features/shared/types/sales-action.types";
import { OfflinePatientsProvider } from "@/hooks/useOfflinePatients";

export default function NewPatientForm({
  addedPatients,
  setPatient,
}: Readonly<{
  addedPatients: Patient[];
  setPatient: (patients: Patient[]) => void;
}>) {
  const { handleRequests, isOnline } = useOnlineStatus();
  const { removeSearchParams } = useImsSearchParams();
  const form = useHookForm({
    resolver: newPatientSchema,
    defaultValues: {
      name: "",
      cardIdentificationNumber: "",
      secondaryIdentificationNumber: "",
      dateOfBirth: "",
      gender: undefined,
      diagnosis: "",
      weight: undefined,
    },
  });

  const handleSubmit = async (data: unknown) => {
    const dataTyped = data as z.infer<typeof newPatientSchema>;
    const formattedData = {
      ...dataTyped,
      cardIdentificationNumber: dataTyped.cardIdentificationNumber || undefined,
      secondaryIdentificationNumber:
        dataTyped.secondaryIdentificationNumber || undefined,
      diagnosis: dataTyped.diagnosis || undefined,
    };
    if (!isOnline) {
      const offlinePatientId = crypto.randomUUID();
      const patient: Patient = {
        ...formattedData,
        id: offlinePatientId,
        cardIdentificationNumber: String(
          formattedData.cardIdentificationNumber,
        ),
        secondaryIdentificationNumber: String(
          formattedData.secondaryIdentificationNumber,
        ),
      };
      setPatient([...addedPatients, patient]);
      handleRequests(
        API_ENDPOINTS.PATIENTS,
        {
          ...formattedData,
          queueUniqueId: offlinePatientId,
        },
        {
          method: "POST",
        },
      );
      form.reset();
      removeSearchParams(UI_STATE);
      return;
    }
    const res = createNewPatientAction(formattedData);
    res.then(() => {
      form.reset();
      removeSearchParams(UI_STATE);
    });
    handleRequestState({ res, loadingMsg: "Creating new patient..." });
    await res;
  };

  const dateOfBirth = form.watch("dateOfBirth");
  return (
    <OfflinePatientsProvider>
      <ImsForm
        className="overflow-y-auto *:px-4"
        inputSectionClassName="overflow-y-auto"
        form={form}
        handleAuthSubmit={handleSubmit}
        RenderActions={
          <ImsButton
            isLoading={form.formState.isSubmitting}
            isLoadingLabel="Adding new patient..."
            variant="imsPrimary"
            type="submit"
          >
            Save patient
          </ImsButton>
        }
        RenderInputs={
          <>
            <HookFormField
              formControl={form.control}
              name="name"
              label="Full Name"
              renderInput={({ field }) => {
                return (
                  <Input
                    {...field}
                    className="focus-visible:ring-ims-blue-300 bg-white"
                    type="text"
                    placeholder="eg. John Doe"
                  />
                );
              }}
            />
            <HookFormField
              formControl={form.control}
              name="gender"
              label="Gender"
              renderInput={({ field }) => (
                <ImsSelect
                  options={GENDER_OPTIONS.map((o) => ({
                    label: o.label,
                    value: o.value,
                  }))}
                  moduleName="gender"
                  showNone={false}
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  className="focus-visible:ring-ims-blue-300 h-11! bg-white"
                />
              )}
            />
            <div className="grid grid-cols-2 gap-3">
              <HookFormField
                formControl={form.control}
                name="weight"
                label="Weight"
                renderInput={({ field }) => (
                  <div className="relative">
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.value)}
                      className="focus-visible:ring-ims-blue-300 bg-white pr-10"
                      type="number"
                      min={0}
                      step={0.1}
                      placeholder="e.g. 70"
                    />
                    <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-sm text-gray-400">
                      kg
                    </span>
                  </div>
                )}
              />
              <HookFormField
                formControl={form.control}
                name="dateOfBirth"
                label="Date of Birth"
                renderInput={({ field }) => (
                  <Input
                    {...field}
                    className="focus-visible:ring-ims-blue-300 flex h-11 flex-col justify-between bg-white pt-2.5"
                    placeholder="Select date of birth"
                    type="date"
                    max={new Date().toISOString().split("T")[0]}
                  />
                )}
              />
            </div>
            {!!dateOfBirth && (
              <span className="text-gray-600">
                Age: {getAgeFromDate(dateOfBirth)} years
              </span>
            )}
            <HookFormField
              formControl={form.control}
              name="cardIdentificationNumber"
              label="OPD Number"
              renderInput={({ field }) => (
                <Input
                  {...field}
                  className="focus-visible:ring-ims-blue-300 bg-white"
                  type="text"
                  placeholder="OPD number"
                />
              )}
            />
            <HookFormField
              formControl={form.control}
              name="secondaryIdentificationNumber"
              label="National Health Insurance Scheme Number"
              renderInput={({ field }) => (
                <Input
                  {...field}
                  className="focus-visible:ring-ims-blue-300 bg-white"
                  type="text"
                  placeholder="NHIS number"
                />
              )}
            />
            <HookFormField
              formControl={form.control}
              name="diagnosis"
              label="Diagnosis"
              renderInput={({ field }) => (
                <Textarea
                  {...field}
                  className="focus-visible:ring-ims-blue-300 min-h-20 resize-none bg-white"
                  placeholder="e.g. Hypertension"
                />
              )}
            />
          </>
        }
      />
    </OfflinePatientsProvider>
  );
}
