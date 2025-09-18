"use server";
// eslint-disable @typescript-eslint/no-unused-vars

import { API_ENDPOINTS_OLD } from "@/lib/constant";
import {
  AuthAccountCreationProps,
  AuthActionProps,
  AuthApiStandardResponse,
  AuthCreateAccountActionApiBody,
  ImsSession,
  IResetPassword,
  AuthIMSUserProfile,
} from "../types/auth-action.types";
import { imsApiWithAuth, imsApiWithoutAuth } from "./ims-api.action";
import { z } from "zod";
import { API_ENDPOINTS } from "@/lib/api-constants";
import { IMSApiStandardResponse } from "@features/shared/types/action.types";
import { setImsSession } from "@/lib/config/ims-session";

export const authLoginAction = async ({
  accountIdentifier,
  password,
}: Pick<AuthActionProps, "accountIdentifier" | "password">): Promise<
  IMSApiStandardResponse<ImsSession | undefined>
> => {
  try {
    const { data: loginData, error } = await imsApiWithoutAuth<
      IMSApiStandardResponse<ImsSession>
    >({
      url: API_ENDPOINTS_OLD.LOGIN,
      method: "POST",
      body: JSON.stringify({ accountIdentifier, password }),
    });

    console.log("Login Data:", loginData);

    if (error) {
      throw new Error(error);
    }

    const { data: profileData } = await imsApiWithoutAuth<
      IMSApiStandardResponse<AuthIMSUserProfile>
    >({
      url: API_ENDPOINTS_OLD.USER_PROFILE,
      method: "GET",
      headers: {
        Authorization: `Bearer ${loginData.tokens.accessToken}`,
      },
    });

    console.log("Profile Data:", profileData);

    if (error) {
      throw new Error(error);
    }

    const data = {
      ...loginData,
      ...profileData,
    } satisfies ImsSession;

    console.log("Combined Session Data:", data);

    setImsSession(data);

    return {
      data,
      message: "",
    };
  } catch (error) {
    console.log("Error here", error);
    return {
      error: String(error),
      data: undefined,
      message: "",
    };
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
