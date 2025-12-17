"use server";

import { API_ENDPOINT_TAGS, API_ENDPOINTS } from "@/lib/api-constants";
import { generateUrlWithQueryParams } from "@/lib/utils";
import {
  ApiSuccessResponseDto,
  ApiSuccessResponseNoData,
  CreateDepartmentRequestDto,
  GetItemRequestsResponseDto,
  GetSpecificRequestResponseDto,
  PaginatedResponse,
  UpdateDepartmentRequestDto,
} from "../types/action.types";
import { FetchApi } from "../types/ims-api-action.types";
import { GenerateQueryParams } from "../types/utitls.types";
import { imsApiWithAuth } from "./ims-api.action";

// Server Actions for /api/v1/item-requests
export async function createItemRequest(data: CreateDepartmentRequestDto) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.ITEM_REQUESTS,
    method: "POST",
    headers: {},
    body: JSON.stringify(data),
  };

  return await imsApiWithAuth<
    ApiSuccessResponseDto<CreateDepartmentRequestDto>
  >(fetchOptions);
}

export async function getItemRequests(params?: GenerateQueryParams) {
  const fetchOptions: FetchApi = {
    url: generateUrlWithQueryParams(API_ENDPOINTS.ITEM_REQUESTS, params ?? {}),
    method: "GET",
    headers: {},
    next: { tags: [API_ENDPOINT_TAGS.ITEM_REQUESTS] },
  };

  return await imsApiWithAuth<PaginatedResponse<GetItemRequestsResponseDto>>(
    fetchOptions,
  );
}

// Server Actions for /api/v1/item-requests/{id}
export async function getItemRequest(id: string) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.ITEM_REQUEST.replace(":id", id),
    method: "GET",
    headers: {},
    next: { tags: [API_ENDPOINT_TAGS.ITEM_REQUESTS] },
  };

  return await imsApiWithAuth<
    ApiSuccessResponseDto<GetSpecificRequestResponseDto>
  >(fetchOptions);
}

export async function updateItemRequest(
  id: string,
  data: UpdateDepartmentRequestDto,
) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.ITEM_REQUEST.replace(":id", id),
    method: "PATCH",
    headers: {},
    body: JSON.stringify(data),
  };

  return await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
}

export async function deleteItemRequest(id: string) {
  const fetchOptions: FetchApi = {
    url: API_ENDPOINTS.ITEM_REQUEST.replace(":id", id),
    method: "DELETE",
    headers: {},
  };

  return await imsApiWithAuth<ApiSuccessResponseNoData>(fetchOptions);
}
