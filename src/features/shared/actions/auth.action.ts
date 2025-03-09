import {
  AuthCreateAccountActionApiBody,
  AuthCreateAccountActionCredentials,
  AuthLoginActionCredentials,
  AuthLoginActionResponse,
} from "../types/auth-action.types";
import { imsApiWithoutAuth } from "./ims-api.action";

export const authLoginAction = async ({
  email,
  password,
}: AuthLoginActionCredentials) => {
  try {
    const res = await imsApiWithoutAuth<AuthLoginActionResponse>({
      url: "/auth/login",
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
};

export const authCreateAccountAction = async ({
  email,
  password,
  facilityName,
  facilityPassword,
  fullName,
}: AuthCreateAccountActionCredentials) => {
  try {
    const res = await imsApiWithoutAuth<AuthLoginActionResponse>({
      url: "/auth/signup",
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        facility: {
          name: facilityName,
          password: facilityPassword,
        },
        fullName,
      } as AuthCreateAccountActionApiBody),
    });
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
};

export const authRefreshTokenAction = async (refreshToken: string) => {
  try {
    const res = await imsApiWithoutAuth<AuthLoginActionResponse>({
      url: `/auth/refresh?token=${refreshToken}`,
      method: "GET",
    });
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
};
