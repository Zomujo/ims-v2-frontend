import { createContext, useContext, ReactNode } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Patient } from "@features/shared/types/sales-action.types";
import { offlinePatientKey } from "@features/sales/components/patient.model";

const OfflinePatientsContext = createContext<{
  addedPatients: Patient[];
  setPatient: (patients: Patient[]) => void;
} | null>(null);

export function OfflinePatientsProvider({ children }: { children: ReactNode }) {
  const [addedPatients, setAddedPatients] = useLocalStorage<Patient[]>(
    offlinePatientKey,
    [],
  );

  return (
    <OfflinePatientsContext.Provider
      value={{ addedPatients, setPatient: setAddedPatients }}
    >
      {children}
    </OfflinePatientsContext.Provider>
  );
}

export function useOfflinePatients() {
  const context = useContext(OfflinePatientsContext);
  if (!context) {
    throw new Error(
      "useOfflinePatients must be used within OfflinePatientsProvider",
    );
  }
  return context;
}
