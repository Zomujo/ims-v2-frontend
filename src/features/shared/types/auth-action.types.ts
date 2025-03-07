import { IMSApiActionResponse } from "./ims-api-action.types";

export type AuthLoginActionCredentials = {
  email: string;
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
};

export type AuthLoginActionResponse = Pick<
  IMSApiActionResponse<AuthIMSUser>,
  "data"
>;
