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

export type AuthIMSUser = {
  id: string;
  fullName: string;
  email: string;
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
