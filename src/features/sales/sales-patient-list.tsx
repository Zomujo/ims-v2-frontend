"use client";
import { handleRequestState } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { z } from "zod";
import {
  createNewPatientAction,
  getSalesPatientListAction,
} from "../shared/actions/sales.action";
import HookFormField from "../shared/components/hook-form-filed";
import { ImsButton } from "../shared/components/ims-button";
import { ImsForm } from "../shared/components/ims-forms";
import { ImsSheet } from "../shared/components/ims-sheet";
import useFetchData from "../shared/hooks/use-fetch-data";
import useHookForm from "../shared/hooks/use-hook-form";
import useImsSearchParams from "../shared/hooks/use-ims-search-params";
import { CRUDACTION } from "../shared/types/utitls.types";
import { Button } from "../ui/button";
import { Combobox } from "../ui/combobox";
import { Input } from "../ui/input";
import { newPatientSchema } from "./sales.schemas";
import { UI_STATE } from "@/lib/constant";

const searchParamKey = "patientSearch";
const patientIDKey = "patientId";
export default function SalesPatientList() {
  const { setSearchParams, removeSearchParams, getSearchParams } =
    useImsSearchParams();
  const { data } = useFetchData({
    fetchFn: getSalesPatientListAction,
  });
  const patients =
    data?.map((patient) => {
      return {
        value: patient.cardIdentificationNumber,
        label: (
          <div className="flex flex-col items-start">
            <span className="text-sm font-semibold text-gray-800">
              {patient.name}
            </span>
            <span className="text-xs text-gray-500">
              {patient.cardIdentificationNumber}
            </span>
          </div>
        ),
      };
    }) ?? [];

  const selectedValue = getSearchParams(patientIDKey);
  const state = getSearchParams("state");

  const handleOnChange = useDebounceCallback((value: string, key: string) => {
    if (!value) {
      removeSearchParams(key);
      return;
    }
    setSearchParams({ key, value });
  }, 500);
  const handleRemoveQueryparam = () => {
    removeSearchParams("state");
  };
  const handleAddNewPatient = () => {
    setSearchParams({ key: "state", value: CRUDACTION.CREATE });
  };

  useEffect(() => {
    document.body.removeAttribute("style"); //removes unknown pointer event class on body
  }, [state]);

  return (
    <div className="mt-2 space-y-1">
      <h2>Patient ID</h2>
      <Combobox
        placeholder="Search patient..."
        items={patients}
        value={selectedValue}
        onSelected={(value) => {
          handleOnChange(value, patientIDKey);
          removeSearchParams(searchParamKey);
        }}
        onChange={(e) => {
          handleOnChange(e, searchParamKey);
        }}
      >
        <div className="w-full border-t">
          <Button
            onClick={handleAddNewPatient}
            variant="ghost"
            className="w-full justify-start"
          >
            Add New Patient
            <Icon icon="hugeicons:add-circle-half-dot" />
          </Button>
        </div>
      </Combobox>
      <ImsSheet
        open={state === CRUDACTION.CREATE}
        onOpenChange={handleRemoveQueryparam}
        title={"New Patient"}
        description={"Create new patient"}
      >
        <NewPatientForm />
      </ImsSheet>
    </div>
  );
}

function NewPatientForm() {
  const { removeSearchParams } = useImsSearchParams();
  const form = useHookForm({
    resolver: newPatientSchema,
    defaultValues: {
      name: "",
      cardIdentificationNumber: "",
      dateOfBirth: "",
    },
  });

  const handleSubmit = async (data: unknown) => {
    const res = createNewPatientAction(
      data as z.infer<typeof newPatientSchema>,
    );
    res.then(() => {
      form.reset();
      removeSearchParams(UI_STATE);
    });
    handleRequestState({ res, loadingMsg: "Creating new patient..." });
    await res;
  };
  return (
    <ImsForm
      className="overflow-y-auto [&>*]:px-4"
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
          Save patinet
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
            name="cardIdentificationNumber"
            label="Card Identification Number"
            renderInput={({ field }) => (
              <Input
                {...field}
                className="focus-visible:ring-ims-blue-300 bg-white"
                type="text"
                placeholder="Ghana card or NHIS number"
              />
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
              />
            )}
          />
        </>
      }
    />
  );
}
