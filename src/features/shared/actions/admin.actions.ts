"use server";

import { API_ENDPOINT_TAGS, API_ENDPOINTS } from "@/lib/api-constants";
import { generateUrlWithQueryParams } from "@/lib/utils";
import { revalidateTag } from "next/cache";
import {
  ApiSuccessResponseDto,
  CreateUserDto,
  GetAdminUserDto,
  PaginatedResponse,
} from "../types/action.types";
import { FetchApi } from "../types/ims-api-action.types";
import { GenerateQueryParams } from "../types/utitls.types";
import { imsApiWithAuth } from "./ims-api.action";

export async function createUser(data: CreateUserDto) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.ADMIN_USER,
    method: "POST",
    headers: {},
    body: JSON.stringify(data),
  };

  const result =
    await imsApiWithAuth<ApiSuccessResponseDto<GetAdminUserDto>>(fetchOptions);
  revalidateTag(API_ENDPOINT_TAGS.ADMIN_USERS);
  return result;
}

export async function getFacilityPersonnel(params: GenerateQueryParams) {
  const fetchOptions: FetchApi = {
    url: generateUrlWithQueryParams(API_ENDPOINTS.ADMIN_USERS, params),
    method: "GET",
    headers: {},
    cache: "force-cache",
    next: { tags: [API_ENDPOINT_TAGS.ADMIN_USERS] },
  };

  return await imsApiWithAuth<PaginatedResponse<GetAdminUserDto>>(fetchOptions);
}
