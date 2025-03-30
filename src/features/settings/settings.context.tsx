import { createContext } from "react";
import { Department, UserRoles } from "../shared/types/settings-action.types";

export const ManageUsersContext = createContext<{
  roles: UserRoles[];
  departments: Department[];
  isEditMode?: boolean;
}>({
  roles: [],
  departments: [],
  isEditMode: false,
});

export const ManageUsersContextProvider = ManageUsersContext.Provider;
