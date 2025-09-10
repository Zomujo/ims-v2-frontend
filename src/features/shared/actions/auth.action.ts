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
  IResetPassword,
} from "../types/auth-action.types";
import { imsApiWithAuth, imsApiWithoutAuth } from "./ims-api.action";
import { z } from "zod";
import { API_ENDPOINTS } from "@/lib/api-constants";

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
  try {
    return await imsApiWithoutAuth<AuthApiStandardResponse>({
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
  } catch (error) {
    return error as AuthApiStandardResponse;
  }
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

export const authForgotPasswordSendMailAction = async ({
  username,
  contact,
}: {
  username: string;
  contact: string;
}) => {
  try {
    const isEmail = z.string().email().safeParse(contact).success;
    const body = isEmail
      ? { username, email: contact }
      : { username, phoneNumber: contact };
    return await imsApiWithoutAuth<AuthApiStandardResponse>({
      url: API_ENDPOINTS.AUTH_FORGOT_PASSWORD_SEND_MAIL,
      method: "POST",
      body: JSON.stringify(body),
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
  code,
  username,
}: {
  username: string;
  code: number;
}) => {
  try {
    return await imsApiWithoutAuth<AuthApiStandardResponse>({
      url: API_ENDPOINTS_OLD.FORGOT_PASSWORD.VERIFY_TOKEN,
      method: "POST",
      body: JSON.stringify({ username, code }),
    });
  } catch (error) {
    return error as AuthApiStandardResponse;
  }
};

export const authForgotPasswordResetPasswordAction = async ({
  username,
  newPassword,
}: IResetPassword) => {
  try {
    return await imsApiWithoutAuth<AuthApiStandardResponse>({
      url: API_ENDPOINTS_OLD.FORGOT_PASSWORD.RESET_PASSWORD,
      method: "PATCH",
      body: JSON.stringify({ username, newPassword }),
    });
  } catch (error) {
    return error as AuthApiStandardResponse;
  }
};
