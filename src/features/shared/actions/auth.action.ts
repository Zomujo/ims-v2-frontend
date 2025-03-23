"use server";
// eslint-disable @typescript-eslint/no-unused-vars

import { API_ENDPOINTS } from "@/lib/constant";
import {
  AuthActionProps,
  AuthApiStandardResponse,
  AuthCreateAccountActionApiBody,
  AuthLoginActionResponse,
  AuthUserProfileActionResponse,
} from "../types/auth-action.types";
import { imsApiWithAuth, imsApiWithoutAuth } from "./ims-api.action";

export const authUserProfileAction = async () => {
  const res = await imsApiWithAuth<AuthUserProfileActionResponse>({
    url: API_ENDPOINTS.USER_PROFILE,
    method: "GET",
  });
  return res?.data;
};

export const authLoginAction = async ({
  email,
  password,
}: Pick<AuthActionProps, "email" | "password">) => {
  try {
    const res = await imsApiWithoutAuth<AuthLoginActionResponse>({
      url: API_ENDPOINTS.LOGIN,
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    return res.data;
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
}: Pick<
  AuthActionProps,
  "email" | "password" | "facilityName" | "facilityPassword" | "fullName"
>) => {
  try {
    const res = await imsApiWithoutAuth<AuthLoginActionResponse>({
      url: API_ENDPOINTS.CREATE_ACCOUNT,
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
  } catch (error) {
    return null;
  }
};

export const authChangePasswordAction = async ({
  newPassword,
}: Pick<AuthActionProps, "newPassword">) => {
  try {
    const res = await imsApiWithAuth<AuthApiStandardResponse>({
      url: API_ENDPOINTS.CHANGE_PASSWORD,
      method: "PUT",
      body: JSON.stringify({ newPassword }),
    });
    return res;
  } catch (error) {
    return error as AuthApiStandardResponse;
  }
};

export const authRefreshTokenAction = async (
  refreshToken: AuthActionProps["refreshToken"],
) => {
  try {
    const res = await imsApiWithoutAuth<AuthLoginActionResponse>({
      url: API_ENDPOINTS.REFRESH_TOKEN + refreshToken,
      method: "GET",
    });
    return res.data;
  } catch (error) {
    return null;
  }
};

export const authForgotPasswordSendMailAction = async (
  email: AuthActionProps["email"],
) => {
  try {
    const res = await imsApiWithoutAuth<AuthApiStandardResponse>({
      url: API_ENDPOINTS.FORGOT_PASSWORD.SEND_MAIL,
      method: "POST",
      body: JSON.stringify({ email }),
    });
    return res;
  } catch (error) {
    return error as AuthApiStandardResponse;
  }
};

export const authForgotPasswordVerifyCodeAction = async ({
  email,
  code,
}: Pick<AuthActionProps, "email" | "code">) => {
  try {
    const res = await imsApiWithoutAuth<AuthApiStandardResponse>({
      url: API_ENDPOINTS.FORGOT_PASSWORD.VERIFY_TOKEN,
      method: "POST",
      body: JSON.stringify({ email, code }),
    });
    return res;
  } catch (error) {
    return error as AuthApiStandardResponse;
  }
};

export const authForgotPasswordResetPasswordAction = async ({
  email,
  newPassword,
}: Pick<AuthActionProps, "email" | "newPassword">) => {
  try {
    const res = await imsApiWithoutAuth<AuthApiStandardResponse>({
      url: API_ENDPOINTS.FORGOT_PASSWORD.RESET_PASSWORD,
      method: "PATCH",
      body: JSON.stringify({ email, newPassword }),
    });
    return res;
  } catch (error) {
    return error as AuthApiStandardResponse;
  }
};
