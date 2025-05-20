"use server";
import { API_ENDPOINTS_OLD } from "@/lib/constant";
import { generateQueryParams } from "@/lib/utils";
import { revalidateTag } from "next/cache";
import {
  AuthApiStandardResponse,
  AuthUserProfileActionResponse,
} from "../types/auth-action.types";
import {
  GetDepartmentAPIResponse,
  GetUserRolesAPIResponse,
  GetUsersAPIResponse,
} from "../types/settings-action.types";
import { GenerateQueryParams } from "../types/utitls.types";
import { imsApiWithAuth } from "./ims-api.action";

export const changeAccountInfoAction = async ({
  fullName,
  phoneNumber,
}: {
  fullName: string;
  phoneNumber: string;
}) => {
  try {
    const res = await imsApiWithAuth<AuthApiStandardResponse>({
      url: API_ENDPOINTS_OLD.CHANGE_ACCOUNT_INFO,
      method: "PATCH",
      body: JSON.stringify({ fullName, phoneNumber }),
    });
    revalidateTag(API_ENDPOINTS_OLD.USER_PROFILE);
    return res;
  } catch (error) {
    return error as AuthApiStandardResponse;
  }
};

export const changeEmailAction = async (email: string) => {
  try {
    return await imsApiWithAuth<AuthApiStandardResponse>({
      url: API_ENDPOINTS_OLD.CHANGE_EMAIL.SEND_MAIL,
      method: "POST",
      body: JSON.stringify({ email }),
    });
  } catch (error) {
    return error as AuthApiStandardResponse;
  }
};

export const changePassword = async (newPassword: string) => {
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

export const verifyChangeMailOtpAction = async ({
  otp,
  email,
}: {
  otp: number;
  email: string;
}) => {
  try {
    const res = await imsApiWithAuth<AuthApiStandardResponse>({
      url: API_ENDPOINTS_OLD.CHANGE_EMAIL.VERIFY_OTP,
      method: "POST",
      body: JSON.stringify({ code: otp, email }),
    });
    revalidateTag(API_ENDPOINTS_OLD.USER_PROFILE);
    return res;
  } catch (error) {
    return error as AuthApiStandardResponse;
  }
};

export const uploadAvatarAction = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const res = await imsApiWithAuth<AuthApiStandardResponse>({
      url: API_ENDPOINTS_OLD.UPLOAD_PROFILE_PICTURE,
      method: "PUT",
      body: formData,
      cache: "no-store",
    });
    revalidateTag(API_ENDPOINTS_OLD.USER_PROFILE);
    return res;
  } catch (error) {
    return error as AuthApiStandardResponse;
  }
};

export const getDepartmentsAction = async (
  searchParams?: GenerateQueryParams,
) => {
  const queryParams = generateQueryParams(searchParams);
  return await imsApiWithAuth<GetDepartmentAPIResponse>({
    url: `${API_ENDPOINTS_OLD.DEPARTMENTS}${(searchParams ?? "") && "/?" + queryParams}`,
    method: "GET",
    next: {
      tags: [queryParams],
    },
  });
};

export const updateDepartmentAction = async ({
  id,
  name,
}: {
  id: string;
  name: string;
}) => {
  try {
    const res = await imsApiWithAuth<AuthApiStandardResponse>({
      url: `${API_ENDPOINTS_OLD.DEPARTMENTS}/${id}`,
      method: "PATCH",
      body: JSON.stringify({ name }),
    });
    revalidateTag(API_ENDPOINTS_OLD.DEPARTMENTS);
    return res;
  } catch (error) {
    return error as AuthApiStandardResponse;
  }
};

export const deleteDepartmentAction = async ({ id }: { id: string }) => {
  try {
    const res = await imsApiWithAuth<AuthApiStandardResponse>({
      url: `${API_ENDPOINTS_OLD.DEPARTMENTS}/${id}`,
      method: "DELETE",
    });
    revalidateTag(API_ENDPOINTS_OLD.DEPARTMENTS);
    return res;
  } catch (error) {
    return error as AuthApiStandardResponse;
  }
};

export const createDepartmentAction = async ({ name }: { name: string }) => {
  try {
    const res = await imsApiWithAuth<AuthApiStandardResponse>({
      url: API_ENDPOINTS_OLD.DEPARTMENTS,
      method: "POST",
      body: JSON.stringify({ name }),
    });
    revalidateTag(API_ENDPOINTS_OLD.DEPARTMENTS);
    return res;
  } catch (error) {
    return error as AuthApiStandardResponse;
  }
};

export const getUsersAction = async (searchParams?: GenerateQueryParams) => {
  const queryParams = generateQueryParams(searchParams);
  return await imsApiWithAuth<GetUsersAPIResponse>({
    url: `${API_ENDPOINTS_OLD.ADMIN.USERS}${searchParams ? "/?" + queryParams : ""}`,
    method: "GET",
    next: {
      tags: [queryParams],
    },
  });
};
export const getUserAction = async ({ id }: { id: string }) => {
  const res = await imsApiWithAuth<AuthUserProfileActionResponse>({
    url: `${API_ENDPOINTS_OLD.ADMIN.USERS}/${id}`,
    method: "GET",
    next: {
      tags: [id],
    },
  });
  return res?.data;
};

export const getRolesAction = async (searchParams?: GenerateQueryParams) => {
  const queryParams = generateQueryParams(searchParams);
  return await imsApiWithAuth<GetUserRolesAPIResponse>({
    url:
      API_ENDPOINTS_OLD.ADMIN.ROLES + (searchParams ? "/?" + queryParams : ""),
    method: "GET",
  });
};

export const addUserAction = async <T>(newUser: T) => {
  try {
    const res = await imsApiWithAuth<AuthApiStandardResponse>({
      url: API_ENDPOINTS_OLD.ADMIN.USER,
      method: "POST",
      body: JSON.stringify(newUser),
    });
    revalidateTag(API_ENDPOINTS_OLD.ADMIN.USERS);
    return res;
  } catch (error) {
    return error as AuthApiStandardResponse;
  }
};

export const editUserRoleAction = async ({
  newUserRole,
  id,
}: {
  id: string;
  newUserRole: unknown;
}) => {
  try {
    const res = await imsApiWithAuth<AuthApiStandardResponse>({
      url: API_ENDPOINTS_OLD.ADMIN.UPDATE_USER_ROLE.replace("[id]", id),
      method: "PATCH",
      body: JSON.stringify(newUserRole),
    });
    revalidateTag(API_ENDPOINTS_OLD.ADMIN.USERS);
    return res;
  } catch (error) {
    return error as AuthApiStandardResponse;
  }
};

export const deactivateUserAction = async (id: string) => {
  try {
    const res = await imsApiWithAuth<AuthApiStandardResponse>({
      url: API_ENDPOINTS_OLD.ADMIN.DEACTIVATE_USER.replace("[id]", id),
      method: "PATCH",
    });
    revalidateTag(API_ENDPOINTS_OLD.ADMIN.USERS);
    return res;
  } catch (error) {
    return error as AuthApiStandardResponse;
  }
};

export const activateUserAction = async (id: string) => {
  try {
    const res = await imsApiWithAuth<AuthApiStandardResponse>({
      url: API_ENDPOINTS_OLD.ADMIN.ACTIVATE_USER.replace("[id]", id),
      method: "PATCH",
    });
    revalidateTag(API_ENDPOINTS_OLD.ADMIN.USERS);
    return res;
  } catch (error) {
    return error as AuthApiStandardResponse;
  }
};
