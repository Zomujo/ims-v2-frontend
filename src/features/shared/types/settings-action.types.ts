import {
  IMSApiActionPaginationResponse,
  IMSApiActionResponse,
} from "./ims-api-action.types";

type User = {
  id: string;
  name: string;
};

export type Department = {
  name: string;
  facilityId: string;
  createdBy: User;
  updatedBy: User | null;
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type GetDepartmentAPIResponse =
  IMSApiActionPaginationResponse<Department>;

export enum USER_STATUS {
  ACTIVE = "active",
  INACTIVE = "inactive",
  PENDING = "pending",
  ACCEPTED = "accepted",
  DECLINED = "declined",
}

export type FacilityUsers = {
  id: string;
  role: string;
  fullName: string;
  status: USER_STATUS;
  department: Pick<Department, "id" | "name">;
};

export type GetUsersAPIResponse = IMSApiActionPaginationResponse<FacilityUsers>;

export type UserRoles = {
  role: string;
  permissions: string[];
};

export type GetUserRolesAPIResponse = IMSApiActionResponse<UserRoles[]>;
