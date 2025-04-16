import { IMSApiActionResponse } from "./ims-api-action.types";

export type AuthLoginActionCredentials = {
  email: string;
  password: string;
};

export type AuthCreateAccountActionCredentials = {
  fullName: string;
  email: string;
  password: string;
  facilityName: string;
  facilityPassword: string;
};

export type AuthCreateAccountActionApiBody = {
  fullName: string;
  email: string;
  facility: {
    name: string;
    password: string;
  };
  password: string;
};

export enum UserStatus {
  PENDING = "Pending",
  ACCEPTED = "Accepted",
  DECLINED = "Declined",
  ACTIVE = "Active",
  INACTIVE = "Inactive",
}

export enum PermissionModules {
  USERS = "users",
  ITEMS = "items",
  SUPPLIERS = "suppliers",
  SALES = "sales",
  REPORTS = "reports",
  ITEMS_CATEGORIES = "items_categories",
  ITEMS_ORDERS = "items_orders",
  STOCK_ADJUSTMENT = "stock_adjustment",
  DEPARTMENTS = "departments",
  DEPARTMENT_REQUESTS = "department_requests",
}

export enum PermissionActions {
  READ = "READ",
  WRITE = "WRITE",
  DELETE = "DELETE",
}

export type AuthActionProps = {
  fullName: string;
  email: string;
  password: string;
  facilityName: string;
  facilityPassword: string;
  newPassword: string;
  refreshToken: string;
  code: number;
};

export type AuthIMSLoginObj = {
  id: string;
  fullName: string;
  email: string;
  status: UserStatus;
  phoneNumber: string;
  facilityId: string;
  departmentId: string;
  role: string;
  permissions: string[];
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  expiresAt: string;
};

export type AuthLoginActionResponse = Pick<
  IMSApiActionResponse<AuthIMSLoginObj>,
  "data"
>;

export type AuthForgotPasswordActionApiResponse = {
  message: string;
  statusCode: number;
};

export type AuthApiStandardResponse = {
  message: string;
  statusCode: number;
  error: string;
};

export type AuthIMSUserProfile = {
  id: string;
  createdAt: string;
  updatedAt: string;
  imageUrl: string | null;
  fullName: string;
  email: string;
  phoneNumber: string | null;
  departmentId: string | null;
  role: string;
  permissions: string[];
  status: UserStatus;
  facility: {
    id: string;
    name: string;
  };
};

export type AuthUserProfileActionResponse =
  IMSApiActionResponse<AuthIMSUserProfile>;
