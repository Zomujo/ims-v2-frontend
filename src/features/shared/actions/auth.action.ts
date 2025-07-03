"use server";
// eslint-disable @typescript-eslint/no-unused-vars

import { API_ENDPOINTS_OLD } from "@/lib/constant";
import {
  AuthAccountCreationProps,
  AuthActionProps,
  AuthApiStandardResponse,
  AuthCreateAccountActionApiBody,
  AuthIMSLoginObj,
  AuthLoginActionResponse,
  AuthUserProfileActionResponse,
} from "../types/auth-action.types";
import { imsApiWithAuth, imsApiWithoutAuth } from "./ims-api.action";

export const authUserProfileAction = async () => {
  const res = await imsApiWithAuth<AuthUserProfileActionResponse>({
    url: API_ENDPOINTS_OLD.USER_PROFILE,
    method: "GET",
  });
  return res?.data;
};

export const authLoginAction = async ({
  accountIdentifier,
  password,
}: Pick<AuthActionProps, "accountIdentifier" | "password">) => {
  try {
    const { data: loginData } =
      await imsApiWithoutAuth<AuthLoginActionResponse>({
        url: API_ENDPOINTS_OLD.LOGIN,
        method: "POST",
        body: JSON.stringify({ accountIdentifier, password }),
      });

    const { data: profileData } =
      await imsApiWithoutAuth<AuthUserProfileActionResponse>({
        url: API_ENDPOINTS_OLD.USER_PROFILE,
        method: "GET",
        headers: {
          Authorization: `Bearer ${loginData.tokens.accessToken}`,
        },
      });

    return {
      ...loginData,
      ...profileData,
    } satisfies AuthIMSLoginObj;
  } catch {
    return null;
  }
};

export const authCreateAccountAction = async ({
  email,
  password,
  facilityName,
  facilityPassword,
  fullName,
}: AuthAccountCreationProps) => {
  await imsApiWithoutAuth<AuthLoginActionResponse>({
    url: API_ENDPOINTS_OLD.CREATE_ACCOUNT,
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
};

export const authChangePasswordAction = async ({
  newPassword,
}: Pick<AuthActionProps, "newPassword">) => {
  try {
    return await imsApiWithAuth<AuthApiStandardResponse>({
      url: API_ENDPOINTS_OLD.CHANGE_PASSWORD,
      method: "PUT",
      body: JSON.stringify({ newPassword }),
    });
  } catch (error) {
    return error as AuthApiStandardResponse;
  }
};

export const authRefreshTokenAction = async (
  refreshToken: AuthActionProps["refreshToken"],
) => {
  try {
    const res = await imsApiWithoutAuth<AuthLoginActionResponse>({
      url: API_ENDPOINTS_OLD.REFRESH_TOKEN + refreshToken,
      method: "GET",
    });
    return res.data;
  } catch {
    return null;
  }
};

export const authForgotPasswordSendMailAction = async (
  email: AuthActionProps["email"],
) => {
  try {
    return await imsApiWithoutAuth<AuthApiStandardResponse>({
      url: API_ENDPOINTS_OLD.FORGOT_PASSWORD.SEND_MAIL,
      method: "POST",
      body: JSON.stringify({ email }),
    });
  } catch (error) {
    return error as AuthApiStandardResponse;
  }
};

export const authVerificationSendMailAction = async (email: string) => {
  try {
    return await imsApiWithoutAuth<AuthApiStandardResponse>({
      url: API_ENDPOINTS_OLD.VERIFICATION.SEND_MAIL,
      method: "POST",
      body: JSON.stringify({ email }),
    });
  } catch (error) {
    return error as AuthApiStandardResponse;
  }
};

export const authForgotPasswordVerifyCodeAction = async ({
  email,
  code,
}: Pick<AuthActionProps, "email" | "code">) => {
  try {
    return await imsApiWithoutAuth<AuthApiStandardResponse>({
      url: API_ENDPOINTS_OLD.FORGOT_PASSWORD.VERIFY_TOKEN,
      method: "POST",
      body: JSON.stringify({ email, code }),
    });
  } catch (error) {
    return error as AuthApiStandardResponse;
  }
};

export const authForgotPasswordResetPasswordAction = async ({
  email,
  newPassword,
}: Pick<AuthActionProps, "email" | "newPassword">) => {
  try {
    return await imsApiWithoutAuth<AuthApiStandardResponse>({
      url: API_ENDPOINTS_OLD.FORGOT_PASSWORD.RESET_PASSWORD,
      method: "PATCH",
      body: JSON.stringify({ email, newPassword }),
    });
  } catch (error) {
    return error as AuthApiStandardResponse;
  }
};
