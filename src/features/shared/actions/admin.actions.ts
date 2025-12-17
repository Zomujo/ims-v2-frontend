"use server";

import { API_ENDPOINT_TAGS, API_ENDPOINTS } from "@/lib/api-constants";
import { generateUrlWithQueryParams } from "@/lib/utils";
import {
  ApiSuccessResponseDto,
  CreateUserDto,
  GetAdminUserDto,
  PaginatedResponse,
} from "../types/action.types";
import { FetchApi } from "../types/ims-api-action.types";
import { GenerateQueryParams } from "../types/utitls.types";
import { imsApiWithAuth } from "./ims-api.action";
import { AuthIMSUserProfile } from "@features/shared/types/auth-action.types";
import { Department } from "@features/shared/types/settings-action.types";

export async function createUser(data: CreateUserDto) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.ADMIN_USER,
    method: "POST",
    headers: {},
    body: JSON.stringify(data),
  };

  return await imsApiWithAuth<ApiSuccessResponseDto<GetAdminUserDto>>(
    fetchOptions,
  );
}

export async function getFacilityPersonnel(params: GenerateQueryParams) {
  const fetchOptions: FetchApi = {
    url: generateUrlWithQueryParams(API_ENDPOINTS.ADMIN_USERS, params),
    method: "GET",
    headers: {},
    next: { tags: [API_ENDPOINT_TAGS.ADMIN_USERS] },
  };

  return await imsApiWithAuth<PaginatedResponse<GetAdminUserDto>>(fetchOptions);
}
export async function getUsersNoPaginate() {
  const fetchOptions: FetchApi = {
    url: generateUrlWithQueryParams(API_ENDPOINTS.USERS_NO_PAGINATE, {}),
    method: "GET",
    headers: {},
    next: { tags: [API_ENDPOINTS.USERS_NO_PAGINATE] },
  };
  return (await imsApiWithAuth<{ data: AuthIMSUserProfile[] }>(fetchOptions))
    .data;
}

export async function getDepartmentsNoPaginate() {
  const fetchOptions: FetchApi = {
    url: generateUrlWithQueryParams(API_ENDPOINTS.DEPARTMENTS_NO_PAGINATE, {}),
    method: "GET",
    headers: {},
    next: { tags: [API_ENDPOINTS.DEPARTMENTS_NO_PAGINATE] },
  };
  return (await imsApiWithAuth<{ data: Department[] }>(fetchOptions)).data;
}
