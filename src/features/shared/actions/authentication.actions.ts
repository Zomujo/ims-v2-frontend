"use server";

import { API_ENDPOINT_TAGS, API_ENDPOINTS } from "@/lib/api-constants";
import { revalidateTag } from "next/cache";
import {
  AdminSignUpDto,
  ApiSuccessResponseDto,
  LoginTokenDto,
  ApiSuccessResponseNoData,
  LoginDto,
  GetUserDto,
  CreateLoginSessionDto,
  RefreshTokenDto,
  SendForgotPasswordEmailDto,
  CheckCodeDto,
  ResetPasswordDto,
  UpdateUserDto,
  ChangePasswordDto,
} from "../types/action.types";
import { FetchApi } from "../types/ims-api-action.types";
import { imsApiWithoutAuth, imsApiWithAuth } from "./ims-api.action";

export async function signUp(data: AdminSignUpDto) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.AUTH_SIGNUP,
    method: "POST",
    headers: {},
    body: JSON.stringify(data),
  };

  return await imsApiWithoutAuth<ApiSuccessResponseDto<LoginTokenDto>>(
    fetchOptions,
  );
}

export async function uploadProfilePicture(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.AUTH_PROFILE_PICTURE,
    method: "PUT",
    headers: {},
    body: formData,
  };

  const result = await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
  revalidateTag(API_ENDPOINT_TAGS.AUTH_USER);
  return result;
}

export async function deleteProfilePicture() {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.AUTH_PROFILE_PICTURE,
    method: "DELETE",
    headers: {},
  };

  const result = await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
  revalidateTag(API_ENDPOINT_TAGS.AUTH_USER);
  return result;
}

export async function signIn(data: LoginDto) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.AUTH_LOGIN,
    method: "POST",
    headers: {},
    body: JSON.stringify(data),
  };

  return await imsApiWithoutAuth<ApiSuccessResponseDto<LoginTokenDto>>(
    fetchOptions,
  );
}

export async function getUser() {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.AUTH_USER,
    method: "GET",
    headers: {},
    cache: "force-cache",
    next: { tags: [API_ENDPOINT_TAGS.AUTH_USER] },
  };

  return await imsApiWithAuth<ApiSuccessResponseDto<GetUserDto>>(fetchOptions);
}

export async function getSessions() {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.AUTH_SESSIONS,
    method: "GET",
    headers: {},
    cache: "force-cache",
    next: { tags: [API_ENDPOINT_TAGS.AUTH_SESSIONS] },
  };

  return await imsApiWithAuth<ApiSuccessResponseDto<CreateLoginSessionDto>>(
    fetchOptions,
  );
}

export async function refreshTokens() {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.AUTH_REFRESH,
    method: "GET",
    headers: {},
    cache: "force-cache",
    next: { tags: [API_ENDPOINT_TAGS.AUTH_REFRESH] },
  };

  return await imsApiWithoutAuth<ApiSuccessResponseDto<RefreshTokenDto>>(
    fetchOptions,
  );
}

export async function sendForgotPasswordEmail(
  data: SendForgotPasswordEmailDto,
) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.AUTH_FORGOT_PASSWORD_SEND_MAIL,
    method: "POST",
    headers: {},
    body: JSON.stringify(data),
  };

  return await imsApiWithoutAuth<ApiSuccessResponseNoData>(fetchOptions);
}

export async function validateCode(data: CheckCodeDto) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.AUTH_FORGOT_PASSWORD_VALIDATE_CODE,
    method: "POST",
    headers: {},
    body: JSON.stringify(data),
  };

  return await imsApiWithoutAuth<ApiSuccessResponseNoData>(fetchOptions);
}

export async function resetPassword(data: ResetPasswordDto) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.AUTH_FORGOT_PASSWORD_RESET,
    method: "PATCH",
    headers: {},
    body: JSON.stringify(data),
  };

  return await imsApiWithoutAuth<ApiSuccessResponseNoData>(fetchOptions);
}

export async function updateUserDetails(data: UpdateUserDto) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.AUTH_UPDATE_USER,
    method: "PATCH",
    headers: {},
    body: JSON.stringify(data),
  };

  const result = await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
  revalidateTag(API_ENDPOINT_TAGS.AUTH_USER);
  return result;
}

export async function sendResetEmail(data: SendForgotPasswordEmailDto) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.AUTH_CHANGE_EMAIL_SEND_MAIL,
    method: "POST",
    headers: {},
    body: JSON.stringify(data),
  };

  return await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
}

export async function validateEmailCode(data: CheckCodeDto) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.AUTH_CHANGE_EMAIL_VALIDATE_OTP,
    method: "POST",
    headers: {},
    body: JSON.stringify(data),
  };

  return await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
}

export async function changePassword(data: ChangePasswordDto) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.AUTH_CHANGE_PASSWORD,
    method: "PUT",
    headers: {},
    body: JSON.stringify(data),
  };

  return await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
}

export async function deleteSession(id: string) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.AUTH_DELETE_SESSION.replace(":id", id),
    method: "DELETE",
    headers: {},
  };

  const result = await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
  revalidateTag(API_ENDPOINT_TAGS.AUTH_SESSIONS);
  return result;
}
