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

export type AuthIMSUser = {
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
  IMSApiActionResponse<AuthIMSUser>,
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
