"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  useEffect,
  useMemo,
  lazy,
  Suspense,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { getSalesPatientListAction } from "../shared/actions/sales.action";
import { ImsSheet } from "../shared/components/ims-sheet";
import useFetchData from "../shared/hooks/use-fetch-data";
import useImsSearchParams from "../shared/hooks/use-ims-search-params";
import { CRUDACTION } from "../shared/types/utitls.types";
import { Button } from "../ui/button";
import { Combobox } from "../ui/combobox";
import { CacheKey } from "@/lib/cache/cache-data";
import {
  OfflinePatientsProvider,
  useOfflinePatients,
} from "@/hooks/useOfflinePatients";

const NewPatientForm = lazy(() => import("./components/new-patient-form"));

type SalesPatientLIstProps = {
  patientId: string | undefined;
  setPatientIdAction: Dispatch<SetStateAction<string | undefined>>;
  setPatientInfoAction?: Dispatch<SetStateAction<ReactNode | string>>;
};

function SalesPatientListContent({
  setPatientIdAction,
  patientId,
  setPatientInfoAction,
}: Readonly<SalesPatientLIstProps>) {
  const { addedPatients, setPatient: setAddedPatients } = useOfflinePatients();
  const { setSearchParams, removeSearchParams, getSearchParams } =
    useImsSearchParams();
  const { data } = useFetchData({
    fetchFn: getSalesPatientListAction,
    cacheKey: CacheKey.PatientsList,
  });
  const patients = useMemo(
    () =>
      [...addedPatients, ...(data ?? [])]?.map((patient) => {
        const identificationNumbers = [
          patient.cardIdentificationNumber,
          patient.secondaryIdentificationNumber,
        ]
          .filter(Boolean)
          .join(" / ");
        return {
          value: patient.id,
          label: (
            <div className="flex flex-col items-start">
              <span className="text-sm font-semibold text-gray-800">
                {patient.name}
              </span>
              <span className="text-xs text-gray-500">
                {identificationNumbers}
              </span>
            </div>
          ),
          searchBy: `${patient.name} ${identificationNumbers}`,
        };
      }) ?? [],
    [data, addedPatients],
  );

  const state = getSearchParams("state");

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
        value={patientId ?? ""}
        onSelected={(value, label) => {
          setPatientIdAction(value);
          setPatientInfoAction?.(label);
        }}
        dropdownClassName="pb-5"
      >
        <div className="fixed bottom-0 left-0 w-full border-t">
          <Button
            onClick={handleAddNewPatient}
            className="w-full justify-start"
            variant="imsPrimary"
          >
            Add New Patient
            <Icon color="white" icon="hugeicons:add-circle-half-dot" />
          </Button>
        </div>
      </Combobox>
      <ImsSheet
        open={state === CRUDACTION.CREATE}
        onOpenChange={() => removeSearchParams("state")}
        title={"New Patient"}
        description={"Create new patient"}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <NewPatientForm
            addedPatients={addedPatients}
            setPatient={setAddedPatients}
          />
        </Suspense>
      </ImsSheet>
    </div>
  );
}

export default function SalesPatientList(
  props: Readonly<SalesPatientLIstProps>,
) {
  return (
    <OfflinePatientsProvider>
      <SalesPatientListContent {...props} />
    </OfflinePatientsProvider>
  );
}
