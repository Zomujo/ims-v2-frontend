"use server";
import { API_ENDPOINTS } from "@/lib/constant";
import { imsApiWithAuth } from "./ims-api.action";
import { AuthApiStandardResponse } from "../types/auth-action.types";
import { revalidateTag } from "next/cache";

export const changeAccountInfoAction = async ({
  fullName,
  phoneNumber,
}: {
  fullName: string;
  phoneNumber: string;
}) => {
  try {
    const res = await imsApiWithAuth<AuthApiStandardResponse>({
      url: API_ENDPOINTS.CHANGE_ACCOUNT_INFO,
      method: "PATCH",
      body: JSON.stringify({ fullName, phoneNumber }),
    });
    revalidateTag(API_ENDPOINTS.USER_PROFILE);
    return res;
  } catch (error) {
    return error as AuthApiStandardResponse;
  }
};

export const changeEmailAction = async (email: string) => {
  try {
    const res = await imsApiWithAuth<AuthApiStandardResponse>({
      url: API_ENDPOINTS.CHANGE_EMAIL.SEND_MAIL,
      method: "POST",
      body: JSON.stringify({ email }),
    });
    return res;
  } catch (error) {
    console.log("error>>>>", error);
    return error as AuthApiStandardResponse;
  }
};

export const verifyChangeMailOtpAction = async ({
  otp,
  email,
}: {
  otp: number;
  email: string;
}) => {
  try {
    const res = await imsApiWithAuth<AuthApiStandardResponse>({
      url: API_ENDPOINTS.CHANGE_EMAIL.VERIFY_OTP,
      method: "POST",
      body: JSON.stringify({ otp, email }),
    });
    return res;
  } catch (error) {
    return error as AuthApiStandardResponse;
  }
};
