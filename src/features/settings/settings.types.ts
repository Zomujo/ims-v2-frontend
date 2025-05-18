import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import { IMSPaginationData } from "../shared/types/ims-api-action.types";
import {
  Department,
  FacilityUsers,
  UserRoles,
} from "../shared/types/settings-action.types";
import { departmentSettingsSchema } from "./settigns.schemas";

export type DepartmentManagementSettingsProps = {
  departments: Department[];
} & IMSPaginationData;

export type DepartmentFormProps = {
  defaultValues?: z.infer<typeof departmentSettingsSchema>;
};

export type CrudPageProps<T> = {
  data: T[];
  state: string;
  totalPages: number;
  isEditMode: boolean;
  currentDataDisplayName: string;
  tableColumns: ColumnDef<T>[];
  modalActionLabel?: string;
  moduleName?: string;
  openModal?: boolean;
  actions: (item: T) => ({
    label: string;
    icon: string;
    type?: string;
    action: () => void;
  } | null)[];
  handleRemoveQueryparam?: (e: boolean) => void;
  modalAction: () => void;
  isLoading?: boolean;
  closeModal?: () => void;
  alertModalOnChange?: boolean;
};

export type ManageUsersSettingsProps = {
  users: FacilityUsers[];
  departments: Department[];
  roles: UserRoles[];
} & IMSPaginationData;
